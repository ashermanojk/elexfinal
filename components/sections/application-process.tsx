"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { FileText, Users, MessageSquare, CheckCircle } from "lucide-react"

const steps = [
  {
    icon: FileText,
    title: "Submit Application",
    description: "Complete our online application form and upload your resume and cover letter.",
  },
  {
    icon: Users,
    title: "Initial Screening",
    description:
      "Our HR team will review your application and contact qualified candidates for an initial phone interview.",
  },
  {
    icon: MessageSquare,
    title: "Technical Interview",
    description:
      "Qualified candidates will be invited for a technical interview with the hiring manager and team members.",
  },
  {
    icon: CheckCircle,
    title: "Final Decision",
    description: "We'll make a decision and extend an offer to the selected candidate.",
  },
]

export default function ApplicationProcess() {
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

    const element = document.getElementById("application-process")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="application-process" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Application Process</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Our straightforward application process is designed to identify the best talent for our team.
        </p>
      </div>

      <div className="relative">
        {/* Process line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-primary/20 rounded-full hidden md:block"></div>

        <div className="space-y-12 md:space-y-0">
          {steps.map((step, index) => (
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
