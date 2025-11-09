'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  ArrowBigUp, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Clock,
  Filter,
  AlertCircle,
  CheckCircle2,
  Loader2
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';
import AuthGuard from '@/components/AuthGuard';
import { getReportedIssues, type Issue } from '@/lib/issuesStore';

export default function ReportedIssuesPage() {
  const [issues, setIssues] = useState<Issue[]>([]);
  
  // Load reported issues from localStorage on mount
  useEffect(() => {
    const loadedIssues = getReportedIssues();
    setIssues(loadedIssues);
  }, []);
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
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'resolved':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <AlertCircle className="w-3.5 h-3.5" />;
      case 'in-progress':
        return <Loader2 className="w-3.5 h-3.5" />;
      case 'resolved':
        return <CheckCircle2 className="w-3.5 h-3.5" />;
      default:
        return null;
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
    pending: issues.filter(i => i.status === 'pending').length,
    inProgress: issues.filter(i => i.status === 'in-progress').length,
    resolved: issues.filter(i => i.status === 'resolved').length,
  };

  return (
    <AuthGuard>
      <Navbar />
      <div className="min-h-screen bg-linear-to-br from-violet-50 via-indigo-50 to-purple-50 pt-16">
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
            <h1 className="text-3xl font-bold text-zinc-900 mb-2">My Reported Issues</h1>
            <p className="text-zinc-600">Track all the issues you've reported to the community</p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl border border-zinc-200 p-4 shadow-sm">
              <div className="text-2xl font-bold text-zinc-900 mb-1">{stats.total}</div>
              <div className="text-sm text-zinc-600">Total Reports</div>
            </div>
            <div className="bg-white rounded-xl border border-yellow-200 p-4 shadow-sm">
              <div className="text-2xl font-bold text-yellow-700 mb-1">{stats.pending}</div>
              <div className="text-sm text-zinc-600">Pending</div>
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
                { key: 'all', label: 'All Issues', count: stats.total },
                { key: 'pending', label: 'Pending', count: stats.pending },
                { key: 'in-progress', label: 'In Progress', count: stats.inProgress },
                { key: 'resolved', label: 'Resolved', count: stats.resolved },
              ].map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setFilterStatus(tab.key)}
                  className={`px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    filterStatus === tab.key
                      ? 'bg-red-600 text-white shadow-sm'
                      : 'text-zinc-600 hover:bg-zinc-50'
                  }`}
                >
                  {tab.label}
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    filterStatus === tab.key
                      ? 'bg-red-500'
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
                {/* Header */}
                <div className="px-6 pt-5 pb-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{issue.timeAgo}</span>
                    </div>
                  </div>
                  <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(issue.status)}`}>
                    {getStatusIcon(issue.status)}
                    {getStatusText(issue.status)}
                  </span>
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
              <h3 className="text-lg font-semibold text-zinc-900 mb-2">No issues found</h3>
              <p className="text-zinc-600 text-sm mb-6">No issues match the selected status filter</p>
              <Link
                href="/map"
                className="inline-flex items-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                Report Your First Issue
              </Link>
            </div>
          )}
        </div>
      </div>
    </AuthGuard>
  );
}
