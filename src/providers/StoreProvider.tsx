"use client"

import {
  AppSessionStoreApi,
  AppSessionStoreContext,
  createAppSessionStore
} from "#/store/app-session"
import { createUserStore, UserStoreApi, UserStoreContext } from "#/store/user"
import { ReactNode, useRef } from "react"

export default function StoreProvider({ children }: { children: ReactNode }) {
  const appSessionStoreRef = useRef<AppSessionStoreApi | null>(null)
  const userStoreRef = useRef<UserStoreApi | null>(null)

  if (appSessionStoreRef.current === null) {
    appSessionStoreRef.current = createAppSessionStore()
  }

  if (userStoreRef.current === null) {
    userStoreRef.current = createUserStore()
  }

  return (
    <UserStoreContext.Provider value={userStoreRef.current}>
      <AppSessionStoreContext.Provider value={appSessionStoreRef.current}>
        {children}
      </AppSessionStoreContext.Provider>
    </UserStoreContext.Provider>
  )
}
