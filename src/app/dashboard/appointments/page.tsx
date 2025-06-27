"use client";

import { useState } from "react";
import { Metadata } from "next";
import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { DashboardHeader } from "@/components/owner/dashboard/header";
import { DashboardShell } from "@/components/owner/dashboard/shell";
import { Calendar, type CalendarEvent } from "@/components/calendar/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { useToast } from "@/components/ui/use-toast";
import { appointmentsApi } from "@/lib/api";
import { formatDate, formatTime } from "@/lib/utils";
import type { Appointment } from "@/types";

export const metadata: Metadata = {
  title: "Randevular",
  description: "Randevu yönetimi",
};

export default function AppointmentsPage() {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<Appointment | null>(null);

  const { data, isLoading, isError } = useQuery<Appointment[]>({
    queryKey: ["appointments"],
    queryFn: appointmentsApi.getAll,
  });

  const cancelMutation = useMutation({
    mutationFn: ({ id, token }: { id: string; token: string }) =>
      appointmentsApi.cancel(id, token),
    onSuccess: () => {
      toast({ title: "Randevu iptal edildi" });
      queryClient.invalidateQueries({ queryKey: ["appointments"] });
      setSelected(null);
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Randevu iptal edilemedi",
        variant: "destructive",
      });
    },
  });

  if (isLoading) {
    return (
      <DashboardShell>
        <div className="flex justify-center p-4">
          <LoadingSpinner />
        </div>
      </DashboardShell>
    );
  }

  if (isError || !data) {
    return (
      <DashboardShell>
        <p className="p-4 text-sm text-red-500">Randevular yüklenemedi.</p>
      </DashboardShell>
    );
  }

  const events: CalendarEvent[] = data.map((a) => ({
    id: a.id,
    date: a.date,
    time: a.time,
    title: a.customerName,
  }));

  const handleSelect = (id: string) => {
    const appt = data.find((a) => a.id === id) || null;
    setSelected(appt);
  };

  return (
    <DashboardShell>
      {/* <DashboardHeader
        heading="Randevular"
        text="Randevu yönetimi"
      /> */}
      <Calendar
        events={events}
        renderEvent={(e) => (
          <button
            onClick={() => handleSelect(e.id)}
            className="w-full text-left hover:underline"
          >
            {e.time ? `${e.time} - ` : ""}
            {e.title}
          </button>
        )}
      />

      {selected && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle>{selected.customerName}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1 text-sm">
            <p>
              <strong>Tarih:</strong> {formatDate(selected.date)}
            </p>
            <p>
              <strong>Saat:</strong> {formatTime(selected.time)}
            </p>
            {selected.customerPhone && (
              <p>
                <strong>Telefon:</strong> {selected.customerPhone}
              </p>
            )}
            {selected.customerEmail && (
              <p>
                <strong>E-posta:</strong> {selected.customerEmail}
              </p>
            )}
          </CardContent>
          <CardFooter className="justify-end space-x-2">
            <Button variant="secondary" onClick={() => setSelected(null)}>
              Kapat
            </Button>
            <Button
              variant="destructive"
              onClick={() =>
                cancelMutation.mutate({
                  id: selected.id,
                  token: selected.accessToken,
                })
              }
              disabled={cancelMutation.isPending}
            >
              {cancelMutation.isPending ? "İptal..." : "Randevuyu İptal Et"}
            </Button>
          </CardFooter>
        </Card>
      )}
    </DashboardShell>
  );
}
