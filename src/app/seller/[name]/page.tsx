import Link from "next/link"
import { Star, Store } from "lucide-react"

import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { formatCurrency } from "@/lib/format"
import { getProductsBySeller, getReviewsForProducts } from "@/lib/supabase"

type SellerPageProps = {
  params: {
    name: string
  }
}

export default async function SellerPage({ params }: SellerPageProps) {
  const sellerName = decodeURIComponent(params.name)
  const products = await getProductsBySeller(sellerName)
  const reviews = await getReviewsForProducts(products.map((p) => p.id))

  const totalReviews = reviews.length
  const averageSellerRating = totalReviews > 0
    ? (reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews).toFixed(1)
    : "New Seller"

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <div className="relative overflow-hidden bg-gradient-to-b from-slate-100/60 to-background py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Store className="size-8" />
              </div>
              <div>
                <h1 className="text-4xl font-bold tracking-tight text-foreground">
                  {sellerName}
                </h1>
                <div className="mt-3 flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Store className="size-4" />
                    <span>{products.length} {products.length === 1 ? 'Product' : 'Products'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="size-4 fill-amber-400 text-amber-400" />
                    <span>{averageSellerRating} {totalReviews > 0 && `(${totalReviews} reviews)`}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {products.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
              <h3 className="text-xl font-semibold">
                No products found
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                This seller hasn&apos;t listed any items yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
              {products.map((product, index) => {
                const productReviews = reviews.filter((r) => r.product_id === product.id)
                const reviewCount = productReviews.length
                const averageRating = reviewCount > 0 
                  ? (productReviews.reduce((sum, r) => sum + r.rating, 0) / reviewCount).toFixed(1)
                  : product.rating.toFixed(1)

                return (
                <div key={product.id} className="relative">
                  <Link
                    href={`/product/${product.slug}`}
                    aria-label={`View ${product.name}`}
                    className="absolute inset-0 z-0 rounded-xl"
                  />
                  <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
                    <div
                      className={`relative z-10 m-4 flex h-64 items-end rounded-[1.25rem] p-5 text-white pointer-events-none ${
                        index % 3 === 0
                          ? "bg-gradient-to-br from-slate-800 via-slate-700 to-slate-900"
                          : index % 3 === 1
                            ? "bg-gradient-to-br from-amber-300 via-orange-300 to-rose-300"
                            : "bg-gradient-to-br from-sky-400 via-cyan-300 to-blue-500"
                      }`}
                    >
                      <p className="max-w-32 text-sm font-medium uppercase tracking-[0.16em] text-white/80">
                        {product.category}
                      </p>
                    </div>
                    <CardHeader className="relative z-10 space-y-3 pointer-events-none">
                      <div className="flex items-center justify-between gap-4">
                        <Badge
                          variant="outline"
                          className="border-border/80 bg-background"
                        >
                          {product.city}
                        </Badge>
                        <div className="inline-flex items-center gap-1 text-sm text-muted-foreground">
                          <Star className="size-4 fill-amber-400 text-amber-400" />
                          <span>{averageRating} ({reviewCount})</span>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <CardTitle className="text-2xl">{product.name}</CardTitle>
                        <CardDescription className="line-clamp-2 leading-7">
                          {product.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                    <CardFooter className="relative z-10 justify-between gap-4">
                      <div className="pointer-events-none">
                        <p className="text-sm text-muted-foreground">Price</p>
                        <p className="text-xl font-semibold text-foreground">
                          {formatCurrency(product.price)}
                        </p>
                      </div>
                      <div className="pointer-events-auto">
                        <AddToCartButton
                          product={product}
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        />
                      </div>
                    </CardFooter>
                  </Card>
                </div>
              )})}
            </div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  )
}
