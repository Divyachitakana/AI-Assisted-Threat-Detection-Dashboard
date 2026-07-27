from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.report import ReportSummary
from app.services import report_service
from app.utils.logging_config import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("", response_model=list[ReportSummary], summary="List generated weekly/monthly reports")
def get_reports(db: Session = Depends(get_db)):
    reports = report_service.list_reports(db)
    logger.info("GET /reports -> %d reports", len(reports))
    return reports
