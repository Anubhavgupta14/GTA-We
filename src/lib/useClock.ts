"use client";

import { useSyncExternalStore } from "react";

function subscribe(cb: () => void) {
  const id = window.setInterval(cb, 1000);
  return () => window.clearInterval(id);
}

/** Current unix time in whole seconds, ticking once a second (0 during SSR). */
export function useNowSeconds() {
  return useSyncExternalStore(
    subscribe,
    () => Math.floor(Date.now() / 1000),
    () => 0,
  );
}

export function formatClock(seconds: number) {
  if (!seconds) return "9:41";
  const d = new Date(seconds * 1000);
  return d.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" }).replace(/\s?[AP]M/i, "");
}
