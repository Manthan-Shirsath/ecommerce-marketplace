import { SectionHeading } from "@/components/shared/section-heading"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { valueProps } from "@/lib/data"

export function ValueProps() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
      <div className="rounded-[2rem] border border-border/70 bg-background/85 p-8 shadow-xl shadow-slate-950/5 lg:p-10">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <SectionHeading
            eyebrow="Why buyers choose us"
            title="Why Shop with Us"
            description="We make it easier to discover authentic goods from small-town makers while helping local sellers reach more buyers online."
          />

          <div className="grid gap-4 md:grid-cols-3">
            {valueProps.map((item) => {
              const Icon = item.icon

              return (
                <Card key={item.title} className="border-border/70 bg-muted/40">
                  <CardHeader className="space-y-4">
                    <div className="flex size-11 items-center justify-center rounded-2xl bg-background">
                      <Icon className="size-5 text-foreground" />
                    </div>
                    <div className="space-y-2">
                      <CardTitle>{item.title}</CardTitle>
                      <CardDescription className="leading-7">
                        {item.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
