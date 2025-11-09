import { supabase } from './supabase/client'

export async function clearAuthData() {
  localStorage.removeItem('isLoggedIn')
  localStorage.removeItem('userName')
  localStorage.removeItem('userEmail')
}

export async function storeAuthData(user: any) {
  if (!user) {
    await clearAuthData()
    return
  }

  localStorage.setItem('isLoggedIn', 'true')
  localStorage.setItem('userName', user.user_metadata?.full_name || user.email?.split('@')[0] || '')
  localStorage.setItem('userEmail', user.email || '')
}

export async function handleLogout() {
  try {
    await supabase.auth.signOut()
    await clearAuthData()
  } catch (error) {
    console.error('Error during logout:', error)
  }
}

export async function getCurrentUser() {
  try {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) {
      await storeAuthData(user)
      return user
    }
    await clearAuthData()
    return null
  } catch (error) {
    console.error('Error getting current user:', error)
    await clearAuthData()
    return null
  }
}