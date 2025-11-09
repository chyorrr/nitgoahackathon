"use client";

import { AlertCircle, CheckCircle, FileText, Flag, LogIn, LogOut, User, Settings, Shield } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useScroll, useTransform, motion } from 'framer-motion';
import { useRouter } from 'next/navigation';

export default function Navbar() {
  const router = useRouter();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );

  // Load auth state from localStorage on mount
  useEffect(() => {
    const authState = localStorage.getItem('isLoggedIn');
    const storedName = localStorage.getItem('userName');
    const storedEmail = localStorage.getItem('userEmail');
    
    if (authState === 'true') {
      setIsLoggedIn(true);
      setUserName(storedName || 'User');
      setUserEmail(storedEmail || 'user@example.com');
    }
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  const handleLogout = () => {
    setIsLoggedIn(false);
    setIsProfileOpen(false);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userName');
    localStorage.removeItem('userEmail');
  };

  const handleReportClick = () => {
    const authState = localStorage.getItem('isLoggedIn');
    if (authState === 'true') {
      router.push('/map');
    } else {
      router.push('/login');
    }
  };

  const menuItems = [
    { icon: <AlertCircle className="w-4 h-4" />, label: 'Add New Issue', href: '/map' },
    { icon: <FileText className="w-4 h-4" />, label: 'My Reports', href: '/reported', count: 3 },
    { icon: <Shield className="w-4 h-4" />, label: 'Verified Issues', href: '/verified', count: 5 },
    { icon: <CheckCircle className="w-4 h-4" />, label: 'Community Feed', href: '/feed' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '/settings' },
  ];

  return (
    <motion.nav style={{ backgroundColor }} className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-violet-200/40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-center">
          {/* Left: Navigation Links */}
          <div className="flex items-center gap-1 mr-8">
            <Link 
              href="/" 
              className="text-zinc-700 hover:text-violet-600 hover:bg-violet-50/80 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-500"
            >
              Home
            </Link>
            {isLoggedIn && (
              <Link 
                href="/feed" 
                className="text-zinc-700 hover:text-indigo-600 hover:bg-indigo-50/80 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-500"
              >
                Feed
              </Link>
            )}
          </div>

          {/* Center: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-violet-100 group-hover:bg-violet-200 flex items-center justify-center transition-all duration-500 border border-violet-200/50">
              <Flag className="w-5 h-5 text-violet-600" />
            </div>
            <span className="text-xl font-semibold text-zinc-800 tracking-tight">CityVoice</span>
          </Link>

          {/* Right: CTA + Profile */}
          <div className="flex items-center gap-3 ml-8">
            <button
              onClick={handleReportClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-red-500/90 hover:bg-red-600 text-white text-sm font-semibold rounded-xl shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-500 hover:-translate-y-0.5"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Report Issue</span>
            </button>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen((v) => !v)}
                className="w-9 h-9 rounded-xl bg-white/60 hover:bg-white/80 backdrop-blur-md flex items-center justify-center transition-all duration-500 border border-violet-200/50 hover:border-violet-300/50 overflow-hidden"
              >
                {isLoggedIn ? (
                  <div className="w-full h-full bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                ) : (
                  <User className="w-4.5 h-4.5 text-violet-600" />
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-purple-200 rounded-xl shadow-xl overflow-hidden animate-scaleIn">
                  {isLoggedIn ? (
                    <div>
                      <div className="px-4 py-3 border-b border-purple-100 bg-linear-to-r from-purple-50 to-pink-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-violet-400 to-purple-500 flex items-center justify-center shadow-sm">
                            <User className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900">{userName}</p>
                            <p className="text-xs text-zinc-600">{userEmail}</p>
                          </div>
                        </div>
                      </div>

                      <div className="py-1.5">
                        {menuItems.map((item, i) => (
                          <Link
                            key={i}
                            href={item.href}
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-zinc-700 hover:bg-linear-to-r hover:from-purple-50 hover:to-pink-50 transition-all"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <span className="flex items-center gap-3">
                              <span className="text-purple-500">{item.icon}</span>
                              {item.label}
                            </span>
                            {item.count !== undefined && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-linear-to-r from-purple-100 to-pink-100 text-purple-700 font-medium">
                                {item.count}
                              </span>
                            )}
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-purple-100 py-1.5">
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="px-4 py-3 border-b border-purple-100 bg-linear-to-r from-purple-50 to-pink-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-200 to-pink-200 flex items-center justify-center shadow-sm">
                            <User className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-zinc-900">Welcome!</p>
                            <p className="text-xs text-zinc-600">Login to access features</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-4">
                        <Link
                          href="/login"
                          onClick={() => setIsProfileOpen(false)}
                          className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-violet-100 hover:bg-violet-200 text-violet-700 text-sm font-semibold rounded-xl transition-all duration-500 border border-violet-200/50"
                        >
                          <LogIn className="w-4 h-4" />
                          Login / Sign Up
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
