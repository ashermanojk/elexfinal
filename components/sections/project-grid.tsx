"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

const projects = [
  {
    title: "Automated Assembly Line",
    category: "Manufacturing",
    description:
      "Custom assembly line automation for a leading electronics manufacturer, increasing production efficiency by 40%.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Process Control System",
    category: "Chemical",
    description:
      "Advanced process control system for precise monitoring and management of chemical manufacturing processes.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Packaging Automation",
    category: "Food & Beverage",
    description:
      "High-speed packaging automation solution for a food processing company, reducing manual labor by 60%.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Quality Inspection System",
    category: "Pharmaceutical",
    description:
      "Automated vision-based quality inspection system for pharmaceutical products, ensuring 100% inspection with high accuracy.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Robotic Welding Cell",
    category: "Automotive",
    description:
      "Custom robotic welding cell for automotive components, improving weld quality and consistency while reducing cycle time.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Material Handling System",
    category: "Manufacturing",
    description:
      "Automated material handling system for a distribution center, optimizing inventory management and order fulfillment.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Batch Processing Control",
    category: "Food & Beverage",
    description:
      "Automated batch processing control system for a beverage manufacturer, ensuring consistent product quality and traceability.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "PCB Testing Automation",
    category: "Electronics",
    description:
      "Automated testing system for printed circuit boards, reducing testing time by 50% while improving detection of defects.",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    title: "Clean Room Automation",
    category: "Pharmaceutical",
    description:
      "Automated material transfer and handling system for clean room environments, maintaining sterility while improving efficiency.",
    image: "/placeholder.svg?height=400&width=600",
  },
]

export default function ProjectGrid() {
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

    const element = document.getElementById("project-grid")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="project-grid" className="py-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={index}
            className={cn(
              "group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-700 transform hover:shadow-xl",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
              isVisible && `delay-${index * 100}`,
            )}
          >
            <div className="relative overflow-hidden">
              <div className="aspect-[16/9]">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute top-4 left-4">
                <span className="bg-primary/90 text-white text-sm font-medium px-3 py-1 rounded-full">
                  {project.category}
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4">{project.description}</p>
              <Link
                href={`/projects/${project.title.toLowerCase().replace(/\s+/g, "-")}`}
                className="inline-flex items-center text-primary font-medium hover:underline"
              >
                View Project Details
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
