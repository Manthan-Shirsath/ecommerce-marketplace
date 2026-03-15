"use client"

import Link from "next/link"

import { useCart } from "@/components/cart/cart-provider"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { formatCurrency } from "@/lib/format"

export function CartPageContent() {
  const { cartProducts, totalPrice, removeItem } = useCart()

  if (cartProducts.length === 0) {
    return (
      <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
        <CardHeader>
          <CardTitle className="text-3xl">Your cart is empty</CardTitle>
          <CardDescription className="text-base">
            Add a few local products to your cart to see them here.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link href="/" className="inline-flex">
            <Button>Continue shopping</Button>
          </Link>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
        <CardHeader className="space-y-2">
          <CardTitle className="text-3xl">Shopping Cart</CardTitle>
          <CardDescription className="text-base">
            Review the products you&apos;ve added before checkout.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {cartProducts.map((item, index) => (
            <div key={item.productId}>
              {index > 0 ? <Separator className="mb-6" /> : null}
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="space-y-2">
                  <h2 className="text-xl font-semibold text-foreground">
                    {item.product.name}
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Sold by {item.product.seller} in {item.product.city}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Quantity: {item.quantity}
                  </p>
                </div>

                <div className="space-y-3 sm:text-right">
                  <div>
                    <p className="text-sm text-muted-foreground">Price</p>
                    <p className="font-medium text-foreground">
                      {formatCurrency(item.product.price)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Subtotal</p>
                    <p className="text-lg font-semibold text-foreground">
                      {formatCurrency(item.product.price * item.quantity)}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    className="border-border/80 bg-transparent"
                    onClick={() => removeItem(item.productId)}
                  >
                    Remove item
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
        <CardHeader>
          <CardTitle className="text-2xl">Order Summary</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Items</span>
            <span>{cartProducts.length}</span>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <span className="text-base font-medium text-foreground">Total</span>
            <span className="text-2xl font-semibold text-foreground">
              {formatCurrency(totalPrice)}
            </span>
          </div>
          <Link href="/checkout" className="block">
            <Button className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Checkout
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}
