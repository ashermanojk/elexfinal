-- Script to set up storage for project images in Supabase

-- Create the bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('projects', 'projects', true)
ON CONFLICT (id) DO NOTHING;

-- Allow uploads from any user (including unauthenticated)
CREATE POLICY "Allow public uploads to projects bucket" 
ON storage.objects FOR INSERT 
TO public
WITH CHECK (bucket_id = 'projects');

-- Allow updates from any user
CREATE POLICY "Allow public updates to projects bucket" 
ON storage.objects FOR UPDATE 
TO public
USING (bucket_id = 'projects');

-- Allow downloads from any user
CREATE POLICY "Allow public reads from projects bucket" 
ON storage.objects FOR SELECT 
TO public
USING (bucket_id = 'projects');

-- Allow deletion from any user
CREATE POLICY "Allow public deletions from projects bucket" 
ON storage.objects FOR DELETE 
TO public
USING (bucket_id = 'projects'); 