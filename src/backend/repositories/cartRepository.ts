import { supabase } from "@/lib/supabase"
import { CartItem } from "../models/types"

export async function getCartByUserId(userId: string): Promise<CartItem[]> {
  const { data, error } = await supabase
    .from('carts')
    .select('*, product:products(*)')
    .eq('user_id', userId)

  if (error) {
    console.error('Error fetching cart:', error)
    return []
  }

  return data as CartItem[]
}

export async function addItemToCart(userId: string, productId: string, quantity: number): Promise<CartItem | null> {
  // Check if item already exists
  const existing = await supabase
    .from('carts')
    .select('*')
    .eq('user_id', userId)
    .eq('product_id', productId)
    .single()

  if (existing.data) {
    // Update quantity
    const { data, error } = await supabase
      .from('carts')
      .update({ quantity: existing.data.quantity + quantity })
      .eq('id', existing.data.id)
      .select('*, product:products(*)')
      .single()

    return error ? null : data
  }

  // Insert new item
  const { data, error } = await supabase
    .from('carts')
    .insert([{ user_id: userId, product_id: productId, quantity }])
    .select('*, product:products(*)')
    .single()

  return error ? null : data
}

export async function clearCart(userId: string): Promise<boolean> {
  const { error } = await supabase
    .from('carts')
    .delete()
    .eq('user_id', userId)

  return !error
}
