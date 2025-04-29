// components/admin/ImageUpload.tsx
"use client"

import { useState, useEffect } from "react"
import { createClient } from "@/supabase/config"
import Image from "next/image"
import { motion } from "framer-motion"

interface ImageUploadProps {
  bucket: string  // 'services' or 'projects'
  onImageUploaded: (url: string) => void
  existingImageUrl?: string
  folder?: string
}

export default function ImageUpload({ 
  bucket, 
  onImageUploaded, 
  existingImageUrl,
  folder = "images"
}: ImageUploadProps) {
  const [imageUrl, setImageUrl] = useState<string | null>(existingImageUrl || null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [preview, setPreview] = useState<string | null>(existingImageUrl || null)
  
  useEffect(() => {
    if (existingImageUrl) {
      setImageUrl(existingImageUrl)
      setPreview(existingImageUrl)
    }
  }, [existingImageUrl])

  const uploadImage = async (file: File) => {
    try {
      setUploading(true)
      setError(null)
      
      // Create a unique filename
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now().toString()}.${fileExt}`
      const filePath = `${folder}/${fileName}`
      
      // Get a preview before upload completes
      const objectUrl = URL.createObjectURL(file)
      setPreview(objectUrl)
      
      // Upload to Supabase
      const supabase = createClient()
      const { data, error } = await supabase.storage
        .from(bucket)
        .upload(filePath, file, {
          cacheControl: '3600',
          upsert: true,
        })
      
      if (error) {
        throw error
      }
      
      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath)
      
      setImageUrl(publicUrl)
      onImageUploaded(publicUrl)
      
      // Clean up preview URL
      URL.revokeObjectURL(objectUrl)
    } catch (error: any) {
      setError(`Error uploading image: ${error.message}`)
      console.error('Error uploading image:', error)
    } finally {
      setUploading(false)
    }
  }
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) {
      return
    }
    
    const file = e.target.files[0]
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB')
      return
    }
    
    // Check if it's an image
    if (!file.type.startsWith('image/')) {
      setError('File must be an image')
      return
    }
    
    uploadImage(file)
  }
  
  const removeImage = async () => {
    if (!imageUrl) return
    
    try {
      setUploading(true)
      setError(null)
      
      // Extract the path from the URL
      const supabase = createClient()
      const path = imageUrl.split(`${bucket}/`)[1]
      
      if (path) {
        const { error } = await supabase.storage
          .from(bucket)
          .remove([path])
        
        if (error) throw error
      }
      
      setImageUrl(null)
      setPreview(null)
      onImageUploaded("")
    } catch (error: any) {
      setError(`Error removing image: ${error.message}`)
      console.error('Error removing image:', error)
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <label className="block text-sm font-medium text-slate-300">
          Image Upload <span className="text-orange-400">*</span>
        </label>
        {uploading && (
          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-orange-500"></div>
        )}
      </div>
      
      {error && (
        <div className="p-2 bg-red-900/30 text-red-400 text-sm rounded-md">
          {error}
        </div>
      )}
      
      <div className="relative border-2 border-dashed border-slate-700 rounded-lg p-4 hover:border-orange-400 transition-colors">
        {preview ? (
          <div className="relative">
            <div className="relative w-full h-48 rounded-md overflow-hidden bg-slate-800">
              <Image 
                src={preview} 
                alt="Preview" 
                fill 
                className="object-contain"
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={removeImage}
              disabled={uploading}
              className="absolute top-2 right-2 bg-red-900/70 text-red-400 p-2 rounded-full"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </motion.button>
          </div>
        ) : (
          <label className="flex flex-col items-center justify-center h-48 cursor-pointer">
            <svg className="w-12 h-12 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <p className="mt-2 text-sm text-slate-400">
              Drag & drop an image or <span className="text-orange-400">browse</span>
            </p>
            <p className="mt-1 text-xs text-slate-500">
              Max file size: 5MB
            </p>
            <input 
              type="file" 
              className="hidden" 
              onChange={handleFileChange} 
              accept="image/*"
              disabled={uploading}
            />
          </label>
        )}
      </div>
      
      {imageUrl && (
        <div className="mt-2">
          <p className="text-xs text-slate-400 truncate">
            Image URL: <span className="text-orange-400">{imageUrl}</span>
          </p>
        </div>
      )}
    </div>
  )
}