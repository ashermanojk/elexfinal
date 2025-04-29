"use client";

import { SectionHeading } from "@/components/ui/section-heading";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import PageHeader from "@/components/layout/page-header";
import {motion} from "framer-motion";
import Image from "next/image";
import img1 from "@/public/images/1.png";
export default function AboutPage() {
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
              title="About Elextrio"
              description="Pioneering innovation in industrial automation since 2005"
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
                title="Our Story"
                subtitle="At Elextrio Automation, we specialize in providing cutting-edge industrial automation solutions and custom-built special-purpose machines."
              />

              <p className="text-muted-foreground mb-6">
                Our focus is on delivering value-driven, efficient, and
                innovative systems tailored to the unique needs of our clients.
                With expertise in handling small to medium-scale projects, we
                strive to deliver solutions that are not only reliable but also
                implementable within six months of project initiation.
              </p>

              <p className="text-muted-foreground mb-6">
                Our commitment to utilizing the latest technologies ensures our
                clients benefit from advanced, future-ready systems that enhance
                productivity and efficiency. At the core of Elextrio Automation
                is a belief in simplicity and maintainability, aligning with our
                vision to deliver smart automation solutions that are easy to
                operate and maintain.
              </p>

              <p className="text-muted-foreground">
                We pride ourselves on building long-term partnerships with our
                clients by exceeding expectations through precision engineering,
                adaptability, and a customer-centric approach. Driven by a team
                of dedicated professionals, we aim to revolutionize the
                manufacturing landscape by integrating technology with
                innovation.
              </p>
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
            title="Mission & Vision"
            subtitle="Guided by our core principles, we strive to deliver excellence in every project."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">Our Mission</h3>
              <p className="text-muted-foreground mb-6">
                To deliver smart, reliable, and maintenance-friendly automation
                solutions that empower seamless business operations. We are
                dedicated to transforming challenges into tailored solutions by
                leveraging cutting-edge technology and a deep understanding of
                our clients' unique needs.
              </p>
              <p className="text-muted-foreground">
                Our commitment is to provide small to medium-sized projects that
                bring measurable value within six months of initiation, ensuring
                rapid impact and tangible results for our clients. With a focus
                on quality and sustainability, we strive to simplify complex
                processes, making smart automation systems that are not only
                efficient but also intuitive to maintain and operate.
              </p>
            </div>

            <div className="bg-card rounded-xl p-8 border border-border shadow-sm">
              <h3 className="text-2xl font-semibold mb-4">Our Vision</h3>
              <p className="text-muted-foreground mb-6">
                We aim to be the trusted partner in industrial automation by
                delivering solutions that enable our clients to stay competitive
                in an ever-evolving market. Through our expertise, agility, and
                unwavering dedication to customer satisfaction, we help
                businesses seamlessly integrate automation into their
                operations.
              </p>
              <p className="text-muted-foreground">
                By bridging the gap between advanced technology and
                user-friendly systems, we aspire to create long-lasting
                partnerships and drive the success of our clients, one project
                at a time. Our vision is to lead the industry in creating
                automation solutions that are not just technologically advanced
                but also accessible and practical for everyday use.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <SectionHeading
            title="Our Core Values"
            subtitle="These principles guide our actions and decisions every day."
            centered
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {values.map((value, index) => (
              <div
                key={index}
                className="bg-card rounded-xl p-6 border border-border shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center mb-4">
                  <div className="w-6 h-6 rounded-full bg-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground">{value.description}</p>
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
              Ready to Partner With Us?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Let's discuss how our automation expertise can help your business
              achieve its goals.
            </p>
            <Button asChild size="lg" className="rounded-full">
              <Link href="/contact">
                Contact Our Team
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}

const values = [
  {
    title: "Integrity",
    description:
      "We conduct our business with honesty, transparency, and ethical practices, building trust with our clients and partners.",
  },
  {
    title: "Innovation",
    description:
      "We continuously seek creative and cutting-edge solutions to address complex automation challenges.",
  },
  {
    title: "Dependability",
    description:
      "We are reliable partners who deliver on our promises and stand behind our work with unwavering commitment.",
  },
  {
    title: "Excellence",
    description:
      "We strive for the highest standards of quality in every aspect of our solutions and services.",
  },
  {
    title: "Resilience",
    description:
      "We approach challenges with determination and adaptability, finding solutions where others see obstacles.",
  },
  {
    title: "Customer-Centricity",
    description:
      "We place our clients' success and satisfaction at the heart of every decision and action.",
  },
];

const team = [
  {
    name: "Rajesh Kumar",
    position: "Founder & CEO",
    bio: "With over 20 years of experience in industrial automation, Rajesh leads our company with vision and technical expertise.",
  },
  {
    name: "Priya Sharma",
    position: "CTO",
    bio: "Priya brings cutting-edge technical knowledge and innovation to our automation solutions and product development.",
  },
  {
    name: "Vikram Singh",
    position: "Head of Operations",
    bio: "Vikram ensures smooth execution of all projects, maintaining our high standards of quality and efficiency.",
  },
  {
    name: "Ananya Patel",
    position: "Lead Engineer",
    bio: "Ananya specializes in designing complex automation systems with a focus on reliability and performance.",
  },
  {
    name: "Suresh Reddy",
    position: "Business Development Manager",
    bio: "Suresh builds strong client relationships and helps identify the right automation solutions for their needs.",
  },
  {
    name: "Meera Joshi",
    position: "Quality Assurance Lead",
    bio: "Meera ensures all our systems meet rigorous quality standards before deployment.",
  },
];
