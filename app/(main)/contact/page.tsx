"use client";

import { useEffect, useState } from "react";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import ContactForm from "@/components/sections/contact-form";
import ContactInfo from "@/components/sections/contact-info";
import LocationMap from "@/components/sections/location-map";
import SupportOptions from "@/components/sections/support-options";
import { motion } from "framer-motion";
import { getContent } from "@/lib/content";

/* export const metadata: Metadata = {
  title: "Contact Us | Elextrio Automation",
  description:
    "Get in touch with Elextrio Automation for inquiries, support, or to discuss your industrial automation needs.",
}; */

export default function ContactPage() {
  const [pageTitle, setPageTitle] = useState("Contact Us");
  const [pageDescription, setPageDescription] = useState("Get in touch with our team for inquiries and consultations");
  
  // Load content on client-side
  useEffect(() => {
    // Fetch contact page content
    fetch('/api/content')
      .then(res => res.json())
      .then(data => {
        const contactInfo = data.find((item: any) => item.contentId === "contact-info");
        if (contactInfo && contactInfo.text.length >= 2) {
          setPageTitle(contactInfo.text[0]);
          setPageDescription(contactInfo.text[1]);
        }
      })
      .catch(error => console.error("Error loading contact content:", error));
  }, []);

  return (
    <>
      <div className="relative w-full min-h-[40vh] md:min-h-[60vh] flex items-center justify-center overflow-hidden">
        {/* Animated gradient backgrounds with hover effect */}
        <motion.div
          className="absolute inset-0 bg-foreground/10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(255,126,0,0.3),rgba(255,255,255,0))]"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          whileHover={{ scale: 1.03, transition: { duration: 1 } }}
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
            }}
          >
            <PageHeader
              title={pageTitle}
              description={pageDescription}
            />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-12">
          <ContactInfo />
          <ContactForm />
        </div>

        <div className="mt-20">
          <LocationMap />
        </div>

        {/* <div className="mt-20">
          <SupportOptions />
        </div> */}
        
      </div>

      
      
    </>
  );
}
