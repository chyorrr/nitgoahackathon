'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, Lock, Shield, Eye, EyeOff, ArrowRight, Check, User, MapPin } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase/client'
import { useEffect } from 'react'

export default function SignUpPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: ''
  });
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [captchaValue, setCaptchaValue] = useState('');
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)
  const [generatedCaptcha] = useState(() => {
    // Generate random captcha
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghjkmnpqrstuvwxyz23456789';
    return Array.from({ length: 6 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrorMessage(null)
    if (captchaValue !== generatedCaptcha) {
      alert('Invalid CAPTCHA. Please try again.')
      return
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    setCaptchaVerified(true)
    setLoading(true)

    console.log('Attempting signup with:', { email: formData.email })
    const { data, error } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options: {
        data: {
          full_name: formData.fullName,
          phone: formData.phone,
          address: formData.address
        }
      }
    })

    setLoading(false)

    if (error) {
      const errorMsg = error.message
      setErrorMessage(errorMsg)
      console.error('Signup failed:', { error: errorMsg, code: error.status })
      return
    }

    console.log('Signup successful:', { 
      user: data?.user?.id,
      confirmed: data?.user?.confirmed_at,
      email: data?.user?.email 
    })

    try {
      localStorage.setItem('isLoggedIn', 'true')
      localStorage.setItem('userName', formData.fullName)
      localStorage.setItem('userEmail', formData.email)
    } catch (e) {
      // ignore localStorage errors
    }

    // Note: Email confirmation may be required depending on Supabase settings
    router.push('/map')
  }

  return (
    <div className="min-h-screen pt-16 bg-linear-to-br from-[#F8F9FA] via-white to-[#69F0AE]/10 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#69F0AE]/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-[#00C853]/10 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-float" style={{animationDelay: '2s'}}></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-50 w-full max-w-md mt-6"
      >
        {/* Sign Up Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-8"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name Input */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-slate-700 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="fullName"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="John Doe"
                />
              </div>
            </div>

            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                Phone Number
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  id="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="+1 (555) 000-0000"
                />
              </div>
            </div>

            {/* Address Input */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium text-slate-700 mb-1.5">
                Address
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  id="address"
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="123 Main St, City, State"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-slate-700 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-2.5 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-700 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-11 pr-12 py-2.5 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all duration-300 bg-white/50"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* CAPTCHA */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">
                Verify you're human
              </label>
              <div className="space-y-2.5">
                {/* CAPTCHA Display */}
                <div className="bg-linear-to-r from-slate-100 to-slate-200 rounded-lg p-3 border border-[#E0E0E0]">
                  <div className="flex items-center justify-center gap-4">
                    <div className="text-2xl font-mono font-bold text-slate-700 tracking-widest select-none" style={{
                      textShadow: '2px 2px 4px rgba(0,0,0,0.1)',
                      letterSpacing: '0.3em'
                    }}>
                      {generatedCaptcha.split('').map((char, i) => (
                        <span key={i} style={{
                          display: 'inline-block',
                          transform: `rotate(${Math.random() * 20 - 10}deg)`,
                          color: `hsl(${Math.random() * 60 + 200}, 70%, 45%)`
                        }}>
                          {char}
                        </span>
                      ))}
                    </div>
                    <Shield className="w-5 h-5 text-slate-500" />
                  </div>
                </div>

                {/* CAPTCHA Input */}
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={captchaValue}
                    onChange={(e) => setCaptchaValue(e.target.value)}
                    className="w-full px-4 py-2.5 border border-[#E0E0E0] rounded-lg focus:ring-2 focus:ring-[#2979FF] focus:border-transparent transition-all duration-300 bg-white/50"
                    placeholder="Enter the code above"
                  />
                  {captchaVerified && (
                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#00C853]" />
                  )}
                </div>
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="flex items-start gap-2">
              <input
                type="checkbox"
                id="terms"
                required
                className="w-4 h-4 mt-1 rounded border-[#E0E0E0] text-[#2979FF] focus:ring-[#2979FF] transition-all"
              />
              <label htmlFor="terms" className="text-sm text-slate-600">
                I agree to the{' '}
                <Link href="/terms" className="text-[#2979FF] hover:text-[#69F0AE] font-medium transition-colors">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-[#2979FF] hover:text-[#69F0AE] font-medium transition-colors">
                  Privacy Policy
                </Link>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2 px-6 py-2.5 bg-[#00C853] text-white rounded-lg hover:bg-[#69F0AE] transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              <span>Create Account</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-5">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E0E0E0]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white text-slate-500">or sign up with</span>
            </div>
          </div>

          {/* Social Sign Up */}
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({ provider: 'google', options: { redirectTo: `${window.location.origin}/auth/callback` } })
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E0E0E0] rounded-lg hover:bg-slate-50 transition-all duration-300 group"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span className="text-slate-700 text-sm font-medium group-hover:text-slate-900">Google</span>
            </button>
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signInWithOAuth({ provider: 'facebook', options: { redirectTo: `${window.location.origin}/auth/callback` } })
              }}
              className="flex items-center justify-center gap-2 px-4 py-2.5 border border-[#E0E0E0] rounded-lg hover:bg-slate-50 transition-all duration-300 group"
            >
              <svg className="w-5 h-5" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span className="text-slate-700 text-sm font-medium group-hover:text-slate-900">Facebook</span>
            </button>
          </div>

          {/* Sign In Link */}
          <div className="mt-5 text-center text-sm text-slate-600">
            Already have an account?{' '}
            <Link href="/login" className="text-[#2979FF] hover:text-[#69F0AE] font-semibold transition-colors">
              Sign in
            </Link>
          </div>
        </motion.div>

        {/* Back to Home */}
        <div className="mt-4 text-center">
          <Link href="/" className="text-sm text-slate-600 hover:text-slate-900 transition-colors inline-flex items-center gap-2 group">
            <ArrowRight className="w-4 h-4 rotate-180 group-hover:-translate-x-1 transition-transform duration-300" />
            Back to home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
