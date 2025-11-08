'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Navigation, X, Loader2 } from 'lucide-react';

interface LocationRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAllow: () => Promise<void>;
  onSkip: () => void;
}

export default function LocationRequestModal({
  isOpen,
  onClose,
  onAllow,
  onSkip,
}: LocationRequestModalProps) {
  const [isRequesting, setIsRequesting] = useState(false);

  const handleAllow = async () => {
    setIsRequesting(true);
    try {
      await onAllow();
    } finally {
      setIsRequesting(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 z-9999 flex items-center justify-center px-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Navigation className="w-6 h-6 text-blue-600" />
              </div>
              <button
                onClick={onClose}
                className="p-1 hover:bg-slate-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-slate-400" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Enable Location Services
              </h2>
              <p className="text-slate-600 text-sm leading-relaxed">
                We'd like to access your location to:
              </p>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Show issues and services near you on the map</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Automatically fill location when reporting issues</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Provide more accurate and relevant information</span>
                </li>
              </ul>
              <p className="mt-3 text-xs text-slate-500">
                Your location data is only used to enhance your experience and is never shared with third parties.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAllow}
                disabled={isRequesting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium shadow-sm transition-colors"
              >
                {isRequesting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Requesting Location...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5" />
                    <span>Allow Location Access</span>
                  </>
                )}
              </button>
              <button
                onClick={onSkip}
                disabled={isRequesting}
                className="w-full px-6 py-3 bg-slate-100 hover:bg-slate-200 disabled:bg-slate-50 disabled:text-slate-400 text-slate-700 rounded-lg font-medium transition-colors"
              >
                Skip for Now
              </button>
            </div>

            {/* Info */}
            <div className="mt-4 text-center">
              <p className="text-xs text-slate-500">
                You can change this setting anytime in your browser preferences
              </p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
