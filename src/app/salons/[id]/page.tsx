"use client"

import Link from "next/link"
import { useParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { salonsApi, servicesApi } from "@/lib/api"
import type { Salon, Service } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LoadingPage } from "@/components/ui/loading"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { MapPin, Phone, Mail, Clock, Calendar, Star, ArrowLeft, Scissors, Users, CheckCircle } from "lucide-react"

// Helper function to check if salon is open today
const isSalonOpenToday = (weeklyAvailability: any[]) => {
  if (!weeklyAvailability || weeklyAvailability.length === 0) return false

  const today = new Date().getDay()
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const todayDayName = dayNames[today]

  const todayAvailability = weeklyAvailability.find((availability) => availability.day === todayDayName)
  return todayAvailability && todayAvailability.slots && todayAvailability.slots.length > 0
}

export default function SalonDetailPage() {
  const params = useParams()
  const id = Array.isArray(params.id) ? params.id[0] : (params.id as string)

  const salonQuery = useQuery<Salon>({
    queryKey: ["salon", id],
    queryFn: () => salonsApi.getById(id),
    enabled: !!id,
  })

  const servicesQuery = useQuery<Service[]>({
    queryKey: ["services", id],
    queryFn: () => servicesApi.getBySalon(id),
    enabled: !!id,
  })

  if (salonQuery.isLoading || servicesQuery.isLoading) {
    return <LoadingPage />
  }

  if (salonQuery.isError || !salonQuery.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">Kuaför bulunamadı.</p>
          <Link href="/salons">
            <Button>Kuaförlere Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  const salon = salonQuery.data
  const services = servicesQuery.data || []

  // Get working hours for today (simplified)
  const today = new Date().getDay()
  const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]
  const todayDayName = dayNames[today]
  const todayAvailability = salon.weeklyAvailability?.find((availability) => availability.day === todayDayName)
  const isOpenToday = isSalonOpenToday(salon.weeklyAvailability)

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[{ label: "Ana Sayfa", href: "/" }, { label: "Kuaförler", href: "/salons" }, { label: salon.name }]}
        />

        {/* Back Button */}
        <div className="mb-6">
          <Link href="/salons">
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Kuaförlere Dön
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Salon Header */}
            <Card className="overflow-hidden">
              <div className="h-64 bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="text-6xl font-bold mb-4">{salon.name.charAt(0).toUpperCase()}</div>
                  <h1 className="text-3xl font-bold">{salon.name}</h1>
                </div>
              </div>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-5 w-5 text-gray-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Adres</p>
                        <p className="text-gray-600">{salon.location.address}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Telefon</p>
                        <p className="text-gray-600">{salon.phone}</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">E-posta</p>
                        <p className="text-gray-600">{salon.email}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-gray-400 flex-shrink-0" />
                      <div>
                        <p className="font-medium text-gray-900">Bugün</p>
                        <p className={`${isOpenToday ? "text-green-600" : "text-red-600"}`}>
                          {todayAvailability && todayAvailability.slots.length > 0
                            ? `${todayAvailability.slots[0].start} - ${todayAvailability.slots[0].end}`
                            : "Kapalı"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Services */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Scissors className="h-5 w-5 text-blue-600" />
                  <h2 className="text-2xl font-bold">Hizmetler</h2>
                </div>
                <p className="text-gray-600">{services.length} hizmet mevcut</p>
              </CardHeader>
              <CardContent>
                {servicesQuery.isError && (
                  <p className="text-red-500 text-center py-4">Hizmetler yüklenirken bir hata oluştu.</p>
                )}

                {services.length === 0 && !servicesQuery.isError && (
                  <div className="text-center py-8">
                    <Scissors className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Henüz hizmet eklenmemiş.</p>
                  </div>
                )}

                {services.length > 0 && (
                  <div className="grid gap-4">
                    {services.map((service) => (
                      <div
                        key={service.id}
                        className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{service.name}</h3>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              {service.durationMinutes} dk
                            </span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{service.price}₺</p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-green-600" />
                  <h2 className="text-2xl font-bold">Çalışma Saatleri</h2>
                </div>
              </CardHeader>
              <CardContent>
                {salon.weeklyAvailability && salon.weeklyAvailability.length > 0 ? (
                  <div className="space-y-3">
                    {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map(
                      (day, index) => {
                        const availability = salon.weeklyAvailability.find((a) => a.day === day)
                        const isToday = new Date().getDay() === index
                        const dayLabels = ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi"]

                        return (
                          <div
                            key={day}
                            className={`flex justify-between items-center p-3 rounded-lg ${
                              isToday ? "bg-blue-50 border border-blue-200" : "bg-gray-50"
                            }`}
                          >
                            <span className={`font-medium ${isToday ? "text-blue-900" : "text-gray-900"}`}>
                              {dayLabels[index]}
                              {isToday && <span className="ml-2 text-xs text-blue-600">(Bugün)</span>}
                            </span>
                            <span className={`${isToday ? "text-blue-700" : "text-gray-600"}`}>
                              {availability && availability.slots.length > 0
                                ? `${availability.slots[0].start} - ${availability.slots[0].end}`
                                : "Kapalı"}
                            </span>
                          </div>
                        )
                      },
                    )}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">Çalışma saatleri belirtilmemiş.</p>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardContent className="p-6">
                <Link href={`/book?salonId=${id}`}>
                  <Button size="lg" className="w-full mb-4">
                    <Calendar className="mr-2 h-5 w-5" />
                    Randevu Al
                  </Button>
                </Link>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Anında onay</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Ücretsiz iptal</span>
                  </div>
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span>Hesap gerektirmez</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Salon Bilgileri</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Scissors className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Hizmet Sayısı</span>
                  </div>
                  <span className="font-semibold">{services.length}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-gray-600">Değerlendirme</span>
                  </div>
                  <span className="font-semibold">4.8</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Müşteri Sayısı</span>
                  </div>
                  <span className="font-semibold">500+</span>
                </div>
              </CardContent>
            </Card>

            {/* Contact Card */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">İletişim</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <a
                  href={`tel:${salon.phone}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Phone className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Ara</span>
                </a>

                <a
                  href={`mailto:${salon.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <Mail className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">E-posta Gönder</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(salon.location.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-blue-600" />
                  <span className="text-sm">Haritada Göster</span>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
