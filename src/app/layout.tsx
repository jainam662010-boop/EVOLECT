import type { Metadata, Viewport } from "next"
import { Inter, Unbounded } from "next/font/google"
import "./globals.css"

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
})

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin"],
  display: "swap",
  weight: ["600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: "Evolect — Where events meet volunteers",
  description: "Connecting event organizers with reliable volunteers.",
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#090d16",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${unbounded.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  )
}
