import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

export const metadata: Metadata = {
  title: "Ditto - Your Beauty & Wellness Partner",
  description: "Discover and book top salons, spas, and wellness services near you. Get exclusive offers and seamless bill payments.",
  generator: "Ditto App",
  metadataBase: new URL('https://ditto-app.com'),
  keywords: ['salon', 'spa', 'beauty', 'wellness', 'haircut', 'facial', 'massage', 'manicure', 'pedicure', 'booking'],
  authors: [{ name: 'Ditto Team' }],
  creator: 'Ditto',
  publisher: 'Ditto',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://ditto-app.com',
    title: 'Ditto - Your Beauty & Wellness Partner',
    description: 'Discover and book top salons, spas, and wellness services near you.',
    siteName: 'Ditto',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ditto - Your Beauty & Wellness Partner',
    description: 'Discover and book top salons, spas, and wellness services near you.',
    creator: '@dittoapp',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
    apple: [
      { url: "/icon.svg", type: "image/svg+xml" },
    ],
  },
  manifest: '/manifest.json',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <Suspense fallback={<div>Loading...</div>}>
          {children}
          <Analytics />
        </Suspense>
      </body>
    </html>
  )
}
