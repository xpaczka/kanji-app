import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import TrpcProvider from './_trpc/TrpcProvider'
import AppSessionStoreProvider from '#/provider/AppSessionStoreProvider'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Kanji App',
  description: 'Learning kanji made fun',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <TrpcProvider>
        <html lang='en'>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen`}
          >
            <AppSessionStoreProvider>{children}</AppSessionStoreProvider>
          </body>
        </html>
      </TrpcProvider>
    </ClerkProvider>
  )
}
