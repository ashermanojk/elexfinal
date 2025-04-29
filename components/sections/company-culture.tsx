"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Heart, Zap, Users, MessageCircle, ThumbsUp, Coffee } from "lucide-react"
import Image from "next/image"
import cultureImage from "@/public/images/company-culture.jpg"

const culturePoints = [
  {
    icon: Heart,
    title: "Customer-Centric Excellence",
    description: "We prioritize customer satisfaction, focusing on details and adding value with every interaction.",
  },
  {
    icon: Zap,
    title: "Innovation & Growth",
    description:
      "We challenge the status quo, innovate, and exceed expectations through bold ideas and continuous improvement.",
  },
  {
    icon: Users,
    title: "Collaborative Environment",
    description:
      "We foster a supportive team atmosphere where diverse perspectives are valued and everyone can contribute to our success.",
  },
  {
    icon: MessageCircle,
    title: "Open Communication",
    description:
      "We value transparency and direct communication, minimizing assumptions and building trust through clarity.",
  },
  {
    icon: Coffee,
    title: "Work-Life Balance",
    description:
      "We believe in working hard while maintaining a healthy balance, creating a positive and enjoyable work environment.",
  },
  {
    icon: ThumbsUp,
    title: "Recognition & Growth",
    description:
      "We celebrate achievements and provide opportunities for professional development and career advancement.",
  },
]

export default function CompanyCulture() {
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

    const element = document.getElementById("company-culture")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="company-culture" className="py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div
          className={cn(
            "transition-all duration-1000",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
          )}
        >
          <div className="relative rounded-xl overflow-hidden shadow-xl">
            <div className="aspect-[4/3] bg-slate-200 dark:bg-slate-800">
              <Image 
              src={cultureImage} 
              alt="Elextrio Automation team culture" 
              fill 
              className="object-cover" />
            </div>
          </div>
        </div>

        <div
          className={cn(
            "space-y-6 transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
          )}
        >
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Culture</h2>
            <p className="text-lg text-muted-foreground">
              At Elextrio Automation, we foster a culture of innovation, collaboration, and excellence. We believe that
              our team is our greatest asset, and we're committed to creating an environment where everyone can thrive.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
            {culturePoints.slice(0, 4).map((point, index) => (
              <div key={index} className="flex items-start">
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0">
                  <point.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">{point.title}</h3>
                  <p className="text-sm text-muted-foreground">{point.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
