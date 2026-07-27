from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.common import PaginatedResponse
from app.schemas.threat import ThreatOut
from app.schemas.threatmap import CountryThreatStat, ThreatMapPointOut
from app.services import threat_service, threatmap_service, detection_service
from app.utils.logging_config import get_logger
from app.utils.pagination import AlertFilterParams, PaginationParams

logger = get_logger(__name__)

router = APIRouter(prefix="/threats", tags=["threats"])


@router.get("", response_model=PaginatedResponse[ThreatOut], summary="List threats (Threat Monitor)")
def get_threats(
    pagination: PaginationParams = Depends(),
    filters: AlertFilterParams = Depends(),
    db: Session = Depends(get_db),
):
    logger.info(
        "GET /threats page=%s pageSize=%s search=%r severities=%s statuses=%s",
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


# NOTE: static sub-paths must be registered before the dynamic "/{threat_id}"
# route below, or FastAPI will try to match "map" as a threat_id.
@router.get("/map/points", response_model=list[ThreatMapPointOut], summary="Threat map markers")
def get_threat_map_points(db: Session = Depends(get_db)):
    return threatmap_service.get_map_points(db)


@router.get("/map/countries", response_model=list[CountryThreatStat], summary="Threat map country stats")
def get_threat_map_countries(db: Session = Depends(get_db)):
    return threatmap_service.get_country_stats(db)


@router.get("/{threat_id}", response_model=ThreatOut, summary="Get a single threat by ID")
def get_threat(threat_id: str, db: Session = Depends(get_db)):
    threat = threat_service.get_threat(db, threat_id)
    if not threat:
        logger.warning("Threat not found: %s", threat_id)
        raise HTTPException(status_code=404, detail=f"Threat '{threat_id}' not found")
    return threat


@router.get(
    "/{threat_id}/ml-analysis",
    summary="[Demo] Full ML pipeline output for a threat (anomaly, classification, confidence, risk, MITRE)",
    description=(
        "Not consumed by the current frontend — demonstrates the composed "
        "output of all five ML placeholder modules (app/ml/) for a given "
        "threat, as a future ingestion pipeline would call them per event."
    ),
)
def get_threat_ml_analysis(threat_id: str, db: Session = Depends(get_db)):
    threat = threat_service.get_threat(db, threat_id)
    if not threat:
        raise HTTPException(status_code=404, detail=f"Threat '{threat_id}' not found")
    return detection_service.analyze_event(threat_id, threat.title)
