"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { cn } from "@/lib/utils";
import LogoImage from "@/public/images/ElextrioLogo.svg";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Projects", href: "/projects" },
  { name: "Careers", href: "/careers" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 w-full z-50 transition-all duration-300",
        scrolled
          ? "bg-background backdrop-blur-md shadow-md py-2"
          : "bg-background/20 py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="relative flex-col h-10 w-60 items-center justify-center">
          <Link href="/" className="block w-full h-full relative">
            <Image
              src={LogoImage}
              alt="Elextrio Logo"
              fill
            />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary relative group",
                pathname === link.href
                  ? "text-primary"
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              {link.name}
              <span
                className={cn(
                  "absolute -bottom-1 left-0 h-0.5 bg-primary transition-all duration-300",
                  pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                )}
              ></span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-4">
          <ModeToggle />
          <Button asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden items-center space-x-4">
          <ModeToggle />
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="p-2 text-foreground"
            aria-label="Toggle Menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-background backdrop-blur-md shadow-lg py-4 px-4 transition-all duration-300 ease-in-out">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={cn(
                  "text-base font-medium py-2 px-4 rounded-md transition-colors",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "hover:bg-muted"
                    
                )}
              >
                {link.name}
              </Link>
            ))}
            <Button asChild className="mt-2 w-full">
              <Link href="/contact" onClick={() => setIsOpen(false)}>
                Get in Touch
              </Link>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
