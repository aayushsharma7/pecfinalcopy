import type React from "react"
import type { Metadata } from "next"
import { Cinzel, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "The Thousand & One Trivia",
  description: "A magical journey through the tales of the Arabian Nights.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${cinzel.variable} ${inter.variable} antialiased bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  )
}
