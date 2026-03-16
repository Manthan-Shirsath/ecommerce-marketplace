"use client"

import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { FormEvent } from "react"

export function ProductFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const minPrice = searchParams.get("minPrice") || ""
  const maxPrice = searchParams.get("maxPrice") || ""

  const handlePriceSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const min = formData.get("minPrice") as string
    const max = formData.get("maxPrice") as string
    
    const params = new URLSearchParams(searchParams)
    if (min) params.set("minPrice", min)
    else params.delete("minPrice")
    
    if (max) params.set("maxPrice", max)
    else params.delete("maxPrice")
    
    router.push(`${pathname}?${params.toString()}`)
  }
  
  const clearFilters = () => {
    const params = new URLSearchParams(searchParams)
    params.delete("minPrice")
    params.delete("maxPrice")
    router.push(`${pathname}?${params.toString()}`)
  }

  const hasFilters = searchParams.has("minPrice") || searchParams.has("maxPrice")

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium tracking-tight">Filters</h3>
          {hasFilters && (
            <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs text-muted-foreground">
              Clear all
            </Button>
          )}
        </div>
        <Separator className="my-4" />
      </div>

      <div className="space-y-4">
        <h4 className="font-medium text-sm">Price Range</h4>
        <form onSubmit={handlePriceSubmit} className="space-y-4">
          <div className="flex items-center gap-2">
            <div className="grid gap-1.5">
              <Label htmlFor="minPrice" className="text-xs text-muted-foreground">Min ($)</Label>
              <Input 
                id="minPrice" 
                name="minPrice" 
                type="number" 
                placeholder="0" 
                defaultValue={minPrice}
                className="h-8"
              />
            </div>
            <span className="mt-5 text-muted-foreground">-</span>
            <div className="grid gap-1.5">
              <Label htmlFor="maxPrice" className="text-xs text-muted-foreground">Max ($)</Label>
              <Input 
                id="maxPrice" 
                name="maxPrice" 
                type="number" 
                placeholder="100" 
                defaultValue={maxPrice}
                className="h-8"
              />
            </div>
          </div>
          <Button type="submit" variant="secondary" className="w-full h-8 text-xs">Apply Price</Button>
        </form>
      </div>
    </div>
  )
}
