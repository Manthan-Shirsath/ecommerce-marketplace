import { supabase } from "@/lib/supabase"
import { Order, OrderItem } from "../models/types"

export async function createOrder(userId: string, totalAmount: number): Promise<Order | null> {
  const { data, error } = await supabase
    .from('orders')
    .insert([{ user_id: userId, total_amount: totalAmount, status: 'PAID' }])
    .select('*')
    .single()

  if (error) {
    console.error('Error creating order:', error)
    return null
  }

  return data as Order
}

export async function insertOrderItems(items: Omit<OrderItem, 'id'>[]): Promise<boolean> {
  const { error } = await supabase
    .from('order_items')
    .insert(items)

  return !error
}
