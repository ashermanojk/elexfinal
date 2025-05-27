"use client"

import { useContent } from "@/components/ContentProvider"
import { motion } from "framer-motion";

export default function CtaSection() {
  const { getContentText } = useContent();

  return (
    <section className="py-24 text-white relative overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
      <div className="absolute inset-0 z-0 bg-pattern opacity-20" /> {/* Add a subtle background pattern */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="bg-card p-12 rounded-md border border-foreground/30 shadow-xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-foreground/80 text-center">
              Transform Your Manufacturing Process
            </h2>
            <p className="text-lg text-center text-muted-foreground mb-8">
              Discover how we can help you streamline operations and achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <motion.a
                href="/contact"
                className="px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-300 bg-primary-600 hover:bg-primary-500 hover:shadow-lg hover:shadow-primary/20"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Get in Touch
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </motion.a>

              <motion.a
                href="/services"
                className="px-8 py-4 rounded-lg font-medium text-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-600/50 transition-all duration-300 flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Explore Services
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
