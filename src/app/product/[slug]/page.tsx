import Image from "next/image"
import { MapPin, Package, ShoppingBag, Star, Store } from "lucide-react"

import { AddToCartButton } from "@/components/cart/add-to-cart-button"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { getProductBySlug, getReviewsByProductId } from "@/lib/supabase"
import { formatCurrency } from "@/lib/format"
import { addReview } from "./actions"

type ProductPageProps = {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug)

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

  const reviews = await getReviewsByProductId(product.id)
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : product.rating.toFixed(1)

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
            <CardContent className="pt-4">
              {product.image_url ? (
                <div className="relative flex min-h-[24rem] items-end overflow-hidden rounded-[1.5rem]">
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="relative z-10 space-y-3 p-6 text-white">
                    <Badge variant="secondary">{product.category}</Badge>
                    <p className="max-w-xs text-3xl font-semibold tracking-tight">
                      {product.name}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="flex min-h-[24rem] items-end rounded-[1.5rem] bg-gradient-to-br from-amber-300 via-orange-200 to-rose-300 p-6 text-foreground">
                  <div className="space-y-3">
                    <Badge variant="secondary">{product.category}</Badge>
                    <p className="max-w-xs text-3xl font-semibold tracking-tight">
                      {product.name}
                    </p>
                  </div>
                </div>
              )}
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
                  <span>{averageRating} ({reviews.length} reviews)</span>
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
                product={product}
                className="h-11 w-full bg-primary text-primary-foreground hover:bg-primary/90 sm:w-auto"
              />
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="space-y-8">
            <h2 className="text-2xl font-semibold tracking-tight">Customer Reviews</h2>
            {reviews.length === 0 ? (
              <p className="text-muted-foreground">No reviews yet. Be the first to review this product!</p>
            ) : (
              <div className="space-y-6">
                {reviews.map((review) => (
                  <div key={review.id} className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="font-medium">{review.user_name}</div>
                      <div className="flex items-center text-amber-400">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`size-3 ${i < review.rating ? "fill-current" : "fill-muted text-muted"}`} />
                        ))}
                      </div>
                    </div>
                    {review.comment && <p className="text-sm text-muted-foreground">{review.comment}</p>}
                    <p className="text-xs text-muted-foreground">
                      {new Date(review.created_at).toLocaleDateString()}
                    </p>
                    <Separator className="mt-4" />
                  </div>
                ))}
              </div>
            )}
          </div>

          <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
            <CardHeader>
              <CardTitle className="text-xl">Write a review</CardTitle>
              <CardDescription>Share your thoughts with other customers.</CardDescription>
            </CardHeader>
            <CardContent>
              <form action={addReview} className="space-y-4">
                <input type="hidden" name="product_id" value={product.id} />
                <input type="hidden" name="slug" value={product.slug} />
                <div className="space-y-2">
                  <Label htmlFor="user_name">Your name</Label>
                  <Input id="user_name" name="user_name" required placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="rating">Rating</Label>
                  <Select name="rating" required defaultValue="5">
                    <SelectTrigger id="rating">
                      <SelectValue placeholder="Select a rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[5, 4, 3, 2, 1].map((r) => (
                        <SelectItem key={r} value={r.toString()}>
                          {r} Stars
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="comment">Review summary (optional)</Label>
                  <Textarea id="comment" name="comment" placeholder="What did you like or dislike?" rows={3} />
                </div>
                <Button type="submit" className="w-full">Submit review</Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
