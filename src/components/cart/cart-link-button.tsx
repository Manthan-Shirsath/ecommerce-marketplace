"use client"

import Link from "next/link"

import { useCart } from "@/components/cart/cart-provider"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CartLinkButton() {
  const { totalItems } = useCart()

  return (
    <Link
      href="/cart"
      className={cn(
        buttonVariants({ variant: "default" }),
        "h-10 bg-primary px-4 text-primary-foreground hover:bg-primary/90"
      )}
    >
      View cart
      {totalItems > 0 ? ` (${totalItems})` : ""}
    </Link>
  )
}
