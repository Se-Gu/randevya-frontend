"use client"

import Link from "next/link"
import { useState, useMemo } from "react"
import { useQuery } from "@tanstack/react-query"
import { salonsApi, type ListSalonsParams, type PaginatedResponse } from "@/lib/api"
import type { Salon } from "@/types"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { LoadingPage } from "@/components/ui/loading"
import { Breadcrumbs } from "@/components/ui/breadcrumbs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, MapPin, Phone, Mail, Clock, ChevronLeft, ChevronRight, SortAsc, SortDesc } from "lucide-react"

export default function SalonsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<"name" | "createdAt">("createdAt")
  const [sortOrder, setSortOrder] = useState<"ASC" | "DESC">("ASC")
  const [currentPage, setCurrentPage] = useState(1)
  const [limit] = useState(12)

  const queryParams: ListSalonsParams = useMemo(
    () => ({
      name: searchTerm || undefined,
      sortBy,
      sortOrder,
      page: currentPage,
      limit,
    }),
    [searchTerm, sortBy, sortOrder, currentPage, limit],
  )

  const { data, isLoading, isError } = useQuery<PaginatedResponse<Salon>>({
    queryKey: ["salons", queryParams],
    queryFn: () => salonsApi.getAll(queryParams),
  })

  const handleSearch = (value: string) => {
    setSearchTerm(value)
    setCurrentPage(1) // Reset to first page when searching
  }

  const handleSortChange = (field: "name" | "createdAt") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "ASC" ? "DESC" : "ASC")
    } else {
      setSortBy(field)
      setSortOrder("ASC")
    }
    setCurrentPage(1)
  }

  const totalPages = data ? Math.ceil(data.total / limit) : 0

  if (isLoading) {
    return <LoadingPage />
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <p className="text-red-500 mb-4">Kuaförler yüklenirken bir hata oluştu.</p>
          <Button onClick={() => window.location.reload()}>Tekrar Dene</Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs items={[{ label: "Ana Sayfa", href: "/" }, { label: "Kuaförler" }]} />

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Kuaförler</h1>
          <p className="text-gray-600">{data?.total || 0} kuaför bulundu</p>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Kuaför adı ile ara..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            {/* Sort Options */}
            <div className="flex gap-2">
              <Button
                variant={sortBy === "name" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSortChange("name")}
                className="flex items-center gap-2"
              >
                İsim
                {sortBy === "name" &&
                  (sortOrder === "ASC" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />)}
              </Button>
              <Button
                variant={sortBy === "createdAt" ? "default" : "outline"}
                size="sm"
                onClick={() => handleSortChange("createdAt")}
                className="flex items-center gap-2"
              >
                Tarih
                {sortBy === "createdAt" &&
                  (sortOrder === "ASC" ? <SortAsc className="h-4 w-4" /> : <SortDesc className="h-4 w-4" />)}
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        {!data?.data || data.data.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
              <Search className="h-12 w-12 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Kuaför bulunamadı</h3>
            <p className="text-gray-600 mb-4">Arama kriterlerinizi değiştirmeyi deneyin.</p>
            <Button
              onClick={() => {
                setSearchTerm("")
                setCurrentPage(1)
              }}
            >
              Filtreleri Temizle
            </Button>
          </div>
        ) : (
          <>
            {/* Salon Grid */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-8">
              {data.data.map((salon) => (
                <Link key={salon.id} href={`/salons/${salon.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer group">
                    <CardHeader className="pb-3">
                      <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center group-hover:from-blue-200 group-hover:to-purple-200 transition-colors">
                        <div className="text-4xl font-bold text-blue-600">{salon.name.charAt(0).toUpperCase()}</div>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                        {salon.name}
                      </h3>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2 text-sm text-gray-600">
                          <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
                          <span className="line-clamp-2">{salon.location.address}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Phone className="h-4 w-4 flex-shrink-0" />
                          <span>{salon.phone}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <Mail className="h-4 w-4 flex-shrink-0" />
                          <span className="truncate">{salon.email}</span>
                        </div>

                        {salon.weeklyAvailability && salon.weeklyAvailability.length > 0 && (
                          <div className="flex items-center gap-2 text-sm text-green-600">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span>Müsait</span>
                          </div>
                        )}
                      </div>

                      <div className="mt-4 pt-4 border-t">
                        <Button className="w-full" size="sm">
                          Detayları Gör
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                  Önceki
                </Button>

                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum
                    if (totalPages <= 5) {
                      pageNum = i + 1
                    } else if (currentPage <= 3) {
                      pageNum = i + 1
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i
                    } else {
                      pageNum = currentPage - 2 + i
                    }

                    return (
                      <Button
                        key={pageNum}
                        variant={currentPage === pageNum ? "default" : "outline"}
                        size="sm"
                        onClick={() => setCurrentPage(pageNum)}
                        className="w-10"
                      >
                        {pageNum}
                      </Button>
                    )
                  })}
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                >
                  Sonraki
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
