"use client";

import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "@/components/ui/input";
import { LoginDto } from "@/types";
import { useLogin } from "@/hooks/auth/use-login";

const formSchema = z.object({
  email: z.string().email("Geçerli bir e-posta adresi girin"),
  password: z.string().min(6, "Şifre en az 6 karakter olmalıdır"),
});

export function LoginForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const loginMutation = useLogin();

  function onSubmit(values: z.infer<typeof formSchema>) {
    loginMutation.mutate(values as LoginDto);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6"
        noValidate
        aria-label="Giriş formu"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">E-posta</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="E-posta adresinizi girin"
                  disabled={loginMutation.isPending}
                  autoComplete="email"
                  aria-describedby="email-error"
                  {...field}
                />
              </FormControl>
              <FormMessage id="email-error" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="password">Şifre</FormLabel>
              <FormControl>
                <Input
                  id="password"
                  type="password"
                  placeholder="Şifrenizi girin"
                  disabled={loginMutation.isPending}
                  autoComplete="current-password"
                  aria-describedby="password-error"
                  {...field}
                />
              </FormControl>
              <FormMessage id="password-error" />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full"
          disabled={loginMutation.isPending}
          aria-label={
            loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"
          }
        >
          {loginMutation.isPending ? "Giriş yapılıyor..." : "Giriş Yap"}
        </Button>
      </form>
    </Form>
  );
}
