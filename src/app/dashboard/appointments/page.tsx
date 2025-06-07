import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";

export const metadata: Metadata = {
  title: "Randevular",
  description: "Randevu yönetimi",
};

export default function AppointmentsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Randevular" text="Randevu yönetimi" />
      <p>Bu bölüm yakında eklenecek.</p>
    </DashboardShell>
  );
}
