"""
Test endpoint for the Job Analyzer Agent.
"""
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional


router = APIRouter()


@router.post("/test-agent")
async def test_agent():
    return {"message": "Test agent is working!"}
