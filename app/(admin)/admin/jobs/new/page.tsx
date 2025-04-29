"use client"
import { useState } from 'react';
import { createClient } from '@/supabase/config';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function NewJobPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    employment_type: 'Full-time',
    department: '',
    description: '',
    requirements: [''],
    salary_range: '',
    is_published: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleRequirementChange = (index: number, value: string) => {
    const newRequirements = [...formData.requirements];
    newRequirements[index] = value;
    setFormData(prev => ({ ...prev, requirements: newRequirements }));
  };

  const addRequirement = () => {
    setFormData(prev => ({
      ...prev,
      requirements: [...prev.requirements, '']
    }));
  };

  const removeRequirement = (index: number) => {
    if (formData.requirements.length <= 1) return;
    const newRequirements = [...formData.requirements];
    newRequirements.splice(index, 1);
    setFormData(prev => ({ ...prev, requirements: newRequirements }));
  };

  const handleTogglePublish = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, is_published: e.target.checked }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Create a clean copy of the data with properly formatted fields
      const formattedData = {
        title: formData.title,
        location: formData.location,
        employment_type: formData.employment_type,
        department: formData.department,
        description: formData.description,
        // Filter out any empty requirements and ensure it's a proper array
        requirements: formData.requirements.filter(req => req.trim() !== ''),
        // Convert empty string to null for optional fields
        salary_range: formData.salary_range || null,
        is_published: formData.is_published,
        // Remove slug as it doesn't exist in your database table
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      
      console.log('Submitting job data:', formattedData);
      
      // Try without the select() first to see if insert works
      const supabase = createClient();
      const { error } = await supabase
        .from('job_listings')
        .insert(formattedData);
      
      if (error) {
        console.error('Supabase error code:', error.code);
        console.error('Supabase error message:', error.message);
        console.error('Supabase error details:', error.details);
        throw error;
      }
      
      console.log('Success, created job!');
      alert('Job created successfully!');
      router.push('/admin/jobs');
    } catch (error: any) {
      console.error('Full error object:', error);
      
      // Extract as much useful information as possible
      const errorMessage = error.message || 'Unknown error occurred';
      const errorDetails = error.details || '';
      const errorCode = error.code || '';
      
      alert(`Failed to create job: ${errorMessage}\nCode: ${errorCode}\nDetails: ${errorDetails}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
          Add New Job
        </h1>
        <Link 
          href="/admin/jobs"
          className="px-4 py-2 bg-slate-700 rounded-md text-slate-200 hover:bg-slate-600 transition-colors"
        >
          Cancel
        </Link>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl">
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="block text-sm font-medium text-slate-300">
              Job Title <span className="text-orange-400">*</span>
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="location" className="block text-sm font-medium text-slate-300">
                Location <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="employment_type" className="block text-sm font-medium text-slate-300">
                Employment Type <span className="text-orange-400">*</span>
              </label>
              <select
                id="employment_type"
                name="employment_type"
                value={formData.employment_type}
                onChange={handleChange}
                required
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none"
              >
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="department" className="block text-sm font-medium text-slate-300">
                Department <span className="text-orange-400">*</span>
              </label>
              <input
                type="text"
                id="department"
                name="department"
                value={formData.department}
                onChange={handleChange}
                required
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="salary_range" className="block text-sm font-medium text-slate-300">
                Salary Range
              </label>
              <input
                type="text"
                id="salary_range"
                name="salary_range"
                value={formData.salary_range}
                onChange={handleChange}
                placeholder="e.g. $50,000 - $70,000"
                className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="block text-sm font-medium text-slate-300">
              Job Description <span className="text-orange-400">*</span>
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={6}
              className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none resize-none"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-medium text-slate-300">
                Requirements <span className="text-orange-400">*</span>
              </label>
              <button 
                type="button" 
                onClick={addRequirement}
                className="text-sm text-orange-400 hover:text-orange-300"
              >
                + Add Requirement
              </button>
            </div>
            <div className="space-y-2">
              {formData.requirements.map((req, index) => (
                <div key={index} className="flex gap-2">
                  <input
                    type="text"
                    value={req}
                    onChange={(e) => handleRequirementChange(index, e.target.value)}
                    placeholder={`Requirement ${index + 1}`}
                    required
                    className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeRequirement(index)}
                    disabled={formData.requirements.length <= 1}
                    className="p-2 text-slate-400 hover:text-red-400 disabled:opacity-30"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="is_published"
              name="is_published"
              checked={formData.is_published}
              onChange={handleTogglePublish}
              className="w-4 h-4 text-orange-400 bg-slate-900 border border-slate-700 rounded focus:ring-orange-400"
            />
            <label htmlFor="is_published" className="text-sm font-medium text-slate-300">
              Publish immediately
            </label>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <Link 
            href="/admin/jobs"
            className="px-4 py-2 rounded-md text-slate-300 hover:bg-slate-700 transition-colors"
          >
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-md text-white disabled:opacity-50 hover:shadow-lg transition-all"
          >
            {isSubmitting ? 'Creating...' : 'Create Job'}
          </button>
        </div>
      </form>
    </motion.div>
  );
} 