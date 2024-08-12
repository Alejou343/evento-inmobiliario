import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import ItemProvider from '@/context/itemContext'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Evento Inmobiliario del año',
  description: 'Pocki te ayuda a organizar el evento inmobiliario del año',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ItemProvider>
          {children}
        </ItemProvider>
      </body>
    </html>
  )
}
