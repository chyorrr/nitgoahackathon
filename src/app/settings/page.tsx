'use client';

import Navbar from '@/components/Navbar';
import LocationSettings from '@/components/LocationSettings';
import AuthGuard from '@/components/AuthGuard';
import { User, Bell, Shield, Settings as SettingsIcon } from 'lucide-react';

export default function SettingsPage() {
  return (
    <AuthGuard>
      <Navbar />
      <div className="min-h-screen bg-slate-50 pt-16">
        <div className="max-w-4xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-900 mb-2">Settings</h1>
            <p className="text-slate-600">Manage your account preferences and privacy settings</p>
          </div>

          {/* Settings Grid */}
          <div className="grid gap-6">
            {/* Location Settings */}
            <LocationSettings />

            {/* Other Settings Placeholders */}
            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <User className="w-5 h-5 text-blue-600" />
                    Account Settings
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Update your profile information and preferences
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
                Edit Profile
              </button>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-blue-600" />
                    Notifications
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Choose what updates you want to receive
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
                Manage Notifications
              </button>
            </div>

            <div className="bg-white rounded-lg border border-slate-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 flex items-center gap-2">
                    <Shield className="w-5 h-5 text-blue-600" />
                    Privacy & Security
                  </h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Control your data and account security
                  </p>
                </div>
              </div>
              <button className="w-full px-4 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium transition-colors">
                Privacy Settings
              </button>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}
