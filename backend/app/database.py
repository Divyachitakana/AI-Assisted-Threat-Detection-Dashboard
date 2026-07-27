from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

from app.config import get_settings

settings = get_settings()

connect_args = {"check_same_thread": False} if settings.DATABASE_URL.startswith("sqlite") else {}

engine = create_engine(settings.DATABASE_URL, connect_args=connect_args)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)


class Base(DeclarativeBase):
    pass


def init_db() -> None:
    """Create all tables. Safe to call repeatedly (no-op if tables exist).

    In production this is replaced by Alembic migrations (see
    `alembic/` once `alembic init` has been run against this metadata) —
    kept as a direct create_all() here so the dev experience is a single
    `uvicorn app.main:app --reload` with no extra setup step.
    """
    # Import models so they're registered on Base.metadata before create_all.
    from app.models import (  # noqa: F401
        alert,
        asset,
        incident,
        insight,
        notification,
        report,
        settings as settings_model,
        threatmap,
    )

    Base.metadata.create_all(bind=engine)
