"use client";

import { Calendar, type CalendarEvent } from "@/components/calendar/calendar";
import { LoadingSpinner } from "@/components/ui/loading";
import { useAllStaffAppointments } from "@/hooks/use-all-staff-appointments";

export function AppointmentsCalendar() {
  const { data, isLoading, isError } = useAllStaffAppointments();

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="p-4 text-center text-sm text-red-500">
        Randevular yüklenemedi.
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="p-4 text-center text-sm text-muted-foreground">
        Henüz randevu yok.
      </p>
    );
  }

  const events: CalendarEvent[] = data.map((a) => ({
    id: a.id,
    date: a.date,
    time: a.time,
    title: a.customerName,
  }));

  return <Calendar events={events} />;
}
