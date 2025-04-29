import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export default function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <header className={cn("mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12", className)}>
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight text-primary sm:text-5xl md:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-xl text-muted-foreground mx-auto">
            {description}
          </p>
        )}
      </div>
    </header>
  )
}