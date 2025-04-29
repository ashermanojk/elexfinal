"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Heart, Zap, Users, MessageCircle, ThumbsUp, Coffee } from "lucide-react"

const culturePoints = [
  {
    icon: Heart,
    title: "Customer-Centric Excellence",
    description: "We prioritize customer satisfaction, focusing on details and adding value with every interaction.",
  },
  {
    icon: Zap,
    title: "Breaking the Norm",
    description:
      "We challenge the status quo, innovate, and exceed expectations through bold ideas and continuous improvement.",
  },
  {
    icon: Users,
    title: "Growth Mindset",
    description:
      "We grow 10% with every project, iterating and making progress towards perfection through continuous learning.",
  },
  {
    icon: MessageCircle,
    title: "Direct Communication",
    description:
      "We value transparency and direct communication, minimizing assumptions and building trust through clarity.",
  },
  {
    icon: Coffee,
    title: "Work Hard, Have Fun",
    description: "We work with urgency on the right things while creating a positive, enjoyable work environment.",
  },
  {
    icon: ThumbsUp,
    title: "Net Positive Impact",
    description: "We strive to create value for the world through our work and random acts of kindness.",
  },
]

export default function WorkCulture() {
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

    const element = document.getElementById("work-culture")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="work-culture" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Work Culture</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Elextrio Automation fosters a culture of innovation, collaboration, and excellence, driven by a commitment to
          delivering tailored automation solutions.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {culturePoints.map((point, index) => (
          <div
            key={index}
            className={cn(
              "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 transition-all duration-700 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
              isVisible && `delay-${index * 100}`,
            )}
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <point.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{point.title}</h3>
            <p className="text-muted-foreground">{point.description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
