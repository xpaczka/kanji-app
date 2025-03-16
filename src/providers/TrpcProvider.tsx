'use client'

import { ReactNode, useState } from 'react'
import { trpc } from '../app/_trpc/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TRPC_LINKS } from '#/constants/misc'

export default function TrpcProvider({
  children,
}: Readonly<{ children: ReactNode }>) {
  const [queryClient] = useState(() => new QueryClient({}))
  const [trpcClient] = useState(() => trpc.createClient(TRPC_LINKS))

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </trpc.Provider>
  )
}
