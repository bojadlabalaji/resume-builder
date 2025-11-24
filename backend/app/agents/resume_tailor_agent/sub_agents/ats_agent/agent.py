from google.adk.agents import Agent
from . import prompt
from .schema import ATSOutput
from google.genai import types

# A single, powerful agent to perform the hierarchical mapping.
ats_agent = Agent(
    model="gemini-2.5-pro",
    name="ATSKeywordsAgent",
    description="Extracts keywords from the job description.",
    instruction=prompt.ats_agent_prompt(),
    output_schema=ATSOutput,
    output_key="ats_feedback",
)

root_agent = ats_agent