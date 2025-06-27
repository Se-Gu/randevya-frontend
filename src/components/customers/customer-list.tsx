"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { appointmentsApi } from "@/lib/api";
import type { Appointment } from "@/types";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";

interface Customer {
  name: string;
  phone: string;
  email?: string;
}

export function CustomerList() {
  const { data, isLoading, isError } = useQuery<Appointment[]>({
    queryKey: ["appointments", "all"],
    queryFn: appointmentsApi.getAll,
  });

  const [search, setSearch] = useState("");

  const customers = useMemo(() => {
    if (!data) return [] as Customer[];
    const map = new Map<string, Customer>();
    for (const appt of data) {
      const key = appt.customerPhone || appt.customerEmail || appt.customerName;
      if (!map.has(key)) {
        map.set(key, {
          name: appt.customerName,
          phone: appt.customerPhone,
          email: appt.customerEmail,
        });
      }
    }
    let list = Array.from(map.values());
    if (search.trim()) {
      const lower = search.toLowerCase();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(lower) ||
          c.phone.toLowerCase().includes(lower) ||
          (c.email?.toLowerCase().includes(lower) ?? false)
      );
    }
    return list;
  }, [data, search]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="p-4 text-center text-sm text-red-500">
        Müşteriler yüklenemedi.
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="p-4 text-center text-sm text-muted-foreground">
        Henüz müşteri yok.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Input
        placeholder="Ara..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {customers.map((customer, idx) => (
          <Card key={idx}>
            <CardHeader>
              <CardTitle>{customer.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-1 text-sm text-muted-foreground">
              <div>Tel: {customer.phone}</div>
              {customer.email && <div>E-posta: {customer.email}</div>}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
