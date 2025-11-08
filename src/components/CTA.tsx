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
    <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-blue-50/20 to-white overflow-hidden border-t border-slate-200/50">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-linear-to-br from-cyan-200/20 to-blue-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-linear-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl" />
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
            <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-linear-to-r from-emerald-100 to-green-100 border border-emerald-200/60 rounded-full text-emerald-900 text-sm font-semibold shadow-sm">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
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
            <Link href="/map" className="group inline-flex items-center gap-2 px-8 py-4 bg-linear-to-r from-violet-600 to-indigo-600 text-white rounded-2xl hover:from-violet-700 hover:to-indigo-700 transition-all duration-300 font-semibold shadow-lg shadow-violet-500/30 hover:shadow-xl hover:shadow-violet-500/40 hover:-translate-y-0.5">
              <Shield className="w-5 h-5" />
              Get Started Free
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
            
            <Link href="#how-it-works" className="group inline-flex items-center gap-2 px-8 py-4 bg-white/80 text-zinc-900 border border-violet-200 rounded-2xl hover:bg-white transition-all duration-300 font-semibold shadow-sm hover:shadow-md backdrop-blur-sm hover:-translate-y-0.5">
              <Zap className="w-5 h-5" />
              Watch Demo
            </Link>
          </motion.div>

          {/* Trust indicators */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
            className="flex flex-col sm:flex-row items-center justify-center gap-8 text-zinc-600 text-sm"
          >
            {trustIndicators.map((indicator, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.9 + index * 0.1, ease: "easeOut" }}
                className="flex items-center gap-2 px-4 py-2 bg-white/60 backdrop-blur-sm rounded-xl border border-slate-200/60 shadow-sm"
              >
                <div className="text-violet-600">
                  {indicator.icon}
                </div>
                <span className="font-semibold text-zinc-700">
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
