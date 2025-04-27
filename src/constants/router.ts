export const ROUTES = {
  index: "/",
  mainDashboard: "/dashboard",
  learnDashboard: "/learn",
  gamesDashboard: "/games",
  flashcards: "/learn/flashcards",
  memoGame: "/games/memo",
  apiTrpc: "/api/trpc",
  knowledgeTest: "/knowledge-test"
}

export const NAVIGATION_ITEMS = [
  { href: ROUTES.mainDashboard, title: "Dashboard" },
  { href: ROUTES.learnDashboard, title: "Learn" },
  { href: ROUTES.gamesDashboard, title: "Games" }
]
