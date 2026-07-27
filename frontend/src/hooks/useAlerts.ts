import { useQuery } from "@tanstack/react-query";
import { fetchAlertById, fetchAlerts, type AlertQueryParams } from "@/services/alerts.service";

export function useAlerts(params: AlertQueryParams) {
  return useQuery({
    queryKey: ["alerts", params],
    queryFn: () => fetchAlerts(params),
    placeholderData: (prev) => prev,
  });
}

export function useAlert(alertId: string | null) {
  return useQuery({
    queryKey: ["alert", alertId],
    queryFn: () => fetchAlertById(alertId as string),
    enabled: !!alertId,
  });
}
