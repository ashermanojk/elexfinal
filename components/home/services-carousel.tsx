import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, ChevronRightIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Service } from '@/types'
import { cn } from '@/lib/utils'

interface ServicesCarouselProps {
  services: Service[]
}

export default function ServicesCarousel({ services }: ServicesCarouselProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: true,
    slidesToScroll: 1,
    breakpoints: {
      '(min-width: 1024px)': { slidesToScroll: 3 }
    }
  })

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {services.map((service, index) => (
            <div
              key={index}
              className={cn(
                "flex-[0_0_90%] lg:flex-[0_0_30%]",
                "bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-shadow group mx-4"
              )}
            >
              <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <Image
                  src={service.image}
                  alt={service.title}
                  width={400}
                  height={300}
                  className="object-cover w-full h-48 rounded-t-xl group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground mb-4">{service.description}</p>
                <Button asChild variant="link" className="p-0 h-auto font-medium">
                  <Link href={`/services`}>
                    Learn More <ChevronRightIcon className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-transparent"
        onClick={scrollPrev}
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>
      
      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-transparent"
        onClick={scrollNext}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
} 