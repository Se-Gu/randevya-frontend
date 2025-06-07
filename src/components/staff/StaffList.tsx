"use client";

import { useQuery } from "@tanstack/react-query";
import { staffApi } from "@/lib/api";
import type { Staff } from "@/types";
import { LoadingSpinner } from "@/components/ui/loading";
import { StaffCard } from "./StaffCard";

interface StaffListProps {
  salonId: string;
}

export function StaffList({ salonId }: StaffListProps) {
  const { data, isLoading, isError } = useQuery<Staff[]>({
    queryKey: ["salon", salonId, "staff"],
    queryFn: () => staffApi.getBySalon(salonId),
    enabled: !!salonId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return <p className="p-4 text-sm text-red-500">Çalışanlar yüklenemedi.</p>;
  }

  if (data.length === 0) {
    return <p className="p-4 text-sm text-muted-foreground">Henüz çalışan yok.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((staff) => (
        <StaffCard key={staff.id} staff={staff} />
      ))}
    </div>
  );
}
