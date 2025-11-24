"""
Pydantic schemas for Job Analyzer Agent input/output.
"""
from pydantic import BaseModel, Field
from typing import List, Optional


class Address(BaseModel):
    street: Optional[str] = Field(None, description="Street address of the user")
    city: Optional[str] = Field(None, description="City of the user")
    state: Optional[str] = Field(None, description="State of the user")
    country: str = Field("USA", description="Country of the user")
    zip_code: Optional[str] = Field(None, description="Zip code of the user")

class BasicInfo(BaseModel):
    first_name: str = Field(..., description="First name of the user")
    last_name: str = Field(..., description="Last name of the user")
    phone: str = Field(..., description="Phone number of the user")
    email: str = Field(..., description="Email address of the user")
    address: Optional[Address] = Field(None, description="Address of the user")
    linkedin_profile: Optional[str] = Field(None, description="LinkedIn profile of the user")
    github_profile: Optional[str] = Field(None, description="GitHub profile of the user")
    

class Skill(BaseModel):
    category: str = Field(..., description="Category of the skill eg: Cloud, Frontend, Backend, etc.")
    skills: List[str] = Field(..., description="List of skills in the category")
    

class Education(BaseModel):
    school_name: str = Field(..., description="Name of the school")
    degree: str = Field(..., description="Degree obtained")
    field_of_study: str = Field(..., description="Field of study")
    start_date: str = Field(..., description="Start date of the education")
    end_date: str = Field(..., description="End date of the education")
    description: str = Field(..., description="Description of the education")
    

class Experience(BaseModel):
    company_name: str = Field(..., description="Name of the company")
    job_title: str = Field(..., description="Job title")
    start_date: str = Field(..., description="Start date of the experience")
    end_date: str = Field(..., description="End date of the experience")
    location: str = Field(..., description="Location of the experience")
    description: List[str] = Field(..., description="Description of the experience in bullet points")

class Project(BaseModel):
    name: str = Field(..., description="Name of the project")
    description: List[str] = Field(..., description="Description of the project in bullet points")

class Certification(BaseModel):
    name: str = Field(..., description="Name of the certification")
    issuer: str = Field(..., description="Issuer of the certification")
    issue_date: str = Field(..., description="Issue date of the certification")
    expiration_date: str = Field(..., description="Expiration date of the certification")
    certification_number: str = Field(..., description="Certification number")
    description: List[str] = Field(..., description="Description of the certification")

class Award(BaseModel):
    name: str = Field(..., description="Name of the award")
    issuer: str = Field(..., description="Issuer of the award")
    issue_date: str = Field(..., description="Issue date of the award")
    description: str = Field(..., description="Description of the award")   



class Publications(BaseModel):
    name: str = Field(..., description="Name of the publication")
    publisher: str = Field(..., description="Publisher of the publication")
    publish_date: str = Field(..., description="Publish date of the publication")
    description: str = Field(..., description="Description of the publication")   

class UserResumeProfile(BaseModel):
    basic_info: BasicInfo = Field(..., description="Basic information of the user")
    about: str = Field(..., description="About/Professional summary of the user")
    skills: List[Skill] = Field(..., description="Skills of the user")
    education: Optional[List[Education]] = Field(None, description="Education of the user")
    experience: Optional[List[Experience]] = Field(None, description="Experience of the user")
    projects: Optional[List[Project]] = Field(None, description="Projects of the user")
    certification: Optional[List[Certification]] = Field(None, description="Certification of the user")
    awards: Optional[List[Award]] = Field(None, description="Awards of the user")
    publications: Optional[List[Publications]] = Field(None, description="Publications of the user")


