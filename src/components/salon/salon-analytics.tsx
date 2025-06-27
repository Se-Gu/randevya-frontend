"use client";

import { useSalonMetrics } from "@/hooks/salon";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface SalonAnalyticsProps {
  salonId?: string;
}

export function SalonAnalytics({ salonId }: SalonAnalyticsProps) {
  const { data, isLoading, isError } = useSalonMetrics(salonId);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="p-4 text-center text-sm text-red-500">
        Analitik veriler alınırken bir hata oluştu.
      </div>
    );
  }

  const chartData = [
    { name: "Randevular", value: data.appointmentCount },
    { name: "Gelir", value: data.revenue },
    { name: "En Popüler", value: data.mostBookedService?.count ?? 0 },
    { name: "Doluluk", value: data.utilizationRate },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Analitik</CardTitle>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData} margin={{ top: 20, right: 20, left: 0, bottom: 0 }}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
