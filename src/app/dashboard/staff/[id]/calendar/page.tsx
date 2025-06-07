import { Metadata } from "next";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { StaffCalendar } from "@/components/staff/staff-calendar";

export const metadata: Metadata = {
  title: "Personel Takvimi",
  description: "Personelinizin randevu takvimi",
};

export default function StaffCalendarPage({
  params,
}: {
  params: { id: string };
}) {
  const today = new Date();
  const formattedDate = today.toISOString().split("T")[0]; // YYYY-MM-DD

  return (
    <DashboardShell>
      {/* <DashboardHeader
        heading="Personel Takvimi"
        text="Personelinizin randevu takvimini"
      /> */}
      <StaffCalendar staffId={params.id} range="month" date={formattedDate} />
    </DashboardShell>
  );
}
