"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import type { LocationId } from "@/data/dates";
import { DEFAULT_LOOK, randomLook, type Look } from "@/data/wardrobe";

export type Screen = "title" | "studio" | "date" | "album";

export interface Polaroid {
  id: string;
  /** Compressed JPEG data URL (kept small for localStorage). */
  image: string;
  location: LocationId;
  caption: string;
  createdAt: number;
  love: number;
}

export const MAX_POLAROIDS = 18;

interface GameState {
  screen: Screen;
  look: Look;
  location: LocationId | null;
  love: number;
  perfectReached: boolean;
  muted: boolean;
  polaroids: Polaroid[];
  unlockedNotes: LocationId[];
  datesCompleted: number;

  setScreen: (screen: Screen) => void;
  updateLook: (patch: Partial<Look>) => void;
  randomizeLook: () => void;
  resetLook: () => void;
  startDate: (location: LocationId, startingLove?: number) => void;
  addLove: (amount: number) => { reachedPerfect: boolean };
  unlockNote: (location: LocationId) => void;
  toggleMute: () => void;
  addPolaroid: (p: Polaroid) => void;
  removePolaroid: (id: string) => void;
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      screen: "title",
      look: DEFAULT_LOOK,
      location: null,
      love: 0,
      perfectReached: false,
      muted: false,
      polaroids: [],
      unlockedNotes: [],
      datesCompleted: 0,

      setScreen: (screen) => set({ screen }),
      updateLook: (patch) => set((s) => ({ look: { ...s.look, ...patch } })),
      randomizeLook: () => set((s) => ({ look: randomLook(s.look) })),
      resetLook: () => set({ look: DEFAULT_LOOK }),

      startDate: (location, startingLove = 10) =>
        set((s) => ({
          location,
          love: Math.min(100, startingLove),
          perfectReached: false,
          screen: "date",
          datesCompleted: s.datesCompleted + 1,
        })),

      addLove: (amount) => {
        const { love, perfectReached } = get();
        const next = Math.max(0, Math.min(100, love + amount));
        const reachedPerfect = next >= 100 && !perfectReached;
        set({ love: next, perfectReached: perfectReached || next >= 100 });
        return { reachedPerfect };
      },

      unlockNote: (location) =>
        set((s) =>
          s.unlockedNotes.includes(location) ? s : { unlockedNotes: [...s.unlockedNotes, location] },
        ),

      toggleMute: () => set((s) => ({ muted: !s.muted })),

      addPolaroid: (p) =>
        set((s) => ({ polaroids: [p, ...s.polaroids].slice(0, MAX_POLAROIDS) })),

      removePolaroid: (id) => set((s) => ({ polaroids: s.polaroids.filter((p) => p.id !== id) })),
    }),
    {
      name: "date-night-with-engineer",
      version: 1,
      // Hydrate manually on the client (see Game.tsx) to avoid SSR mismatches.
      skipHydration: true,
      storage: createJSONStorage(() => ({
        getItem: (k) => localStorage.getItem(k),
        removeItem: (k) => localStorage.removeItem(k),
        setItem: (k, v) => {
          try {
            localStorage.setItem(k, v);
          } catch {
            // Quota exceeded (too many polaroids) — drop the oldest memories and retry.
            try {
              const parsed = JSON.parse(v) as { state: { polaroids: Polaroid[] } };
              parsed.state.polaroids = parsed.state.polaroids.slice(0, 6);
              localStorage.setItem(k, JSON.stringify(parsed));
            } catch {
              /* storage unavailable — play on without persistence */
            }
          }
        },
      })),
      partialize: (s) => ({
        look: s.look,
        location: s.location,
        love: s.love,
        perfectReached: s.perfectReached,
        muted: s.muted,
        polaroids: s.polaroids,
        unlockedNotes: s.unlockedNotes,
        datesCompleted: s.datesCompleted,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<GameState>;
        return { ...current, ...p, look: { ...DEFAULT_LOOK, ...(p.look ?? {}) } };
      },
    },
  ),
);
