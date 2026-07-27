from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.schemas.settings import UserPreferences
from app.services import settings_service
from app.utils.logging_config import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/settings", tags=["settings"])


@router.get("", response_model=UserPreferences, summary="Get current user preferences")
def get_settings(db: Session = Depends(get_db)):
    return settings_service.get_settings(db)


@router.put("", response_model=UserPreferences, summary="Update user preferences")
def put_settings(payload: UserPreferences, db: Session = Depends(get_db)):
    try:
        return settings_service.update_settings(db, payload)
    except SQLAlchemyError:
        logger.exception("Failed to persist settings update")
        db.rollback()
        raise HTTPException(status_code=500, detail="Could not save settings — please try again")
