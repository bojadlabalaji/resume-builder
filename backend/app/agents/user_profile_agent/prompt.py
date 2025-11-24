
def profile_agent_prompt():
    return """
    Act as a profile builder and generate a user profile based on the uploaded resume, you task is to generate the json output based on the uploaded resume, do not any missing information, just fill what it is available in the resume and leave the missing information as None.
    """