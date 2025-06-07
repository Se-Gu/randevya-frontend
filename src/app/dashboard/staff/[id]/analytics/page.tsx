import { Metadata } from "next";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardShell } from "@/components/dashboard/shell";
import { StaffAnalytics } from "@/components/staff/staff-analytics";

export const metadata: Metadata = {
  title: "Personel Analizi",
  description: "Çalışan performans analizi",
};

interface StaffAnalyticsPageProps {
  params: { id: string };
}

export default function StaffAnalyticsPage({ params }: StaffAnalyticsPageProps) {
  return (
    <DashboardShell>
      <DashboardHeader heading="Analiz" text="Personel performans analizi" />
      <StaffAnalytics staffId={params.id} />
    </DashboardShell>
  );
}
