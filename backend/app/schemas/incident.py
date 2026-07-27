from datetime import datetime
from typing import Literal

from app.schemas.common import CamelModel, Severity, IncidentStatus


class IncidentTimelineEvent(CamelModel):
    id: str
    label: str
    actor: Literal["system", "analyst", "ai_assistant"]
    timestamp: datetime
    detail: str | None = None


class MitreMapping(CamelModel):
    tactic_id: str
    tactic_name: str
    technique_id: str
    technique_name: str


class ResponseRecommendation(CamelModel):
    id: str
    action: str
    priority: Literal["immediate", "high", "recommended"]
    automatable: bool


class IncidentOut(CamelModel):
    id: str
    alert_ids: list[str]
    title: str
    severity: Severity
    status: IncidentStatus
    assignee: str | None = None
    risk_score: int
    created_at: datetime
    updated_at: datetime
    timeline: list[IncidentTimelineEvent]

    # Extensions beyond the bare frontend `Incident` type: embedding these
    # here lets incidents.service.ts fetch MITRE mapping and response
    # recommendations from the same GET /incidents/{id} call instead of
    # three separate round trips, while each field still matches the
    # standalone MitreMapping / ResponseRecommendation[] shapes exactly.
    mitre_mapping: MitreMapping | None = None
    response_recommendations: list[ResponseRecommendation] = []
