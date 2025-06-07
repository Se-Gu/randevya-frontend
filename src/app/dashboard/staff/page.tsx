import { Metadata } from "next";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { StaffListClient } from "@/components/dashboard/staff-list-client";

export const metadata: Metadata = {
  title: "Personel",
  description: "Personel yönetimi",
};

export default function StaffPage() {
  return (
    <DashboardShell>
      {/* <DashboardHeader heading="Personel" text="Personel yönetimi" /> */}
      <StaffListClient />
    </DashboardShell>
  );
}
