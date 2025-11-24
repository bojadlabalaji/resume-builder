import os
from google.adk.agents import Agent, SequentialAgent
from .sub_agents.ats_agent.agent import ats_agent
from .sub_agents.resume_agent.agent import resume_agent

# The root agent is the sequential pipeline that runs them in order.
resume_tailor_agent = SequentialAgent(
    name="ResumeTailorAgent",
    description="A multi-step pipeline that generates a tailored resume based on the user's profile and job description.",
    sub_agents=[
        ats_agent,
        resume_agent,
    ]
)

root_agent = resume_tailor_agent