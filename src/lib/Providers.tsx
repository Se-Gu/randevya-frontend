'use client'
import { QueryClientProvider, HydrationBoundary } from '@tanstack/react-query'
import { ReactNode, useState } from 'react'
import { createQueryClient } from './queryClient'

export default function Providers({ children }: { children: ReactNode }) {
  const [client] = useState(() => createQueryClient())
  return (
    <QueryClientProvider client={client}>
      <HydrationBoundary>
        {children}
      </HydrationBoundary>
    </QueryClientProvider>
  )
}
