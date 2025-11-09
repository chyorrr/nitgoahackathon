'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
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
  Calendar,
  Shield,
  FileText,
  CheckCircle
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';

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
  beforeImage?: string;
  afterImage?: string;
  resolvedDate?: string;
}

// Resolved issues with before/after
const resolvedIssues: Issue[] = [
  {
    id: 'r1',
    title: 'Pothole on Station Road Fixed',
    description: 'Major pothole that was causing traffic issues has been completely repaired.',
    category: 'Potholes',
    location: 'Station Road, Sector 12',
    coordinates: { lat: 15.4850, lng: 73.8250 },
    upvotes: 234,
    comments: 45,
    status: 'resolved',
    timeAgo: '3 days ago',
    author: { name: 'Municipal Corp', avatar: 'MC' },
    images: [],
    beforeImage: '/images/issues/pothole_before.jpg.png',
    afterImage: '/images/issues/pothole_after.jpg.png',
    resolvedDate: 'Nov 6, 2025'
  },
  {
    id: 'r2',
    title: 'Street Light Restored at Park Avenue',
    description: 'Non-functional street light has been replaced with new LED fixture.',
    category: 'Street Lights',
    location: 'Park Avenue, Sector 5',
    coordinates: { lat: 15.4920, lng: 73.8290 },
    upvotes: 156,
    comments: 28,
    status: 'resolved',
    timeAgo: '5 days ago',
    author: { name: 'Public Works Dept', avatar: 'PW' },
    images: [],
    beforeImage: '/images/issues/light_before.jpg.png',
    afterImage: '/images/issues/light_after.jpg.png',
    resolvedDate: 'Nov 4, 2025'
  },
  {
    id: 'r3',
    title: 'Garden Area Cleaned and Maintained',
    description: 'Overgrown bushes trimmed and garbage cleared from community garden.',
    category: 'Garbage',
    location: 'Community Garden, Block C',
    coordinates: { lat: 15.4880, lng: 73.8310 },
    upvotes: 189,
    comments: 32,
    status: 'resolved',
    timeAgo: '1 week ago',
    author: { name: 'Sanitation Dept', avatar: 'SD' },
    images: [],
    beforeImage: '/images/issues/garden_before.png',
    afterImage: '/images/issues/garden_after.png',
    resolvedDate: 'Nov 2, 2025'
  }
];

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
    images: ['/images/issues/pothole_mg.jpg'],
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
    images: ['/images/issues/light_before.jpg.png'],
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
    images: ['/images/issues/garbage_before.jpg.png'],
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
    images: ['/images/issues/pothole_before.jpg.png'],
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
    images: ['/images/issues/Footpath_01.jpg'],
    hasUpvoted: false
  }
];

