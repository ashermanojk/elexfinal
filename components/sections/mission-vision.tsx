"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Target, Lightbulb } from "lucide-react"

export default function MissionVision() {
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

    const element = document.getElementById("mission-vision")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="mission-vision" className="py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card
          className={cn(
            "border-2 border-primary/20 transition-all duration-700 transform",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <CardTitle className="text-2xl">Our Mission</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              At Elextrio, our mission is to deliver innovative industrial automation solutions and build
              special-purpose machines that empower businesses to achieve efficiency, precision, and reliability in
              their operations.
            </p>
            <p className="text-muted-foreground">
              We are dedicated to transforming challenges into tailored solutions by leveraging cutting-edge technology
              and a deep understanding of our clients' unique needs. Our commitment is to provide small to medium-sized
              projects that bring measurable value within six months of initiation, ensuring rapid impact and tangible
              results for our clients.
            </p>
          </CardContent>
        </Card>

        <Card
          className={cn(
            "border-2 border-secondary/20 transition-all duration-700 transform delay-300",
            isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
          )}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-secondary/10 flex items-center justify-center">
                <Lightbulb className="h-6 w-6 text-secondary" />
              </div>
              <CardTitle className="text-2xl">Our Vision</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Guided by our vision, we aim to be the trusted partner in industrial automation by delivering solutions
              that enable our clients to stay competitive in an ever-evolving market.
            </p>
            <p className="text-muted-foreground">
              Through our expertise, agility, and unwavering dedication to customer satisfaction, we help businesses
              seamlessly integrate automation into their operations. By bridging the gap between advanced technology and
              user-friendly systems, we aspire to create long-lasting partnerships and drive the success of our clients,
              one project at a time.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
