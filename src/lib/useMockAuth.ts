"use client";
import { useState, useEffect } from "react";

export type UserRole = 'admin' | 'moderator' | 'user' | 'guest';

// Simple mock hook for demo. In real app, replace with real auth (JWT/session).
export function useMockAuth() {
  const [role, setRole] = useState<UserRole | null>(null);

  useEffect(() => {
    // Try read from localStorage for quick demo switching
    const stored = typeof window !== 'undefined' ? window.localStorage.getItem('mock_role') : null;
    if (stored === 'admin' || stored === 'moderator' || stored === 'user' || stored === 'guest') {
      setRole(stored as UserRole);
    } else {
      // default for local dev: admin
      setRole('admin');
    }
  }, []);

  const setMockRole = (r: UserRole) => {
    setRole(r);
    if (typeof window !== 'undefined') window.localStorage.setItem('mock_role', r);
  };

  return { role, setMockRole };
}
