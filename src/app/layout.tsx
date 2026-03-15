import type { Metadata } from "next"
import localFont from "next/font/local"

import { CartProvider } from "@/components/cart/cart-provider"
import "./globals.css"

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
})

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
})

export const metadata: Metadata = {
  title: "Ecommerce",
  description: "An ecommerce platform for local sellers.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} theme antialiased`}
      >
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
