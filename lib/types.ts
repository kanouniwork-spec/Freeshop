/* ─── Database Models ───────────────────────────────────────────────────────── */

export interface Product {
  id:              string
  name:            string
  slug:            string
  description:     string | null
  price:           number
  compare_price:   number | null
  images:          string[]        // array of public URLs
  category:        string | null
  stock:           number
  is_active:       boolean
  is_new:          boolean
  created_at:      string
  updated_at:      string
}

export interface OrderItem {
  product_id:  string
  name:        string
  price:       number
  quantity:    number
  image:       string
}

export interface Order {
  id:              string
  customer_name:   string
  customer_phone:  string
  customer_email:  string | null
  address:         string
  city:            string
  items:           OrderItem[]
  subtotal:        number
  total:           number
  status:          OrderStatus
  notes:           string | null
  created_at:      string
  updated_at:      string
}

export type OrderStatus = 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'

/* ─── Cart (client-side only) ──────────────────────────────────────────────── */

export interface CartItem {
  id:        string   // product id
  name:      string
  price:     number
  image:     string
  slug:      string
  quantity:  number
}
