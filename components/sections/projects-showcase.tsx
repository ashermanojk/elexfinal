"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
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
    category: "Chemical Industry",
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
]

export default function ProjectsShowcase() {
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

    const element = document.getElementById("projects-showcase")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="projects-showcase" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Recent <span className="text-primary">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore some of our successful automation solutions delivered to clients across various industries.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className={cn(
                "group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-700 transform hover:shadow-xl",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                isVisible && `delay-${index * 200}`,
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

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/projects">
              View All Projects
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
