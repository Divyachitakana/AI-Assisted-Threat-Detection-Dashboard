from sqlalchemy.orm import Session

from app.models.insight import AiInsight


def list_insights(db: Session) -> list[AiInsight]:
    return db.query(AiInsight).order_by(AiInsight.generated_at.desc()).all()
