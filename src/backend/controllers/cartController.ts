import { getCartByUserId, addItemToCart, clearCart } from "../repositories/cartRepository"

export async function getCartController(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const userId = searchParams.get('userId')
    
    if (!userId) {
      return new Response(JSON.stringify({ error: "userId is required" }), { status: 400 })
    }

    const items = await getCartByUserId(userId)
    return new Response(JSON.stringify(items), { status: 200 })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function addToCartController(req: Request) {
  try {
    const body = await req.json()
    if (!body.userId || !body.productId || !body.quantity) {
      return new Response(JSON.stringify({ error: "Missing fields" }), { status: 400 })
    }

    const item = await addItemToCart(body.userId, body.productId, body.quantity)
    return new Response(JSON.stringify(item), { status: 200 })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}

export async function clearCartController(req: Request) {
  try {
    const body = await req.json()
    if (!body.userId) {
      return new Response(JSON.stringify({ error: "userId required" }), { status: 400 })
    }

    const result = await clearCart(body.userId)
    return new Response(JSON.stringify({ success: result }), { status: 200 })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
