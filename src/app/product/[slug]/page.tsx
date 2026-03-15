import { MapPin, Package, ShoppingBag, Star, Store } from "lucide-react"

import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProductBySlug } from "@/lib/data"
import { formatCurrency } from "@/lib/format"

type ProductPageProps = {
  params: {
    slug: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
          <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
            <CardHeader>
              <CardTitle className="text-3xl">Product not found</CardTitle>
              <CardDescription className="text-base">
                We couldn&apos;t find the product you&apos;re looking for.
              </CardDescription>
            </CardHeader>
          </Card>
        </main>
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
            <CardContent className="pt-4">
              <div className="flex min-h-[24rem] items-end rounded-[1.5rem] bg-gradient-to-br from-amber-300 via-orange-200 to-rose-300 p-6 text-foreground">
                <div className="space-y-3">
                  <Badge variant="secondary">{product.category}</Badge>
                  <p className="max-w-xs text-3xl font-semibold tracking-tight">
                    {product.name}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
            <CardHeader className="space-y-4 border-b border-border/70 pb-5">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="outline" className="border-border/80 bg-background">
                  {product.category}
                </Badge>
                <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                  <Star className="size-4 fill-amber-400 text-amber-400" />
                  <span>{product.rating}</span>
                </div>
              </div>
              <div className="space-y-3">
                <CardTitle className="text-4xl">{product.name}</CardTitle>
                <CardDescription className="text-base leading-7">
                  {product.description}
                </CardDescription>
              </div>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">Price</p>
                <p className="text-4xl font-semibold tracking-tight">
                  {formatCurrency(product.price)}
                </p>
              </div>

              <Separator />

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Store className="size-4" />
                    Seller
                  </div>
                  <p className="mt-2 text-base text-muted-foreground">
                    {product.seller}
                  </p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <MapPin className="size-4" />
                    City
                  </div>
                  <p className="mt-2 text-base text-muted-foreground">
                    {product.city}
                  </p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <ShoppingBag className="size-4" />
                    Category
                  </div>
                  <p className="mt-2 text-base text-muted-foreground">
                    {product.category}
                  </p>
                </div>

                <div className="rounded-2xl border border-border/70 bg-muted/40 p-4">
                  <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                    <Package className="size-4" />
                    Stock
                  </div>
                  <p className="mt-2 text-base text-muted-foreground">
                    {product.stock} available
                  </p>
                </div>
              </div>

              <AddToCartButton
                productId={product.id}
                className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
              />
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
