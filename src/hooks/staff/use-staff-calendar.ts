import { useQuery } from "@tanstack/react-query";
import { staffApi } from "@/lib/api";
import type { Appointment } from "@/types";

export function useStaffCalendar(staffId: string, range: string, date: string) {
  return useQuery<Appointment[]>({
    queryKey: ["staff", staffId, "calendar", range, date],
    queryFn: () => staffApi.getCalendar(staffId, range, date),
    enabled: !!staffId && !!range && !!date,
  });
}
