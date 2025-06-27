"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { servicesApi } from "@/lib/api";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import { ServiceForm } from "./service-form";

interface ServiceListProps {
  salonId: string;
}

export function ServiceList({ salonId }: ServiceListProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["services", salonId],
    queryFn: () => servicesApi.getBySalon(salonId),
    enabled: !!salonId,
  });

  const deleteMutation = useMutation({
    mutationFn: servicesApi.delete,
    onSuccess: () => {
      toast({ title: "Hizmet silindi" });
      queryClient.invalidateQueries({ queryKey: ["services", salonId] });
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Hizmet silinemedi",
        variant: "destructive",
      });
    },
  });

  const handleDelete = (id: string) => {
    if (confirm("Bu hizmeti silmek istediğinizden emin misiniz?")) {
      deleteMutation.mutate(id);
    }
  };

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
        Hizmetler yüklenirken bir hata oluştu.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {data?.map((service) => (
        <Card key={service.id}>
          <CardHeader>
            <CardTitle>{service.name}</CardTitle>
          </CardHeader>
          <CardContent>
            {editingId === service.id ? (
              <ServiceForm
                salonId={salonId}
                serviceId={service.id}
                defaultValues={{
                  name: service.name,
                  durationMinutes: service.durationMinutes,
                  price: service.price,
                }}
                onSuccess={() => setEditingId(null)}
                onCancel={() => setEditingId(null)}
              />
            ) : (
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  {service.durationMinutes} dk - ₺{service.price}
                </div>
                <div className="space-x-2">
                  <Button size="sm" variant="outline" onClick={() => setEditingId(service.id)}>
                    Düzenle
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(service.id)}
                    disabled={deleteMutation.isPending}
                  >
                    Sil
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      ))}
      {data && data.length === 0 && (
        <p className="text-sm text-muted-foreground text-center">Henüz hizmet eklenmemiş.</p>
      )}
    </div>
  );
}
