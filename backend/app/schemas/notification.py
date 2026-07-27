from app.schemas.common import CamelModel, Severity


class NotificationOut(CamelModel):
    id: str
    title: str
    message: str
    severity: Severity
    read: bool
    created_at: str
