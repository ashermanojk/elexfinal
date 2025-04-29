"use client"

import { useState, useEffect } from 'react'
import { createClient } from '@/supabase/config'
import Link from 'next/link'
import { format } from 'date-fns'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Pencil, Trash2, Loader2, Plus } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import { Badge } from '@/components/ui/badge'

type JobListing = {
  id: string
  title: string
  location: string
  employment_type: string
  department: string
  created_at: string
  is_published: boolean
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchJobs()
  }, [])
  
  const fetchJobs = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      const { data, error } = await supabase
        .from('job_listings')
        .select('*')
        .order('created_at', { ascending: false })
      
      if (error) throw error
      setJobs(data || [])
    } catch (error: any) {
      console.error('Error fetching jobs:', error)
      toast({
        title: "Error",
        description: "Failed to load job listings",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  const deleteJob = async (id: string) => {
    if (!confirm('Are you sure you want to delete this job listing?')) return
    
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('job_listings')
        .delete()
        .eq('id', id)
      
      if (error) throw error
      
      setJobs(prev => prev.filter(job => job.id !== id))
      
      toast({
        title: "Job deleted",
        description: "The job listing has been removed",
      })
    } catch (error: any) {
      console.error('Error deleting job:', error)
      toast({
        title: "Error",
        description: "Failed to delete job listing",
        variant: "destructive"
      })
    }
  }

  return (
    <div className="container py-10 space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold">Job Listings</h1>
        <Link href="/admin/jobs/new">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add New Job
          </Button>
        </Link>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
          <span className="ml-2">Loading job listings...</span>
        </div>
      ) : jobs.length === 0 ? (
        <Card>
          <CardContent className="py-10 text-center">
            <p className="text-muted-foreground mb-4">No job listings found</p>
            <Link href="/admin/jobs/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Create your first job listing
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {jobs.map((job) => (
            <Card key={job.id}>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-xl">{job.title}</CardTitle>
                  <Badge variant={job.is_published ? "default" : "outline"} className={job.is_published ? "bg-green-600" : ""}>
                    {job.is_published ? 'Published' : 'Draft'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pb-2 text-sm space-y-1 text-muted-foreground">
                <p>Location: {job.location}</p>
                <p>Type: {job.employment_type}</p>
                <p>Department: {job.department}</p>
                <p className="text-xs mt-2">
                  Posted: {format(new Date(job.created_at), 'MMM dd, yyyy')}
                </p>
              </CardContent>
              <CardFooter className="flex justify-between pt-2 border-t">
                <Link href={`/admin/jobs/${job.id}`}>
                  <Button variant="outline" size="sm">
                    <Pencil className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                </Link>
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => deleteJob(job.id)}
                >
                  <Trash2 className="h-3 w-3 mr-1" />
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 