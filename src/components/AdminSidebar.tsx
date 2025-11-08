"use client";
import Link from 'next/link';

export default function AdminSidebar({ active = 'dashboard' }: { active?: string }) {
  return (
    <aside className="w-60 bg-white/60 backdrop-blur-sm rounded-lg p-4 border border-slate-200 text-slate-900">
      <h3 className="text-lg font-semibold mb-4 text-slate-900">Admin</h3>
      <nav className="flex flex-col gap-2">
        <Link href="/admin/dashboard" className={`px-3 py-2 rounded hover:bg-slate-100 ${active === 'dashboard' ? 'bg-slate-100 font-semibold' : ''}`}>
          Dashboard
        </Link>
        <Link href="#" className="px-3 py-2 rounded hover:bg-slate-100">Issues</Link>
        <Link href="#" className="px-3 py-2 rounded hover:bg-slate-100">Users</Link>
        <Link href="#" className="px-3 py-2 rounded hover:bg-slate-100">Settings</Link>
      </nav>
    </aside>
  );
}
