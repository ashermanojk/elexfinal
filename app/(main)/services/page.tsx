"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import PageHeader from "@/components/layout/page-header";
import { motion } from "framer-motion";
import ServicesList from "@/components/sections/services-list";
import CtaSection from "@/components/sections/cta-section";
import { useContent } from "@/components/ContentProvider";
import { ArrowRight, CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function ServicesPage() {
  const { getContentText, getContentArray } = useContent();
  
  return (
    <>
      <div className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient backgrounds */}
        <motion.div
          className="absolute inset-0 bg-foreground/10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),rgba(255,255,255,0))]"
          initial={{ opacity: 1, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
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
              stiffness: 100,
            }}
          >
            <PageHeader
              title={getContentText("services-main-heading", "Our Services")}
              description={getContentText("services-main-subheading", "Comprehensive automation solutions tailored to your industry needs")}
            />
          </motion.div>
        </div>
      </div>

      {/* Services List */}
      <div className="container mx-auto px-4">
        <ServicesList />
      </div>

      {/* Process Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={getContentText("services-process-heading", "Our Process")}
            subtitle={getContentText("services-process-subheading", "We follow a structured approach to deliver successful automation projects.")}
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {getContentArray("services-process-steps", defaultProcessSteps).map((step, index) => {
              // Split the content by comma if it has one (for title and description)
              const [title, description] = step.includes(',') 
                ? [step.split(',')[0].trim(), step.split(',')[1].trim()]
                : [defaultProcessTitles[index], defaultProcessDescriptions[index]];
              
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm relative overflow-hidden group hover:shadow-md transition-all duration-300"
                >
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg z-10">
                    {index + 1}
                  </div>
                  <div className="absolute -right-8 -bottom-8 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 transition-colors duration-300"></div>
                  <h3 className="text-xl font-semibold mb-3 mt-4">
                    {title}
                  </h3>
                  <p className="text-muted-foreground">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Start Your Project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={getContentText("services-industries-heading", "Industries We Serve")}
            subtitle={getContentText("services-industries-subheading", "Our automation solutions cater to diverse industrial sectors.")}
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {getContentArray("services-industries", defaultIndustries).map((industry, index) => {
              // Split the content by comma if it has one (for name and description)
              const [name, description] = industry.includes(',') 
                ? [industry.split(',')[0].trim(), industry.split(',')[1].trim()]
                : [defaultIndustryNames[index], defaultIndustryDescriptions[index]];
              
              return (
                <div
                  key={index}
                  className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors duration-300">
                    <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <CheckCircle className="h-4 w-4 text-white" />
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">
                    {name}
                  </h3>
                  <p className="text-muted-foreground">
                    {description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection/>
    </>
  );
}

// Fallback data for process steps as string array (title, description format with comma separation)
const defaultProcessSteps = [
  "Consultation, We begin by understanding your specific needs, challenges, and objectives through detailed discussions and site visits.",
  "Design & Planning, Our team develops a comprehensive solution design, including technical specifications, timelines, and resource requirements.",
  "Implementation, We execute the project according to the approved plan, ensuring quality, safety, and adherence to timelines.",
  "Support & Maintenance, After deployment, we provide ongoing support, training, and maintenance to ensure optimal system performance."
];

// Separate arrays for fallback display
const defaultProcessTitles = [
  "Consultation",
  "Design & Planning",
  "Implementation",
  "Support & Maintenance"
];

const defaultProcessDescriptions = [
  "We begin by understanding your specific needs, challenges, and objectives through detailed discussions and site visits.",
  "Our team develops a comprehensive solution design, including technical specifications, timelines, and resource requirements.",
  "We execute the project according to the approved plan, ensuring quality, safety, and adherence to timelines.",
  "After deployment, we provide ongoing support, training, and maintenance to ensure optimal system performance."
];

// Fallback data for industries as string array (name, description format with comma separation)
const defaultIndustries = [
  "Manufacturing, Automation solutions for various manufacturing sectors, including discrete and process manufacturing.",
  "Automotive, Specialized automation for automotive component production and assembly operations.",
  "Pharmaceuticals, Precision automation systems compliant with strict regulatory requirements for pharmaceutical production.",
  "Food & Beverage, Hygienic automation solutions for food processing, packaging, and quality control.",
  "Electronics, High-precision automation for electronics manufacturing and assembly processes.",
  "Aerospace, Specialized automation solutions meeting the high standards of the aerospace industry."
];

// Separate arrays for fallback display
const defaultIndustryNames = [
  "Manufacturing",
  "Automotive",
  "Pharmaceuticals",
  "Food & Beverage",
  "Electronics",
  "Aerospace"
];

const defaultIndustryDescriptions = [
  "Automation solutions for various manufacturing sectors, including discrete and process manufacturing.",
  "Specialized automation for automotive component production and assembly operations.",
  "Precision automation systems compliant with strict regulatory requirements for pharmaceutical production.",
  "Hygienic automation solutions for food processing, packaging, and quality control.",
  "High-precision automation for electronics manufacturing and assembly processes.",
  "Specialized automation solutions meeting the high standards of the aerospace industry."
];
