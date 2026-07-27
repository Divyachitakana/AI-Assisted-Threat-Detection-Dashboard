from sqlalchemy import or_, func
from sqlalchemy.orm import Session, joinedload

from app.models.alert import Alert


def _base_query(db: Session):
    return db.query(Alert).options(joinedload(Alert.assigned_analyst))


def list_alerts(
    db: Session,
    page: int = 1,
    page_size: int = 10,
    search: str | None = None,
    severities: list[str] | None = None,
    statuses: list[str] | None = None,
    source: str | None = None,
) -> tuple[list[Alert], int]:
    query = _base_query(db)

    if search:
        like = f"%{search.lower()}%"
        query = query.filter(
            or_(
                func.lower(Alert.title).like(like),
                func.lower(Alert.source_ip).like(like),
                func.lower(Alert.asset_id).like(like),
                func.lower(Alert.cve_id).like(like),
            )
        )
    if severities:
        query = query.filter(Alert.severity.in_(severities))
    if statuses:
        query = query.filter(Alert.status.in_(statuses))
    if source:
        query = query.filter(Alert.source == source)

    total = query.count()
    items = (
        query.order_by(Alert.detected_at.desc())
        .offset((page - 1) * page_size)
        .limit(page_size)
        .all()
    )
    return items, total


def get_alert_by_id(db: Session, alert_id: str) -> Alert | None:
    return _base_query(db).filter(Alert.id == alert_id).first()


def recent_alerts(db: Session, limit: int = 6) -> list[Alert]:
    return _base_query(db).order_by(Alert.detected_at.desc()).limit(limit).all()


def count_alerts(db: Session) -> int:
    return db.query(func.count(Alert.id)).scalar() or 0


def count_active_alerts(db: Session) -> int:
    return (
        db.query(func.count(Alert.id))
        .filter(Alert.status.in_(["open", "investigating"]))
        .scalar()
        or 0
    )


def severity_distribution(db: Session) -> list[tuple[str, int]]:
    rows = db.query(Alert.severity, func.count(Alert.id)).group_by(Alert.severity).all()
    return [(severity, count) for severity, count in rows]


def threat_category_counts(db: Session) -> list[tuple[str, int]]:
    rows = (
        db.query(Alert.attack_type, func.count(Alert.id))
        .group_by(Alert.attack_type)
        .order_by(func.count(Alert.id).desc())
        .all()
    )
    return [(category, count) for category, count in rows]
