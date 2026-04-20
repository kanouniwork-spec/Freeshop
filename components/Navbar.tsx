'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ShoppingBag, Menu, X, Search } from 'lucide-react'
import { useCart } from '@/context/CartContext'

const navLinks = [
  { label: 'Home',       href: '/'         },
  { label: 'Shop',       href: '/shop'     },
  { label: 'New In',     href: '/shop?filter=new' },
  { label: 'About',      href: '/about'    },
]

export default function Navbar() {
  const pathname              = usePathname()
  const { totalItems }        = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* Detect scroll to add blur / border */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  /* Close mobile menu on route change */
  useEffect(() => { setMobileOpen(false) }, [pathname])

  const isHomePage = pathname === '/'

  return (
    <>
      <header
        className={`
          fixed top-0 left-0 right-0 z-50 transition-all duration-500
          ${scrolled
            ? 'bg-obsidian-900/95 backdrop-blur-md border-b border-obsidian-700'
            : isHomePage
              ? 'bg-transparent'
              : 'bg-obsidian-900 border-b border-obsidian-800'}
        `}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">

            {/* ── Left: Desktop Nav ─────────────────── */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.slice(0, 2).map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'text-gold-400' : ''}`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* ── Center: Logo ──────────────────────── */}
            <Link href="/" className="absolute left-1/2 -translate-x-1/2">
              <span className="font-serif text-xl md:text-2xl tracking-wider text-gold-400 whitespace-nowrap select-none">
                DJ FreeShop
              </span>
            </Link>

            {/* ── Right: Actions ────────────────────── */}
            <div className="flex items-center gap-4 ml-auto">
              {/* Desktop right nav */}
              <nav className="hidden md:flex items-center gap-8">
                {navLinks.slice(2).map(link => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`nav-link ${pathname === link.href ? 'text-gold-400' : ''}`}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Cart icon */}
              <Link
                href="/cart"
                aria-label={`Cart — ${totalItems} items`}
                className="relative p-1 text-obsidian-300 hover:text-gold-400 transition-colors"
              >
                <ShoppingBag size={20} strokeWidth={1.5} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] flex items-center justify-center
                                   bg-gold-500 text-obsidian-900 text-[10px] font-bold rounded-full px-1">
                    {totalItems > 99 ? '99+' : totalItems}
                  </span>
                )}
              </Link>

              {/* Mobile burger */}
              <button
                className="md:hidden p-1 text-obsidian-300 hover:text-gold-400 transition-colors"
                onClick={() => setMobileOpen(o => !o)}
                aria-label="Toggle menu"
              >
                {mobileOpen ? <X size={22} strokeWidth={1.5} /> : <Menu size={22} strokeWidth={1.5} />}
              </button>
            </div>

          </div>
        </div>

        {/* ── Gold bottom accent line ─────────────── */}
        <div className={`h-px bg-gradient-to-r from-transparent via-gold-500/40 to-transparent transition-opacity duration-500 ${scrolled ? 'opacity-100' : 'opacity-0'}`} />
      </header>

      {/* ── Mobile Drawer ──────────────────────────── */}
      <div
        className={`
          fixed inset-0 z-40 md:hidden transition-all duration-400
          ${mobileOpen ? 'pointer-events-auto' : 'pointer-events-none'}
        `}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-obsidian-900/80 backdrop-blur-sm transition-opacity duration-400 ${mobileOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setMobileOpen(false)}
        />

        {/* Drawer */}
        <nav
          className={`
            absolute top-0 right-0 h-full w-72
            bg-obsidian-800 border-l border-obsidian-700
            flex flex-col pt-24 pb-10 px-8
            transition-transform duration-400
            ${mobileOpen ? 'translate-x-0' : 'translate-x-full'}
          `}
        >
          <div className="gold-divider mb-8" />
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`
                font-serif text-xl py-3 border-b border-obsidian-700
                transition-colors duration-200
                ${pathname === link.href ? 'text-gold-400' : 'text-obsidian-200 hover:text-gold-400'}
              `}
            >
              {link.label}
            </Link>
          ))}
          <div className="mt-auto">
            <div className="gold-divider mb-6" />
            <Link href="/cart" className="btn-gold w-full text-center">
              View Cart ({totalItems})
            </Link>
          </div>
        </nav>
      </div>

      {/* Spacer so content sits below fixed header */}
      <div className="h-16 md:h-20" />
    </>
  )
}
