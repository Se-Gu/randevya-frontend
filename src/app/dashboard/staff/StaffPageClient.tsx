"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { staffApi } from "@/lib/api";
import { getAuthState } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(1, "İsim gerekli"),
});

export function StaffPageClient() {
  const { user } = getAuthState();
  const salonId = user?.salonId || "";
  const queryClient = useQueryClient();

  const staffQuery = useQuery({
    queryKey: ["staff", salonId],
    queryFn: () => staffApi.getBySalon(salonId),
    enabled: !!salonId,
  });

  const createForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      staffApi.create({ name: data.name, salonId, workingHours: [] }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff", salonId] });
      createForm.reset();
    },
  });

  const [editingId, setEditingId] = useState<string | null>(null);
  const editForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { name: "" },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, name }: { id: string; name: string }) =>
      staffApi.update(id, { name }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff", salonId] });
      setEditingId(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => staffApi.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff", salonId] });
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold mb-2">Yeni Çalışan Ekle</h2>
        <Form {...createForm}>
          <form
            onSubmit={createForm.handleSubmit((values) => createMutation.mutate(values))}
            className="flex space-x-2"
          >
            <FormField
              control={createForm.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>İsim</FormLabel>
                  <FormControl>
                    <Input placeholder="Çalışan adı" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={createMutation.isPending}>
              Ekle
            </Button>
          </form>
        </Form>
      </div>

      <div className="space-y-2">
        {staffQuery.data?.map((staff) => (
          <Card key={staff.id} className="p-4 space-y-2">
            {editingId === staff.id ? (
              <Form {...editForm}>
                <form
                  onSubmit={editForm.handleSubmit((values) =>
                    updateMutation.mutate({ id: staff.id, name: values.name })
                  )}
                  className="flex space-x-2"
                >
                  <FormField
                    control={editForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>İsim</FormLabel>
                        <FormControl>
                          <Input placeholder="Çalışan adı" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" size="sm">
                    Kaydet
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="secondary"
                    onClick={() => setEditingId(null)}
                  >
                    İptal
                  </Button>
                </form>
              </Form>
            ) : (
              <div className="flex items-center justify-between">
                <span>{staff.name}</span>
                <div className="space-x-2">
                  <Button size="sm" variant="secondary" onClick={() => {
                    setEditingId(staff.id);
                    editForm.setValue("name", staff.name);
                  }}>
                    Düzenle
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteMutation.mutate(staff.id)}
                  >
                    Sil
                  </Button>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}

