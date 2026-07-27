import { apiClient } from "./apiClient";
import type { CountryThreatStat, ThreatMapPoint } from "@/types";

// Module 1: Security Data Aggregation & Threat Intelligence Layer.
export async function fetchThreatMapPoints(): Promise<ThreatMapPoint[]> {
  const { data } = await apiClient.get<ThreatMapPoint[]>("/threats/map/points");
  return data;
}

export async function fetchCountryThreatStats(): Promise<CountryThreatStat[]> {
  const { data } = await apiClient.get<CountryThreatStat[]>("/threats/map/countries");
  return data;
}
