"use client";

import { BatteryFull, ChevronRight, MessageCircle, Mic, Phone, PhoneOff, Signal, Video, Volume2, Wifi, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { EngineerAvatar } from "@/components/character/EngineerAvatar";
import { getEngineerReaction, LOCATIONS, type EngineerReaction, type LocationId } from "@/data/dates";
import { sfx, startRingtone } from "@/lib/audio";
import { formatClock, useNowSeconds } from "@/lib/useClock";
import { useGameStore } from "@/store/gameStore";

type Stage = "contact" | "calling" | "talking" | "destinations";

export function CallEngineerModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 grid place-items-center bg-twilight-950/70 p-3 backdrop-blur-md"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label="Phone"
        >
          <Smartphone onClose={onClose} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Smartphone({ onClose }: { onClose: () => void }) {
  const look = useGameStore((s) => s.look);
  const startDate = useGameStore((s) => s.startDate);
  const now = useNowSeconds();

  const [stage, setStage] = useState<Stage>("contact");
  const [reaction, setReaction] = useState<EngineerReaction | null>(null);
  const [shown, setShown] = useState(0);
  const [connectedAt, setConnectedAt] = useState(0);
  const timers = useRef<number[]>([]);
  const stopRing = useRef<(() => void) | null>(null);

  useEffect(
    () => () => {
      timers.current.forEach((t) => window.clearTimeout(t));
      stopRing.current?.();
    },
    [],
  );

  const later = (fn: () => void, ms: number) => timers.current.push(window.setTimeout(fn, ms));

  const call = () => {
    sfx.click();
    setStage("calling");
    stopRing.current = startRingtone();
    later(() => {
      stopRing.current?.();
      stopRing.current = null;
      sfx.pickup();
      const r = getEngineerReaction(look);
      setReaction(r);
      setConnectedAt(Math.floor(Date.now() / 1000));
      setStage("talking");
      setShown(0);
      [r.greeting, ...r.lines].forEach((_, i) =>
        later(() => {
          setShown(i + 1);
          sfx.pop();
        }, 700 + i * 1700),
      );
    }, 2900);
  };

  const hangUp = () => {
    stopRing.current?.();
    sfx.hangup();
    onClose();
  };

  const choose = (id: LocationId) => {
    sfx.chime();
    const bonus = reaction?.recommended.includes(id) ? 8 : 0;
    startDate(id, 12 + bonus);
  };

  const bubbles = reaction ? [reaction.greeting, ...reaction.lines] : [];
  const elapsed = connectedAt && now ? Math.max(0, now - connectedAt) : 0;

  return (
    <motion.div
      onClick={(e) => e.stopPropagation()}
      initial={{ y: 80, scale: 0.9, rotate: -3 }}
      animate={{ y: 0, scale: 1, rotate: 0 }}
      exit={{ y: 80, scale: 0.9, opacity: 0 }}
      transition={{ type: "spring", stiffness: 220, damping: 22 }}
      className="relative h-[min(680px,90dvh)] w-[min(340px,94vw)] rounded-[50px] bg-gradient-to-b from-[#2a2a30] to-[#111] p-[10px] shadow-[0_30px_80px_-10px_rgba(0,0,0,0.8)] ring-1 ring-white/20"
    >
      {/* side buttons */}
      <span aria-hidden className="absolute -left-[3px] top-28 h-10 w-[3px] rounded-l bg-[#3a3a42]" />
      <span aria-hidden className="absolute -left-[3px] top-44 h-16 w-[3px] rounded-l bg-[#3a3a42]" />
      <span aria-hidden className="absolute -right-[3px] top-36 h-20 w-[3px] rounded-r bg-[#3a3a42]" />

      <div className="relative flex h-full flex-col overflow-hidden rounded-[40px] bg-gradient-to-b from-[#ffb7c9] via-[#c98bd8] to-[#5b3a8c] text-white">
        {/* status bar */}
        <div className="relative z-20 flex items-center justify-between px-7 pt-3 text-[13px] font-semibold">
          <span>{formatClock(now)}</span>
          <span className="flex items-center gap-1">
            <Signal size={13} /> <Wifi size={13} /> <BatteryFull size={16} />
          </span>
        </div>
        <div aria-hidden className="absolute left-1/2 top-2.5 z-30 h-7 w-[96px] -translate-x-1/2 rounded-full bg-black" />

        <button aria-label="Close phone" onClick={hangUp} className="absolute right-4 top-10 z-30 grid h-8 w-8 place-items-center rounded-full bg-black/20 backdrop-blur">
          <X size={16} />
        </button>

        <AnimatePresence mode="wait">
          {stage === "contact" && (
            <motion.div key="contact" className="flex flex-1 flex-col items-center px-6 pt-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <p className="text-xs uppercase tracking-[0.2em] text-white/70">Favourites</p>
              <div className="mt-4 h-28 w-28 overflow-hidden rounded-full bg-gradient-to-b from-sky-200 to-indigo-300 ring-4 ring-white/40 shadow-xl">
                <EngineerAvatar view="face" className="h-full w-full" />
              </div>
              <h2 className="mt-3 text-2xl font-semibold">Engineer ❤️</h2>
              <p className="text-sm text-white/75">mobile · my favourite person</p>

              <div className="mt-5 grid w-full grid-cols-3 gap-2 text-[11px]">
                {[
                  [MessageCircle, "message"],
                  [Phone, "call"],
                  [Video, "video"],
                ].map(([Icon, label]) => {
                  const I = Icon as typeof Phone;
                  const isCall = label === "call";
                  return (
                    <button
                      key={label as string}
                      onClick={isCall ? call : () => sfx.click()}
                      className={`flex flex-col items-center gap-1 rounded-2xl py-2.5 transition active:scale-95 ${isCall ? "bg-emerald-500 shadow-lg shadow-emerald-500/40" : "bg-white/20"}`}
                    >
                      <I size={20} />
                      {label as string}
                    </button>
                  );
                })}
              </div>

              <div className="mt-6 w-full rounded-3xl bg-white/20 p-3 text-left text-sm backdrop-blur">
                <p className="mb-2 text-[11px] uppercase tracking-wider text-white/70">Last messages</p>
                <p className="mb-1.5 w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3 py-1.5 text-twilight-800">Ready yet? 🥺</p>
                <p className="mb-1.5 w-fit max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3 py-1.5 text-twilight-800">Tonight is all yours. Pick anywhere ✨</p>
                <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-blush-500 px-3 py-1.5">Almost! Calling you in 5 💅</p>
              </div>

              <motion.button
                onClick={call}
                whileTap={{ scale: 0.95 }}
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 1.4, repeat: Infinity }}
                className="mt-auto mb-8 flex items-center gap-2 rounded-full bg-emerald-500 px-8 py-3.5 text-lg font-semibold shadow-lg shadow-emerald-500/50"
              >
                <Phone size={20} /> Call
              </motion.button>
            </motion.div>
          )}

          {(stage === "calling" || stage === "talking") && (
            <motion.div key="call" className="flex min-h-0 flex-1 flex-col items-center bg-gradient-to-b from-twilight-800/70 to-twilight-950/90 px-4 pt-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <div className="relative grid place-items-center">
                {stage === "calling" &&
                  [0, 1, 2].map((i) => (
                    <motion.span
                      key={i}
                      className="absolute h-24 w-24 rounded-full border-2 border-white/50"
                      animate={{ scale: [1, 2], opacity: [0.7, 0] }}
                      transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.6 }}
                    />
                  ))}
                <motion.div
                  className={`overflow-hidden rounded-full bg-gradient-to-b from-sky-200 to-indigo-300 ring-4 ring-white/30 transition-all ${stage === "calling" ? "h-24 w-24" : "h-20 w-20"}`}
                  animate={stage === "calling" ? { rotate: [0, -4, 4, -4, 0] } : {}}
                  transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.9 }}
                >
                  <EngineerAvatar view="face" expression={stage === "talking" ? "happy" : "smile"} className="h-full w-full" />
                </motion.div>
              </div>
              <h2 className="mt-3 text-xl font-semibold">Engineer ❤️</h2>
              <p className="text-sm text-white/70">
                {stage === "calling" ? (
                  <>
                    Calling Engineer
                    <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.2, repeat: Infinity }}>
                      …
                    </motion.span>
                  </>
                ) : (
                  `${String(Math.floor(elapsed / 60)).padStart(2, "0")}:${String(elapsed % 60).padStart(2, "0")}`
                )}
              </p>

              <div className="thin-scrollbar mt-4 flex min-h-0 w-full flex-1 flex-col gap-2 overflow-y-auto pb-2">
                {bubbles.slice(0, shown).map((b, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="w-fit max-w-[90%] rounded-2xl rounded-bl-md bg-white/95 px-3.5 py-2 text-sm leading-snug text-twilight-800 shadow"
                  >
                    {b}
                  </motion.p>
                ))}
                {stage === "talking" && shown < bubbles.length && (
                  <div className="flex w-fit gap-1 rounded-2xl rounded-bl-md bg-white/80 px-3 py-2.5">
                    {[0, 1, 2].map((i) => (
                      <motion.span key={i} className="h-2 w-2 rounded-full bg-twilight-700" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                )}
              </div>

              {stage === "talking" && shown >= bubbles.length && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => {
                    sfx.sparkle();
                    setStage("destinations");
                  }}
                  className="mb-3 w-full rounded-full bg-gradient-to-r from-blush-500 to-gold-400 py-3 font-semibold shadow-lg"
                >
                  Pick our date spot 💕
                </motion.button>
              )}

              <div className="mb-6 mt-1 flex w-full items-center justify-around">
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15">
                  <Mic size={20} />
                </span>
                <button onClick={hangUp} aria-label="Hang up" className="grid h-16 w-16 place-items-center rounded-full bg-red-500 shadow-lg shadow-red-500/40 active:scale-95">
                  <PhoneOff size={26} />
                </button>
                <span className="grid h-12 w-12 place-items-center rounded-full bg-white/15">
                  <Volume2 size={20} />
                </span>
              </div>
            </motion.div>
          )}

          {stage === "destinations" && (
            <motion.div key="dest" className="flex min-h-0 flex-1 flex-col bg-gradient-to-b from-twilight-800/80 to-twilight-950/95 px-4 pt-7" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }}>
              <p className="text-center text-xs uppercase tracking-[0.2em] text-white/60">Engineer asks</p>
              <h2 className="mb-3 text-center font-display text-2xl italic">Where to, love?</h2>
              <div className="thin-scrollbar flex min-h-0 flex-1 flex-col gap-2 overflow-y-auto pb-4">
                {LOCATIONS.map((loc, i) => {
                  const rec = reaction?.recommended.includes(loc.id);
                  return (
                    <motion.button
                      key={loc.id}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      onClick={() => choose(loc.id)}
                      className={`group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r ${loc.gradient} p-3 text-left ring-1 ring-white/15 transition active:scale-[0.98]`}
                    >
                      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-white/15 text-2xl">{loc.emoji}</span>
                      <span className="min-w-0 flex-1">
                        <span className="flex items-center gap-1.5 font-semibold">
                          {loc.name}
                          {rec && <span className="rounded-full bg-gold-400 px-1.5 py-0.5 text-[9px] font-bold uppercase text-twilight-900">He suggests</span>}
                        </span>
                        <span className="block truncate text-xs text-white/70">{loc.tagline}</span>
                      </span>
                      <ChevronRight size={18} className="shrink-0 text-white/60 transition group-hover:translate-x-1" />
                    </motion.button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div aria-hidden className="absolute bottom-2 left-1/2 h-1 w-28 -translate-x-1/2 rounded-full bg-white/60" />
      </div>
    </motion.div>
  );
}
