import { CategoryGrid } from "@/components/home/category-grid"
import { FeaturedProducts } from "@/components/home/featured-products"
import { HeroSection } from "@/components/home/hero-section"
import { NewsletterSection } from "@/components/home/newsletter-section"
import { ValueProps } from "@/components/home/value-props"
import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-x-0 top-0 -z-10 h-[34rem] bg-gradient-to-b from-amber-100/60 via-background to-background" />
      <SiteHeader />
      <main>
        <HeroSection />
        <CategoryGrid />
        <FeaturedProducts />
        <ValueProps />
        <NewsletterSection />
      </main>
      <SiteFooter />
    </div>
  )
}
