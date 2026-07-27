from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from app.config import get_settings
from app.database import SessionLocal, init_db
from app.routers import (
    alerts,
    analytics,
    assistant,
    dashboard,
    dataset,
    incidents,
    reports,
    settings as settings_router,
    threats,
)
from app.seed.seed_data import seed_database
from app.routers import prediction
from app.utils.logging_config import get_logger, setup_logging

settings = get_settings()
setup_logging("DEBUG" if settings.ENV == "development" else "INFO")
logger = get_logger("app")

app = FastAPI(
    title=settings.APP_NAME,
    version="0.1.0",
    description=(
        "Backend for the AI-Assisted Threat Detection Dashboard. Serves the "
        "Threat Monitor, Active Alerts, Incident Management, Threat Analytics, "
        "Threat Map, AI Assistant, Reports, and Settings pages of the React "
        "frontend with response shapes matching src/types/index.ts exactly."
    ),
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register all API routers
for router in (
    dashboard.router,
    threats.router,
    alerts.router,
    incidents.router,
    analytics.router,
    reports.router,
    assistant.router,
    settings_router.router,
    dataset.router,
):
    app.include_router(router, prefix=settings.API_PREFIX)
    app.include_router(prediction.router)


@app.exception_handler(Exception)
async def unhandled_exception_handler(request: Request, exc: Exception) -> JSONResponse:
    logger.exception("Unhandled error on %s %s", request.method, request.url.path)
    return JSONResponse(
        status_code=500,
        content={
            "detail": "An unexpected error occurred. Please try again or contact support."
        },
    )


@app.on_event("startup")
def on_startup() -> None:
    logger.info("Initializing database at %s", settings.DATABASE_URL)
    init_db()

    if settings.AUTO_SEED:
        db = SessionLocal()
        try:
            seed_database(db)
            logger.info("Database seed check complete")
        finally:
            db.close()


@app.get("/health", tags=["meta"])
def health_check():
    return {
        "status": "ok",
        "service": settings.APP_NAME,
        "env": settings.ENV,
    }


@app.get("/", tags=["meta"])
def root():
    return {
        "message": f"{settings.APP_NAME} is running",
        "docs": "/docs",
        "health": "/health",
        "api_prefix": settings.API_PREFIX,
    }