'use client';

import { AlertCircle, CheckCircle, FileText, Flag, LogIn, LogOut, User, Settings } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Navbar() {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
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

  const menuItems = [
    { icon: <AlertCircle className="w-4 h-4" />, label: 'Add New Issue', href: '/map' },
    { icon: <FileText className="w-4 h-4" />, label: 'My Reports', href: '/my-reports', count: 12 },
    { icon: <CheckCircle className="w-4 h-4" />, label: 'Community Feed', href: '/feed', count: 5 },
    { icon: <Settings className="w-4 h-4" />, label: 'Settings', href: '/settings' },
  ];

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          {/* Left: Home and Feed */}
          <div className="flex items-center gap-4">
            <Link href="/" className="text-slate-700 hover:text-slate-900 text-sm font-medium px-2 py-1">
              Home
            </Link>
            <Link href="/feed" className="text-slate-700 hover:text-slate-900 text-sm font-medium px-2 py-1">
              Feed
            </Link>
          </div>

          {/* Center: Brand */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-md border border-slate-300 bg-white flex items-center justify-center">
                <Flag className="w-5 h-5 text-slate-600" />
              </div>
              <span className="text-xl font-semibold text-slate-800">CityVoice</span>
            </Link>
          </div>

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
                className="w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 flex items-center justify-center"
              >
                {isLoggedIn ? (
                  <span className="text-slate-700 text-sm font-semibold">U</span>
                ) : (
                  <User className="w-5 h-5 text-slate-600" />
                )}
              </button>

              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white border border-slate-200 rounded-md shadow-sm overflow-hidden">
                  {isLoggedIn ? (
                    <div>
                      <div className="px-4 py-3 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 text-sm font-semibold">
                            U
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">John Doe</p>
                            <p className="text-xs text-slate-500">john@example.com</p>
                          </div>
                        </div>
                      </div>

                      <div className="py-1">
                        {menuItems.map((item, i) => (
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
                          onClick={() => {
                            setIsLoggedIn(false);
                            setIsProfileOpen(false);
                          }}
                          className="w-full flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="px-4 py-3 border-b border-slate-200">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center">
                            <User className="w-5 h-5 text-slate-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-slate-800">Welcome!</p>
                            <p className="text-xs text-slate-500">Login to access features</p>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        <ul className="px-4 py-2 space-y-1">
                          <li className="text-xs text-slate-500 flex items-center gap-2"><AlertCircle className="w-3 h-3" /> Add New Issue</li>
                          <li className="text-xs text-slate-500 flex items-center gap-2"><FileText className="w-3 h-3" /> Track Reports</li>
                          <li className="text-xs text-slate-500 flex items-center gap-2"><CheckCircle className="w-3 h-3" /> View Verified</li>
                        </ul>
                      </div>
                      <div className="border-t border-slate-200 py-1">
                        <Link
                          href="/login"
                          onClick={() => setIsProfileOpen(false)}
                          className="mx-4 mb-2 inline-flex items-center gap-2 px-4 py-2 bg-slate-700 hover:bg-slate-800 text-white text-sm rounded-md"
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
