"use client";

import { Heart } from "lucide-react";
import { motion } from "motion/react";

export function LoveMeter({ love }: { love: number }) {
  const full = love >= 100;
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2" role="meter" aria-label="Love meter" aria-valuenow={love} aria-valuemin={0} aria-valuemax={100}>
      <motion.span
        key={Math.floor(love / 5)}
        initial={{ scale: 1.5 }}
        animate={{ scale: [1.5, 1, 1.1, 1] }}
        transition={{ duration: 0.6 }}
        className="shrink-0"
      >
        <Heart className={full ? "fill-gold-300 text-gold-300 drop-shadow-[0_0_8px_rgba(251,217,130,0.9)]" : "fill-blush-500 text-blush-400"} size={22} />
      </motion.span>
      <div className={`relative h-3.5 flex-1 overflow-hidden rounded-full bg-black/40 ring-1 ${full ? "ring-gold-300" : "ring-white/20"}`}>
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${full ? "bg-gradient-to-r from-gold-300 via-blush-300 to-gold-300" : "bg-gradient-to-r from-blush-400 via-blush-500 to-rose-500"}`}
          initial={false}
          animate={{ width: `${love}%` }}
          transition={{ type: "spring", stiffness: 90, damping: 18 }}
        />
        <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0_9.6%,rgba(0,0,0,0.25)_9.6%_10%)]" />
        <div className="absolute inset-x-0 top-0 h-1/2 rounded-full bg-white/20" />
      </div>
      <span className="w-11 shrink-0 text-right text-sm font-semibold tabular-nums text-blush-100">{Math.round(love)}%</span>
    </div>
  );
}
