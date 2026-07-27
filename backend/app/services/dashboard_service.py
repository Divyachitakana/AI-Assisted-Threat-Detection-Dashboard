from sqlalchemy.orm import Session

from app.repositories import insight_repository
from app.schemas.dashboard import AiInsightOut, DashboardResponse
from app.services import analytics_service, threat_service


def get_dashboard(db: Session) -> DashboardResponse:
    insights = [
        AiInsightOut(
            id=i.id, title=i.title, summary=i.summary, severity=i.severity,
            related_alert_id=i.related_alert_id, generated_at=i.generated_at.isoformat(),
        )
        for i in insight_repository.list_insights(db)
    ]

    return DashboardResponse(
        metrics=analytics_service.get_overview_metrics(db),
        severity_distribution=analytics_service.get_severity_distribution(db),
        attack_trend=analytics_service.get_attack_trend(),
        recent_threats=threat_service.recent_threats(db, limit=6),
        ai_insights=insights,
    )
