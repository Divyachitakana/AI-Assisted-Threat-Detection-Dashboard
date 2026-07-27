from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.dashboard import DashboardResponse
from app.schemas.notification import NotificationOut
from app.services import dashboard_service, notification_service
from app.utils.logging_config import get_logger

logger = get_logger(__name__)

router = APIRouter(tags=["dashboard"])


@router.get("/dashboard", response_model=DashboardResponse, summary="Security Overview bundle")
def get_dashboard(db: Session = Depends(get_db)):
    logger.info("GET /dashboard")
    return dashboard_service.get_dashboard(db)


@router.get("/notifications", response_model=list[NotificationOut], summary="Topbar notification feed")
def get_notifications(db: Session = Depends(get_db)):
    return notification_service.list_notifications(db)
