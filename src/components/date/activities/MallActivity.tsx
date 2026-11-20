"use client";

import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { sfx, startMusic } from "@/lib/audio";
import { PropIcon } from "../Props";
import type { PropId, SceneApi } from "../sceneTypes";
import { ActivityButton, ActivityRow } from "./shared";

const GIFTS: { id: PropId; emoji: string; name: string; line: string }[] = [
  { id: "chocolates", emoji: "🍫", name: "Chocolates", line: "Heart-shaped box of chocolates. I already ate one. Quality control." },
  { id: "flowers", emoji: "💐", name: "Flowers", line: "Pink roses — not as pretty as you, but they tried their best." },
  { id: "plushie", emoji: "🧸", name: "Plushie", line: "Meet Byte the teddy. He'll guard you when I'm at work." },
  { id: "jewelry", emoji: "💍", name: "Jewelry", line: "It's a promise ring… a promise that I'll always pick you. 💍" },
];

export function MallActivity({ api }: { api: SceneApi }) {
  useEffect(() => startMusic("lofi"), []);
  const [opening, setOpening] = useState<PropId | null>(null);
  const [revealed, setRevealed] = useState(false);
  const timers = useRef<number[]>([]);
  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), []);

  const pick = (g: (typeof GIFTS)[number]) => {
    if (opening) return;
    sfx.pop();
    setOpening(g.id);
    setRevealed(false);
    api.say("Close your eyes… no peeking! 🎁");
    api.react({ his: "happy", her: "shy", ms: 1400 });
    timers.current.push(
      window.setTimeout(() => {
        setRevealed(true);
        sfx.gift();
        api.burst("sparkle", 16);
        api.setScene({ herProp: g.id });
        api.say(g.line);
        api.react({ his: "shy", her: "laugh", blush: true, ms: 2600 });
        api.reward(g.id === "jewelry" ? 14 : 10, `gift-${g.id}`);
      }, 1400),
      window.setTimeout(() => setOpening(null), 3400),
    );
  };

  return (
    <div className="relative flex flex-col gap-2.5">
      <ActivityRow title="Engineer wants to buy you a surprise gift">
        {GIFTS.map((g) => (
          <ActivityButton key={g.id} emoji={g.emoji} label={g.name} active={api.scene.herProp === g.id} disabled={!!opening} onClick={() => pick(g)} />
        ))}
      </ActivityRow>
      <ActivityRow title="Mall moments">
        <ActivityButton
          emoji="🥤"
          label="Share a milkshake"
          onClick={() => {
            sfx.pop();
            api.setScene({ herProp: "milkshake" });
            api.say("Two straws. I'm drinking slowly so it lasts longer.");
            api.react({ his: "happy", her: "happy" });
            api.reward(6, "shake");
          }}
        />
        <ActivityButton
          emoji="👗"
          label="Window shopping"
          onClick={() => {
            sfx.sparkle();
            api.say("That dress would look amazing on you. So would literally everything.");
            api.react({ his: "smile", her: "shy", blush: true });
            api.reward(5, "window");
          }}
        />
      </ActivityRow>

      <AnimatePresence>
        {opening && (
          <motion.div
            className="absolute inset-0 z-10 grid place-items-center rounded-2xl bg-twilight-900/90 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {!revealed ? (
              <motion.div className="text-6xl" animate={{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.1, 1] }} transition={{ duration: 0.6, repeat: Infinity }}>
                🎁
              </motion.div>
            ) : (
              <motion.div className="flex flex-col items-center" initial={{ scale: 0.3, rotate: -20 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: "spring", stiffness: 260, damping: 14 }}>
                <PropIcon id={opening} className="h-20 w-20 drop-shadow-[0_0_20px_rgba(255,201,214,0.8)]" />
                <p className="font-script text-2xl text-gold-200">For you! 💝</p>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
