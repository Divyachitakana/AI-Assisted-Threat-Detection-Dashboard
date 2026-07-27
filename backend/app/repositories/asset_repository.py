from sqlalchemy import func
from sqlalchemy.orm import Session

from app.models.asset import Asset


def list_assets(db: Session) -> list[Asset]:
    return db.query(Asset).all()


def count_assets(db: Session) -> int:
    return db.query(func.count(Asset.id)).scalar() or 0
