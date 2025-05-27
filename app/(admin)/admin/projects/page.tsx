"use client"
import { useState, useEffect } from 'react';
import { createClient } from '@/supabase/config';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Loader2, Star, Trash2, Upload } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { Check, Plus, X } from 'lucide-react';
import ImageUpload from '@/components/admin/imageUpload';

// Define project type to match the database schema
interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  client: string;
  industry: string;
  duration: string;
  is_featured: boolean;
  image_url?: string;
  content?: string;
  created_at?: string;
  updated_at?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Form state
  const [formData, setFormData] = useState<Omit<Project, 'id' | 'created_at' | 'updated_at'>>({
    title: '',
    slug: '',
    category: '',
    description: '',
    client: '',
    industry: '',
    duration: '',
    is_featured: false,
    image_url: '',
    content: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const supabase = createClient();
      
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('is_featured', { ascending: false })
        .order('created_at', { ascending: false });

      if (error) throw error;
      
      setProjects(data || []);
    } catch (error: any) {
      console.error('Error fetching projects:', error);
      toast({
        title: "Error loading projects",
        description: error.message || "Failed to load projects",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (editingProject) {
      setFormData({
        title: editingProject.title,
        slug: editingProject.slug,
        category: editingProject.category,
        description: editingProject.description,
        client: editingProject.client,
        industry: editingProject.industry,
        duration: editingProject.duration,
        is_featured: editingProject.is_featured,
        image_url: editingProject.image_url || '',
        content: editingProject.content || ''
      });
    } else {
      resetForm();
    }
  }, [editingProject]);

  const resetForm = () => {
    setFormData({
      title: '',
      slug: '',
      category: '',
      description: '',
      client: '',
      industry: '',
      duration: '',
      is_featured: false,
      image_url: '',
      content: ''
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Auto-generate slug from title if slug field is empty
    if (name === 'title' && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')  // Remove special chars
        .replace(/\s+/g, '-')      // Replace spaces with hyphens
        .replace(/-+/g, '-');      // Remove duplicate hyphens
      
      setFormData(prev => ({ ...prev, slug }));
    }
  };

  const handleSwitchChange = (name: string, checked: boolean) => {
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    const requiredFields = ['title', 'slug', 'category', 'description', 'client', 'industry', 'duration'];
    const missingFields = requiredFields.filter(field => !formData[field as keyof typeof formData]);
    
    if (missingFields.length > 0) {
      toast({
        title: "Missing required fields",
        description: `Please fill in: ${missingFields.join(', ')}`,
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);

    try {
      const projectData = { ...formData };
      
      const supabase = createClient();

      if (editingProject) {
        // Update existing project
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingProject.id);

        if (error) throw error;
        
        toast({
          title: "Project updated",
          description: "Project has been updated successfully",
        });

        // Update local state
        setProjects(projects.map(project =>
          project.id === editingProject.id ? { ...project, ...projectData } : project
        ));
      } else {
        // Create new project
        const { data, error } = await supabase
          .from('projects')
          .insert([projectData])
          .select();

        if (error) throw error;
        
        toast({
          title: "Project created",
          description: "New project has been created successfully",
        });

        if (data) {
          setProjects([...projects, data[0]]);
        }
      }

      // Reset form
      setEditingProject(null);
      resetForm();
    } catch (error: any) {
      console.error('Error saving project:', error);
      toast({
        title: "Error saving project",
        description: error.message || "Failed to save project",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;

      toast({
        title: "Project deleted",
        description: "Project has been deleted successfully",
      });
      
      // Update local state
      setProjects(projects.filter(project => project.id !== id));

      // Reset form if currently editing this project
      if (editingProject?.id === id) {
        setEditingProject(null);
      }
    } catch (error: any) {
      console.error('Error deleting project:', error);
      toast({
        title: "Error deleting project",
        description: error.message || "Failed to delete project",
        variant: "destructive"
      });
    }
  };

  const toggleFeatured = async (id: string, currentStatus: boolean) => {
    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('projects')
        .update({ is_featured: !currentStatus })
        .eq('id', id);

      if (error) throw error;

      toast({
        title: `Project ${!currentStatus ? 'featured' : 'unfeatured'}`,
        description: `Project has been ${!currentStatus ? 'set as featured' : 'removed from featured'}`,
      });
      
      // Update local state
      setProjects(projects.map(project =>
        project.id === id ? { ...project, is_featured: !currentStatus } : project
      ));
    } catch (error: any) {
      console.error('Error updating featured status:', error);
      toast({
        title: "Error updating project",
        description: error.message || "Failed to update featured status",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-8 w-8 animate-spin mr-2" />
        <span>Loading projects...</span>
      </div>
    );
  }

  return (
    <div className="container py-10 space-y-8 ">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-100">Manage Projects</h1>
        <Button 
          onClick={() => setEditingProject(null)}
          variant={!editingProject ? "secondary" : "outline"}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add New Project
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Projects List */}
        <div className="lg:col-span-1 space-y-4 max-h-[800px] overflow-y-auto pr-2">
          <h2 className="text-lg font-semibold text-gray-100">Projects</h2>

          {projects.length === 0 ? (
            <div className="p-6 border rounded-lg text-gray-100 text-center">
              No projects found. Create your first project!
            </div>
          ) : (
            projects.map((project) => (
              <motion.div
                key={project.id}
                initial={{ scale: 0.98 }}
                whileHover={{ scale: 1 }}
                className={`relative border rounded-lg overflow-hidden transition-all cursor-pointer ${
                  editingProject?.id === project.id
                    ? 'border-primary shadow-md'
                    : 'border-border hover:border-primary/50'
                }`}
                onClick={() => setEditingProject(project)}
              >
                <div className="relative h-32 bg-gray-100/10">
                  {project.image_url && (
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {project.is_featured && (
                    <div className="absolute top-2 left-2 px-2 py-0.5 bg-amber-500/90 text-white rounded text-xs font-medium">
                      Featured
                    </div>
                  )}

                  <div className="absolute top-2 right-2 flex gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFeatured(project.id, project.is_featured);
                      }}
                      className={`p-1.5 rounded-full bg-black/50 ${
                        project.is_featured ? 'text-amber-400' : 'text-white/70'
                      }`}
                      title={project.is_featured ? 'Remove from featured' : 'Set as featured'}
                    >
                      <Star className="w-4 h-4" />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(project.id);
                      }}
                      className="p-1.5 rounded-full bg-black/50 text-red-400"
                      title="Delete project"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-medium text-gray-100">{project.title}</h3>
                  <div className="flex justify-between text-xs text-gray-100 mt-1">
                    <span>{project.category}</span>
                    <span>{project.industry}</span>
                  </div>
                  <p className="text-sm mt-2 line-clamp-2 text-gray-100">{project.description}</p>
                </div>
              </motion.div>
            ))
          )}
        </div>

        {/* Project Form */}
        <div className="lg:col-span-2">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-6 text-gray-100">
              {editingProject ? 'Edit Project' : 'Create New Project'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-5 bg-card p-6 rounded-lg border border-foreground/30">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title <span className="text-red-500">*</span></Label>
                  <Input
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter project title"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="slug">Slug <span className="text-red-500">*</span></Label>
                  <Input
                    id="slug"
                    name="slug"
                    value={formData.slug}
                    onChange={handleChange}
                    placeholder="project-url-slug"
                    pattern="[a-z0-9-]+"
                    title="Only lowercase letters, numbers, and hyphens are allowed"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="category">Category <span className="text-red-500">*</span></Label>
                  <Input
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    placeholder="e.g. Manufacturing Automation"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="industry">Industry <span className="text-red-500">*</span></Label>
                  <Input
                    id="industry"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="e.g. Automotive"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="client">Client <span className="text-red-500">*</span></Label>
                  <Input
                    id="client"
                    name="client"
                    value={formData.client}
                    onChange={handleChange}
                    placeholder="Client name"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="duration">Duration <span className="text-red-500">*</span></Label>
                  <Input
                    id="duration"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 6 months"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description <span className="text-red-500">*</span></Label>
                <Textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Short description of the project"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Detailed Content</Label>
                <Textarea
                  id="content"
                  name="content"
                  value={formData.content || ''}
                  onChange={handleChange}
                  placeholder="Detailed project description and information"
                  rows={6}
                />
              </div>

              <div className="space-y-2">
                <Label>Project Image</Label>
                <div className="space-y-2">
                  <ImageUpload
                    bucket="projects"
                    existingImageUrl={formData.image_url}
                    onImageUploaded={(url) => setFormData(prev => ({ ...prev, image_url: url }))}
                  />
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Switch
                  id="is_featured"
                  checked={formData.is_featured}
                  onCheckedChange={(checked) => handleSwitchChange('is_featured', checked)}
                />
                <Label htmlFor="is_featured">Feature this project</Label>
              </div>

              <div className="flex justify-end gap-3 pt-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setEditingProject(null)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      {editingProject ? 'Updating...' : 'Creating...'}
                    </>
                  ) : (
                    editingProject ? 'Update Project' : 'Create Project'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 