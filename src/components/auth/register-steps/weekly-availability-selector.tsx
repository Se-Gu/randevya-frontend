"use client";

import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const DAYS = [
  { key: "Monday", label: "Pazartesi" },
  { key: "Tuesday", label: "Salı" },
  { key: "Wednesday", label: "Çarşamba" },
  { key: "Thursday", label: "Perşembe" },
  { key: "Friday", label: "Cuma" },
  { key: "Saturday", label: "Cumartesi" },
  { key: "Sunday", label: "Pazar" },
];

interface TimeSlot {
  start: string;
  end: string;
}

interface DayAvailability {
  day: string;
  slots: TimeSlot[];
}

interface WeeklyAvailabilitySelectorProps {
  value: DayAvailability[];
  onChange: (value: DayAvailability[]) => void;
  disabled?: boolean;
}

export function WeeklyAvailabilitySelector({
  value,
  onChange,
  disabled,
}: WeeklyAvailabilitySelectorProps) {
  const [expandedDays, setExpandedDays] = useState<string[]>([]);

  const toggleDay = (dayKey: string) => {
    if (expandedDays.includes(dayKey)) {
      setExpandedDays(expandedDays.filter((d) => d !== dayKey));
      // Remove day from availability
      onChange(value.filter((d) => d.day !== dayKey));
    } else {
      setExpandedDays([...expandedDays, dayKey]);
      // Add day with default slot
      onChange([
        ...value,
        { day: dayKey, slots: [{ start: "09:00", end: "18:00" }] },
      ]);
    }
  };

  const addTimeSlot = (dayKey: string) => {
    const updatedValue = value.map((d) =>
      d.day === dayKey
        ? { ...d, slots: [...d.slots, { start: "09:00", end: "18:00" }] }
        : d
    );
    onChange(updatedValue);
  };

  const removeTimeSlot = (dayKey: string, slotIndex: number) => {
    const updatedValue = value.map((d) =>
      d.day === dayKey
        ? { ...d, slots: d.slots.filter((_, i) => i !== slotIndex) }
        : d
    );
    onChange(updatedValue);
  };

  const updateTimeSlot = (
    dayKey: string,
    slotIndex: number,
    field: "start" | "end",
    newValue: string
  ) => {
    const updatedValue = value.map((d) =>
      d.day === dayKey
        ? {
            ...d,
            slots: d.slots.map((slot, i) =>
              i === slotIndex ? { ...slot, [field]: newValue } : slot
            ),
          }
        : d
    );
    onChange(updatedValue);
  };

  const getDayAvailability = (dayKey: string) => {
    return value.find((d) => d.day === dayKey);
  };

  return (
    <div className="space-y-2 md:space-y-3">
      <p className="text-xs md:text-sm text-muted-foreground">
        Salonunuzun açık olduğu günleri ve saatleri seçin
      </p>

      <div className="grid gap-2">
        {DAYS.map((day) => {
          const isExpanded = expandedDays.includes(day.key);
          const dayAvailability = getDayAvailability(day.key);

          return (
            <div
              key={day.key}
              className="border rounded-lg p-2 md:p-3 space-y-2 md:space-y-3"
            >
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 md:space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isExpanded}
                    onChange={() => toggleDay(day.key)}
                    disabled={disabled}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm md:text-base font-medium">
                    {day.label}
                  </span>
                </label>

                {isExpanded && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => addTimeSlot(day.key)}
                    disabled={disabled}
                    className="text-xs md:text-sm h-7 md:h-8"
                  >
                    <Plus className="h-3 w-3 md:h-4 md:w-4 mr-1" />
                    <span className="hidden xs:inline">Saat Ekle</span>
                    <span className="xs:hidden">Ekle</span>
                  </Button>
                )}
              </div>

              {isExpanded && dayAvailability && (
                <div className="space-y-2 pl-4 md:pl-6">
                  {dayAvailability.slots.map((slot, slotIndex) => (
                    <div
                      key={slotIndex}
                      className="flex flex-wrap md:flex-nowrap items-center gap-2"
                    >
                      <Input
                        type="time"
                        value={slot.start}
                        onChange={(e) =>
                          updateTimeSlot(
                            day.key,
                            slotIndex,
                            "start",
                            e.target.value
                          )
                        }
                        disabled={disabled}
                        className="w-24 md:w-32 h-8 md:h-10 text-xs md:text-sm"
                      />
                      <span className="text-muted-foreground">-</span>
                      <Input
                        type="time"
                        value={slot.end}
                        onChange={(e) =>
                          updateTimeSlot(
                            day.key,
                            slotIndex,
                            "end",
                            e.target.value
                          )
                        }
                        disabled={disabled}
                        className="w-24 md:w-32 h-8 md:h-10 text-xs md:text-sm"
                      />
                      {dayAvailability.slots.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          onClick={() => removeTimeSlot(day.key, slotIndex)}
                          disabled={disabled}
                          className="text-red-500 hover:text-red-700 h-8 w-8 md:h-10 md:w-10"
                        >
                          <Trash2 className="h-3 w-3 md:h-4 md:w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
