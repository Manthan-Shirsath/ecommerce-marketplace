import { getReviewsByProductId, getReviewsForProducts } from "../repositories/reviewRepository"
import { Review } from "../models/types"

export async function fetchReviewsByProduct(productId: string) {
  return await getReviewsByProductId(productId)
}

export async function fetchReviewsForProducts(productIds: string[]) {
  return await getReviewsForProducts(productIds)
}

export function aggregateAverageRating(reviews: Review[], fallbackRating: number = 0): number {
  if (reviews.length === 0) return fallbackRating
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  return parseFloat((sum / reviews.length).toFixed(1))
}
