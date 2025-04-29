"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { createClient } from "@/supabase/config"
import { toast } from "@/hooks/use-toast"
import { AlertCircle, CheckCircle, FileText, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Job listing type definition
type JobListing = {
  id: string
  title: string
  location: string
  employment_type: string
  description: string
  requirements: string[]
  department: string
  salary_range?: string
  slug: string
}

export default function ApplicationForm() {
  const router = useRouter()
  const { id } = useParams()
  const [job, setJob] = useState<JobListing | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cover_letter: '',
    portfolio_url: ''
  })

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from('job_listings')
          .select('*')
          .eq('id', id)
          .single()

        if (error) throw error
        setJob(data)
      } catch (error: any) {
        console.error('Error fetching job:', error)
        toast({
          title: "Error",
          description: "Failed to load job details",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }
    
    fetchJob()
  }, [id])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      setResumeFile(null)
      return
    }
    
    const file = e.target.files[0]
    // 5MB file size limit
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: "File too large",
        description: "Resume file must be less than 5MB",
        variant: "destructive"
      })
      e.target.value = ''
      return
    }
    
    // Validate file type
    const validFileTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
    if (!validFileTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF, DOC, or DOCX file",
        variant: "destructive"
      })
      e.target.value = ''
      return
    }
    
    setResumeFile(file)
    setErrorMessage(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    
    // Validate form
    if (!resumeFile) {
      setErrorMessage("Please upload your resume")
      return
    }
    
    try {
      setSubmitting(true)
      const supabase = createClient()
      
      // Check if the bucket exists and create it if needed
      try {
        const { data: buckets } = await supabase
          .storage
          .listBuckets()
        
        const bucketExists = buckets?.some(bucket => bucket.name === 'applications') || false
        
        // If bucket doesn't exist, try to create it
        if (!bucketExists) {
          await supabase.storage.createBucket('applications', {
            public: true,
            fileSizeLimit: 5242880 // 5MB
          })
        }
      } catch (bucketError) {
        console.error('Bucket check/creation error:', bucketError)
        // Continue anyway, as the bucket might exist but we don't have permission to list
      }
      
      // Generate unique filename
      const fileExt = resumeFile.name.split('.').pop()
      const uniqueId = crypto.randomUUID().replace(/-/g, '')
      const fileName = `${uniqueId}_${Date.now().toString()}.${fileExt}`
      const filePath = `resumes/${fileName}`
      
      // Upload resume to storage
      const { error: uploadError } = await supabase.storage
        .from('applications')
        .upload(filePath, resumeFile, {
          cacheControl: '3600',
          upsert: false
        })
      
      if (uploadError) {
        throw new Error(`Resume upload failed: ${uploadError.message}`)
      }
      
      // Get the public URL
      const { data: urlData } = supabase.storage
        .from('applications')
        .getPublicUrl(filePath)
      
      if (!urlData || !urlData.publicUrl) {
        throw new Error("Failed to generate resume URL")
      }
      
      const publicUrl = urlData.publicUrl
      
      // Submit application
      const applicationData = {
        name: formData.name.trim(),
        email: formData.email.trim(),
        phone: formData.phone.trim(),
        resume_url: publicUrl,
        cover_letter: formData.cover_letter.trim(),
        portfolio_url: formData.portfolio_url.trim() || null,
        job_id: Array.isArray(id) ? id[0] : id,
        status: 'pending' as const,
        created_at: new Date().toISOString()
      }
      
      const { error: submitError } = await supabase
        .from('job_applications')
        .insert(applicationData)
      
      if (submitError) {
        // Delete the uploaded file if application submission fails
        await supabase.storage.from('applications').remove([filePath])
        throw new Error(`Application submission failed: ${submitError.message}`)
      }
      
      toast({
        title: "Success!",
        description: "Your application has been submitted successfully",
      })
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        cover_letter: '',
        portfolio_url: ''
      })
      setResumeFile(null)
      
      // Redirect to careers page after short delay
      setTimeout(() => {
        router.push('/careers')
      }, 1500)
      
    } catch (error: any) {
      console.error('Error submitting application:', error)
      setErrorMessage(error.message || "Failed to submit application")
      toast({
        title: "Error",
        description: error.message || "Failed to submit application. Please try again.",
        variant: "destructive"
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2">Loading job details...</span>
        </div>
      ) : job ? (
        <>
          <div className="mb-12 space-y-6">
            <h1 className="text-4xl font-bold text-primary">{job.title}</h1>
            <div className="flex gap-4 text-muted-foreground">
              <span>{job.location}</span>
              <span>•</span>
              <span>{job.employment_type}</span>
              {job.salary_range && (
                <>
                  <span>•</span>
                  <span>{job.salary_range}</span>
                </>
              )}
            </div>
            
            <div className="prose dark:prose-invert max-w-none">
              <h3 className="text-2xl font-semibold">About the Role</h3>
              <p>{job.description}</p>
              
              <h3 className="text-2xl font-semibold mt-6">Requirements</h3>
              <ul className="space-y-2">
                {job.requirements.map((req, i) => (
                  <li key={i} className="flex items-start">
                    <CheckCircle className="h-5 w-5 text-primary mr-2 flex-shrink-0 mt-0.5" />
                    {req}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="border-t pt-12">
            <h2 className="text-3xl font-bold text-primary mb-6">Apply Now</h2>
            
            {errorMessage && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="name" 
                    name="name" 
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email" 
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com" 
                    required 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <Input 
                    id="phone" 
                    name="phone" 
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567" 
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="portfolio_url" className="text-sm font-medium">
                    Portfolio URL (Optional)
                  </label>
                  <Input 
                    id="portfolio_url" 
                    name="portfolio_url" 
                    type="url"
                    value={formData.portfolio_url}
                    onChange={handleChange} 
                    placeholder="https://yourportfolio.com" 
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="resume" className="text-sm font-medium">
                  Resume <span className="text-red-500">*</span>
                </label>
                <div className={`border-2 border-dashed rounded-lg p-4 transition-colors ${resumeFile ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-300 dark:border-gray-700 hover:border-primary'}`}>
                  <label className="flex flex-col items-center justify-center cursor-pointer">
                    <FileText className={`h-8 w-8 mb-2 ${resumeFile ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className="text-sm text-center font-medium">
                      {resumeFile ? resumeFile.name : 'Upload your resume (PDF, DOC, DOCX)'}
                    </span>
                    <span className="text-xs text-gray-500 mt-1">
                      Max file size: 5MB
                    </span>
                    <input 
                      type="file" 
                      id="resume"
                      onChange={handleFileChange}
                      className="hidden" 
                      accept=".pdf,.doc,.docx"
                    />
                  </label>
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="cover_letter" className="text-sm font-medium">
                  Cover Letter <span className="text-red-500">*</span>
                </label>
                <Textarea
                  id="cover_letter"
                  name="cover_letter"
                  value={formData.cover_letter}
                  onChange={handleChange}
                  placeholder="Tell us why you're interested in this position and why you'd be a great fit..."
                  rows={6}
                  required
                />
              </div>

              <Button 
                type="submit" 
                className="w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Submitting Application...
                  </>
                ) : 'Submit Application'}
              </Button>
            </form>
          </div>
        </>
      ) : (
        <div className="text-center py-12">
          <AlertCircle className="h-12 w-12 text-destructive mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-2">Job listing not found</h2>
          <p className="text-muted-foreground mb-6">The job you're looking for may have been removed or is no longer available.</p>
          <Button onClick={() => router.push('/careers')}>
            View All Job Listings
          </Button>
        </div>
      )}
    </div>
  )
}