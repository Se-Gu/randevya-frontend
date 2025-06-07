"use client";

import { useStaffMetrics } from "@/hooks/staff";
import { LoadingSpinner } from "@/components/ui/loading";

interface StaffAnalyticsProps {
  staffId: string;
}

export function StaffAnalytics({ staffId }: StaffAnalyticsProps) {
  const { data, isLoading, isError } = useStaffMetrics(staffId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return <p className="p-4 text-sm text-red-500">Veriler yüklenemedi.</p>;
  }

  return (
    <div className="space-y-2 text-sm">
      <p>Toplam Randevu: {data.appointmentCount}</p>
      <p>Toplam Gelir: ₺{data.revenue}</p>
      {data.mostBookedService && (
        <p>
          En Popüler Hizmet: {data.mostBookedService.name} ({
            data.mostBookedService.count
          })
        </p>
      )}
      <p>Kullanım Oranı: %{data.utilizationRate}</p>
    </div>
  );
}
