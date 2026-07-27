from sqlalchemy.orm import Session

from app.models.report import Report
from app.repositories import report_repository
from app.schemas.analytics import SecurityOverviewMetrics
from app.schemas.report import ReportSummary


def _to_schema(report: Report) -> ReportSummary:
    return ReportSummary(
        id=report.id,
        title=report.title,
        period=report.period,
        date_range=report.date_range,
        generated_at=report.generated_at.isoformat(),
        highlights=report.highlights,
        metrics=SecurityOverviewMetrics(**report.metrics),
    )


def list_reports(db: Session) -> list[ReportSummary]:
    return [_to_schema(r) for r in report_repository.list_reports(db)]
