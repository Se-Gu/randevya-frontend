import { Metadata } from "next";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";

export const metadata: Metadata = {
  title: "Müşteriler",
  description: "Müşteri yönetimi",
};

export default function CustomersPage() {
  return (
    <DashboardShell>
      {/* <DashboardHeader heading="Müşteriler" text="Müşteri yönetimi" /> */}
      <p>Bu bölüm yakında eklenecek.</p>
    </DashboardShell>
  );
}
