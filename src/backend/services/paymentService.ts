export async function simulatePayment(amount: number): Promise<boolean> {
  // Simulate network delay to a payment processor (Stripe, Razorpay, etc.)
  await new Promise(resolve => setTimeout(resolve, 800))
  
  // Fake payment service (random success 80% of the time)
  const isSuccess = Math.random() < 0.8
  
  if (!isSuccess) {
    console.error(`[PaymentService] Declined simulated charge of $${amount}`)
    return false
  }
  
  console.log(`[PaymentService] Processing simulated charge of $${amount}`)
  return true
}
