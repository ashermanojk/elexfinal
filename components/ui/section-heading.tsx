import { cn } from "@/lib/utils"

interface SectionHeadingProps {
  title: string
  subtitle?: string
  centered?: boolean
  className?: string
}

export function SectionHeading({ title, subtitle, centered = false, className }: SectionHeadingProps) {
  return (
    <div className={cn(
      "space-y-2 mb-10",
      centered && "mx-auto max-w-2xl text-center",
      className
    )}>
      <h2 className={cn(
        "text-3xl md:text-4xl font-bold tracking-tight",
        centered && "text-center"
      )}>{title}</h2>
      {subtitle && <p className="text-muted-foreground max-w-3xl">{subtitle}</p>}
    </div>
  )
}
