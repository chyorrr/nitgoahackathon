'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowBigUp,
  ArrowBigDown,
  MessageCircle,
  Share2,
  MapPin,
  Clock,
  User,
  Send,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Flag
} from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Navbar from '@/components/Navbar';

interface Comment {
  id: string;
  author: {
    name: string;
    avatar: string;
    role?: 'citizen' | 'moderator' | 'official';
  };
  content: string;
  timeAgo: string;
  upvotes: number;
  hasUpvoted?: boolean;
  replies?: Comment[];
}

interface Issue {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  coordinates: { lat: number; lng: number };
  upvotes: number;
  downvotes: number;
  hasUpvoted?: boolean;
  hasDownvoted?: boolean;
  status: 'pending' | 'in-progress' | 'resolved';
  timeAgo: string;
  author: {
    name: string;
    avatar: string;
  };
  images: string[];
  beforeAfterImages?: {
    before: string[];
    after: string[];
  };
}

// Sample issue data
const sampleIssue: Issue = {
  id: '1',
  title: 'Large pothole on MG Road causing accidents',
  description: 'There is a massive pothole near the traffic signal that has been causing accidents. Multiple vehicles have damaged their tires. This needs immediate attention as it\'s a major safety hazard. The depth is approximately 6 inches and width is about 2 feet.',
  category: 'Potholes',
  location: 'MG Road, Near Central Mall',
  coordinates: { lat: 15.4909, lng: 73.8278 },
  upvotes: 142,
  downvotes: 3,
  status: 'in-progress',
  timeAgo: '2 hours ago',
  author: {
    name: 'Rajesh Kumar',
    avatar: 'RK'
  },
  images: ['/placeholder-pothole.jpg'],
  hasUpvoted: false,
  hasDownvoted: false
};

const sampleComments: Comment[] = [
  {
    id: 'c1',
    author: { name: 'Municipal Officer', avatar: 'MO', role: 'official' },
    content: 'We have received this complaint and assigned a team to inspect the issue. Expected resolution time is 48 hours.',
    timeAgo: '1 hour ago',
    upvotes: 45,
    hasUpvoted: false,
    replies: [
      {
        id: 'c1r1',
        author: { name: 'Rajesh Kumar', avatar: 'RK', role: 'citizen' },
        content: 'Thank you for the quick response! Looking forward to the resolution.',
        timeAgo: '50 minutes ago',
        upvotes: 12,
        hasUpvoted: false
      }
    ]
  },
  {
    id: 'c2',
    author: { name: 'Sneha Reddy', avatar: 'SR', role: 'citizen' },
    content: 'I also faced the same issue yesterday. My car tire got damaged. This needs urgent attention!',
    timeAgo: '30 minutes ago',
    upvotes: 23,
    hasUpvoted: false
  },
  {
    id: 'c3',
    author: { name: 'Community Moderator', avatar: 'CM', role: 'moderator' },
    content: 'This issue has been verified and marked as high priority. We are tracking it closely.',
    timeAgo: '15 minutes ago',
    upvotes: 18,
    hasUpvoted: false
  }
];