export default function FeedPage() {
  const router = useRouter();
  const [issues, setIssues] = useState<Issue[]>(sampleIssues);
  const [sortBy, setSortBy] = useState<'trending' | 'recent'>('trending');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check auth status
  useEffect(() => {
    const authState = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(authState === 'true');
  }, []);

  const categories = ['All', 'Potholes', 'Street Lights', 'Garbage', 'Water Supply', 'Others'];

  const handleUpvote = (issueId: string) => {
    if (!isLoggedIn) {
      router.push('/login');
      return;
    }
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
    <AuthGuard>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-purple-50 to-pink-50 pt-16">
        <div className="max-w-3xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-linear-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent mb-2">Community Feed</h1>
            <p className="text-zinc-700">Discover and support issues reported by your community</p>
          </div>

          {/* Quick Links */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <Link
              href="/reported"
              className="group bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-4 shadow-sm hover:shadow-lg hover:border-purple-300 hover:bg-white transition-all hover-lift"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-purple-100 to-pink-100 flex items-center justify-center group-hover:from-purple-200 group-hover:to-pink-200 transition-colors">
                  <FileText className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">My Reports</p>
                  <p className="text-xs text-zinc-600">Track your issues</p>
                </div>
              </div>
            </Link>
            
            <Link
              href="/verified"
              className="group bg-white/80 backdrop-blur-sm rounded-xl border border-emerald-200 p-4 shadow-sm hover:shadow-lg hover:border-emerald-300 hover:bg-white transition-all hover-lift"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-linear-to-br from-emerald-100 to-cyan-100 flex items-center justify-center group-hover:from-emerald-200 group-hover:to-cyan-200 transition-colors">
                  <Shield className="w-5 h-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-900">Verified Issues</p>
                  <p className="text-xs text-zinc-600">Municipality confirmed</p>
                </div>
              </div>
            </Link>
          </div>

          {/* Filters and Sort */}
          <div className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-4 mb-6 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              {/* Sort */}
              <div className="relative">
                <button
                  onClick={() => setShowSortDropdown(!showSortDropdown)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-linear-to-r from-purple-50 to-pink-50 border border-purple-300 rounded-lg hover:border-purple-400 hover:from-purple-100 hover:to-pink-100 transition-all text-sm font-medium"
                >
                  {sortBy === 'trending' ? (
                    <>
                      <TrendingUp className="w-4 h-4 text-purple-600" />
                      <span className="text-zinc-800">Trending</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4 text-purple-600" />
                      <span className="text-zinc-800">Recent</span>
                    </>
                  )}
                  <ChevronDown className="w-4 h-4 text-purple-600" />
                </button>
                
                {showSortDropdown && (
                  <div className="absolute top-full mt-2 left-0 w-48 bg-white border border-zinc-200 rounded-xl shadow-lg z-50 overflow-hidden">
                    <button
                      onClick={() => {
                        setSortBy('trending');
                        setShowSortDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
                    >
                      <TrendingUp className="w-4 h-4" />
                      Trending
                    </button>
                    <button
                      onClick={() => {
                        setSortBy('recent');
                        setShowSortDropdown(false);
                      }}
                      className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-zinc-700 hover:bg-zinc-50"
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
                  className="flex items-center gap-2 px-4 py-2.5 bg-white border border-zinc-300 rounded-lg hover:border-zinc-400 transition-colors text-sm font-medium"
                >
                  <Filter className="w-4 h-4 text-zinc-600" />
                  <span className="text-zinc-700">
                    {filterCategory === 'all' ? 'All Categories' : filterCategory}
                  </span>
                  <ChevronDown className="w-4 h-4 text-zinc-600" />
                </button>
                
                {showFilterDropdown && (
                  <div className="absolute top-full mt-2 right-0 w-48 bg-white border border-zinc-200 rounded-xl shadow-lg z-50 max-h-64 overflow-y-auto">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => {
                          setFilterCategory(category.toLowerCase());
                          setShowFilterDropdown(false);
                        }}
                        className="w-full px-4 py-2.5 text-left text-sm text-zinc-700 hover:bg-zinc-50 first:rounded-t-xl last:rounded-b-xl"
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
                  className="bg-white rounded-xl border border-zinc-200 overflow-hidden hover:shadow-md transition-all hover-lift"
                >
                  {/* Author Info */}
                  <div className="px-6 pt-5 pb-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold text-sm shadow-sm">
                        {issue.author.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900">{issue.author.name}</p>
                        <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{issue.timeAgo}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold ${getStatusColor(issue.status)}`}>
                      {getStatusText(issue.status)}
                    </span>
                  </div>

                  {/* Issue Content */}
                  <div className="px-6 pb-5">
                    <h3 className="text-lg font-bold text-zinc-900 mb-2 leading-snug">{issue.title}</h3>
                    <p className="text-zinc-600 text-sm mb-4 leading-relaxed">{issue.description}</p>
                    
                    {/* Location and Category */}
                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                        <MapPin className="w-3.5 h-3.5" />
                        <span>{issue.location}</span>
                      </div>
                      <span className="px-2.5 py-1 bg-zinc-100 text-zinc-700 rounded-lg text-xs font-medium">
                        {issue.category}
                      </span>
                    </div>

                    {/* Images */}
                    {issue.images.length > 0 && (
                      <div className={`grid gap-2 mb-4 ${issue.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                        {issue.images.map((img, idx) => (
                          <div key={idx} className="relative w-full aspect-video bg-zinc-100 rounded-lg overflow-hidden">
                            <Image
                              src={img}
                              alt={`Issue image ${idx + 1}`}
                              fill
                              className="object-cover"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Interaction Bar */}
                  <div className="px-6 py-3 border-t border-zinc-100 flex items-center gap-2">
                    {/* Upvote */}
                    <button
                      onClick={() => handleUpvote(issue.id)}
                      disabled={!isLoggedIn}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        issue.hasUpvoted
                          ? 'bg-red-50 text-red-600'
                          : !isLoggedIn
                          ? 'opacity-50 cursor-not-allowed text-zinc-400'
                          : 'hover:bg-zinc-50 text-zinc-600'
                      }`}
                      title={!isLoggedIn ? 'Login to upvote' : ''}
                    >
                      <ArrowBigUp
                        className={`w-5 h-5 ${issue.hasUpvoted ? 'fill-red-600' : ''}`}
                      />
                      <span className="text-sm font-semibold">{issue.upvotes}</span>
                    </button>

                    {/* Comments */}
                    <Link
                      href={isLoggedIn ? `/issue/${issue.id}` : '/login'}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                        !isLoggedIn
                          ? 'opacity-50 cursor-not-allowed text-zinc-400'
                          : 'hover:bg-zinc-50 text-zinc-600'
                      }`}
                      title={!isLoggedIn ? 'Login to comment' : ''}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span className="text-sm font-semibold">{issue.comments}</span>
                    </Link>

                    {/* Share */}
                    <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-50 text-zinc-600 transition-colors">
                      <Share2 className="w-5 h-5" />
                      <span className="text-sm font-semibold">Share</span>
                    </button>

                    {/* View on Map */}
                    <Link
                      href={`/map?lat=${issue.coordinates.lat}&lng=${issue.coordinates.lng}`}
                      className="ml-auto flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-50 text-zinc-600 transition-colors"
                    >
                      <MapPin className="w-5 h-5" />
                      <span className="text-sm font-semibold">View</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Past Fixes Section */}
          <div className="mt-12">
            <div className="mb-6">
              <h2 className="text-2xl font-bold bg-linear-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                Past Fixes
              </h2>
              <p className="text-zinc-700">See how community reports led to real changes</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {resolvedIssues.map((issue, index) => (
                <motion.div
                  key={issue.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-xl border border-green-200 overflow-hidden hover:shadow-lg transition-all hover-lift"
                >
                  {/* Before/After Images */}
                  <div className="relative h-48">
                    <div className="absolute inset-0 grid grid-cols-2 gap-0.5">
                      {/* Before */}
                      <div className="relative bg-zinc-100 overflow-hidden group">
                        {issue.beforeImage && (
                          <Image
                            src={issue.beforeImage}
                            alt="Before"
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          BEFORE
                        </div>
                      </div>
                      {/* After */}
                      <div className="relative bg-zinc-100 overflow-hidden group">
                        {issue.afterImage && (
                          <Image
                            src={issue.afterImage}
                            alt="After"
                            fill
                            className="object-cover"
                          />
                        )}
                        <div className="absolute top-2 right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          AFTER
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <div className="flex items-start justify-between mb-2">
                      <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-lg text-xs font-semibold flex items-center gap-1">
                        <CheckCircle className="w-3 h-3" />
                        Resolved
                      </span>
                      <span className="text-xs text-zinc-500">{issue.resolvedDate}</span>
                    </div>
                    
                    <h3 className="font-bold text-zinc-900 mb-2 leading-snug line-clamp-2">
                      {issue.title}
                    </h3>
                    
                    <p className="text-zinc-600 text-sm mb-3 line-clamp-2">
                      {issue.description}
                    </p>

                    <div className="flex items-center gap-1.5 text-xs text-zinc-500 mb-3">
                      <MapPin className="w-3.5 h-3.5" />
                      <span className="line-clamp-1">{issue.location}</span>
                    </div>

                    {/* Stats */}
                    <div className="flex items-center gap-4 pt-3 border-t border-zinc-100">
                      <div className="flex items-center gap-1.5 text-zinc-600">
                        <ArrowBigUp className="w-4 h-4 fill-green-600 text-green-600" />
                        <span className="text-sm font-semibold">{issue.upvotes}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-zinc-600">
                        <MessageCircle className="w-4 h-4" />
                        <span className="text-sm font-semibold">{issue.comments}</span>
                      </div>
                      <div className="ml-auto">
                        <span className="px-2 py-1 bg-zinc-100 text-zinc-700 rounded-md text-xs font-medium">
                          {issue.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Empty State */}
          {filteredAndSortedIssues.length === 0 && (
            <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">No issues found</h3>
              <p className="text-zinc-600 text-sm">Try adjusting your filters to see more results</p>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
