"use client";
import React from 'react';

type Series = { label: string; value: number; color?: string }[];

export default function AnalyticsChart({ series, height = 120 }: { series: Series; height?: number }) {
  const max = Math.max(...series.map(s => s.value), 1);

  return (
    <div className="w-full bg-white/60 rounded-lg p-3 border border-slate-200">
      <div className="flex items-end gap-3 h-32">
        {series.map((s, i) => (
          <div key={i} className="flex-1 text-center">
            <div
              style={{ height: `${(s.value / max) * 100}%` }}
              className={`mx-auto w-8 rounded-t-md transition-all duration-300`}>
              <div style={{ height: '100%', background: s.color || '#00C853' }} className="rounded-t-md" />
            </div>
            <div className="text-xs mt-2 text-slate-700">{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
