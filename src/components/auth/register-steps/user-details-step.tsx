"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { ArrowRight, User, Mail, Lock, Eye, EyeOff } from "lucide-react";
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
import type { RegisterData } from "../register-flow";
import { useState } from "react";

const formSchema = z
  .object({
    name: z.string().min(2, "İsim en az 2 karakter olmalıdır"),
    email: z.string().email("Geçerli bir e-posta adresi girin"),
    password: z.string().min(8, "Şifre en az 8 karakter olmalıdır"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

interface UserDetailsStepProps {
  data: RegisterData;
  updateData: (data: Partial<RegisterData>) => void;
  onNext: () => void;
  isLoading: boolean;
}

export function UserDetailsStep({
  data,
  updateData,
  onNext,
  isLoading,
}: UserDetailsStepProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: data.name,
      email: data.email,
      password: data.password,
      confirmPassword: data.confirmPassword,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateData(values);
    onNext();
  }

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="text-center space-y-1 md:space-y-2">
        <h2 className="text-xl md:text-2xl font-semibold">
          Hesap Bilgileriniz
        </h2>
        <p className="text-sm text-muted-foreground">
          Salon yönetim hesabınızı oluşturmak için bilgilerinizi girin
        </p>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 md:space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <User className="h-4 w-4" />
                  <span>Ad Soyad</span>
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Adınızı ve soyadınızı girin"
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
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>E-posta</span>
                </FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="E-posta adresinizi girin"
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
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Şifre</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="Güçlü bir şifre oluşturun"
                      disabled={isLoading}
                      className="h-10 md:h-12 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 md:h-12 w-10"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Şifre Tekrar</span>
                </FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Şifrenizi tekrar girin"
                      disabled={isLoading}
                      className="h-10 md:h-12 pr-10"
                      {...field}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute right-0 top-0 h-10 md:h-12 w-10"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full h-10 md:h-12 text-base md:text-lg"
            disabled={isLoading}
            style={{
              background: `linear-gradient(135deg, rgba(99, 102, 241, 0.9) 0%, rgba(139, 92, 246, 0.9) 100%)`,
              color: "white",
              textShadow: "0 2px 4px rgba(0, 0, 0, 0.3)",
              boxShadow: "0 4px 15px rgba(99, 102, 241, 0.3)",
              border: "1px solid rgba(255, 255, 255, 0.2)",
            }}
          >
            <span>Devam Et</span>
            <ArrowRight className="ml-2 h-4 w-4 md:h-5 md:w-5" />
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm text-muted-foreground">
        <p>
          Zaten hesabınız var mı?{" "}
          <a
            href="/login"
            className="text-purple-600 hover:text-purple-700 font-medium"
          >
            Giriş Yapın
          </a>
        </p>
      </div>
    </div>
  );
}
