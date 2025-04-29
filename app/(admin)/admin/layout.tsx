"use client"

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { createClient } from '@/supabase/config'
import Sidebar from './components/Sidebar'
import { Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const pathname = usePathname()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Set a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.log("Admin auth check timed out")
      setLoading(false)
      setError("Authentication check timed out. Please try again.")
    }, 5000)

    async function checkAuth() {
      try {
        console.log("Checking admin authentication...")
        // First, check localStorage for quick auth
        let localAuth
        try {
          localAuth = localStorage.getItem('auth_token')
          console.log("Admin localStorage check:", localAuth ? "token found" : "no token")
        } catch (err) {
          console.error("Admin localStorage error:", err)
          localAuth = null
        }
        
        if (localAuth) {
          // We have a local auth token, but double-check with Supabase
          const supabase = createClient()
          console.log("Verifying admin with Supabase...")
          const { data, error: userError } = await supabase.auth.getUser()
          
          if (userError) {
            throw userError
          }
          
          if (data.user) {
            console.log("Admin authenticated:", data.user.email)
            // Both local and Supabase auth confirmed
            setIsAuthenticated(true)
            setLoading(false)
            clearTimeout(timeoutId)
            return
          } else {
            console.log("Supabase auth failed despite localStorage token")
            // Local token is invalid, clear it
            try {
              localStorage.removeItem('auth_token')
            } catch (err) {
              console.error("Error removing localStorage token:", err)
            }
          }
        }
        
        // No local auth or Supabase session, redirect to login
        console.log("No admin authentication found, redirecting to login")
        window.location.href = `/login?redirectTo=${encodeURIComponent(pathname)}`
        
      } catch (error: any) {
        console.error('Admin auth check error:', error)
        setError(`Authentication error: ${error.message || "Unknown error"}`)
        setLoading(false)
        
        // Clear local auth token on error
        try {
          localStorage.removeItem('auth_token')
        } catch (err) {
          console.error("Error removing localStorage token:", err)
        }
      } finally {
        clearTimeout(timeoutId)
      }
    }
    
    checkAuth()
    
    return () => clearTimeout(timeoutId)
  }, [pathname])

  // If checking auth or redirecting, show minimal loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center">
        <div className="flex items-center text-orange-400 text-xl mb-8">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          Loading admin panel...
        </div>
        <div className="text-slate-400 text-sm">Please wait while we verify your credentials</div>
      </div>
    )
  }

  // Show error state with retry button
  if (error) {
    return (
      <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center px-4">
        <div className="bg-red-900/20 border border-red-800 rounded-lg p-6 max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-300 mb-4">Authentication Error</h2>
          <p className="text-slate-300 mb-6">{error}</p>
          <div className="flex gap-4 justify-center">
            <Button 
              variant="outline" 
              onClick={() => window.location.href = '/login'}
            >
              Go to Login
            </Button>
            <Button onClick={() => window.location.reload()}>
              Try Again
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Only show content if authenticated
  if (!isAuthenticated) {
    return null // This shouldn't render as we redirect, but just in case
  }

  return (
    <div className="flex min-h-screen bg-slate-900 relative">
      <Sidebar />
      <main className="ml-0 lg:ml-64 p-6 w-full">
        <div className="lg:hidden mb-6">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent">
            Admin Panel
          </h1>
        </div>
        {children}
      </main>
    </div>
  );
} 