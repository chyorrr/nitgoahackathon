'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { AlertTriangle, Clock, Users, TrendingDown } from 'lucide-react';
import { useRef } from 'react';
import Aurora from './Iridescence';

const problemStats = [
  {
    icon: <AlertTriangle className="w-8 h-8" />,
    stat: "68%",
    label: "Issues Go Unreported",
    description: "Most civic problems remain invisible to authorities without proper reporting channels"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    stat: "45 Days",
    label: "Average Resolution Time",
    description: "Traditional reporting methods lead to delayed responses and prolonged issues"
  },
  {
    icon: <Users className="w-8 h-8" />,
    stat: "30%",
    label: "Citizen Participation",
    description: "Low community engagement due to lack of transparency and feedback mechanisms"
  },
  {
    icon: <TrendingDown className="w-8 h-8" />,
    stat: "52%",
    label: "Follow-up Rate",
    description: "Citizens rarely receive updates on the status of their reported issues"
  }
];

export default function ProblemStatement() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

  return (
    <section ref={containerRef} className="relative py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-rose-50 via-pink-50 to-purple-50 overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-rose-200/30 to-pink-200/30 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-violet-200/30 rounded-full blur-3xl" />
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
            <AlertTriangle className="w-4 h-4" />
            The Current Challenge
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            Why Civic Issues Remain Unresolved
          </h2>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Traditional reporting methods create barriers between citizens and authorities, 
            leading to prolonged issues and decreased community trust.
          </p>
        </motion.div>

        {/* Problem Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 justify-items-center">
          {problemStats.map((problem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ y: -8 }}
              className="group relative text-center max-w-xs"
            >
              <motion.div className="relative bg-transparent rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-[#E0E0E0]200 hover:border-[#E0E0E0]300">
                {/* Icon */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ duration: 0.3 }}
                    className="w-16 h-16 bg-transparent rounded-xl flex items-center justify-center text-slate-600 group-hover:bg-slate-100 transition-all duration-300"
                  >
                    {problem.icon}
                  </motion.div>
                </div>

                {/* Statistic */}
                <div className="mb-4">
                  <div className="text-4xl font-bold text-slate-900 mb-2">
                    {problem.stat}
                  </div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-3">
                    {problem.label}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-sm text-slate-600 leading-relaxed">
                  {problem.description}
                </p>

                {/* Subtle hover indicator */}
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r from-slate-400 to-slate-600 rounded-b-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  initial={false}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-16"
        >
          <div className="inline-block px-8 py-4 bg-transparent border border-[#E0E0E0]200 rounded-xl">
            <p className="text-slate-700 font-medium text-lg">
              It's time for a <span className="text-blue-600 font-semibold">modern solution</span> that puts citizens first
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
