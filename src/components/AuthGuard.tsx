'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check auth state immediately on mount
    const checkAuth = () => {
      try {
        const authState = localStorage.getItem('isLoggedIn');
        setIsAuthenticated(authState === 'true');
      } catch (error) {
        console.error('Error checking auth state:', error);
        setIsAuthenticated(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkAuth();
  }, []);

  // Show loading state while checking authentication
  if (isChecking || isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-50 via-indigo-50 to-purple-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-zinc-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Not authenticated - show login prompt
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-violet-50 via-indigo-50 to-purple-50 pt-16">
        <div className="max-w-md w-full mx-4">
          <div className="bg-white rounded-2xl shadow-xl border border-violet-200 p-8 text-center">
            <div className="w-16 h-16 bg-linear-to-br from-violet-100 to-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-8 h-8 text-violet-600" />
            </div>
            <h2 className="text-2xl font-bold text-zinc-900 mb-3">Authentication Required</h2>
            <p className="text-zinc-600 mb-6">
              You need to be logged in to access this page. Please sign in or create an account to continue.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => router.push('/login')}
                className="flex-1 px-6 py-3 bg-linear-to-r from-violet-600 to-purple-600 text-white font-semibold rounded-xl hover:from-violet-700 hover:to-purple-700 transition-all duration-300 shadow-md hover:shadow-lg"
              >
                Sign In
              </button>
              <button
                onClick={() => router.push('/signup')}
                className="flex-1 px-6 py-3 bg-white border-2 border-violet-200 text-violet-700 font-semibold rounded-xl hover:bg-violet-50 transition-all duration-300"
              >
                Sign Up
              </button>
            </div>
            <button
              onClick={() => router.push('/')}
              className="mt-4 text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
            >
              ← Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Authenticated - render children
  return <>{children}</>;
}
