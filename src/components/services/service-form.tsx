"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import * as z from "zod";
import { servicesApi } from "@/lib/api";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface ServiceFormProps {
  salonId: string;
  serviceId?: string;
  defaultValues?: {
    name: string;
    durationMinutes: number;
    price: number;
  };
  onCancel?: () => void;
  onSuccess?: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, "Hizmet adı en az 2 karakter olmalıdır"),
  durationMinutes: z.coerce
    .number()
    .min(1, "Süre en az 1 dakika olmalıdır"),
  price: z.coerce.number().min(0, "Fiyat negatif olamaz"),
});

export function ServiceForm({
  salonId,
  serviceId,
  defaultValues,
  onCancel,
  onSuccess,
}: ServiceFormProps) {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: defaultValues?.name ?? "",
      durationMinutes: defaultValues?.durationMinutes ?? 30,
      price: defaultValues?.price ?? 0,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      servicesApi.create({ ...data, salonId }),
    onSuccess: () => {
      toast({ title: "Hizmet oluşturuldu" });
      queryClient.invalidateQueries({ queryKey: ["services", salonId] });
      form.reset();
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Hizmet oluşturulamadı",
        variant: "destructive",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: (data: z.infer<typeof formSchema>) =>
      servicesApi.update(serviceId!, data),
    onSuccess: () => {
      toast({ title: "Hizmet güncellendi" });
      queryClient.invalidateQueries({ queryKey: ["services", salonId] });
      onSuccess?.();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Hizmet güncellenemedi",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (serviceId) {
      updateMutation.mutate(values);
    } else {
      createMutation.mutate(values);
    }
  }

  const isLoading = createMutation.isPending || updateMutation.isPending;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hizmet Adı</FormLabel>
              <FormControl>
                <Input placeholder="Hizmet adı" disabled={isLoading} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="durationMinutes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Süre (dk)</FormLabel>
                <FormControl>
                  <Input type="number" min="1" disabled={isLoading} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Fiyat</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    min="0"
                    disabled={isLoading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex space-x-2">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Kaydediliyor..." : serviceId ? "Güncelle" : "Oluştur"}
          </Button>
          {onCancel && (
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              disabled={isLoading}
            >
              İptal
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
}
