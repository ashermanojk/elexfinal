// components/HeroSection.tsx
"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Spotlight } from "@/components/ui/spotlight"
import { ArrowRight, ChevronRight } from "lucide-react"
import { motion } from "framer-motion"
import CircularCarousel from "@/components/ui/image-carousel"

import img1 from "./../../public/images/services/industrial_automation.png"
import img2 from "./../../public/images/services/contract_manufacturing.png"
import img3 from "./../../public/images/services/process_automation.png"
import img4 from "./../../public/images/services/product_development.png"
import img5 from "./../../public/images/services/special_purpose.png.png"
import img6 from "./../../public/images/services/turnkey_projects.png"

export default function HeroSection() {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])

  // Sample carousel images - replace with your actual images
  const carouselImages = [
    {
      src: img1,
      alt: "Industrial automation solution",
    },
    {
      src: img2,
      alt: "Smart factory system",
    },
    {
      src: img3,
      alt: "Smart factory system",
    },
    {
      src: img4,
      alt: "Smart factory system",
    },
    {
      src: img5,
      alt: "Smart factory system",
    },
    {
      src: img6,
      alt: "Precision manufacturing equipment",
    },
  ];

  if (!mounted) return null

  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-slate-950">
      <Spotlight className="hidden md:block" />
      {/* Background gradient */}
      <div className="absolute inset-0 bg-background bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),rgba(255,255,255,0))] pointer-events-none" />

      <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
        {/* Custom layout with text on left and carousel on right */}
        <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* Text content with higher z-index */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-30 max-w-xl lg:max-w-2xl text-center lg:text-left"
          >
             {/* Ensure text alignment is left within this div */}
            <div className="text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-secondry-foreground mb-6 leading-tight">
                Smart Automation <br />
                <span className="text-primary">Solutions</span> for <br />
                <span className="text-secondary">Industry Excellence</span>
              </h1>
              <p className="text-lg md:text-xl text-secondry/10 mb-8">
                Delivering innovative industrial automation solutions and special-purpose machines that empower businesses
                to achieve efficiency, precision, and reliability.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-start">
                <Button asChild size="lg" className="rounded-full">
                  <Link href="/services">
                    Explore Services
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  size="lg"
                  className="rounded-full border-slate-700 text-secondry/10 hover:bg-slate-800"
                >
                  <Link href="/contact">
                    Contact Us
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>

          {/* Carousel positioned to overlap on the right */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative z-20 w-full h-full lg:w-1/2 aspect-video flex justify-center items-center"
          >
            {/* Create a soft glow behind the carousel */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl rounded-full opacity-60" />
            
            {/* Circular 3D carousel */}
            <div className="w-full h-full">
              <CircularCarousel
                images={carouselImages}
                autoplaySpeed={5000}
                className="w-full h-full"
              />
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center z-10">
          <div className="animate-bounce">
            <div className="w-8 h-12 rounded-full border-2 border-slate-400 flex items-start justify-center p-1">
              <div className="w-1 h-3 bg-slate-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}