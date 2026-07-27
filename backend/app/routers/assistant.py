from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.dependencies import get_db
from app.repositories import insight_repository
from app.schemas.assistant import ChatMessageOut, ChatRequest
from app.schemas.dashboard import AiInsightOut
from app.services import assistant_service
from app.utils.logging_config import get_logger

logger = get_logger(__name__)

router = APIRouter(prefix="/assistant", tags=["assistant"])


@router.post("/chat", response_model=ChatMessageOut, summary="Send a message to the AI Security Assistant")
def post_chat_message(payload: ChatRequest):
    logger.info("Assistant chat message received (%d chars)", len(payload.message))
    return assistant_service.generate_reply(payload.message)


@router.get("/suggested-questions", response_model=list[str], summary="Starter prompts for the AI Assistant UI")
def get_suggested_questions():
    return assistant_service.get_suggested_questions()


@router.get("/insights", response_model=list[AiInsightOut], summary="Proactive AI-generated insights")
def get_insights(db: Session = Depends(get_db)):
    return [
        AiInsightOut(
            id=i.id, title=i.title, summary=i.summary, severity=i.severity,
            related_alert_id=i.related_alert_id, generated_at=i.generated_at.isoformat(),
        )
        for i in insight_repository.list_insights(db)
    ]
