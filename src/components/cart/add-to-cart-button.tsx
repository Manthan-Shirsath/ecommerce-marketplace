"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/components/cart/cart-provider"
import { MarketplaceProduct } from "@/lib/constants"

type AddToCartButtonProps = {
  product: MarketplaceProduct
  className?: string
}

export function AddToCartButton({
  product,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart()

  return (
    <Button
      type="button"
      className={className}
      onClick={() => addItem(product)}
    >
      Add to Cart
    </Button>
  )
}
