"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import type { Salon } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";

export function SalonList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<Salon[]>({
    queryKey: ["admin", "salons"],
    queryFn: adminApi.getAllSalons,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteSalon(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "salons"] });
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center p-4">
        <LoadingSpinner />
      </div>
    );
  }

  if (isError || !data) {
    return <p className="p-4 text-sm text-red-500">Salonlar yüklenemedi.</p>;
  }

  if (data.length === 0) {
    return <p className="p-4 text-sm text-muted-foreground">Henüz salon yok.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((salon) => (
        <Card key={salon.id}>
          <CardHeader>
            <CardTitle>{salon.name}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Email: {salon.email}
          </CardContent>
          <CardFooter>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteMutation.mutate(salon.id)}
              disabled={deleteMutation.isPending}
            >
              Sil
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
