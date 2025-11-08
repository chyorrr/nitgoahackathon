'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, MapPin, Smartphone, Eye, BarChart3, Shield, ArrowRight } from 'lucide-react';
import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Aurora from './Iridescence';

const features = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Photo Documentation",
    description: "Capture and upload high-quality images to provide visual evidence of civic issues",
    color: "from-emerald-500 to-green-500",
    bgColor: "bg-linear-to-br from-emerald-50 to-green-50",
    textColor: "text-emerald-600"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Live GPS Location",
    description: "Automatic location tagging ensures precise identification of issue locations",
    color: "from-violet-500 to-purple-500",
    bgColor: "bg-linear-to-br from-violet-50 to-purple-50",
    textColor: "text-violet-600"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile-First Design",
    description: "Optimized for smartphones with intuitive interface for on-the-go reporting",
    color: "from-blue-500 to-cyan-500",
    bgColor: "bg-linear-to-br from-blue-50 to-cyan-50",
    textColor: "text-blue-600"
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Real-Time Tracking",
    description: "Monitor the progress of reported issues from submission to resolution",
    color: "from-amber-500 to-orange-500",
    bgColor: "bg-linear-to-br from-amber-50 to-orange-50",
    textColor: "text-amber-600"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Interactive City Map",
    description: "Visualize all reported issues on a comprehensive, filterable city map",
    color: "from-pink-500 to-rose-500",
    bgColor: "bg-linear-to-br from-pink-50 to-rose-50",
    textColor: "text-pink-600"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Community Impact",
    description: "Build transparency and trust between citizens and municipal authorities",
    color: "from-indigo-500 to-blue-500",
    bgColor: "bg-linear-to-br from-indigo-50 to-blue-50",
    textColor: "text-indigo-600"
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authState = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(authState === 'true');
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-indigo-50/30 to-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-linear-to-br from-violet-200/30 to-purple-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-linear-to-br from-blue-200/30 to-cyan-200/30 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E0E0E0] text-[#757575] rounded-full text-sm font-medium mb-6 shadow-sm"
          >
            <Shield className="w-4 h-4" />
            Platform Capabilities
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Everything You Need to Make an Impact
          </h2>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Our comprehensive platform bridges the gap between citizens and authorities through 
            innovative technology and user-centered design.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group relative text-center max-w-sm"
            >
              <motion.div className="relative bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200/60 hover:border-slate-300 h-full overflow-hidden">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`w-16 h-16 ${feature.bgColor} rounded-xl flex items-center justify-center ${feature.textColor} shadow-sm group-hover:shadow-md transition-all duration-300`}
                  >
                    {feature.icon}
                  </motion.div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-slate-900 mb-4">
                  {feature.title}
                </h3>
                
                <p className="text-slate-600 leading-relaxed text-sm">
                  {feature.description}
                </p>

                {/* Animated gradient bar on hover */}
                <motion.div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r ${feature.color} rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                  initial={false}
                />

                {/* Subtle shimmer effect */}
                <motion.div
                  className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
                  initial={{ x: '-100%' }}
                  whileHover={{ x: '100%' }}
                  transition={{ duration: 0.8 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <Link 
            href={isLoggedIn ? "/map" : "/login"}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-500 font-semibold shadow-lg hover:shadow-xl"
          >
            <Smartphone className="w-5 h-5" />
            Start Reporting Issues
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
