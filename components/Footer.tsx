import Link from 'next/link'
import { Instagram, Twitter, Mail } from 'lucide-react'

const shopLinks = [
  { label: 'New Arrivals', href: '/shop?filter=new'      },
  { label: 'All Products', href: '/shop'                 },
  { label: 'Collections',  href: '/shop?filter=collection' },
]

const infoLinks = [
  { label: 'About Us',         href: '/about'   },
  { label: 'Shipping Policy',  href: '/shipping' },
  { label: 'Returns & Exchanges', href: '/returns' },
  { label: 'Contact',          href: '/contact'  },
]

export default function Footer() {
  return (
    <footer className="bg-obsidian-900 border-t border-obsidian-800 mt-auto">

      {/* ── Gold accent ──────────────────────────── */}
      <div className="gold-divider" />

      {/* ── Main footer grid ─────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand column */}
          <div className="md:col-span-1">
            <Link href="/" className="inline-block mb-5">
              <span className="font-serif text-2xl text-gold-400 tracking-wider">
                DJ FreeShop
              </span>
            </Link>
            <p className="font-sans text-sm text-obsidian-400 leading-relaxed max-w-xs">
              Curated luxury for the discerning eye. Every piece tells a story of craftsmanship.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4 mt-6">
              {[
                { Icon: Instagram, href: '#', label: 'Instagram' },
                { Icon: Twitter,   href: '#', label: 'Twitter'   },
                { Icon: Mail,      href: '#', label: 'Email'     },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-obsidian-700
                             text-obsidian-400 hover:border-gold-500 hover:text-gold-400
                             transition-all duration-200"
                >
                  <Icon size={16} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h3 className="font-serif text-sm tracking-widest uppercase text-gold-500 mb-5">Shop</h3>
            <ul className="space-y-3">
              {shopLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm text-obsidian-400 hover:text-gold-400 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="font-serif text-sm tracking-widest uppercase text-gold-500 mb-5">Info</h3>
            <ul className="space-y-3">
              {infoLinks.map(l => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-sans text-sm text-obsidian-400 hover:text-gold-400 transition-colors duration-200"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-serif text-sm tracking-widest uppercase text-gold-500 mb-5">Newsletter</h3>
            <p className="font-sans text-sm text-obsidian-400 leading-relaxed mb-4">
              Be the first to know about new arrivals and exclusive drops.
            </p>
            <form
              className="flex gap-2"
              onSubmit={e => { e.preventDefault() }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                required
                className="input-dark flex-1 text-xs"
              />
              <button
                type="submit"
                className="px-4 py-3 bg-gold-500 text-obsidian-900 font-semibold text-xs
                           hover:bg-gold-400 transition-colors duration-200 shrink-0"
              >
                Join
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* ── Bottom bar ───────────────────────────── */}
      <div className="border-t border-obsidian-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="font-sans text-xs text-obsidian-500">
            © {new Date().getFullYear()} DJ FreeShop. All rights reserved.
          </p>
          <p className="font-sans text-xs text-obsidian-600">
            Cash on Delivery · Secure Orders · Trusted Quality
          </p>
        </div>
      </div>

    </footer>
  )
}
