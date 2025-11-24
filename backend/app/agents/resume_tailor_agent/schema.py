from pydantic import BaseModel, Field
from typing import Optional
from app.schemas.user import UserResumeProfile

class ResumeInput(BaseModel):
    existing_resume: UserResumeProfile
    job_description: str
    ats_feedback: Optional[str] = None
    resume_length: str = Field("1 page", description="Desired length of the resume (e.g., '1 page', '2 pages', '3-4 pages', '4+ pages')")
