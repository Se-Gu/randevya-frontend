"use client";

import { useStaffCalendar } from "@/hooks/staff";
import { LoadingSpinner } from "@/components/ui/loading";

interface StaffCalendarProps {
  staffId: string;
  range: string;
  date: string;
}

export function StaffCalendar({ staffId, range, date }: StaffCalendarProps) {
  const { data, isLoading, isError } = useStaffCalendar(staffId, range, date);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return <p className="p-4 text-sm text-red-500">Takvim verisi yüklenemedi.</p>;
  }

  if (data.length === 0) {
    return <p className="p-4 text-sm text-muted-foreground">Randevu bulunmuyor.</p>;
  }

  return (
    <ul className="space-y-2">
      {data.map((appt) => (
        <li key={appt.id} className="rounded border p-2">
          <span className="font-medium">{appt.date}</span> {appt.time} - {appt.customerName}
        </li>
      ))}
    </ul>
  );
}
