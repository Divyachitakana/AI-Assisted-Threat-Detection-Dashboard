import { useQuery } from "@tanstack/react-query";
import { fetchAssets } from "@/services/assets.service";

export function useAssets() {
  return useQuery({ queryKey: ["assets"], queryFn: fetchAssets });
}
