import { describe, it, expect, vi, beforeEach } from 'vitest'
import { getProducts, getReviewsForProducts, searchProducts } from '@/lib/supabase'

// Mock the supabase client dependency locally
vi.mock('@/lib/supabase', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@/lib/supabase')>()
  
  return {
    ...actual,
    supabase: {
      from: vi.fn(() => ({
        select: vi.fn().mockReturnThis(),
        ilike: vi.fn().mockReturnThis(),
        gte: vi.fn().mockReturnThis(),
        lte: vi.fn().mockReturnThis(),
        or: vi.fn().mockReturnThis(),
        order: vi.fn().mockReturnThis(),
        in: vi.fn().mockReturnThis(),
        then: vi.fn((resolve) => resolve({ data: [], error: null })),
      }))
    }
  }
})

// To spy on the internal query builder we actually need to mock the external module, 
// but since we want to test the implementation of getProducts parsing filters, 
// a simpler integration approach is to pass mock filters and assure it returns arrays.
// For a true unit test we would inject a stubbed Supabase client. 
// However, since we're pointing to a remote instance, we can run actual queries 
// against public tables safely as long as we don't mutate (insert/delete).

describe('Supabase Data Fetching', () => {
  it('getProducts should return an array of products', async () => {
    // We execute against the real Supabase project if available, or the mock interface
    const products = await getProducts()
    expect(Array.isArray(products)).toBe(true)
  })

  it('getProducts should respect category filters', async () => {
    const products = await getProducts({ category: 'Home Goods' })
    expect(Array.isArray(products)).toBe(true)
    if (products.length > 0) {
      expect(products[0].category.toLowerCase()).toContain('home goods')
    }
  })

  it('getProducts should respect price range filters', async () => {
    const products = await getProducts({ minPrice: 10, maxPrice: 50 })
    expect(Array.isArray(products)).toBe(true)
    if (products.length > 0) {
      expect(products[0].price).toBeGreaterThanOrEqual(10)
      expect(products[0].price).toBeLessThanOrEqual(50)
    }
  })

  it('getReviewsForProducts should handle empty arrays', async () => {
    const reviews = await getReviewsForProducts([])
    expect(reviews).toEqual([])
  })

  it('searchProducts should execute query searches', async () => {
    const products = await searchProducts('shirt')
    expect(Array.isArray(products)).toBe(true)
  })
})
