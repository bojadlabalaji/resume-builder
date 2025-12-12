from pydantic import BaseModel
from typing import Optional, Dict, Any

class RefineTextInput(BaseModel):
    original_text: str
    instruction: str
    context: Optional[str] = None
    job_description: Optional[str] = None
    resume_content: Optional[str] = None

class RefineTextOutput(BaseModel):
    refined_text: str
