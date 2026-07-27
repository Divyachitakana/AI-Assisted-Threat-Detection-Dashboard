import { apiClient } from "./apiClient";
import type { ReportSummary } from "@/types";

export async function fetchReports(): Promise<ReportSummary[]> {
  const { data } = await apiClient.get<ReportSummary[]>("/reports");
  return data;
}
