"use client"
import { redirect } from "next/navigation";
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import  {createClient}  from '../../../supabase/config'

export default function AdminDashboard() {
  const router = useRouter()
  const supabase = createClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) router.push('/login')
    }
    checkSession()
  }, [router, supabase])

  return (
    redirect("/admin/dashboard")
  );
} 