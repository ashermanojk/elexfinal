"use client"

import { useRef, useState, useEffect } from "react"
import { cn } from "@/lib/utils"

interface SpotlightProps {
  className?: string
  fill?: string
}

export function Spotlight({ className, fill = "white" }: SpotlightProps) {
  const divRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (divRef.current) {
        const rect = divRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    const handleMouseEnter = () => {
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const div = divRef.current
    if (div) {
      div.addEventListener("mousemove", handleMouseMove)
      div.addEventListener("mouseenter", handleMouseEnter)
      div.addEventListener("mouseleave", handleMouseLeave)
    }

    return () => {
      if (div) {
        div.removeEventListener("mousemove", handleMouseMove)
        div.removeEventListener("mouseenter", handleMouseEnter)
        div.removeEventListener("mouseleave", handleMouseLeave)
      }
    }
  }, [])

  return (
    <div ref={divRef} className={cn("relative overflow-hidden", className)}>
      <div
        className={cn(
          "pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300",
          isVisible && "opacity-100",
        )}
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, ${fill}10 0%, transparent 40%)`,
        }}
      />
    </div>
  )
}
