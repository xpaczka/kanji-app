import type { Metadata } from "next"
import { Ubuntu } from "next/font/google"
import "./globals.css"
import TrpcProvider from "../providers/TrpcProvider"
import StoreProvider from "#/providers/StoreProvider"

const fontFamily = Ubuntu({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "700"]
})

export const metadata: Metadata = {
  title: "Kanji App",
  description: "Learning kanji made fun"
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <TrpcProvider>
      <StoreProvider>
        <html lang="en">
          <body className={`${fontFamily.className} min-h-screen antialiased`}>
            <div className="root px-10 pt-24">{children}</div>
          </body>
        </html>
      </StoreProvider>
    </TrpcProvider>
  )
}
