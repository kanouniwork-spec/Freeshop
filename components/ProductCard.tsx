'use client'

import Link from 'next/link'
import Image from 'next/image'
import { ShoppingBag, Heart } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { useCart } from '@/context/CartContext'
import { formatPrice } from '@/lib/utils'
import type { Product } from '@/lib/types'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem }          = useCart()
  const [wishlist, setWishlist] = useState(false)
  const [adding,   setAdding]   = useState(false)

  const thumbnail = product.images?.[0] ?? null
  const hasStock  = (product.stock ?? 0) > 0

  async function handleAddToCart(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (!hasStock || adding) return

    setAdding(true)
    addItem({
      id:       product.id,
      name:     product.name,
      price:    product.price,
      image:    thumbnail ?? '',
      slug:     product.slug,
    })
    toast.success(`${product.name} added to cart`)
    await new Promise(r => setTimeout(r, 600))
    setAdding(false)
  }

  return (
    <Link href={`/products/${product.slug}`} className="group block">
      <div className="product-card">

        {/* ── Image ────────────────────────────── */}
        <div className="aspect-[3/4] relative overflow-hidden bg-obsidian-800">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 25vw, 20vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-serif text-obsidian-600 text-4xl italic">DJ</span>
            </div>
          )}

          {/* Hover overlay */}
          <div className="absolute inset-0 bg-obsidian-900/40 opacity-0 group-hover:opacity-100
                           transition-opacity duration-300" />

          {/* Quick-add button */}
          <div className="absolute bottom-4 left-4 right-4 translate-y-4 opacity-0
                           group-hover:translate-y-0 group-hover:opacity-100
                           transition-all duration-300">
            <button
              onClick={handleAddToCart}
              disabled={!hasStock || adding}
              className="w-full flex items-center justify-center gap-2
                          bg-gold-500 text-obsidian-900 font-sans font-semibold
                          text-[11px] tracking-widest uppercase py-3
                          hover:bg-gold-400 disabled:opacity-50 disabled:cursor-not-allowed
                          transition-colors duration-200"
            >
              <ShoppingBag size={13} strokeWidth={2} />
              {!hasStock ? 'Out of Stock' : adding ? 'Adding…' : 'Add to Cart'}
            </button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {product.is_new && (
              <span className="badge-gold text-[9px]">New</span>
            )}
            {!hasStock && (
              <span className="inline-block text-[9px] font-sans font-semibold tracking-widest uppercase
                                bg-obsidian-600 text-obsidian-200 px-3 py-1">
                Sold Out
              </span>
            )}
          </div>

          {/* Wishlist */}
          <button
            onClick={e => { e.preventDefault(); setWishlist(w => !w) }}
            className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center
                        bg-obsidian-900/70 backdrop-blur-sm
                        opacity-0 group-hover:opacity-100
                        transition-all duration-300 hover:bg-obsidian-800"
            aria-label="Add to wishlist"
          >
            <Heart
              size={14}
              strokeWidth={1.5}
              className={wishlist ? 'fill-gold-400 text-gold-400' : 'text-obsidian-200'}
            />
          </button>
        </div>

        {/* ── Info ─────────────────────────────── */}
        <div className="p-4">
          <p className="font-sans text-[10px] tracking-widest uppercase text-obsidian-500 mb-1">
            {product.category ?? 'DJ FreeShop'}
          </p>
          <h3 className="font-serif text-sm text-obsidian-200 leading-snug mb-2
                          group-hover:text-gold-400 transition-colors duration-200">
            {product.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-sans text-sm font-medium text-gold-400">
              {formatPrice(product.price)}
            </span>
            {product.compare_price && product.compare_price > product.price && (
              <span className="font-sans text-xs text-obsidian-500 line-through">
                {formatPrice(product.compare_price)}
              </span>
            )}
          </div>
        </div>

      </div>
    </Link>
  )
}
