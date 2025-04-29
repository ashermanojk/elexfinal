"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Cog, Factory, Workflow, Package, Lightbulb, ArrowRight } from "lucide-react"

const services = [
  {
    icon: Cog,
    title: "Special Purpose Machinery",
    description: "Custom-designed machines tailored to your specific industrial needs and requirements.",
    href: "/services#special-purpose-machinery",
  },
  {
    icon: Factory,
    title: "Industrial Automation",
    description: "Comprehensive automation solutions to enhance manufacturing processes and efficiency.",
    href: "/services#industrial-automation",
  },
  {
    icon: Workflow,
    title: "Process Automation",
    description: "Streamline your operations with intelligent process automation systems.",
    href: "/services#process-automation",
  },
  {
    icon: Package,
    title: "Turnkey Projects",
    description: "End-to-end solutions from design and development to installation and commissioning.",
    href: "/services#turnkey-projects",
  },
  {
    icon: Lightbulb,
    title: "Product Development",
    description: "Innovative product engineering and development services to bring your ideas to life.",
    href: "/services#product-development",
  },
]

export default function ServicesOverview() {
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

    const element = document.getElementById("services-overview")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services-overview" className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our <span className="text-primary">Services</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            We offer a comprehensive range of industrial automation solutions to meet your specific needs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "service-card group bg-white dark:bg-slate-800 p-6 transition-all duration-700 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                isVisible && `delay-${index * 100}`,
              )}
            >
              {/* <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <service.icon className="h-6 w-6 text-primary" />
              </div> */}
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-muted-foreground mb-4">{service.description}</p>
              <Link href={service.href} className="inline-flex items-center text-primary font-medium hover:underline">
                Learn more
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild size="lg">
            <Link href="/services">
              View All Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
