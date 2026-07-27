import { apiClient } from "./apiClient";
import type { Incident, MitreMapping, ResponseRecommendation } from "@/types";

interface IncidentDetail extends Incident {
  mitreMapping?: MitreMapping;
  responseRecommendations?: ResponseRecommendation[];
}

// Module 3: Risk Prioritization & Security Intelligence Module.
// GET /api/incidents/{id} returns MITRE mapping and response recommendations
// embedded in the same payload, so the three hooks below share one fetch
// per incident instead of three round trips — see IncidentOut in the
// backend's schemas/incident.py.
async function fetchIncidentDetail(incidentId: string): Promise<IncidentDetail | undefined> {
  try {
    const { data } = await apiClient.get<IncidentDetail>(`/incidents/${incidentId}`);
    return data;
  } catch (err: any) {
    if (err?.response?.status === 404) return undefined;
    throw err;
  }
}

export async function fetchIncidents(): Promise<Incident[]> {
  const { data } = await apiClient.get<Incident[]>("/incidents");
  return data;
}

export async function fetchIncidentById(incidentId: string): Promise<Incident | undefined> {
  return fetchIncidentDetail(incidentId);
}

export async function fetchIncidentMitreMapping(incidentId: string): Promise<MitreMapping | undefined> {
  const incident = await fetchIncidentDetail(incidentId);
  return incident?.mitreMapping;
}

export async function fetchResponseRecommendations(incidentId: string): Promise<ResponseRecommendation[]> {
  const incident = await fetchIncidentDetail(incidentId);
  return incident?.responseRecommendations ?? [];
}
