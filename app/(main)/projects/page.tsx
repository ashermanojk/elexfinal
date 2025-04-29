"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/supabase/config";
import { toast } from "@/hooks/use-toast";

// Define project type
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

export default function ProjectsPage() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const supabase = createClient();
        
        // Fetch featured projects from Supabase
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('is_featured', true)
          .order('created_at', { ascending: false });
        
        if (error) {
          throw error;
        }
        
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
    <>
      <div className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient backgrounds */}
        <motion.div
          className="absolute inset-0 bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),rgba(255,255,255,0))]"
          initial={{ opacity: 1, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        />
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),transparent_60%)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        />

        {/* Content container with responsive padding */}
        <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 relative z-10">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              duration: 0.5,
              delay: 0.3,
              type: "spring",
              damping: 8,
            }}
          >
            <PageHeader
              title="Our Projects"
              description="Explore our portfolio of successful automation implementations"
            />
          </motion.div>
        </div>
      </div>

      {/* Featured Projects */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Featured Projects"
            subtitle="Explore some of our most innovative and impactful automation solutions."
            centered
          />

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
            <div className="grid grid-cols-1 gap-12 mt-12">
              {featuredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="bg-card rounded-xl overflow-hidden border border-border shadow-sm"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div
                      className={`${
                        index % 2 === 0 ? "order-1" : "order-1 lg:order-2"
                      }`}
                    >
                      <div className="h-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center p-8">
                        {project.image_url ? (
                          <div className="aspect-video w-full rounded-xl overflow-hidden">
                            <img 
                              src={project.image_url} 
                              alt={project.title}
                              className="w-full h-full object-cover" 
                            />
                          </div>
                        ) : (
                          <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden">
                            <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                              <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                                <div className="w-10 h-10 rounded-full bg-primary" />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div
                      className={`p-8 flex flex-col justify-center ${
                        index % 2 === 0 ? "order-2" : "order-2 lg:order-1"
                      }`}
                    >
                      <div className="mb-4">
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                          {project.category}
                        </span>
                      </div>
                      <h3 className="text-2xl font-bold mb-4">{project.title}</h3>
                      <p className="text-muted-foreground mb-6">
                        {project.description}
                      </p>
                      <div className="space-y-3 mb-6">
                        <div>
                          <span className="font-medium">Client:</span>{" "}
                          {project.client}
                        </div>
                        <div>
                          <span className="font-medium">Industry:</span>{" "}
                          {project.industry}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span>{" "}
                          {project.duration}
                        </div>
                      </div>
                      <Button asChild>
                        <Link href={`/projects/${project.slug}`}>
                          View Project Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Project Categories */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Project Categories"
            subtitle="Browse our projects by category to find relevant examples for your industry."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{category.name}</h3>
                <p className="text-muted-foreground mb-4">
                  {category.description}
                </p>
                <Button
                  asChild
                  variant="link"
                  className="p-0 h-auto font-medium"
                >
                  <Link href={`/projects/category/${category.slug}`}>
                    View Projects <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Client Testimonials"
            subtitle="Hear what our clients have to say about our automation solutions."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border shadow-sm"
              >
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="w-12 h-12 rounded-full bg-slate-200 dark:bg-slate-700"></div>
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.position}, {testimonial.company}
                    </p>
                  </div>
                </div>
                <p className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(67,56,202,0.3),rgba(255,126,0,0.2))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Start Your Next Project?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Contact us today to discuss how we can help you achieve your
              automation goals.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

const categories = [
  {
    name: "Manufacturing Automation",
    slug: "manufacturing-automation",
    description:
      "Automated systems for production lines, assembly processes, and quality control in manufacturing environments.",
  },
  {
    name: "Process Automation",
    slug: "process-automation",
    description:
      "Solutions for automating continuous and batch processes in various industries including chemical, food, and pharmaceuticals.",
  },
  {
    name: "Industrial IoT",
    slug: "industrial-iot",
    description:
      "Smart connected systems leveraging IoT technology for data-driven automation and monitoring.",
  },
  {
    name: "Robotics Integration",
    slug: "robotics-integration",
    description:
      "Implementation of robotic systems for material handling, assembly, and other manufacturing tasks.",
  },
  {
    name: "Custom Machinery",
    slug: "custom-machinery",
    description:
      "Special purpose machines designed and built for specific manufacturing requirements.",
  },
  {
    name: "Control Systems",
    slug: "control-systems",
    description:
      "Advanced control systems for precise management of industrial processes and equipment.",
  },
];

const testimonials = [
  {
    name: "Amit Patel",
    position: "Operations Director",
    company: "AutoParts Manufacturing Ltd.",
    quote:
      "Elextrio Automation delivered an exceptional assembly line solution that exceeded our expectations. Their attention to detail and commitment to quality resulted in significant improvements in our production efficiency.",
  },
  {
    name: "Dr. Priya Sharma",
    position: "Production Head",
    company: "MediPharm Solutions",
    quote:
      "The packaging system implemented by Elextrio has transformed our production capabilities while ensuring we maintain compliance with all regulatory requirements. Their team's expertise was evident throughout the project.",
  },
  {
    name: "Rajiv Mehta",
    position: "Logistics Manager",
    company: "Global Logistics Inc.",
    quote:
      "The warehouse management system has revolutionized our operations. Real-time tracking and analytics have given us unprecedented visibility into our inventory and processes, leading to substantial cost savings.",
  },
];
