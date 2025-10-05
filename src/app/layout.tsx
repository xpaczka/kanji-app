import { Metadata } from "next"
import { Ubuntu } from "next/font/google"
import "./globals.css"
import TrpcProvider from "../providers/TrpcProvider"
import { NavigationMenu } from "#/components/NavigationMenu"
import { Footer } from "#/components/Layout"
import createSupabaseClient from "#/database/client"

const fontFamily = Ubuntu({
  subsets: ["latin-ext"],
  weight: ["300", "400", "500", "700"]
})

export const metadata: Metadata = {
  title: "Kanji App",
  description: "Learning kanji made fun"
}

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  const supabase = await createSupabaseClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  return (
    <TrpcProvider>
      <html lang="en">
        <body className={`${fontFamily.className} antialiased`}>
          <div
            className={`root flex min-h-screen flex-col bg-gray-100 px-6 pt-20 lg:px-10 ${!!user ? "lg:pt-24" : ""}`}
          >
            <NavigationMenu />
            <div className="flex-1">{children}</div>
            <Footer />
          </div>
        </body>
      </html>
    </TrpcProvider>
  )
}
