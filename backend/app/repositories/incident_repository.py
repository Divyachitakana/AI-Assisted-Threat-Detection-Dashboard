from sqlalchemy.orm import Session

from app.models.incident import Incident


def list_incidents(db: Session) -> list[Incident]:
    return db.query(Incident).order_by(Incident.updated_at.desc()).all()


def get_incident_by_id(db: Session, incident_id: str) -> Incident | None:
    return db.query(Incident).filter(Incident.id == incident_id).first()
