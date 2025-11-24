# Project Proposal: AI-Powered Resume Builder

## 1. Executive Summary
The **Resume Builder** is a standalone, privacy-focused application designed to empower job seekers by automating the creation of ATS-optimized resumes. By leveraging Google's Gemini AI, the application analyzes job descriptions and user profiles to generate tailored resumes that increase the chances of passing Applicant Tracking Systems (ATS). The project prioritizes data privacy by running locally via Docker, ensuring user data and API keys remain under their control.

## 2. Problem Statement
Job seekers often struggle to tailor their resumes for every specific job application. Generic resumes frequently fail to pass ATS filters, leading to missed opportunities. Manually customizing resumes is time-consuming and requires expertise in keyword optimization that many candidates lack.

## 3. Proposed Solution
We propose a full-stack web application that:
- **Centralizes User Data**: Users create a comprehensive profile once.
- **Leverages an Agents Ecosystem**: Uses **Google Agent Development Kit (ADK)** to orchestrate specialized AI agents (e.g., Job Analyzer, Resume Architect) for complex reasoning and content generation.
- **Ensures Privacy**: Operates entirely locally using Docker, with no external database dependencies for the MVP.
- **Provides Professional Output**: Generates high-quality PDF and DOCX resumes using standardized templates.

## 4. Technical Strategy
The application will be built as a containerized microservices architecture, centered around a multi-agent system.

### Technology Stack
- **Frontend**: React (Modern UI/UX)
- **Backend**: Python FastAPI (High-performance API)
- **Agent Framework**: **Google Agent Development Kit (ADK)** (Multi-agent orchestration)
- **AI Engine**: Google Gemini API (LLM powering the agents)
- **Database**: In-Memory SQLite (Lightweight, local storage)
- **Deployment**: Docker & Docker Compose (One-click local setup)

## 5. Target Audience
- Active job seekers looking to streamline their application process.
- Tech-savvy users who prefer local, privacy-centric tools.
- Professionals wanting to maintain a master version of their career history.

## 6. Roadmap (MVP)
- **Phase 1**: Core Infrastructure (Docker setup, Basic UI/Backend).
- **Phase 2**: Profile Management & Data Ingestion.
- **Phase 3**: **Agent Ecosystem Setup** (Implementing Job Analyzer & Resume Writer agents using ADK).
- **Phase 4**: Template Engine & PDF Export.
- **Phase 5**: Polish & Local Distribution.
