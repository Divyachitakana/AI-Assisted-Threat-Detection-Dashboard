"""
Static reference data mirroring frontend/src/mocks/referenceData.ts, so the
backend and the (now-retired) frontend mocks describe the same fictional
security environment.
"""

THREAT_TEMPLATES = [
    {"name": "Suspicious PowerShell Execution", "category": "Malware", "tactic_id": "TA0002", "tactic_name": "Execution", "technique_id": "T1059.001", "technique_name": "PowerShell"},
    {"name": "Brute Force SSH Login Attempt", "category": "Brute Force", "tactic_id": "TA0006", "tactic_name": "Credential Access", "technique_id": "T1110", "technique_name": "Brute Force"},
    {"name": "Anomalous Data Exfiltration to Unknown Host", "category": "Data Exfiltration", "tactic_id": "TA0010", "tactic_name": "Exfiltration", "technique_id": "T1048", "technique_name": "Exfiltration Over Alternative Protocol"},
    {"name": "Emotet Trojan Signature Detected", "category": "Malware", "tactic_id": "TA0002", "tactic_name": "Execution", "technique_id": "T1204", "technique_name": "User Execution"},
    {"name": "Credential Stuffing Attack Detected", "category": "Brute Force", "tactic_id": "TA0006", "tactic_name": "Credential Access", "technique_id": "T1110.004", "technique_name": "Credential Stuffing"},
    {"name": "Lateral Movement via SMB Share", "category": "Lateral Movement", "tactic_id": "TA0008", "tactic_name": "Lateral Movement", "technique_id": "T1021.002", "technique_name": "SMB/Windows Admin Shares"},
    {"name": "Cryptomining Process Detected on Compute Instance", "category": "Malware", "tactic_id": "TA0040", "tactic_name": "Impact", "technique_id": "T1496", "technique_name": "Resource Hijacking"},
    {"name": "Unusual IAM Policy Modification", "category": "Privilege Escalation", "tactic_id": "TA0004", "tactic_name": "Privilege Escalation", "technique_id": "T1098", "technique_name": "Account Manipulation"},
    {"name": "DNS Tunneling Activity Identified", "category": "Command & Control", "tactic_id": "TA0011", "tactic_name": "Command and Control", "technique_id": "T1071.004", "technique_name": "DNS"},
    {"name": "Ransomware Behavior Pattern Identified", "category": "Malware", "tactic_id": "TA0040", "tactic_name": "Impact", "technique_id": "T1486", "technique_name": "Data Encrypted for Impact"},
    {"name": "SQL Injection Attempt on Public Endpoint", "category": "Web Attack", "tactic_id": "TA0001", "tactic_name": "Initial Access", "technique_id": "T1190", "technique_name": "Exploit Public-Facing Application"},
    {"name": "Phishing Email with Malicious Attachment", "category": "Phishing", "tactic_id": "TA0001", "tactic_name": "Initial Access", "technique_id": "T1566.001", "technique_name": "Spearphishing Attachment"},
    {"name": "Zero-Day Exploit Attempt Blocked", "category": "Exploit", "tactic_id": "TA0001", "tactic_name": "Initial Access", "technique_id": "T1190", "technique_name": "Exploit Public-Facing Application"},
    {"name": "Distributed Denial of Service Traffic Spike", "category": "DDoS", "tactic_id": "TA0040", "tactic_name": "Impact", "technique_id": "T1498", "technique_name": "Network Denial of Service"},
    {"name": "Impossible Travel Login Anomaly", "category": "Account Compromise", "tactic_id": "TA0001", "tactic_name": "Initial Access", "technique_id": "T1078", "technique_name": "Valid Accounts"},
    {"name": "Privilege Escalation via Sudo Misconfiguration", "category": "Privilege Escalation", "tactic_id": "TA0004", "tactic_name": "Privilege Escalation", "technique_id": "T1548.003", "technique_name": "Sudo and Sudo Caching"},
    {"name": "Command and Control Beaconing Detected", "category": "Command & Control", "tactic_id": "TA0011", "tactic_name": "Command and Control", "technique_id": "T1071.001", "technique_name": "Web Protocols"},
    {"name": "Unauthorized Cloud Storage Bucket Access", "category": "Data Exfiltration", "tactic_id": "TA0009", "tactic_name": "Collection", "technique_id": "T1530", "technique_name": "Data from Cloud Storage"},
    {"name": "Suspicious Service Account Key Creation", "category": "Privilege Escalation", "tactic_id": "TA0003", "tactic_name": "Persistence", "technique_id": "T1098.001", "technique_name": "Additional Cloud Credentials"},
    {"name": "Port Scan Activity from External Host", "category": "Reconnaissance", "tactic_id": "TA0043", "tactic_name": "Reconnaissance", "technique_id": "T1595.001", "technique_name": "Scanning IP Blocks"},
]

