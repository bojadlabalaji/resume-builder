from google.adk.agents import Agent
from . import prompt
from .schema import ResumeOutput
from google.genai import types

json_response_config = types.GenerateContentConfig(
    response_mime_type="application/json"
)

# A single, powerful agent to perform the hierarchical mapping.
resume_agent = Agent(
    model="gemini-2.5-pro",
    name="ResumeAgent",
    description="Generates a tailored resume based on the user's profile and job description.",
    instruction=prompt.resume_agent_prompt(),
    output_schema=ResumeOutput,
    output_key="tailored_resume",
    # generate_content_config=json_response_config
    
)

root_agent = resume_agent