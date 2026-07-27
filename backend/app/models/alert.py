from datetime import datetime

from sqlalchemy import String, Integer, DateTime, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database import Base


class Analyst(Base):
    __tablename__ = "analysts"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    name: Mapped[str] = mapped_column(String, nullable=False)
    initials: Mapped[str] = mapped_column(String(4), nullable=False)

    alerts: Mapped[list["Alert"]] = relationship(back_populates="assigned_analyst")


class Alert(Base):
    """
    Backs both the /threats and /alerts endpoints — the frontend's `Alert`
    TypeScript type (which extends `ThreatAlert`) is a single shape used by
    both the Threat Monitor and Active Alerts pages, so one table serves
    both routers via two repository query shapes.
    """

    __tablename__ = "alerts"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    description: Mapped[str] = mapped_column(String, nullable=False)
    severity: Mapped[str] = mapped_column(String, nullable=False, index=True)
    status: Mapped[str] = mapped_column(String, nullable=False, index=True)
    source: Mapped[str] = mapped_column(String, nullable=False)
    mitre_tactic: Mapped[str | None] = mapped_column(String, nullable=True)
    mitre_technique_id: Mapped[str | None] = mapped_column(String, nullable=True)
    confidence_score: Mapped[int] = mapped_column(Integer, nullable=False)
    risk_score: Mapped[int] = mapped_column(Integer, nullable=False)
    asset_id: Mapped[str | None] = mapped_column(String, nullable=True)
    source_ip: Mapped[str | None] = mapped_column(String, nullable=True)
    destination_ip: Mapped[str | None] = mapped_column(String, nullable=True)
    detected_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, index=True)
    updated_at: Mapped[datetime] = mapped_column(DateTime, nullable=False)

    priority: Mapped[str] = mapped_column(String, nullable=False)
    cve_id: Mapped[str | None] = mapped_column(String, nullable=True)
    attack_type: Mapped[str] = mapped_column(String, nullable=False)

    assigned_analyst_id: Mapped[str | None] = mapped_column(
        String, ForeignKey("analysts.id"), nullable=True
    )
    assigned_analyst: Mapped[Analyst | None] = relationship(back_populates="alerts")
