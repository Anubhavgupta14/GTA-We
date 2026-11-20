"use client";

import { Camera, Heart, Sparkles as SparklesIcon } from "lucide-react";
import { motion } from "motion/react";
import { EngineerAvatar } from "@/components/character/EngineerAvatar";
import { FemaleAvatar } from "@/components/character/FemaleAvatar";
import { FloatingHeartsBg, Sparkles } from "@/components/ui/Sparkles";
import { sfx } from "@/lib/audio";
import { useGameStore } from "@/store/gameStore";

export function TitleScreen() {
  const look = useGameStore((s) => s.look);
  const setScreen = useGameStore((s) => s.setScreen);
  const memories = useGameStore((s) => s.polaroids.length);
  const notes = useGameStore((s) => s.unlockedNotes.length);

  return (
    <motion.section
      className="relative flex h-full flex-col items-center overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.04 }}
      transition={{ duration: 0.5 }}
    >
      <Sparkles count={36} />
      <FloatingHeartsBg />

      {/* moon */}
      <div aria-hidden className="absolute right-[8%] top-[4%] h-20 w-20 rounded-full bg-gradient-to-br from-gold-200 to-blush-200 opacity-80 shadow-[0_0_80px_30px_rgba(253,233,184,0.25)] sm:h-28 sm:w-28" />

      <div className="relative z-10 mt-2 px-4 text-center sm:mt-6">
        <motion.p
          className="font-script text-2xl text-gold-300 sm:text-3xl"
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          tonight&apos;s plan:
        </motion.p>
        <motion.h1
          className="font-display text-5xl font-bold italic leading-none text-shimmer sm:text-7xl"
          initial={{ y: 12, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.35, type: "spring" }}
        >
          Date Night
        </motion.h1>
        <motion.p
          className="mt-1 font-script text-3xl text-blush-200 sm:text-4xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          with Engineer <Heart className="inline -mt-1 fill-blush-400 text-blush-400" size={26} />
        </motion.p>
      </div>

      {/* couple preview */}
      <div className="relative z-10 flex min-h-0 w-full flex-1 items-end justify-center">
        <div aria-hidden className="absolute bottom-[4%] h-[18%] w-[min(80%,520px)] rounded-[50%] bg-blush-300/25 blur-2xl" />
        <div className="relative flex h-[96%] max-h-[520px] items-end">
          <motion.div
            className="h-full aspect-[240/520] -mr-[6%]"
            initial={{ x: -60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 80 }}
          >
            <FemaleAvatar look={look} className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]" expression="happy" />
          </motion.div>
          <motion.div
            className="absolute left-1/2 top-[2%] z-10 -translate-x-1/2 text-4xl"
            animate={{ scale: [1, 1.25, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          >
            💞
          </motion.div>
          <motion.div
            className="h-[104%] aspect-[240/520] -ml-[6%]"
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.55, type: "spring", stiffness: 80 }}
          >
            <EngineerAvatar pose="wave" className="h-full w-full drop-shadow-[0_10px_30px_rgba(0,0,0,0.35)]" />
          </motion.div>
        </div>
      </div>

      {/* actions */}
      <motion.div
        className="relative z-10 flex w-full max-w-sm flex-col gap-3 px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-3"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <button
          onClick={() => {
            sfx.sparkle();
            setScreen("studio");
          }}
          className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-blush-500 via-blush-400 to-gold-400 px-6 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_-5px_rgba(240,81,127,0.7)] transition active:scale-[0.97]"
        >
          <SparklesIcon size={20} className="transition group-hover:rotate-12" />
          Start Getting Ready
          <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent transition duration-700 group-hover:translate-x-full" />
        </button>
        <button
          onClick={() => {
            sfx.click();
            setScreen("album");
          }}
          className="glass flex items-center justify-center gap-2 rounded-full px-6 py-3.5 font-medium text-blush-50 transition hover:bg-white/20 active:scale-[0.97]"
        >
          <Camera size={18} /> Memory Album
          {memories > 0 && <span className="rounded-full bg-white/20 px-2 text-xs">{memories}</span>}
        </button>
        {notes > 0 && (
          <p className="text-center font-script text-lg text-gold-200">
            💌 {notes} love note{notes > 1 ? "s" : ""} unlocked
          </p>
        )}
      </motion.div>
    </motion.section>
  );
}
