
"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import { motion } from "framer-motion";

export default function ServicesPage() {
  return (
    <>
      <div className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient backgrounds */}
        <motion.div
          className="absolute inset-0 bg-slate-900 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),rgba(255,255,255,0))]"
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
      <section id="services-list" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Comprehensive Services"
            subtitle="We offer a wide range of automation solutions to meet your specific needs."
            centered
          />

          <div className="space-y-16 mt-12 ">
            {services.map((service, index) => (
              <div
                key={index}
                id={service.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center bg-card p-5 rounded-xl"
              >
                <div
                  className={`order-2 ${
                    index % 2 === 0 ? "lg:order-2" : "lg:order-1"
                  }`}
                >
                  <div className="relative">
                    <div className="aspect-video max-w-md mx-auto relative rounded-xl overflow-hidden">
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center">
                          <div className="w-10 h-10 rounded-full bg-primary" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div
                  className={`order-1 ${
                    index % 2 === 0 ? "lg:order-1" : "lg:order-2"
                  }`}
                >
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    {service.description}
                  </p>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start">
                        <CheckCircle2 className="h-6 w-6 text-primary mr-3 flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button asChild>
                    <Link href="/contact">
                      Inquire About This Service
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

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

const services = [
  {
    id: "industrial-automation",
    title: "Industrial Automation",
    description:
      "We develop comprehensive automation systems that streamline manufacturing processes, increase productivity, and reduce operational costs.",
    features: [
      "PLC and SCADA systems integration",
      "Motion control and robotics",
      "Process control and monitoring",
      "Custom HMI development",
      "Industrial IoT solutions",
    ],
  },
  {
    id: "special-purpose-machinery",
    title: "Special Purpose Machinery",
    description:
      "We design and build custom machines tailored to your specific production requirements, helping you achieve unique manufacturing capabilities.",
    features: [
      "Custom machine design and fabrication",
      "Automated assembly systems",
      "Testing and inspection equipment",
      "Material handling solutions",
      "Retrofitting existing machinery",
    ],
  },
  {
    id: "process-automation",
    title: "Process Automation",
    description:
      "Our process automation solutions optimize your industrial processes with intelligent control systems and comprehensive monitoring capabilities.",
    features: [
      "Batch process automation",
      "Continuous process control",
      "Data acquisition and analysis",
      "Quality control automation",
      "Energy management systems",
    ],
  },
  {
    id: "turnkey-projects",
    title: "Turnkey Projects",
    description:
      "We provide end-to-end solutions from concept to commissioning, managing all aspects of your automation project for seamless implementation.",
    features: [
      "Comprehensive project management",
      "System design and engineering",
      "Installation and commissioning",
      "Training and documentation",
      "Ongoing support and maintenance",
    ],
  },
  {
    id: "product-development",
    title: "Product Development",
    description:
      "Our innovative engineering and design services help bring your product ideas to life, from concept to prototype to production-ready designs.",
    features: [
      "Concept development and validation",
      "3D modeling and simulation",
      "Prototype development",
      "Design for manufacturability",
      "Product testing and optimization",
    ],
  },
  {
    id: "contract-manufacturing",
    title: "Contract Manufacturing",
    description:
      "We offer reliable and cost-effective manufacturing services tailored to your specifications, ensuring high-quality production outcomes.",
    features: [
      "Precision machining and fabrication",
      "Assembly and integration",
      "Quality control and testing",
      "Supply chain management",
      "Flexible production capacity",
    ],
  },
];

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
