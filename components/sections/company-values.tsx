"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Shield, Lightbulb, Clock, Award, Anchor, Users } from "lucide-react"
import { useContent } from "@/components/ContentProvider"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import useEmblaCarousel from 'embla-carousel-react'

const valueIcons = {
  integrity: Shield,
  innovation: Lightbulb,
  dependability: Clock,
  excellence: Award,
  resilience: Anchor,
  customercentricity: Users,
}

export default function CompanyValues() {
  const { getContentText } = useContent()
  const [isVisible, setIsVisible] = useState(false)

  // Initialize Embla Carousel for mobile
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    containScroll: 'trimSnaps',
    dragFree: true,
    active: true,
    breakpoints: {
      '(min-width: 768px)': { active: false }
    }
  })

  const scrollPrev = () => emblaApi?.scrollPrev()
  const scrollNext = () => emblaApi?.scrollNext()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    const element = document.getElementById("company-values")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  const values = [
    'integrity',
    'innovation',
    'dependability',
    'excellence',
    'resilience',
    'customercentricity'
  ]

  return (
    <section id="company-values" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            {getContentText("about-values-heading", "Our Core Values")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {getContentText("about-values-subheading", "These principles guide our actions and decisions every day.")}
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -mx-4">
              {values.map((value, index) => {
                const Icon = valueIcons[value as keyof typeof valueIcons]
                return (
                  <div
                    key={value}
                    className={cn(
                      "flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.333%] px-4",
                      "transform transition-all duration-700",
                      isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                      isVisible && `delay-${index * 100}`
                    )}
                  >
                    <div className="bg-card rounded-xl p-6 shadow-sm border border-border h-full">
                      <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {getContentText(`about-values-${value}-title`, value)}
                      </h3>
                      <p className="text-muted-foreground">
                        {getContentText(`about-values-${value}`, "")}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons (visible only on mobile) */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-transparent"
              onClick={scrollPrev}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-transparent"
              onClick={scrollNext}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
