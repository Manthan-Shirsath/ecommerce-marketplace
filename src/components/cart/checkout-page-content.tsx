"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { useCart } from "@/components/cart/cart-provider"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/format"

export function CheckoutPageContent() {
  const router = useRouter()
  const { cartProducts, totalPrice, clearCart } = useCart()

  const [isProcessing, setIsProcessing] = useState(false)

  const handlePlaceOrder = async () => {
    setIsProcessing(true)
    try {
      // Fetch user from our new Auth system/localStorage
      const userStr = window.localStorage.getItem("authUser")
      const userId = userStr ? JSON.parse(userStr).id : "anonymous-user"

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          cartItems: cartProducts.map(cp => ({
            productId: cp.productId,
            quantity: cp.quantity
          }))
        })
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error || "Failed to process order")
      }

      clearCart()
      router.push("/order-success")
    } catch (error: any) {
      alert(`Checkout failed: ${error.message}`)
    } finally {
      setIsProcessing(false)
    }
  }

  if (cartProducts.length === 0) {
    return (
      <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
        <CardHeader>
          <CardTitle className="text-3xl">Your cart is empty</CardTitle>
          <CardDescription className="text-base">
            Add products to your cart before heading to checkout.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href="/"
            className={buttonVariants({ variant: "default" })}
          >
            Continue shopping
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
        <CardHeader>
          <CardTitle className="text-3xl">Checkout</CardTitle>
          <CardDescription className="text-base">
            Review your order before placing it.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {cartProducts.map((item, index) => (
            <div key={item.productId}>
              {index > 0 ? <Separator className="mb-6" /> : null}
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    {item.product.category} · {item.product.seller} · {item.product.city}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="sm:text-right">
                  <p className="text-sm text-muted-foreground">Subtotal</p>
                  <p className="text-lg font-semibold text-foreground">
                    {formatCurrency(item.product.price * item.quantity)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
        <CardHeader>
          <CardTitle className="text-2xl">Order Total</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Items</span>
            <span>{cartProducts.length}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-foreground">Total Price</span>
            <span className="text-2xl font-semibold text-foreground">
              {formatCurrency(totalPrice)}
            </span>
          </div>
          <Button
            className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
