"use client";

import { BookHeart, Home, Volume2, VolumeX } from "lucide-react";
import { sfx } from "@/lib/audio";
import { useGameStore } from "@/store/gameStore";

export function TopBar() {
  const screen = useGameStore((s) => s.screen);
  const muted = useGameStore((s) => s.muted);
  const toggleMute = useGameStore((s) => s.toggleMute);
  const setScreen = useGameStore((s) => s.setScreen);
  const count = useGameStore((s) => s.polaroids.length);

  const iconBtn =
    "grid h-10 w-10 place-items-center rounded-full glass text-blush-50 transition hover:bg-white/20 active:scale-95";

  return (
    <header className="relative z-30 flex h-14 shrink-0 items-center justify-between gap-2 px-3 pt-[env(safe-area-inset-top)] sm:px-5">
      <div className="flex items-center gap-2">
        {screen !== "title" && (
          <button
            aria-label="Home"
            className={iconBtn}
            onClick={() => {
              sfx.click();
              setScreen("title");
            }}
          >
            <Home size={18} />
          </button>
        )}
        <div className="leading-tight">
          <p className="font-display text-base italic text-blush-100 sm:text-lg">Date Night</p>
          <p className="-mt-1 font-script text-sm text-gold-300 sm:text-base">with Engineer ♡</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {screen !== "album" && (
          <button
            aria-label="Memory album"
            className={`${iconBtn} relative`}
            onClick={() => {
              sfx.click();
              setScreen("album");
            }}
          >
            <BookHeart size={18} />
            {count > 0 && (
              <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-blush-500 px-1 text-[10px] font-bold">
                {count}
              </span>
            )}
          </button>
        )}
        <button
          aria-label={muted ? "Unmute sounds" : "Mute sounds"}
          aria-pressed={muted}
          className={iconBtn}
          onClick={() => {
            toggleMute();
            if (muted) setTimeout(() => sfx.pop(), 50);
          }}
        >
          {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>
    </header>
  );
}
