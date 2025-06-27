"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { salonsApi } from "@/lib/api";
import type { Salon } from "@/types";
import { Card } from "@/components/ui/card";
import { LoadingPage } from "@/components/ui/loading";

export default function SalonsPage() {
  const { data, isLoading, isError } = useQuery<Salon[]>({
    queryKey: ["salons"],
    queryFn: salonsApi.getAll,
  });

  if (isLoading) {
    return <LoadingPage />;
  }

  if (isError || !data) {
    return <p className="p-4 text-sm text-red-500">Kuaförler yüklenemedi.</p>;
  }

  if (data.length === 0) {
    return <p className="p-4 text-sm text-muted-foreground">Kuaför bulunamadı.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-bold">Kuaförler</h1>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {data.map((salon) => (
          <Link key={salon.id} href={`/salons/${salon.id}`}>
            <Card className="p-4 hover:shadow-md transition-shadow">
              <p className="font-semibold">{salon.name}</p>
              <p className="text-sm text-muted-foreground">
                {salon.location.address}
              </p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
