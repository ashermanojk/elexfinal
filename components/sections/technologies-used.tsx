"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Cpu, Layers, Wifi, Database, BarChart, Shield } from "lucide-react"

const technologies = [
  {
    icon: Cpu,
    title: "PLC Systems",
    description:
      "We utilize advanced Programmable Logic Controllers from leading manufacturers like Siemens, Allen-Bradley, and Mitsubishi for reliable control systems.",
  },
  {
    icon: Layers,
    title: "HMI & SCADA",
    description:
      "Our Human-Machine Interface and Supervisory Control and Data Acquisition systems provide intuitive monitoring and control capabilities.",
  },
  {
    icon: Wifi,
    title: "IoT Integration",
    description:
      "We implement Internet of Things technologies to enable remote monitoring, predictive maintenance, and data-driven decision making.",
  },
  {
    icon: Database,
    title: "Data Management",
    description:
      "Our solutions include robust data collection, storage, and management systems to support analytics and reporting needs.",
  },
  {
    icon: BarChart,
    title: "Analytics & AI",
    description:
      "We incorporate advanced analytics and artificial intelligence to optimize processes and identify improvement opportunities.",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Our systems are designed with robust security measures to protect against cyber threats and ensure operational integrity.",
  },
]

export default function TechnologiesUsed() {
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

    const element = document.getElementById("technologies-used")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="technologies-used" className="py-12 bg-slate-50 dark:bg-slate-900/50 rounded-2xl">
      <div className="container mx-auto px-6 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Technologies We Use</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            We leverage cutting-edge technologies to deliver innovative and reliable automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className={cn(
                "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-700 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                isVisible && `delay-${index * 100}`,
              )}
            >
              <div className="h-12 w-12 rounded-lg bg-secondary/10 flex items-center justify-center mb-4">
                <tech.icon className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{tech.title}</h3>
              <p className="text-muted-foreground">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
