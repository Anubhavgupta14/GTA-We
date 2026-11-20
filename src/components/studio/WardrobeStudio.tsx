"use client";

import { Phone, RotateCcw, ScanFace, Shuffle, User } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { FemaleAvatar } from "@/components/character/FemaleAvatar";
import type { Expression } from "@/components/character/parts/Face";
import { CallEngineerModal } from "@/components/phone/CallEngineerModal";
import { seeded } from "@/components/ui/Sparkles";
import { getOutfit, OUTFIT_CATEGORIES, type Look } from "@/data/wardrobe";
import { sfx } from "@/lib/audio";
import { useGameStore } from "@/store/gameStore";
import { CategoryTabs, type StudioTab } from "./CategoryTabs";
import { MakeupControls } from "./MakeupControls";
import { AccessoryControls, FootwearControls, HairControls, OutfitControls } from "./WardrobeControls";

export function WardrobeStudio() {
  const look = useGameStore((s) => s.look);
  const updateLook = useGameStore((s) => s.updateLook);
  const randomizeLook = useGameStore((s) => s.randomizeLook);
  const resetLook = useGameStore((s) => s.resetLook);

  const [tab, setTab] = useState<StudioTab>("outfit");
  const [zoom, setZoom] = useState<"full" | "face">("full");
  const [phoneOpen, setPhoneOpen] = useState(false);
  const [flash, setFlash] = useState<{ expr: Expression; key: number } | null>(null);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const react = (expr: Expression = "happy") => {
    setFlash({ expr, key: Date.now() });
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setFlash(null), 1100);
  };

  const update = (patch: Partial<Look>) => {
    updateLook(patch);
    sfx.select();
    react();
  };

  const changeTab = (t: StudioTab) => {
    sfx.click();
    setTab(t);
    setZoom(t === "makeup" ? "face" : "full");
  };

  const outfit = getOutfit(look.outfit);
  const category = OUTFIT_CATEGORIES.find((c) => c.id === outfit.category);

  return (
    <motion.section
      className="flex h-full min-h-0 flex-col lg:flex-row"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      {/* Live preview */}
      <div className="relative h-[40dvh] shrink-0 overflow-hidden sm:h-[44dvh] lg:h-auto lg:flex-1">
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_35%,rgba(255,201,214,0.35),transparent_60%)]" />
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-twilight-950/60 to-transparent" />
        {/* vanity mirror bulbs */}
        <div aria-hidden className="absolute inset-x-6 top-2 flex justify-between lg:inset-x-16">
          {Array.from({ length: 7 }, (_, i) => (
            <span key={i} className="h-2.5 w-2.5 rounded-full bg-gold-200 shadow-[0_0_12px_4px_rgba(253,233,184,0.55)] animate-twinkle" style={{ animationDelay: `${i * 0.3}s` }} />
          ))}
        </div>

        <div className="absolute inset-0 flex items-end justify-center pt-6">
          <FemaleAvatar
            look={look}
            view={zoom}
            expression={flash?.expr ?? "smile"}
            className="h-full w-full max-w-[560px] drop-shadow-[0_12px_30px_rgba(0,0,0,0.35)]"
          />
        </div>

        <AnimatePresence>
          {flash && (
            <motion.div key={flash.key} className="pointer-events-none absolute inset-0" exit={{ opacity: 0 }}>
              {Array.from({ length: 7 }, (_, i) => (
                <motion.span
                  key={i}
                  className="absolute text-xl"
                  style={{ left: `${30 + seeded(flash.key + i, 1) * 40}%`, top: `${25 + seeded(flash.key + i, 2) * 40}%` }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: [0, 1.2, 0.8], opacity: [0, 1, 0], y: -30 }}
                  transition={{ duration: 0.9, delay: i * 0.04 }}
                >
                  {i % 2 ? "✨" : "💖"}
                </motion.span>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* zoom toggle */}
        <div className="absolute left-3 top-3 flex rounded-full glass p-1 text-xs sm:left-5">
          {(
            [
              ["full", "Full Body", User],
              ["face", "Face", ScanFace],
            ] as const
          ).map(([z, label, Icon]) => (
            <button
              key={z}
              onClick={() => {
                sfx.click();
                setZoom(z);
              }}
              aria-pressed={zoom === z}
              className={`flex items-center gap-1 rounded-full px-3 py-1.5 font-medium transition ${zoom === z ? "bg-white text-blush-600" : "text-blush-50"}`}
            >
              <Icon size={14} /> {label}
            </button>
          ))}
        </div>

        <div className="absolute right-3 top-3 flex gap-2 sm:right-5">
          <button
            onClick={() => {
              randomizeLook();
              sfx.sparkle();
              react("laugh");
            }}
            className="flex items-center gap-1 rounded-full glass px-3 py-2 text-xs font-medium transition active:scale-95"
          >
            <Shuffle size={14} /> Randomize
          </button>
          <button
            aria-label="Reset look"
            onClick={() => {
              resetLook();
              sfx.pop();
              react("smile");
            }}
            className="grid h-8 w-8 place-items-center rounded-full glass transition active:scale-95"
          >
            <RotateCcw size={14} />
          </button>
        </div>

        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full glass px-3 py-1 text-xs text-blush-50">
          {category?.emoji} {outfit.name}
        </div>
      </div>

      {/* Customization drawer */}
      <div className="relative flex min-h-0 flex-1 flex-col rounded-t-[28px] border-t border-white/10 bg-gradient-to-b from-twilight-800/95 to-twilight-900/95 shadow-[0_-20px_40px_-20px_rgba(0,0,0,0.6)] lg:w-[460px] lg:flex-none lg:rounded-none lg:rounded-l-[28px] lg:border-l lg:border-t-0">
        <div className="mx-auto mt-2 h-1.5 w-10 rounded-full bg-white/20 lg:hidden" />
        <div className="px-3 pt-2 sm:px-5 lg:pt-5">
          <CategoryTabs active={tab} onChange={changeTab} />
        </div>
        <div className="thin-scrollbar min-h-0 flex-1 overflow-y-auto px-3 pb-28 pt-4 sm:px-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={tab}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
            >
              {tab === "hair" && <HairControls look={look} update={update} />}
              {tab === "makeup" && <MakeupControls look={look} update={update} />}
              {tab === "outfit" && <OutfitControls look={look} update={update} />}
              {tab === "shoes" && <FootwearControls look={look} update={update} />}
              {tab === "bling" && <AccessoryControls look={look} update={update} />}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Primary CTA */}
        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-twilight-900 via-twilight-900/95 to-transparent px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-6">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => {
              sfx.pop();
              setPhoneOpen(true);
            }}
            className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 py-4 text-lg font-semibold text-white shadow-[0_10px_30px_-8px_rgba(52,211,153,0.8)]"
          >
            <motion.span animate={{ rotate: [0, -14, 14, -10, 10, 0] }} transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 1.6 }}>
              <Phone size={20} />
            </motion.span>
            Ready! Call Engineer 📞
          </motion.button>
        </div>
      </div>

      <CallEngineerModal open={phoneOpen} onClose={() => setPhoneOpen(false)} />
    </motion.section>
  );
}
