from sqlalchemy.orm import Session

from app.repositories import notification_repository
from app.schemas.notification import NotificationOut


def list_notifications(db: Session) -> list[NotificationOut]:
    return [
        NotificationOut(
            id=n.id, title=n.title, message=n.message, severity=n.severity,
            read=n.read, created_at=n.created_at.isoformat(),
        )
        for n in notification_repository.list_notifications(db)
    ]
