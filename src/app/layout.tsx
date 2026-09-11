import type { Metadata, Viewport } from "next"
import { Inter, Syne } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const syne = Syne({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["700", "800"],
})

export const metadata: Metadata = {
  title: "Evolect — Where events meet volunteers",
  description: "Connecting event organizers with reliable volunteers.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <body className="min-h-screen bg-[#0a0a0a] antialiased">{children}</body>
    </html>
  )
}
