"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { createClient } from "@/supabase/config"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Loader2 } from "lucide-react"
import Link from "next/link"

// Helper function to set both cookie and localStorage
function setAuthToken() {
  // Set localStorage for client-side checks
  try {
    localStorage.setItem('auth_token', 'authenticated')
  } catch (err) {
    console.error("Could not set localStorage:", err)
  }
  
  // Set cookie for middleware checks (30-day expiration)
  document.cookie = `auth_token=authenticated; path=/; max-age=${60*60*24*30}; SameSite=Lax`
}

// Helper function to check auth token
function getAuthToken() {
  // Try localStorage first
  try {
    const localToken = localStorage.getItem('auth_token')
    if (localToken) return true
  } catch (err) {
    console.error("LocalStorage error:", err)
  }
  
  // Fall back to cookie
  return document.cookie.split(';').some(item => item.trim().startsWith('auth_token='))
}

// Helper function to clear auth token
function clearAuthToken() {
  // Clear localStorage
  try {
    localStorage.removeItem('auth_token')
  } catch (err) {
    console.error("LocalStorage error:", err)
  }
  
  // Clear cookie
  document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

// Separate component that uses searchParams
function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [checkingSession, setCheckingSession] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  // Get the redirect target
  const redirectTarget = searchParams.get('redirectTo') || '/admin/dashboard'

  // Check if user is already logged in
  useEffect(() => {
    // Set a timeout to prevent infinite loading state
    const timeoutId = setTimeout(() => {
      setCheckingSession(false)
      console.log("Session check timed out")
    }, 3000) // 3 seconds timeout

    const checkSession = async () => {
      try {
        console.log("Checking authentication status...")
        
        // Check for auth token using helper function
        const isAuthenticated = getAuthToken()
        console.log("Auth token check:", isAuthenticated ? "found" : "not found")
        
        // If we have a token, skip Supabase check and go directly to target
        if (isAuthenticated) {
          console.log("Found auth token, redirecting to:", redirectTarget)
          // Check for redirect loop
          if (redirectTarget.includes('/admin') && window.location.href.includes('/login?redirectTo=/admin')) {
            // Break the loop by sending to a specific admin page
            window.location.href = '/admin/dashboard'
          } else {
            window.location.href = redirectTarget
          }
          return
        }
        
        // If no local token, check with Supabase
        const supabase = createClient()
        console.log("Checking Supabase session...")
        const { data, error: sessionError } = await supabase.auth.getSession()
        
        if (sessionError) {
          throw sessionError
        }
        
        if (data.session) {
          console.log("Supabase session found:", data.session.user.email)
          // If Supabase confirms auth, set our tokens
          setAuthToken()
          console.log("Auth confirmed by Supabase, redirecting to:", redirectTarget)
          window.location.href = redirectTarget
        } else {
          console.log("No Supabase session found")
          // Not authenticated, stay on login page
          setCheckingSession(false)
        }
      } catch (error: any) {
        console.error("Session check error:", error)
        setCheckingSession(false)
        setError("Authentication check failed. Please log in again.")
      } finally {
        clearTimeout(timeoutId) // Clear timeout if check completes
      }
    }
    
    checkSession()
    
    return () => clearTimeout(timeoutId) // Clean up timeout
  }, [redirectTarget])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      console.log(`Attempting login with email: ${email}`)
      const supabase = createClient()
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error
      
      console.log("Login successful:", data.user?.email)
      
      // On successful login, set auth token and redirect
      setAuthToken()
      console.log("Set auth tokens in browser")
      
      console.log("Login successful, redirecting to:", redirectTarget)
      
      // Force browser to redirect after a short delay
      setTimeout(() => {
        window.location.href = redirectTarget
      }, 300)
      
    } catch (error: any) {
      console.error("Login error:", error)
      setError(error.message || "Failed to sign in")
      setLoading(false)
    }
  }

  // Show a loading state while checking the session, but with a "Continue to login" button
  if (checkingSession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-slate-900">
        <div className="text-orange-400 text-xl mb-8 flex items-center">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          Checking authentication...
        </div>
        <Button 
          variant="outline" 
          onClick={() => setCheckingSession(false)}
          className="mt-4"
        >
          Continue to login
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 px-4">
      <Card className="w-full max-w-md border-slate-700 bg-slate-800/50 shadow-xl">
        <CardHeader className="space-y-2 text-center">
          <CardTitle className="text-2xl font-bold text-white">Admin Login</CardTitle>
          <CardDescription>
            Enter your credentials to access the admin dashboard
          </CardDescription>
          {redirectTarget && redirectTarget !== '/admin/dashboard' && (
            <div className="text-xs text-slate-400 mt-1">
              You'll be redirected to: {redirectTarget.replace(/%2F/g, '/')}
            </div>
          )}
        </CardHeader>
        <form onSubmit={handleLogin}>
          <CardContent className="space-y-4">
            {error && (
              <div className="p-3 text-sm bg-red-900/30 border border-red-800 text-red-300 rounded-md">
                {error}
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="bg-slate-700 border-slate-600"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="bg-slate-700 border-slate-600"
              />
            </div>
          </CardContent>
          
          <CardFooter className="flex flex-col gap-3">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign In"
              )}
            </Button>
            
            <div className="text-center text-sm text-slate-400 mt-2">
              <Link href="/" className="hover:text-white transition-colors">
                Return to website
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

// Main component with Suspense boundary
export default function Login() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-slate-900">
        <div className="text-orange-400 text-xl flex items-center">
          <Loader2 className="mr-2 h-6 w-6 animate-spin" />
          Loading...
        </div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
} 