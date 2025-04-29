"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Cog, Factory, Workflow, Package, Lightbulb, Wrench, Cpu } from "lucide-react"
import Image from 'next/image'
import { createClient } from "@/supabase/config"
import { Service } from "@/types"


export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
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

    const element = document.getElementById("services-list")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
      async function fetchServices() {
        const supabase = createClient();
        const { data } = await supabase
          .from('services')
          .select('*')
          .order('id');
  
        if (data) {
          setServices(data);
        }
  
        setIsLoading(false);
      }
      fetchServices();
    }, []);

  return (
    <section id="services-list" className="py-20">
      <div className="space-y-32">
        {services.map((service, index) => (
          <div
            key={index}
            id={service.id}
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center transition-all duration-500 ease-out",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-20",
              isVisible && `delay-[${index * 75}ms]`
            )}
          >
            <div className={cn("order-2 lg:order-1 space-y-6", index % 2 !== 0 && "lg:order-2")}>
              <div className="flex items-center gap-4 mb-6">
                <h3 className="text-3xl font-bold tracking-tight text-secondry">
                  {service.title}
                </h3>
              </div>

              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {service.description}
              </p>

              <div className="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-900/80 rounded-2xl p-8 shadow-sm">
                <h4 className="font-semibold text-lg mb-6">Key Features:</h4>
                <ul className="space-y-4">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start group">
                      <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center mr-4 mt-1 transition-colors group-hover:bg-primary/30">
                        <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                      </div>
                      <span className="text-base leading-snug">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={cn("order-1 lg:order-2 relative group", index % 2 !== 0 && "lg:order-1")}>
              <div className="rounded-2xl overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 transition-transform duration-300 hover:scale-[1.02]">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  width={800}
                  height={500}
                  className="w-full h-auto object-cover aspect-video"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
