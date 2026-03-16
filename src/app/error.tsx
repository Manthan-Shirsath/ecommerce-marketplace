"use client"

import { useEffect } from "react"
import { AlertCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Optionally log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <SiteHeader />
      <main className="flex flex-1 flex-col items-center justify-center p-4 text-center">
        <div className="flex max-w-md flex-col items-center gap-6 rounded-3xl border border-border/60 bg-muted/30 p-10 shadow-sm">
          <div className="flex size-16 items-center justify-center rounded-2xl bg-destructive/10 text-destructive">
            <AlertCircle className="size-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl font-bold tracking-tight">Something went wrong!</h2>
            <p className="text-muted-foreground">
              We encountered an unexpected error while loading this page. Our team has been notified.
            </p>
          </div>
          <Button onClick={() => reset()} size="lg" className="w-full">
            Try again
          </Button>
        </div>
      </main>
      <SiteFooter />
    </div>
  )
}
