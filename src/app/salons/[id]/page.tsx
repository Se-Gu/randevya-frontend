'use client'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'next/navigation'
import { getSalon } from '@/lib/api'

export default function SalonDetails() {
  const params = useParams<{ id: string }>()
  const { data, isLoading, error } = useQuery({
    queryKey: ['salon', params.id],
    queryFn: () => getSalon(params.id),
    enabled: !!params.id,
  })

  if (isLoading) return <p className="p-4">Loading...</p>
  if (error || !data) return <p className="p-4 text-red-600">Failed to load</p>

  return (
    <div className="p-4 grid gap-2">
      <h1 className="text-xl font-bold mb-2">{data.name}</h1>
      <p>{data.location?.address}</p>
      <p>{data.phone}</p>
      <p>{data.email}</p>
    </div>
  )
}
