import type { Metadata } from 'next';
import { inter } from '@/config/fonts';



import './globals.css';
import { HeroUIProvider } from '@heroui/react';



export const metadata: Metadata = {
  title: 'Bisneando Honduras',
  description: 'Una tienda virtual de productos',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
            <HeroUIProvider>

      <body className={inter.className}>{children}</body>
      </HeroUIProvider>
    </html>
  )
}
