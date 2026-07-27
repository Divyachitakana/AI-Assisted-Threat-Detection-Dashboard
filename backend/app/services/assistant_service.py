import re
import uuid
from datetime import datetime, UTC

from app.schemas.assistant import ChatMessageOut, RagCitation

SUGGESTED_QUESTIONS = [
    "Summarize today's critical alerts",
    "What's the MITRE mapping for INC-00001?",
    "Recommend containment steps for brute-force attacks",
    "Which assets have the highest risk score right now?",
    "Explain the DNS tunneling detection on vpn-gateway-corp",
]

# Pattern-matched canned responses, mirroring the frontend mock so behavior
# doesn't change during the mock -> real-backend cutover. Swap `generate_reply`
# for a call to Vertex AI / Gemini (with retrieval over the vector database +
# MITRE ATT&CK knowledge base + internal playbooks, per the architecture
# diagram's Generative AI Assistant Agent) without touching the router or
# the response schema.
_CANNED_RESPONSES: list[tuple[re.Pattern, str, list[RagCitation] | None]] = [
    (
        re.compile(r"critical", re.IGNORECASE),
        "There are 2 critical alerts in the last 24 hours: a ransomware behavior pattern on "
        "billing-service-vm-03 and a cryptomining match against a prior contained incident. "
        "Both are assigned and being triaged.",
        [RagCitation(label="MITRE ATT&CK T1486", source_type="mitre_attck", ref_id="T1486")],
    ),
    (
        re.compile(r"mitre|technique|tactic", re.IGNORECASE),
        "Most incidents this week map to Credential Access (TA0006) via Brute Force (T1110) "
        "and Execution (TA0002) via PowerShell (T1059.001). I can pull the full mapping for a "
        "specific incident if you give me its ID.",
        [RagCitation(label="MITRE ATT&CK TA0006", source_type="mitre_attck", ref_id="TA0006")],
    ),
    (
        re.compile(r"brute.?force|containment|recommend", re.IGNORECASE),
        "Recommended containment for brute-force patterns: isolate the source IP range at the "
        "edge, enforce rate limiting on the auth endpoint, and force credential rotation for any "
        "accounts with successful logins from the flagged range.",
        [RagCitation(label="Internal Playbook: Credential Access Response", source_type="internal_playbook", ref_id="PB-014")],
    ),
    (
        re.compile(r"risk|asset", re.IGNORECASE),
        "Highest risk assets right now: customer-data-bucket (risk 68, storage) and "
        "prod-k8s-cluster-us-east (risk 74, compute) due to the active cryptomining signature.",
        None,
    ),
]

_FALLBACK_REPLY = (
    "Based on current alert and incident data, I don't see a strong signal matching that yet — "
    "try asking about a specific alert ID, incident ID, or MITRE technique."
)


def get_suggested_questions() -> list[str]:
    return SUGGESTED_QUESTIONS


def generate_reply(message: str) -> ChatMessageOut:
    reply, citations = _FALLBACK_REPLY, None
    for pattern, text, cited in _CANNED_RESPONSES:
        if pattern.search(message):
            reply, citations = text, cited
            break

    return ChatMessageOut(
        id=f"msg-{uuid.uuid4().hex[:12]}",
        role="assistant",
        content=reply,
        cited_sources=citations,
        created_at=datetime.now(UTC).isoformat(),
    )
