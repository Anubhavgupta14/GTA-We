"use client";

import { BookHeart, Download, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { downloadDataUrl } from "@/lib/polaroid";

export interface PolaroidShot {
  png: string;
  filename: string;
}

export function PolaroidModal({ shot, onClose, onAlbum }: { shot: PolaroidShot | null; onClose: () => void; onAlbum: () => void }) {
  return (
    <AnimatePresence>
      {shot && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-twilight-950/80 p-4 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, pointerEvents: "none", transition: { duration: 0.2 } }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Your polaroid"
        >
          <motion.div
            onClick={(e) => e.stopPropagation()}
            initial={{ y: 120, rotate: -14, scale: 0.6, opacity: 0 }}
            animate={{ y: 0, rotate: -3, scale: 1, opacity: 1 }}
            exit={{ y: 60, opacity: 0, transition: { duration: 0.2 } }}
            transition={{ type: "spring", stiffness: 160, damping: 16 }}
            className="flex w-full max-w-sm flex-col items-center gap-4"
          >
            <motion.img
              src={shot.png}
              alt="Polaroid of your date"
              className="w-full rounded-sm shadow-[0_30px_60px_-10px_rgba(0,0,0,0.7)]"
              initial={{ filter: "brightness(3) saturate(0)" }}
              animate={{ filter: "brightness(1) saturate(1)" }}
              transition={{ duration: 2.2, ease: "easeOut" }}
            />
            <p className="font-script text-2xl text-gold-200">Saved to your Memory Album ✓</p>
            <div className="flex w-full gap-2">
              <button
                onClick={() => downloadDataUrl(shot.png, shot.filename)}
                className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blush-500 to-gold-400 py-3 font-semibold shadow-lg"
              >
                <Download size={18} /> Download PNG
              </button>
              <button onClick={onAlbum} aria-label="Open album" className="grid h-12 w-12 place-items-center rounded-full glass">
                <BookHeart size={18} />
              </button>
              <button onClick={onClose} aria-label="Close" className="grid h-12 w-12 place-items-center rounded-full glass">
                <X size={18} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
