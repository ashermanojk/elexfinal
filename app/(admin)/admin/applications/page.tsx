"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/supabase/config"
import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  DownloadCloud, 
  ExternalLink, 
  FileText, 
  Loader2, 
  MailOpen, 
  Phone, 
  User 
} from "lucide-react"
import Link from "next/link"
import { format } from "date-fns"

// Types for job applications
type JobApplication = {
  id: string
  job_id: string
  name: string
  email: string
  phone: string
  resume_url: string
  cover_letter: string
  portfolio_url: string | null
  status: 'pending' | 'reviewing' | 'interviewed' | 'accepted' | 'rejected'
  created_at: string
  job_title?: string // Joined from job_listings
}

export default function AdminApplications() {
  const [applications, setApplications] = useState<JobApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [currentTab, setCurrentTab] = useState("all")
  
  useEffect(() => {
    fetchApplications()
  }, [])
  
  const fetchApplications = async () => {
    try {
      setLoading(true)
      const supabase = createClient()
      
      // Get applications with job title
      const { data, error } = await supabase
        .from('job_applications')
        .select(`
          *,
          job_listings(title)
        `)
        .order('created_at', { ascending: false })
      
      if (error) throw error
      
      // Transform data to include job_title
      const transformedData = data.map(app => ({
        ...app,
        job_title: app.job_listings?.title
      }))
      
      setApplications(transformedData)
    } catch (error: any) {
      console.error('Error fetching applications:', error)
      toast({
        title: "Error",
        description: "Failed to load job applications",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }
  
  const updateApplicationStatus = async (id: string, status: JobApplication['status']) => {
    try {
      const supabase = createClient()
      
      const { error } = await supabase
        .from('job_applications')
        .update({ status })
        .eq('id', id)
      
      if (error) throw error
      
      // Update local state
      setApplications(prev => 
        prev.map(app => app.id === id ? { ...app, status } : app)
      )
      
      toast({
        title: "Status updated",
        description: `Application status changed to ${status}`,
      })
    } catch (error: any) {
      console.error('Error updating status:', error)
      toast({
        title: "Error",
        description: "Failed to update application status",
        variant: "destructive"
      })
    }
  }
  
  // Filter applications based on current tab
  const filteredApplications = applications.filter(app => {
    if (currentTab === "all") return true
    return app.status === currentTab
  })
  
  // Status badge color mapping
  const statusColors = {
    pending: "bg-yellow-500",
    reviewing: "bg-blue-500",
    interviewed: "bg-purple-500",
    accepted: "bg-green-500",
    rejected: "bg-red-500"
  }
  
  return (
    <div className="container mx-auto py-10 space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Job Applications</h1>
        <p className="text-muted-foreground">
          View and manage applications for open positions
        </p>
      </div>
      
      <Tabs defaultValue="all" value={currentTab} onValueChange={setCurrentTab} className="w-full">
        <TabsList className="grid grid-cols-6 w-full max-w-2xl">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="reviewing">Reviewing</TabsTrigger>
          <TabsTrigger value="interviewed">Interviewed</TabsTrigger>
          <TabsTrigger value="accepted">Accepted</TabsTrigger>
          <TabsTrigger value="rejected">Rejected</TabsTrigger>
        </TabsList>
        
        <TabsContent value={currentTab} className="mt-6">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2">Loading applications...</span>
            </div>
          ) : filteredApplications.length === 0 ? (
            <div className="text-center py-20 border rounded-lg">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">No applications found</h3>
              <p className="text-muted-foreground">
                {currentTab === "all" 
                  ? "There are no job applications yet."
                  : `There are no applications with '${currentTab}' status.`}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredApplications.map(application => (
                <Card key={application.id} className="overflow-hidden">
                  <CardHeader className="pb-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="font-bold">{application.name}</CardTitle>
                        <CardDescription>Applied for {application.job_title}</CardDescription>
                      </div>
                      <Badge className={statusColors[application.status]}>
                        {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4 pb-3">
                    <div className="grid grid-cols-1 gap-2">
                      <div className="flex items-center text-sm">
                        <MailOpen className="mr-2 h-4 w-4 text-muted-foreground" />
                        <a href={`mailto:${application.email}`} className="text-primary hover:underline">
                          {application.email}
                        </a>
                      </div>
                      <div className="flex items-center text-sm">
                        <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                        <a href={`tel:${application.phone}`} className="text-primary hover:underline">
                          {application.phone}
                        </a>
                      </div>
                      {application.portfolio_url && (
                        <div className="flex items-center text-sm">
                          <ExternalLink className="mr-2 h-4 w-4 text-muted-foreground" />
                          <a 
                            href={application.portfolio_url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-primary hover:underline truncate"
                          >
                            Portfolio
                          </a>
                        </div>
                      )}
                    </div>
                    
                    <div className="border p-3 rounded-md bg-gray-50 dark:bg-gray-900/50">
                      <h4 className="font-medium mb-1 text-sm">Cover Letter</h4>
                      <p className="text-sm text-muted-foreground line-clamp-3">
                        {application.cover_letter}
                      </p>
                      {application.cover_letter.length > 150 && (
                        <button className="text-xs text-primary mt-1">Read more</button>
                      )}
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-xs text-muted-foreground">
                        Applied {format(new Date(application.created_at), 'MMM d, yyyy')}
                      </span>
                      <a 
                        href={application.resume_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-xs flex items-center text-primary hover:underline"
                      >
                        <DownloadCloud className="w-3 h-3 mr-1" /> Resume
                      </a>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-wrap gap-2 pt-2 border-t">
                    {application.status === 'pending' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => updateApplicationStatus(application.id, 'reviewing')}
                      >
                        Start Review
                      </Button>
                    )}
                    {application.status === 'reviewing' && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => updateApplicationStatus(application.id, 'interviewed')}
                      >
                        Mark Interviewed
                      </Button>
                    )}
                    {application.status === 'interviewed' && (
                      <>
                        <Button 
                          variant="default" 
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                          onClick={() => updateApplicationStatus(application.id, 'accepted')}
                        >
                          Accept
                        </Button>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          onClick={() => updateApplicationStatus(application.id, 'rejected')}
                        >
                          Reject
                        </Button>
                      </>
                    )}
                    {(application.status === 'accepted' || application.status === 'rejected') && (
                      <Button 
                        variant="outline" 
                        size="sm"
                      >
                        Send Email
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
} 