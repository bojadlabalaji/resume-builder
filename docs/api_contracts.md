# API Contracts

## Base URL
`http://localhost:8000/api/v1`

## 1. Authentication

### Register
- **Endpoint**: `POST /auth/register`
- **Description**: Register a new user.
- **Content-Type**: `application/x-www-form-urlencoded`
- **Form Fields**:
  - `email`: User's email address.
  - `password`: User's password.
- **Response**:
  - `200 OK`:
    ```json
    {
      "access_token": "eyJhbG...",
      "token_type": "bearer"
    }
    ```

### Login
- **Endpoint**: `POST /auth/login`
- **Description**: Authenticate user and get access token.
- **Content-Type**: `application/x-www-form-urlencoded`
- **Form Fields**:
  - `username`: User's email address.
  - `password`: User's password.
- **Response**:
  - `200 OK`:
    ```json
    {
      "access_token": "eyJhbG...",
      "token_type": "bearer"
    }
    ```

## 2. User Profile

### Get All Profiles
- **Endpoint**: `GET /user-profile/`
- **Description**: Get all source profiles for the current user.
- **Response**:
  - `200 OK`:
    ```json
    [
      {
        "id": 1,
        "name": "Default Profile",
        "profile_data": { ... }
      }
    ]
    ```

### Create Profile
- **Endpoint**: `POST /user-profile/`
- **Description**: Upload a resume to create a new source profile.
- **Content-Type**: `multipart/form-data`
- **Form Fields**:
  - `resume`: The resume file (PDF/DOCX).
  - `profile_name`: Name for this profile (default: "Default Profile").
- **Response**:
  - `200 OK`:
    ```json
    {
      "id": 2,
      "name": "Software Engineer Profile",
      "profile_data": { ... }
    }
    ```

## 3. Resume Generation

### Generate Resume
- **Endpoint**: `POST /resume/generate-resume`
- **Description**: Generates a tailored resume based on a source profile and job description.
- **Query Parameters**:
  - `profile_id`: ID of the source profile to use.
  - `job_description`: The job description to tailor for.
  - `generation_name`: Name for the generated resume.
  - `ats_feedback` (Optional): Feedback from ATS to incorporate.
  - `template_id` (Optional): ID of the template to use (e.g., 1, 2).
  - `resume_length` (Optional): Desired length (e.g., "1 page", "2 pages", "3-4 pages", "4+ pages"). Default: "1 page".
- **Response**:
  - `200 OK`:
    ```json
    {
      "id": 1,
      "user_id": 1,
      "source_profile_id": 1,
      "name": "My Tailored Resume",
      "job_description": "...",
      "tailored_resume_content": {
        "resume": { ... },
        "analysis": { ... }
      },
      "created_at": "..."
    }
    ```

### Get Resume History
- **Endpoint**: `GET /resume/`
- **Description**: Retrieves a list of previously generated resumes.
- **Response**:
  - `200 OK`:
    ```json
    [
      {
        "id": 1,
        "name": "My Tailored Resume",
        "job_description": "...",
        "created_at": "2023-10-27T10:00:00Z",
        "template_id": 1,
        "tailored_resume_content": { ... }
      }
    ]
    ```

### Download Resume
- **Endpoint**: `GET /resume/download/{resume_id}`
- **Description**: Download a generated resume in DOCX or PDF format.
- **Query Parameters**:
  - `format`: `docx` or `pdf` (default: `docx`).
- **Response**:
  - `200 OK`: File download.
