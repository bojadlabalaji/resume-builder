Project Name: Resume Builder

Description: A resume builder application that allows users to create and download their resumes in PDF format. It takes job description and ATS feedback to generate a resume that is optimized for the job. There will be some deafults system prompts by default but users can add their own prompts.
Initially user need to create a profile containing serveral sections that are required to generate a resume and user can add sections dynamically. Once the profile is created (manually or from existing files uploads), user can generate a resume by uploading a job description and ATS feedback, and the application will generate a resume that is optimized for the job. There need to be serveral templates available for users to select from to generate the pdf. There will be a settings tab where users need to add their own Gemini API key and we will use the Gemini models only in this project. 


Initial Deployement Planning: We will be building a fullstakc application using the below technologies:
- Frontend: React
- Backend: Python FastAPI
- Database: inMemory SQLite 
- Deployment: Local using Docker 


Note: I want to intially containerize the application and deploy it locally using docker and distribute to my friends to run locally on theirs machines.    


# For MVP there are the main targets

## Features
- Home page will have a form to upload a job description and ATS feedback. 
- user can select a template from the dropdown and generate a resume.
- user can download the resume in PDF/DOCX format.
- user can create a profile containing serveral sections that are required to generate a resume and user can add sections dynamically.
- Add a settings tab where users need to add their own Gemini API key and we will use the Gemini models only in this project.
- Add a history where we will save all the generated resumes and company and job title for future reference. 


## Basic High Level Flow:

### First Time:
- User will be asked to create a account.
- User will create a profile containing serveral sections that are required to generate a resume and user can add sections dynamically.


### Subsequent Times:
- User can add/select system prompts dynamically.
- User can add job description and ATS feedback everytime.
- User can select a template and generate a resume.
- User can download the resume in PDF/DOCX format.
- UI will suggest next steps like send an email to recruiters or prepare for interview etc.


