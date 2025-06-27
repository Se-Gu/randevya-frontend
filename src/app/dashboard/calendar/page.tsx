import { Metadata } from "next";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { CalendarClient } from "./calendar-client";

export const metadata: Metadata = {
  title: "Takvim",
  description: "Salon takvimi ve analizleri",
};

export default function SalonCalendarPage() {
  return (
    <DashboardShell>
      <CalendarClient />
    </DashboardShell>
  );
}
