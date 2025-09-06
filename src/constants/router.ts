export const ROUTES = {
  // Learn
  index: "/",
  learn: "/learn",
  review: "/review",
  write: "/write",
  // Kanji
  kanji: "/kanji",
  // Play
  play: "/play",
  playMemo: "/play/memo",
  playFlashcards: "/play/flashcards",
  // Settings
  settings: "/settings",
  subscription: "/subscription",
  // API
  apiTrpc: "/api/trpc",
  // TODO: Remove as deprecated
  gamesDashboard: "/games",
  flashcards: "/learn/flashcards",
  memoGame: "/games/memo"
}

export const NAVIGATION_ITEMS = [
  { href: ROUTES.index, title: "Study" },
  { href: ROUTES.kanji, title: "Kanji" },
  { href: ROUTES.play, title: "Play" }
]
