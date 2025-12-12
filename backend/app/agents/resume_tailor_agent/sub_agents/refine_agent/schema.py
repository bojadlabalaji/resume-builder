from pydantic import BaseModel

class RefineTextOutput(BaseModel):
    refined_text: str
    change_summary: str