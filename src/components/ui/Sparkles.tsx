"use client";

import { motion } from "motion/react";

/** Deterministic pseudo-random so SSR/CSR markup matches and renders stay pure. */
export function seeded(i: number, salt = 1) {
  const x = Math.sin(i * 12.9898 + salt * 78.233) * 43758.5453;
  // 3 decimals keeps SSR markup identical to what the browser re-serializes.
  return Math.round((x - Math.floor(x)) * 1000) / 1000;
}

export function Sparkles({ count = 28, className = "" }: { count?: number; className?: string }) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {Array.from({ length: count }, (_, i) => {
        const size = Math.round(4 + seeded(i, 3) * 10);
        const star = i % 3 !== 0;
        return (
          <span
            key={i}
            className="absolute animate-twinkle"
            style={{
              left: `${(seeded(i, 1) * 100).toFixed(1)}%`,
              top: `${(seeded(i, 2) * 100).toFixed(1)}%`,
              width: size,
              height: size,
              animationDelay: `${(seeded(i, 4) * 3).toFixed(2)}s`,
              animationDuration: `${(2 + seeded(i, 5) * 3).toFixed(2)}s`,
            }}
          >
            {star ? (
              <svg viewBox="0 0 10 10" className="h-full w-full">
                <path d="M5 0 L6.1 3.9 L10 5 L6.1 6.1 L5 10 L3.9 6.1 L0 5 L3.9 3.9 Z" fill={i % 2 ? "#fde9b8" : "#ffe4ea"} />
              </svg>
            ) : (
              <span className="block h-full w-full rounded-full bg-white/70 blur-[1px]" />
            )}
          </span>
        );
      })}
    </div>
  );
}

export function FloatingHeartsBg({ count = 10 }: { count?: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {Array.from({ length: count }, (_, i) => (
        <motion.span
          key={i}
          className="absolute bottom-[-10%] text-blush-300/60"
          style={{ left: `${seeded(i, 7) * 100}%`, fontSize: 12 + seeded(i, 8) * 18 }}
          animate={{ y: ["0vh", "-115vh"], x: [0, (seeded(i, 9) - 0.5) * 80], opacity: [0, 0.9, 0] }}
          transition={{ duration: 10 + seeded(i, 10) * 8, repeat: Infinity, delay: seeded(i, 11) * 10, ease: "linear" }}
        >
          ♥
        </motion.span>
      ))}
    </div>
  );
}