ANALYSTS = [
    {"id": "an-1", "name": "Priya Nair", "initials": "PN"},
    {"id": "an-2", "name": "Daniel Cho", "initials": "DC"},
    {"id": "an-3", "name": "Amara Okafor", "initials": "AO"},
    {"id": "an-4", "name": "Marcus Webb", "initials": "MW"},
    {"id": "an-5", "name": "Sofia Ramirez", "initials": "SR"},
    {"id": "an-6", "name": "Ken Watanabe", "initials": "KW"},
]

THREAT_COUNTRIES = [
    {"country": "Russia", "country_code": "RU", "lat": 61.524, "lng": 105.318},
    {"country": "China", "country_code": "CN", "lat": 35.861, "lng": 104.195},
    {"country": "North Korea", "country_code": "KP", "lat": 40.339, "lng": 127.51},
    {"country": "Iran", "country_code": "IR", "lat": 32.427, "lng": 53.688},
    {"country": "Brazil", "country_code": "BR", "lat": -14.235, "lng": -51.925},
    {"country": "Vietnam", "country_code": "VN", "lat": 14.058, "lng": 108.277},
    {"country": "Nigeria", "country_code": "NG", "lat": 9.082, "lng": 8.675},
    {"country": "Ukraine", "country_code": "UA", "lat": 48.379, "lng": 31.166},
    {"country": "United States", "country_code": "US", "lat": 37.09, "lng": -95.712},
    {"country": "India", "country_code": "IN", "lat": 20.594, "lng": 78.963},
    {"country": "Romania", "country_code": "RO", "lat": 45.943, "lng": 24.966},
    {"country": "Indonesia", "country_code": "ID", "lat": -0.789, "lng": 113.921},
]

ASSET_NAMES = [
    {"name": "prod-api-gateway-01", "type": "network"},
    {"name": "prod-db-primary-postgres", "type": "database"},
    {"name": "billing-service-vm-03", "type": "compute"},
    {"name": "customer-data-bucket", "type": "storage"},
    {"name": "auth-service-identity-pool", "type": "identity"},
    {"name": "prod-k8s-cluster-us-east", "type": "compute"},
    {"name": "analytics-warehouse-bq", "type": "database"},
    {"name": "vpn-gateway-corp", "type": "network"},
    {"name": "backup-archive-storage", "type": "storage"},
    {"name": "employee-sso-provider", "type": "identity"},
]

DATA_SOURCES = [
    "cloud_audit_logs",
    "vpc_flow_logs",
    "security_command_center",
    "external_threat_intel",
]

SEVERITY_WEIGHTS = {"critical": 6, "high": 16, "medium": 34, "low": 32, "info": 12}
STATUS_WEIGHTS = {"open": 22, "investigating": 28, "contained": 15, "resolved": 30, "false_positive": 5}
PRIORITY_BY_SEVERITY = {"critical": "p1", "high": "p2", "medium": "p3", "low": "p4", "info": "p4"}
