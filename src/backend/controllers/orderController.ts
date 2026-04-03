import { processOrder } from "../services/orderService"

export async function createOrderController(req: Request) {
  try {
    const body = await req.json()
    
    // Thin validation
    if (!body.userId || !body.cartItems || !Array.isArray(body.cartItems)) {
      return new Response(JSON.stringify({ error: "Missing userId or valid cartItems array" }), { status: 400 })
    }

    // Hand off to service layer
    const invoice = await processOrder(body.userId, body.cartItems)
    
    return new Response(JSON.stringify(invoice), { status: 200 })
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 })
  }
}
