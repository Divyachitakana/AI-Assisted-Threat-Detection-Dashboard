import random
from datetime import datetime, timedelta, UTC
from math import sin

from sqlalchemy.orm import Session

from app.models.asset import Asset
from app.repositories import asset_repository, threat_repository
from app.schemas.analytics import (
    AnalyticsResponse,
    AssetSummary,
    AttackTrendPoint,
    SecurityOverviewMetrics,
    SeverityDistribution,
    ThreatCategoryCount,
    TopAttackSource,
)

from app.seed.reference_data import THREAT_COUNTRIES
from app.services.dataset_service import load_training_data


_ALL_SEVERITIES = [
    "critical",
    "high",
    "medium",
    "low",
    "info"
]


# -------------------------------
# Existing mock trend generation
# -------------------------------

_trend_rng = random.Random(2024)
_sources_rng = random.Random(4096)


def _generate_attack_trend() -> list[AttackTrendPoint]:

    points = []

    today = datetime.now(UTC).date()

    for i in range(30):

        day = today - timedelta(days=29 - i)

        base = 4 + round(3 * sin(i / 4))

        points.append(
            AttackTrendPoint(
                timestamp=day.isoformat(),
                critical=max(
                    0,
                    base - 3 + _trend_rng.randint(0, 2)
                ),
                high=max(
                    0,
                    base - 1 + _trend_rng.randint(0, 3)
                ),
                medium=max(
                    0,
                    base + 2 + _trend_rng.randint(0, 4)
                ),
                low=max(
                    0,
                    base + 4 + _trend_rng.randint(0, 5)
                ),
            )
        )

    return points



def _generate_top_attack_sources():

    sources = []

    for _ in range(8):

        country = _sources_rng.choice(
            THREAT_COUNTRIES
        )

        ip = ".".join(
            str(_sources_rng.randint(1,254))
            for _ in range(4)
        )

        sources.append(
            TopAttackSource(
                ip=ip,
                country=country["country"],
                attack_count=_sources_rng.randint(
                    12,
                    340
                ),
                risk_score=_sources_rng.randint(
                    40,
                    99
                ),
            )
        )


    return sorted(
        sources,
        key=lambda x:x.attack_count,
        reverse=True
    )



_ATTACK_TREND_CACHE = _generate_attack_trend()

_TOP_SOURCES_CACHE = _generate_top_attack_sources()



# -------------------------------
# Asset conversion
# -------------------------------

def _asset_to_schema(asset: Asset):

    return AssetSummary(
        id=asset.id,
        name=asset.name,
        type=asset.type,
        risk_score=asset.risk_score,
        criticality=asset.criticality,
    )



# -------------------------------
# Dataset based functions
# -------------------------------


def get_dataset_statistics():

    df = load_training_data()


    total = len(df)


    attacks = int(
        df[df["label"] == 1].shape[0]
    )


    normal = int(
        df[df["label"] == 0].shape[0]
    )


    return {
        "total": total,
        "attacks": attacks,
        "normal": normal
    }



def get_severity_distribution(
    db: Session
):

    stats = get_dataset_statistics()


    attacks = stats["attacks"]


    return [

        SeverityDistribution(
            severity="critical",
            count=int(attacks * 0.30)
        ),

        SeverityDistribution(
            severity="high",
            count=int(attacks * 0.25)
        ),

        SeverityDistribution(
            severity="medium",
            count=int(attacks * 0.20)
        ),

        SeverityDistribution(
            severity="low",
            count=int(attacks * 0.25)
        ),

        SeverityDistribution(
            severity="info",
            count=0
        )

    ]



def get_threat_categories(
    db: Session
):

    df = load_training_data()


    if "attack_cat" not in df.columns:
        return []


    counts = (
        df["attack_cat"]
        .value_counts()
        .head(10)
    )


    return [

        ThreatCategoryCount(
            category=str(category),
            count=int(value)
        )

        for category,value in counts.items()

    ]



def get_top_attack_sources():

    return _TOP_SOURCES_CACHE



def get_attack_trend():

    return _ATTACK_TREND_CACHE



# -------------------------------
# Dashboard metrics
# -------------------------------


def get_overview_metrics(
    db: Session
):

    stats = get_dataset_statistics()


    total = stats["total"]

    attacks = stats["attacks"]


    risk = int(
        (attacks / total) * 100
    )


    return SecurityOverviewMetrics(

        total_threats=total,

        total_threats_delta=0,


        active_alerts=attacks,

        active_alerts_delta=0,


        risk_score=risk,

        risk_score_delta=0,


        assets_monitored=asset_repository.count_assets(db),

        assets_monitored_delta=0

    )



# -------------------------------
# Complete analytics response
# -------------------------------


def get_analytics(
    db: Session
):

    return AnalyticsResponse(

        severity_distribution=
            get_severity_distribution(db),


        attack_trend=
            get_attack_trend(),


        threat_categories=
            get_threat_categories(db),


        top_attack_sources=
            get_top_attack_sources(),


        assets=[
            _asset_to_schema(a)
            for a in asset_repository.list_assets(db)
        ]

    )