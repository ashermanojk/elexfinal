"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Globe, Building, Tag, Loader2 } from "lucide-react";
import Link from "next/link";
import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { createClient } from "@/supabase/config";
import { toast } from "@/hooks/use-toast";
import PageHeader from "@/components/layout/page-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";

// Project type definition
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
  challenge?: string;
  solution?: string;
  results?: string;
  technologies?: string[];
  gallery_images?: string[];
  completion_date?: string;
};

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        setLoading(true);
        const supabase = createClient();
        
        const { data, error } = await supabase
          .from('projects')
          .select('*')
          .eq('slug', id)
          .single();
        
        if (error) {
          throw error;
        }
        
        if (!data) {
          setError("Project not found");
          return;
        }
        
        setProject(data);
      } catch (error: any) {
        console.error('Error fetching project:', error);
        setError("Failed to load project details");
        toast({
          title: "Error loading project",
          description: "Please try again later",
          variant: "destructive"
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (id) {
      fetchProject();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary mr-2" />
        <span>Loading project details...</span>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="flex flex-col justify-center items-center min-h-[60vh]">
        <h2 className="text-2xl font-bold mb-4">{error || "Project not found"}</h2>
        <Button asChild>
          <Link href="/projects">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <>
      {/* Hero Section with Gradient Background */}
      <div className="relative w-full min-h-[40vh] md:min-h-[50vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient backgrounds */}
        <motion.div
          className="absolute inset-0 bg-foreground/10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),rgba(255,255,255,0))]"
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
            <Button variant="ghost" className="mb-6" asChild>
              <Link href="/projects">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Projects
              </Link>
            </Button>
            <PageHeader
              title={project.title}
              description={project.description}
            />
          </motion.div>
        </div>
      </div>

      {/* Project Details */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Project Image */}
              {project.image_url ? (
                <div className="w-full rounded-xl overflow-hidden mb-8 border border-border">
                  <img 
                    src={project.image_url} 
                    alt={project.title} 
                    className="w-full h-auto object-cover" 
                  />
                </div>
              ) : (
                <div className="w-full aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl overflow-hidden mb-8 border border-border">
                  <div className="w-full h-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                    <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                      <div className="w-10 h-10 rounded-full bg-primary" />
                    </div>
                  </div>
                </div>
              )}

              {/* Project Tabs */}
              <Tabs defaultValue="overview" className="mt-8">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="challenge">Challenge & Solution</TabsTrigger>
                  <TabsTrigger value="results">Results</TabsTrigger>
                </TabsList>
                
                <TabsContent value="overview" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-bold mb-4">Project Overview</h3>
                        <p className="text-muted-foreground">{project.description}</p>
                        
                        {project.technologies && (
                          <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-3">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech, index) => (
                                <span 
                                  key={index}
                                  className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="challenge" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-bold mb-4">Challenge</h3>
                        <p className="text-muted-foreground mb-6">
                          {project.challenge || "No challenge information available."}
                        </p>
                        
                        <h3 className="text-xl font-bold mb-4">Solution</h3>
                        <p className="text-muted-foreground">
                          {project.solution || "No solution information available."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="results" className="mt-6">
                  <Card>
                    <CardContent className="pt-6">
                      <div className="prose dark:prose-invert max-w-none">
                        <h3 className="text-xl font-bold mb-4">Results & Impact</h3>
                        <p className="text-muted-foreground">
                          {project.results || "No results information available."}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>

              {/* Project Gallery */}
              {project.gallery_images && project.gallery_images.length > 0 && (
                <div className="mt-10">
                  <SectionHeading title="Project Gallery" />
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    {project.gallery_images.map((image, index) => (
                      <div key={index} className="rounded-xl overflow-hidden border border-border">
                        <img 
                          src={image} 
                          alt={`${project.title} gallery image ${index + 1}`} 
                          className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300" 
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-6">Project Details</h3>
                  
                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Building className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm font-medium mb-1">Client</p>
                        <p className="text-muted-foreground">{project.client}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Globe className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm font-medium mb-1">Industry</p>
                        <p className="text-muted-foreground">{project.industry}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Tag className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm font-medium mb-1">Category</p>
                        <p className="text-muted-foreground">{project.category}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start">
                      <Clock className="h-5 w-5 mr-3 text-primary" />
                      <div>
                        <p className="text-sm font-medium mb-1">Duration</p>
                        <p className="text-muted-foreground">{project.duration}</p>
                      </div>
                    </div>
                    
                    {project.completion_date && (
                      <div className="flex items-start">
                        <Calendar className="h-5 w-5 mr-3 text-primary" />
                        <div>
                          <p className="text-sm font-medium mb-1">Completion Date</p>
                          <p className="text-muted-foreground">{project.completion_date}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border">
                    <Button className="w-full">
                      <Link href="/contact" className="w-full flex items-center justify-center">
                        Discuss a Similar Project
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading 
            title="More Projects to Explore" 
            subtitle="Discover more of our automation solutions across different industries."
            centered
          />
          
          <div className="mt-8 text-center">
            <Button asChild>
              <Link href="/projects">
                View All Projects
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
