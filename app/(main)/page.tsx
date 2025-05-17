"use client";

import HeroSection from "../../components/home/hero-section"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, CheckCircle2, ChevronRight } from "lucide-react"
import Image from "next/image"
import { useState, useEffect } from "react"
import { Service } from "@/types"
import { createClient } from "@/supabase/config"
import aboutImage from "@/public/images/1.png"
import CtaSection from "@/components/sections/cta-section";
import { useContent } from "@/components/ContentProvider"

export default function Home() {
  const { getContentText, getContentArray } = useContent();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  // Use content for stats section
  const statsData = [
    {
      id: "projects-completed",
      valueId: "home-stats-projects-value",
      labelId: "home-stats-projects-label",
      descriptionId: "home-stats-projects-description",
      defaultValue: "30+",
      defaultLabel: "Projects Completed",
      defaultDescription: "Successfully delivered automation solutions across industries",
    },
    {
      id: "client-satisfaction",
      valueId: "home-stats-satisfaction-value",
      labelId: "home-stats-satisfaction-label",
      descriptionId: "home-stats-satisfaction-description",
      defaultValue: "95%",
      defaultLabel: "Client Satisfaction",
      defaultDescription: "Our clients rate our services and solutions highly",
    },
    {
      id: "support-availability",
      valueId: "home-stats-support-value",
      labelId: "home-stats-support-label",
      descriptionId: "home-stats-support-description",
      defaultValue: "24/7",
      defaultLabel: "Support",
      defaultDescription: "Round-the-clock technical assistance for our clients",
    },
  ];

  return (
    <>
      <HeroSection />

      {/* Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={getContentText("home-services-heading", "Our Services")}
            subtitle={getContentText("home-services-subheading", "We offer a comprehensive range of automation solutions tailored to your specific needs.")}
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-card rounded-xl overflow-hidden shadow-md border border-border hover:shadow-lg transition-shadow group"
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
                      Learn More <ChevronRight className="ml-1 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link href="/services">
                View All Services
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {getContentText("home-section3-heading", "Delivering Excellence in")} <span className="text-primary">Industrial Automation</span>
              </h2>
              <p className="text-muted-foreground mb-6">
                {getContentText("home-section3-subheading", "At Elextrio Automation, we specialize in providing cutting-edge industrial automation solutions and custom-built special-purpose machines. Our focus is on delivering value-driven, efficient, and innovative systems tailored to the unique needs of our clients.")}
              </p>

              <ul className="space-y-3 mb-8">
                {getContentArray("home-section3-points", aboutPoints).map((point, index) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

              <Button asChild>
                <Link href="/about">
                  Learn More About Us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 blur-3xl" />
                <div className="absolute inset-0 rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(67,56,202,0.15),transparent_70%)]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3/4 h-3/4 relative">
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/40 to-secondary/40 rounded-xl animate-float" />
                      <div className="absolute top-10 left-10 right-10 bottom-10 bg-slate-100 dark:bg-slate-900 rounded-lg shadow-lg flex items-center justify-center">

                        <Image
                          src={aboutImage}
                          alt="About Us"
                          className="object-cover w-full h-full rounded-lg animate-float bg-inherit"
                          fill
                        />

                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background items-center justify-center">
        <div className="container mx-auto px-4 items-center justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {statsData.map((stat) => (
              <div key={stat.id} className="bg-card rounded-xl p-6 text-center border border-border shadow-sm">
                <div className="text-4xl font-bold text-primary mb-2">
                  {getContentText(stat.valueId, stat.defaultValue)}
                </div>
                <div className="text-lg font-medium">
                  {getContentText(stat.labelId, stat.defaultLabel)}
                </div>
                <p className="text-muted-foreground text-sm mt-2">
                  {getContentText(stat.descriptionId, stat.defaultDescription)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection/>
    </>
  )
}


const aboutPoints = [
  "Small to medium-scale projects delivered within six months",
  "Cutting-edge technology and innovative solutions",
  "Focus on simplicity and maintainability",
  "Customer-centric approach with long-term partnerships",
  "Precision engineering and adaptability",
]
