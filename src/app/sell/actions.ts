"use server"

import { redirect } from "next/navigation"

import { MarketplaceProduct } from "@/lib/constants"
import { insertProduct, supabase } from "@/lib/supabase"

export async function addProduct(formData: FormData) {
  const name = formData.get("name") as string
  const description = formData.get("description") as string
  const category = formData.get("category") as string
  const price = parseFloat(formData.get("price") as string)
  const city = formData.get("city") as string
  const stock = parseInt(formData.get("stock") as string, 10)
  const imageFile = formData.get("image") as File
  const seller = formData.get("seller") as string

  // Input validation
  if (!name || !description || !category || isNaN(price) || !city || isNaN(stock) || !seller) {
    throw new Error("Missing required fields")
  }

  // Generate unique slug
  const baseSlug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)+/g, "")
  const shortId = Math.random().toString(36).substring(2, 8)
  const slug = `${baseSlug}-${shortId}`

  let image_url: string | undefined

  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${slug}-${Date.now()}.${fileExt}`
    
    const { error: uploadError } = await supabase.storage
      .from('product-images')
      .upload(fileName, imageFile)

    if (uploadError) {
      console.error("Image upload failed:", uploadError)
    } else {
      const { data } = supabase.storage
        .from('product-images')
        .getPublicUrl(fileName)
      
      image_url = data.publicUrl
    }
  }

  // Create product object mapping to MarketplaceProduct
  const product: MarketplaceProduct = {
    id: crypto.randomUUID(),
    slug,
    name,
    description,
    category,
    price,
    city,
    stock,
    seller,
    rating: 0, // Default rating for new products
    image_url: image_url || undefined,
  }

  // Insert to standard table
  const newProduct = await insertProduct(product)

  if (!newProduct) {
    throw new Error("Failed to insert product into database")
  }

  // Redirect to newly inserted product
  redirect(`/product/${slug}`)
}
