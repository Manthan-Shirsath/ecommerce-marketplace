import { getCartController, addToCartController, clearCartController } from "@/backend/controllers/cartController"

export async function GET(request: Request) {
  return getCartController(request)
}

export async function POST(request: Request) {
  return addToCartController(request)
}

export async function DELETE(request: Request) {
  return clearCartController(request)
}
