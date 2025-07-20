import { z } from "zod"

export type UserPreferences = z.infer<typeof userPreferencesSchema>

export const userPreferencesSchema = z
  .object({ showRomaji: z.boolean() })
  .nullable()
