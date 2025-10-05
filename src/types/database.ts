import { Database } from "./supabase"

// Types - Tables
export type DatabaseKanjiTableItem =
  Database["public"]["Tables"]["kanji"]["Row"]

export type DatabaseUserKanjiTableItem =
  Database["public"]["Tables"]["user_kanji"]["Row"]

// Types - Functions
export type DatabaseGetKanjiWithStage =
  Database["public"]["Functions"]["get_kanji_with_stage"]["Returns"]

export type DatabaseGetLearnItems =
  Database["public"]["Functions"]["get_learn_items"]["Returns"]

export type DatabaseGetReviewItems =
  Database["public"]["Functions"]["get_review_items"]["Returns"]

export type DatabaseGetUserKanji =
  Database["public"]["Functions"]["get_user_kanji"]["Returns"]
