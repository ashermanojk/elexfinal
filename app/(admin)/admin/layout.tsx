"use client"

import Sidebar from './components/Sidebar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
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