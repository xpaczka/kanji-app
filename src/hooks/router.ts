'use client'

import { useRouter } from 'next/navigation'
import { useCallback } from 'react'

export const useNavigation = () => {
  const { push, forward } = useRouter()

  const navigate = useCallback(
    (pathname: string) => {
      push(pathname)
      forward()
    },
    [push, forward]
  )

  return { navigate }
}
