"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { HeartPulse, GraduationCap, Clock, DollarSign, Users, Briefcase } from "lucide-react"

const benefits = [
  {
    icon: HeartPulse,
    title: "Comprehensive Health Benefits",
    description: "Medical, dental, and vision coverage for you and your family.",
  },
  {
    icon: GraduationCap,
    title: "Professional Development",
    description: "Ongoing training, education assistance, and career growth opportunities.",
  },
  {
    icon: Clock,
    title: "Flexible Work Arrangements",
    description: "Options for remote work and flexible scheduling to support work-life balance.",
  },
  {
    icon: DollarSign,
    title: "Competitive Compensation",
    description: "Salary packages that recognize your skills, experience, and contributions.",
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    description: "Work with talented professionals in a supportive and innovative team.",
  },
  {
    icon: Briefcase,
    title: "Challenging Projects",
    description: "Opportunity to work on diverse and cutting-edge automation solutions.",
  },
]

export default function CareerBenefits() {
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

    const element = document.getElementById("career-benefits")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="career-benefits" className="py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why Work With Us</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Join our team and enjoy these benefits while contributing to innovative automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className={cn(
                "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-700 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                isVisible && `delay-${index * 100}`,
              )}
            >
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
