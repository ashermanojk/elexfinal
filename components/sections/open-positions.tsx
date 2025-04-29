"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowRight, MapPin, Clock } from "lucide-react";
import {createClient} from "../../supabase/config";

type JobListing = {
  id: string;
  title: string;
  location: string;
  employment_type: string;
  description: string;
  requirements: string[];
  department: string;
  salary_range?: string;
};

export default function OpenPositions() {
  const [isVisible, setIsVisible] = useState(false);
  const [job, setJob] = useState<JobListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("open-positions");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  // Add this useEffect hook below your existing IntersectionObserver useEffect
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        // Update your fetchJobs function
        const { data, error } = (await createClient()
          .from("job_listings")
          .select("*")
          .eq("is_published", true)
          .order("created_at", { ascending: false })) as {
          data: JobListing[] | null;
          error: any;
        };
        console.log('Fetched jobs:', data) // Add after setJob(data || [])

        if (error) throw error;
        setJob(data || []);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        // Add toast notification if needed
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  return (
    <section id="open-positions" className="py-12">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4">Open Positions</h2>
        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
          Join our team of innovators and problem-solvers at Elextrio
          Automation.
        </p>
      </div>

      <div className="space-y-6">
        {job.map((job, index) => (
          <div
            key={index}
            className={cn(
              "bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md border border-slate-200 dark:border-slate-700 transition-all duration-700 transform",
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-12 opacity-0",
              isVisible && `delay-${index * 150}`
            )}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h3 className="text-xl font-bold">{job.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2">
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{job.location}</span>
                  </div>
                  <div className="flex items-center text-muted-foreground">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{job.employment_type}</span>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link href={`/careers/${job.id}`}>
                  Apply Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            <p className="text-muted-foreground mb-4">{job.description}</p>

            <div>
              <h4 className="font-semibold mb-2">Requirements:</h4>
              <ul className="list-disc pl-5 space-y-1 text-muted-foreground">
                {job.requirements.map((req, idx) => (
                  <li key={idx}>{req}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
