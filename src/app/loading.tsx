import { Loader2 } from "lucide-react"

export default function Loading() {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 text-muted-foreground">
      <Loader2 className="size-8 animate-spin text-primary/60" />
      <p className="text-sm font-medium">Loading...</p>
    </div>
  )
}
