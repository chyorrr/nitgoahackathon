'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle, LogOut, User, FileText, CheckCircle } from 'lucide-react'
import Link from 'next/link'
import { supabase } from '@/lib/supabase/client'

interface UserProfileButtonProps {
  onReportIssue: () => void
}

export default function UserProfileButton({ onReportIssue }: UserProfileButtonProps) {
  const router = useRouter()
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const [userName, setUserName] = useState<string>('')
  const [userEmail, setUserEmail] = useState<string>('')
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const storedName = localStorage.getItem('userName')
    const storedEmail = localStorage.getItem('userEmail')
    if (storedName) setUserName(storedName)
    if (storedEmail) setUserEmail(storedEmail)
  }, [])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', onClick)
    return () => document.removeEventListener('mousedown', onClick)
  }, [])

  const items = [
    { icon: <FileText className="w-4 h-4" />, label: 'Reported Issues', href: '/my-reports', count: 12 },
    { icon: <CheckCircle className="w-4 h-4" />, label: 'Verified Issues', href: '/verified', count: 5 },
  ]

  return (
    <div className="relative" ref={profileRef}>
      <button 
        onClick={() => setIsProfileOpen((v) => !v)} 
        className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center"
      >
        <User className="w-5 h-5 text-slate-600" />
      </button>

      {isProfileOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
          <div className="px-4 py-3 border-b border-slate-200">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 text-sm font-semibold">
                {userName ? userName[0].toUpperCase() : 'U'}
              </div>
              <div>
                <p className="text-sm font-medium text-slate-800">{userName || 'User Name'}</p>
                <p className="text-xs text-slate-500">{userEmail || 'user@example.com'}</p>
              </div>
            </div>
          </div>

          <div className="py-1">
            <button
              onClick={() => {
                onReportIssue()
                setIsProfileOpen(false)
              }}
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
            >
              <AlertCircle className="w-4 h-4 text-red-600" />
              Add New Issue
            </button>
            {items.map((item, i) => (
              <Link 
                key={i} 
                href={item.href} 
                className="flex items-center justify-between px-4 py-2 text-sm text-slate-700 hover:bg-slate-50" 
                onClick={() => setIsProfileOpen(false)}
              >
                <span className="flex items-center gap-2">
                  <span className="text-slate-500">{item.icon}</span>
                  {item.label}
                </span>
                {item.count !== undefined && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600">
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </div>

          <div className="border-t border-slate-200 py-1">
            <button 
              className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
              onClick={async () => {
                setIsProfileOpen(false)
                try {
                  await supabase.auth.signOut()
                  setUserName('')
                  setUserEmail('')
                  localStorage.clear()
                  router.replace('/login')
                } catch (error) {
                  console.error('Error logging out:', error)
                }
              }}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}