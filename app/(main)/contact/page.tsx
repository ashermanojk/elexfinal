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
      })
      .catch(error => console.error("Error loading contact content:", error));
  }, []);

  return (
    <>

      <PageHeader
        title={pageTitle}
        description={pageDescription}
      />

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
