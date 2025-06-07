"use client";

import { useStaffCalendar } from "@/hooks/staff";

interface StaffCalendarProps {
  staffId: string;
}

export function StaffCalendar({ staffId }: StaffCalendarProps) {
  const today = new Date().toISOString().split("T")[0];
  const { data, isLoading } = useStaffCalendar(staffId, "day", today);

  if (isLoading) {
    return <p>Yükleniyor...</p>;
  }

  return (
    <ul className="space-y-1">
      {data?.map((appt) => (
        <li key={appt.id} className="border rounded p-2">
          {appt.date} {appt.time} - {appt.customerName}
        </li>
      ))}
    </ul>
  );
}
