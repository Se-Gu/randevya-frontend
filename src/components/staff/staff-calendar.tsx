"use client";

import { useStaffCalendar } from "@/hooks/staff";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
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

  if (isError) {
    return (
      <div className="p-4 text-center text-sm text-red-500">
        Takvim verileri alınırken bir hata oluştu.
      </div>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Takvim</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {data?.map((appointment) => (
            <li key={appointment.id} className="text-sm">
              <span className="font-medium">{appointment.date}</span>{" "}
              {appointment.time} - {appointment.customerName}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>

  );
}
