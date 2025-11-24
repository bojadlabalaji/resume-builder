from fastapi import APIRouter, HTTPException, File, UploadFile, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.user_profile import UserProfile
from app.models.generated_resume import GeneratedResume
from pydantic import BaseModel
from typing import Optional
from app.agents.resume_agent.agent import root_agent
from app.agents.resume_agent.schema import ResumeInput
from app.services import file_service
from google.adk.runners import InMemoryRunner
from google.genai.types import Content, Part
import uuid
from fastapi.responses import FileResponse
from app.services.template_service import template_service

router = APIRouter()
app_name = "ResumeAgent"
runner = InMemoryRunner(agent=root_agent, app_name=app_name)


@router.post("/generate-resume")
async def generate_resume(
    profile_id: int,
    job_description: str,
    generation_name: str,
    ats_feedback: Optional[str] = None,
    template_id: Optional[int] = None,
    resume_length: str = "1 page",
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        current_user = db.query(User).filter(User.email == email).first()
        if not current_user:
            raise HTTPException(status_code=404, detail="User not found")

        # Fetch the source profile
        source_profile = db.query(UserProfile).filter(UserProfile.id == profile_id, UserProfile.user_id == current_user.id).first()
        if not source_profile:
             raise HTTPException(status_code=404, detail="Source profile not found")

        # Prepare input for the agent
        # We need to pass the existing resume data + JD
        resume_input_data = {
            "existing_resume": source_profile.profile_data,
            "job_description": job_description,
            "ats_feedback": ats_feedback,
            "resume_length": resume_length
        }
        
        # Validate against schema (optional but good for debugging)
        # resume_input = ResumeInput(**resume_input_data)

        # Create a session
        session_id = f"resume-session-{uuid.uuid4()}"
        user_id = str(current_user.id)
        session = await runner.session_service.create_session(app_name=runner.app_name, user_id=user_id, session_id=session_id)
        
        # Create a message
        initial_message = Content(role="user", parts=[Part(text=ResumeInput(**resume_input_data).model_dump_json())])
        
        # Run the agent
        async for _ in runner.run_async(user_id=user_id, session_id=session_id, new_message=initial_message):
            pass

        final_session = await runner.session_service.get_session(app_name=runner.app_name, user_id=user_id, session_id=session_id)
        # The result is the output of the resume agent in the sequence
        # Expected to be ResumeOutput (tailored_resume, verdict, strength, weakness)
        agent_output = final_session.state.get("tailored_resume")
        
        if not agent_output:
             raise HTTPException(status_code=500, detail="Failed to generate resume")

        # STITCHING LOGIC: Combine static info from source with dynamic info from agent
        # agent_output is a dict corresponding to ResumeOutput schema
        tailored_data = agent_output.get("tailored_resume", {})
        
        # Get static data from source profile
        source_data = source_profile.profile_data
        basic_info = source_data.get("basic_info", {})

        # Construct the full UserResumeProfile object
        full_resume_data = {
            "basic_info": basic_info,
            **tailored_data # about, skills, education, experience, etc.
        }

        # The final result to save includes the full resume + analysis
        final_result_to_save = {
            "resume": full_resume_data,
            "analysis": {
                "verdict": agent_output.get("verdict"),
                "strength": agent_output.get("strength"),
                "weakness": agent_output.get("weakness")
            }
        }

        # Save to GeneratedResume
        generated_resume = GeneratedResume(
            user_id=current_user.id,
            source_profile_id=source_profile.id,
            name=generation_name,
            job_description=job_description,
            template_id=template_id,
            tailored_resume_content=final_result_to_save
        )
        db.add(generated_resume)
        db.commit()
        db.refresh(generated_resume)

        return generated_resume

    except Exception as e:
        print(f"Error generating resume: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/download/{resume_id}")
def download_resume(
    resume_id: int,
    format: str = "docx",
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Download a generated resume in DOCX or PDF format.
    """
    current_user = db.query(User).filter(User.email == email).first()
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")

    generated_resume = db.query(GeneratedResume).filter(
        GeneratedResume.id == resume_id, 
        GeneratedResume.user_id == current_user.id
    ).first()
    
    if not generated_resume:
        raise HTTPException(status_code=404, detail="Resume not found")

    # The stored content has { "resume": {...}, "analysis": {...} }
    # We need the "resume" part for the template
    resume_data = generated_resume.tailored_resume_content.get("resume", {})
    
    # Inject template_id so the service knows which one to use
    resume_data["template_id"] = generated_resume.template_id

    filename = f"{generated_resume.name.replace(' ', '_')}_{resume_id}"
    
    try:
        # Generate DOCX
        docx_path = template_service.generate_docx(resume_data, filename)
        
        if format.lower() == "pdf":
            pdf_path = template_service.convert_to_pdf(docx_path)
            return FileResponse(
                path=pdf_path, 
                filename=f"{filename}.pdf", 
                media_type="application/pdf"
            )
        else:
            return FileResponse(
                path=docx_path, 
                filename=f"{filename}.docx", 
                media_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            )
            
    except Exception as e:
        print(f"Error generating document: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/", response_model=list[dict])
def get_resumes(
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all generated resumes for the current user.
    """
    current_user = db.query(User).filter(User.email == email).first()
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    resumes = db.query(GeneratedResume).filter(GeneratedResume.user_id == current_user.id).all()
    
    return [
        {
            "id": r.id,
            "name": r.name,
            "job_description": r.job_description,
            "created_at": r.created_at,
            "template_id": r.template_id,
            "tailored_resume_content": r.tailored_resume_content
        }
        for r in resumes
    ]
