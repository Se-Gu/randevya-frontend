"use client";

import { useQuery } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function ServiceListClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.getAll,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <p className="p-4 text-center text-sm text-red-500">
        Hizmetler yüklenemedi.
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="p-4 text-center text-sm text-muted-foreground">
        Henüz hizmet yok.
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Hizmetler</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad</TableHead>
              <TableHead>Fiyat</TableHead>
              <TableHead>Süre (dk)</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((service) => (
              <TableRow key={service.id}>
                <TableCell>{service.name}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>{service.durationMinutes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
