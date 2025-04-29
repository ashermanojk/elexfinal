"use client"
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen p-8 space-y-8 bg-slate-900 mt-50"
    >
      <div className="space-y-2">
        <motion.h1 
          initial={{ y: 20 }}
          animate={{ y: 0 }}
          className="text-4xl font-bold bg-gradient-to-r from-orange-400 to-amber-500 bg-clip-text text-transparent"
        >
          Admin Dashboard
        </motion.h1>
        <p className="text-slate-400">Manage website content and settings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[
          { href: '/admin/messages', title: 'Messages', desc: 'View and reply to contact messages' },
          { href: '/admin/jobs', title: 'Jobs', desc: 'Manage job listings and applications' },
          { href: '/admin/projects', title: 'Projects', desc: 'Edit project portfolio' },
          { href: '/admin/services', title: 'Services', desc: 'Update service offerings' },
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
      </div>
    </motion.div>
  );
} 