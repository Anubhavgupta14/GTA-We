"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useSyncExternalStore } from "react";
import { MemoryAlbum } from "@/components/album/MemoryAlbum";
import { DateScene } from "@/components/date/DateScene";
import { TitleScreen } from "@/components/screens/TitleScreen";
import { WardrobeStudio } from "@/components/studio/WardrobeStudio";
import { Sparkles } from "@/components/ui/Sparkles";
import { TopBar } from "@/components/ui/TopBar";
import { setMuted } from "@/lib/audio";
import { useGameStore } from "@/store/gameStore";

const subscribeHydration = (cb: () => void) => useGameStore.persist.onFinishHydration(cb);
const isHydrated = () => useGameStore.persist.hasHydrated();

export default function Game() {
  const hydrated = useSyncExternalStore(subscribeHydration, isHydrated, () => false);
  const screen = useGameStore((s) => s.screen);
  const location = useGameStore((s) => s.location);
  const dateKey = useGameStore((s) => s.datesCompleted);
  const muted = useGameStore((s) => s.muted);

  useEffect(() => {
    void useGameStore.persist.rehydrate();
  }, []);

  useEffect(() => {
    setMuted(muted);
  }, [muted]);

  const current = screen === "date" && !location ? "studio" : screen;

  return (
    <div className="relative flex h-dvh flex-col overflow-hidden bg-[radial-gradient(ellipse_at_top,#5a2d7a_0%,#2a1640_45%,#120a24_100%)] text-blush-50">
      {current !== "date" && <Sparkles count={18} className="opacity-60" />}
      <TopBar />
      <main className="relative min-h-0 flex-1">
        {!hydrated ? (
          <div className="grid h-full place-items-center">
            <motion.span className="text-5xl" animate={{ scale: [1, 1.2, 1] }} transition={{ duration: 1, repeat: Infinity }}>
              💖
            </motion.span>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            {current === "title" && <TitleScreen key="title" />}
            {current === "studio" && <WardrobeStudio key="studio" />}
            {current === "date" && <DateScene key={`date-${location}-${dateKey}`} />}
            {current === "album" && <MemoryAlbum key="album" />}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}
