-- Script to set up projects table in Supabase

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  category TEXT NOT NULL,
  description TEXT NOT NULL,
  client TEXT NOT NULL,
  industry TEXT NOT NULL,
  duration TEXT NOT NULL,
  is_featured BOOLEAN DEFAULT false,
  image_url TEXT,
  content TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create index on is_featured for faster queries
CREATE INDEX IF NOT EXISTS idx_projects_is_featured ON projects(is_featured);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_projects_category ON projects(category);

-- Create index on slug for lookups
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);

-- Add trigger to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_projects_updated_at
BEFORE UPDATE ON projects
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();

-- Insert sample data
INSERT INTO projects (title, slug, category, description, client, industry, duration, is_featured, content)
VALUES 
  (
    'Automated Assembly Line for Automotive Components', 
    'automotive-assembly-line', 
    'Manufacturing Automation', 
    'We designed and implemented a fully automated assembly line for a leading automotive parts manufacturer, resulting in a 40% increase in production capacity and 25% reduction in defect rates.', 
    'AutoParts Manufacturing Ltd.', 
    'Automotive', 
    '6 months', 
    true,
    'Detailed content about the automotive assembly line project would go here.'
  ),
  (
    'Pharmaceutical Packaging System', 
    'pharmaceutical-packaging', 
    'Process Automation', 
    'A custom-designed packaging system for a pharmaceutical company that automates the entire packaging process from filling to labeling and quality inspection, ensuring compliance with strict regulatory requirements while increasing throughput by 60%.', 
    'MediPharm Solutions', 
    'Pharmaceutical', 
    '5 months', 
    true,
    'Detailed content about the pharmaceutical packaging project would go here.'
  ),
  (
    'Smart Warehouse Management System', 
    'smart-warehouse', 
    'Industrial IoT', 
    'Implementation of an IoT-based warehouse management system with automated inventory tracking, robotic material handling, and real-time analytics dashboard for optimized operations.', 
    'Global Logistics Inc.', 
    'Logistics', 
    '4 months', 
    true,
    'Detailed content about the smart warehouse management system would go here.'
  )
ON CONFLICT (slug) DO NOTHING; 