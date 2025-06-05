'use client'
import { useQuery } from '@tanstack/react-query'
import Link from 'next/link'
import { getSalons } from '@/lib/api'

export default function SalonList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['salons'],
    queryFn: getSalons,
  })

  if (isLoading) return <p className="p-4">Loading...</p>
  if (error) return <p className="p-4 text-red-600">Error loading salons</p>

  return (
    <div className="p-4 grid gap-4">
      {data?.map((salon) => (
        <Link
          key={salon.id}
          href={`/salons/${salon.id}`}
          className="p-4 rounded border bg-gray-50 hover:bg-gray-100"
        >
          <h2 className="font-semibold">{salon.name}</h2>
          <p className="text-sm text-gray-600">{salon.location?.address}</p>
        </Link>
      ))}
    </div>
  )
}
