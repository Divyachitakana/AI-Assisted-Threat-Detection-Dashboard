"""
Composes the five ML placeholder modules into the pipeline a real event
would flow through on ingestion (architecture diagram, 3A. Predictive
Threat Detection Engine). Not called on the hot path of any existing GET
endpoint today — alerts/incidents are seeded once — but this is the exact
function future ingestion code (Pub/Sub subscriber, Cloud Run job, etc.)
would call per incoming event, and it's what seed_data.py exercises to
generate confidence/risk scores.
"""

from app.ml import anomaly_detection, confidence_scoring, mitre_mapping, risk_scoring, threat_classification


def analyze_event(event_id: str, title: str, asset_criticality: str = "medium") -> dict:
    anomaly_score = anomaly_detection.score_anomaly(event_id)
    category, classification_confidence = threat_classification.classify_threat(event_id)
    confidence = confidence_scoring.compute_confidence(event_id)
    severity = _severity_from_anomaly_score(anomaly_score)
    risk = risk_scoring.compute_risk_score(severity, asset_criticality, jitter_seed=event_id)
    mapping = mitre_mapping.classify_technique(title)

    return {
        "event_id": event_id,
        "anomaly_score": anomaly_score,
        "predicted_category": category,
        "classification_confidence": classification_confidence,
        "confidence_score": confidence,
        "suggested_severity": severity,
        "risk_score": risk,
        "mitre_mapping": mapping,
    }


def _severity_from_anomaly_score(score: float) -> str:
    if score >= 0.85:
        return "critical"
    if score >= 0.65:
        return "high"
    if score >= 0.4:
        return "medium"
    if score >= 0.15:
        return "low"
    return "info"
