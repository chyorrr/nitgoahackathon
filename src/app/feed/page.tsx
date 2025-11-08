'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowBigUp, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Clock,
  ChevronDown,
  Filter,
  TrendingUp,
  Calendar
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  upvotes: number;
  comments: number;
  status: 'pending' | 'in-progress' | 'resolved';
  timeAgo: string;
  author: {
    name: string;
    avatar: string;
  };
  images: string[];
  hasUpvoted?: boolean;
}

// Sample data - in production, this would come from an API
const sampleIssues: Issue[] = [
  {
    id: '1',
    title: 'Large pothole on MG Road causing accidents',
    description: 'There is a massive pothole near the traffic signal that has been causing accidents. Multiple vehicles have damaged their tires. This needs immediate attention as it\'s a major safety hazard.',
    category: 'Potholes',
    location: 'MG Road, Near Central Mall',
    coordinates: { lat: 15.4909, lng: 73.8278 },
    upvotes: 142,
    comments: 23,
    status: 'in-progress',
    timeAgo: '2 hours ago',
    author: {
      name: 'Rajesh Kumar',
      avatar: 'RK'
    },
    images: ['/placeholder-pothole.jpg'],
    hasUpvoted: false
  },
  {
    id: '2',
    title: 'Street light not working for 2 weeks',
    description: 'The street light on Park Avenue has been non-functional for the past two weeks, making the area very dark and unsafe at night.',
    category: 'Street Lights',
    location: 'Park Avenue, Sector 5',
    coordinates: { lat: 15.4989, lng: 73.8312 },
    upvotes: 89,
    comments: 15,
    status: 'pending',
    timeAgo: '5 hours ago',
    author: {
      name: 'Priya Sharma',
      avatar: 'PS'
    },
    images: [],
    hasUpvoted: false
  },
  {
    id: '3',
    title: 'Garbage not collected for 3 days',
    description: 'Garbage collection has not been done in our area for the past 3 days. The bins are overflowing and creating a hygiene issue.',
    category: 'Garbage',
    location: 'Green Valley Apartments',
    coordinates: { lat: 15.5015, lng: 73.8245 },
    upvotes: 67,
    comments: 8,
    status: 'pending',
    timeAgo: '1 day ago',
    author: {
      name: 'Amit Patel',
      avatar: 'AP'
    },
    images: ['/placeholder-garbage.jpg', '/placeholder-garbage2.jpg'],
    hasUpvoted: false
  },
  {
    id: '4',
    title: 'Water supply disruption in the morning',
    description: 'There has been no water supply between 6 AM to 10 AM for the past week. This is causing major inconvenience to residents.',
    category: 'Water Supply',
    location: 'Sunrise Colony, Block C',
    coordinates: { lat: 15.4955, lng: 73.8290 },
    upvotes: 156,
    comments: 34,
    status: 'in-progress',
    timeAgo: '3 hours ago',
    author: {
      name: 'Sneha Reddy',
      avatar: 'SR'
    },
    images: [],
    hasUpvoted: false
  },
  {
    id: '5',
    title: 'Broken footpath causing difficulties',
    description: 'The footpath tiles are broken and displaced, making it difficult for pedestrians, especially elderly people and children.',
    category: 'Others',
    location: 'Station Road',
    coordinates: { lat: 15.4925, lng: 73.8265 },
    upvotes: 45,
    comments: 12,
    status: 'resolved',
    timeAgo: '2 days ago',
    author: {
      name: 'Mohammed Ali',
      avatar: 'MA'
    },
    images: ['/placeholder-footpath.jpg'],
    hasUpvoted: false
  }
];