export default function IssuePage() {
  const params = useParams();
  const [issue, setIssue] = useState<Issue>(sampleIssue);
  const [comments, setComments] = useState<Comment[]>(sampleComments);
  const [newComment, setNewComment] = useState('');
  const [replyTo, setReplyTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  const handleUpvote = () => {
    setIssue({
      ...issue,
      upvotes: issue.hasUpvoted ? issue.upvotes - 1 : issue.upvotes + 1,
      hasUpvoted: !issue.hasUpvoted,
      hasDownvoted: false,
      downvotes: issue.hasDownvoted ? issue.downvotes - 1 : issue.downvotes
    });
  };

  const handleDownvote = () => {
    setIssue({
      ...issue,
      downvotes: issue.hasDownvoted ? issue.downvotes - 1 : issue.downvotes + 1,
      hasDownvoted: !issue.hasDownvoted,
      hasUpvoted: false,
      upvotes: issue.hasUpvoted ? issue.upvotes - 1 : issue.upvotes
    });
  };

  const handleCommentUpvote = (commentId: string) => {
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        return {
          ...comment,
          upvotes: comment.hasUpvoted ? comment.upvotes - 1 : comment.upvotes + 1,
          hasUpvoted: !comment.hasUpvoted
        };
      }
      return comment;
    }));
  };

  const handleSubmitComment = () => {
    if (!newComment.trim()) return;
    
    const comment: Comment = {
      id: `c${comments.length + 1}`,
      author: { name: 'Current User', avatar: 'CU', role: 'citizen' },
      content: newComment,
      timeAgo: 'Just now',
      upvotes: 0,
      hasUpvoted: false,
      replies: []
    };
    
    setComments([...comments, comment]);
    setNewComment('');
  };

  const handleSubmitReply = (commentId: string) => {
    if (!replyText.trim()) return;
    
    setComments(comments.map(comment => {
      if (comment.id === commentId) {
        const reply: Comment = {
          id: `${commentId}r${(comment.replies?.length || 0) + 1}`,
          author: { name: 'Current User', avatar: 'CU', role: 'citizen' },
          content: replyText,
          timeAgo: 'Just now',
          upvotes: 0,
          hasUpvoted: false
        };
        return {
          ...comment,
          replies: [...(comment.replies || []), reply]
        };
      }
      return comment;
    }));
    
    setReplyText('');
    setReplyTo(null);
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
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'resolved':
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return null;
    }
  };

  const getRoleBadge = (role?: string) => {
    switch (role) {
      case 'official':
        return <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">Official</span>;
      case 'moderator':
        return <span className="ml-2 px-2 py-0.5 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full">Moderator</span>;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-violet-50 pt-16">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015] pointer-events-none">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgb(0 0 0) 1px, transparent 0)`,
            backgroundSize: '48px 48px'
          }}></div>
        </div>
        
        <div className="relative max-w-5xl mx-auto px-4 py-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <Link href="/feed" className="text-sm text-zinc-600 hover:text-red-600 transition-colors">
              ← Back to Feed
            </Link>
          </div>

          {/* Issue Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-2xl border border-zinc-200 shadow-lg overflow-hidden mb-6"
          >
            {/* Header */}
            <div className="px-8 pt-6 pb-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-linear-to-br from-red-500 to-red-600 flex items-center justify-center text-white font-semibold shadow-sm">
                    {issue.author.avatar}
                  </div>
                  <div>
                    <p className="font-semibold text-zinc-900">{issue.author.name}</p>
                    <div className="flex items-center gap-2 text-xs text-zinc-500">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{issue.timeAgo}</span>
                    </div>
                  </div>
                </div>
                <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${getStatusColor(issue.status)}`}>
                  {getStatusIcon(issue.status)}
                  {issue.status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-zinc-900 mb-3">{issue.title}</h1>
              <p className="text-zinc-700 leading-relaxed mb-4">{issue.description}</p>

              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1.5 text-sm text-zinc-600">
                  <MapPin className="w-4 h-4" />
                  <span>{issue.location}</span>
                </div>
                <span className="px-3 py-1 bg-zinc-100 text-zinc-700 rounded-lg text-xs font-medium">
                  {issue.category}
                </span>
              </div>

              {/* Images */}
              {issue.images.length > 0 && (
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {issue.images.map((img, idx) => (
                    <div key={idx} className="relative w-full aspect-video bg-zinc-100 rounded-xl overflow-hidden">
                      <div className="absolute inset-0 flex items-center justify-center text-zinc-400">
                        Image Placeholder
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Interaction Bar */}
            <div className="px-8 py-4 border-t border-zinc-200 bg-zinc-50/50">
              <div className="flex items-center gap-3">
                {/* Upvote */}
                <button
                  onClick={handleUpvote}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    issue.hasUpvoted
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : 'hover:bg-zinc-100 text-zinc-600 border border-transparent'
                  }`}
                >
                  <ArrowBigUp className={`w-5 h-5 ${issue.hasUpvoted ? 'fill-red-600' : ''}`} />
                  <span className="font-semibold">{issue.upvotes}</span>
                </button>

                {/* Downvote */}
                <button
                  onClick={handleDownvote}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                    issue.hasDownvoted
                      ? 'bg-zinc-700 text-white border border-zinc-800'
                      : 'hover:bg-zinc-100 text-zinc-600 border border-transparent'
                  }`}
                >
                  <ArrowBigDown className={`w-5 h-5 ${issue.hasDownvoted ? 'fill-white' : ''}`} />
                  <span className="font-semibold">{issue.downvotes}</span>
                </button>

                {/* Comment Count */}
                <div className="flex items-center gap-2 px-4 py-2 text-zinc-600">
                  <MessageCircle className="w-5 h-5" />
                  <span className="font-semibold">{comments.length} Comments</span>
                </div>

                {/* Share */}
                <button className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-zinc-100 text-zinc-600 transition-all">
                  <Share2 className="w-5 h-5" />
                  <span className="font-semibold">Share</span>
                </button>

                {/* View on Map */}
                <Link
                  href={`/map?lat=${issue.coordinates.lat}&lng=${issue.coordinates.lng}`}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl hover:bg-zinc-100 text-zinc-600 transition-all"
                >
                  <MapPin className="w-5 h-5" />
                  <span className="font-semibold">Map</span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Comments Section */}
          <div className="bg-white rounded-2xl border border-zinc-200 shadow-lg p-8">
            <h2 className="text-xl font-bold text-zinc-900 mb-6">
              Comments ({comments.length})
            </h2>

            {/* Add Comment */}
            <div className="mb-8">
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-linear-to-br from-zinc-400 to-zinc-500 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                  CU
                </div>
                <div className="flex-1">
                  <textarea
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Share your thoughts or provide updates..."
                    rows={3}
                    className="w-full px-4 py-3 border border-zinc-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                  />
                  <div className="flex items-center justify-between mt-3">
                    <button className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors">
                      <ImageIcon className="w-4 h-4" />
                      Add Image
                    </button>
                    <button
                      onClick={handleSubmitComment}
                      disabled={!newComment.trim()}
                      className="flex items-center gap-2 px-5 py-2.5 bg-red-600 hover:bg-red-700 disabled:bg-zinc-300 disabled:cursor-not-allowed text-white rounded-xl font-semibold transition-all shadow-md"
                    >
                      <Send className="w-4 h-4" />
                      Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Comments List */}
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="border-b border-zinc-100 last:border-0 pb-6 last:pb-0">
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-linear-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white font-semibold text-sm shrink-0">
                      {comment.author.avatar}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-zinc-900">{comment.author.name}</span>
                        {getRoleBadge(comment.author.role)}
                        <span className="text-xs text-zinc-500">• {comment.timeAgo}</span>
                      </div>
                      <p className="text-zinc-700 mb-3 leading-relaxed">{comment.content}</p>
                      
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleCommentUpvote(comment.id)}
                          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-all ${
                            comment.hasUpvoted
                              ? 'bg-red-50 text-red-600'
                              : 'hover:bg-zinc-100 text-zinc-600'
                          }`}
                        >
                          <ArrowBigUp className={`w-4 h-4 ${comment.hasUpvoted ? 'fill-red-600' : ''}`} />
                          <span className="font-semibold">{comment.upvotes}</span>
                        </button>
                        <button
                          onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                          className="px-3 py-1.5 text-sm text-zinc-600 hover:bg-zinc-100 rounded-lg transition-colors font-medium"
                        >
                          Reply
                        </button>
                      </div>

                      {/* Reply Box */}
                      {replyTo === comment.id && (
                        <div className="mt-4 pl-4 border-l-2 border-zinc-200">
                          <div className="flex gap-2">
                            <textarea
                              value={replyText}
                              onChange={(e) => setReplyText(e.target.value)}
                              placeholder="Write a reply..."
                              rows={2}
                              className="flex-1 px-3 py-2 border border-zinc-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent resize-none"
                            />
                            <button
                              onClick={() => handleSubmitReply(comment.id)}
                              disabled={!replyText.trim()}
                              className="px-4 py-2 bg-red-600 hover:bg-red-700 disabled:bg-zinc-300 text-white rounded-lg text-sm font-semibold transition-all"
                            >
                              <Send className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Replies */}
                      {comment.replies && comment.replies.length > 0 && (
                        <div className="mt-4 pl-4 border-l-2 border-zinc-200 space-y-4">
                          {comment.replies.map((reply) => (
                            <div key={reply.id} className="flex gap-3">
                              <div className="w-8 h-8 rounded-full bg-linear-to-br from-zinc-400 to-zinc-500 flex items-center justify-center text-white font-semibold text-xs shrink-0">
                                {reply.author.avatar}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="font-semibold text-sm text-zinc-900">{reply.author.name}</span>
                                  {getRoleBadge(reply.author.role)}
                                  <span className="text-xs text-zinc-500">• {reply.timeAgo}</span>
                                </div>
                                <p className="text-sm text-zinc-700">{reply.content}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
