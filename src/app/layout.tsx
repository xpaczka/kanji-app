import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import TrpcProvider from "../providers/TrpcProvider"
import StoreProvider from "#/providers/StoreProvider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
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
          <body
            className={`${geistSans.variable} ${geistMono.variable} min-h-screen antialiased`}
          >
            <div className="root">{children}</div>
          </body>
        </html>
      </StoreProvider>
    </TrpcProvider>
  )
}
