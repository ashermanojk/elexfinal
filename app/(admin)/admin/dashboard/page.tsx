"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/supabase/config';
import { Button } from '@/components/ui/button';
import { LogOut, User, AlertCircle } from 'lucide-react';

// Helper function to clear auth tokens
function clearAuthTokens() {
  // Clear localStorage
  try {
    localStorage.removeItem('auth_token')
  } catch (err) {
    console.error("Error removing localStorage token:", err)
  }
  
  // Clear cookie
  document.cookie = "auth_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"
}

export default function AdminDashboard() {
  const router = useRouter();
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      try {
        const supabase = createClient();
        const { data: { user } } = await supabase.auth.getUser();
        if (user && user.email) {
          setUserEmail(user.email);
        }
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setLoading(false);
      }
    }
    getUserInfo();
  }, []);

  const handleLogout = async () => {
    try {
      // Clear auth tokens from browser
      clearAuthTokens()
      
      // Then sign out of Supabase
      const supabase = createClient()
      await supabase.auth.signOut()
      
      // Redirect to login page
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-8"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-slate-700">
        <div className="space-y-1">
          <motion.h1 
            initial={{ y: 20 }}
            animate={{ y: 0 }}
            className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
          >
            Admin Dashboard
          </motion.h1>
          <p className="text-slate-400">Manage website content and settings</p>
        </div>

        {userEmail && (
          <div className="flex items-center gap-4">
            <div className="flex items-center p-2 bg-slate-800 rounded-lg">
              <User className="h-4 w-4 text-slate-400 mr-2" />
              <span className="text-sm">{userEmail}</span>
            </div>
            <Button 
              variant="outline"
              size="sm"
              className="border-red-600/40 hover:bg-red-950/20 hover:text-red-400 text-red-500"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { href: '/admin/messages', title: 'Messages', desc: 'View and reply to contact messages' },
          { href: '/admin/jobs', title: 'Jobs', desc: 'Manage job listings and applications' },
          { href: '/admin/projects', title: 'Projects', desc: 'Edit project portfolio' },
          { href: '/admin/services', title: 'Services', desc: 'Update service offerings' },
          { href: '/admin/applications', title: 'Applications', desc: 'Review job applications' },
        ].map((item, index) => (
          <motion.div
            key={item.href}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Link
              href={item.href}
              className="group block p-6 bg-slate-800 rounded-xl border border-slate-700 hover:border-orange-400 transition-all duration-300 hover:shadow-xl"
            >
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-slate-50 group-hover:text-orange-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-sm">{item.desc}</p>
                <div className="mt-4 w-fit flex items-center text-orange-400 group-hover:text-orange-300 transition-colors">
                  <span>Manage</span>
                  <svg className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-orange-500/10 rounded-xl border border-orange-500/20"
        >
          <div className="flex items-start mb-4">
            <AlertCircle className="h-5 w-5 text-orange-400 mr-2 flex-shrink-0 mt-0.5" />
            <h3 className="text-lg font-semibold text-orange-400">Admin Security Tips</h3>
          </div>
          <ul className="text-sm text-slate-300 space-y-2">
            <li>• Always log out when finished</li>
            <li>• Don't share your admin credentials</li>
            <li>• Use a strong, unique password</li>
            <li>• Check for suspicious activities</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
} 