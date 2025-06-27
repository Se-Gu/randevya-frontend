import { useQuery } from "@tanstack/react-query";
import { appointmentsApi } from "@/lib/api";
import type { Appointment } from "@/types";

export function useAllStaffAppointments() {
  return useQuery<Appointment[]>({
    queryKey: ["appointments", "all"],
    queryFn: appointmentsApi.getAll,
  });
}
