'use client'

import {
  AppSessionStoreApi,
  AppSessionStoreContext,
  createAppSessionStore,
} from '#/store/app-session'
import { ReactNode, useRef } from 'react'

export default function StoreProvider({ children }: { children: ReactNode }) {
  const appSessionStoreRef = useRef<AppSessionStoreApi | null>(null)

  if (appSessionStoreRef.current === null) {
    appSessionStoreRef.current = createAppSessionStore()
  }

  return (
    <AppSessionStoreContext.Provider value={appSessionStoreRef.current}>
      {children}
    </AppSessionStoreContext.Provider>
  )
}
