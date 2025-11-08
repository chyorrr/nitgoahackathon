'use client';

import { motion } from 'framer-motion';
import { Camera, MapPin, Clock, CheckCircle } from 'lucide-react';
import Aurora from './Iridescence';

const steps = [
  {
    icon: <Camera className="w-8 h-8" />,
    title: "Report the Issue",
    description: "Take a photo and describe the civic problem you've encountered",
    details: "Use your smartphone to capture clear images and provide detailed descriptions of the issue",
    color: "bg-linear-to-br from-blue-50 to-indigo-50",
    iconColor: "text-blue-600",
    number: "01"
  },
  {
    icon: <MapPin className="w-8 h-8" />,
    title: "Add Location Details",
    description: "Your GPS location is automatically captured for precise identification",
    details: "The system records exact coordinates and allows you to adjust if needed",
    color: "bg-linear-to-br from-emerald-50 to-green-50",
    iconColor: "text-emerald-600",
    number: "02"
  },
  {
    icon: <Clock className="w-8 h-8" />,
    title: "Track Progress",
    description: "Monitor your report's status as authorities work on the resolution",
    details: "Receive real-time updates via notifications and view progress on the interactive map",
    color: "bg-linear-to-br from-amber-50 to-orange-50",
    iconColor: "text-amber-600",
    number: "03"
  },
  {
    icon: <CheckCircle className="w-8 h-8" />,
    title: "See the Impact",
    description: "Witness your contribution to building a better community",
    details: "View resolution confirmation and help others by rating the effectiveness",
    color: "bg-linear-to-br from-purple-50 to-violet-50",
    iconColor: "text-purple-600",
    number: "04"
  }
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-8 bg-linear-to-b from-white via-purple-50/20 to-white overflow-hidden">
      {/* Subtle gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-0 w-96 h-96 bg-linear-to-br from-pink-200/20 to-rose-200/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-linear-to-br from-indigo-200/20 to-purple-200/20 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-[#E0E0E0] text-[#757575] rounded-full text-sm font-medium mb-6 shadow-sm"
          >
            <div className="w-2 h-2 bg-[#2979FF]/500 rounded-full"></div>
            Simple Process
          </motion.div>
          
          <h2 className="text-4xl sm:text-5xl font-bold text-slate-900 mb-6">
            How It Works
          </h2>
          
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Making civic reporting simple, transparent, and effective through a streamlined four-step process
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} items-center gap-16 lg:gap-24`}
            >
              {/* Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-4 mb-6">
                  <span className="text-4xl font-bold text-slate-300">{step.number}</span>
                  <div className={`w-16 h-16 ${step.color} rounded-2xl flex items-center justify-center ${step.iconColor} shadow-sm`}>
                    {step.icon}
                  </div>
                </div>
                
                <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
                  {step.title}
                </h3>
                
                <p className="text-lg text-slate-600 mb-4 leading-relaxed">
                  {step.description}
                </p>
                
                <p className="text-sm text-slate-500 leading-relaxed">
                  {step.details}
                </p>
              </div>

              {/* Visual */}
              <div className="flex-1 flex justify-center">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="relative"
                >
                  <div className="w-80 h-64 bg-linear-to-br from-white to-[#F8F9FA] rounded-2xl shadow-xl border border-[#E0E0E0] flex items-center justify-center">
                    <div className={`w-24 h-24 ${step.color} rounded-full flex items-center justify-center ${step.iconColor} shadow-lg`}>
                      <div className="scale-150">
                        {step.icon}
                      </div>
                    </div>
                  </div>
                  
                  {/* Floating elements */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute -top-4 -right-4 w-8 h-8 bg-white border border-violet-200 rounded-lg shadow-lg flex items-center justify-center"
                  >
                    <div className="w-2 h-2 bg-linear-to-r from-violet-500 to-purple-500 rounded-full"></div>
                  </motion.div>
                  
                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute -bottom-4 -left-4 w-6 h-6 bg-white border border-emerald-200 rounded-full shadow-lg flex items-center justify-center"
                  >
                    <div className="w-1.5 h-1.5 bg-linear-to-r from-emerald-500 to-green-500 rounded-full"></div>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="text-center mt-24"
        >
          <div className="inline-block px-8 py-4 bg-linear-to-r from-violet-50 to-purple-50 border border-violet-200/60 rounded-xl shadow-sm backdrop-blur-sm">
            <p className="text-slate-700 font-medium text-lg">
              Ready to make a difference? <span className="bg-linear-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent font-semibold">Start reporting today</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
