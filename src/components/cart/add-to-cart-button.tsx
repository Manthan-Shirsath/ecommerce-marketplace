"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider"

type AddToCartButtonProps = {
  productId: string
  className?: string
}

export function AddToCartButton({
  productId,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart()

  return (
    <Button
      type="button"
      className={className}
      onClick={() => addItem(productId)}
    >
      Add to Cart
    </Button>
  )
}
