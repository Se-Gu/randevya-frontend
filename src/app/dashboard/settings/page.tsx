'use client'

import { useEffect } from 'react'
import { useQuery, useMutation } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { salonsApi, ApiError } from '@/lib/api'
import { DashboardShell } from '@/components/owner/dashboard/shell'
import { DashboardHeader } from '@/components/owner/dashboard/header'
import { Button } from '@/components/ui/button'
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useToast } from '@/components/ui/use-toast'
import type { Salon } from '@/types'


const formSchema = z.object({
  name: z.string().min(2, 'Salon adı en az 2 karakter olmalıdır'),
  phone: z
    .string()
    .regex(/^\+90[0-9]{10}$/, 'Geçerli bir Türk telefon numarası girin (+90 ile başlamalı)'),
  email: z.string().email('Geçerli bir e-posta adresi girin'),
  address: z.string().min(5, 'Adres en az 5 karakter olmalıdır'),
})

export default function SettingsPage() {
  const { data, isLoading } = useQuery<Salon>({
    queryKey: ['salon', 'me'],
    queryFn: salonsApi.getMe,
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      phone: '',
      email: '',
      address: '',
    },
  })

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.location.address,
      })
    }
  }, [data, form])

  const { toast } = useToast()

  const updateMutation = useMutation<Salon, ApiError, z.infer<typeof formSchema>>({
    mutationFn: (values) =>
      salonsApi.update(data!.id, {
        name: values.name,
        phone: values.phone,
        email: values.email,
        location: {
          address: values.address,
          lat: data?.location.lat ?? 0,
          lng: data?.location.lng ?? 0,
        },
      }),
    onSuccess: () => {
      toast({ title: 'Başarılı', description: 'Salon bilgileri güncellendi' })
    },
    onError: () => {
      toast({
        title: 'Hata',
        description: 'Salon bilgileri güncellenemedi',
        variant: 'destructive',
      })
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (!data) return
    updateMutation.mutate(values)
  }

  return (
    <DashboardShell>
      <DashboardHeader heading="Salon Ayarları" text="Salon bilgilerinizi güncelleyin" />
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-w-md">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Salon Adı</FormLabel>
                <FormControl>
                  <Input {...field} disabled={updateMutation.isPending || isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon</FormLabel>
                <FormControl>
                  <Input {...field} disabled={updateMutation.isPending || isLoading} />
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
                <FormLabel>E-posta</FormLabel>
                <FormControl>
                  <Input type="email" {...field} disabled={updateMutation.isPending || isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Adres</FormLabel>
                <FormControl>
                  <Input {...field} disabled={updateMutation.isPending || isLoading} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" disabled={updateMutation.isPending || isLoading}>
            {updateMutation.isPending ? 'Kaydediliyor...' : 'Kaydet'}
          </Button>
        </form>
      </Form>
    </DashboardShell>
  )
}

