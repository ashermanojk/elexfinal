"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { StaticImageData } from "next/image"

interface CarouselImage {
  src: string | StaticImageData
  alt: string
}

interface CircularCarouselProps {
  images: CarouselImage[]
  autoplaySpeed?: number
  className?: string
  radius?: number
  imageSize?: number
}

export default function CircularCarousel({
  images,
  autoplaySpeed = 5000,
  className = "",
  radius = 350,
  imageSize = 400,
}: CircularCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovering, setIsHovering] = useState(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  // Auto-rotate images unless hovering
  useEffect(() => {
    if (images.length <= 1 ) return

    const nextSlide = () => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(nextSlide, autoplaySpeed)

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, autoplaySpeed, images.length, isHovering])

  const handleNext = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
  }

  const handlePrev = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
  }

  const handleImageClick = (index: number) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    setCurrentIndex(index)
  }

  // If no images are provided
  if (!images || images.length === 0) {
    return <div className={cn("relative w-full aspect-video bg-slate-100 rounded-lg", className)} />
  }

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full aspect-video", className)}
      style={{ perspective: "1200px" }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* Container for the circular carousel */}
      <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: "preserve-3d" }}>
        {images.map((image, index) => {
          // Calculate the angle for this image in a continuous circular fashion
          const angleStep = (2 * Math.PI) / images.length
          // Calculate the shortest angular distance for a truly circular animation
          let angleDiff = (((index - currentIndex) % images.length) + images.length) % images.length
          if (angleDiff > images.length / 2) angleDiff -= images.length
          const angle = angleStep * angleDiff

          // Calculate position on the circle
          const x = radius * Math.sin(angle)
          const z = radius * Math.cos(angle) - radius

          // Calculate visual properties based on position
          const isActive = index === currentIndex

          // Calculate the shortest circular distance
          const diff = Math.abs(index - currentIndex)
          const distanceFromActive = Math.min(diff, images.length - diff)

          // Scale and opacity based on distance from active item
          const scale = isActive ? 1.5 : Math.max(0.65, 1 - distanceFromActive * 0.15)
          const opacity = isActive ? 1 : Math.max(0.4, 1 - distanceFromActive * 0.2)

          // Z-index to ensure proper layering
          const zIndex = images.length - distanceFromActive

          return (
            <motion.div
              key={`carousel-image-${index}`}
              className={cn(
                "absolute cursor-pointer rounded-lg overflow-hidden transition-shadow duration-300",
                isActive ? "shadow-2xl ring-2 ring-primary/50" : "shadow-lg",
              )}
              style={{
                width: `${imageSize}px`,
                height: `${imageSize * 0.6}px`,
                zIndex,
                transformStyle: "preserve-3d",
              }}
              initial={false}
              animate={{
                x,
                z,
                rotateY: `${-angle * (180 / Math.PI)}deg`,
                scale,
                opacity,
              }}

              transition={{
                  type:"spring",
                  stiffness:300,
                  damping:30,
                  mass:2
                }}
              onClick={() => handleImageClick(index)}
            >
              <div className="relative w-full h-full">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  sizes={`${imageSize}px`}
                  className={cn(
                    "object-cover transition-all duration-300",
                    isActive ? "brightness-100" : "brightness-90",
                  )}
                  priority={isActive}
                />
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-b from-black/30 to-transparent pointer-events-none transition-opacity duration-300",
                    isActive ? "opacity-30" : "opacity-50",
                  )}
                />
              </div>
            </motion.div>
          )
        })}
      </div>

      {/* Controls - visible only for multiple images */}
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-lg backdrop-blur-sm transition-all z-50 hover:scale-105"
            aria-label="Previous image"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/90 text-slate-800 hover:bg-white shadow-lg backdrop-blur-sm transition-all z-50 hover:scale-105"
            aria-label="Next image"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}

      {/* Indicators */}
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-50">
          {images.map((_, index) => (
            <button
              key={`indicator-${index}`}
              onClick={() => handleImageClick(index)}
              className={cn(
                "transition-all duration-300 rounded-full",
                index === currentIndex ? "w-8 h-2 bg-white" : "w-2 h-2 bg-white/50 hover:bg-white/70",
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
