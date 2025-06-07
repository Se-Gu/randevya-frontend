import { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { Calendar, type CalendarEvent } from "@/components/calendar/calendar";
import { LoadingSpinner } from "@/components/ui/loading";
import { useAllStaffAppointments } from "@/hooks/use-all-staff-appointments";
import { getServerAuthState } from "@/lib/server-auth";

export const metadata: Metadata = {
  title: "Randevular",
  description: "Randevu yönetimi",
};

function AppointmentsCalendar() {
  "use client";

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

export default async function AppointmentsPage() {
  const { role, user } = await getServerAuthState();

  if (role !== "owner") {
    if (user?.id) {
      redirect(`/dashboard/staff/${user.id}/calendar`);
    }
    redirect("/dashboard");
  }

  return (
    <DashboardShell>
      {/* <DashboardHeader
        heading="Randevular"
        text="Randevu yönetimi"
      /> */}
      <AppointmentsCalendar />
    </DashboardShell>
  );
}
