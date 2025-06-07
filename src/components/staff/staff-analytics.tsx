"use client";

import { useStaffMetrics } from "@/hooks/staff";

interface StaffAnalyticsProps {
  staffId: string;
}

export function StaffAnalytics({ staffId }: StaffAnalyticsProps) {
  const { data, isLoading } = useStaffMetrics(staffId);

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <pre className="whitespace-pre-wrap">{JSON.stringify(data, null, 2)}</pre>
  );
}
