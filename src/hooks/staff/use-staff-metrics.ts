import { useQuery } from "@tanstack/react-query";
import { staffApi } from "@/lib/api";
import type { StaffMetrics } from "@/types";

export function useStaffMetrics(staffId: string) {
  return useQuery<StaffMetrics>({
    queryKey: ["staff", staffId, "metrics"],
    queryFn: () => staffApi.getMetrics(staffId),
    enabled: !!staffId,
  });
}
