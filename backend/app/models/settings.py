from sqlalchemy import String, Boolean, Integer, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class AppSettings(Base):
    """
    Single-row table (id fixed at 1) holding the current user's preferences.
    Multi-user support (one row per user) is a straightforward follow-up
    once authentication lands — the shape already matches the frontend's
    `UserPreferences` type so no API contract change would be needed.
    """

    __tablename__ = "settings"

    id: Mapped[int] = mapped_column(Integer, primary_key=True, default=1)
    theme: Mapped[str] = mapped_column(String, nullable=False, default="dark")
    dense_tables: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    auto_refresh_interval: Mapped[int] = mapped_column(Integer, nullable=False, default=30)
    notifications: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    dashboard: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
