"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import PageHeader from "@/components/layout/page-header";
import {motion} from "framer-motion";
import Image from "next/image";
import img1 from "@/public/images/1.png";
import CtaSection from "@/components/sections/cta-section";
import { useContent } from "@/components/ContentProvider";

export default function AboutPage() {
  const { getContentText, getContentArray } = useContent();

  return (
    <>
      <div className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient backgrounds */}
        <motion.div
          className="absolute inset-0 bg-foreground/10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),rgba(255,255,255,0))]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
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
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PageHeader
              title={getContentText("about-hero-heading", "About Elextrio")}
              description={getContentText("about-hero-subheading", "Pioneering innovation in industrial automation since 2005")}
            />
          </motion.div>
        </div>
      </div>

      {/* Company Overview */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <SectionHeading
                title={getContentText("about-story-heading", "Our Story")}
                subtitle={getContentText("about-story-subheading", "At Elextrio Automation, we specialize in providing cutting-edge industrial automation solutions and custom-built special-purpose machines.")}
              />

              {getContentArray("about-story-subheading", [
                "Our focus is on delivering value-driven, efficient, and innovative systems tailored to the unique needs of our clients. With expertise in handling small to medium-scale projects, we strive to deliver solutions that are not only reliable but also implementable within six months of project initiation.",
                "Our commitment to utilizing the latest technologies ensures our clients benefit from advanced, future-ready systems that enhance productivity and efficiency. At the core of Elextrio Automation is a belief in simplicity and maintainability, aligning with our vision to deliver smart automation solutions that are easy to operate and maintain.",
                "We pride ourselves on building long-term partnerships with our clients by exceeding expectations through precision engineering, adaptability, and a customer-centric approach. Driven by a team of dedicated professionals, we aim to revolutionize the manufacturing landscape by integrating technology with innovation."
              ]).slice(1).map((paragraph, index) => (
                <p key={index} className="text-muted-foreground mb-6">
                  {paragraph}
                </p>
              ))}
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
                              src={img1}
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

      {/* Mission & Vision */}
      <section className="py-20 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={getContentText("about-mission-main-heading", "Mission & Vision")}
            subtitle={getContentText("about-mission-main-subheading", "Guided by our core principles, we strive to deliver excellence in every project.")}
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">{getContentText("about-mission-heading", "Our Mission")}</h3>
              {getContentArray("about-mission-subheading", [
                "To deliver smart, reliable, and maintenance-friendly automation solutions that empower seamless business operations. We are dedicated to transforming challenges into tailored solutions by leveraging cutting-edge technology and a deep understanding of our clients' unique needs.",
                "Our commitment is to provide small to medium-sized projects that bring measurable value within six months of initiation, ensuring rapid impact and tangible results for our clients. With a focus on quality and sustainability, we strive to simplify complex processes, making smart automation systems that are not only efficient but also intuitive to maintain and operate."
              ]).map((paragraph, index) => (
                <p key={index} className={`text-muted-foreground ${index < getContentArray("about-mission-subheading").length - 1 ? 'mb-6' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">{getContentText("about-vision-heading", "Our Vision")}</h3>
              {getContentArray("about-vision-subheading", [
                "We aim to be the trusted partner in industrial automation by delivering solutions that enable our clients to stay competitive in an ever-evolving market. Through our expertise, agility, and unwavering dedication to customer satisfaction, we help businesses seamlessly integrate automation into their operations.",
                "By bridging the gap between advanced technology and user-friendly systems, we aspire to create long-lasting partnerships and drive the success of our clients, one project at a time. Our vision is to lead the industry in creating automation solutions that are not just technologically advanced but also accessible and practical for everyday use."
              ]).map((paragraph, index) => (
                <p key={index} className={`text-muted-foreground ${index < getContentArray("about-vision-subheading").length - 1 ? 'mb-6' : ''}`}>
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title={getContentText("about-values-heading", "Our Core Values")}
            subtitle={getContentText("about-values-subheading", "These principles guide our actions and decisions every day.")}
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {coreValues.map((value) => (
              <div
                key={value.id}
                className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">
                  {getContentText(`about-values-${value.id}-title`, value.defaultTitle)}
                </h3>
                <p className="text-muted-foreground">
                  {getContentText(`about-values-${value.id}`, value.defaultDescription)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <CtaSection/>
    </>
  );
}

// Use this as fallback data
const coreValues = [
  {
    id: "integrity",
    defaultTitle: "Integrity",
    defaultDescription: "We conduct our business with honesty, transparency, and ethical practices, building trust with our clients and partners.",
  },
  {
    id: "innovation",
    defaultTitle: "Innovation",
    defaultDescription: "We continuously seek creative and cutting-edge solutions to address complex automation challenges.",
  },
  {
    id: "dependability",
    defaultTitle: "Dependability",
    defaultDescription: "We are reliable partners who deliver on our promises and stand behind our work with unwavering commitment.",
  },
  {
    id: "excellence",
    defaultTitle: "Excellence",
    defaultDescription: "We strive for the highest standards of quality in every aspect of our solutions and services.",
  },
  {
    id: "resilience",
    defaultTitle: "Resilience",
    defaultDescription: "We approach challenges with determination and adaptability, finding solutions where others see obstacles.",
  },
  {
    id: "customercentricity",
    defaultTitle: "Customer-Centricity",
    defaultDescription: "We place our clients' success and satisfaction at the heart of every decision and action.",
  },
];
