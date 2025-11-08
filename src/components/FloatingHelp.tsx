'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, X } from 'lucide-react';
import { useState } from 'react';

export default function FloatingHelp() {
  const [showTooltip, setShowTooltip] = useState(false);

  const scrollToHowItWorks = () => {
    const howItWorksSection = document.getElementById('how-it-works');
    if (howItWorksSection) {
      howItWorksSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-8 right-8 z-40"
    >
      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full right-0 mb-4 px-4 py-2 bg-[#00C853] text-white text-sm font-medium rounded-lg shadow-lg whitespace-nowrap"
          >
            How It Works?
            <div className="absolute top-full right-6 w-0 h-0 border-l-8 border-r-8 border-t-8 border-l-transparent border-r-transparent border-t-[#00C853]"></div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Button */}
      <motion.button
        onClick={scrollToHowItWorks}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="group relative w-16 h-16 bg-linear-to-br from-[#00C853] to-[#69F0AE] text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center overflow-hidden"
      >
        {/* Background pulse animation */}
        <motion.div
          className="absolute inset-0 bg-[#69F0AE] rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Icon */}
        <motion.div
          animate={{
            rotate: [0, -10, 10, -10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
            ease: "easeInOut",
          }}
          className="relative z-10"
        >
          <HelpCircle className="w-8 h-8" strokeWidth={2.5} />
        </motion.div>

        {/* Hover gradient overlay */}
        <motion.div
          className="absolute inset-0 bg-linear-to-br from-[#00C853] to-[#69F0AE] opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-linear-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
          animate={{
            x: ['-100%', '200%'],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            repeatDelay: 2,
          }}
        />
      </motion.button>

      {/* Ripple effect on click */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-blue-500"
        initial={{ scale: 1, opacity: 0 }}
        whileTap={{
          scale: 1.5,
          opacity: [0, 1, 0],
        }}
        transition={{ duration: 0.6 }}
      />
    </motion.div>
  );
}
