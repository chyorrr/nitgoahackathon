"use client";

import { AlertCircle, CheckCircle, FileText, Flag, LogIn, LogOut, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const profileRef = useRef<HTMLDivElement>(null);

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

  const menuItems = [
    { icon: <AlertCircle className="w-4 h-4" />, label: 'Add New Issue', href: '/map' },
    { icon: <FileText className="w-4 h-4" />, label: 'My Reports', href: '/reported', count: 3 },
    { icon: <Shield className="w-4 h-4" />, label: 'Verified Issues', href: '/verified', count: 5 },
    { icon: <CheckCircle className="w-4 h-4" />, label: 'Community Feed', href: '/feed' },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '/settings' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/70 backdrop-blur-xl border-b border-violet-200/40 shadow-sm">
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
            <Link 
              href="/feed" 
              className="text-zinc-700 hover:text-indigo-600 hover:bg-indigo-50/80 text-sm font-medium px-4 py-2 rounded-xl transition-all duration-500"
            >
              Feed
            </Link>
          </div>

          {/* Center: Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-violet-100 group-hover:bg-violet-200 flex items-center justify-center transition-all duration-500 border border-violet-200/50">
              <Flag className="w-5 h-5 text-violet-600" />
            </div>
            <span className="text-xl font-semibold text-zinc-800 tracking-tight">CityVoice</span>
          </Link>

          {/* Right: CTA + Profile */}
          <div className="flex items-center gap-3">
            <Link
              href={isLoggedIn ? '/map' : '/login'}
              className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md"
            >
              <AlertCircle className="w-4 h-4" />
              <span>Report Issue</span>
            </Link>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setIsProfileOpen((v) => !v)}
                className="w-9 h-9 rounded-xl bg-white/60 hover:bg-white/80 backdrop-blur-md flex items-center justify-center transition-all duration-500 border border-violet-200/50 hover:border-violet-300/50"
              >
                {isLoggedIn ? (
                  <span className="text-violet-700 text-sm font-semibold">U</span>
                ) : (
                  <User className="w-4.5 h-4.5 text-violet-600" />
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-sm border border-purple-200 rounded-xl shadow-xl overflow-hidden animate-scaleIn">
                  {isLoggedIn ? (
                    <div>
                      <div className="px-4 py-3 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center text-purple-700 text-sm font-semibold shadow-sm">
                            U
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
                            className="flex items-center justify-between px-4 py-2.5 text-sm text-zinc-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-pink-50 transition-all"
                            onClick={() => setIsProfileOpen(false)}
                          >
                            <span className="flex items-center gap-3">
                              <span className="text-purple-500">{item.icon}</span>
                              {item.label}
                            </span>
                            {item.count !== undefined && (
                              <span className="text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 font-medium">
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
                      <div className="px-4 py-3 border-b border-purple-100 bg-gradient-to-r from-purple-50 to-pink-50">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-200 to-pink-200 flex items-center justify-center shadow-sm">
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
    </nav>
  );
}
