import { ArrowRight, Star } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { heroHighlights, heroStats, trustNotes } from "@/lib/data"
import { formatCurrency } from "@/lib/format"

export function HeroSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-20 pt-14 sm:px-6 lg:px-8 lg:pb-24 lg:pt-20">
      <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
        <div className="space-y-8">
          <Badge
            variant="secondary"
            className="border border-border/70 bg-background/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-muted-foreground"
          >
            From small-town sellers
          </Badge>

          <div className="space-y-5">
            <h1 className="max-w-3xl text-5xl font-semibold tracking-tight text-foreground sm:text-6xl">
              Discover Authentic Products from Small-Town Makers
            </h1>
            <p className="max-w-2xl text-lg leading-8 text-muted-foreground">
              Shop homemade snacks, handmade crafts, clothing, and natural
              beauty products from local sellers across India. Support small
              businesses while discovering unique products.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button className="h-11 bg-primary px-5 text-primary-foreground hover:bg-primary/90">
              Shop Products
              <ArrowRight className="size-4" />
            </Button>
            <Button
              variant="outline"
              className="h-11 border-border/80 bg-background/80 px-5"
            >
              Browse Categories
            </Button>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            {heroStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border/70 bg-background/75 p-4 shadow-sm"
              >
                <p className="text-2xl font-semibold tracking-tight text-foreground">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-amber-200/60 via-transparent to-sky-200/50 blur-3xl" />
          <Card className="border-border/70 bg-background/85 shadow-xl shadow-slate-950/5">
            <CardHeader className="space-y-4 border-b border-border/70 pb-5">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Verified sellers
                  </p>
                  <CardTitle className="mt-1 text-2xl">
                    Featured Local Products
                  </CardTitle>
                </div>
                <div className="rounded-full bg-amber-100 px-3 py-1 text-xs font-medium text-amber-900">
                  Small business picks
                </div>
              </div>
              <CardDescription className="text-base leading-7">
                Each product on our platform comes from a verified small seller.
                We curate products that bring authentic local flavors, crafts,
                and traditions to your home.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 pt-5">
              {heroHighlights.map((highlight) => (
                <div
                  key={highlight.title}
                  className="grid gap-4 rounded-2xl border border-border/70 bg-background/90 p-4 sm:grid-cols-[1fr_auto]"
                >
                  <div>
                    <p className="text-lg font-semibold text-foreground">
                      {highlight.title}
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {highlight.subtitle}
                    </p>
                  </div>
                  <div
                    className={`flex min-h-24 min-w-32 items-end rounded-2xl bg-gradient-to-br ${highlight.color} p-3 text-sm font-medium text-white shadow-inner`}
                  >
                    {formatCurrency(highlight.price)}
                  </div>
                </div>
              ))}

              <div className="grid gap-4 pt-2 md:grid-cols-2">
                {trustNotes.map((note) => {
                  const Icon = note.icon

                  return (
                    <div
                      key={note.title}
                      className="rounded-2xl border border-border/70 bg-muted/40 p-4"
                    >
                      <Icon className="size-5 text-foreground" />
                      <p className="mt-4 text-sm font-semibold text-foreground">
                        {note.title}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">
                        {note.description}
                      </p>
                    </div>
                  )
                })}
              </div>

              <div className="flex items-center justify-between rounded-2xl bg-primary px-4 py-3 text-primary-foreground">
                <div className="flex items-center gap-2 text-sm font-medium">
                  <Star className="size-4 fill-current" />
                  Trusted marketplace picks
                </div>
                <p className="text-sm text-primary-foreground/80">
                  From local sellers across India
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
