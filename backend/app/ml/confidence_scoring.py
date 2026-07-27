"""
Placeholder for detection confidence scoring — how sure the detection
engine is that a flagged event is a true positive. Kept separate from
risk scoring (impact-oriented) since they answer different questions:
"how sure are we?" vs. "how bad would it be?".
"""

import hashlib


def compute_confidence(event_id: str) -> int:
    digest = hashlib.sha256(f"confidence:{event_id}".encode()).hexdigest()
    return 55 + (int(digest[:4], 16) % 45)  # 55-99
