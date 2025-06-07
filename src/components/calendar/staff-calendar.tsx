"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { useStaffCalendar } from "@/hooks/staff/use-staff-calendar";
import { Calendar, CalendarEvent } from "./calendar";

interface StaffCalendarProps {
  staffId: string;
  view?: "week" | "month";
}

export function StaffCalendar({ staffId, view = "week" }: StaffCalendarProps) {
  const [date, setDate] = useState(new Date());
  const { data } = useStaffCalendar(
    staffId,
    view,
    format(date, "yyyy-MM-dd")
  );

  const events: CalendarEvent[] =
    data?.map((a) => ({
      id: a.id,
      date: a.date,
      time: a.time,
      title: a.customerName,
    })) ?? [];

  return (
    <Calendar
      events={events}
      view={view}
      date={date}
      onDateChange={setDate}
    />
  );
}
