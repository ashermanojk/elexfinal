"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote:
      "Elextrio Automation delivered an exceptional automation solution that transformed our manufacturing process. Their attention to detail and commitment to quality exceeded our expectations.",
    author: "John Smith",
    position: "Operations Director",
    company: "TechManufacturing Inc.",
  },
  {
    quote:
      "Working with Elextrio was a seamless experience. They understood our unique requirements and delivered a custom solution that significantly improved our productivity and reduced operational costs.",
    author: "Sarah Johnson",
    position: "Plant Manager",
    company: "Precision Industries",
  },
  {
    quote:
      "The team at Elextrio Automation demonstrated exceptional expertise in industrial automation. Their maintenance-friendly approach has made a significant difference in our day-to-day operations.",
    author: "Michael Chen",
    position: "Chief Technology Officer",
    company: "InnovateTech Solutions",
  },
  {
    quote:
      "We were impressed by Elextrio's ability to deliver our complex automation project within the promised timeframe. Their solutions are reliable, efficient, and backed by excellent support.",
    author: "Emily Rodriguez",
    position: "Production Manager",
    company: "Global Manufacturing Co.",
  },
]

export default function TestimonialsSection() {
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

    const element = document.getElementById("testimonials-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="testimonials-section" className="py-20 bg-slate-50 dark:bg-slate-900/50">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            What Our <span className="text-primary">Clients Say</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Hear from businesses that have transformed their operations with our automation solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card
              key={index}
              className={cn(
                "border border-slate-200 dark:border-slate-700 transition-all duration-700 transform",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
                isVisible && `delay-${index * 150}`,
              )}
            >
              <CardContent className="p-6">
                <Quote className="h-8 w-8 text-primary/40 mb-4" />
                <p className="text-lg mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-slate-200 dark:bg-slate-700 mr-4"></div>
                  <div>
                    <p className="font-semibold">{testimonial.author}</p>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
