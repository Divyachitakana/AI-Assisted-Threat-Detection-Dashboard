"""
Placeholder for the anomaly detection model referenced in the architecture
diagram (3A. Predictive Threat Detection Engine — Isolation Forest).

Production implementation would load a trained `sklearn.ensemble.
IsolationForest` (or an equivalent Vertex AI custom model) from
`ml/model_store/` or a Vertex AI endpoint, and score real feature vectors
extracted from Cloud Audit Logs / VPC Flow Logs by the preprocessing layer.
This stub returns a deterministic, plausible anomaly score so the rest of
the system (API contracts, frontend) can be built and tested against it now.
"""

import hashlib


def score_anomaly(event_id: str, feature_vector: dict | None = None) -> float:
    """Returns a simulated anomaly score in [0, 1]. Higher = more anomalous."""
    digest = hashlib.sha256(event_id.encode()).hexdigest()
    return (int(digest[:8], 16) % 1000) / 1000
