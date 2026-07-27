from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.incident import IncidentOut
from app.services import incident_service
from app.utils.logging_config import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/incidents", tags=["incidents"])


@router.get("", response_model=list[IncidentOut], summary="List incidents")
def get_incidents(db: Session = Depends(get_db)):
    incidents = incident_service.list_incidents(db)
    logger.info("GET /incidents -> %d incidents", len(incidents))
    return incidents


@router.get("/{incident_id}", response_model=IncidentOut, summary="Get incident detail (timeline, MITRE mapping, recommendations)")
def get_incident(incident_id: str, db: Session = Depends(get_db)):
    incident = incident_service.get_incident(db, incident_id)
    if not incident:
        logger.warning("Incident not found: %s", incident_id)
        raise HTTPException(status_code=404, detail=f"Incident '{incident_id}' not found")
    return incident
