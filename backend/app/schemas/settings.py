from app.schemas.common import CamelModel


class NotificationPreferences(CamelModel):
    critical_alerts: bool
    weekly_digest: bool
    incident_assigned: bool
    ai_insights: bool


class DashboardPreferences(CamelModel):
    default_landing_page: str
    show_ai_insights: bool
    compact_cards: bool


class UserPreferences(CamelModel):
    theme: str
    dense_tables: bool
    auto_refresh_interval: int
    notifications: NotificationPreferences
    dashboard: DashboardPreferences
