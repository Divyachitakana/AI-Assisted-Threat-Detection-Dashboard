// Domain types for the AI-Assisted Threat Detection Dashboard.
// These mirror the entities implied by the system architecture diagram:
// Data Sources -> AI/ML Analytics Layer -> Storage Layer -> Dashboard Layer.

export type Severity = "critical" | "high" | "medium" | "low" | "info";

export type IncidentStatus =
  | "open"
  | "investigating"
  | "contained"
  | "resolved"
  | "false_positive";

export type DataSourceType =
  | "cloud_audit_logs"
  | "vpc_flow_logs"
  | "security_command_center"
  | "external_threat_intel";

export interface ThreatAlert {
  id: string;
  title: string;
  description: string;
  severity: Severity;
  status: IncidentStatus;
  source: DataSourceType;
  mitreTactic?: string;
  mitreTechniqueId?: string; // e.g. T1078
  confidenceScore: number; // 0-100, from the anomaly/classification model
  riskScore: number; // 0-100, from the risk prioritization module
  assetId?: string;
  sourceIp?: string;
  destinationIp?: string;
  detectedAt: string; // ISO timestamp
  updatedAt: string;
}

export interface Incident {
  id: string;
  alertIds: string[];
  title: string;
  severity: Severity;
  status: IncidentStatus;
  assignee?: string;
  riskScore: number;
  createdAt: string;
  updatedAt: string;
  timeline: IncidentTimelineEvent[];
}

export interface IncidentTimelineEvent {
  id: string;
  label: string;
  actor: "system" | "analyst" | "ai_assistant";
  timestamp: string;
  detail?: string;
}

export interface SeverityDistribution {
  severity: Severity;
  count: number;
}

export interface AttackTrendPoint {
  timestamp: string;
  critical: number;
  high: number;
  medium: number;
  low: number;
}

export interface ThreatMapPoint {
  id: string;
  lat: number;
  lng: number;
  country: string;
  severity: Severity;
  eventCount: number;
}

export interface RiskPosture {
  overallScore: number; // 0-100
  trendDelta: number; // vs previous period
  assetsAtRisk: number;
  openCriticalIncidents: number;
}

// AI Security Assistant (RAG over MITRE ATT&CK + internal playbooks)
export type ChatRole = "user" | "assistant" | "system";

export interface ChatMessage {
  id: string;
  role: ChatRole;
  content: string;
  citedSources?: RagCitation[];
  createdAt: string;
}

export interface RagCitation {
  label: string; // e.g. "MITRE ATT&CK T1110"
  sourceType: "mitre_attck" | "internal_playbook" | "incident_record";
  refId: string;
}

// Generic async resource wrapper used by hooks/services throughout the app
export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

export type AlertPriority = "p1" | "p2" | "p3" | "p4";

export interface AssignedAnalyst {
  id: string;
  name: string;
  initials: string;
}

export interface Alert extends ThreatAlert {
  priority: AlertPriority;
  assignedAnalyst?: AssignedAnalyst;
  cveId?: string;
  attackType: string;
}

export interface AssetSummary {
  id: string;
  name: string;
  type: "compute" | "storage" | "network" | "identity" | "database";
  riskScore: number;
  criticality: "critical" | "high" | "medium" | "low";
}

export interface AiInsight {
  id: string;
  title: string;
  summary: string;
  severity: Severity;
  relatedAlertId?: string;
  generatedAt: string;
}

export interface SecurityOverviewMetrics {
  totalThreats: number;
  totalThreatsDelta: number;
  activeAlerts: number;
  activeAlertsDelta: number;
  riskScore: number;
  riskScoreDelta: number;
  assetsMonitored: number;
  assetsMonitoredDelta: number;
}

export interface ThreatCategoryCount {
  category: string;
  count: number;
}

export interface TopAttackSource {
  ip: string;
  country: string;
  attackCount: number;
  riskScore: number;
}

export interface CountryThreatStat {
  country: string;
  countryCode: string;
  lat: number;
  lng: number;
  threatCount: number;
  severity: Severity;
}

export interface MitreMapping {
  tacticId: string; // e.g. TA0001
  tacticName: string; // e.g. "Initial Access"
  techniqueId: string; // e.g. T1078
  techniqueName: string; // e.g. "Valid Accounts"
}

export interface ResponseRecommendation {
  id: string;
  action: string;
  priority: "immediate" | "high" | "recommended";
  automatable: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  severity: Severity;
  read: boolean;
  createdAt: string;
}

export interface ReportSummary {
  id: string;
  title: string;
  period: "weekly" | "monthly";
  dateRange: string;
  generatedAt: string;
  highlights: string[];
  metrics: SecurityOverviewMetrics;
}

export interface UserPreferences {
  theme: "dark" | "light";
  denseTables: boolean;
  autoRefreshInterval: number; // seconds, 0 = off
  notifications: {
    criticalAlerts: boolean;
    weeklyDigest: boolean;
    incidentAssigned: boolean;
    aiInsights: boolean;
  };
  dashboard: {
    defaultLandingPage: string;
    showAiInsights: boolean;
    compactCards: boolean;
  };
}
