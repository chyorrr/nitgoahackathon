'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Navigation, MapPin, Check, X } from 'lucide-react';
import { useLocation } from '@/contexts/LocationContext';
import LocationRequestModal from './LocationRequestModal';

export default function LocationSettings() {
  const { userLocation, requestLocation, setHasRequestedLocation } = useLocation();
  const [showModal, setShowModal] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const formatLocation = (loc: { lat: number; lng: number }) => {
    return `${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}`;
  };

  const handleUpdateLocation = () => {
    setShowModal(true);
  };

  const handleAllowLocation = async () => {
    setIsUpdating(true);
    await requestLocation();
    setIsUpdating(false);
    setShowModal(false);
  };

  const handleClearLocation = () => {
    localStorage.removeItem('userLocation');
    localStorage.removeItem('hasRequestedLocation');
    setHasRequestedLocation(false);
    window.location.reload();
  };

  return (
    <>
      <LocationRequestModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onAllow={handleAllowLocation}
        onSkip={() => setShowModal(false)}
      />

      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              Location Settings
            </h3>
            <p className="text-sm text-slate-600 mt-1">
              Manage your location preferences for better map experience
            </p>
          </div>
        </div>

        {/* Current Location Status */}
        <div className="mb-4 p-4 bg-slate-50 rounded-lg">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-700 mb-1">Current Location</p>
              {userLocation ? (
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-slate-900 font-mono">
                      {formatLocation(userLocation)}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">
                    Updated: {new Date(userLocation.timestamp).toLocaleString()}
                  </p>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <X className="w-4 h-4 text-slate-400" />
                  <span className="text-sm text-slate-600">Not set</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleUpdateLocation}
            disabled={isUpdating}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-medium transition-colors"
          >
            <Navigation className="w-4 h-4" />
            <span>{userLocation ? 'Update Location' : 'Enable Location'}</span>
          </button>

          {userLocation && (
            <button
              onClick={handleClearLocation}
              className="w-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors"
            >
              Clear Location Data
            </button>
          )}
        </div>

        {/* Info */}
        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <p className="text-xs text-blue-900 leading-relaxed">
            <strong>Why enable location?</strong> Your location helps us center the map on your area, 
            show nearby issues, and automatically fill addresses when reporting problems.
          </p>
        </div>
      </div>
    </>
  );
}
