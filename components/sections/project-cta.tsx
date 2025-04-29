"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

export default function ProjectCta() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("project-cta")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="project-cta" className="py-16">
      <div
        className={cn(
          "bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-12 text-center transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        )}
      >
        <h2 className="text-3xl font-bold mb-4">Have a Similar Project in Mind?</h2>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
          Let's discuss how we can help you achieve your automation goals with a tailored solution designed for your
          specific needs.
        </p>
        <Button asChild size="lg">
          <Link href="/contact">
            Start Your Project
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </Button>
      </div>
    </section>
  )
}
