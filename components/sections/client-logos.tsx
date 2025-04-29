"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function ClientLogos() {
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

    const element = document.getElementById("client-logos")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="client-logos" className="py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Trusted by Industry Leaders</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We're proud to work with leading companies across various industries.
        </p>
      </div>

      <div
        className={cn(
          "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 transition-all duration-1000",
          isVisible ? "opacity-100" : "opacity-0",
        )}
      >
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="flex items-center justify-center p-6 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700"
          >
            <div className="h-12 w-32 bg-slate-200 dark:bg-slate-700 rounded-md"></div>
          </div>
        ))}
      </div>
    </section>
  )
}
