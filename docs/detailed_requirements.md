# Detailed Requirements Document: Resume Builder

## 1. Introduction
This document outlines the functional and non-functional requirements for the Resume Builder application. The system is designed to be a local-first, AI-powered tool for generating job-specific resumes.

## 2. Scope
The MVP will focus on a single-user, local environment where the user can manage their profile, input job descriptions, and generate PDF resumes.

## 3. Functional Requirements

### 3.1 User Profile Management
- **FR-01**: System shall allow users to create a profile with the following sections:
    - Personal Information (Name, Contact, Links)
    - Education
    - Experience (Work History)
    - Projects
    - Skills
    - Certifications
- **FR-02**: Users shall be able to add custom sections dynamically (e.g., "Volunteering", "Publications").
- **FR-03**: System shall support profile creation via manual entry. (Future: File upload parsing).

### 3.2 Resume Generation (Agentic Workflow)
- **FR-04**: System shall provide a form to input:
    - Job Description (Text)
    - ATS Feedback/Keywords (Optional)
- **FR-05**: System shall use **Google Agent Development Kit (ADK)** to orchestrate the following agents:
    - **Job Analyzer Agent**: Analyzes the job description to extract key skills, requirements, and tone.
    - **Profile Matcher Agent**: Selects the most relevant experience and skills from the User Profile based on the Job Analyzer's output.
    - **Resume Writer Agent**: Generates the resume content (bullet points, summary) optimized for the specific job and ATS.
- **FR-06**: Users shall be able to define and select "System Prompts" to customize the agents' personas or focus.

### 3.3 Templates & Export
- **FR-07**: System shall offer multiple resume templates (e.g., Modern, Classic, Technical).
- **FR-08**: System shall generate resumes in PDF format.
- **FR-09**: System shall generate resumes in DOCX format.

### 3.4 History & Storage
- **FR-10**: System shall save generated resumes with metadata (Company Name, Job Title, Date).
- **FR-11**: Users shall be able to view and re-download past resumes.

### 3.5 Settings & Configuration
- **FR-12**: System shall require the user to input their own Google Gemini API Key.
- **FR-13**: API Key shall be stored locally and securely (not transmitted to any third-party server other than Google).

## 4. Non-Functional Requirements

### 4.1 Privacy & Security
- **NFR-01**: All user data must reside locally on the user's machine.
- **NFR-02**: No data analytics or tracking shall be sent to external servers.

### 4.2 Deployment
- **NFR-03**: Application must be containerized using Docker.
- **NFR-04**: Application must be easy to start with a single command (e.g., `docker-compose up`).

### 4.3 Performance
- **NFR-05**: Resume generation should complete within reasonable time limits (dependent on API latency).
- **NFR-06**: UI should be responsive and accessible.

## 5. System Architecture

### 5.1 Components
- **Frontend**: React Single Page Application (SPA). Handles UI, state management, and API calls to the backend.
- **Backend**: FastAPI Server. Acts as the gateway and invokes the Agent Orchestrator.
- **Agent Orchestrator**: Built with **Google ADK**. Manages the lifecycle and communication of specialized agents.
- **Database**: SQLite (In-Memory or File-based for persistence across restarts if volume mapped).
- **AI Service**: External Google Gemini API.

### 5.2 Data Flow
1. **Input**: User enters Profile Data + Job Description -> Frontend.
2. **Process**: Frontend sends data -> Backend.
3. **Orchestration**: Backend -> Agent Orchestrator (ADK).
    - **Job Analyzer Agent** processes JD.
    - **Profile Matcher Agent** queries DB.
    - **Resume Writer Agent** drafts content.
4. **Format**: Backend/Frontend formats content into Template.
5. **Output**: PDF/DOCX generated and sent to User.

## 6. API Integrations
- **Google Gemini API**:
    - Model: `gemini-pro` (or latest available).
    - Usage: LLM backend for ADK agents.
- **Google Agent Development Kit (ADK)**:
    - Usage: Framework for building and orchestrating the multi-agent system.
