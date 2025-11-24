from dotenv import load_dotenv
load_dotenv()

from fastapi import FastAPI
from app.core.config import settings
from app.api.v1.endpoints import test_agent, resume, user_profile, auth
from app.core.database import engine, Base

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION
)

# Include routers
app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(test_agent.router, prefix="/api/v1/test", tags=["test"])
app.include_router(resume.router, prefix="/api/v1/resume", tags=["resume"])
app.include_router(user_profile.router, prefix="/api/v1/user-profile", tags=["user-profile"])

@app.get("/health")
async def health_check():
    return {"status": "healthy", "version": settings.VERSION}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
