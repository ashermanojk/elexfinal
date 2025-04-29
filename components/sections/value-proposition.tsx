"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Clock, Settings, Zap, Shield, Users } from "lucide-react"

const values = [
  {
    icon: Clock,
    title: "Rapid Implementation",
    description:
      "We deliver complete automation solutions within 6 months, ensuring quick time-to-value for your business.",
  },
  {
    icon: Settings,
    title: "Maintenance-Friendly",
    description: "Our systems are designed for easy maintenance, reducing downtime and operational costs.",
  },
  {
    icon: Zap,
    title: "Efficiency Focused",
    description: "We optimize your processes to maximize productivity and resource utilization.",
  },
  {
    icon: Shield,
    title: "Reliability & Quality",
    description: "Our solutions are built to last, with rigorous quality standards and robust engineering.",
  },
  {
    icon: Users,
    title: "Customer-Centric",
    description: "We work closely with you to understand your unique needs and deliver tailored solutions.",
  },
]

export default function ValueProposition() {
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

    const element = document.getElementById("value-proposition")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="value-proposition" className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="text-primary">Elextrio Automation</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We deliver smart, reliable, and maintenance-friendly automation solutions that empower your business
            operations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <div
              key={index}
              className={cn(
                "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-700 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                isVisible && `delay-${index * 100}`,
              )}
            >
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                <value.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
