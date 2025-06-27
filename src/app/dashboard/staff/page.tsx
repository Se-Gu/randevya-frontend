import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/shell";
import { StaffPageClient } from "./StaffPageClient";

export const metadata: Metadata = {
  title: "Personel",
  description: "Personel yönetimi",
};

export default function StaffPage() {
  return (
    <DashboardShell>
      {/* <DashboardHeader heading="Personel" text="Personel yönetimi" /> */}
      <StaffPageClient />
    </DashboardShell>
  );
}
