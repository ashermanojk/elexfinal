
"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import { motion } from "framer-motion";
import ServicesList from "@/components/sections/services-list";

export default function ServicesPage() {
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
              title="Our Services"
              description="Comprehensive automation solutions tailored to your industry needs"
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
            title="Our Process"
            subtitle="We follow a structured approach to deliver successful automation projects."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {process.map((step, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border shadow-sm relative"
              >
                <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-lg">
                  {index + 1}
                </div>
                <h3 className="text-xl font-semibold mb-3 mt-4">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Industries We Serve"
            subtitle="Our automation solutions cater to diverse industrial sectors."
            centered
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {industries.map((industry, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{industry.name}</h3>
                <p className="text-muted-foreground">{industry.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-slate-950 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),rgba(67,56,202,0.3))]" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Automate Your Business?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Contact us today to discuss your specific requirements and how our
              services can benefit your operations.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

const process = [
  {
    title: "Consultation",
    description:
      "We begin by understanding your specific needs, challenges, and objectives through detailed discussions and site visits.",
  },
  {
    title: "Design & Planning",
    description:
      "Our team develops a comprehensive solution design, including technical specifications, timelines, and resource requirements.",
  },
  {
    title: "Implementation",
    description:
      "We execute the project according to the approved plan, ensuring quality, safety, and adherence to timelines.",
  },
  {
    title: "Support & Maintenance",
    description:
      "After deployment, we provide ongoing support, training, and maintenance to ensure optimal system performance.",
  },
];

const industries = [
  {
    name: "Manufacturing",
    description:
      "Automation solutions for various manufacturing sectors, including discrete and process manufacturing.",
  },
  {
    name: "Automotive",
    description:
      "Specialized automation for automotive component production and assembly operations.",
  },
  {
    name: "Pharmaceuticals",
    description:
      "Precision automation systems compliant with strict regulatory requirements for pharmaceutical production.",
  },
  {
    name: "Food & Beverage",
    description:
      "Hygienic automation solutions for food processing, packaging, and quality control.",
  },
  {
    name: "Electronics",
    description:
      "High-precision automation for electronics manufacturing and assembly processes.",
  },
  {
    name: "Aerospace",
    description:
      "Specialized automation solutions meeting the high standards of the aerospace industry.",
  },
];
