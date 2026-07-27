from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.analytics import AnalyticsResponse
from app.services import analytics_service
from app.utils.logging_config import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/analytics", tags=["analytics"])


@router.get("", response_model=AnalyticsResponse, summary="Attack trend, severity distribution, categories, top sources, assets")
def get_analytics(db: Session = Depends(get_db)):
    logger.info("GET /analytics")
    return analytics_service.get_analytics(db)
