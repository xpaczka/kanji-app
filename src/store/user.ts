import { useStore } from "zustand"
import { createStore } from "zustand/vanilla"
import { z } from "zod"
import { createContext, useContext } from "react"

// TODO: Use TRPC context for sharing user data across app
export type UserState = z.infer<typeof userStoreSchema>
export type UserActions = z.infer<typeof userActionsSchema>
export type UserStore = UserState & UserActions
export type UserStoreApi = ReturnType<typeof createUserStore>

export const userStoreSchema = z.object({
  userId: z.string().nullable()
})

export const userActionsSchema = z.object({
  setUserId: z
    .function()
    .args(userStoreSchema.pick({ userId: true }))
    .returns(z.void())
})

const initialUserState: UserState = {
  userId: null
}

export const createUserStore = (initialState: UserState = initialUserState) =>
  createStore<UserStore>()((set) => ({
    ...initialState,
    setUserId: ({ userId }) => set(() => ({ ...initialState, userId }))
  }))

export const UserStoreContext = createContext<UserStoreApi | undefined>(
  undefined
)

export const useUserStore = <T>(selector: (store: UserStore) => T) => {
  const userStoreContext = useContext(UserStoreContext)

  if (!userStoreContext) {
    throw new Error(`useUserStore must be used within StoreProvider`)
  }

  return useStore(userStoreContext, selector)
}
