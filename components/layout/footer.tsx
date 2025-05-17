"use client"
import Link from "next/link"
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import LogoImageLight from "../../public/images/ElextrioLogoLight.svg"
import LogoImageDark from "../../public/images/ElextrioLogoDark.svg"
import { useContent } from "@/components/ContentProvider";
import React from "react"

export default function Footer() {
  const currentYear = new Date().getFullYear()
  const { getContentArray } = useContent();
  const address = getContentArray("contact-info-address");

  return (
    <footer className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 ">
            <div className="relative flex-col h-10 w-60 items-center justify-center bg-background">
              <Link href="/" className="block w-full h-full relative">
                <Image
                  src={LogoImageLight}
                  alt="Elextrio Logo"
                  fill
                  className="block dark:hidden" // Show in light mode, hide in dark mode
                />
                <Image
                  src={LogoImageDark}
                  alt="Elextrio Logo"
                  fill
                  className="hidden dark:block" // Hide in light mode, show in dark mode
                />
              </Link>
              <div />
            </div>
            <p className="text-slate-300 max-w-xs">
              Delivering smart, reliable, and maintenance-friendly automation solutions that empower seamless business
              operations.
            </p>
            {/* <div className="flex space-x-4">
              <Link href="#" className="text-slate-300 hover:text-primary transition-colors">
                <Facebook size={20} />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-primary transition-colors">
                <Twitter size={20} />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-primary transition-colors">
                <Instagram size={20} />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-slate-300 hover:text-primary transition-colors">
                <Linkedin size={20} />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div> */}
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-slate-300 hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-slate-300 hover:text-primary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-slate-300 hover:text-primary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-slate-300 hover:text-primary transition-colors">
                  Projects
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-slate-300 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-300 hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services#industrial-automation"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Industrial Automation
                </Link>
              </li>
              <li>
                <Link
                  href="/services#special-purpose-machinery"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Special Purpose Machinery
                </Link>
              </li>
              <li>
                <Link
                  href="/services#process-automation"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Process Automation
                </Link>
              </li>
              <li>
                <Link href="/services#turnkey-projects" className="text-slate-300 hover:text-primary transition-colors">
                  Turnkey Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/services#product-development"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Product Development
                </Link>
              </li>
              <li>
                <Link
                  href="/services#contract-manufacturing"
                  className="text-slate-300 hover:text-primary transition-colors"
                >
                  Contract Manufacturing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <MapPin size={20} className="text-primary mt-1 flex-shrink-0" />
                <span className="text-slate-300"><p>
                {address.map((line, index) => (
                <React.Fragment key={index}>
                  {line}
                  {index < address.length - 1 && <br />}
                </React.Fragment>
              ))}
                </p></span>
                  
              </li>
              <li className="flex items-center space-x-3">
                <Phone size={20} className="text-primary flex-shrink-0" />
                <span className="text-slate-300">+91 81238 65073</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail size={20} className="text-primary flex-shrink-0" />
                <span className="text-slate-300">info@elextrio.com</span>
              </li>
            </ul>
            <div className="mt-6">
              <Button asChild>
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">&copy; {currentYear} Elextrio. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
          </div>
        </div>
      </div>
    </footer>
  )
}
