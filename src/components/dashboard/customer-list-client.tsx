"use client";

import { useQuery } from "@tanstack/react-query";
import { usersApi } from "@/lib/api";
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

export function CustomerListClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["customers"],
    queryFn: usersApi.getAll,
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
        Müşteriler yüklenemedi.
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="p-4 text-center text-sm text-muted-foreground">
        Henüz müşteri yok.
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Müşteriler</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefon</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>{customer.name}</TableCell>
                <TableCell>{customer.email}</TableCell>
                <TableCell>{customer.phone}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
