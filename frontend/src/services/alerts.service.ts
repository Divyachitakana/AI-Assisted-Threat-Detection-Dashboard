import { apiClient } from "./apiClient";
import type { Alert, PaginatedResult, Severity, IncidentStatus } from "@/types";

export interface AlertQueryParams {
  page?: number;
  pageSize?: number;
  search?: string;
  severities?: Severity[];
  statuses?: IncidentStatus[];
  source?: string;
}

// Module 2: AI-Based Threat Detection & Anomaly Analysis Engine.
// Backed by GET /api/alerts (FastAPI). Array filters are sent as
// comma-separated strings since that's what the backend's Query parsing
// expects — avoids axios's bracketed array serialization entirely.
export async function fetchAlerts(params: AlertQueryParams = {}): Promise<PaginatedResult<Alert>> {
  const { page = 1, pageSize = 10, search, severities, statuses, source } = params;

  const { data } = await apiClient.get<PaginatedResult<Alert>>("/alerts", {
    params: {
      page,
      pageSize,
      search: search || undefined,
      severities: severities?.length ? severities.join(",") : undefined,
      statuses: statuses?.length ? statuses.join(",") : undefined,
      source,
    },
  });
  return data;
}

export async function fetchAlertById(alertId: string): Promise<Alert | undefined> {
  try {
    const { data } = await apiClient.get<Alert>(`/alerts/${alertId}`);
    return data;
  } catch (err: any) {
    if (err?.response?.status === 404) return undefined;
    throw err;
  }
}
