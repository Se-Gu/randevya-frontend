import { Metadata } from "next";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";

export const metadata: Metadata = {
  title: "Hizmetler",
  description: "Hizmet yönetimi",
};

export default function ServicesPage() {
  return (
    <DashboardShell>
      {/* <DashboardHeader heading="Hizmetler" text="Hizmet yönetimi" /> */}
      <p>Bu bölüm yakında eklenecek.</p>
    </DashboardShell>
  );
}
