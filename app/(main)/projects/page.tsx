"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import PageHeader from "@/components/layout/page-header";
import { motion } from "framer-motion";
import CtaSection from "@/components/sections/cta-section";
import ProjectsShowcase from "@/components/sections/projects-showcase";
// Define project type


export default function ProjectsPage() {

  return (
    <>
      {/* Page Header */}
      <PageHeader
        title="Our Projects"
        description="Explore our portfolio of successful automation implementations"
      />

      {/* Featured Projects */}
      <ProjectsShowcase />

      {/* Project Categories */}
      <section className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Project Categories"
            subtitle="Browse our projects by category to find relevant examples for your industry."
            centered
          />
          <div className="mt-10 max-w-2xl mx-auto">
            <div className="space-y-4">
              {categories.map((category, index) => (
                <div key={index} className="bg-card rounded-md shadow-sm">
                  <details className="group" open={index === 0}>
                    <summary className="flex items-center justify-between cursor-pointer px-6 py-4 font-semibold text-lg text-foreground group-open:text-primary transition-colors">
                      <span className="flex items-center gap-3">
                        <span className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                          <span className="w-5 h-5 rounded-full bg-primary block" />
                        </span>
                        {category.name}
                      </span>
                      <svg className="w-5 h-5 ml-2 transition-transform group-open:rotate-90" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </summary>
                    <div className="px-6 pb-5 pt-1 text-muted-foreground text-base">
                      {category.description}
                    </div>
                  </details>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

     
      {/* Call to Action Section */}
      <CtaSection />

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

