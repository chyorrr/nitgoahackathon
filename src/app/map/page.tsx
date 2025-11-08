'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MapPin, X, Upload, Camera } from 'lucide-react';
import dynamic from 'next/dynamic';
import MapNavbar from '@/components/MapNavbar';
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
    <>
      <MapNavbar onReportIssue={() => setShowReportModal(true)} />
      
  <div className="fixed inset-0 pt-16 flex flex-col bg-transparent overflow-hidden">
      {/* Minimal background, removed glow circles for subtle design */}
      <div className="absolute inset-0 pointer-events-none" />

      {/* Header Section - merged styling with navbar */}
      <div className="relative bg-white/80 backdrop-blur z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1f2937]">
              Report. Track. Resolve.
            </h1>
            <p className="text-[#6b7280] text-xs sm:text-sm mt-1">
              Your platform for reporting, tracking, and resolving community issues efficiently.
            </p>
          </div>
        </div>
      </div>

      {/* Report Issue Modal */}
      <AnimatePresence>
        {showReportModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-2000 flex items-start justify-center pt-20 px-4 overflow-y-auto"
            onClick={() => setShowReportModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="bg-white rounded-xl shadow-2xl max-w-2xl w-full my-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#E0E0E0]">
                <h2 className="text-xl font-bold text-[#212121]">Report an Issue</h2>
                <button
                  onClick={() => setShowReportModal(false)}
                  className="p-2 hover:bg-[#F8F9FA] rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-[#757575]" />
                </button>
              </div>

              {/* Modal Body */}
              <div className="px-6 py-4 space-y-4">
                {/* Search/Location Input */}
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">
                    Location <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-[#757575]" />
                    <input
                      type="text"
                      placeholder="Search by address or keyword"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2979FF] focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Category and Upload Image Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Category Dropdown */}
                  <div className="relative" ref={categoryRef}>
                    <label className="block text-sm font-medium text-[#212121] mb-2">
                      Category <span className="text-red-600">*</span>
                    </label>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setShowCategoryDropdown(!showCategoryDropdown);
                      }}
                      className="w-full px-3 py-2.5 text-sm border border-[#E0E0E0] rounded-lg bg-white text-[#212121] flex items-center justify-between hover:border-[#2979FF] transition-colors"
                    >
                      <span className={selectedCategory ? 'text-[#212121]' : 'text-[#757575]'}>
                        {selectedCategory || 'Select Category'}
                      </span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    {showCategoryDropdown && (
                      <div className="absolute top-full mt-2 w-full bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-2100 max-h-48 overflow-y-auto">
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
                            className="w-full px-3 py-2 text-left text-sm hover:bg-[#F8F9FA] text-[#212121] transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Upload Image Button */}
                  <div>
                    <label className="block text-sm font-medium text-[#212121] mb-2">
                      Upload Photo
                    </label>
                    <label
                      htmlFor="quick-image-upload"
                      className="w-full px-3 py-2.5 text-sm border border-[#E0E0E0] rounded-lg bg-white text-[#757575] flex items-center justify-center hover:border-[#2979FF] transition-colors cursor-pointer"
                    >
                      <Upload className="w-4 h-4 mr-2" />
                      <span>Choose File</span>
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="quick-image-upload"
                    />
                  </div>
                </div>

                {/* Issue Title */}
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">
                    Issue Title <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Brief description of the issue"
                    value={issueTitle}
                    onChange={(e) => setIssueTitle(e.target.value)}
                    className="w-full px-4 py-2.5 text-sm border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2979FF] focus:border-transparent"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">
                    Description
                  </label>
                  <textarea
                    placeholder="Provide detailed information about the issue"
                    value={issueDescription}
                    onChange={(e) => setIssueDescription(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2.5 text-sm border border-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2979FF] focus:border-transparent resize-none"
                  />
                </div>

                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-[#212121] mb-2">
                    Upload Photos
                  </label>
                  <div className="border-2 border-dashed border-[#E0E0E0] rounded-lg p-6 text-center hover:border-[#2979FF] transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Camera className="w-12 h-12 text-[#757575] mx-auto mb-2" />
                      <p className="text-sm text-[#757575]">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-[#757575] mt-1">
                        PNG, JPG up to 10MB
                      </p>
                    </label>
                  </div>
                  {uploadedImages.length > 0 && (
                    <div className="mt-3 flex gap-2 flex-wrap">
                      {uploadedImages.map((file, index) => (
                        <div key={index} className="relative">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Upload ${index + 1}`}
                            className="w-20 h-20 object-cover rounded-lg border border-[#E0E0E0]"
                          />
                          <button
                            onClick={() => setUploadedImages(uploadedImages.filter((_, i) => i !== index))}
                            className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full p-1 hover:bg-red-700"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Modal Footer */}
              <div className="px-6 py-4 border-t border-[#E0E0E0] flex justify-end gap-3">
                <button
                  onClick={() => setShowReportModal(false)}
                  className="px-4 py-2 text-sm font-medium text-[#757575] hover:bg-[#F8F9FA] rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmitReport}
                  className="px-6 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-lg transition-colors shadow-md"
                >
                  Submit Report
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Container */}
      <div className="flex-1 relative">
        <MapComponent 
          onReportIssue={() => setShowReportModal(true)}
          onLocationSelected={({ lat, lng }) => {
            setIssueLocation(`${lat.toFixed(6)}, ${lng.toFixed(6)}`);
          }}
        />
      </div>
    </div>
    </>
  );
}
