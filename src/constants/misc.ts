import { httpBatchLink } from "@trpc/client"

export const APP_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:3000"
    : process.env.NEXT_PUBLIC_DOMAIN_URL

export const TRPC_API_URL = `${APP_URL}/api/trpc`

export const TRPC_LINKS = {
  links: [httpBatchLink({ url: TRPC_API_URL })]
}
