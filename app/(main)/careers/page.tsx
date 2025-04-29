"use client";
import type { Metadata } from "next";
import PageHeader from "@/components/layout/page-header";
import CareerBenefits from "@/components/sections/career-benefits";
import OpenPositions from "@/components/sections/open-positions";
import CompanyCulture from "@/components/sections/company-culture";
import ApplicationProcess from "@/components/sections/application-process";
import CareerFaq from "@/components/sections/career-faq";
import { motion } from "framer-motion";
/* 
export const metadata: Metadata = {
  title: "Careers | Elextrio Automation",
  description:
    "Join our team of innovators and problem-solvers at Elextrio Automation. Explore current openings and growth opportunities.",
}; */

export default function CareersPage() {
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
            transition={{
              duration: 0.6,
              delay: 0.3,
              type: "spring",
              stiffness: 80,
            }}
          >
            <PageHeader
              title="Careers at Elextrio"
              description="Join our team of innovators shaping the future of industrial automation"
            />
          </motion.div>
        </div>
      </div>
      <div className="container mx-auto py-12">
        <div className="space-y-16">
          <CompanyCulture />
          <CareerBenefits />
          <OpenPositions />
          <ApplicationProcess />
          <CareerFaq />
        </div>
      </div>
    </>
  );
}
