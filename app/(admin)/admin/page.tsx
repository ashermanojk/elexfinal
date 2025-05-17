"use client"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '../../../supabase/config'

export default function AdminPage() {
  const router = useRouter()
  
  useEffect(() => {
    // Simple redirect to dashboard without auth check
    // This will be handled by the layout component
    router.push('/admin/dashboard')
  }, [router])

  // Return a loading UI while redirecting
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900">
      <div className="text-white">Redirecting to dashboard...</div>
    </div>
  )
}