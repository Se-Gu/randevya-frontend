import { Metadata } from "next";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { Calendar } from "@/components/calendar/calendar";

export const metadata: Metadata = {
  title: "Randevular",
  description: "Randevu yönetimi",
};

export default function AppointmentsPage() {
  return (
    <DashboardShell>
      {/* <DashboardHeader
        heading="Randevular"
        text="Randevu yönetimi"
      /> */}
      <Calendar events={[]} />
    </DashboardShell>
  );
}
