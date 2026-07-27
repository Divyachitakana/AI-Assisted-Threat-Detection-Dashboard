from sqlalchemy.orm import Session

from app.models.threatmap import CountryStat, ThreatMapPoint


def list_map_points(db: Session) -> list[ThreatMapPoint]:
    return db.query(ThreatMapPoint).all()


def list_country_stats(db: Session) -> list[CountryStat]:
    return db.query(CountryStat).order_by(CountryStat.threat_count.desc()).all()
