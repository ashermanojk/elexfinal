-- Script to set up job applications functionality in Supabase

-- 1. First, create the job_applications table
CREATE TABLE IF NOT EXISTS job_applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id UUID NOT NULL REFERENCES job_listings(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  resume_url TEXT NOT NULL,
  cover_letter TEXT NOT NULL,
  portfolio_url TEXT,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- 2. Create an index on job_id for faster queries
CREATE INDEX IF NOT EXISTS idx_job_applications_job_id ON job_applications(job_id);

-- 3. Create an index on status for filtering applications by status
CREATE INDEX IF NOT EXISTS idx_job_applications_status ON job_applications(status);

-- 4. Create an index on created_at for sorting applications by date
CREATE INDEX IF NOT EXISTS idx_job_applications_created_at ON job_applications(created_at);

-- 5. Create storage bucket for applications
-- Note: This SQL can be executed in the Supabase dashboard's SQL editor
INSERT INTO storage.buckets (id, name, public)
VALUES ('applications', 'applications', true)
ON CONFLICT (id) DO NOTHING;

-- 6. Add a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_job_applications_updated_at
BEFORE UPDATE ON job_applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- 7. Create indexes for job_listings table if needed
-- This assumes job_listings table already exists
CREATE INDEX IF NOT EXISTS idx_job_listings_created_at ON job_listings(created_at); 