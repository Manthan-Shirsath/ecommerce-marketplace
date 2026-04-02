import Link from "next/link"

import { Separator } from "@/components/ui/separator"
import { footerGroups } from "@/lib/constants"

export function SiteFooter() {
  return (
    <footer className="border-t border-border/70 bg-background/90">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_repeat(3,1fr)]">
          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-muted-foreground">
              Ecommerce
            </p>
            <h2 className="max-w-sm text-2xl font-semibold tracking-tight text-foreground">
              Discover products made with care by local sellers and artisans.
            </h2>
            <p className="max-w-md text-sm leading-6 text-muted-foreground">
              Ecommerce is a student-built marketplace prototype connecting
              local sellers with online buyers.
            </p>
          </div>

          {footerGroups.map((group) => (
            <div key={group.title} className="space-y-4">
              <h3 className="text-sm font-semibold text-foreground">
                {group.title}
              </h3>
              <div className="space-y-3">
                {group.links.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="block text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col gap-4 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Ecommerce. All rights reserved.</p>
          <div className="flex gap-4">
            <Link href="/" className="transition-colors hover:text-foreground">
              Privacy
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground">
              Terms
            </Link>
            <Link href="/" className="transition-colors hover:text-foreground">
              Instagram
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
