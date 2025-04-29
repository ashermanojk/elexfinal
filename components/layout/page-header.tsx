import { cn } from "@/lib/utils"

interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export default function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className={cn("relative py-8 md:py-12 px-4", className)}>
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-24 h-2 bg-orange-500 rounded-r-full"></div>
      <div className="absolute bottom-0 right-0 w-24 h-2 bg-orange-500 rounded-l-full"></div>
      
      {/* Content container */}
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-3xl md:text-6xl font-bold tracking-tight mb-6 text-gray-200">
          <span className="inline-block border-b-4 border-orange-500 pb-2">{title}</span>
        </h1>
        
        {description && (
          <p className="text-lg md:text-xl text-white max-w-2xl mx-auto">
            {description}
          </p>
        )}
      </div>
    </div>
  )
}