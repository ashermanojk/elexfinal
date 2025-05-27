"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import PageHeader from "@/components/layout/page-header";
import { motion } from "framer-motion";
import Image from "next/image";
import img1 from "@/public/images/1.png";
import CtaSection from "@/components/sections/cta-section";
import { useContent } from "@/components/ContentProvider";
import { Key } from "react";
import CompanyValues from "@/components/sections/company-values";



export default function AboutPage() {
  const { getContentText, getContentArray } = useContent();

  return (
    <>

      <PageHeader
        title={getContentText("about-hero-heading", "About Elextrio")}
        description={getContentText("about-hero-subheading", "Pioneering innovation in industrial automation since 2005")}
      />

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
      <CompanyValues />
      {/* CTA Section */}
      <CtaSection />
    </>
  );
}