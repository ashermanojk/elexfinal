"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Users, BarChart3, Globe } from "lucide-react"

const imperatives = [
  {
    icon: Users,
    title: "Customer-Centric Growth",
    description:
      "Strengthen client relationships by delivering tailored, innovative automation solutions that enhance productivity and satisfaction.",
  },
  {
    icon: BarChart3,
    title: "Operational Excellence",
    description:
      "Drive efficiency, quality, and reliability across all processes to ensure seamless project execution and long-term value creation.",
  },
  {
    icon: Globe,
    title: "Market Expansion",
    description:
      "Diversify into new sectors and establish a global footprint, focusing on sustainable growth and adaptability to meet evolving industry needs.",
  },
]

export default function StrategicImperatives() {
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

    const element = document.getElementById("strategic-imperatives")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="strategic-imperatives" className="py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Strategic Imperatives</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Three strategic imperatives act as a foundation of our efforts and guide our approach to business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {imperatives.map((imperative, index) => (
            <div
              key={index}
              className={cn(
                "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-700 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                isVisible && `delay-${index * 200}`,
              )}
            >
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <imperative.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{imperative.title}</h3>
              <p className="text-muted-foreground">{imperative.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
