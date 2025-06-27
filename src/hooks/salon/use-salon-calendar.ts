import { useQuery } from "@tanstack/react-query";
import { salonsApi } from "@/lib/api";
import type { Appointment } from "@/types";
import { getAuthState } from "@/lib/auth";

export function useSalonCalendar(range: string, date: string, salonId?: string) {
  const id = salonId ?? getAuthState().user?.salonId;

  return useQuery<Appointment[]>({
    queryKey: ["salon", id, "calendar", range, date],
    queryFn: () => salonsApi.getCalendar(id!, range, date),
    enabled: !!id && !!range && !!date,
  });
}
