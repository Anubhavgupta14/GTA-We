"use client";

import type { ReactNode } from "react";

export function ActivityButton({
  onClick,
  emoji,
  label,
  active = false,
  disabled = false,
  sub,
}: {
  onClick: () => void;
  emoji: ReactNode;
  label: string;
  active?: boolean;
  disabled?: boolean;
  sub?: string;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-pressed={active}
      className={`flex shrink-0 items-center gap-2 rounded-2xl border px-3 py-2 text-left text-sm transition active:scale-95 disabled:opacity-40 ${
        active ? "border-gold-300 bg-gold-300/20 text-white" : "border-white/10 bg-white/[0.08] text-blush-50 hover:bg-white/15"
      }`}
    >
      <span className="text-xl leading-none">{emoji}</span>
      <span className="leading-tight">
        <span className="block font-medium">{label}</span>
        {sub && <span className="block text-[10px] text-blush-200/70">{sub}</span>}
      </span>
    </button>
  );
}

export function ActivityRow({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <p className="mb-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-blush-200/70">{title}</p>
      <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">{children}</div>
    </div>
  );
}
