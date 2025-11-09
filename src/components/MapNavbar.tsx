'use client';

import { AlertCircle, Flag } from 'lucide-react';
import Link from 'next/link';
import UserProfileButton from './UserProfileButton';

interface MapNavbarProps {
  onReportIssue: () => void;
}

export default function MapNavbar({ onReportIssue }: MapNavbarProps) {

  return (
    <nav className="fixed top-0 inset-x-0 z-50 bg-white/90 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="h-16 flex items-center justify-between">
          <div>
            <Link href="/" className="text-slate-700 hover:text-slate-900 text-sm font-medium px-2 py-1">
              Home
            </Link>
          </div>

          <div className="absolute left-1/2 -translate-x-1/2">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-md border border-slate-300 bg-white flex items-center justify-center">
                <Flag className="w-5 h-5 text-slate-600" />
              </div>
              <span className="text-xl font-semibold text-slate-800">CityVoice</span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button onClick={onReportIssue} className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded-md">
              <AlertCircle className="w-4 h-4" />
              Report an Issue
            </button>

            <UserProfileButton onReportIssue={onReportIssue} />
          </div>
        </div>
      </div>
    </nav>
  );
}
