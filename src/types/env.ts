import { SupabaseClient } from "@supabase/supabase-js"
import { Database } from "./supabase"

export type SupabaseDbClient = SupabaseClient<Database>
