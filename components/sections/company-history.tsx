"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const milestones = [
  {
    year: "2015",
    title: "Company Founded",
    description:
      "Elextrio Automation was established with a vision to provide innovative industrial automation solutions.",
  },
  {
    year: "2017",
    title: "First Major Project",
    description: "Successfully completed our first large-scale automation project for a leading manufacturing company.",
  },
  {
    year: "2019",
    title: "Expansion of Services",
    description: "Expanded our service offerings to include special purpose machinery and turnkey project solutions.",
  },
  {
    year: "2021",
    title: "Technology Innovation",
    description: "Introduced advanced IoT and data analytics capabilities to our automation solutions.",
  },
  {
    year: "2023",
    title: "Global Reach",
    description:
      "Expanded operations to serve international clients and established partnerships with global technology providers.",
  },
]

export default function CompanyHistory() {
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

    const element = document.getElementById("company-history")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="company-history" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Journey</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Explore the key milestones in Elextrio Automation's history of innovation and growth.
        </p>
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full"></div>

        <div className="space-y-12">
          {milestones.map((milestone, index) => (
            <div
              key={index}
              className={cn(
                "relative flex items-center transition-all duration-700 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                isVisible && `delay-${index * 200}`,
              )}
            >
              {/* Timeline dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-5 h-5 rounded-full bg-primary"></div>

              {/* Content */}
              <div className={cn("w-1/2 pr-12 text-right", index % 2 !== 0 && "ml-auto pl-12 pr-0 text-left")}>
                <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
                  <div className="text-primary font-bold text-xl mb-2">{milestone.year}</div>
                  <h3 className="text-xl font-semibold mb-2">{milestone.title}</h3>
                  <p className="text-muted-foreground">{milestone.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
