"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import type { DateLocation } from "@/data/dates";
import { sfx } from "@/lib/audio";

export function PerfectDateModal({ open, location, onClose, onSnap }: { open: boolean; location: DateLocation; onClose: () => void; onSnap: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-twilight-950/75 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Perfect date"
        >
          <Letter location={location} onClose={onClose} onSnap={onSnap} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Letter({ location, onClose, onSnap }: { location: DateLocation; onClose: () => void; onSnap: () => void }) {
  const [opened, setOpened] = useState(false);
  return (
    <motion.div
      className="flex w-full max-w-sm flex-col items-center text-center"
      initial={{ scale: 0.6, y: 40 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 180, damping: 14 }}
    >
      <motion.h2
        className="font-display text-5xl font-bold italic text-shimmer"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 1.6, repeat: Infinity }}
      >
        Perfect Date!
      </motion.h2>
      <p className="mt-1 text-blush-100">Love meter maxed out at the {location.name} 💖</p>

      {!opened ? (
        <motion.button
          onClick={() => {
            sfx.chime();
            setOpened(true);
          }}
          className="relative mt-6 h-40 w-60"
          whileHover={{ rotate: -2, scale: 1.03 }}
          animate={{ y: [0, -6, 0] }}
          transition={{ y: { duration: 2, repeat: Infinity } }}
          aria-label="Open Engineer's note"
        >
          <svg viewBox="0 0 240 160" className="h-full w-full drop-shadow-2xl">
            <rect x="4" y="20" width="232" height="136" rx="10" fill="#fff5f7" />
            <path d="M4 30 L120 104 L236 30" fill="#ffe4ea" stroke="#f0517f" strokeWidth="2" />
            <path d="M4 156 L96 86 M236 156 L144 86" stroke="#f9c5d3" strokeWidth="2" />
            <circle cx="120" cy="100" r="18" fill="#d63368" />
            <path d="M120 108 C112 100 110 94 115 91 C118 89 120 92 120 94 C120 92 122 89 125 91 C130 94 128 100 120 108 Z" fill="#fff" />
          </svg>
          <span className="absolute -bottom-6 left-0 right-0 font-script text-xl text-gold-200">tap to open 💌</span>
        </motion.button>
      ) : (
        <motion.div
          initial={{ rotateX: 90, opacity: 0 }}
          animate={{ rotateX: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mt-6 w-full rounded-lg bg-[#fffaf2] p-5 text-left text-twilight-800 shadow-2xl [background-image:repeating-linear-gradient(transparent_0_27px,#f6d6de_27px_28px)]"
        >
          <p className="text-xs font-semibold uppercase tracking-wider text-blush-600">{location.perfectNote.title}</p>
          <p className="mt-2 font-script text-2xl leading-7">{location.perfectNote.body}</p>
        </motion.div>
      )}

      <div className="mt-10 flex w-full gap-2">
        <button onClick={onSnap} className="flex-1 rounded-full bg-gradient-to-r from-blush-500 to-gold-400 py-3 font-semibold shadow-lg">
          📸 Capture this moment
        </button>
        <button onClick={onClose} className="rounded-full glass px-5 py-3 font-medium">
          Aww 🥹
        </button>
      </div>
    </motion.div>
  );
}
