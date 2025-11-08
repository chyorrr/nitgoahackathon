'use client';

import { useState, useEffect, useRef } from 'react';
import api from '@/lib/api';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, MapPin, X, Upload, Camera } from 'lucide-react';
import dynamic from 'next/dynamic';

// Dynamically import the Map component to avoid SSR issues
const MapComponent = dynamic(() => import('@/components/MapComponent'), {
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
  const [selectedStatus, setSelectedStatus] = useState('');
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const [issueTitle, setIssueTitle] = useState('');
  const [issueDescription, setIssueDescription] = useState('');
  const [issueLocation, setIssueLocation] = useState('');
  const [uploadedImages, setUploadedImages] = useState<File[]>([]);

  const categories = ['Potholes', 'Street Lights', 'Garbage', 'Water Supply', 'Others'];
  const statuses = ['Pending', 'In Progress', 'Resolved'];

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setUploadedImages([...uploadedImages, ...files]);
    }
  };

  const handleSubmitReport = () => {
    // Prepare and submit report to backend
    (async () => {
      try {
        // Try to get user's current location; fallback to Goa center
        const getPosition = () => new Promise<GeolocationPosition | null>((resolve) => {
          if (!navigator.geolocation) return resolve(null);
          navigator.geolocation.getCurrentPosition(pos => resolve(pos), () => resolve(null), { timeout: 5000 });
        });

        const pos = await getPosition();
        const lat = pos ? pos.coords.latitude : 15.4909;
        const lng = pos ? pos.coords.longitude : 73.8278;

        const form = new FormData();
        form.append('title', issueTitle);
        form.append('description', issueDescription);
        form.append('category', selectedCategory || 'Others');
        form.append('latitude', String(lat));
        form.append('longitude', String(lng));
        if (uploadedImages && uploadedImages.length > 0) {
          // backend expects field name 'issueImage'
          form.append('issueImage', uploadedImages[0]);
        }

        await api.createIssue(form);
        alert('Issue reported successfully');
        setShowReportModal(false);
        // Reset form
        setIssueTitle('');
        setIssueDescription('');
        setIssueLocation('');
        setSelectedCategory('');
        setSelectedStatus('');
        setUploadedImages([]);
      } catch (err: any) {
        console.error(err);
        alert(err?.message || 'Failed to submit report');
      }
    })();
  };

  return (
    <div className="fixed inset-0 pt-20 flex flex-col bg-transparent overflow-hidden">
      {/* Background elements - similar to landing page sections */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-[#69F0AE]/20 rounded-full filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#00C853]/10 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2979FF]/5 rounded-full filter blur-3xl opacity-25"></div>
      </div>

      {/* Header Section */}
      <div className="relative bg-white/90 backdrop-blur-sm z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          {/* Title */}
          <div className="text-center">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#212121]">
              Report. Track. Resolve.
            </h1>
            <p className="text-[#757575] text-xs sm:text-sm mt-1">
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
            className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center pt-20 px-4 overflow-y-auto"
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

                {/* Category and Status Row */}
                <div className="grid grid-cols-2 gap-4">
                  {/* Category Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-[#212121] mb-2">
                      Category <span className="text-red-600">*</span>
                    </label>
                    <button
                      onClick={() => {
                        setShowCategoryDropdown(!showCategoryDropdown);
                        setShowStatusDropdown(false);
                      }}
                      className="w-full px-3 py-2.5 text-sm border border-[#E0E0E0] rounded-lg bg-white text-[#212121] flex items-center justify-between hover:border-[#2979FF] transition-colors"
                    >
                      <span className={selectedCategory ? 'text-[#212121]' : 'text-[#757575]'}>
                        {selectedCategory || 'Select Category'}
                      </span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    {showCategoryDropdown && (
                      <div className="absolute top-full mt-2 w-full bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-20 max-h-48 overflow-y-auto">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
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

                  {/* Status Dropdown */}
                  <div className="relative">
                    <label className="block text-sm font-medium text-[#212121] mb-2">
                      Status <span className="text-red-600">*</span>
                    </label>
                    <button
                      onClick={() => {
                        setShowStatusDropdown(!showStatusDropdown);
                        setShowCategoryDropdown(false);
                      }}
                      className="w-full px-3 py-2.5 text-sm border border-[#E0E0E0] rounded-lg bg-white text-[#212121] flex items-center justify-between hover:border-[#2979FF] transition-colors"
                    >
                      <span className={selectedStatus ? 'text-[#212121]' : 'text-[#757575]'}>
                        {selectedStatus || 'Select Status'}
                      </span>
                      <ChevronDown className="w-4 h-4 ml-2" />
                    </button>
                    {showStatusDropdown && (
                      <div className="absolute top-full mt-2 w-full bg-white border border-[#E0E0E0] rounded-lg shadow-lg z-20">
                        {statuses.map((status) => (
                          <button
                            key={status}
                            onClick={() => {
                              setSelectedStatus(status);
                              setShowStatusDropdown(false);
                            }}
                            className="w-full px-3 py-2 text-left text-sm hover:bg-[#F8F9FA] text-[#212121] transition-colors first:rounded-t-lg last:rounded-b-lg"
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    )}
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
        <MapComponent onReportIssue={() => setShowReportModal(true)} />
      </div>
    </div>
  );
}
