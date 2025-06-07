import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { StaffCalendar } from "@/components/staff/staff-calendar";

export const metadata: Metadata = {
  title: "Personel Takvimi",
  description: "Çalışan randevu takvimi",
};

interface StaffCalendarPageProps {
  params: { id: string };
}

export default function StaffCalendarPage({ params }: StaffCalendarPageProps) {
  return (
    <DashboardShell>
      <DashboardHeader heading="Takvim" text="Personel randevu takvimi" />
      <StaffCalendar staffId={params.id} />
    </DashboardShell>
  );
}
