import { getProducts, getProductById, getFeaturedProducts, getProductsByCategory, getProductsBySeller, getProductBySlug, insertProduct, uploadProductImage } from "../repositories/productRepository"
import { Product } from "../models/types"

export async function fetchProducts(queryParams: any) {
  // Translate req properties into filters suitable for our repository
  const filters = {
    query: queryParams.q || undefined,
    category: queryParams.category || undefined,
    seller: queryParams.seller || undefined,
    minPrice: queryParams.minPrice ? Number(queryParams.minPrice) : undefined,
    maxPrice: queryParams.maxPrice ? Number(queryParams.maxPrice) : undefined
  }
  
  return await getProducts(filters, queryParams.sort)
}

export async function fetchProductDetails(id: string) {
  return await getProductById(id)
}

export async function fetchProductBySlug(slug: string) {
  return await getProductBySlug(slug)
}

export async function fetchFeaturedProducts() {
  return await getFeaturedProducts()
}

export async function fetchProductsByCategory(category: string) {
  return await getProductsByCategory(category)
}

export async function fetchProductsBySeller(seller: string) {
  return await getProductsBySeller(seller)
}

export async function createProduct(product: Product, imageFile?: File) {
  if (imageFile && imageFile.size > 0) {
    const fileExt = imageFile.name.split('.').pop()
    const fileName = `${product.slug}-${Date.now()}.${fileExt}`
    const imageUrl = await uploadProductImage(fileName, imageFile)
    if (imageUrl) product.image_url = imageUrl
  }

  return await insertProduct(product)
}
