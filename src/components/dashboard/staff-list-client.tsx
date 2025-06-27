"use client";

import { useQuery } from "@tanstack/react-query";
import { staffApi } from "@/lib/api";
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
import Link from "next/link";

export function StaffListClient() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["staff"],
    queryFn: staffApi.getAll,
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
        Personel yüklenemedi.
      </p>
    );
  }

  if (!data || data.length === 0) {
    return (
      <p className="p-4 text-center text-sm text-muted-foreground">
        Henüz personel yok.
      </p>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Personel</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Ad</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Telefon</TableHead>
              <TableHead>Rol</TableHead>
              <TableHead>İşlemler</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((staff) => (
              <TableRow key={staff.id}>
                <TableCell>{staff.name}</TableCell>
                <TableCell>{staff.email}</TableCell>
                <TableCell>{staff.phone}</TableCell>
                <TableCell>{staff.role}</TableCell>
                <TableCell>
                  <Link href={`/dashboard/staff/${staff.id}/calendar`}>
                    Takvim
                  </Link>
                  <span className="mx-2">|</span>
                  <Link href={`/dashboard/staff/${staff.id}/analytics`}>
                    Analizler
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
