from sqlalchemy.orm import Session

from app.models.alert import Alert
from app.repositories import threat_repository
from app.schemas.common import PaginatedResponse
from app.schemas.threat import AssignedAnalyst, ThreatOut


def _to_schema(alert: Alert) -> ThreatOut:
    analyst = None
    if alert.assigned_analyst is not None:
        analyst = AssignedAnalyst(
            id=alert.assigned_analyst.id,
            name=alert.assigned_analyst.name,
            initials=alert.assigned_analyst.initials,
        )
    return ThreatOut(
        id=alert.id,
        title=alert.title,
        description=alert.description,
        severity=alert.severity,
        status=alert.status,
        source=alert.source,
        mitre_tactic=alert.mitre_tactic,
        mitre_technique_id=alert.mitre_technique_id,
        confidence_score=alert.confidence_score,
        risk_score=alert.risk_score,
        asset_id=alert.asset_id,
        source_ip=alert.source_ip,
        destination_ip=alert.destination_ip,
        detected_at=alert.detected_at,
        updated_at=alert.updated_at,
        priority=alert.priority,
        assigned_analyst=analyst,
        cve_id=alert.cve_id,
        attack_type=alert.attack_type,
    )


def list_threats(
    db: Session,
    page: int,
    page_size: int,
    search: str | None,
    severities: list[str] | None,
    statuses: list[str] | None,
    source: str | None,
) -> PaginatedResponse[ThreatOut]:
    items, total = threat_repository.list_alerts(
        db, page=page, page_size=page_size, search=search,
        severities=severities, statuses=statuses, source=source,
    )
    return PaginatedResponse[ThreatOut](
        items=[_to_schema(a) for a in items], total=total, page=page, page_size=page_size,
    )


def get_threat(db: Session, threat_id: str) -> ThreatOut | None:
    alert = threat_repository.get_alert_by_id(db, threat_id)
    return _to_schema(alert) if alert else None


def recent_threats(db: Session, limit: int = 6) -> list[ThreatOut]:
    return [_to_schema(a) for a in threat_repository.recent_alerts(db, limit=limit)]
