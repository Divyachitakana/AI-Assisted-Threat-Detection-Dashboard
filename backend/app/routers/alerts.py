from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.common import PaginatedResponse
from app.schemas.threat import ThreatOut
from app.services import threat_service
from app.utils.logging_config import get_logger
from app.utils.pagination import AlertFilterParams, PaginationParams

logger = get_logger(__name__)

router = APIRouter(prefix="/alerts", tags=["alerts"])


@router.get("", response_model=PaginatedResponse[ThreatOut], summary="List alerts (Active Alerts queue)")
def get_alerts(
    pagination: PaginationParams = Depends(),
    filters: AlertFilterParams = Depends(),
    db: Session = Depends(get_db),
):
    logger.info(
        "GET /alerts page=%s pageSize=%s search=%r severities=%s statuses=%s",
        pagination.page, pagination.page_size, filters.search, filters.severities, filters.statuses,
    )
    return threat_service.list_threats(
        db,
        page=pagination.page,
        page_size=pagination.page_size,
        search=filters.search,
        severities=filters.severities,
        statuses=filters.statuses,
        source=filters.source,
    )


@router.get("/{alert_id}", response_model=ThreatOut, summary="Get a single alert by ID")
def get_alert(alert_id: str, db: Session = Depends(get_db)):
    alert = threat_service.get_threat(db, alert_id)
    if not alert:
        logger.warning("Alert not found: %s", alert_id)
        raise HTTPException(status_code=404, detail=f"Alert '{alert_id}' not found")
    return alert
