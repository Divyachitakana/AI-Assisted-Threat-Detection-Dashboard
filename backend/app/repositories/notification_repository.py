from sqlalchemy.orm import Session

from app.models.notification import Notification


def list_notifications(db: Session) -> list[Notification]:
    return db.query(Notification).order_by(Notification.created_at.desc()).all()
