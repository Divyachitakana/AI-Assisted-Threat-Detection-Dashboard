from sqlalchemy.orm import Session

from app.ml import mitre_mapping
from app.models.incident import Incident
from app.repositories import incident_repository
from app.schemas.incident import IncidentOut, MitreMapping, ResponseRecommendation


def _to_schema(incident: Incident) -> IncidentOut:
    if incident.mitre_technique_id:
        mapping = MitreMapping(
            tactic_id=incident.mitre_tactic_id,
            tactic_name=incident.mitre_tactic_name,
            technique_id=incident.mitre_technique_id,
            technique_name=incident.mitre_technique_name,
        )
    else:
        # Defensive fallback: any incident created without a stored mapping
        # (e.g. ingested directly from a future streaming pipeline before
        # classification completes) still gets a plausible mapping via the
        # ML placeholder rather than returning null to the frontend.
        predicted = mitre_mapping.classify_technique(incident.title)
        mapping = MitreMapping(**predicted)
    return IncidentOut(
        id=incident.id,
        alert_ids=incident.alert_ids,
        title=incident.title,
        severity=incident.severity,
        status=incident.status,
        assignee=incident.assignee,
        risk_score=incident.risk_score,
        created_at=incident.created_at,
        updated_at=incident.updated_at,
        timeline=incident.timeline,
        mitre_mapping=mapping,
        response_recommendations=[
            ResponseRecommendation(**r) for r in incident.response_recommendations
        ],
    )


def list_incidents(db: Session) -> list[IncidentOut]:
    return [_to_schema(i) for i in incident_repository.list_incidents(db)]


def get_incident(db: Session, incident_id: str) -> IncidentOut | None:
    incident = incident_repository.get_incident_by_id(db, incident_id)
    return _to_schema(incident) if incident else None
