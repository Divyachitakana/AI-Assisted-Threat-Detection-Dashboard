from app.schemas.analytics import SecurityOverviewMetrics, SeverityDistribution, AttackTrendPoint
from app.schemas.common import CamelModel
from app.schemas.threat import ThreatOut


class AiInsightOut(CamelModel):
    id: str
    title: str
    summary: str
    severity: str
    related_alert_id: str | None = None
    generated_at: str


class DashboardResponse(CamelModel):
    metrics: SecurityOverviewMetrics
    severity_distribution: list[SeverityDistribution]
    attack_trend: list[AttackTrendPoint]
    recent_threats: list[ThreatOut]
    ai_insights: list[AiInsightOut]
