from app.schemas.common import CamelModel, Severity


class SeverityDistribution(CamelModel):
    severity: Severity
    count: int


class AttackTrendPoint(CamelModel):
    timestamp: str
    critical: int
    high: int
    medium: int
    low: int


class ThreatCategoryCount(CamelModel):
    category: str
    count: int


class TopAttackSource(CamelModel):
    ip: str
    country: str
    attack_count: int
    risk_score: int


class SecurityOverviewMetrics(CamelModel):
    total_threats: int
    total_threats_delta: int
    active_alerts: int
    active_alerts_delta: int
    risk_score: int
    risk_score_delta: int
    assets_monitored: int
    assets_monitored_delta: int


class AssetSummary(CamelModel):
    id: str
    name: str
    type: str
    risk_score: int
    criticality: str


class AnalyticsResponse(CamelModel):
    severity_distribution: list[SeverityDistribution]
    attack_trend: list[AttackTrendPoint]
    threat_categories: list[ThreatCategoryCount]
    top_attack_sources: list[TopAttackSource]
    assets: list[AssetSummary]
