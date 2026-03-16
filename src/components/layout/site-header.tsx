import Link from "next/link"
import { Menu, Search, ShoppingBag } from "lucide-react"

import { CartLinkButton } from "@/components/cart/cart-link-button"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { navigation } from "@/lib/constants"

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <ShoppingBag className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">Ecommerce</p>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto hidden max-w-xs flex-1 md:block">
          <form action="/search" className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              name="q"
              type="search"
              placeholder="Search products, brands, collections"
              className="h-10 border-border/80 bg-background pl-9"
            />
          </form>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Link href="/sell">
            <Button
              variant="default"
              className="h-10 bg-primary/10 text-primary hover:bg-primary/20"
            >
              Start selling
            </Button>
          </Link>
          <Button
            variant="outline"
            className="h-10 border-border/80 bg-transparent"
          >
            Sign in
          </Button>
          <CartLinkButton />
        </div>

        <Button
          variant="outline"
          size="icon"
          className="size-10 md:hidden"
          aria-label="Open navigation"
        >
          <Menu className="size-4" />
        </Button>
      </div>
    </header>
  )
}
