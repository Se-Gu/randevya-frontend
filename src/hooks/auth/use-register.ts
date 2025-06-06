"use client";

import { useMutation } from "@tanstack/react-query";
import { authApi, salonsApi, type ApiError } from "@/lib/api";
import type {
  CreateUserDto,
  CreateSalonDto,
  LoginResponse,
  UserRole,
  DayOfWeek,
} from "@/types";
import { authStorage } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/ui/use-toast";

interface RegisterData {
  // User data
  name: string;
  email: string;
  password: string;

  // Salon data
  salonName: string;
  salonPhone: string;
  salonEmail: string;
  address: string;
  lat?: number;
  lng?: number;
  weeklyAvailability: Array<{
    day: string;
    slots: Array<{ start: string; end: string }>;
  }>;
}

export function useRegister() {
  const router = useRouter();
  const { toast } = useToast();

  return useMutation<LoginResponse, ApiError, RegisterData>({
    mutationFn: async (data) => {
      // First create the salon
      const salonData: CreateSalonDto = {
        name: data.salonName,
        phone: data.salonPhone,
        email: data.salonEmail,
        location: {
          address: data.address,
          lat: data.lat || 0,
          lng: data.lng || 0,
        },
        weeklyAvailability: data.weeklyAvailability.map((day) => ({
          day: day.day as DayOfWeek,
          slots: day.slots.map((slot) => ({
            start: slot.start,
            end: slot.end,
          })),
        })),
      };

      const salon = await salonsApi.create(salonData);

      // Then create the user with owner role
      const userData: CreateUserDto = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: "owner" as UserRole,
        salonId: salon.id,
      };

      const user = await authApi.register(userData);

      // Auto-login after registration
      return authApi.login({
        email: data.email,
        password: data.password,
      });
    },
    onSuccess: (data) => {
      authStorage.set(data);
      toast({
        title: "Başarılı",
        description: "Salon kaydınız tamamlandı! Hoş geldiniz.",
      });
      router.push("/dashboard");
    },
    onError: (error) => {
      let errorMessage = "Kayıt işlemi başarısız. Lütfen tekrar deneyin.";

      if (error.status === 409) {
        errorMessage = "Bu e-posta adresi zaten kullanımda.";
      } else if (error.status === 400) {
        errorMessage = "Lütfen tüm alanları doğru şekilde doldurun.";
      } else if (error.status === 0) {
        errorMessage =
          "Sunucuya bağlanılamadı. Lütfen internet bağlantınızı kontrol edin.";
      }

      toast({
        title: "Hata",
        description: errorMessage,
        variant: "destructive",
      });
    },
  });
}
