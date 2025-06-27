import { Metadata } from "next";
import { DashboardShell } from "@/components/dashboard/shell";
import { SalonList } from "@/components/admin/SalonList";

export const metadata: Metadata = {
  title: "Salonlar",
  description: "Salon yönetimi",
};

export default function AdminSalonsPage() {
  return (
    <DashboardShell>
      <SalonList />
    </DashboardShell>
  );
}
