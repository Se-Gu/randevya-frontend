import { Metadata } from "next";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { StaffAnalytics } from "@/components/staff/staff-analytics";

export const metadata: Metadata = {
  title: "Personel Analizleri",
  description: "Personelinizin performans analizleri",
};

interface StaffAnalyticsPageProps {
  params: { id: string };
}

export default function StaffAnalyticsPage({
  params,
}: StaffAnalyticsPageProps) {
  return (
    <DashboardShell>
      {/* <DashboardHeader
        heading="Personel Analizleri"
        text="Personelinizin performans analizlerini görüntüleyin."
      /> */}
      <StaffAnalytics staffId={params.id} />
    </DashboardShell>
  );
}
