import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Inter } from "next/font/google"
import ClientThemeProvider from "@/app/theme/client-theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "v0 App",
  description: "Created with v0",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} h-full dark bg-background text-foreground antialiased`}>
        <ClientThemeProvider>{children}</ClientThemeProvider>
      </body>
    </html>
  )
}
