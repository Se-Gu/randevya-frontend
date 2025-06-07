"use client";

import { useQuery } from "@tanstack/react-query";
import { staffApi } from "@/lib/api";
import { Card } from "@/components/ui/card";

export function StaffList() {
  const { data, isLoading } = useQuery({
    queryKey: ["staff"],
    queryFn: () => staffApi.getAll(),
  });

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <div className="space-y-2">
      {data?.map((staff) => (
        <Card key={staff.id} className="p-4">
          {staff.name}
        </Card>
      ))}
    </div>
  );
}
