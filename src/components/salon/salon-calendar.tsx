"use client";

import React, { useState } from "react";
import { format } from "date-fns";
import { Calendar, CalendarEvent } from "@/components/calendar/calendar";
import { useSalonCalendar } from "@/hooks/salon";

interface SalonCalendarProps {
  salonId?: string;
  view?: "week" | "month";
}

export function SalonCalendar({ salonId, view = "week" }: SalonCalendarProps) {
  const [date, setDate] = useState(new Date());
  const { data } = useSalonCalendar(view, format(date, "yyyy-MM-dd"), salonId);

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
