from sqlalchemy.orm import Session

from app.models.settings import AppSettings
from app.repositories import settings_repository
from app.schemas.settings import UserPreferences


def _to_schema(row: AppSettings) -> UserPreferences:
    return UserPreferences(
        theme=row.theme,
        dense_tables=row.dense_tables,
        auto_refresh_interval=row.auto_refresh_interval,
        notifications=row.notifications,
        dashboard=row.dashboard,
    )


def get_settings(db: Session) -> UserPreferences:
    row = settings_repository.get_settings_row(db)
    if row is None:
        row = AppSettings(id=1, notifications={}, dashboard={})
    return _to_schema(row)


def update_settings(db: Session, payload: UserPreferences) -> UserPreferences:
    row = settings_repository.get_settings_row(db) or AppSettings(id=1)
    row.theme = payload.theme
    row.dense_tables = payload.dense_tables
    row.auto_refresh_interval = payload.auto_refresh_interval
    row.notifications = payload.notifications.model_dump(by_alias=True)
    row.dashboard = payload.dashboard.model_dump(by_alias=True)
    saved = settings_repository.save_settings(db, row)
    return _to_schema(saved)
