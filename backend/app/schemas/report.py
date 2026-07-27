from app.schemas.analytics import SecurityOverviewMetrics
from app.schemas.common import CamelModel


class ReportSummary(CamelModel):
    id: str
    title: str
    period: str
    date_range: str
    generated_at: str
    highlights: list[str]
    metrics: SecurityOverviewMetrics
