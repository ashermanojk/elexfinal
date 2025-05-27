import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
interface PageHeaderProps {
  title: string
  description?: string
  className?: string
}

export default function PageHeader({ title, description, className }: PageHeaderProps) {
  return (
    <div className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
      {/* Animated gradient backgrounds */}
      <motion.div
        className="absolute inset-0 bg-foreground/10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),rgba(255,255,255,0))]"
        initial={{ opacity: 1, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
      />
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),transparent_60%)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.2 }}
      />

      {/* Content container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 relative z-10">
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.5,
            delay: 0.3,
            type: "spring",
            damping: 8,
          }}
        >
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
        </motion.div>
      </div>
    </div>
  )
}