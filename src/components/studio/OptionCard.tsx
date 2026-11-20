"use client";

import { Check } from "lucide-react";
import type { ReactNode } from "react";

export function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="mb-5">
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-xs font-semibold uppercase tracking-[0.14em] text-blush-200/80">{title}</h3>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function OptionCard({
  selected,
  onClick,
  label,
  children,
  badge,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  children: ReactNode;
  badge?: ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      aria-label={label}
      className={`group relative flex flex-col items-center overflow-hidden rounded-2xl border p-1.5 pb-2 text-center transition active:scale-95 ${
        selected
          ? "border-blush-300 bg-gradient-to-b from-blush-400/30 to-blush-500/10 shadow-[0_0_0_2px_rgba(251,122,156,0.5),0_8px_20px_-8px_rgba(240,81,127,0.8)]"
          : "border-white/10 bg-white/[0.06] hover:border-white/25 hover:bg-white/10"
      }`}
    >
      <div className="w-full overflow-hidden rounded-xl bg-gradient-to-b from-white/10 to-transparent">{children}</div>
      <span className="mt-1 line-clamp-2 text-[11px] font-medium leading-tight text-blush-50">{label}</span>
      {badge}
      {selected && (
        <span className="absolute right-1.5 top-1.5 grid h-5 w-5 place-items-center rounded-full bg-blush-500 text-white shadow">
          <Check size={12} strokeWidth={3} />
        </span>
      )}
    </button>
  );
}

export function Swatch({
  selected,
  onClick,
  label,
  background,
  size = "md",
  children,
}: {
  selected: boolean;
  onClick: () => void;
  label: string;
  background: string;
  size?: "md" | "lg";
  children?: ReactNode;
}) {
  return (
    <button onClick={onClick} aria-pressed={selected} title={label} className="flex flex-col items-center gap-1 active:scale-90 transition">
      <span
        className={`relative grid place-items-center rounded-full border-2 transition ${size === "lg" ? "h-12 w-12" : "h-10 w-10"} ${
          selected ? "border-white shadow-[0_0_0_3px_rgba(251,122,156,0.9)] scale-110" : "border-white/30"
        }`}
        style={{ background }}
      >
        {children}
      </span>
      <span className="max-w-[64px] truncate text-[10px] text-blush-100/90">{label}</span>
    </button>
  );
}

export function Chip({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: ReactNode }) {
  return (
    <button
      onClick={onClick}
      aria-pressed={selected}
      className={`shrink-0 rounded-full px-3.5 py-2 text-sm font-medium transition active:scale-95 ${
        selected ? "bg-blush-500 text-white shadow-[0_4px_14px_-4px_rgba(240,81,127,0.9)]" : "bg-white/10 text-blush-100 hover:bg-white/15"
      }`}
    >
      {children}
    </button>
  );
}

export function Toggle({ on, onChange, label, emoji }: { on: boolean; onChange: (v: boolean) => void; label: string; emoji: string }) {
  return (
    <button
      onClick={() => onChange(!on)}
      role="switch"
      aria-checked={on}
      className={`flex w-full items-center justify-between rounded-2xl border px-4 py-3 transition active:scale-[0.98] ${
        on ? "border-blush-300 bg-blush-400/20" : "border-white/10 bg-white/[0.06]"
      }`}
    >
      <span className="flex items-center gap-2 text-sm font-medium">
        <span className="text-lg">{emoji}</span>
        {label}
      </span>
      <span className={`relative h-6 w-11 rounded-full transition ${on ? "bg-blush-500" : "bg-white/20"}`}>
        <span className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${on ? "left-[22px]" : "left-0.5"}`} />
      </span>
    </button>
  );
}
