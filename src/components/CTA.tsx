'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Shield, Users, Zap, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import Aurora from './Iridescence';

const trustIndicators = [
  {
    icon: <Users className="w-5 h-5" />,
    text: "15,000+ Active Users"
  },
  {
    icon: <Shield className="w-5 h-5" />,
    text: "Data Privacy Protected"
  },
  {
    icon: <Zap className="w-5 h-5" />,
    text: "Real-time Updates"
  }
];

export default function CTA() {
  return (
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-[#00C853]/5 via-[#69F0AE]/5 to-[#00C853]/5 overflow-hidden border-t border-[#E0E0E0]">
      {/* Aurora Background */}
      <div className="absolute inset-0 pointer-events-none opacity-15">
        <Aurora 
          colorStops={['#00C853', '#2979FF', '#00C853']}
          amplitude={1.5}
          blend={0.6}
          speed={0.4}
        />
      </div>

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E0E0E0] rounded-full text-[#757575] text-sm font-medium shadow-sm">
              <CheckCircle className="w-4 h-4 text-[#00C853]" />
              Join the Movement
            </div>
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="text-4xl sm:text-5xl font-bold text-[#212121] mb-6 leading-tight"
          >
            Ready to Build a Better Community?
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            className="text-lg text-[#757575] mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Join thousands of citizens making a real difference. Start reporting issues today and help create lasting positive change in your community.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <button className="group inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-500 font-semibold shadow-lg hover:shadow-xl">
              <Shield className="w-5 h-5" />
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-500" />
            </button>
            
            <button className="group inline-flex items-center gap-2 px-8 py-4 bg-white text-[#212121] border border-[#E0E0E0] rounded-lg hover:bg-[#F8F9FA] transition-all duration-500 font-semibold shadow-sm">
              <Zap className="w-5 h-5" />
              Watch Demo
            </button>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-[#757575]500 text-sm"
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1, ease: "easeOut" }}
                className="flex items-center gap-2"
              >
                <div className="text-[#757575]">
                  {indicator.icon}
                </div>
                <span className="font-medium">
                  {indicator.text}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
