export const ROUTES = {
  index: "/",
  signIn: "/sign-in",
  signUp: "/sign-up",
  mainDashboard: "/dashboard",
  learnDashboard: "/learn",
  gamesDashboard: "/games",
  flashcards: "/learn/flashcards",
  memoGame: "/games/memo",
  apiTrpc: "/api/trpc"
}

export const NAVIGATION_ITEMS = [
  { href: ROUTES.mainDashboard, title: "Dashboard" },
  { href: ROUTES.learnDashboard, title: "Learn" },
  { href: ROUTES.gamesDashboard, title: "Games" }
]
