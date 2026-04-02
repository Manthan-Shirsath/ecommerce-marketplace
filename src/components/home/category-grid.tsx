import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/shared/section-heading"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { categories } from "@/lib/constants"

export function CategoryGrid() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="space-y-10">
        <SectionHeading
          eyebrow="Collections"
          title="Featured categories"
          description="Browse marketplace categories to discover homemade, handmade, and locally crafted products from sellers across India."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon

            return (
              <Link key={category.name} href={`/category/${category.slug}`}>
                <Card
                  className="border-border/70 bg-background/85 transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-950/5"
                >
                  <CardHeader className="space-y-4">
                    <div className="flex size-12 items-center justify-center rounded-2xl bg-secondary text-foreground">
                      <Icon className="size-5" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle>{category.name}</CardTitle>
                      <CardDescription className="leading-7">
                        {category.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
                    <span>{category.itemCount}</span>
                    <span className="inline-flex items-center gap-1 font-medium text-foreground">
                      Browse
                      <ArrowRight className="size-4" />
                    </span>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
