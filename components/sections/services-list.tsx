"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Cog, Factory, Workflow, Package, Lightbulb, Wrench, Cpu } from "lucide-react"
import Image from 'next/image'
import { createClient } from "@/supabase/config"
import { Service } from "@/types"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ServicesList() {
  const [services, setServices] = useState<Service[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    containScroll: 'trimSnaps',
  }, [Autoplay({ delay: 10000, stopOnInteraction: true })]);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollTo = useCallback((index: number) => emblaApi && emblaApi.scrollTo(index), [emblaApi]);
  const scrollPrev = useCallback(() => emblaApi && emblaApi.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi && emblaApi.scrollNext(), [emblaApi]);

  useEffect(() => {
    if (emblaApi) {
      const onSelect = () => {
        setSelectedIndex(emblaApi.selectedScrollSnap());
      };
      const onResize = () => {
        setScrollSnaps(emblaApi.scrollSnapList());
      }
      emblaApi.on('select', onSelect);
      emblaApi.on('reInit', onSelect); // Also update on reInit
      emblaApi.on('reInit', onResize); // Also update on reInit
      emblaApi.on('resize', onResize); // Update on resize

      onSelect(); // Initial call
      setScrollSnaps(emblaApi.scrollSnapList()); // Initial call
      return () => {
        emblaApi.off('select', onSelect);
        emblaApi.off('reInit', onSelect);
        emblaApi.off('reInit', onResize);
        emblaApi.off('resize', onResize);
      };
    }
  }, [emblaApi]);

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

    const element = document.getElementById("services-list-carousel") // Changed ID
    if (element) observer.observe(element)

    return () => {
      if (element) observer.unobserve(element); // Clean up observer
      observer.disconnect()
    }
  }, [])

  useEffect(() => {
    async function fetchServices() {
      setIsLoading(true); // Set loading true at the start
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

  if (isLoading) {
    return (
      <section id="services-list-carousel" className="py-20 container mx-auto text-center">
        <p>Loading services...</p>
      </section>
    );
  }

  if (!services.length) {
    return (
      <section id="services-list-carousel" className="py-20 container mx-auto text-center">
        <p>No services available at the moment.</p>
      </section>
    );
  }

  return (
    <section id="services-list-carousel" className="py-20 relative container mx-auto">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex"> {/* Embla Carousel flex container */}
          {services.map((service, index) => (
            <div
              key={service.id} // Use unique service.id as key
              className={cn(
                "flex-[0_0_100%] min-w-0 px-4", // Each slide takes full width, px for spacing
                "transition-opacity duration-700 ease-out", // Opacity transition
                isVisible ? "opacity-100" : "opacity-0"
                // Removed translate-y and delay for carousel context
              )}
            >
              {/* Original slide content structure */}
              <div className={cn(
                "grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
                // Delay on individual items might be tricky with carousel, consider removing or adapting
                // isVisible && `delay-[${index * 75}ms]` 
              )}>
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
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <Button
        onClick={scrollPrev}
        variant="default"
        size="icon"
        className="absolute bottom-8 left-6 z-10 rounded-full shadow-xl !p-3 bg-background/80 hover:bg-background/100 backdrop-blur-sm border border-border"
        aria-label="Previous project"
      >
        <ChevronLeft className="h-5 w-5 text-foreground" />
      </Button>
      <Button
        onClick={scrollNext}
        variant="default"
        size="icon"
        className="absolute bottom-8 right-6 z-10 rounded-full shadow-xl !p-3 bg-background/80 hover:bg-background/100 backdrop-blur-sm border border-border"
        aria-label="Next project"
      >
        <ChevronRight className="h-5 w-5 text-foreground" />
      </Button>

      {/* Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
        {scrollSnaps.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all duration-300",
              index === selectedIndex ? "bg-primary w-4" : "bg-primary/20 hover:bg-primary/40"
            )}
            onClick={() => scrollTo(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  )
}
