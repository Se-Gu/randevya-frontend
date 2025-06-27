"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { salonsApi, servicesApi } from "@/lib/api";
import type { Salon, Service } from "@/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingPage } from "@/components/ui/loading";

export default function SalonDetailPage() {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string);

  const salonQuery = useQuery<Salon>({
    queryKey: ["salon", id],
    queryFn: () => salonsApi.getById(id),
    enabled: !!id,
  });

  const servicesQuery = useQuery<Service[]>({
    queryKey: ["services", id],
    queryFn: () => servicesApi.getBySalon(id),
    enabled: !!id,
  });

  if (salonQuery.isLoading || servicesQuery.isLoading) {
    return <LoadingPage />;
  }

  if (salonQuery.isError || !salonQuery.data) {
    return <p className="p-4 text-sm text-red-500">Kuaför bulunamadı.</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">{salonQuery.data.name}</h1>
        <p className="text-sm text-muted-foreground">
          {salonQuery.data.location.address}
        </p>
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Hizmetler</h2>
        {servicesQuery.isError && (
          <p className="text-sm text-red-500">Hizmetler yüklenemedi.</p>
        )}
        {servicesQuery.data && servicesQuery.data.length === 0 && (
          <p className="text-sm text-muted-foreground">Hizmet bulunamadı.</p>
        )}
        {servicesQuery.data && servicesQuery.data.length > 0 && (
          <div className="space-y-2">
            {servicesQuery.data.map((service) => (
              <Card key={service.id} className="p-4 flex justify-between">
                <span>{service.name}</span>
                <span className="text-sm text-muted-foreground">
                  {service.price}₺
                </span>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Link href={`/book?salonId=${id}`}> 
        <Button className="mt-4">Randevu Al</Button>
      </Link>
    </div>
  );
}
