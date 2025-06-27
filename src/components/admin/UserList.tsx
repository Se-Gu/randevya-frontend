"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { adminApi } from "@/lib/api";
import type { User } from "@/types";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/ui/loading";

export function UserList() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useQuery<User[]>({
    queryKey: ["admin", "users"],
    queryFn: adminApi.getAllUsers,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => adminApi.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
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
    return <p className="p-4 text-sm text-red-500">Kullanıcılar yüklenemedi.</p>;
  }

  if (data.length === 0) {
    return <p className="p-4 text-sm text-muted-foreground">Henüz kullanıcı yok.</p>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {data.map((user) => (
        <Card key={user.id}>
          <CardHeader>
            <CardTitle>{user.email}</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">Rol: {user.role}</CardContent>
          <CardFooter>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => deleteMutation.mutate(user.id)}
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
