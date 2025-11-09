'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase/client'

export default function OAuthCallbackPage() {
  const router = useRouter()

  useEffect(() => {
    let mounted = true

    async function handle() {
      try {
        // After redirect from provider, supabase client may already have stored the session.
        // Try to read the session or user a few times (short retries) and then redirect.
        for (let i = 0; i < 6; i++) {
          const { data: sessionData } = await supabase.auth.getSession()
          if (sessionData?.session?.user) {
            if (mounted) return router.replace('/map')
          }
          // short delay before retry
          await new Promise((res) => setTimeout(res, 500))
        }

        // fallback: check for a user object
        const { data: userData } = await supabase.auth.getUser()
        if (userData?.user) {
          if (mounted) return router.replace('/map')
        }

        // if no session, send user to home where they can try again
        if (mounted) router.replace('/')
      } catch (e) {
        console.error('OAuth callback handling failed', e)
        if (mounted) router.replace('/')
      }
    }

    handle()

    return () => { mounted = false }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-semibold">Finishing sign-in…</h2>
        <p className="mt-2 text-sm text-slate-500">You will be redirected shortly.</p>
      </div>
    </div>
  )
}
