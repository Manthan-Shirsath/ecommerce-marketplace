import { CartPageContent } from "@/components/cart/cart-page-content"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export default function CartPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <CartPageContent />
      </main>
      <SiteFooter />
    </div>
  )
}
