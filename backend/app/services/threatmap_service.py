from sqlalchemy.orm import Session

from app.repositories import threatmap_repository
from app.schemas.threatmap import CountryThreatStat, ThreatMapPointOut


def get_map_points(db: Session) -> list[ThreatMapPointOut]:
    return [
        ThreatMapPointOut(
            id=p.id, lat=p.lat, lng=p.lng, country=p.country,
            severity=p.severity, event_count=p.event_count,
        )
        for p in threatmap_repository.list_map_points(db)
    ]


def get_country_stats(db: Session) -> list[CountryThreatStat]:
    return [
        CountryThreatStat(
            country=s.country, country_code=s.country_code, lat=s.lat, lng=s.lng,
            threat_count=s.threat_count, severity=s.severity,
        )
        for s in threatmap_repository.list_country_stats(db)
    ]
