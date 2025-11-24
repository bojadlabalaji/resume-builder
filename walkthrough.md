# Project Setup Walkthrough

## Overview
We have successfully initialized the **Resume Builder** application with a scalable architecture.

### Components
- **Backend**: Python FastAPI (Clean Architecture, SOLID, OCP for Agents).
- **Frontend**: Next.js (App Router, TypeScript, Tailwind CSS).
- **Infrastructure**: Docker & Docker Compose.

## Directory Structure
```
resume-builder/
├── backend/
│   ├── app/
│   │   ├── api/          # API Endpoints
│   │   └── core/         # Core logic & Interfaces (Agent/Orchestrator)
│   ├── main.py           # Entry point
│   └── Dockerfile
├── frontend/
│   ├── src/              # Next.js Source
│   ├── next.config.ts    # Docker optimization
│   └── Dockerfile
├── docs/                 # Project Documentation
└── docker-compose.yml    # Orchestration
```

## How to Run
> [!IMPORTANT]
> Ensure your Docker Daemon is running before executing these commands.

1. **Start the Application**:
   ```bash
   docker-compose up --build
   ```

2. **Access the Services**:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

## Verification
- **Backend Health Check**: `GET http://localhost:8000/health` should return `{"status": "healthy"}`.
- **Frontend**: Should display the default Next.js landing page.
