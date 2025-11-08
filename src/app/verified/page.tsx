'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowBigUp, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Clock,
  Filter,
  CheckCircle2,
  Shield,
  TrendingUp
} from 'lucide-react';
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
  status: 'in-progress' | 'resolved';
  timeAgo: string;
  verifiedDate: string;
  author: {
    name: string;
    avatar: string;
  };
  images: string[];
  hasUpvoted?: boolean;
  municipalityResponse?: string;
}

const verifiedIssues: Issue[] = [
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
    verifiedDate: '1 hour ago',
    author: {
      name: 'Rajesh Kumar',
      avatar: 'RK'
    },
    images: ['/placeholder-pothole.jpg'],
    hasUpvoted: false,
    municipalityResponse: 'Team has been dispatched for repair. Expected completion: 2 days.'
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
    verifiedDate: '2 hours ago',
    author: {
      name: 'Sneha Reddy',
      avatar: 'SR'
    },
    images: [],
    hasUpvoted: false,
    municipalityResponse: 'Water department investigating pipeline issue. Temporary supply schedule implemented.'
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
    verifiedDate: '1 day ago',
    author: {
      name: 'Mohammed Ali',
      avatar: 'MA'
    },
    images: ['/placeholder-footpath.jpg'],
    hasUpvoted: false,
    municipalityResponse: 'Footpath repair completed. New tiles installed and area is now safe for pedestrians.'
  },
  {
    id: '6',
    title: 'Traffic signal malfunction at busy intersection',
    description: 'The traffic light at the main intersection has been malfunctioning, causing traffic congestion and safety hazards.',
    category: 'Others',
    location: 'Central Square',
    coordinates: { lat: 15.4935, lng: 73.8255 },
    upvotes: 203,
    comments: 45,
    status: 'resolved',
    timeAgo: '5 days ago',
    verifiedDate: '4 days ago',
    author: {
      name: 'Arjun Nair',
      avatar: 'AN'
    },
    images: ['/placeholder-traffic.jpg'],
    hasUpvoted: false,
    municipalityResponse: 'Signal system upgraded and repaired. Traffic flow normalized.'
  },
  {
    id: '7',
    title: 'Stray dog menace in residential area',
    description: 'Increasing number of stray dogs creating safety concerns, especially for children and elderly residents.',
    category: 'Others',
    location: 'Green Park Society',
    coordinates: { lat: 15.4965, lng: 73.8275 },
    upvotes: 98,
    comments: 28,
    status: 'in-progress',
    timeAgo: '6 hours ago',
    verifiedDate: '5 hours ago',
    author: {
      name: 'Kavita Desai',
      avatar: 'KD'
    },
    images: [],
    hasUpvoted: false,
    municipalityResponse: 'Animal control team activated. Vaccination and sterilization drive scheduled.'
  }
];

