"use client"
import { useState, useEffect, useRef } from 'react';
import { createClient } from '@/supabase/config';
import { Service } from '@/types';
// Remove the framer-motion import
// import { motion } from 'framer-motion';
import ImageUpload from '@/components/admin/imageUpload';

export default function ServicesPage() {
  const [services, setServices] = useState<Service>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingService, setEditingService] = useState<Service[0] | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [newFeature, setNewFeature] = useState('');
  const [fadeIn, setFadeIn] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    features: [] as string[],
    image: ''
  });

  useEffect(() => {
    async function fetchServices() {
      const supabase = createClient();
      const { data } = await supabase
        .from('services')
        .select('*')
        .order('title');

      if (data) {
        setServices(data);
      }

      setIsLoading(false);
      // Trigger fade-in animation after loading
      setTimeout(() => setFadeIn(true), 50);
    }

    fetchServices();
  }, []);

  useEffect(() => {
    if (editingService) {
      setFormData({
        title: editingService.title,
        description: editingService.description,
        features: [...editingService.features],
        image: editingService.image
      });
    } else {
      setFormData({
        title: '',
        description: '',
        features: [],
        image: ''
      });
    }
  }, [editingService]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const addFeature = () => {
    if (!newFeature.trim()) return;

    setFormData(prev => ({
      ...prev,
      features: [...prev.features, newFeature.trim()]
    }));

    setNewFeature('');
  };

  const removeFeature = (index: number) => {
    const newFeatures = [...formData.features];
    newFeatures.splice(index, 1);
    setFormData(prev => ({ ...prev, features: newFeatures }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const supabase = createClient();

      if (editingService) {
        // Update existing service
        const { error } = await supabase
          .from('services')
          .update(formData)
          .eq('id', editingService.id);

        if (error) throw error;

        // Update local state
        setServices(services.map(service =>
          service.id === editingService.id ? { ...service, ...formData } : service
        ));
      } else {
        // Create new service
        const { data, error } = await supabase
          .from('services')
          .insert([formData])
          .select();

        if (error) throw error;

        if (data) {
          setServices([...services, data[0]]);
        }
      }

      // Reset form
      setEditingService(null);
      setFormData({
        title: '',
        description: '',
        features: [],
        image: ''
      });
    } catch (error) {
      console.error('Error saving service:', error);
      alert('Failed to save service. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this service?')) return;

    try {
      const supabase = createClient();
      const { error } = await supabase
        .from('services')
        .delete()
        .eq('id', id);

      if (error) throw error;

      // Update local state
      setServices(services.filter(service => service.id !== id));

      // Reset form if currently editing this service
      if (editingService?.id === id) {
        setEditingService(null);
      }
    } catch (error) {
      console.error('Error deleting service:', error);
      alert('Failed to delete service. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div
      className={`space-y-6 transition-opacity duration-500 ${fadeIn ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
          Manage Services
        </h1>
        <button
          onClick={() => setEditingService(null)}
          className={`px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-md text-white hover:shadow-lg transition-all ${editingService ? 'opacity-50' : ''
            }`}
        >
          Add New Service
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Services List */}
        <div className="md:col-span-1 space-y-4">
          <h2 className="text-lg font-semibold text-slate-300">Services</h2>

          {services.length === 0 ? (
            <div className="p-4 bg-slate-800 rounded-lg text-slate-400">
              No services found. Create your first service!
            </div>
          ) : (
            <div className="space-y-2">
              {services.map(service => (
                <div
                  key={service.id}
                  className={`p-3 bg-slate-800 border rounded-lg cursor-pointer transition-all ${editingService?.id === service.id
                      ? 'border-orange-400'
                      : 'border-slate-700 hover:border-slate-600'
                    }`}
                  onClick={() => setEditingService(service)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-slate-200">{service.title}</h3>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(service.id);
                      }}
                      className="text-slate-400 hover:text-red-400 p-1"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-sm text-slate-400 mt-1 line-clamp-1">{service.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Service Form */}
        <div className="md:col-span-2">
          <div className="bg-slate-800 border border-slate-700 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-300 mb-4">
              {editingService ? 'Edit Service' : 'Create New Service'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="title" className="block text-sm font-medium text-slate-300">
                    Service Title <span className="text-orange-400">*</span>
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

                <div className="space-y-2">
                  <label htmlFor="description" className="block text-sm font-medium text-slate-300">
                    Description <span className="text-orange-400">*</span>
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                    rows={3}
                    className="w-full p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none resize-none"
                  />
                </div>

                <div className="space-y-2">
                  <ImageUpload
                    bucket="services"
                    existingImageUrl={formData.image}
                    onImageUploaded={(url) => setFormData(prev => ({ ...prev, image: url }))}
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-slate-300">
                    Features <span className="text-orange-400">*</span>
                  </label>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newFeature}
                      onChange={(e) => setNewFeature(e.target.value)}
                      placeholder="Add a feature"
                      className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-md text-slate-300 focus:border-orange-400 focus:ring-1 focus:ring-orange-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={addFeature}
                      className="px-3 py-2 bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600"
                    >
                      Add
                    </button>
                  </div>

                  <div className="space-y-2 mt-2">
                    {formData.features.length === 0 ? (
                      <p className="text-sm text-slate-500">No features added yet</p>
                    ) : (
                      formData.features.map((feature, index) => (
                        <div key={index} className="flex justify-between items-center p-2 bg-slate-900 rounded">
                          <span className="text-slate-300">{feature}</span>
                          <button
                            type="button"
                            onClick={() => removeFeature(index)}
                            className="text-slate-400 hover:text-red-400"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-4 gap-3">
                  <button
                    type="button"
                    onClick={() => setEditingService(null)}
                    className="px-4 py-2 bg-slate-700 text-slate-300 rounded-md hover:bg-slate-600"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-4 py-2 bg-gradient-to-r from-orange-400 to-amber-500 rounded-md text-white disabled:opacity-50 hover:shadow-lg transition-all"
                  >
                    {isSubmitting
                      ? 'Saving...'
                      : editingService ? 'Update Service' : 'Create Service'
                    }
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}