import { Metadata } from "next";
import { useSearchParams } from "next/navigation";
import { AppointmentForm } from "@/components/booking/appointment-form";

export const metadata: Metadata = {
  title: "Randevu Al",
  description: "Hızlıca randevu alın",
};

export default function BookPage() {
  const params = useSearchParams();
  const salonId = params.get("salonId") || "1";

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Randevu Al</h1>
      <AppointmentForm salonId={salonId} />
    </div>
  );
}
