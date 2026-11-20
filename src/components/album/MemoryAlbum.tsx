"use client";

import { Download, Heart, Mail, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { getLocation, LOCATIONS } from "@/data/dates";
import { sfx } from "@/lib/audio";
import { downloadDataUrl, toPng } from "@/lib/polaroid";
import { MAX_POLAROIDS, useGameStore, type Polaroid } from "@/store/gameStore";

export function MemoryAlbum() {
  const polaroids = useGameStore((s) => s.polaroids);
  const notes = useGameStore((s) => s.unlockedNotes);
  const remove = useGameStore((s) => s.removePolaroid);
  const setScreen = useGameStore((s) => s.setScreen);
  const [open, setOpen] = useState<Polaroid | null>(null);
  const [tab, setTab] = useState<"photos" | "notes">("photos");

  const download = async (p: Polaroid) => {
    sfx.click();
    const png = await toPng(p.image);
    downloadDataUrl(png, `date-night-${p.location}-${new Date(p.createdAt).toISOString().slice(0, 10)}.png`);
  };

  return (
    <motion.section className="flex h-full min-h-0 flex-col" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <div className="px-4 pb-3 text-center sm:px-6">
        <h1 className="font-display text-4xl font-bold italic text-shimmer">Memory Album</h1>
        <p className="font-script text-xl text-blush-200">every date, every giggle, every blush</p>
        <div className="mx-auto mt-3 flex w-fit rounded-full glass p-1 text-sm">
          {(
            [
              ["photos", `📸 Polaroids (${polaroids.length}/${MAX_POLAROIDS})`],
              ["notes", `💌 Love notes (${notes.length}/${LOCATIONS.length})`],
            ] as const
          ).map(([id, label]) => (
            <button
              key={id}
              onClick={() => {
                sfx.click();
                setTab(id);
              }}
              aria-pressed={tab === id}
              className={`rounded-full px-4 py-1.5 font-medium transition ${tab === id ? "bg-white text-blush-600" : "text-blush-50"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="thin-scrollbar min-h-0 flex-1 overflow-y-auto px-4 pb-10 sm:px-8">
        {tab === "photos" &&
          (polaroids.length === 0 ? (
            <Empty
              emoji="📷"
              text="No memories yet! Go on a date and tap “Polaroid” to capture the moment."
              cta="Start getting ready"
              onCta={() => setScreen("studio")}
            />
          ) : (
            <div className="mx-auto grid max-w-5xl grid-cols-2 gap-4 pt-2 sm:grid-cols-3 lg:grid-cols-4">
              {polaroids.map((p, i) => (
                <motion.button
                  key={p.id}
                  onClick={() => {
                    sfx.pop();
                    setOpen(p);
                  }}
                  initial={{ opacity: 0, y: 20, rotate: 0 }}
                  animate={{ opacity: 1, y: 0, rotate: i % 2 ? 2.5 : -2.5 }}
                  whileHover={{ rotate: 0, scale: 1.04, zIndex: 2 }}
                  transition={{ delay: Math.min(i * 0.05, 0.4) }}
                  className="relative"
                >
                  <span className="absolute -top-2 left-1/2 z-10 h-5 w-14 -translate-x-1/2 rotate-[-4deg] bg-blush-200/70 shadow" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.image} alt={`Polaroid at ${p.caption}`} className="w-full rounded-sm shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)]" />
                </motion.button>
              ))}
            </div>
          ))}

        {tab === "notes" &&
          (notes.length === 0 ? (
            <Empty emoji="💌" text="Fill the love meter to 100% on a date to unlock a secret note from Engineer." cta="Go on a date" onCta={() => setScreen("studio")} />
          ) : (
            <div className="mx-auto grid max-w-3xl gap-4 pt-2 sm:grid-cols-2">
              {notes.map((id, i) => {
                const loc = getLocation(id);
                return (
                  <motion.article
                    key={id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="rounded-lg bg-[#fffaf2] p-5 text-twilight-800 shadow-xl [background-image:repeating-linear-gradient(transparent_0_27px,#f6d6de_27px_28px)]"
                  >
                    <p className="flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-blush-600">
                      <Mail size={13} /> {loc.emoji} {loc.name}
                    </p>
                    <p className="mt-1 text-[11px] text-twilight-600/70">{loc.perfectNote.title}</p>
                    <p className="mt-2 font-script text-xl leading-7">{loc.perfectNote.body}</p>
                  </motion.article>
                );
              })}
              {LOCATIONS.filter((l) => !notes.includes(l.id)).map((l) => (
                <div key={l.id} className="grid min-h-32 place-items-center rounded-lg border-2 border-dashed border-white/15 p-5 text-center text-sm text-blush-200/60">
                  <span>
                    🔒 {l.emoji} {l.name}
                    <br />
                    <span className="text-xs">Reach a perfect date here to unlock</span>
                  </span>
                </div>
              ))}
            </div>
          ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-50 grid place-items-center bg-twilight-950/85 p-4 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(null)}
            role="dialog"
            aria-modal="true"
          >
            <motion.div
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, rotate: -6 }}
              animate={{ scale: 1, rotate: -1.5 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="flex w-full max-w-sm flex-col items-center gap-3"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={open.image} alt={`Polaroid at ${open.caption}`} className="w-full rounded-sm shadow-2xl" />
              <p className="flex items-center gap-1 text-sm text-blush-100">
                <Heart size={14} className="fill-blush-400 text-blush-400" /> {Math.round(open.love)}% love ·{" "}
                {new Date(open.createdAt).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" })}
              </p>
              <div className="flex w-full gap-2">
                <button onClick={() => download(open)} className="flex flex-1 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blush-500 to-gold-400 py-3 font-semibold">
                  <Download size={18} /> Download PNG
                </button>
                <button
                  aria-label="Delete polaroid"
                  onClick={() => {
                    if (window.confirm("Delete this memory? 🥺")) {
                      remove(open.id);
                      setOpen(null);
                    }
                  }}
                  className="grid h-12 w-12 place-items-center rounded-full glass text-red-200"
                >
                  <Trash2 size={18} />
                </button>
                <button aria-label="Close" onClick={() => setOpen(null)} className="grid h-12 w-12 place-items-center rounded-full glass">
                  <X size={18} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}

function Empty({ emoji, text, cta, onCta }: { emoji: string; text: string; cta: string; onCta: () => void }) {
  return (
    <div className="mx-auto flex max-w-xs flex-col items-center gap-3 pt-16 text-center">
      <motion.span className="text-6xl" animate={{ rotate: [0, -8, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        {emoji}
      </motion.span>
      <p className="text-blush-100">{text}</p>
      <button onClick={onCta} className="rounded-full bg-gradient-to-r from-blush-500 to-gold-400 px-6 py-3 font-semibold">
        {cta}
      </button>
    </div>
  );
}
