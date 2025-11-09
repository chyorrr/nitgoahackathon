'use client'

import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function LogoutButton() {
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      // Clear all localStorage data
      localStorage.clear()
      router.push('/login')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  return (
    <button
      onClick={handleLogout}
      className="text-slate-600 hover:text-slate-900 transition-colors"
    >
      Sign Out
    </button>
  )
}