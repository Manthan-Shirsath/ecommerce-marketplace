import Link from "next/link"
import Image from "next/image"
import { Star } from "lucide-react"

import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { SectionHeading } from "@/components/shared/section-heading"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getFeaturedProducts, getReviewsForProducts } from "@/lib/supabase"
import { formatCurrency } from "@/lib/format"

export async function FeaturedProducts() {
  const featuredProducts = await getFeaturedProducts()
  const reviews = await getReviewsForProducts(featuredProducts.map((p) => p.id))

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Bestsellers"
          title="Popular Marketplace Picks"
          description="Explore a few of the products buyers are discovering from independent sellers and small-town makers."
        />

        {featuredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center">
            <h3 className="text-xl font-semibold">No products found</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Please add items to your Supabase &quot;products&quot; table to see them here.
            </p>
          </div>
        ) : (
          <div className="grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
            {featuredProducts.map((product, index) => {
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
                    {product.image_url ? (
                    <div className="relative z-10 m-4 flex h-64 items-end overflow-hidden rounded-[1.25rem] p-5 text-white pointer-events-none">
                      <Image
                        src={product.image_url}
                        alt={product.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <div className="relative z-10">
                        <p className="max-w-32 text-sm font-medium uppercase tracking-[0.16em] text-white/90">
                          {product.category}
                        </p>
                      </div>
                    </div>
                  ) : (
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
                  )}
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
                      <CardDescription className="leading-7 pointer-events-auto relative z-20">
                        Sold by <Link href={`/seller/${encodeURIComponent(product.seller)}`} className="underline hover:text-foreground relative z-20">{product.seller}</Link> in {product.city}. Category:
                        {" "}
                        {product.category}.
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardFooter className="relative z-10 justify-between gap-4">
                    <div className="pointer-events-none">
                      <p className="text-sm text-muted-foreground">Price</p>
                      <p className="text-xl font-semibold text-foreground">
                        {formatCurrency(product.price)}
                      </p>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {product.stock} in stock
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
      </div>
    </section>
  )
}
