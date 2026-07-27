import { useQuery } from "@tanstack/react-query";
import {
  fetchIncidentById,
  fetchIncidentMitreMapping,
  fetchIncidents,
  fetchResponseRecommendations,
} from "@/services/incidents.service";

export function useIncidents() {
  return useQuery({ queryKey: ["incidents"], queryFn: fetchIncidents });
}

export function useIncident(incidentId: string | null) {
  return useQuery({
    queryKey: ["incident", incidentId],
    queryFn: () => fetchIncidentById(incidentId as string),
    enabled: !!incidentId,
  });
}

export function useIncidentMitreMapping(incidentId: string | null) {
  return useQuery({
    queryKey: ["incident-mitre", incidentId],
    queryFn: () => fetchIncidentMitreMapping(incidentId as string),
    enabled: !!incidentId,
  });
}

export function useResponseRecommendations(incidentId: string | null) {
  return useQuery({
    queryKey: ["incident-recommendations", incidentId],
    queryFn: () => fetchResponseRecommendations(incidentId as string),
    enabled: !!incidentId,
  });
}
