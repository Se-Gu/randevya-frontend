"use client";

import React, { useState } from "react";
import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  parseISO,
  startOfMonth,
  startOfWeek,
  subMonths,
  subWeeks,
} from "date-fns";
import { cn } from "@/lib/utils";

export interface CalendarEvent {
  id: string;
  date: string; // ISO date string (yyyy-MM-dd)
  time?: string;
  title: string;
}

export interface CalendarProps {
  events: CalendarEvent[];
  view?: "week" | "month";
  date?: Date;
  onDateChange?: (date: Date) => void;
  renderEvent?: (event: CalendarEvent) => React.ReactNode;
  className?: string;
}

export function Calendar({
  events,
  view = "month",
  date: initialDate = new Date(),
  onDateChange,
  renderEvent,
  className,
}: CalendarProps) {
  const [currentDate, setCurrentDate] = useState(initialDate);

  const start =
    view === "month"
      ? startOfWeek(startOfMonth(currentDate))
      : startOfWeek(currentDate);
  const end =
    view === "month"
      ? endOfWeek(endOfMonth(currentDate))
      : endOfWeek(currentDate);

  const days: Date[] = [];
  for (let day = start; day <= end; day = addDays(day, 1)) {
    days.push(day);
  }

  const handlePrev = () => {
    const newDate =
      view === "month" ? subMonths(currentDate, 1) : subWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  const handleNext = () => {
    const newDate =
      view === "month" ? addMonths(currentDate, 1) : addWeeks(currentDate, 1);
    setCurrentDate(newDate);
    onDateChange?.(newDate);
  };

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between">
        <button onClick={handlePrev} className="px-2 text-sm font-medium">
          &lt;
        </button>
        <div className="font-semibold">
          {view === "month"
            ? format(currentDate, "MMMM yyyy")
            : `${format(start, "MMM d")} - ${format(end, "MMM d")}`}
        </div>
        <button onClick={handleNext} className="px-2 text-sm font-medium">
          &gt;
        </button>
      </div>
      <div className="grid grid-cols-7 gap-px border text-sm">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((d) => (
          <div key={d} className="bg-muted p-1 text-center font-medium">
            {d}
          </div>
        ))}
        {days.map((day) => (
          <div key={day.toISOString()} className="h-24 border p-1 align-top">
            <div className="text-xs font-medium">{format(day, "d")}</div>
            {events
              .filter((e) => isSameDay(parseISO(e.date), day))
              .map((e) => (
                <div key={e.id} className="mt-1 truncate text-xs">
                  {renderEvent ? (
                    renderEvent(e)
                  ) : (
                    <span>
                      {e.time ? `${e.time} - ` : ""}
                      {e.title}
                    </span>
                  )}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
