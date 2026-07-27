import { useQuery } from "@tanstack/react-query";
import {
  fetchAttackTrend,
  fetchOverviewMetrics,
  fetchSeverityDistribution,
  fetchThreatCategories,
  fetchTopAttackSources,
} from "@/services/analytics.service";

export function useOverviewMetrics() {
  return useQuery({ queryKey: ["overview-metrics"], queryFn: fetchOverviewMetrics });
}

export function useSeverityDistribution() {
  return useQuery({ queryKey: ["severity-distribution"], queryFn: fetchSeverityDistribution });
}

export function useAttackTrend() {
  return useQuery({ queryKey: ["attack-trend"], queryFn: fetchAttackTrend });
}

export function useThreatCategories() {
  return useQuery({ queryKey: ["threat-categories"], queryFn: fetchThreatCategories });
}

export function useTopAttackSources() {
  return useQuery({ queryKey: ["top-attack-sources"], queryFn: fetchTopAttackSources });
}
