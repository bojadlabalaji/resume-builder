# Backend API Requirements for Resume Builder

## Overview
This document outlines the backend API endpoints needed for the resume builder frontend.

## 1. Document Management

### 1.1 Create New Document
`POST /api/documents`

Creates a new resume or cover letter document.

**Request**:
```json
{
  "type": "resume" | "cover_letter",
  "userId": "string"
}
```

**Response**:
```json
{
  "documentId": "string",
 "type": "resume" | "cover_letter",
  "status": "draft",
  "createdAt": "timestamp"
}
```

### 1.2 Get Document
`GET /api/documents/:documentId`

Returns document content and metadata.

### 1.3 List Documents (Library)
`GET /api/documents?userId=<userId>&type=<type>`

Returns all user's documents for library view.

**Response**:
```json
{
  "documents": [
    {
      "documentId": "string",
      "type": "resume" | "cover_letter",
      "title": "string",
      "preview": "string",
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    }
  ]
}
```

### 1.4 Update Document
`PUT /api/documents/:documentId`

Updates document content.

### 1.5 Delete Document
`DELETE /api/documents/:documentId`

## 2. File Upload

### 2.1 Upload Resume
`POST /api/upload/resume`

Upload existing resume file (PDF/DOCX) for parsing.

**Request**: Multipart form data
- `file`: File
- `userId`: string

**Response**:
```json
{
  "uploadId": "string",
  "status": "processing"
}
```

### 2.2 Get Upload Status
`GET /api/upload/:uploadId/status`

Returns processing status and parsed content when ready.

## 3. AI Generation

### 3.1 Generate Resume
`POST /api/generate/resume`

Generate/improve resume content with AI.

### 3.2 Generate Cover Letter
`POST /api/generate/cover-letter`

Generate cover letter based on resume and job description.

### 3.3 Chat for Improvements
`POST /api/chat/resume`

Chat-based resume improvement suggestions.

## 4. Export

### 4.1 Export as PDF
`POST /api/export/pdf`

Generates PDF from document.

### 4.2 Export as DOCX
`POST /api/export/docx`

Generates DOCX from document.

## 5. Templates

### 5.1 List Templates
`GET /api/templates?type=<type>`

Returns available templates.

## 6. User Profile

### 6.1 Get Profile
`GET /api/profile/:userId`

Returns user's saved profile data for auto-fill.

### 6.2 Update Profile
`PUT /api/profile/:userId`

Updates user profile.

## Authentication

All endpoints require Bearer token in Authorization header.

## Rate Limiting

- API: 100 requests/minute
- Upload: 10 files/hour
- AI: 20 requests/hour
