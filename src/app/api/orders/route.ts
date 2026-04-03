import { createOrderController } from "@/backend/controllers/orderController"

export async function POST(request: Request) {
  return createOrderController(request)
}
