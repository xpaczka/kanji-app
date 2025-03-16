'use client'

import { useAppSessionStore } from '#/store/app-session'
import { useEffect } from 'react'
import { useNavigation } from './router'

export const useAppSession = (redirectTo: string) => {
  const { sessionId } = useAppSessionStore((state) => state)
  const { navigate } = useNavigation()

  useEffect(() => {
    if (sessionId) return

    navigate(redirectTo)
  }, [sessionId, navigate, redirectTo])
}
