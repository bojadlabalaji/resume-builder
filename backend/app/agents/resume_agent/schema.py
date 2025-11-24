from pydantic import BaseModel
from typing  import List, Optional
from app.schemas.user import *

class ResumeInput(BaseModel):
    existing_resume: UserResumeProfile
    job_description: str
    ats_feedback: Optional[str] = None
    resume_length: str = Field("1 page", description="Desired length of the resume (e.g., '1 page', '2 pages', '3-4 pages', '4+ pages')")


class TailoredResume(BaseModel):
    about: str = Field(..., description="Tailored About for the job")
    skills: List[Skill] = Field(..., description="Tailored Skills for the job")
    education: List[Education] = Field(..., description="Tailored Education for the job")
    experience: List[Experience] = Field(..., description="Tailored Experience for the job")
    projects: List[Project] = Field(..., description="Tailored Projects for the job")
    certification: List[Certification] = Field(..., description="Tailored Certification for the job")
    awards: List[Award] = Field(..., description="Tailored Awards for the job")
    publications: List[Publications] = Field(..., description="Tailored Publications for the job")



class ResumeOutput(BaseModel):
    tailored_resume: TailoredResume = Field(..., description="Tailored resume")
    verdict: str = Field(..., description="As a Hiring Manager, you Verdict of the candidate based on the resume")
    strength: List[str] = Field(default_factory=list, description="Strength of the resume")
    weakness: List[str] = Field(default_factory=list, description="Weakness of the resume")


