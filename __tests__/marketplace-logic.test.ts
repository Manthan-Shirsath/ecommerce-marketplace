import { describe, it, expect } from 'vitest'
import type { MarketplaceProduct } from '@/lib/constants'
import type { MarketplaceReview } from '@/lib/constants'

// Utility helpers that mirror what the pages do in-memory on the server
// These tests validate the pure logic independent of the Supabase network call

function computeAverageRating(reviews: MarketplaceReview[]): number | null {
  if (!reviews.length) return null
  return reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
}

function filterProductsByReviewAvg(
  products: MarketplaceProduct[],
  allReviews: MarketplaceReview[],
  minRating: number
): MarketplaceProduct[] {
  return products.filter((product) => {
    const productReviews = allReviews.filter((r) => r.product_id === product.id)
    const avg = computeAverageRating(productReviews) ?? product.rating
    return avg >= minRating
  })
}

function sortProductsInMemory(
  products: MarketplaceProduct[],
  sort: 'price_asc' | 'price_desc' | 'rating'
): MarketplaceProduct[] {
  const copy = [...products]
  if (sort === 'price_asc') return copy.sort((a, b) => a.price - b.price)
  if (sort === 'price_desc') return copy.sort((a, b) => b.price - a.price)
  if (sort === 'rating') return copy.sort((a, b) => b.rating - a.rating)
  return copy
}

function getProductsBySeller(
  products: MarketplaceProduct[],
  sellerName: string
): MarketplaceProduct[] {
  return products.filter(
    (p) => p.seller.toLowerCase() === sellerName.toLowerCase()
  )
}

// ---- fixtures ----
const mockProducts: MarketplaceProduct[] = [
  { id: '1', slug: 'a', name: 'Product A', price: 15, seller: 'Earth & Co', city: 'Austin', category: 'Home Goods', description: '', stock: 5, rating: 4.5 },
  { id: '2', slug: 'b', name: 'Product B', price: 45, seller: 'Urban Artisan', city: 'NY', category: 'Apparel', description: '', stock: 3, rating: 3.2 },
  { id: '3', slug: 'c', name: 'Product C', price: 25, seller: 'Earth & Co', city: 'Austin', category: 'Crafts', description: '', stock: 8, rating: 4.8 },
]

const mockReviews: MarketplaceReview[] = [
  { id: 'r1', product_id: '1', user_name: 'Alice', rating: 5, comment: 'Great!', created_at: '2024-01-01' },
  { id: 'r2', product_id: '1', user_name: 'Bob', rating: 4, comment: 'Nice.', created_at: '2024-01-02' },
  { id: 'r3', product_id: '2', user_name: 'Carol', rating: 2, comment: 'Meh.', created_at: '2024-01-03' },
]

describe('Filtering Logic', () => {
  it('filters products by minimum rating using live reviews', () => {
    const results = filterProductsByReviewAvg(mockProducts, mockReviews, 4.0)
    // Product 1 has avg 4.5 ✓, Product 2 has avg 2 ✗, Product 3 has no reviews so falls back to rating 4.8 ✓
    expect(results.map(p => p.id)).toContain('1')
    expect(results.map(p => p.id)).toContain('3')
    expect(results.map(p => p.id)).not.toContain('2')
  })

  it('returns all products if minRating is 0', () => {
    const results = filterProductsByReviewAvg(mockProducts, mockReviews, 0)
    expect(results).toHaveLength(3)
  })
})

describe('Sorting Logic', () => {
  it('sorts products by price ascending', () => {
    const sorted = sortProductsInMemory(mockProducts, 'price_asc')
    expect(sorted[0].price).toBe(15)
    expect(sorted[1].price).toBe(25)
    expect(sorted[2].price).toBe(45)
  })

  it('sorts products by price descending', () => {
    const sorted = sortProductsInMemory(mockProducts, 'price_desc')
    expect(sorted[0].price).toBe(45)
    expect(sorted[2].price).toBe(15)
  })

  it('sorts products by rating descending', () => {
    const sorted = sortProductsInMemory(mockProducts, 'rating')
    expect(sorted[0].rating).toBeGreaterThanOrEqual(sorted[1].rating)
    expect(sorted[1].rating).toBeGreaterThanOrEqual(sorted[2].rating)
  })
})

describe('Review Aggregation', () => {
  it('computes the correct average rating', () => {
    const reviews = mockReviews.filter((r) => r.product_id === '1')
    const avg = computeAverageRating(reviews)
    expect(avg).toBe(4.5)
  })

  it('returns null for a product with no reviews', () => {
    const avg = computeAverageRating([])
    expect(avg).toBeNull()
  })
})

describe('Seller Page Data Fetching', () => {
  it('returns only products from the given seller', () => {
    const earthCo = getProductsBySeller(mockProducts, 'earth & co')
    expect(earthCo).toHaveLength(2)
    expect(earthCo.every(p => p.seller === 'Earth & Co')).toBe(true)
  })

  it('is case-insensitive', () => {
    const results = getProductsBySeller(mockProducts, 'URBAN ARTISAN')
    expect(results).toHaveLength(1)
    expect(results[0].id).toBe('2')
  })

  it('computes seller stats correctly', () => {
    const sellerProducts = getProductsBySeller(mockProducts, 'earth & co')
    const sellerReviews = mockReviews.filter(r => sellerProducts.some(p => p.id === r.product_id))
    const avg = computeAverageRating(sellerReviews)
    expect(sellerProducts.length).toBe(2)
    expect(avg).toBe(4.5) // only product 1 has reviews among Earth & Co products
  })
})
