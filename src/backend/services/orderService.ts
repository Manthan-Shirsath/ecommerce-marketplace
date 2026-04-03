import { getProductById, decrementProductStock } from "../repositories/productRepository"
import { createOrder, insertOrderItems } from "../repositories/orderRepository"
import { simulatePayment } from "./paymentService"

export async function processOrder(userId: string, cartItems: { productId: string, quantity: number }[]) {
  if (!cartItems || cartItems.length === 0) {
    throw new Error("Cart is empty")
  }

  let totalAmount = 0
  const orderItemsToInsert = []

  // Business Rule 1: Validate Product & Stock exists
  for (const item of cartItems) {
    const product = await getProductById(item.productId)
    if (!product || product.stock < item.quantity) {
      throw new Error(`Insufficient stock for product: ${product?.name || item.productId}`);
    }
    totalAmount += product.price * item.quantity
    orderItemsToInsert.push({
      product_id: product.id,
      quantity: item.quantity,
      price_at_time: product.price
    })
  }

  // Business Rule 2: Attempt Payment
  const paymentSuccess = await simulatePayment(totalAmount)
  if (!paymentSuccess) {
    throw new Error("Payment declined by simulated bank.")
  }

  // Business Rule 3: Fulfill Order & Save to DB
  for (const item of cartItems) {
    await decrementProductStock(item.productId, item.quantity)
  }

  const order = await createOrder(userId, totalAmount)
  if (!order) {
     throw new Error("Failed to create order record.")
  }

  await insertOrderItems(orderItemsToInsert.map(oi => ({ ...oi, order_id: order.id })))

  return { status: "success", amountPaid: totalAmount, orderId: order.id }
}
