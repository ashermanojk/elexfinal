"use client"

import { useContent } from "@/components/ContentProvider"

export default function CtaSection() {
  const { getContentText } = useContent();
  
  return (
    <section className="py-24 text-white relative overflow-hidden">
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="bg-card p-12 rounded-2xl border border-foreground/30 shadow-xl">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-primary">
              {getContentText("home-image1-heading", "Transform Your Manufacturing Process")}
            </h2>
            
            <p className="text-xl text-foreground/90 mb-10 leading-relaxed">
              {getContentText("home-image1-subheading", "Our cutting-edge automation solutions deliver measurable results: increased efficiency, enhanced precision, and unmatched reliability for forward-thinking manufacturers.")}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <a 
                href="/contact"
                className="px-8 py-4 rounded-lg font-medium text-lg flex items-center justify-center transition-all duration-300 bg-primary-600 hover:bg-primary-500 hover:shadow-lg hover:shadow-primary/20"
              >
                Get in Touch
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14"></path>
                  <path d="m12 5 7 7-7 7"></path>
                </svg>
              </a>
              
              <a 
                href="/services"
                className="px-8 py-4 rounded-lg font-medium text-lg bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-blue-600/50 transition-all duration-300 flex items-center justify-center"
              >
                Explore Services
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-5 w-5" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6"></path>
                </svg>
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}
