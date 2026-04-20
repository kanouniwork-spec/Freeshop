import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Shield, Truck } from 'lucide-react'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import ProductCard from '@/components/ProductCard'
import type { Product } from '@/lib/types'

/* ─── Data Fetching ────────────────────────────────────────────────────────── */
async function getFeaturedProducts(): Promise<Product[]> {
  try {
    const supabase = createServerSupabaseClient()
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false })
      .limit(4)

    if (error) throw error
    return data ?? []
  } catch {
    // Return empty array gracefully — page still renders
    return []
  }
}

/* ─── Page ──────────────────────────────────────────────────────────────────── */
export default async function HomePage() {
  const products = await getFeaturedProducts()

  return (
    <div className="overflow-x-hidden">

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">

        {/* Background */}
        <div
          className="absolute inset-0 bg-obsidian-900"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 80% 60% at 50% 0%, rgba(212,175,55,0.12) 0%, transparent 60%),
              radial-gradient(ellipse 40% 40% at 0% 100%, rgba(212,175,55,0.06) 0%, transparent 50%)
            `,
          }}
        />

        {/* Geometric ornament top */}
        <div className="absolute top-0 left-0 right-0 flex justify-center pointer-events-none">
          <div className="w-px h-32 bg-gradient-to-b from-transparent to-gold-500/30" />
        </div>

        {/* Hero content */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
          {/* Pre-heading */}
          <div className="flex items-center justify-center gap-3 mb-6 animate-fade-up">
            <div className="h-px w-12 bg-gold-500/60" />
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold-500">
              New Collection
            </span>
            <div className="h-px w-12 bg-gold-500/60" />
          </div>

          {/* Main heading */}
          <h1 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                          text-obsidian-100 leading-none tracking-tight mb-6
                          animate-fade-up animate-delay-100">
            Where Luxury
            <br />
            <span
              className="italic"
              style={{ color: '#d4af37' }}
            >
              Meets Style
            </span>
          </h1>

          {/* Sub-heading */}
          <p className="font-sans text-base md:text-lg text-obsidian-400 max-w-xl mx-auto
                         leading-relaxed mb-10 animate-fade-up animate-delay-200">
            Explore our exclusive collection — pieces crafted for those who
            appreciate elegance without compromise.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4
                           animate-fade-up animate-delay-300">
            <Link href="/shop" className="btn-gold">
              Shop the Collection
              <ArrowRight size={16} strokeWidth={1.5} />
            </Link>
            <Link href="/shop?filter=new" className="btn-outline">
              New Arrivals
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-8 mt-14
                           animate-fade-up animate-delay-400">
            {[
              { icon: Truck,     label: 'Free Delivery'   },
              { icon: Shield,    label: 'Secure Orders'   },
              { icon: Sparkles,  label: 'Premium Quality' },
            ].map(({ icon: Icon, label }) => (
              <div key={label} className="flex items-center gap-2">
                <Icon size={14} strokeWidth={1.5} className="text-gold-500" />
                <span className="font-sans text-xs text-obsidian-400 tracking-wide hidden sm:block">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32
                         bg-gradient-to-t from-obsidian-900 to-transparent pointer-events-none" />
      </section>

      {/* ══════════════════════════════════════════
          MARQUEE STRIP
      ══════════════════════════════════════════ */}
      <section className="border-y border-gold-500/20 py-4 overflow-hidden bg-obsidian-800/30">
        <div className="flex animate-[marquee_30s_linear_infinite] gap-0 whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="inline-flex items-center gap-6 text-[11px] tracking-[0.25em] uppercase font-sans text-obsidian-400 px-8">
              <span className="text-gold-500">✦</span> New Arrivals
              <span className="text-gold-500">✦</span> Free Shipping
              <span className="text-gold-500">✦</span> Cash on Delivery
              <span className="text-gold-500">✦</span> Exclusive Pieces
              <span className="text-gold-500">✦</span> Limited Stock
              <span className="text-gold-500">✦</span> Premium Quality
            </span>
          ))}
        </div>
        <style jsx>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════
          FEATURED PRODUCTS
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="h-px w-8 bg-gold-500/60" />
            <span className="font-sans text-[11px] tracking-[0.3em] uppercase text-gold-500">
              Curated
            </span>
            <div className="h-px w-8 bg-gold-500/60" />
          </div>
          <h2 className="section-heading">Featured Pieces</h2>
        </div>

        {/* Products grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          /* Placeholder cards when no products yet */
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <PlaceholderProductCard key={i} index={i} />
            ))}
          </div>
        )}

        {/* View all CTA */}
        <div className="text-center mt-12">
          <Link href="/shop" className="btn-outline">
            View All Products
            <ArrowRight size={16} strokeWidth={1.5} />
          </Link>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SPLIT BANNER
      ══════════════════════════════════════════ */}
      <section className="grid md:grid-cols-2 min-h-[60vh]">

        {/* Left panel */}
        <div
          className="relative flex items-end p-10 md:p-16 min-h-[50vh] md:min-h-0"
          style={{
            background: `
              linear-gradient(160deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 100%),
              url('https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&q=80&fm=webp')
              center/cover no-repeat
            `,
          }}
        >
          <div>
            <span className="badge-gold mb-4 inline-block">New In</span>
            <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4">
              Women&apos;s<br />Collection
            </h3>
            <Link href="/shop?category=women" className="btn-gold text-sm py-3 px-6">
              Shop Now
            </Link>
          </div>
        </div>

        {/* Right panel */}
        <div
          className="relative flex items-end p-10 md:p-16 min-h-[50vh] md:min-h-0"
          style={{
            background: `
              linear-gradient(160deg, rgba(10,10,10,0.4) 0%, rgba(10,10,10,0.85) 100%),
              url('https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=900&q=80&fm=webp')
              center/cover no-repeat
            `,
          }}
        >
          <div>
            <span className="badge-gold mb-4 inline-block">Essentials</span>
            <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight mb-4">
              Men&apos;s<br />Collection
            </h3>
            <Link href="/shop?category=men" className="btn-gold text-sm py-3 px-6">
              Shop Now
            </Link>
          </div>
        </div>

      </section>

      {/* ══════════════════════════════════════════
          WHY US / VALUES
      ══════════════════════════════════════════ */}
      <section className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-14">
          <h2 className="section-heading">The DJ FreeShop Difference</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              number: '01',
              title:  'Curated Selection',
              body:   'Every product is hand-picked for quality, style and exclusivity. We carry only pieces that meet our standards.',
            },
            {
              number: '02',
              title:  'Cash on Delivery',
              body:   'No upfront risk. Pay when your order arrives at your door — simple, safe and hassle-free.',
            },
            {
              number: '03',
              title:  'Fast Delivery',
              body:   'Orders are processed and shipped within 24 hours. Most deliveries reach you within 2–4 business days.',
            },
          ].map(item => (
            <div
              key={item.number}
              className="relative p-8 border border-obsidian-800 hover:border-gold-500/30
                          transition-colors duration-500 group"
            >
              <span className="font-serif text-6xl text-obsidian-800 group-hover:text-obsidian-700
                                transition-colors duration-300 absolute top-6 right-8 select-none">
                {item.number}
              </span>
              <div className="h-px w-8 bg-gold-500 mb-6" />
              <h3 className="font-serif text-xl text-obsidian-100 mb-3">{item.title}</h3>
              <p className="font-sans text-sm text-obsidian-400 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════
          NEWSLETTER BANNER
      ══════════════════════════════════════════ */}
      <section className="bg-obsidian-800 border-y border-obsidian-700 py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <div className="h-px w-12 bg-gold-500/60 mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl text-obsidian-100 mb-3">
            Join the Inner Circle
          </h2>
          <p className="font-sans text-sm text-obsidian-400 mb-8">
            Be the first to discover new arrivals, exclusive offers and behind-the-scenes stories.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              required
              className="input-dark flex-1"
            />
            <button type="submit" className="btn-gold shrink-0">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  )
}

/* ── Placeholder card (shown when no products in DB yet) ───────────────────── */
function PlaceholderProductCard({ index }: { index: number }) {
  const labels = ['New Arrival', 'Best Seller', 'Limited', 'Exclusive']
  const names  = ['Signature Piece No.1', 'Luxury Essential', 'Premium Item', 'Exclusive Find']
  const prices = ['299.00', '450.00', '199.00', '599.00']

  return (
    <div className="product-card">
      <div className="aspect-[3/4] bg-obsidian-800 relative overflow-hidden">
        {/* Shimmer */}
        <div
          className="absolute inset-0 bg-gradient-to-r from-obsidian-800 via-obsidian-700 to-obsidian-800
                      animate-shimmer"
          style={{ backgroundSize: '200% 100%' }}
        />
        <div className="absolute bottom-4 left-4">
          <span className="badge-gold text-[9px]">{labels[index]}</span>
        </div>
      </div>
      <div className="p-4">
        <p className="font-sans text-[10px] tracking-widest uppercase text-obsidian-400 mb-1">
          DJ FreeShop
        </p>
        <h3 className="font-serif text-sm text-obsidian-200 leading-snug mb-2">
          {names[index]}
        </h3>
        <p className="font-sans text-sm text-gold-400 font-medium">
          {prices[index]} MAD
        </p>
      </div>
    </div>
  )
}
