from google.adk.agents import Agent
from . import prompt
from app.schemas.resume import RefineTextOutput
from google.genai import types
from app.core.config import settings


GEMINI_PRO_MODEL = settings.GEMINI_PRO_MODEL

# A single, powerful agent to perform the hierarchical mapping.
refine_agent = Agent(
    model=GEMINI_PRO_MODEL,
    name="RefineAgent",
    description="Refines and improves text based on user instructions.",
    instruction=prompt.refine_prompt(),
    output_schema=RefineTextOutput,
    output_key="refined_text_output",
)

root_agent = refine_agent