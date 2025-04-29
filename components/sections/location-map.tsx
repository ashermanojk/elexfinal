"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export default function LocationMap() {
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

    const element = document.getElementById("location-map")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="location-map" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Our Location</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Visit our headquarters to discuss your automation needs in person.
        </p>
      </div>

      <div
        className={cn(
          "rounded-xl overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-1000",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        )}
      >
        <div className="aspect-[21/9] w-full h-full">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.389540923284!2d77.62241777454807!3d13.074480812615437!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae19e1d46840c5%3A0x3bed0b666ff24bb1!2sELEXTRIO%20AUTOMATION%20Pvt%20Ltd!5e0!3m2!1sen!2sin!4v1745919899408!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full"
            title="Our Location"
          ></iframe>
        </div>
      </div>
    </section>
  )
}
