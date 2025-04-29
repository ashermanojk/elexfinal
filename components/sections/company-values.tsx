"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Shield, Lightbulb, Clock, Award, Anchor, Users } from "lucide-react"

const values = [
  {
    icon: Shield,
    title: "Integrity",
    description:
      "We uphold the highest standards of honesty, ethics, and transparency in all our interactions and business practices.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We continuously seek creative and cutting-edge solutions to address complex automation challenges.",
  },
  {
    icon: Clock,
    title: "Dependability",
    description: "We deliver on our promises, ensuring reliability and consistency in our services and solutions.",
  },
  {
    icon: Award,
    title: "Excellence",
    description: "We strive for the highest quality in everything we do, from engineering to customer service.",
  },
  {
    icon: Anchor,
    title: "Resilience",
    description:
      "We approach challenges with determination and adaptability, finding solutions where others see obstacles.",
  },
  {
    icon: Users,
    title: "Customer-Centricity",
    description:
      "We place our clients' needs at the heart of our decision-making process, ensuring their success is our priority.",
  },
]

export default function CompanyValues() {
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

    const element = document.getElementById("company-values")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="company-values" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          At Elextrio, our values define who we are and guide our actions in delivering exceptional automation
          solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {values.map((value, index) => (
          <div
            key={index}
            className={cn(
              "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-700 transform",
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
    </section>
  )
}
