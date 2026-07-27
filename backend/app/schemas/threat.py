from datetime import datetime

from app.schemas.common import CamelModel, Severity, IncidentStatus, AlertPriority, DataSourceType


class AssignedAnalyst(CamelModel):
    id: str
    name: str
    initials: str


class ThreatOut(CamelModel):
    """Mirrors the frontend's `Alert` type exactly (types/index.ts)."""

    id: str
    title: str
    description: str
    severity: Severity
    status: IncidentStatus
    source: DataSourceType
    mitre_tactic: str | None = None
    mitre_technique_id: str | None = None
    confidence_score: int
    risk_score: int
    asset_id: str | None = None
    source_ip: str | None = None
    destination_ip: str | None = None
    detected_at: datetime
    updated_at: datetime
    priority: AlertPriority
    assigned_analyst: AssignedAnalyst | None = None
    cve_id: str | None = None
    attack_type: str
