import { createClient } from '@supabase/supabase-js'
import { MarketplaceProduct, MarketplaceReview } from './constants'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseUrl.startsWith('http')) {
  throw new Error('Missing or invalid NEXT_PUBLIC_SUPABASE_URL in .env.local')
}
if (!supabaseAnonKey || supabaseAnonKey === '<my_publishable_key>') {
  throw new Error('Missing NEXT_PUBLIC_SUPABASE_ANON_KEY in .env.local')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function getFeaturedProducts(): Promise<MarketplaceProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .limit(12)

  if (error) {
    console.error('Error fetching featured products:', error)
    return []
  }

  return data as MarketplaceProduct[]
}

export async function getProductBySlug(slug: string): Promise<MarketplaceProduct | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error(`Error fetching product with slug ${slug}:`, error)
    return null
  }

  return data as MarketplaceProduct
}

export async function getProductById(id: string): Promise<MarketplaceProduct | null> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error(`Error fetching product with id ${id}:`, error)
    return null
  }

  return data as MarketplaceProduct
}

export async function getProductsByCategory(categoryName: string): Promise<MarketplaceProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('category', categoryName)

  if (error) {
    console.error(`Error fetching products for category ${categoryName}:`, error)
    return []
  }

  return data as MarketplaceProduct[]
}

export async function getProductsBySeller(sellerName: string): Promise<MarketplaceProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .ilike('seller', sellerName)

  if (error) {
    console.error(`Error fetching products for seller ${sellerName}:`, error)
    return []
  }

  return data as MarketplaceProduct[]
}
export async function searchProducts(query: string): Promise<MarketplaceProduct[]> {
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .or(`name.ilike.%${query}%,description.ilike.%${query}%,category.ilike.%${query}%`)

  if (error) {
    console.error(`Error searching products with query "${query}":`, error)
    return []
  }

  return data as MarketplaceProduct[]
}

export interface ProductFilters {
  category?: string
  minPrice?: number
  maxPrice?: number
  query?: string
  seller?: string
}

export type ProductSort = 'newest' | 'price_asc' | 'price_desc' | 'rating' | ''

export async function getProducts(filters?: ProductFilters, sort?: ProductSort): Promise<MarketplaceProduct[]> {
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
    // Fallback to sorting by id to approximate newest if created_at isn't standard
    queryBuilder = queryBuilder.order('id', { ascending: false })
  }

  const { data, error } = await queryBuilder

  if (error) {
    console.error('Error fetching products:', error)
    return []
  }

  return data as MarketplaceProduct[]
}

export async function getReviewsByProductId(productId: string): Promise<MarketplaceReview[]> {
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .eq('product_id', productId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error(`Error fetching reviews for product ${productId}:`, error)
    return []
  }

  return data as MarketplaceReview[]
}

export async function getReviewsForProducts(productIds: string[]): Promise<MarketplaceReview[]> {
  if (productIds.length === 0) return []
  
  const { data, error } = await supabase
    .from('reviews')
    .select('*')
    .in('product_id', productIds)

  if (error) {
    console.error(`Error fetching reviews for products:`, error)
    return []
  }

  return data as MarketplaceReview[]
}

export async function insertProduct(product: MarketplaceProduct): Promise<MarketplaceProduct | null> {
  const { data, error } = await supabase
    .from('products')
    .insert([product])
    .select('*')
    .single()

  if (error) {
    console.error('Error inserting product:', error)
    return null
  }

  return data as MarketplaceProduct
}
