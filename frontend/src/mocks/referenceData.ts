import type { AssignedAnalyst, MitreMapping } from "@/types";

export const THREAT_TEMPLATES = [
  { name: "Suspicious PowerShell Execution", category: "Malware", tacticId: "TA0002", tacticName: "Execution", techniqueId: "T1059.001", techniqueName: "PowerShell" },
  { name: "Brute Force SSH Login Attempt", category: "Brute Force", tacticId: "TA0006", tacticName: "Credential Access", techniqueId: "T1110", techniqueName: "Brute Force" },
  { name: "Anomalous Data Exfiltration to Unknown Host", category: "Data Exfiltration", tacticId: "TA0010", tacticName: "Exfiltration", techniqueId: "T1048", techniqueName: "Exfiltration Over Alternative Protocol" },
  { name: "Emotet Trojan Signature Detected", category: "Malware", tacticId: "TA0002", tacticName: "Execution", techniqueId: "T1204", techniqueName: "User Execution" },
  { name: "Credential Stuffing Attack Detected", category: "Brute Force", tacticId: "TA0006", tacticName: "Credential Access", techniqueId: "T1110.004", techniqueName: "Credential Stuffing" },
  { name: "Lateral Movement via SMB Share", category: "Lateral Movement", tacticId: "TA0008", tacticName: "Lateral Movement", techniqueId: "T1021.002", techniqueName: "SMB/Windows Admin Shares" },
  { name: "Cryptomining Process Detected on Compute Instance", category: "Malware", tacticId: "TA0040", tacticName: "Impact", techniqueId: "T1496", techniqueName: "Resource Hijacking" },
  { name: "Unusual IAM Policy Modification", category: "Privilege Escalation", tacticId: "TA0004", tacticName: "Privilege Escalation", techniqueId: "T1098", techniqueName: "Account Manipulation" },
  { name: "DNS Tunneling Activity Identified", category: "Command & Control", tacticId: "TA0011", tacticName: "Command and Control", techniqueId: "T1071.004", techniqueName: "DNS" },
  { name: "Ransomware Behavior Pattern Identified", category: "Malware", tacticId: "TA0040", tacticName: "Impact", techniqueId: "T1486", techniqueName: "Data Encrypted for Impact" },
  { name: "SQL Injection Attempt on Public Endpoint", category: "Web Attack", tacticId: "TA0001", tacticName: "Initial Access", techniqueId: "T1190", techniqueName: "Exploit Public-Facing Application" },
  { name: "Phishing Email with Malicious Attachment", category: "Phishing", tacticId: "TA0001", tacticName: "Initial Access", techniqueId: "T1566.001", techniqueName: "Spearphishing Attachment" },
  { name: "Zero-Day Exploit Attempt Blocked", category: "Exploit", tacticId: "TA0001", tacticName: "Initial Access", techniqueId: "T1190", techniqueName: "Exploit Public-Facing Application" },
  { name: "Distributed Denial of Service Traffic Spike", category: "DDoS", tacticId: "TA0040", tacticName: "Impact", techniqueId: "T1498", techniqueName: "Network Denial of Service" },
  { name: "Impossible Travel Login Anomaly", category: "Account Compromise", tacticId: "TA0001", tacticName: "Initial Access", techniqueId: "T1078", techniqueName: "Valid Accounts" },
  { name: "Privilege Escalation via Sudo Misconfiguration", category: "Privilege Escalation", tacticId: "TA0004", tacticName: "Privilege Escalation", techniqueId: "T1548.003", techniqueName: "Sudo and Sudo Caching" },
  { name: "Command and Control Beaconing Detected", category: "Command & Control", tacticId: "TA0011", tacticName: "Command and Control", techniqueId: "T1071.001", techniqueName: "Web Protocols" },
  { name: "Unauthorized Cloud Storage Bucket Access", category: "Data Exfiltration", tacticId: "TA0009", tacticName: "Collection", techniqueId: "T1530", techniqueName: "Data from Cloud Storage" },
  { name: "Suspicious Service Account Key Creation", category: "Privilege Escalation", tacticId: "TA0003", tacticName: "Persistence", techniqueId: "T1098.001", techniqueName: "Additional Cloud Credentials" },
  { name: "Port Scan Activity from External Host", category: "Reconnaissance", tacticId: "TA0043", tacticName: "Reconnaissance", techniqueId: "T1595.001", techniqueName: "Scanning IP Blocks" },
] as const;

export function mitreForTemplate(t: (typeof THREAT_TEMPLATES)[number]): MitreMapping {
  return {
    tacticId: t.tacticId,
    tacticName: t.tacticName,
    techniqueId: t.techniqueId,
    techniqueName: t.techniqueName,
  };
}

export const ANALYSTS: AssignedAnalyst[] = [
  { id: "an-1", name: "Priya Nair", initials: "PN" },
  { id: "an-2", name: "Daniel Cho", initials: "DC" },
  { id: "an-3", name: "Amara Okafor", initials: "AO" },
  { id: "an-4", name: "Marcus Webb", initials: "MW" },
  { id: "an-5", name: "Sofia Ramirez", initials: "SR" },
  { id: "an-6", name: "Ken Watanabe", initials: "KW" },
];

export const THREAT_COUNTRIES = [
  { country: "Russia", countryCode: "RU", lat: 61.524, lng: 105.318 },
  { country: "China", countryCode: "CN", lat: 35.861, lng: 104.195 },
  { country: "North Korea", countryCode: "KP", lat: 40.339, lng: 127.51 },
  { country: "Iran", countryCode: "IR", lat: 32.427, lng: 53.688 },
  { country: "Brazil", countryCode: "BR", lat: -14.235, lng: -51.925 },
  { country: "Vietnam", countryCode: "VN", lat: 14.058, lng: 108.277 },
  { country: "Nigeria", countryCode: "NG", lat: 9.082, lng: 8.675 },
  { country: "Ukraine", countryCode: "UA", lat: 48.379, lng: 31.166 },
  { country: "United States", countryCode: "US", lat: 37.09, lng: -95.712 },
  { country: "India", countryCode: "IN", lat: 20.594, lng: 78.963 },
  { country: "Romania", countryCode: "RO", lat: 45.943, lng: 24.966 },
  { country: "Indonesia", countryCode: "ID", lat: -0.789, lng: 113.921 },
] as const;

export const ASSET_NAMES = [
  { name: "prod-api-gateway-01", type: "network" as const },
  { name: "prod-db-primary-postgres", type: "database" as const },
  { name: "billing-service-vm-03", type: "compute" as const },
  { name: "customer-data-bucket", type: "storage" as const },
  { name: "auth-service-identity-pool", type: "identity" as const },
  { name: "prod-k8s-cluster-us-east", type: "compute" as const },
  { name: "analytics-warehouse-bq", type: "database" as const },
  { name: "vpn-gateway-corp", type: "network" as const },
  { name: "backup-archive-storage", type: "storage" as const },
  { name: "employee-sso-provider", type: "identity" as const },
];
