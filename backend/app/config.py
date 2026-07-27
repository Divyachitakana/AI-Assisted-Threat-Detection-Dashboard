from functools import lru_cache
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """
    Central app configuration. Values are overridable via environment
    variables or a `.env` file (see `.env.example`).
    """

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    APP_NAME: str = "AI-Assisted Threat Detection Dashboard API"
    ENV: str = "development"
    API_PREFIX: str = "/api"

    # SQLite for local development. Swap for a Cloud SQL / PostgreSQL URL in
    # production without touching any router or service code.
    DATABASE_URL: str = "sqlite:///./threat_dashboard.db"

    # Frontend origins allowed to call this API (Vite dev server by default).
    CORS_ORIGINS: list[str] = [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ]

    # Re-seed the database with mock data on startup if it's empty.
    AUTO_SEED: bool = True

    # ---- Future GCP integration placeholders -----------------------------
    # None of these are used yet. They exist so the config surface doesn't
    # change shape when the real integrations (Module 1/3 of the architecture
    # diagram) are wired in — only the service implementations behind
    # threat_service / analytics_service will change.
    GCP_PROJECT_ID: str | None = None
    BIGQUERY_DATASET: str | None = None
    PUBSUB_THREAT_TOPIC: str | None = None
    VERTEX_AI_ENDPOINT: str | None = None
    VERTEX_AI_LOCATION: str = "us-central1"
    CLOUD_STORAGE_BUCKET: str | None = None
    SECURITY_COMMAND_CENTER_ORG_ID: str | None = None


@lru_cache
def get_settings() -> Settings:
    return Settings()
