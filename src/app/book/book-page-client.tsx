"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import { useQuery } from "@tanstack/react-query"
import { salonsApi, servicesApi, staffApi, appointmentsApi } from "@/lib/api"
import type { Salon, Service, Staff } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { LoadingPage } from "@/components/ui/loading"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  MapPin,
  Scissors,
  CheckCircle,
  ArrowLeft,
  CalendarDays,
  Users,
} from "lucide-react"
import Link from "next/link"

export function BookPageClient() {
  const searchParams = useSearchParams()
  const salonId = searchParams.get("salonId")

  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [selectedStaff, setSelectedStaff] = useState<Staff | null>(null)
  const [selectedDate, setSelectedDate] = useState("")
  const [selectedTime, setSelectedTime] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    email: "",
    notes: "",
  })
  const [availableSlots, setAvailableSlots] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Fetch salon data
  const salonQuery = useQuery<Salon>({
    queryKey: ["salon", salonId],
    queryFn: () => salonsApi.getById(salonId!),
    enabled: !!salonId,
  })

  // Fetch services
  const servicesQuery = useQuery<Service[]>({
    queryKey: ["services", salonId],
    queryFn: () => servicesApi.getBySalon(salonId!),
    enabled: !!salonId,
  })

  // Fetch staff
  const staffQuery = useQuery<Staff[]>({
    queryKey: ["staff", salonId],
    queryFn: () => staffApi.getBySalon(salonId!),
    enabled: !!salonId,
  })

  // Fetch available slots when staff and date are selected
  useEffect(() => {
    if (selectedStaff && selectedDate) {
      appointmentsApi
        .getAvailableSlots(salonId!, selectedStaff.id, selectedDate)
        .then(setAvailableSlots)
        .catch(() => setAvailableSlots([]))
    }
  }, [selectedStaff, selectedDate, salonId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!selectedService || !selectedStaff || !selectedDate || !selectedTime) return

    setIsSubmitting(true)
    try {
      await appointmentsApi.create({
        salonId,
        serviceId: selectedService.id,
        staffId: selectedStaff.id,
        date: selectedDate,
        time: selectedTime,
        customerName: customerInfo.name,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        notes: customerInfo.notes,
      })

      // Success - redirect or show success message
      alert("Randevunuz başarıyla oluşturuldu!")
    } catch (error) {
      alert("Randevu oluşturulurken bir hata oluştu.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!salonId) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">Salon seçilmedi.</p>
          <Link href="/salons">
            <Button>Kuaför Seç</Button>
          </Link>
        </div>
      </div>
    )
  }

  if (salonQuery.isLoading || servicesQuery.isLoading || staffQuery.isLoading) {
    return <LoadingPage />
  }

  if (salonQuery.isError || !salonQuery.data) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">Salon bulunamadı.</p>
          <Link href="/salons">
            <Button>Kuaförlere Dön</Button>
          </Link>
        </div>
      </div>
    )
  }

  const salon = salonQuery.data
  const services = servicesQuery.data || []
  const staff = staffQuery.data || []

  // Generate next 30 days for date selection
  const getAvailableDates = () => {
    const dates = []
    const today = new Date()
    for (let i = 0; i < 30; i++) {
      const date = new Date(today)
      date.setDate(today.getDate() + i)
      dates.push(date.toISOString().split("T")[0])
    }
    return dates
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("tr-TR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs
          items={[
            { label: "Ana Sayfa", href: "/" },
            { label: "Kuaförler", href: "/salons" },
            { label: salon.name, href: `/salons/${salon.id}` },
            { label: "Randevu Al" },
          ]}
        />

        {/* Back Button */}
        <div className="mb-6">
          <Link href={`/salons/${salon.id}`}>
            <Button variant="outline" size="sm" className="flex items-center gap-2 bg-transparent">
              <ArrowLeft className="h-4 w-4" />
              Salona Dön
            </Button>
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Booking Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Calendar className="h-6 w-6 text-blue-600" />
                  <h1 className="text-2xl font-bold">Randevu Al</h1>
                </div>
                <p className="text-gray-600">{salon.name} için randevu oluşturun</p>
              </CardHeader>
              <CardContent className="space-y-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                  {/* Service Selection */}
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Scissors className="h-5 w-5 text-blue-600" />
                      <h3 className="text-lg font-semibold">Hizmet Seçin</h3>
                    </div>
                    <div className="grid gap-3">
                      {services.map((service) => (
                        <div
                          key={service.id}
                          className={`p-4 border rounded-lg cursor-pointer transition-all ${
                            selectedService?.id === service.id
                              ? "border-blue-500 bg-blue-50"
                              : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => setSelectedService(service)}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h4 className="font-medium">{service.name}</h4>
                              <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Clock className="h-4 w-4" />
                                  {service.durationMinutes} dk
                                </span>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-xl font-bold text-blue-600">{service.price}₺</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Staff Selection */}
                  {selectedService && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Personel Seçin</h3>
                      </div>
                      <div className="grid gap-3">
                        {staff.map((member) => (
                          <div
                            key={member.id}
                            className={`p-4 border rounded-lg cursor-pointer transition-all ${
                              selectedStaff?.id === member.id
                                ? "border-blue-500 bg-blue-50"
                                : "border-gray-200 hover:border-gray-300"
                            }`}
                            onClick={() => setSelectedStaff(member)}
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                                <User className="h-6 w-6 text-gray-500" />
                              </div>
                              <div>
                                <h4 className="font-medium">{member.name}</h4>
                                <p className="text-sm text-gray-500">{member.specialties?.join(", ")}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Date Selection */}
                  {selectedStaff && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <CalendarDays className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Tarih Seçin</h3>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {getAvailableDates()
                          .slice(0, 12)
                          .map((date) => (
                            <button
                              key={date}
                              type="button"
                              className={`p-3 border rounded-lg text-sm transition-all ${
                                selectedDate === date
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedDate(date)}
                            >
                              {formatDate(date)}
                            </button>
                          ))}
                      </div>
                    </div>
                  )}

                  {/* Time Selection */}
                  {selectedDate && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <Clock className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">Saat Seçin</h3>
                      </div>
                      <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                        {availableSlots.length > 0 ? (
                          availableSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              className={`p-3 border rounded-lg text-sm transition-all ${
                                selectedTime === time
                                  ? "border-blue-500 bg-blue-50 text-blue-700"
                                  : "border-gray-200 hover:border-gray-300"
                              }`}
                              onClick={() => setSelectedTime(time)}
                            >
                              {time}
                            </button>
                          ))
                        ) : (
                          <p className="text-gray-500 col-span-full text-center py-4">
                            Bu tarih için uygun saat bulunmuyor
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Customer Information */}
                  {selectedTime && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2">
                        <User className="h-5 w-5 text-blue-600" />
                        <h3 className="text-lg font-semibold">İletişim Bilgileri</h3>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Ad Soyad *</Label>
                          <Input
                            id="name"
                            type="text"
                            value={customerInfo.name}
                            onChange={(e) => setCustomerInfo((prev) => ({ ...prev, name: e.target.value }))}
                            required
                            placeholder="Adınız ve soyadınız"
                          />
                        </div>
                        <div>
                          <Label htmlFor="phone">Telefon *</Label>
                          <Input
                            id="phone"
                            type="tel"
                            value={customerInfo.phone}
                            onChange={(e) => setCustomerInfo((prev) => ({ ...prev, phone: e.target.value }))}
                            required
                            placeholder="0555 123 45 67"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="email">E-posta</Label>
                          <Input
                            id="email"
                            type="email"
                            value={customerInfo.email}
                            onChange={(e) => setCustomerInfo((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="ornek@email.com"
                          />
                        </div>
                        <div className="md:col-span-2">
                          <Label htmlFor="notes">Notlar</Label>
                          <textarea
                            id="notes"
                            className="w-full p-3 border border-gray-300 rounded-lg resize-none"
                            rows={3}
                            value={customerInfo.notes}
                            onChange={(e) => setCustomerInfo((prev) => ({ ...prev, notes: e.target.value }))}
                            placeholder="Özel istekleriniz varsa belirtebilirsiniz..."
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Submit Button */}
                  {selectedTime && customerInfo.name && customerInfo.phone && (
                    <div className="pt-6 border-t">
                      <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Randevu Oluşturuluyor..." : "Randevuyu Onayla"}
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Salon Info */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Salon Bilgileri</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                    <div className="text-2xl font-bold text-blue-600">{salon.name.charAt(0).toUpperCase()}</div>
                  </div>
                  <h4 className="font-semibold text-lg">{salon.name}</h4>
                </div>

                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{salon.location.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">{salon.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <span className="text-gray-600">{salon.email}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Booking Summary */}
            {selectedService && (
              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Randevu Özeti</h3>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Hizmet:</span>
                      <span className="font-medium">{selectedService.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Süre:</span>
                      <span className="font-medium">{selectedService.durationMinutes} dk</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Ücret:</span>
                      <span className="font-medium text-blue-600">{selectedService.price}₺</span>
                    </div>
                    {selectedStaff && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Personel:</span>
                        <span className="font-medium">{selectedStaff.name}</span>
                      </div>
                    )}
                    {selectedDate && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Tarih:</span>
                        <span className="font-medium">{formatDate(selectedDate)}</span>
                      </div>
                    )}
                    {selectedTime && (
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Saat:</span>
                        <span className="font-medium">{selectedTime}</span>
                      </div>
                    )}
                  </div>

                  {selectedService && selectedStaff && selectedDate && selectedTime && (
                    <div className="pt-4 border-t">
                      <div className="flex justify-between text-lg font-bold">
                        <span>Toplam:</span>
                        <span className="text-blue-600">{selectedService.price}₺</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Avantajlar</h3>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Anında onay</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Ücretsiz iptal</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>SMS hatırlatma</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span>Güvenli ödeme</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
