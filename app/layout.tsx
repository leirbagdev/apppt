import type { Metadata, Viewport } from 'next'
import { I18nProvider } from '@/lib/i18n'
import './globals.css'
import React from 'react'

export const metadata: Metadata = {
  title: 'apppt',
  description: 'Aplicativo de gerenciamento para personal trainers',
  generator: 'v0.dev',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body>
        <I18nProvider defaultLanguage="pt">
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
