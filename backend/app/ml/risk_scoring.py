"""
Placeholder for the Risk Prioritization & Security Intelligence module
(Module 3 of the project statement): combines threat severity, asset
criticality, and vulnerability exposure into a single 0-100 risk score.

Production implementation would be a small regression/ranking model (or a
documented weighted-sum heuristic reviewed by the security team) fed by
real asset criticality metadata and CVE/exploit-availability signals.
"""

import hashlib

SEVERITY_WEIGHTS = {"critical": 90, "high": 70, "medium": 45, "low": 20, "info": 5}
CRITICALITY_WEIGHTS = {"critical": 1.3, "high": 1.15, "medium": 1.0, "low": 0.85}


def compute_risk_score(severity: str, asset_criticality: str = "medium", jitter_seed: str = "") -> int:
    base = SEVERITY_WEIGHTS.get(severity, 40)
    multiplier = CRITICALITY_WEIGHTS.get(asset_criticality, 1.0)
    jitter = 0
    if jitter_seed:
        digest = hashlib.sha256(jitter_seed.encode()).hexdigest()
        jitter = (int(digest[:4], 16) % 15) - 7  # +/- 7
    return max(0, min(100, round(base * multiplier) + jitter))
