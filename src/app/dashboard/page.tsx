import { Metadata } from "next";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { Overview } from "@/components/owner/dashboard/overview";
export const metadata: Metadata = {
  title: "Kontrol Paneli",
  description: "Kuaför randevu yönetim kontrol paneli",
};

export default function DashboardPage() {
  return (
    <DashboardShell>
      {/* <DashboardHeader
        heading="Kontrol Paneli"
        text="Randevularınızı ve işletmenizi yönetin."
      /> */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Overview />
      </div>
    </DashboardShell>
  );
}
