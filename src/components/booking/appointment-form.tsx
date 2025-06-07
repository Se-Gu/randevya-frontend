"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useQuery, useMutation } from "@tanstack/react-query";
import { servicesApi, staffApi, appointmentsApi } from "@/lib/api";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface AppointmentFormProps {
  salonId: string;
}

const formSchema = z.object({
  serviceId: z.string().min(1, "Hizmet seçin"),
  staffId: z.string().min(1, "Çalışan seçin"),
  date: z.string().min(1, "Tarih seçin"),
  time: z.string().min(1, "Saat seçin"),
  customerName: z.string().min(2, "İsim girin"),
  customerPhone: z.string().min(10, "Telefon girin"),
});

export function AppointmentForm({ salonId }: AppointmentFormProps) {
  const { toast } = useToast();

  const servicesQuery = useQuery({
    queryKey: ["services", salonId],
    queryFn: () => servicesApi.getBySalon(salonId),
    enabled: !!salonId,
  });

  const staffQuery = useQuery({
    queryKey: ["staff", salonId],
    queryFn: () => staffApi.getBySalon(salonId),
    enabled: !!salonId,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serviceId: "",
      staffId: "",
      date: "",
      time: "",
      customerName: "",
      customerPhone: "",
    },
  });

  const createMutation = useMutation({
    mutationFn: appointmentsApi.create,
    onSuccess: () => {
      toast({ title: "Randevu oluşturuldu" });
      form.reset();
    },
    onError: () => {
      toast({
        title: "Hata",
        description: "Randevu oluşturulamadı",
        variant: "destructive",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMutation.mutate({
      salonId,
      serviceId: values.serviceId,
      staffId: values.staffId,
      customerName: values.customerName,
      customerPhone: values.customerPhone,
      date: values.date,
      time: values.time,
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="serviceId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Hizmet</FormLabel>
              <FormControl>
                <select {...field} className="border rounded p-2 w-full">
                  <option value="">Seçin</option>
                  {servicesQuery.data?.map((service) => (
                    <option key={service.id} value={service.id}>
                      {service.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="staffId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Çalışan</FormLabel>
              <FormControl>
                <select {...field} className="border rounded p-2 w-full">
                  <option value="">Seçin</option>
                  {staffQuery.data?.map((staff) => (
                    <option key={staff.id} value={staff.id}>
                      {staff.name}
                    </option>
                  ))}
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tarih</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="time"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Saat</FormLabel>
                <FormControl>
                  <Input type="time" step="900" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="customerName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>İsim</FormLabel>
              <FormControl>
                <Input placeholder="Adınız" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="customerPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Telefon</FormLabel>
              <FormControl>
                <Input placeholder="Telefon" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={createMutation.isPending}>
          {createMutation.isPending ? "Gönderiliyor..." : "Randevu Al"}
        </Button>
      </form>
    </Form>
  );
}

