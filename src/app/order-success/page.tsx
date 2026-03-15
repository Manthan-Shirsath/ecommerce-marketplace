import Link from "next/link"

import { SiteFooter } from "@/components/layout/site-footer"
import { SiteHeader } from "@/components/layout/site-header"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main className="mx-auto max-w-4xl px-4 py-24 sm:px-6 lg:px-8">
        <Card className="border-border/70 bg-background/90 shadow-sm shadow-slate-950/5">
          <CardHeader>
            <CardTitle className="text-3xl">Order Confirmed</CardTitle>
            <CardDescription className="text-base">
              Thank you for your order. Your order has been placed successfully.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/" className="inline-flex">
              <Button>Continue shopping</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
      <SiteFooter />
    </div>
  )
}
