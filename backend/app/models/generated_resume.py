
from sqlalchemy import Column, Integer, String, JSON, ForeignKey, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class GeneratedResume(Base):
    __tablename__ = "generated_resumes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    source_profile_id = Column(Integer, ForeignKey("user_profiles.id"))
    name = Column(String, index=True)
    job_description = Column(String)
    template_id = Column(Integer, nullable=True)
    tailored_resume_content = Column(JSON)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    user = relationship("User", backref="generated_resumes")
    source_profile = relationship("UserProfile", backref="generated_resumes")
