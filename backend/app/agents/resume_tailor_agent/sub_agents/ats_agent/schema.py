from pydantic import BaseModel

class ATSOutput(BaseModel):
    keywords: list[str]
    weaknesses: list[str]
    tips: list[str]