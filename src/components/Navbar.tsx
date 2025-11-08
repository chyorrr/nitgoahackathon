"use client";

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { Flag, AlertCircle, User, FileText, Heart, CheckCircle, LogOut, LogIn } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const showReportButton = !pathname?.startsWith('/admin');
  
  const backgroundColor = useTransform(
    scrollY,
    [0, 100],
    ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const profileMenuItems = [
    { icon: <AlertCircle className="w-4 h-4" />, label: 'Add New Issue', href: '/report', color: 'text-[#00C853]', bgHover: 'hover:bg-[#69F0AE]/10' },
    { icon: <FileText className="w-4 h-4" />, label: 'Reported Issues', href: '/my-reports', count: 12 },
    { icon: <CheckCircle className="w-4 h-4" />, label: 'Verified Issues', href: '/verified', count: 5 },
  ];

  return (
    <motion.nav
      style={{ backgroundColor }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg backdrop-blur-lg' : ''}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Link href="/" className="group relative flex items-center gap-2 text-[#212121] hover:text-[#00C853] transition-colors duration-300 font-medium text-sm px-3 py-2 rounded-lg">
              <motion.div className="absolute inset-0 bg-[#F8F9FA] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative z-10">Home</span>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }} className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/" className="flex items-center gap-3 group">
              <motion.div whileHover={{ rotate: 5, scale: 1.1 }} transition={{ type: "spring", stiffness: 300 }} className="w-10 h-10 bg-[#00C853] rounded-lg flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow duration-300">
                <Flag className="w-5 h-5 text-white" />
              </motion.div>
              <span className="text-2xl font-bold text-[#00C853]">CityVoice</span>
            </Link>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="flex items-center gap-4">
            {showReportButton && (
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Link href={isLoggedIn ? "/map" : "/login"} className="group relative inline-flex items-center gap-2 px-6 py-3 bg-red-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                  <motion.div className="absolute inset-0 bg-red-700" initial={{ x: '-100%' }} whileHover={{ x: 0 }} transition={{ duration: 0.3 }} />
                  <AlertCircle className="w-5 h-5 relative z-10 group-hover:rotate-12 transition-transform duration-300" />
                  <span className="relative z-10">Report an Issue</span>
                </Link>
              </motion.div>
            )}

            <div className="relative" ref={profileRef}>
              <motion.button onClick={() => setIsProfileOpen(!isProfileOpen)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 ${isLoggedIn ? 'bg-[#2979FF] ring-2 ring-[#2979FF]/30 ring-offset-2' : 'bg-[#E0E0E0] hover:bg-[#757575]'}`}>
                {isLoggedIn ? (
                  <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center bg-[#2979FF] text-white font-semibold text-lg">U</div>
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
                {isLoggedIn && (
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full">
                    <motion.div className="absolute inset-0 bg-green-500 rounded-full" animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                  </motion.div>
                )}
              </motion.button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div initial={{ opacity: 0, y: -10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10, scale: 0.95 }} transition={{ duration: 0.2 }} className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-[#E0E0E0] overflow-hidden">
                    {isLoggedIn ? (
                      <>
                        <div className="px-5 py-4 border-b border-[#E0E0E0] bg-linear-to-br from-[#F8F9FA] to-white">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#2979FF] to-[#2979FF] flex items-center justify-center text-white font-bold text-lg shadow-md">U</div>
                            <div>
                              <p className="text-sm font-bold text-[#212121]">John Doe</p>
                              <p className="text-xs text-[#757575]">john@example.com</p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          {profileMenuItems.map((item, index) => (
                            <Link 
                              key={index} 
                              href={item.href} 
                              className={`flex items-center justify-between px-5 py-3 transition-all duration-200 group ${
                                index === 0 
                                  ? 'text-[#00C853] hover:bg-[#69F0AE]/10 font-semibold' 
                                  : 'text-[#212121] hover:bg-[#F8F9FA]'
                              }`}
                              onClick={() => setIsProfileOpen(false)}
                            >
                              <div className="flex items-center gap-3">
                                <span className={`${index === 0 ? 'text-blue-600' : 'text-slate-500 group-hover:text-blue-600'} transition-colors duration-200`}>
                                  {item.icon}
                                </span>
                                <span className="text-sm font-medium">{item.label}</span>
                              </div>
                              {item.count !== undefined && (
                                <span className="text-xs font-semibold px-2 py-1 bg-slate-100 text-slate-600 rounded-full group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors duration-200">
                                  {item.count}
                                </span>
                              )}
                            </Link>
                          ))}
                        </div>
                        <div className="border-t border-slate-100 py-2">
                          <button onClick={() => setIsLoggedIn(false)} className="flex items-center gap-3 px-5 py-3 text-red-600 hover:bg-red-50 transition-colors duration-200 w-full group">
                            <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-200" />
                            <span className="text-sm font-medium">Logout</span>
                          </button>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="px-5 py-4 border-b border-[#E0E0E0]">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-linear-to-br from-[#E0E0E0] to-[#E0E0E0] flex items-center justify-center"><User className="w-6 h-6 text-[#757575]" /></div>
                            <div>
                              <p className="text-sm font-bold text-[#212121]">Welcome!</p>
                              <p className="text-xs text-[#757575]">Login to access features</p>
                            </div>
                          </div>
                        </div>
                        <div className="py-2">
                          <div className="px-5 py-3 mb-2">
                            <p className="text-xs text-[#757575] mb-3">Available after login:</p>
                            <ul className="space-y-2">
                              <li className="flex items-center gap-2 text-xs text-[#757575]">
                                <AlertCircle className="w-3 h-3" />
                                <span>Add New Issue</span>
                              </li>
                              <li className="flex items-center gap-2 text-xs text-[#757575]">
                                <FileText className="w-3 h-3" />
                                <span>Track Reported Issues</span>
                              </li>
                              <li className="flex items-center gap-2 text-xs text-[#757575]">
                                <CheckCircle className="w-3 h-3" />
                                <span>View Verified Issues</span>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="border-t border-slate-100 py-2">
                          <Link href="/login" className="flex items-center gap-3 px-5 py-3 text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200 group mx-3 rounded-lg" onClick={() => setIsProfileOpen(false)}>
                            <LogIn className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
                            <span className="text-sm font-semibold">Login / Sign Up</span>
                          </Link>
                        </div>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      <motion.div className="h-0.5 bg-linear-to-r from-transparent via-[#00C853] to-transparent" initial={{ scaleX: 0 }} animate={{ scaleX: isScrolled ? 1 : 0 }} transition={{ duration: 0.5 }} />
    </motion.nav>
  );
}
