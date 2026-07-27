from datetime import datetime

from sqlalchemy import String, Integer, DateTime, JSON
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class Incident(Base):
    __tablename__ = "incidents"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    severity: Mapped[str] = mapped_column(String, nullable=False, index=True)
    status: Mapped[str] = mapped_column(String, nullable=False, index=True)
    assignee: Mapped[str | None] = mapped_column(String, nullable=True)
    risk_score: Mapped[int] = mapped_column(Integer, nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, index=True)

    # SQLite has no native array/relation-lite type for a small embedded
    # list, so alert_ids and timeline are stored as JSON — mirrors exactly
    # what the frontend's Incident.alertIds / Incident.timeline expect.
    alert_ids: Mapped[list[str]] = mapped_column(JSON, nullable=False, default=list)
    timeline: Mapped[list[dict]] = mapped_column(JSON, nullable=False, default=list)

    # MITRE ATT&CK mapping and response recommendations are incident-scoped
    # in this data model (each incident maps to one primary technique),
    # embedded here rather than normalized into their own tables since
    # they're always fetched together with the incident.
    mitre_tactic_id: Mapped[str | None] = mapped_column(String, nullable=True)
    mitre_tactic_name: Mapped[str | None] = mapped_column(String, nullable=True)
    mitre_technique_id: Mapped[str | None] = mapped_column(String, nullable=True)
    mitre_technique_name: Mapped[str | None] = mapped_column(String, nullable=True)
    response_recommendations: Mapped[list[dict]] = mapped_column(JSON, nullable=False, default=list)
