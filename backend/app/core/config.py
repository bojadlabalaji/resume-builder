from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Resume Builder API"
    VERSION: str = "1.0.0"
    GOOGLE_API_KEY: str | None = None
    GOOGLE_GENAI_USE_VERTEXAI: bool = False
    GEMINI_PRO_MODEL: str = "gemini-2.5-pro"
    GEMINI_FLASH_MODEL: str = "gemini-flash-latest"

    class Config:
        env_file = ".env"

settings = Settings()
