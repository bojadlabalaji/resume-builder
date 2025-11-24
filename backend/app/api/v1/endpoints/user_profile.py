
from fastapi import APIRouter, HTTPException, File, UploadFile, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.core.database import get_db
from app.core.security import get_current_user
from app.models.user import User
from app.models.user_profile import UserProfile
from app.agents.user_profile_agent.agent import root_agent
from app.services import file_service
from google.adk.runners import InMemoryRunner
from google.genai.types import Content, Part
import uuid
import json

router = APIRouter()
app_name = "ProfileAgent"
runner = InMemoryRunner(agent=root_agent, app_name=app_name)

@router.get("/", response_model=list[dict])
def get_my_profiles(
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Get all source profiles for the current user.
    """
    current_user = db.query(User).filter(User.email == email).first()
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    profiles = db.query(UserProfile).filter(UserProfile.user_id == current_user.id).all()
    return [{"id": p.id, "name": p.name, "profile_data": p.profile_data} for p in profiles]

@router.post("/", response_model=dict)
async def create_profile(
    resume: UploadFile = File(...),
    profile_name: str = "Default Profile",
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Upload a resume to create a new source profile.
    """
    current_user = db.query(User).filter(User.email == email).first()
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")
    try:
        # Create a session for the agent
        session_id = f"user-profile-session-{uuid.uuid4()}"
        user_id = str(current_user.id)
        session = await runner.session_service.create_session(app_name=runner.app_name, user_id=user_id, session_id=session_id)
        
        # Convert resume to markdown
        resume_content = file_service.convert_to_markdown(resume.file, resume.filename)

        # Create a message for the agent
        initial_message = Content(role="user", parts=[Part(text=resume_content)])
        
        print(f"API: User Profile Agent invoked for user {current_user.email}")

        # Run the agent
        async for _ in runner.run_async(user_id=user_id, session_id=session_id, new_message=initial_message):
            pass

        final_session = await runner.session_service.get_session(app_name=runner.app_name, user_id=user_id, session_id=session_id)
        final_result = final_session.state.get("user_profile")
        
        if not final_result:
             raise HTTPException(status_code=500, detail="Failed to generate profile")

        # Save to DB as a NEW profile
        db_profile = UserProfile(
            user_id=current_user.id, 
            name=profile_name,
            profile_data=final_result
        )
        db.add(db_profile)
        db.commit()
        db.refresh(db_profile)
        
        print(f"API: Created new profile '{profile_name}' (ID: {db_profile.id})")
        return {"id": db_profile.id, "name": db_profile.name, "profile_data": db_profile.profile_data}

    except Exception as e:
        print(f"Error generating profile: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@router.put("/{profile_id}", response_model=dict)
def update_profile(
    profile_id: int,
    profile_data: dict,
    email: str = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """
    Update an existing source profile.
    """
    current_user = db.query(User).filter(User.email == email).first()
    if not current_user:
        raise HTTPException(status_code=404, detail="User not found")
        
    profile = db.query(UserProfile).filter(UserProfile.id == profile_id, UserProfile.user_id == current_user.id).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
        
    profile.profile_data = profile_data
    db.commit()
    db.refresh(profile)
    
    return {"id": profile.id, "name": profile.name, "profile_data": profile.profile_data}