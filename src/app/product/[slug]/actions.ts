"use server"

import { revalidatePath } from "next/cache"
import { supabase } from "@/lib/supabase"

export async function addReview(formData: FormData) {
  const product_id = formData.get("product_id") as string
  const slug = formData.get("slug") as string
  const user_name = formData.get("user_name") as string
  const rating = parseInt(formData.get("rating") as string, 10)
  const comment = formData.get("comment") as string

  if (!product_id || !user_name || isNaN(rating)) {
    throw new Error("Missing required fields")
  }

  if (rating < 1 || rating > 5) {
    throw new Error("Rating must be between 1 and 5")
  }

  const { error } = await supabase
    .from("reviews")
    .insert([{ product_id, user_name, rating, comment }])

  if (error) {
    console.error("Failed to add review:", error)
    throw new Error("Failed to add review")
  }

  revalidatePath(`/product/${slug}`)
}