export default function FeedPage() {
  const [issues, setIssues] = useState<Issue[]>(sampleIssues);
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('trending');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);

  const categories = ['All', 'Potholes', 'Street Lights', 'Garbage', 'Water Supply', 'Others'];

  const handleUpvote = (issueId: string) => {
    setIssues(issues.map(issue => {
      if (issue.id === issueId) {
        return {
          ...issue,
          upvotes: issue.hasUpvoted ? issue.upvotes - 1 : issue.upvotes + 1,
          hasUpvoted: !issue.hasUpvoted
        };
      }
      return issue;
    }));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const filteredAndSortedIssues = issues
    .filter(issue => filterCategory === 'all' || issue.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === 'trending') {
        return b.upvotes - a.upvotes;
      }
      return 0; // 'recent' is already in correct order
    });

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Community Feed</h1>
            <p className="text-slate-600">See what issues your community is reporting and help bring them to attention</p>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-4 mb-6">
            <div className="flex items-center justify-between gap-4">
              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:border-slate-400 transition-colors"
                >
                  {sortBy === 'trending' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">Trending</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-slate-600" />
                      <span className="text-sm font-medium text-slate-700">Recent</span>
                    </>
                  )}
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                </button>
                
                {showSortDropdown && (
                  <div className="absolute top-full mt-2 left-0 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        setSortBy('trending');
                        setShowSortDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-t-lg"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('recent');
                        setShowSortDropdown(false);
                      }}
                      className="w-full flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 rounded-b-lg"
                    >
                      <Calendar className="w-4 h-4" />
                      Recent
                    </button>
                  </div>
                )}
              </div>

              {/* Filter */}
              <div className="relative">
                <button
                  onClick={() => setShowFilterDropdown(!showFilterDropdown)}
                  className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-300 rounded-lg hover:border-slate-400 transition-colors"
                >
                  <Filter className="w-4 h-4 text-slate-600" />
                  <span className="text-sm font-medium text-slate-700">
                    {filterCategory === 'all' ? 'All Categories' : filterCategory}
                  </span>
                  <ChevronDown className="w-4 h-4 text-slate-600" />
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-slate-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setFilterCategory(category.toLowerCase());
                          setShowFilterDropdown(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-slate-700 hover:bg-slate-50 first:rounded-t-lg last:rounded-b-lg"
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Issues Feed */}
          <div className="space-y-4">
            <AnimatePresence>
              {filteredAndSortedIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow"
                >
                  {/* Author Info */}
                  <div className="px-6 pt-4 pb-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center text-slate-700 font-semibold">
                        {issue.author.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-slate-900">{issue.author.name}</p>
                        <div className="flex items-center gap-2 text-xs text-slate-500">
                          <Clock className="w-3 h-3" />
                          <span>{issue.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(issue.status)}`}>
                      {getStatusText(issue.status)}
                    </span>
                  </div>

                  {/* Issue Content */}
                  <div className="px-6 pb-4">
                    <h3 className="text-lg font-semibold text-slate-900 mb-2">{issue.title}</h3>
                    <p className="text-slate-600 text-sm mb-3 leading-relaxed">{issue.description}</p>
                    
                    {/* Location and Category */}
                    <div className="flex items-center gap-4 mb-3">
                      <div className="flex items-center gap-1 text-xs text-slate-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{issue.location}</span>
                      </div>
                      <span className="px-2 py-1 bg-slate-100 text-slate-700 rounded text-xs font-medium">
                        {issue.category}
                      </span>
                    </div>

                    {/* Images */}
                    {issue.images.length > 0 && (
                      <div className={`grid gap-2 mb-4 ${issue.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {issue.images.map((img, idx) => (
                          <div key={idx} className="relative w-full aspect-video bg-slate-100 rounded-lg overflow-hidden">
                            <div className="absolute inset-0 flex items-center justify-center text-slate-400 text-sm">
                              Image Placeholder
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interaction Bar */}
                  <div className="px-6 py-3 border-t border-slate-200 flex items-center gap-1">
                    {/* Upvote */}
                    <button
                      onClick={() => handleUpvote(issue.id)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                        issue.hasUpvoted
                          ? 'bg-red-50 text-red-600'
                          : 'hover:bg-slate-50 text-slate-600'
                      }`}
                    >
                      <ArrowBigUp
                        className={`w-5 h-5 ${issue.hasUpvoted ? 'fill-red-600' : ''}`}
                      />
                      <span className="text-sm font-medium">{issue.upvotes}</span>
                    </button>

                    {/* Comments */}
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-medium">{issue.comments}</span>
                    </button>

                    {/* Share */}
                    <button className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm font-medium">Share</span>
                    </button>

                    {/* View on Map */}
                    <Link
                      href={`/map?lat=${issue.coordinates.lat}&lng=${issue.coordinates.lng}`}
                      className="ml-auto flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-slate-50 text-slate-600 transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      <span className="text-sm font-medium">View on Map</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Empty State */}
          {filteredAndSortedIssues.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-12 text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">No issues found</h3>
              <p className="text-slate-600 text-sm">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