export default function VerifiedIssuesPage() {
  const [issues, setIssues] = useState<Issue[]>(verifiedIssues);
  const [filterStatus, setFilterStatus] = useState<string>('all');

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
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusText = (status: string) => {
    return status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const filteredIssues = issues.filter(issue => 
    filterStatus === 'all' || issue.status === filterStatus
  );

  const stats = {
    total: issues.length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 pt-16">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        <div className="relative max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-zinc-900">Verified Issues</h1>
                <p className="text-zinc-600 text-sm">Confirmed and acknowledged by municipality</p>
              </div>
            </div>
          </div>

          {/* Info Banner */}
          <div className="bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-xl p-4 mb-6">
            <div className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="text-sm font-semibold text-green-900 mb-1">What are Verified Issues?</h3>
                <p className="text-sm text-green-800 leading-relaxed">
                  These issues have been reviewed and confirmed by the municipality. They are actively being worked on or have been resolved. Each verified issue includes an official response from the authorities.
                </p>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
              <div className="text-2xl font-bold text-zinc-900 mb-1">{stats.total}</div>
              <div className="text-sm text-zinc-600">Total Verified</div>
            </div>
            <div className="bg-white rounded-xl border border-blue-200 p-4 shadow-sm">
              <div className="text-2xl font-bold text-blue-700 mb-1">{stats.inProgress}</div>
              <div className="text-sm text-zinc-600">In Progress</div>
            </div>
            <div className="bg-white rounded-xl border border-green-200 p-4 shadow-sm">
              <div className="text-2xl font-bold text-green-700 mb-1">{stats.resolved}</div>
              <div className="text-sm text-zinc-600">Resolved</div>
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="bg-white rounded-xl border border-zinc-200 p-2 mb-6 shadow-sm">
            <div className="flex items-center gap-2 flex-wrap">
              {[
                { key: 'all', label: 'All Verified', count: stats.total },
                { key: 'in-progress', label: 'In Progress', count: stats.inProgress },
                { key: 'resolved', label: 'Resolved', count: stats.resolved },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterStatus(tab.key)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === tab.key
                      ? 'bg-green-600 text-white shadow-sm'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    filterStatus === tab.key
                      ? 'bg-green-500'
                      : 'bg-zinc-100 text-zinc-600'
                  }`}>
                    {tab.count}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Issues List */}
          <div className="space-y-4">
            {filteredIssues.map((issue, index) => (
              <motion.div
                key={issue.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl border border-zinc-200 overflow-hidden hover:shadow-md transition-all hover-lift"
              >
                {/* Verified Badge */}
                <div className="px-6 pt-4 pb-3 bg-green-50/50 border-b border-green-100">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Shield className="w-4 h-4 text-green-600" />
                      <span className="text-xs font-semibold text-green-700">VERIFIED BY MUNICIPALITY</span>
                      <span className="text-xs text-green-600">• {issue.verifiedDate}</span>
                    </div>
                    <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(issue.status)}`}>
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      {getStatusText(issue.status)}
                    </span>
                  </div>
                </div>

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
                        <span>Reported {issue.timeAgo}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
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

                  {/* Municipality Response */}
                  {issue.municipalityResponse && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start gap-2">
                        <Shield className="w-4 h-4 text-blue-600 mt-0.5 shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-blue-900 mb-1">Municipality Response</p>
                          <p className="text-sm text-blue-800">{issue.municipalityResponse}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Images */}
                  {issue.images.length > 0 && (
                    <div className={`grid gap-2 mb-4 ${issue.images.length === 1 ? 'grid-cols-1' : 'grid-cols-2'}`}>
                      {issue.images.map((img, idx) => (
                        <div key={idx} className="relative w-full aspect-video bg-zinc-100 rounded-lg overflow-hidden">
                          <div className="absolute inset-0 flex items-center justify-center text-zinc-400 text-sm">
                            Image Placeholder
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Interaction Bar */}
                <div className="px-6 py-3 border-t border-zinc-100 flex items-center gap-2">
                  <button
                    onClick={() => handleUpvote(issue.id)}
                    className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                      issue.hasUpvoted
                        ? 'bg-red-50 text-red-600'
                        : 'hover:bg-zinc-50 text-zinc-600'
                    }`}
                  >
                    <ArrowBigUp className={`w-5 h-5 ${issue.hasUpvoted ? 'fill-red-600' : ''}`} />
                    <span className="text-sm font-semibold">{issue.upvotes}</span>
                  </button>

                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-50 text-zinc-600 transition-colors">
                    <MessageCircle className="w-5 h-5" />
                    <span className="text-sm font-semibold">{issue.comments}</span>
                  </button>

                  <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-zinc-50 text-zinc-600 transition-colors">
                    <Share2 className="w-5 h-5" />
                    <span className="text-sm font-semibold">Share</span>
                  </button>

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
          </div>

          {/* Empty State */}
          {filteredIssues.length === 0 && (
            <div className="bg-white rounded-xl border border-zinc-200 p-12 text-center">
              <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Filter className="w-8 h-8 text-zinc-400" />
              </div>
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">No verified issues found</h3>
              <p className="text-zinc-600 text-sm">No verified issues match the selected filter</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
