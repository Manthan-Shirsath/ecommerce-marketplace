import { supabase } from "@/lib/supabase"
import { Product, Review } from "../models/types"

export async function getProducts(filters?: any, sort?: string): Promise<Product[]> {
  let queryBuilder = supabase.from('products').select('*')

  if (filters?.category) {
    queryBuilder = queryBuilder.ilike('category', filters.category)
  }
  if (filters?.seller) {
    queryBuilder = queryBuilder.ilike('seller', filters.seller)
  }
  if (filters?.minPrice !== undefined) {
    queryBuilder = queryBuilder.gte('price', filters.minPrice)
  }
  if (filters?.maxPrice !== undefined) {
    queryBuilder = queryBuilder.lte('price', filters.maxPrice)
  }
  if (filters?.query) {
    queryBuilder = queryBuilder.or(`name.ilike.%${filters.query}%,description.ilike.%${filters.query}%,category.ilike.%${filters.query}%`)
  }

  if (sort === 'price_asc') {
    queryBuilder = queryBuilder.order('price', { ascending: true })
  } else if (sort === 'price_desc') {
    queryBuilder = queryBuilder.order('price', { ascending: false })
  } else if (sort === 'rating') {
    queryBuilder = queryBuilder.order('rating', { ascending: false })
  } else if (sort === 'newest') {
    queryBuilder = queryBuilder.order('id', { ascending: false })
  }

  const { data, error } = await queryBuilder

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as Product[]
}

export async function getProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()
  
  if (error) return null;
  return data as Product;
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) return null;
  return data as Product;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(12)

  if (error) return []
  return data as Product[]
}

export async function getProductsByCategory(categoryName: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', categoryName)

  if (error) return []
  return data as Product[]
}

export async function getProductsBySeller(sellerName: string): Promise<Product[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('seller', sellerName)

  if (error) return []
  return data as Product[]
}

export async function insertProduct(product: Product): Promise<Product | null> {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select('*')
    .single()

  if (error) {
    console.error('Error inserting product:', error)
    return null
  }
  return data as Product
}

export async function uploadProductImage(fileName: string, file: File): Promise<string | null> {
  const { error: uploadError } = await supabase.storage
    .from('product-images')
    .upload(fileName, file)

  if (uploadError) return null;

  const { data } = supabase.storage
    .from('product-images')
    .getPublicUrl(fileName)
  
  return data.publicUrl
}

export async function decrementProductStock(id: string, quantity: number): Promise<boolean> {
  // Normally this would be a Postgres RPC call safely decrementing. 
  // For this exercise, we'll fetch, calculate, and update (simulate locking/RPC).
  const product = await getProductById(id);
  if (!product || product.stock < quantity) {
    return false;
  }
  const { error } = await supabase
    .from('products')
    .update({ stock: product.stock - quantity })
    .eq('id', id)
  
  if (error) return false;
  return true;
}
