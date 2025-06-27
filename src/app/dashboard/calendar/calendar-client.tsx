"use client";

import { useState } from "react";
import { SalonCalendar, SalonAnalytics } from "@/components/salon";
import { Button } from "@/components/ui/button";

export function CalendarClient() {
  const [view, setView] = useState<"week" | "month">("month");

  return (
    <>
      <div className="flex justify-end mb-4 space-x-2">
        <Button
          variant={view === "week" ? "default" : "outline"}
          onClick={() => setView("week")}
        >
          Haftalık
        </Button>
        <Button
          variant={view === "month" ? "default" : "outline"}
          onClick={() => setView("month")}
        >
          Aylık
        </Button>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <SalonCalendar view={view} />
        <SalonAnalytics />
      </div>
    </>
  );
}
