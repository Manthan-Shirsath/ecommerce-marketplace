import { Store } from "lucide-react"

import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"
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
import { categories } from "@/lib/constants"
import { addProduct } from "./actions"

export default function SellPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="mb-8">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary mb-4">
            <Store className="size-6" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight">List a new product</h1>
          <p className="mt-2 text-muted-foreground">
            Add a new homemade or locally crafted product to the marketplace.
          </p>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card p-6 shadow-sm sm:p-8">
          <form action={addProduct} className="space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="name">Product name *</Label>
                <Input
                  id="name"
                  name="name"
                  placeholder="E.g. Homemade Mango Pickle"
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the product, its ingredients, and how it is made..."
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="category">Category *</Label>
                <Select name="category" required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.slug} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="price">Price (₹) *</Label>
                <Input
                  id="price"
                  name="price"
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="0.00"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="seller">Seller name *</Label>
                <Input
                  id="seller"
                  name="seller"
                  placeholder="Your business or personal name"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="city">City/Town *</Label>
                <Input
                  id="city"
                  name="city"
                  placeholder="Where is this made?"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="stock">Initial stock *</Label>
                <Input
                  id="stock"
                  name="stock"
                  type="number"
                  min="1"
                  placeholder="10"
                  required
                />
              </div>

              <div className="space-y-2 sm:col-span-2">
                <Label htmlFor="image">Product image</Label>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  accept="image/*"
                />
                <p className="text-xs text-muted-foreground">
                  Upload a high-quality photo of your product (max 5MB).
                </p>
              </div>
            </div>

            <Button type="submit" className="w-full sm:w-auto" size="lg">
              Publish listing
            </Button>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
