from google.adk.agents import Agent
from . import prompt
from .schema import UserResumeProfile
from google.genai import types


# A single, powerful agent to perform the user profile generation.
profile_agent = Agent(
    model="gemini-2.5-flash",
    name="ProfileAgent",
    description="Generates user profile based on the uploaded resume.",
    instruction=prompt.profile_agent_prompt(),
    output_schema=UserResumeProfile,
    output_key="user_profile",
    
)

root_agent = profile_agent