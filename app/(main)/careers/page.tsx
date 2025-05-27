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

      <PageHeader
        title="Careers at Elextrio"
        description="Join our team of innovators shaping the future of industrial automation"
      />

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
