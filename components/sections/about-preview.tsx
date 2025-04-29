"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle } from "lucide-react"

export default function AboutPreview() {
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

    const element = document.getElementById("about-preview")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const keyPoints = [
    "Expertise in industrial automation and special-purpose machinery",
    "Focus on small to medium-sized projects with rapid implementation",
    "Customer-centric approach with tailored solutions",
    "Commitment to quality, reliability, and innovation",
    "Experienced team of dedicated professionals",
  ]

  return (
    <section id="about-preview" className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div
            className={cn(
              "relative transition-all duration-1000",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
            )}
          >
            <div className="relative rounded-xl overflow-hidden shadow-xl">
              <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="Elextrio Automation team"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Decorative elements */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/20 rounded-full blur-2xl"></div>
            <div className="absolute -top-8 -left-8 w-24 h-24 bg-secondary/20 rounded-full blur-xl"></div>
          </div>

          <div
            className={cn(
              "space-y-6 transition-all duration-1000 delay-300",
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
            )}
          >
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                About <span className="text-primary">Elextrio Automation</span>
              </h2>
              <p className="text-lg text-muted-foreground">
                We specialize in providing cutting-edge industrial automation solutions and custom-built special-purpose
                machines tailored to the unique needs of our clients.
              </p>
            </div>

            <ul className="space-y-3">
              {keyPoints.map((point, index) => (
                <li key={index} className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <div className="pt-4">
              <Button asChild size="lg">
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
