"use client"

import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { Cog, Factory, Workflow, Package, Lightbulb, Wrench, Cpu } from "lucide-react"
import Image from 'next/image'
const services = [
  {
    id: "special-purpose-machinery",
    icon: Cog,
    title: "Special Purpose Machinery",
    description:
      "We design and build custom machines tailored to your specific industrial needs. Our special purpose machines are engineered to optimize your manufacturing processes, increase productivity, and ensure consistent quality.",
    features: [
      "Custom design and engineering",
      "Precision manufacturing",
      "Integration with existing systems",
      "Comprehensive testing and validation",
      "Ongoing support and maintenance",
    ],
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: "industrial-automation",
    icon: Factory,
    title: "Industrial Automation",
    description:
      "Our industrial automation solutions help streamline your manufacturing processes, reduce manual intervention, and enhance operational efficiency. We integrate advanced control systems, sensors, and software to create seamless automated workflows.",
    features: [
      "PLC programming and integration",
      "SCADA system implementation",
      "Motion control solutions",
      "Robotic automation",
      "Machine vision systems",
    ],
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: "process-automation",
    icon: Workflow,
    title: "Process Automation",
    description:
      "We optimize your production processes through intelligent automation, ensuring consistent quality, reduced waste, and improved throughput. Our process automation solutions are designed to enhance control and monitoring capabilities.",
    features: [
      "Process analysis and optimization",
      "Automated control systems",
      "Real-time monitoring and data collection",
      "Quality control automation",
      "Process validation and compliance",
    ],
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: "turnkey-projects",
    icon: Package,
    title: "Turnkey Projects",
    description:
      "From concept to commissioning, we manage complete turnkey automation projects, delivering end-to-end solutions that meet your specific requirements. Our comprehensive approach ensures seamless implementation and successful outcomes.",
    features: [
      "Requirements analysis and specification",
      "System design and engineering",
      "Equipment procurement and installation",
      "Testing and commissioning",
      "Training and handover",
    ],
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: "product-development",
    icon: Lightbulb,
    title: "Product Development",
    description:
      "We help bring your product ideas to life through innovative engineering and development services. Our team works closely with you to transform concepts into market-ready products that meet your specifications and quality standards.",
    features: [
      "Concept development and prototyping",
      "Design for manufacturability",
      "Testing and validation",
      "Production process development",
      "Documentation and support",
    ],
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: "automation-consultancy",
    icon: Wrench,
    title: "Automation Consultancy",
    description:
      "Our expert consultants provide strategic guidance on automation opportunities, technology selection, and implementation planning. We help you identify the most effective automation solutions for your specific business needs.",
    features: [
      "Automation feasibility studies",
      "Technology assessment and selection",
      "ROI analysis and justification",
      "Implementation roadmap development",
      "Vendor selection and management",
    ],
    image: "/placeholder.svg?height=500&width=800",
  },
  {
    id: "contract-manufacturing",
    icon: Cpu,
    title: "Contract Manufacturing",
    description:
      "We offer reliable and cost-effective contract manufacturing services for automation components and assemblies. Our manufacturing capabilities ensure high-quality production that meets your specifications and timelines.",
    features: [
      "Precision machining and fabrication",
      "Electronic assembly and testing",
      "Quality control and inspection",
      "Inventory management",
      "Just-in-time delivery",
    ],
    image: "/placeholder.svg?height=500&width=800",
  },
]

export default function ServicesList() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    const element = document.getElementById("services-list")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="services-list" className="py-12">
      <div className="space-y-24">
        {services.map((service, index) => (
          <div
            key={index}
            id={service.id}
            className={cn(
              "grid grid-cols-1 lg:grid-cols-2 gap-12 items-center transition-all duration-700 transform",
              isVisible ? "translate-y-0 opacity-100" : "translate-y-12 opacity-0",
              isVisible && `delay-${index * 100}`,
            )}
          >
            <div className={cn("order-2 lg:order-1", index % 2 !== 0 && "lg:order-2")}>
              <div className="flex items-center gap-3 mb-4">
                {/* <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                  <service.icon className="h-6 w-6 text-primary" />
                </div> */}
                <h3 className="text-2xl font-bold">{service.title}</h3>
              </div>

              <p className="text-muted-foreground mb-6">{service.description}</p>

              <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-6 mb-6">
                <h4 className="font-semibold mb-4">Key Features:</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <div className="h-5 w-5 rounded-full bg-primary/20 flex items-center justify-center mr-3 mt-0.5">
                        <div className="h-2 w-2 rounded-full bg-primary"></div>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={cn("order-1 lg:order-2", index % 2 !== 0 && "lg:order-1")}>
              <div className="rounded-xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-700">
                <Image
                  src={service.image || "/placeholder.svg"}
                  alt={service.title}
                  fill
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
