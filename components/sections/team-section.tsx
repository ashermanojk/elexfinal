"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Linkedin, Twitter, Mail } from "lucide-react"

const teamMembers = [
  {
    name: "Alex Johnson",
    position: "CEO & Founder",
    bio: "With over 20 years of experience in industrial automation, Alex leads Elextrio with a vision for innovation and excellence.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Sarah Chen",
    position: "Chief Technology Officer",
    bio: "Sarah brings extensive expertise in automation systems design and implementation, driving our technological advancements.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Michael Rodriguez",
    position: "Head of Engineering",
    bio: "Michael oversees our engineering team, ensuring the highest standards of quality and precision in all our projects.",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Emily Patel",
    position: "Client Solutions Director",
    bio: "Emily works closely with clients to understand their needs and develop tailored automation solutions.",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function TeamSection() {
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

    const element = document.getElementById("team-section")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="team-section" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Leadership Team</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Meet the experienced professionals driving innovation and excellence at Elextrio Automation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <Card
            key={index}
            className={cn(
              "border border-slate-200 dark:border-slate-700 overflow-hidden transition-all duration-700 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
              isVisible && `delay-${index * 150}`,
            )}
          >
            <div className="aspect-square overflow-hidden">
              <img
                src={member.image || "/placeholder.svg"}
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-primary font-medium mb-3">{member.position}</p>
              <p className="text-muted-foreground mb-4">{member.bio}</p>
              <div className="flex space-x-3">
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <Linkedin size={18} />
                </a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <Twitter size={18} />
                </a>
                <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                  <Mail size={18} />
                </a>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}
