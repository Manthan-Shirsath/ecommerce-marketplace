export interface Product {
  id: string
  slug: string
  name: string
  price: number
  seller: string
  city: string
  category: string
  description: string
  stock: number
  rating: number
  image_url?: string
}

export interface Review {
  id: string
  product_id: string
  user_name: string
  rating: number
  comment?: string
  created_at: string
}

export interface User {
  id: string
  email: string
  name?: string
  password?: string // only used internally
}

export interface CartItem {
  id: string
  user_id: string
  product_id: string
  quantity: number
  created_at?: string
  // Navigation
  product?: Product
}

export interface Order {
  id: string
  user_id: string
  status: 'PENDING' | 'PAID' | 'FAILED'
  total_amount: number
  created_at: string
}

export interface OrderItem {
  id: string
  order_id: string
  product_id: string
  quantity: number
  price_at_time: number
}

// Payload DTOs
export interface LoginPayload {
  email: string
  password?: string
}

export interface OrderPayload {
  userId: string
}

export interface AddToCartPayload {
  userId: string
  productId: string
  quantity: number
}
