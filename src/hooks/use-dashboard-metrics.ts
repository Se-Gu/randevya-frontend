import { useQuery } from "@tanstack/react-query";
import { appointmentsApi, salonsApi } from "@/lib/api";
import type { Appointment, Salon } from "@/types";

interface DashboardMetrics {
  todayAppointments: number;
  totalCustomers: number;
  averageDuration: number;
  monthlyRevenue: number;
  salon?: Salon;
}

export function useDashboardMetrics() {
  const appointmentsQuery = useQuery<Appointment[]>({
    queryKey: ["dashboard", "appointments"],
    queryFn: appointmentsApi.getAll,
  });

  const salonQuery = useQuery<Salon>({
    queryKey: ["dashboard", "salon"],
    queryFn: salonsApi.getMe,
  });

  const appointments = appointmentsQuery.data ?? [];
  const today = new Date().toISOString().split("T")[0];

  const todayAppointments = appointments.filter((a) => a.date === today).length;

  const totalCustomers = new Set(
    appointments.map((a) => a.customerPhone || a.customerEmail || a.customerName)
  ).size;

  let averageDuration = 0;
  let monthlyRevenue = 0;

  if (appointments.length) {
    const now = new Date();
    let totalDuration = 0;
    let durationCount = 0;

    appointments.forEach((a) => {
      const appointmentDate = new Date(a.date);
      const service: any = (a as any).service;
      if (service?.durationMinutes) {
        totalDuration += service.durationMinutes;
        durationCount += 1;
      }
      if (
        service?.price &&
        appointmentDate.getMonth() === now.getMonth() &&
        appointmentDate.getFullYear() === now.getFullYear()
      ) {
        monthlyRevenue += service.price;
      }
    });

    if (durationCount) {
      averageDuration = Math.round(totalDuration / durationCount);
    }
  }

  const metrics: DashboardMetrics = {
    todayAppointments,
    totalCustomers,
    averageDuration,
    monthlyRevenue,
    salon: salonQuery.data,
  };

  return {
    data: metrics,
    isLoading: appointmentsQuery.isLoading || salonQuery.isLoading,
  };
}
