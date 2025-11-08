'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Camera, MapPin, Smartphone, Eye, BarChart3, Shield, ArrowRight } from 'lucide-react';
import { useRef } from 'react';
import Aurora from './Iridescence';

const features = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Photo Documentation",
    description: "Capture and upload high-quality images to provide visual evidence of civic issues",
    color: "from-[#00C853] to-[#69F0AE]",
    bgColor: "bg-[#69F0AE]/10",
    textColor: "text-[#00C853]"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Live GPS Location",
    description: "Automatic location tagging ensures precise identification of issue locations",
    color: "from-[#00C853] to-[#69F0AE]",
    bgColor: "bg-[#69F0AE]/10",
    textColor: "text-[#00C853]"
  },
  {
    icon: <Smartphone className="w-8 h-8" />,
    title: "Mobile-First Design",
    description: "Optimized for smartphones with intuitive interface for on-the-go reporting",
    color: "from-[#2979FF] to-[#2979FF]",
    bgColor: "bg-[#2979FF]/10",
    textColor: "text-[#2979FF]"
  },
  {
    icon: <Eye className="w-8 h-8" />,
    title: "Real-Time Tracking",
    description: "Monitor the progress of reported issues from submission to resolution",
    color: "from-[#00C853] to-[#69F0AE]",
    bgColor: "bg-[#69F0AE]/10",
    textColor: "text-[#00C853]"
  },
  {
    icon: <BarChart3 className="w-8 h-8" />,
    title: "Interactive City Map",
    description: "Visualize all reported issues on a comprehensive, filterable city map",
    color: "from-[#2979FF] to-[#2979FF]",
    bgColor: "bg-[#2979FF]/10",
    textColor: "text-[#2979FF]"
  },
  {
    icon: <Shield className="w-8 h-8" />,
    title: "Community Impact",
    description: "Build transparency and trust between citizens and municipal authorities",
    color: "from-[#00C853] to-[#69F0AE]",
    bgColor: "bg-[#69F0AE]/10",
    textColor: "text-[#00C853]"
  }
];

export default function Features() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [50, -50]);

  return (
    <section ref={containerRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-transparent overflow-hidden">
      {/* Aurora Background */}
      <motion.div style={{ y }} className="absolute inset-0 pointer-events-none opacity-25">
        <Aurora 
          colorStops={['#2979FF', '#4A90E2', '#2979FF']}
          amplitude={1.8}
          blend={0.5}
          speed={0.4}
        />
      </motion.div>

      {/* Subtle overlay for better text readability */}
      <div className="absolute inset-0 bg-linear-to-b from-white/85 via-white/60 to-white/85 pointer-events-none z-1"></div>

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
              <motion.div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-slate-200 hover:border-slate-300 h-full overflow-hidden">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.15, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
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
          <button className="group inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-500 font-semibold shadow-lg hover:shadow-xl">
            <Smartphone className="w-5 h-5" />
            Start Reporting Issues
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
          </button>
        </motion.div>
      </div>
    </section>
  );
}
