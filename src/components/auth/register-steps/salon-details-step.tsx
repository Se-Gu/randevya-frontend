"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  ArrowLeft,
  ArrowRight,
  Building,
  Phone,
  Mail,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LocationPicker } from "@/components/ui/location-picker";
import type { RegisterData } from "../register-flow";
import { WeeklyAvailabilitySelector } from "./weekly-availability-selector";

const formSchema = z.object({
  salonName: z.string().min(2, "Salon adı en az 2 karakter olmalıdır"),
  salonPhone: z
    .string()
    .regex(
      /^\+90[0-9]{10}$/,
      "Geçerli bir Türk telefon numarası girin (+90 ile başlamalı)"
    ),
  salonEmail: z.string().email("Geçerli bir e-posta adresi girin"),
  location: z.object({
    address: z.string().min(10, "Detaylı adres bilgisi girin"),
    lat: z.number(),
    lng: z.number(),
  }),
});

interface SalonDetailsStepProps {
  data: RegisterData;
  updateData: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  onPrev: () => void;
  isLoading: boolean;
}

export function SalonDetailsStep({
  data,
  updateData,
  onNext,
  onPrev,
  isLoading,
}: SalonDetailsStepProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      salonName: data.salonName,
      salonPhone: data.salonPhone,
      salonEmail: data.salonEmail,
      location: {
        address: data.address,
        lat: data.lat || 41.0082,
        lng: data.lng || 28.9784,
      },
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateData({
      ...values,
      address: values.location.address,
      lat: values.location.lat,
      lng: values.location.lng,
    });
    onNext();
  }

  const handleAvailabilityChange = (
    availability: Array<{
      day: string;
      slots: Array<{ start: string; end: string }>;
    }>
  ) => {
    updateData({ weeklyAvailability: availability });
  };

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold">
          Salon Bilgileriniz
        </h2>
        <p className="text-sm text-muted-foreground">
          Salonunuzun detaylarını girin ve müşterilerinizle buluşun
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6"
        >
          <FormField
            control={form.control}
            name="salonName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Building className="h-4 w-4" />
                  <span>Salon Adı</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Salonunuzun adını girin"
                    disabled={isLoading}
                    className="h-10 md:h-12"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="salonPhone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Phone className="h-4 w-4" />
                    <span>Telefon</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="+90 555 123 45 67"
                      disabled={isLoading}
                      className="h-10 md:h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="salonEmail"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center space-x-2">
                    <Mail className="h-4 w-4" />
                    <span>E-posta</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="salon@example.com"
                      disabled={isLoading}
                      className="h-10 md:h-12"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Konum</FormLabel>
                <FormControl>
                  <LocationPicker
                    value={field.value}
                    onChange={field.onChange}
                    disabled={isLoading}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-2 md:space-y-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span className="font-medium text-sm md:text-base">
                Çalışma Saatleri (İsteğe Bağlı)
              </span>
            </div>
            <WeeklyAvailabilitySelector
              value={data.weeklyAvailability}
              onChange={handleAvailabilityChange}
              disabled={isLoading}
            />
          </div>

          <div className="flex space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={onPrev}
              disabled={isLoading}
              className="flex-1 h-10 md:h-12"
            >
              <ArrowLeft className="mr-2 h-4 w-4 md:h-5 md:w-5" />
              Geri
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="flex-1 h-10 md:h-12 text-base md:text-lg"
              style={{
                background: `linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)`,
                color: "white",
                textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
                boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
              }}
            >
              {isLoading ? "Kaydediliyor..." : "Salon Oluştur"}
              {!isLoading && (
                <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
