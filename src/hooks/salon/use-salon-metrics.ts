import { useQuery } from "@tanstack/react-query";
import { salonsApi } from "@/lib/api";
import type { SalonMetrics } from "@/types";
import { getAuthState } from "@/lib/auth";

export function useSalonMetrics(salonId?: string) {
  const id = salonId ?? getAuthState().user?.salonId;

  return useQuery<SalonMetrics>({
    queryKey: ["salon", id, "metrics"],
    queryFn: () => salonsApi.getMetrics(id!),
    enabled: !!id,
  });
}
