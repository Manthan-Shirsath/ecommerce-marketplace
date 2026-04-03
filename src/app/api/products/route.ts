import { getProductsController } from "@/backend/controllers/productController"

export async function GET(request: Request) {
  return getProductsController(request)
}
