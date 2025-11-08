'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, MapPin, Camera, BarChart3 } from 'lucide-react';
import { useRef } from 'react';
import Link from 'next/link';
import Aurora from './Iridescence';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0.3]);

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-transparent">
      {/* Hero-specific Aurora overlay */}
      <motion.div 
        style={{ opacity }}
        className="absolute inset-0 pointer-events-none opacity-25"
      >
        <Aurora 
          colorStops={['#69F0AE', '#00C853', '#69F0AE']}
          amplitude={1.8}
          blend={0.5}
          speed={0.4}
        />
      </motion.div>

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-white/85 via-white/60 to-white/85 pointer-events-none z-1"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E0E0E0] rounded-full text-sm font-medium text-[#757575] mb-6 shadow-sm">
            <div className="w-2 h-2 bg-[#00C853] rounded-full"></div>
            Empowering Citizens Through Technology
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#212121] mb-6 leading-tight"
        >
          Local Issue Reporting &<br />
          <span className="text-[#00C853]">
            Impact Tracking System
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-lg sm:text-xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed"
        >
          Bridge the gap between citizens and municipal authorities. Report civic issues with photos and live location, 
          track their progress in real-time, and help build better communities through transparency and participation.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
        >
          <button className="group inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-500 font-semibold shadow-lg hover:shadow-xl">
            <MapPin className="w-5 h-5" />
            Report an Issue
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
          </button>
          
          <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#212121] rounded-lg hover:bg-[#F8F9FA] transition-all duration-500 font-semibold border border-[#E0E0E0] shadow-sm">
            <BarChart3 className="w-5 h-5" />
            View Impact Map
          </button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto"
        >
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">2,500+</div>
            <div className="text-slate-600">Issues Resolved</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">15,000+</div>
            <div className="text-slate-600">Active Citizens</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-slate-900 mb-2">85%</div>
            <div className="text-slate-600">Resolution Rate</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center text-slate-400"
        >
          <span className="text-xs mb-2 font-medium">Scroll to explore</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.div>
      </motion.div>
    </section>
  );
}