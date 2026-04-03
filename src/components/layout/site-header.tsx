"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, Search, ShoppingBag, X } from "lucide-react"

import { CartLinkButton } from "@/components/cart/cart-link-button"
import { Button, buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { navigation } from "@/lib/constants"

export function SiteHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-30 border-b border-border/70 bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex size-10 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-sm">
            <ShoppingBag className="size-4" />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground hidden sm:block">Ecommerce</p>
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

        <div className="ml-auto flex items-center gap-2 md:hidden">
          <CartLinkButton />
          <Button
            variant="outline"
            size="icon"
            className="size-10"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Open navigation"
          >
            {isMobileMenuOpen ? <X className="size-4" /> : <Menu className="size-4" />}
          </Button>
        </div>

        <div className="hidden items-center gap-2 md:flex ml-auto">
          <Link
            href="/sell"
            className={buttonVariants({
              variant: "default",
              className: "h-10 bg-primary/10 text-primary hover:bg-primary/20",
            })}
          >
            Start selling
          </Link>
          <Link
            href="/login"
            className={buttonVariants({
              variant: "outline",
              className: "h-10 border-border/80 bg-transparent",
            })}
          >
            Sign in
          </Link>
          <CartLinkButton />
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="border-t border-border/70 bg-background md:hidden">
          <div className="space-y-4 px-4 py-4 sm:px-6">
            <form action="/search" className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                name="q"
                type="search"
                placeholder="Search products..."
                className="h-10 border-border/80 bg-background pl-9"
              />
            </form>

            <nav className="flex flex-col gap-4 py-2">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-foreground transition-colors hover:text-primary"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="flex flex-col gap-2 pt-2">
              <Link
                href="/sell"
                onClick={() => setIsMobileMenuOpen(false)}
                className={buttonVariants({
                  variant: "default",
                  className: "w-full h-10 bg-primary/10 text-primary hover:bg-primary/20",
                })}
              >
                Start selling
              </Link>
              <Link
                href="/login"
                onClick={() => setIsMobileMenuOpen(false)}
                className={buttonVariants({
                  variant: "outline",
                  className: "w-full h-10 border-border/80 bg-transparent",
                })}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
