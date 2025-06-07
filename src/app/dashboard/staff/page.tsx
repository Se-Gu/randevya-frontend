import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/shell";

export const metadata: Metadata = {
  title: "Personel",
  description: "Personel yönetimi",
};

export default function StaffPage() {
  return (
    <DashboardShell>
      {/* <DashboardHeader heading="Personel" text="Personel yönetimi" /> */}
      <p>Bu bölüm yakında eklenecek.</p>
    </DashboardShell>
  );
}
