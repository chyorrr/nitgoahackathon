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
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-6">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Navigation className="w-7 h-7 text-blue-600" />
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>

            {/* Content */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-zinc-900 mb-3">
                Enable Location
              </h2>
              <p className="text-zinc-600 text-sm leading-relaxed mb-4">
                Help us provide a better experience by sharing your location.
              </p>
              <ul className="space-y-3 text-sm text-zinc-600">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Discover issues and services near you</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Auto-fill location when reporting problems</span>
                </li>
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                  <span>Get more relevant community updates</span>
                </li>
              </ul>
              <p className="mt-4 text-xs text-zinc-500 bg-zinc-50 p-3 rounded-lg">
                🔒 Your location is stored locally and never shared with third parties.
              </p>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <button
                onClick={handleAllow}
                disabled={isRequesting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                {isRequesting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Requesting...</span>
                  </>
                ) : (
                  <>
                    <Navigation className="w-5 h-5" />
                    <span>Allow Location</span>
                  </>
                )}
              </button>
              <button
                onClick={onSkip}
                disabled={isRequesting}
                className="w-full px-6 py-3.5 bg-zinc-100 hover:bg-zinc-200 disabled:bg-zinc-50 disabled:text-zinc-400 text-zinc-700 rounded-xl font-medium transition-colors"
              >
                Maybe Later
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
