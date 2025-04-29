"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ClipboardList, Lightbulb, PenTool, Cog, CheckCircle, LifeBuoy } from "lucide-react"

const processSteps = [
  {
    icon: ClipboardList,
    title: "Requirements Analysis",
    description:
      "We begin by thoroughly understanding your needs, challenges, and objectives through detailed consultations and site visits.",
  },
  {
    icon: Lightbulb,
    title: "Concept Development",
    description:
      "Our team develops innovative concepts and solutions tailored to your specific requirements and constraints.",
  },
  {
    icon: PenTool,
    title: "Detailed Design",
    description:
      "We create comprehensive designs and specifications, including mechanical, electrical, and software components.",
  },
  {
    icon: Cog,
    title: "Implementation",
    description:
      "Our skilled engineers and technicians bring the design to life, ensuring precision and quality at every step.",
  },
  {
    icon: CheckCircle,
    title: "Testing & Validation",
    description:
      "Rigorous testing and validation procedures ensure that the solution meets all requirements and quality standards.",
  },
  {
    icon: LifeBuoy,
    title: "Support & Maintenance",
    description:
      "We provide ongoing support and maintenance services to ensure the long-term performance of your automation solution.",
  },
]

export default function ProcessOverview() {
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

    const element = document.getElementById("process-overview")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="process-overview" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Process</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We follow a structured approach to deliver high-quality automation solutions that meet your specific needs.
        </p>
      </div>

      <div className="relative">
        {/* Process line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full hidden md:block"></div>

        <div className="space-y-12 md:space-y-0">
          {processSteps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "relative md:flex items-center transition-all duration-700 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                isVisible && `delay-${index * 150}`,
              )}
            >
              {/* Process dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white font-bold hidden md:flex">
                {index + 1}
              </div>

              {/* Content */}
              <div
                className={cn(
                  "md:w-1/2 md:pr-12 md:text-right",
                  index % 2 !== 0 && "md:ml-auto md:pl-12 md:pr-0 md:text-left",
                )}
              >
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="flex items-center gap-3 mb-3 md:justify-end">
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <step.icon className="h-5 w-5 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{step.title}</h3>
                  </div>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
