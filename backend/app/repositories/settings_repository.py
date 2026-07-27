from sqlalchemy.orm import Session

from app.models.settings import AppSettings


def get_settings_row(db: Session) -> AppSettings | None:
    return db.query(AppSettings).filter(AppSettings.id == 1).first()


def save_settings(db: Session, settings_row: AppSettings) -> AppSettings:
    db.add(settings_row)
    db.commit()
    db.refresh(settings_row)
    return settings_row
