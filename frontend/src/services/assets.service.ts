import { apiClient } from "./apiClient";
import type { AssetSummary } from "@/types";

interface AnalyticsBundleAssets {
  assets: AssetSummary[];
}

// Assets are served as part of the /analytics bundle (they back the Asset
// Risk Distribution chart on the Analytics page) rather than their own
// top-level REST resource.
export async function fetchAssets(): Promise<AssetSummary[]> {
  const { data } = await apiClient.get<AnalyticsBundleAssets>("/analytics");
  return data.assets;
}
