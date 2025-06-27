"use client";

import { useAuth } from "@/providers";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ServiceForm } from "./service-form";
import { ServiceList } from "./service-list";

export function ServicesPanel() {
  const { user } = useAuth();
  const salonId = user?.salonId;

  if (!salonId) {
    return (
      <p className="text-center text-sm text-red-500">
        Salon bilgisi bulunamadı.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Yeni Hizmet</CardTitle>
        </CardHeader>
        <CardContent>
          <ServiceForm salonId={salonId} />
        </CardContent>
      </Card>
      <ServiceList salonId={salonId} />
    </div>
  );
}
