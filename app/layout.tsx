// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Loan Management System',
  description: 'A system to create, view, and manage loans',
  keywords: ['loans', 'finance', 'management'],
  authors: [{ name: 'Germaine' }],
  openGraph: {
    title: 'Loan Management System',
    description: 'A system to create, view, and manage loans for lenders',
    type: 'website'
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="min-h-screen p-4 md:p-8">
          {children}
        </main>
      </body>
    </html>
  )
}