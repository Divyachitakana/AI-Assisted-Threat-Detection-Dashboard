from app.schemas.common import CamelModel, Severity


class ThreatMapPointOut(CamelModel):
    id: str
    lat: float
    lng: float
    country: str
    severity: Severity
    event_count: int


class CountryThreatStat(CamelModel):
    country: str
    country_code: str
    lat: float
    lng: float
    threat_count: int
    severity: Severity
