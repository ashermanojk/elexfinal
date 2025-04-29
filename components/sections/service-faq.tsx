"use client"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "How long does a typical automation project take to complete?",
    answer:
      "Our projects are designed to deliver value within six months of initiation. The exact timeline depends on the complexity and scope of the project, but we pride ourselves on efficient implementation while maintaining high quality standards. During the initial consultation, we'll provide a detailed timeline specific to your project needs.",
  },
  {
    question: "Can you integrate automation solutions with our existing systems?",
    answer:
      "Yes, we specialize in integrating new automation solutions with existing systems and equipment. Our team conducts a thorough assessment of your current infrastructure to ensure seamless integration. We design solutions that complement and enhance your existing operations, minimizing disruption while maximizing the benefits of automation.",
  },
  {
    question: "What industries do you serve with your automation solutions?",
    answer:
      "We provide automation solutions across a wide range of industries including manufacturing, food and beverage, pharmaceuticals, automotive, electronics, and more. Our diverse experience allows us to understand the unique requirements and challenges of different sectors, enabling us to deliver tailored solutions that address industry-specific needs.",
  },
  {
    question: "What kind of support do you provide after implementation?",
    answer:
      "We offer comprehensive post-implementation support including training, maintenance, troubleshooting, and ongoing optimization. Our support packages can be customized to your specific needs, from basic maintenance to 24/7 emergency support. We're committed to ensuring the long-term success and reliability of your automation solution.",
  },
  {
    question: "How do you ensure the quality and reliability of your automation solutions?",
    answer:
      "Quality and reliability are core to our approach. We implement rigorous testing and validation procedures throughout the development process. Our solutions are built using industry-leading components and follow best practices in engineering and design. Additionally, we provide thorough documentation and training to ensure proper operation and maintenance.",
  },
  {
    question: "What is the typical return on investment for your automation projects?",
    answer:
      "ROI varies depending on the specific project, but our clients typically see returns through increased productivity, reduced labor costs, improved quality, and decreased waste. During the consultation phase, we work with you to identify key performance indicators and establish realistic expectations for ROI. Many of our clients achieve payback within 12-24 months of implementation.",
  },
]

export default function ServiceFaq() {
  return (
    <section id="service-faq" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about our automation services and solutions.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`}>
              <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  )
}
