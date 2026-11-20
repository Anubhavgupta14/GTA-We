"use client";

import confetti from "canvas-confetti";
import { motion, useAnimationFrame, useMotionValue, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { sfx, startMusic } from "@/lib/audio";
import type { SceneApi } from "../sceneTypes";

const FRAMES = 5;
const PIN_POS: [number, number][] = [
  [50, 26], [44, 18], [56, 18], [38, 10], [50, 10], [62, 10], [32, 2], [44, 2], [56, 2], [68, 2],
];

const CHEERS = {
  strike: [
    "STRIKE!!! 🎳 Okay that was the hottest thing I've ever seen.",
    "ANOTHER STRIKE?! I'm telling everyone my girlfriend is a pro.",
    "The pins didn't stand a chance. Neither did I, honestly.",
  ],
  good: ["So close! The pins are shaking in fear.", "Great roll! You're officially carrying this team.", "Nice!! Almost a strike — I'm still cheering."],
  meh: ["Hey, pins are overrated anyway.", "That's a warm-up roll. I believe in you!", "I'll count that as a strike in my heart."],
  gutter: ["Gutter ball! …The gutter just wanted to be close to you too.", "That lane is clearly tilted. I'm filing a bug report."],
};

const tri = (t: number) => {
  const p = t % 2;
  return p < 1 ? p : 2 - p;
};

export function BowlingActivity({ api }: { api: SceneApi }) {
  useEffect(() => startMusic("synth"), []);
  const pos = useMotionValue(0);
  const left = useTransform(pos, (v) => `${v * 100}%`);
  const [rolling, setRolling] = useState(false);
  const [down, setDown] = useState<number>(-1);
  const [aim, setAim] = useState(0);
  const [scores, setScores] = useState<number[]>([]);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  useAnimationFrame((t) => {
    if (!rolling) pos.set(tri(t / 900));
  });

  const done = scores.length >= FRAMES;
  const total = scores.reduce((a, b) => a + b, 0);

  const roll = () => {
    if (rolling || done) return;
    const p = pos.get();
    const err = Math.abs(p - 0.5) * 2;
    const pins =
      err < 0.1 ? 10 : err < 0.25 ? 8 + Math.round(Math.random()) : err < 0.45 ? 5 + Math.floor(Math.random() * 3) : err < 0.75 ? 2 + Math.floor(Math.random() * 3) : 0;
    setAim((p - 0.5) * 2);
    setRolling(true);
    setDown(-1);
    sfx.roll();
    timers.current.push(
      window.setTimeout(() => {
        setDown(pins);
        sfx.pins(pins / 10);
        setScores((s) => [...s, pins]);
        if (pins === 10) {
          api.say(CHEERS.strike[Math.floor(Math.random() * CHEERS.strike.length)]);
          api.react({ his: "laugh", her: "happy", pose: "cheer", ms: 2400 });
          api.burst("stars", 16);
          sfx.cheer();
          confetti({ particleCount: 80, spread: 70, origin: { y: 0.6 }, colors: ["#4ee6ff", "#ff4fd8", "#ffe14f"] });
          api.reward(12);
        } else if (pins >= 7) {
          api.say(CHEERS.good[Math.floor(Math.random() * CHEERS.good.length)]);
          api.react({ his: "happy", pose: "cheer", ms: 1600 });
          api.reward(6);
        } else if (pins > 0) {
          api.say(CHEERS.meh[Math.floor(Math.random() * CHEERS.meh.length)]);
          api.react({ his: "smile", her: "shy" });
          api.reward(3);
        } else {
          api.say(CHEERS.gutter[Math.floor(Math.random() * CHEERS.gutter.length)]);
          api.react({ his: "laugh", her: "surprised" });
          api.reward(4);
        }
      }, 1100),
      window.setTimeout(() => setRolling(false), 1900),
    );
  };

  return (
    <div className="flex items-stretch gap-3">
      {/* mini lane */}
      <div className="relative w-24 shrink-0 overflow-hidden rounded-xl bg-gradient-to-t from-[#e2b07a] to-[#7a4a2a] ring-2 ring-cyan-300/60 sm:w-28">
        <svg viewBox="0 0 100 120" className="h-full w-full">
          <rect x="0" y="0" width="8" height="120" fill="#140828" />
          <rect x="92" y="0" width="8" height="120" fill="#140828" />
          {PIN_POS.map(([x, y], i) => {
            const knocked = down >= 0 && i < down;
            return (
              <motion.g
                key={`${i}-${scores.length}`}
                initial={false}
                animate={knocked ? { rotate: (i % 2 ? 1 : -1) * 80, opacity: 0.25, x: (i % 2 ? 1 : -1) * 8, y: -6 } : { rotate: 0, opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.4, delay: (i % 4) * 0.04 }}
                style={{ originX: 0.5, originY: 1 }}
              >
                <ellipse cx={x} cy={y + 6} rx="3.4" ry="4.2" fill="#fff" />
                <path d={`M${x - 2.5} ${y + 5} H${x + 2.5}`} stroke="#e8405f" strokeWidth="1" />
              </motion.g>
            );
          })}
          {rolling && (
            <motion.circle
              r="6"
              fill="#7c4dff"
              stroke="#fff"
              strokeWidth="1"
              initial={{ cx: 50, cy: 112 }}
              animate={{ cx: 50 + aim * 34, cy: 20 }}
              transition={{ duration: 1.05, ease: "easeIn" }}
            />
          )}
        </svg>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-2">
        {/* scoreboard */}
        <div className="flex items-center gap-1 font-mono text-xs">
          {Array.from({ length: FRAMES }, (_, i) => (
            <span key={i} className={`grid h-8 flex-1 place-items-center rounded-md ring-1 ${scores[i] === 10 ? "bg-gold-300/30 ring-gold-300 text-gold-200" : "bg-black/30 ring-white/15"}`}>
              {scores[i] === undefined ? "–" : scores[i] === 10 ? "X" : scores[i]}
            </span>
          ))}
          <span className="ml-1 grid h-8 min-w-12 place-items-center rounded-md bg-cyan-400/20 px-2 font-bold text-cyan-200 ring-1 ring-cyan-300/50">{total}</span>
        </div>
        {/* timing bar */}
        <div className="relative h-7 overflow-hidden rounded-full bg-gradient-to-r from-red-500/70 via-yellow-400/70 to-red-500/70 ring-1 ring-white/30">
          <div className="absolute inset-y-0 left-[45%] w-[10%] bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
          <motion.div className="absolute inset-y-0 w-1.5 -translate-x-1/2 rounded-full bg-white shadow-[0_0_8px_white]" style={{ left }} />
        </div>
        {done ? (
          <button
            onClick={() => {
              sfx.click();
              setScores([]);
              setDown(-1);
              api.say(total >= 35 ? `Final score ${total}! I'm framing this scoreboard.` : `Final score ${total}. Rematch? Loser buys milkshakes.`);
            }}
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-2.5 font-semibold"
          >
            🔁 Play again ({total} pts)
          </button>
        ) : (
          <button
            onClick={roll}
            disabled={rolling}
            className="rounded-full bg-gradient-to-r from-fuchsia-500 to-cyan-400 py-2.5 font-semibold shadow-[0_6px_20px_-6px_rgba(78,230,255,0.8)] transition active:scale-95 disabled:opacity-50"
          >
            {rolling ? "Rolling…" : "🎳 Tap to roll — hit the green!"}
          </button>
        )}
      </div>
    </div>
  );
}
