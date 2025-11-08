'use client';

import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Users } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authState = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(authState === 'true');
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Multi-layer gradient background */}
      <div className="absolute inset-0 bg-linear-to-br from-violet-100 via-indigo-50 to-purple-100"></div>
      
      {/* Subtle mesh pattern overlay */}
      <div className="absolute inset-0 opacity-[0.015]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>
      
      {/* Animated gradient orbs - subtle and smooth */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.3, 0.4],
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-32 -right-32 w-[500px] h-[500px] bg-linear-to-br from-violet-400/40 to-indigo-400/40 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.3, 0.4, 0.3],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute -bottom-32 -left-32 w-[500px] h-[500px] bg-linear-to-tr from-pink-400/40 to-rose-400/40 rounded-full blur-3xl"
        />
        
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.25, 0.35, 0.25],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-linear-to-br from-blue-300/30 to-cyan-300/30 rounded-full blur-3xl"
        />
        
        {/* Additional accent orbs */}
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-linear-to-br from-purple-400/30 to-fuchsia-400/30 rounded-full blur-3xl"
        />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/50 border border-violet-200/40 rounded-full text-sm font-semibold text-violet-900 mb-8 shadow-sm backdrop-blur-md"
        >
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="w-2 h-2 bg-emerald-400 rounded-full shadow-sm shadow-emerald-400/50"
          ></motion.div>
          Empowering Communities Together
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl lg:text-7xl font-bold text-zinc-900 mb-6 leading-tight tracking-tight"
        >
          Report Issues.<br />
          <span className="bg-linear-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Track Progress.</span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-zinc-600 mb-10 max-w-2xl mx-auto leading-relaxed"
        >
          Connect with your municipality. Report civic issues instantly, track their resolution in real-time, and build stronger communities together.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <Link 
            href={isLoggedIn ? "/map" : "/login"}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-red-500/90 hover:bg-red-600 text-white rounded-2xl font-semibold shadow-md hover:shadow-lg backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1"
          >
            <MapPin className="w-5 h-5 transition-transform duration-500 group-hover:scale-110" />
            Report an Issue
            <ArrowRight className="w-5 h-5 transition-transform duration-500 group-hover:translate-x-1" />
          </Link>
          
          <Link 
            href="/feed" 
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/40 hover:bg-white/60 text-zinc-800 rounded-2xl font-semibold border border-indigo-200/50 shadow-sm hover:shadow-md backdrop-blur-sm transition-all duration-500 ease-out hover:-translate-y-1"
          >
            <Users className="w-5 h-5 transition-transform duration-500 hover:scale-110" />
            View Community Feed
          </Link>
        </motion.div>

        {/* Stats - refined */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-3xl mx-auto"
        >
          {[
            { value: '2,500+', label: 'Issues Resolved', gradient: 'from-green-500 to-emerald-500' },
            { value: '15K+', label: 'Active Citizens', gradient: 'from-blue-500 to-cyan-500' },
            { value: '85%', label: 'Resolution Rate', gradient: 'from-violet-500 to-purple-500' }
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ scale: 1.03, y: -4 }}
              transition={{ 
                duration: 0.6, 
                delay: 0.5 + i * 0.1,
                ease: "easeOut"
              }}
              className="text-center p-6 bg-white/50 backdrop-blur-md rounded-2xl border border-white/60 shadow-sm hover:shadow-md hover:border-violet-200/60 transition-all duration-500"
            >
              <div className={`text-4xl font-bold bg-linear-to-r ${stat.gradient} bg-clip-text text-transparent mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm font-medium text-zinc-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator - minimal */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-zinc-400"
        >
          <span className="text-xs mb-2">Scroll</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}
