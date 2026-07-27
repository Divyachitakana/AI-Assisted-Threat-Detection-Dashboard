"""
Placeholder for MITRE ATT&CK mapping. Production implementation would use
either a fine-tuned classifier over technique descriptions or a RAG lookup
against a vectorized copy of the MITRE ATT&CK knowledge base (see the
Generative AI Assistant Agent in the architecture diagram, 3B), matching
detected behavior patterns to the closest tactic/technique pair.

This stub maps a small keyword table so classify_technique() returns
something plausible for arbitrary free-text threat titles.
"""

_KEYWORD_MAP: list[tuple[str, dict]] = [
    ("powershell", {"tactic_id": "TA0002", "tactic_name": "Execution", "technique_id": "T1059.001", "technique_name": "PowerShell"}),
    ("brute force", {"tactic_id": "TA0006", "tactic_name": "Credential Access", "technique_id": "T1110", "technique_name": "Brute Force"}),
    ("exfiltration", {"tactic_id": "TA0010", "tactic_name": "Exfiltration", "technique_id": "T1048", "technique_name": "Exfiltration Over Alternative Protocol"}),
    ("ransomware", {"tactic_id": "TA0040", "tactic_name": "Impact", "technique_id": "T1486", "technique_name": "Data Encrypted for Impact"}),
    ("phishing", {"tactic_id": "TA0001", "tactic_name": "Initial Access", "technique_id": "T1566.001", "technique_name": "Spearphishing Attachment"}),
    ("sql injection", {"tactic_id": "TA0001", "tactic_name": "Initial Access", "technique_id": "T1190", "technique_name": "Exploit Public-Facing Application"}),
    ("cryptomining", {"tactic_id": "TA0040", "tactic_name": "Impact", "technique_id": "T1496", "technique_name": "Resource Hijacking"}),
    ("iam", {"tactic_id": "TA0004", "tactic_name": "Privilege Escalation", "technique_id": "T1098", "technique_name": "Account Manipulation"}),
    ("dns tunneling", {"tactic_id": "TA0011", "tactic_name": "Command and Control", "technique_id": "T1071.004", "technique_name": "DNS"}),
]

_DEFAULT_MAPPING = {"tactic_id": "TA0043", "tactic_name": "Reconnaissance", "technique_id": "T1595", "technique_name": "Active Scanning"}


def classify_technique(threat_title: str) -> dict:
    lowered = threat_title.lower()
    for keyword, mapping in _KEYWORD_MAP:
        if keyword in lowered:
            return mapping
    return _DEFAULT_MAPPING
