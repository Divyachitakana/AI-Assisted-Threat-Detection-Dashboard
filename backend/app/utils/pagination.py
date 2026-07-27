from fastapi import Query


class PaginationParams:
    """
    Shared pagination dependency for list endpoints. Using a dependency
    class (rather than repeating the same Query(...) declarations in every
    router) is the standard FastAPI DI pattern for cross-cutting request
    parameters — see threats.py / alerts.py for usage via `Depends`.
    """

    def __init__(
        self,
        page: int = Query(1, ge=1, description="1-indexed page number"),
        page_size: int = Query(10, ge=1, le=100, alias="pageSize", description="Items per page"),
    ) -> None:
        self.page = page
        self.page_size = page_size


class AlertFilterParams:
    """Shared search/filter dependency for the threats and alerts routers."""

    def __init__(
        self,
        search: str | None = Query(None, description="Free-text search across title, IP, asset, CVE"),
        severities: str | None = Query(None, description="Comma-separated severities, e.g. 'critical,high'"),
        statuses: str | None = Query(None, description="Comma-separated statuses"),
        source: str | None = Query(None, description="Filter by data source"),
    ) -> None:
        self.search = search
        self.severities = _split(severities)
        self.statuses = _split(statuses)
        self.source = source


def _split(value: str | None) -> list[str] | None:
    if not value:
        return None
    return [v.strip() for v in value.split(",") if v.strip()]
