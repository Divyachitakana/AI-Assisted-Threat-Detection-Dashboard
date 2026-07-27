import { apiClient } from "./apiClient";
import type {
  AttackTrendPoint,
  SecurityOverviewMetrics,
  SeverityDistribution,
  ThreatCategoryCount,
  TopAttackSource,
} from "@/types";

interface AnalyticsBundle {
  severityDistribution: SeverityDistribution[];
  attackTrend: AttackTrendPoint[];
  threatCategories: ThreatCategoryCount[];
  topAttackSources: TopAttackSource[];
}

// Module 4: Threat Monitoring Dashboard & Security Reporting Platform.
// GET /api/analytics returns everything below in one payload; each fetch*
// function still returns just its slice so the existing hooks/useAnalytics.ts
// call sites don't need to change.
async function fetchAnalyticsBundle(): Promise<AnalyticsBundle> {
  const { data } = await apiClient.get<AnalyticsBundle>("/analytics");
  return data;
}

interface DashboardBundle {
  metrics: SecurityOverviewMetrics;
  severityDistribution: SeverityDistribution[];
  attackTrend: AttackTrendPoint[];
}

export async function fetchOverviewMetrics(): Promise<SecurityOverviewMetrics> {
  const { data } = await apiClient.get<DashboardBundle>("/dashboard");
  return data.metrics;
}

export async function fetchSeverityDistribution(): Promise<SeverityDistribution[]> {
  const bundle = await fetchAnalyticsBundle();
  return bundle.severityDistribution;
}

export async function fetchAttackTrend(): Promise<AttackTrendPoint[]> {
  const bundle = await fetchAnalyticsBundle();
  return bundle.attackTrend;
}

export async function fetchThreatCategories(): Promise<ThreatCategoryCount[]> {
  const bundle = await fetchAnalyticsBundle();
  return bundle.threatCategories;
}

export async function fetchTopAttackSources(): Promise<TopAttackSource[]> {
  const bundle = await fetchAnalyticsBundle();
  return bundle.topAttackSources;
}
