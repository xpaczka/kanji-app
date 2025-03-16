import { useStore } from 'zustand'
import { createStore } from 'zustand/vanilla'
import { z } from 'zod'
import { createContext, useContext } from 'react'

export const appSessionStoreTypeSchema = z.enum(['flashcards'])

export const appSessionStoreSchema = z.object({
  sessionId: z.string().nullable(),
  sessionType: appSessionStoreTypeSchema.nullable(),
  sessionParentUrl: z.string().nullable(),
})

export const appSessionActionsSchema = z.object({
  setSession: z.function().args(appSessionStoreSchema).returns(z.void()),
  resetSession: z.function().returns(z.void()),
})

export type AppSessionType = z.infer<typeof appSessionStoreTypeSchema>
export type AppSessionState = z.infer<typeof appSessionStoreSchema>
export type AppSessionActions = z.infer<typeof appSessionActionsSchema>

export type AppSessionStore = AppSessionState & AppSessionActions

const initialAppSessionState: AppSessionState = {
  sessionId: null,
  sessionType: null,
  sessionParentUrl: null,
}

export const createAppSessionStore = (
  initialState: AppSessionState = initialAppSessionState
) =>
  createStore<AppSessionStore>()((set) => ({
    ...initialState,
    setSession: ({ sessionId, sessionType, sessionParentUrl }) =>
      set(() => ({ sessionId, sessionType, sessionParentUrl })),
    resetSession: () => set(() => initialState),
  }))

export type AppSessionStoreApi = ReturnType<typeof createAppSessionStore>

export const AppSessionStoreContext = createContext<
  AppSessionStoreApi | undefined
>(undefined)

export const useAppSessionStore = <T>(
  selector: (store: AppSessionStore) => T
) => {
  const appSessionStoreContext = useContext(AppSessionStoreContext)

  if (!appSessionStoreContext) {
    throw new Error(
      `useAppSessionStore must be used within AppSessionStoreProvider`
    )
  }

  return useStore(appSessionStoreContext, selector)
}
