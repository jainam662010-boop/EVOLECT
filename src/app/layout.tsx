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
  description:
    "Connecting event organizers with reliable volunteers. Find the right volunteer, manage teams, and create better events.",
  keywords: ["volunteers", "events", "organizers", "community", "platform"],
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen bg-white text-slate-900 antialiased will-change-transform">
        {children}
      </body>
    </html>
  )
}
