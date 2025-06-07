import { Metadata } from "next";
import { redirect } from "next/navigation";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { AppointmentsCalendar } from "@/components/dashboard/appointments-calendar-client";
import { getServerAuthState } from "@/lib/server-auth";

export const metadata: Metadata = {
  title: "Randevular",
  description: "Randevu yönetimi",
};

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
