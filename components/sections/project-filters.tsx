"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

const categories = [
  "All",
  "Manufacturing",
  "Food & Beverage",
  "Pharmaceutical",
  "Automotive",
  "Electronics",
  "Chemical",
]

export default function ProjectFilters() {
  const [activeCategory, setActiveCategory] = useState("All")

  return (
    <section className="py-6">
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className="rounded-full"
            >
              {category}
            </Button>
          ))}
        </div>

        <div className="relative w-full md:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="Search projects..." className="pl-10 w-full md:w-64" />
        </div>
      </div>
    </section>
  )
}
