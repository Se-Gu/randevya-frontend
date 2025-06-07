"use client";

import { useSearchParams } from "next/navigation";
import { AppointmentForm } from "@/components/booking/appointment-form";

export function BookPageClient() {
  const params = useSearchParams();
  const salonId = params.get("salonId") || "1";

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Randevu Al</h1>
      <AppointmentForm salonId={salonId} />
    </div>
  );
}
