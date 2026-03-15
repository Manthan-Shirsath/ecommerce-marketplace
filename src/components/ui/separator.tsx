import { cn } from "@/lib/utils"

function Separator({
  className,
  orientation = "horizontal",
}: {
  className?: string
  orientation?: "horizontal" | "vertical"
}) {
  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
    />
  )
}

export { Separator }
