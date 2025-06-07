import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { StaffList } from "@/components/staff/staff-list";

export const metadata: Metadata = {
  title: "Personel",
  description: "Çalışanlarınızı yönetin",
};

export default function StaffPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Personel" text="Çalışanlarınızı yönetin." />
      <StaffList />
    </DashboardShell>
  );
}
