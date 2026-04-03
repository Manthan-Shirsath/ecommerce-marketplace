import { supabase } from "@/lib/supabase"
import { Review } from "../models/types"

export async function getReviewsByProductId(productId: string): Promise<Review[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) return []
  return data as Review[]
}

export async function getReviewsForProducts(productIds: string[]): Promise<Review[]> {
  if (productIds.length === 0) return []
  
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .in('product_id', productIds)

  if (error) return []
  return data as Review[]
}
