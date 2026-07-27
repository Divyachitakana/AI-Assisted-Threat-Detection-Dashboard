import { useQuery } from "@tanstack/react-query";
import { fetchCountryThreatStats, fetchThreatMapPoints } from "@/services/threatIntel.service";

export function useThreatMapPoints() {
  return useQuery({ queryKey: ["threat-map-points"], queryFn: fetchThreatMapPoints });
}

export function useCountryThreatStats() {
  return useQuery({ queryKey: ["country-threat-stats"], queryFn: fetchCountryThreatStats });
}
