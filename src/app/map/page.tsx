'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MapPin, X, Upload, Camera } from 'lucide-react';
import dynamic from 'next/dynamic';
import MapNavbar from '@/components/MapNavbar';
import AuthGuard from '@/components/AuthGuard';
import type { MapComponentProps } from '@/components/MapComponent';

// Dynamically import the Map component to avoid SSR issues
// Typed dynamic import so TS knows the component's props
const MapComponent = dynamic<MapComponentProps>(() => import('@/components/MapComponent').then(mod => mod.default), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-slate-100">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-[#00C853] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-[#757575]">Loading map...</p>
      </div>
    </div>
  )
});

export default function MapPage() {
  const [showReportModal, setShowReportModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);
  const categoryRef = useRef<HTMLDivElement>(null);

  const categories = ['Potholes', 'Street Lights', 'Garbage', 'Water Supply', 'Others'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedImages([...uploadedImages, ...files]);
    }
  };

  const handleSubmitReport = () => {
    // Handle report submission
    console.log({
      title: issueTitle,
      description: issueDescription,
      location: issueLocation,
      category: selectedCategory,
      images: uploadedImages
    });
    setShowReportModal(false);
    // Reset form
    setIssueTitle('');
    setIssueDescription('');
    setIssueLocation('');
    setSelectedCategory('');
    setUploadedImages([]);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setShowCategoryDropdown(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <AuthGuard>
      <MapNavbar onReportIssue={() => setShowReportModal(true)} />
      
      <div className="fixed inset-0 pt-16 bg-linear-to-br from-slate-50 via-gray-50 to-zinc-50">
        {/* Main Content Container */}
        <div className="h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col">
          {/* Header Section */}
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">
              Report Issues on Map
            </h1>
            <p className="text-zinc-600 text-sm">
              Double-click anywhere on the map to report an issue at that location
            </p>
          </div>

          {/* Report Issue Modal */}
          <AnimatePresence>
            {showReportModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center px-4"
                onClick={() => setShowReportModal(false)}
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.2 }}
                  className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  {/* Modal Header */}
                  <div className="sticky top-0 bg-white flex items-center justify-between px-8 py-5 border-b border-zinc-200 rounded-t-2xl">
                    <div>
                      <h2 className="text-2xl font-bold text-zinc-900">Report an Issue</h2>
                      <p className="text-sm text-zinc-600 mt-0.5">Help improve your community</p>
                    </div>
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-zinc-600" />
                    </button>
                  </div>

                  {/* Modal Body */}
                  <div className="px-8 py-6 space-y-5">
                    {/* Location Display */}
                    {issueLocation && (
                      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                        <div className="flex items-start gap-3">
                          <MapPin className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                          <div>
                            <p className="text-sm font-semibold text-green-900 mb-1">Location Selected</p>
                            <p className="text-sm text-green-700 font-mono">{issueLocation}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Search/Location Input */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">
                        Search Location <span className="text-red-600">*</span>
                      </label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4.5 h-4.5 text-zinc-400" />
                        <input
                          type="text"
                          placeholder="Search by address or landmark"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full pl-10 pr-4 py-3 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                        />
                      </div>
                    </div>

                    {/* Category Dropdown */}
                    <div className="relative" ref={categoryRef}>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">
                        Category <span className="text-red-600">*</span>
                      </label>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setShowCategoryDropdown(!showCategoryDropdown);
                        }}
                        className="w-full px-4 py-3 text-sm border border-zinc-300 rounded-xl bg-white text-zinc-900 flex items-center justify-between hover:border-red-400 transition-all focus:outline-none focus:ring-2 focus:ring-red-500"
                      >
                        <span className={selectedCategory ? 'text-zinc-900' : 'text-zinc-500'}>
                          {selectedCategory || 'Select a category'}
                        </span>
                        <ChevronDown className="w-4.5 h-4.5 ml-2 text-zinc-400" />
                      </button>
                      {showCategoryDropdown && (
                        <div className="absolute top-full mt-2 w-full bg-white border border-zinc-200 rounded-xl shadow-lg z-50 overflow-hidden">
                          {categories.map((category) => (
                            <button
                              key={category}
                              type="button"
                              onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedCategory(category);
                                setShowCategoryDropdown(false);
                              }}
                              className="w-full px-4 py-3 text-left text-sm hover:bg-zinc-50 text-zinc-900 transition-colors first:rounded-t-xl last:rounded-b-xl"
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Issue Title */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">
                        Issue Title <span className="text-red-600">*</span>
                      </label>
                      <input
                        type="text"
                        placeholder="Brief, clear description of the issue"
                        value={issueTitle}
                        onChange={(e) => setIssueTitle(e.target.value)}
                        className="w-full px-4 py-3 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent transition-all"
                      />
                    </div>

                    {/* Description */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">
                        Description
                      </label>
                      <textarea
                        placeholder="Provide detailed information about the issue..."
                        value={issueDescription}
                        onChange={(e) => setIssueDescription(e.target.value)}
                        rows={4}
                        className="w-full px-4 py-3 text-sm border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none transition-all"
                      />
                    </div>

                    {/* Image Upload */}
                    <div>
                      <label className="block text-sm font-semibold text-zinc-900 mb-2">
                        Upload Photos
                      </label>
                      <div className="border-2 border-dashed border-zinc-300 rounded-xl p-8 text-center hover:border-red-400 hover:bg-red-50/30 transition-all">
                        <input
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageUpload}
                          className="hidden"
                          id="image-upload"
                        />
                        <label htmlFor="image-upload" className="cursor-pointer">
                          <div className="w-14 h-14 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
                            <Camera className="w-7 h-7 text-zinc-500" />
                          </div>
                          <p className="text-sm font-medium text-zinc-700 mb-1">
                            Click to upload or drag and drop
                          </p>
                          <p className="text-xs text-zinc-500">
                            PNG, JPG, JPEG up to 10MB each
                          </p>
                        </label>
                      </div>
                      {uploadedImages.length > 0 && (
                        <div className="mt-4 grid grid-cols-4 gap-3">
                          {uploadedImages.map((file, index) => (
                            <div key={index} className="relative group">
                              <img
                                src={URL.createObjectURL(file)}
                                alt={`Upload ${index + 1}`}
                                className="w-full aspect-square object-cover rounded-lg border-2 border-zinc-200"
                              />
                              <button
                                onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== index))}
                                className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1.5 hover:bg-red-700 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Modal Footer */}
                  <div className="sticky bottom-0 bg-white px-8 py-5 border-t border-zinc-200 flex justify-end gap-3 rounded-b-2xl">
                    <button
                      onClick={() => setShowReportModal(false)}
                      className="px-5 py-2.5 text-sm font-semibold text-zinc-700 hover:bg-zinc-100 rounded-xl transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSubmitReport}
                      className="px-6 py-2.5 text-sm font-semibold text-white bg-red-600 hover:bg-red-700 rounded-xl transition-all shadow-lg hover:shadow-xl"
                    >
                      Submit Report
                    </button>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Map Container with Box */}
          <div className="flex-1 bg-white rounded-2xl border border-zinc-200 shadow-lg overflow-hidden">
            <MapComponent 
              onReportIssue={() => setShowReportModal(true)}
              onLocationSelected={({ lat, lng }) => {
                setIssueLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
              }}
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
