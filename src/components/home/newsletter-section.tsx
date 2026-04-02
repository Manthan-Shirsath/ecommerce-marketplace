"use client"

import { useState } from "react"
import { ArrowRight, CheckCircle2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function NewsletterSection() {
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="relative overflow-hidden rounded-[2rem] border border-border/70 bg-primary px-6 py-10 text-primary-foreground sm:px-10 lg:px-12">
        <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl" />
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="space-y-4">
            <p className="text-sm font-medium uppercase tracking-[0.24em] text-primary-foreground/70">
              Stay updated
            </p>
            <h2 className="max-w-2xl text-3xl font-semibold tracking-tight sm:text-4xl">
              Discover New Local Products Every Week
            </h2>
            <p className="max-w-2xl text-base leading-7 text-primary-foreground/75">
              Join our mailing list to get updates on new sellers, regional
              specialties, and unique handmade products.
            </p>
          </div>

          {submitted ? (
            <div className="flex h-11 w-full items-center justify-center gap-2 rounded-md border border-white/20 bg-white/10 px-5 text-sm font-medium text-primary-foreground sm:w-auto lg:min-w-[28rem]">
              <CheckCircle2 className="size-4" />
              Thanks for subscribing! We'll be in touch.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="grid w-full gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:min-w-[28rem]">
              <Input
                type="email"
                required
                placeholder="Enter your email"
                className="h-11 border-white/20 bg-white/10 text-primary-foreground placeholder:text-primary-foreground/60"
              />
              <Button
                type="submit"
                className="h-11 bg-background px-5 text-foreground hover:bg-background/90"
              >
                Subscribe
                <ArrowRight className="size-4 ml-2" />
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

