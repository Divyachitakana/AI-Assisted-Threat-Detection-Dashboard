from sqlalchemy import String, Integer, Float
from sqlalchemy.orm import Mapped, mapped_column

from app.database import Base


class ThreatMapPoint(Base):
    __tablename__ = "threat_map_points"

    id: Mapped[str] = mapped_column(String, primary_key=True)
    lat: Mapped[float] = mapped_column(Float, nullable=False)
    lng: Mapped[float] = mapped_column(Float, nullable=False)
    country: Mapped[str] = mapped_column(String, nullable=False)
    severity: Mapped[str] = mapped_column(String, nullable=False)
    event_count: Mapped[int] = mapped_column(Integer, nullable=False)


class CountryStat(Base):
    __tablename__ = "country_threat_stats"

    country_code: Mapped[str] = mapped_column(String, primary_key=True)
    country: Mapped[str] = mapped_column(String, nullable=False)
    lat: Mapped[float] = mapped_column(Float, nullable=False)
    lng: Mapped[float] = mapped_column(Float, nullable=False)
    threat_count: Mapped[int] = mapped_column(Integer, nullable=False)
    severity: Mapped[str] = mapped_column(String, nullable=False)
