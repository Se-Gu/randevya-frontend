const API_BASE = process.env.NEXT_PUBLIC_API_URL || ''

export async function api<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers || {}),
    },
  })
  if (!res.ok) {
    throw new Error('Request failed')
  }
  return res.json()
}

import type { Salon } from '@/types/salon'

export async function getSalons(): Promise<Salon[]> {
  return api<Salon[]>('/salons')
}

export async function getSalon(id: string): Promise<Salon> {
  return api<Salon>(`/salons/${id}`)
}
