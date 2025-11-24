from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Resume Builder API"
    VERSION: str = "1.0.0"
    GOOGLE_API_KEY: str | None = None
    GOOGLE_GENAI_USE_VERTEXAI: bool = False

    class Config:
        env_file = ".env"

settings = Settings()
