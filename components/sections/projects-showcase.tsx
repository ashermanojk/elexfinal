"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ArrowRight, Loader2, ChevronLeft, ChevronRight } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { createClient } from "@/supabase/config"
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { motion } from "framer-motion"
type Project = {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  client: string;
  industry: string;
  duration: string;
  is_featured: boolean;
  image_url?: string;
};

export default function ProjectsShowcase() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      containScroll: 'trimSnaps',
    },
    [Autoplay({ delay: 7000, stopOnInteraction: true, stopOnMouseEnter: true })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((index: number) => emblaApi?.scrollTo(index), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap());
    const onResize = () => {
      setScrollSnaps(emblaApi.scrollSnapList());
    }

    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    emblaApi.on('resize', onResize);

    onSelect();
    onResize();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('reInit', onSelect);
      emblaApi.off('resize', onResize);
    };
  }, [emblaApi]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const supabase = createClient();
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setFeaturedProjects(data || []);
      } catch (error: any) {
        console.error('Error fetching projects:', error);
        toast({
          title: "Error loading projects",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section className="pt-20 pb-20 bg-background">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
            <span>Loading featured projects...</span>
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="text-center py-12 bg-card rounded-xl border border-border mt-12">
            <p className="text-muted-foreground">No featured projects available at the moment.</p>
          </div>
        ) : (
          <div className="relative">
            <div className="overflow-hidden rounded-xl" ref={emblaRef}>
              <div className="flex">
                {featuredProjects.map((project) => (
                  <div
                    key={project.id}
                    className={cn(
                      "flex-[0_0_100%] min-w-0",
                      "p-1",
                    )}
                  >
                    <div className="bg-card rounded-xl overflow-hidden border border-border shadow-lg flex flex-col h-full">
                      <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                        <div className="order-1 bg-gradient-to-br from-primary/5 to-secondary/5 flex items-center justify-center p-6 lg:p-8 h-full">
                          {project.image_url ? (
                            <div className="aspect-video w-full max-w-md rounded-lg overflow-hidden shadow-md animate-float">
                              <img
                                src={project.image_url}
                                alt={project.title}
                                className="w-full h-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="aspect-video w-full max-w-md bg-slate-200 dark:bg-slate-700 rounded-lg overflow-hidden shadow-md">
                              <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                                <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                                  <div className="w-8 h-8 rounded-full bg-primary animate-pulse" />
                                </div>
                              </div>
                            </div>
                          )}
                        </div>

                        <div className="order-2 p-6 lg:p-8 flex flex-col justify-between h-full">
                          <div>
                            <div className="mb-3">
                              <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full tracking-wide">
                                {project.category}
                              </span>
                            </div>
                            {/* Title with consistent height */}
                            <h3 className="text-xl lg:text-2xl font-bold mb-3 line-clamp-2 min-h-[3rem]">
                              {project.title}
                            </h3>
                            {/* Description with consistent height */}
                            <p className="text-muted-foreground text-sm lg:text-base mb-4">
                              {project.description}
                            </p>
                          </div>
                          <div>
                            <div className="space-y-2 text-sm mb-5">
                              <div><span className="font-medium text-muted-foreground">Client:</span> {project.client}</div>
                              <div><span className="font-medium text-muted-foreground">Industry:</span> {project.industry}</div>
                              <div><span className="font-medium text-muted-foreground">Duration:</span> {project.duration}</div>
                            </div>
                            <Link href={`/contact`} className="flex items-center justify-center mt-auto text-primary font-semibold hover:underline">
                              Discuss Project
                              <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {featuredProjects.length > 1 && (
              <>
                <Button
                  onClick={scrollPrev}
                  variant="default"
                  size="icon"
                  className="absolute bottom-[-45px] left-6 z-10 rounded-full shadow-xl !p-3 bg-background/80 hover:bg-background/100 backdrop-blur-sm border border-border"
                  aria-label="Previous project"
                >
                  <ChevronLeft className="h-5 w-5 text-foreground" />
                </Button>
                <Button
                  onClick={scrollNext}
                  variant="default"
                  size="icon"
                  className="absolute bottom-[-45px] right-6 z-10 rounded-full shadow-xl !p-3 bg-background/80 hover:bg-background/100 backdrop-blur-sm border border-border"
                  aria-label="Next project"
                >
                  <ChevronRight className="h-5 w-5 text-foreground" />
                </Button>
              </>
            )}

            {featuredProjects.length > 1 && (
              <div className="absolute bottom-[-35px] left-1/2 -translate-x-1/2 flex gap-2.5 mt-4">
                {scrollSnaps.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => scrollTo(index)}
                    className={cn(
                      "w-2.5 h-2.5 rounded-full transition-all duration-300 ease-out",
                      index === selectedIndex ? "bg-primary scale-110 w-4" : "bg-primary/30 hover:bg-primary/50"
                    )}
                    aria-label={`Go to project ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
