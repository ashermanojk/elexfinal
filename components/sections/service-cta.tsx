"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight, Phone, Mail } from "lucide-react"

export default function ServiceCta() {
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

    const element = document.getElementById("service-cta")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="service-cta" className="py-12">
      <div
        className={cn(
          "relative rounded-2xl overflow-hidden bg-slate-900 text-white p-12 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        )}
      >
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(#f97316_1px,transparent_1px)] [background-size:20px_20px]"></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/30 rounded-full blur-3xl"></div>

        <div className="relative z-10 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Automate Your Operations?</h2>
          <p className="text-xl text-slate-300 mb-8">
            Contact us today to discuss your specific automation needs and discover how our solutions can transform your
            business.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
            <Button asChild size="lg" className="text-base">
              <Link href="/contact">
                Request a Consultation
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="text-base bg-transparent border-white hover:bg-white/10"
            >
              <Link href="/projects">View Our Projects</Link>
            </Button>
          </div>

          <div className="flex flex-col md:flex-row justify-center gap-6 text-slate-300">
            <div className="flex items-center justify-center">
              <Phone className="h-5 w-5 mr-2" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center justify-center">
              <Mail className="h-5 w-5 mr-2" />
              <span>info@elextrioautomation.com</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
