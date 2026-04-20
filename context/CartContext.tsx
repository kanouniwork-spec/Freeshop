'use client'

import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from 'react'
import type { CartItem } from '@/lib/types'

/* ─── Types ──────────────────────────────────────────────────────────────────── */

interface AddPayload {
  id:       string
  name:     string
  price:    number
  image:    string
  slug:     string
  quantity?: number
}

type Action =
  | { type: 'ADD';      payload: AddPayload }
  | { type: 'REMOVE';   id: string }
  | { type: 'UPDATE';   id: string; quantity: number }
  | { type: 'CLEAR' }
  | { type: 'HYDRATE';  items: CartItem[] }

interface CartState {
  items: CartItem[]
}

interface CartContextValue {
  items:      CartItem[]
  totalItems: number
  subtotal:   number
  addItem:    (payload: AddPayload) => void
  removeItem: (id: string) => void
  updateItem: (id: string, quantity: number) => void
  clearCart:  () => void
}

/* ─── Reducer ────────────────────────────────────────────────────────────────── */

function cartReducer(state: CartState, action: Action): CartState {
  switch (action.type) {

    case 'HYDRATE':
      return { items: action.items }

    case 'ADD': {
      const { quantity = 1, ...rest } = action.payload
      const existing = state.items.find(i => i.id === rest.id)
      if (existing) {
        return {
          items: state.items.map(i =>
            i.id === rest.id ? { ...i, quantity: i.quantity + quantity } : i,
          ),
        }
      }
      return { items: [...state.items, { ...rest, quantity }] }
    }

    case 'REMOVE':
      return { items: state.items.filter(i => i.id !== action.id) }

    case 'UPDATE':
      if (action.quantity <= 0) {
        return { items: state.items.filter(i => i.id !== action.id) }
      }
      return {
        items: state.items.map(i =>
          i.id === action.id ? { ...i, quantity: action.quantity } : i,
        ),
      }

    case 'CLEAR':
      return { items: [] }

    default:
      return state
  }
}

/* ─── Context ────────────────────────────────────────────────────────────────── */

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'djfreeshop_cart'

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] })

  /* Hydrate from localStorage on mount */
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      if (raw) {
        const items: CartItem[] = JSON.parse(raw)
        if (Array.isArray(items)) dispatch({ type: 'HYDRATE', items })
      }
    } catch { /* ignore */ }
  }, [])

  /* Persist to localStorage on change */
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items))
    } catch { /* ignore */ }
  }, [state.items])

  const addItem    = useCallback((payload: AddPayload) => dispatch({ type: 'ADD',    payload }),  [])
  const removeItem = useCallback((id: string)           => dispatch({ type: 'REMOVE', id }),      [])
  const updateItem = useCallback((id: string, q: number)=> dispatch({ type: 'UPDATE', id, quantity: q }), [])
  const clearCart  = useCallback(()                      => dispatch({ type: 'CLEAR' }),          [])

  const totalItems = state.items.reduce((acc, i) => acc + i.quantity, 0)
  const subtotal   = state.items.reduce((acc, i) => acc + i.price * i.quantity, 0)

  return (
    <CartContext.Provider value={{ items: state.items, totalItems, subtotal, addItem, removeItem, updateItem, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used inside <CartProvider>')
  return ctx
}
