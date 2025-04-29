export type Service = {
    id: string
    title: string
    description: string
    features: string[]
    image: string
  }[]
  
  export type Message = {
    id: string
    name: string
    email: string
    subject: string
    message: string
    created_at: string
  }[]
  
  export type JobListing = {
    id: string
    title: string
    location: string
    employment_type: string
    description: string
    requirements: string[]
    department: string
    salary_range?: string
    slug: string
    is_published: boolean
    created_at: string
    updated_at: string
  }[]
  
  export type JobApplication = {
    id: string
    name: string
    email: string
    phone: string
    resume_url: string
    cover_letter: string
    portfolio_url?: string
    job_id: string
    status: 'pending' | 'reviewed' | 'rejected'
    created_at: string
  }[]
  
  export type Testimonial = {
    id: string
    name: string
    position: string
    company: string
    testimonial: string
    image: string
    created_at: string
  }[]