import type { Metadata } from 'next'
import './globals.css'
import { Toaster } from 'react-hot-toast'
import { CartProvider } from '@/context/CartContext'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: {
    template: '%s | DJ FreeShop',
    default:  'DJ FreeShop — Luxury Collection',
  },
  description: 'Discover our exclusive luxury collection. Crafted for those who appreciate elegance.',
  keywords:    ['luxury', 'fashion', 'dj freeshop', 'exclusive'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-obsidian-900 text-obsidian-100 font-sans antialiased min-h-screen flex flex-col">
        <CartProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a1a',
                color:      '#e8e8e8',
                border:     '1px solid #d4af37',
                fontFamily: 'Inter, sans-serif',
                fontSize:   '13px',
              },
            }}
          />
          <Navbar />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  )
}
