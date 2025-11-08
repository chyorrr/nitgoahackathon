'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  MapPin,
  BarChart3,
  PieChart,
  Download,
  Calendar,
  Activity
} from 'lucide-react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

interface WardData {
  name: string;
  totalIssues: number;
  resolved: number;
  pending: number;
  avgResolutionTime: number;
  efficiency: number;
}

interface CategoryData {
  category: string;
  count: number;
  percentage: number;
}

const wardData: WardData[] = [
  { name: 'Ward 1 - Central', totalIssues: 234, resolved: 198, pending: 36, avgResolutionTime: 3.2, efficiency: 84.6 },
  { name: 'Ward 2 - North', totalIssues: 189, resolved: 145, pending: 44, avgResolutionTime: 4.5, efficiency: 76.7 },
  { name: 'Ward 3 - South', totalIssues: 301, resolved: 267, pending: 34, avgResolutionTime: 2.8, efficiency: 88.7 },
  { name: 'Ward 4 - East', totalIssues: 156, resolved: 132, pending: 24, avgResolutionTime: 3.6, efficiency: 84.6 },
  { name: 'Ward 5 - West', totalIssues: 278, resolved: 241, pending: 37, avgResolutionTime: 3.1, efficiency: 86.7 },
];

const categoryData: CategoryData[] = [
  { category: 'Potholes', count: 423, percentage: 36.2 },
  { category: 'Street Lights', count: 298, percentage: 25.5 },
  { category: 'Garbage', count: 187, percentage: 16.0 },
  { category: 'Water Supply', count: 156, percentage: 13.3 },
  { category: 'Others', count: 104, percentage: 9.0 },
];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');

  const stats = {
    totalIssues: 1158,
    resolved: 983,
    inProgress: 128,
    pending: 47,
    avgResolutionTime: 3.4,
    responseRate: 95.2,
    citizenSatisfaction: 4.3
  };

  const resolutionRate = ((stats.resolved / stats.totalIssues) * 100).toFixed(1);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Impact Reports & Analytics</h1>
            <p className="text-zinc-700">
              Transparency dashboard showing civic engagement metrics and municipality performance
            </p>
          </div>

          {/* Timeframe Selector */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-xl border border-purple-200 p-1 shadow-sm">
              {(['week', 'month', 'year'] as const).map((period) => (
                <button
                  key={period}
                  onClick={() => setTimeframe(period)}
                  className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                    timeframe === period
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-md'
                      : 'text-zinc-600 hover:bg-purple-50'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-2 px-4 py-2.5 bg-white/80 backdrop-blur-sm border border-purple-200 rounded-xl hover:bg-white hover:border-purple-300 text-purple-700 font-semibold transition-all shadow-sm">
              <Download className="w-4 h-4" />
              Export Report
            </button>
          </div>

          {/* Overview Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl flex items-center justify-center shadow-sm">
                  <BarChart3 className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  +12.5%
                </span>
              </div>
              <p className="text-sm text-zinc-600 mb-1">Total Issues</p>
              <p className="text-3xl font-bold text-zinc-900">{stats.totalIssues}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-green-100 rounded-xl flex items-center justify-center shadow-sm">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  {resolutionRate}%
                </span>
              </div>
              <p className="text-sm text-zinc-600 mb-1">Resolved</p>
              <p className="text-3xl font-bold text-zinc-900">{stats.resolved}</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-amber-100 to-orange-100 rounded-xl flex items-center justify-center shadow-sm">
                  <Clock className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  -0.3 days
                </span>
              </div>
              <p className="text-sm text-zinc-600 mb-1">Avg Resolution Time</p>
              <p className="text-3xl font-bold text-zinc-900">{stats.avgResolutionTime}<span className="text-lg text-zinc-500">d</span></p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-white/80 backdrop-blur-sm rounded-xl border border-purple-100 p-6 shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center shadow-sm">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  +2.1%
                </span>
              </div>
              <p className="text-sm text-zinc-600 mb-1">Response Rate</p>
              <p className="text-3xl font-bold text-zinc-900">{stats.responseRate}<span className="text-lg text-zinc-500">%</span></p>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Category Distribution */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Issues by Category</h2>
                <PieChart className="w-5 h-5 text-purple-400" />
              </div>
              
              <div className="space-y-4">
                {categoryData.map((item, index) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-semibold text-zinc-700">{item.category}</span>
                      <span className="text-sm font-bold text-zinc-900">{item.count}</span>
                    </div>
                    <div className="relative w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        transition={{ delay: index * 0.1, duration: 0.5 }}
                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 rounded-full shadow-sm"
                      />
                    </div>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-zinc-500">{item.percentage}% of total</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Indicators */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-8 shadow-md hover:shadow-lg transition-shadow">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Performance Metrics</h2>
                <Activity className="w-5 h-5 text-purple-400" />
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-zinc-700">Citizen Satisfaction</span>
                    <span className="text-sm font-bold text-emerald-600">{stats.citizenSatisfaction}/5.0</span>
                  </div>
                  <div className="relative w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${(stats.citizenSatisfaction / 5) * 100}%` }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-emerald-500 to-green-500 rounded-full shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-zinc-700">Response Efficiency</span>
                    <span className="text-sm font-bold text-blue-600">{stats.responseRate}%</span>
                  </div>
                  <div className="relative w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${stats.responseRate}%` }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full shadow-sm"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-zinc-700">Issue Resolution</span>
                    <span className="text-sm font-bold text-purple-600">{resolutionRate}%</span>
                  </div>
                  <div className="relative w-full h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                      style={{ width: `${resolutionRate}%` }}
                      className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full shadow-sm"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl border border-blue-100">
                      <p className="text-2xl font-bold text-blue-600">{stats.inProgress}</p>
                      <p className="text-xs text-zinc-600 mt-1">In Progress</p>
                    </div>
                    <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-yellow-50 rounded-xl border border-amber-100">
                      <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
                      <p className="text-xs text-zinc-600 mt-1">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Ward-wise Performance */}
          <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-purple-100 p-8 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">Ward-wise Performance</h2>
              <MapPin className="w-5 h-5 text-purple-400" />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-zinc-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-zinc-700">Ward</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Total Issues</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Resolved</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Pending</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Avg Time (days)</th>
                    <th className="text-center py-3 px-4 text-sm font-semibold text-zinc-700">Efficiency</th>
                  </tr>
                </thead>
                <tbody>
                  {wardData.map((ward, index) => (
                    <motion.tr
                      key={ward.name}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="border-b border-zinc-100 hover:bg-gradient-to-r hover:from-purple-50/50 hover:to-pink-50/50 transition-all"
                    >
                      <td className="py-4 px-4">
                        <span className="font-semibold text-zinc-900">{ward.name}</span>
                      </td>
                      <td className="text-center py-4 px-4 text-zinc-700">{ward.totalIssues}</td>
                      <td className="text-center py-4 px-4">
                        <span className="px-2.5 py-1 bg-green-100 text-green-700 rounded-full text-sm font-semibold">
                          {ward.resolved}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4">
                        <span className="px-2.5 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                          {ward.pending}
                        </span>
                      </td>
                      <td className="text-center py-4 px-4 text-zinc-700 font-medium">{ward.avgResolutionTime}</td>
                      <td className="text-center py-4 px-4">
                        <div className="flex items-center justify-center gap-2">
                          <div className="w-20 h-2 bg-zinc-100 rounded-full overflow-hidden">
                            <div
                              style={{ width: `${ward.efficiency}%` }}
                              className={`h-full rounded-full ${
                                ward.efficiency >= 85
                                  ? 'bg-green-500'
                                  : ward.efficiency >= 75
                                  ? 'bg-yellow-500'
                                  : 'bg-red-500'
                              }`}
                            />
                          </div>
                          <span className="text-sm font-bold text-zinc-900">{ward.efficiency}%</span>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Public Data Note */}
          <div className="mt-8 bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 border border-purple-200 rounded-xl p-6 shadow-sm">
            <div className="flex items-start gap-3">
              <Activity className="w-5 h-5 text-purple-600 mt-0.5 shrink-0" />
              <div>
                <h3 className="font-semibold text-purple-900 mb-1">Transparent & Public Data</h3>
                <p className="text-sm text-purple-800 leading-relaxed">
                  All data shown here is anonymized and publicly accessible. This transparency helps build trust,
                  enables policy insights, and encourages citizen engagement. The municipality is committed to
                  data-driven governance and accountability.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
