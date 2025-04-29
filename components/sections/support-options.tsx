"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { LifeBuoy, FileText, MessageSquare, Phone } from "lucide-react"

const supportOptions = [
  {
    icon: LifeBuoy,
    title: "Technical Support",
    description: "Get assistance with technical issues related to our automation solutions.",
    action: "Submit a Support Ticket",
    href: "/support",
  },
  {
    icon: FileText,
    title: "Documentation",
    description: "Access user manuals, technical specifications, and guides for our products.",
    action: "Browse Documentation",
    href: "/resources",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Chat with our support team for immediate assistance during business hours.",
    action: "Start Chat",
    href: "#chat",
  },
  {
    icon: Phone,
    title: "Phone Support",
    description: "Speak directly with our support specialists for urgent matters.",
    action: "Call Support",
    href: "tel:+15559876543",
  },
]

export default function SupportOptions() {
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

    const element = document.getElementById("support-options")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="support-options" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Support Options</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          We're here to help you with any questions or issues you may have.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {supportOptions.map((option, index) => (
          <div
            key={index}
            className={cn(
              "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-700 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
              isVisible && `delay-${index * 100}`,
            )}
          >
            <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <option.icon className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">{option.title}</h3>
            <p className="text-muted-foreground mb-4">{option.description}</p>
            <Button asChild variant="outline" className="w-full">
              <Link href={option.href}>{option.action}</Link>
            </Button>
          </div>
        ))}
      </div>
    </section>
  )
}
