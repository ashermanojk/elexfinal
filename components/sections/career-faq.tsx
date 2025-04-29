"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is the typical interview process like?",
    answer:
      "Our interview process typically includes an initial phone screening, followed by a technical interview with the hiring manager and team members. For some positions, we may also include a skills assessment or case study. The final step is usually a cultural fit interview with leadership.",
  },
  {
    question: "Do you offer remote work options?",
    answer:
      "Yes, we offer flexible work arrangements including remote and hybrid options for many positions. The specific arrangement depends on the role and team requirements. We believe in creating a work environment that supports productivity and work-life balance.",
  },
  {
    question: "What opportunities are there for professional growth?",
    answer:
      "We're committed to the professional development of our team members. We offer ongoing training, education assistance, mentorship programs, and opportunities to work on diverse projects. We also promote from within whenever possible, providing clear career advancement paths.",
  },
  {
    question: "What is the company culture like?",
    answer:
      "Our culture is built on innovation, collaboration, and excellence. We foster an environment where ideas are valued, teamwork is encouraged, and continuous improvement is part of our DNA. We also prioritize work-life balance and celebrate our successes together.",
  },
  {
    question: "Do you offer internship opportunities?",
    answer:
      "Yes, we offer internship programs for students and recent graduates in engineering, computer science, and related fields. Our internships provide hands-on experience working on real projects alongside experienced professionals. Many of our full-time employees started as interns.",
  },
]

export default function CareerFaq() {
  return (
    <section id="career-faq" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Find answers to common questions about careers at Elextrio Automation.
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
