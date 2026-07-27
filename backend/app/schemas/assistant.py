from typing import Literal

from app.schemas.common import CamelModel


class RagCitation(CamelModel):
    label: str
    source_type: Literal["mitre_attck", "internal_playbook", "incident_record"]
    ref_id: str


class ChatMessageOut(CamelModel):
    id: str
    role: Literal["user", "assistant", "system"]
    content: str
    cited_sources: list[RagCitation] | None = None
    created_at: str


class ChatRequest(CamelModel):
    message: str
