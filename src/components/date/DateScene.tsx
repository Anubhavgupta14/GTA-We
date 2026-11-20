"use client";

import confetti from "canvas-confetti";
import { Camera, MapPin, MessageCircleHeart, Shirt } from "lucide-react";
import { AnimatePresence, motion, type TargetAndTransition } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { caveat } from "@/app/fonts";
import { EngineerAvatar, type EngineerPose } from "@/components/character/EngineerAvatar";
import { FemaleAvatar } from "@/components/character/FemaleAvatar";
import type { Expression } from "@/components/character/parts/Face";
import { CallEngineerModal } from "@/components/phone/CallEngineerModal";
import {
  GENERIC_HUG_LINES,
  GENERIC_KISS_LINES,
  getEngineerOutfit,
  getLocation,
  type Tone,
} from "@/data/dates";
import { sfx } from "@/lib/audio";
import { makePolaroid, renderStage } from "@/lib/polaroid";
import { useGameStore } from "@/store/gameStore";
import { BowlingActivity } from "./activities/BowlingActivity";
import { ClubActivity } from "./activities/ClubActivity";
import { DriveActivity } from "./activities/DriveActivity";
import { MallActivity } from "./activities/MallActivity";
import { MountainsActivity } from "./activities/MountainsActivity";
import { RestaurantActivity } from "./activities/RestaurantActivity";
import { coupleFrameStyle, SceneBackground, SceneForeground } from "./Backgrounds";
import { LoveMeter } from "./LoveMeter";
import { PerfectDateModal } from "./PerfectDateModal";
import { PolaroidModal, type PolaroidShot } from "./PolaroidModal";
import { HeldProp } from "./Props";
import { INITIAL_SCENE, type BurstKind, type SceneApi, type SceneState } from "./sceneTypes";

type Action = "idle" | "hug" | "kiss";

interface Mood {
  his?: Expression;
  her?: Expression;
  pose?: EngineerPose;
  blush?: boolean;
}

interface Particle {
  id: number;
  emoji: string;
  x: number;
  dx: number;
  rise: number;
  rot: number;
  delay: number;
  size: number;
}

interface Speech {
  id: number;
  who: "he" | "she";
  text: string;
}

const BURST_EMOJI: Record<BurstKind, string[]> = {
  pink: ["💖", "💗", "💕", "💘", "💞"],
  gold: ["💛", "✨", "🌟", "💫", "🧡"],
  notes: ["🎵", "🎶", "♪", "💜"],
  stars: ["⭐", "🌟", "✨", "💫"],
  sparkle: ["✨", "💎", "💖", "🎀"],
};

const TONE_META: Record<Tone, { emoji: string; mood: Expression }> = {
  sweet: { emoji: "💗", mood: "happy" },
  funny: { emoji: "😂", mood: "laugh" },
  romantic: { emoji: "🌹", mood: "shy" },
};

const BEAT = 60 / 124;

/* Event-time helpers live outside the component so render stays pure. */
let idSeq = 0;
const nextId = () => ++idSeq;

function makeParticles(kind: BurstKind, count: number): Particle[] {
  const set = BURST_EMOJI[kind];
  return Array.from({ length: count }, () => ({
    id: nextId(),
    emoji: set[Math.floor(Math.random() * set.length)],
    x: 38 + Math.random() * 24,
    dx: (Math.random() - 0.5) * 160,
    rise: 120 + Math.random() * 160,
    rot: (Math.random() - 0.5) * 60,
    delay: Math.random() * 0.35,
    size: 18 + Math.random() * 18,
  }));
}

function sideCannons(frames: number) {
  const colors = ["#f0517f", "#fde9b8", "#ffc9d6"];
  confetti({ particleCount: 5, angle: 60, spread: 60, origin: { x: 0, y: 0.7 }, colors });
  confetti({ particleCount: 5, angle: 120, spread: 60, origin: { x: 1, y: 0.7 }, colors });
  if (frames > 0) requestAnimationFrame(() => sideCannons(frames - 1));
}

function danceAnim(move: SceneState["dance"], who: "her" | "him"): TargetAndTransition {
  switch (move) {
    case "sway":
      return { rotate: [-4, 4, -4], transition: { duration: BEAT * 2, repeat: Infinity, ease: "easeInOut" } };
    case "bounce":
      return { y: [0, -16, 0], transition: { duration: BEAT, repeat: Infinity, ease: "easeOut" } };
    case "spin":
      return { scaleX: [1, -1, 1], y: [0, -6, 0], transition: { duration: BEAT * 2, repeat: Infinity } };
    case "twirl":
      return who === "her"
        ? { scaleX: [1, -1, 1, -1, 1], y: [0, -10, 0, -10, 0], transition: { duration: BEAT * 4, repeat: Infinity } }
        : { rotate: [-3, 3, -3], y: [0, -6, 0], transition: { duration: BEAT * 2, repeat: Infinity } };
    case "slow":
      return { rotate: [-2.5, 2.5, -2.5], transition: { duration: BEAT * 4, repeat: Infinity, ease: "easeInOut" } };
    default:
      return { rotate: 0, y: 0, scaleX: 1, transition: { duration: 0.4 } };
  }
}

export function DateScene() {
  const look = useGameStore((s) => s.look);
  const locationId = useGameStore((s) => s.location);
  const love = useGameStore((s) => s.love);
  const addLove = useGameStore((s) => s.addLove);
  const unlockNote = useGameStore((s) => s.unlockNote);
  const addPolaroid = useGameStore((s) => s.addPolaroid);
  const setScreen = useGameStore((s) => s.setScreen);

  const loc = getLocation(locationId);

  const stageRef = useRef<HTMLDivElement>(null);
  const timers = useRef<number[]>([]);
  const moodTimer = useRef<number | undefined>(undefined);
  const speechTimer = useRef<number | undefined>(undefined);
  const rewarded = useRef(new Set<string>());
  const counters = useRef({ hug: 0, kiss: 0 });

  const [scene, setSceneState] = useState<SceneState>(INITIAL_SCENE);
  const [action, setAction] = useState<Action>("idle");
  const [mood, setMood] = useState<Mood | null>(null);
  const [speech, setSpeech] = useState<Speech | null>(() => ({ id: 1, who: "he", text: loc.arrival }));
  const [particles, setParticles] = useState<Particle[]>([]);
  const [plus, setPlus] = useState<{ id: number; n: number } | null>(null);
  const [busy, setBusy] = useState(false);
  const [talkOpen, setTalkOpen] = useState(false);
  const [talkIdx, setTalkIdx] = useState(0);
  const [flash, setFlash] = useState(false);
  const [shot, setShot] = useState<PolaroidShot | null>(null);
  const [perfectOpen, setPerfectOpen] = useState(false);
  const [phoneOpen, setPhoneOpen] = useState(false);

  useEffect(() => {
    const t = timers.current;
    speechTimer.current = window.setTimeout(() => setSpeech(null), 5200);
    return () => {
      t.forEach((id) => window.clearTimeout(id));
      window.clearTimeout(moodTimer.current);
      window.clearTimeout(speechTimer.current);
    };
  }, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  /* ---------------- Scene API (shared with activities) ---------------- */

  const say = (text: string, who: "he" | "she" = "he") => {
    setSpeech({ id: nextId(), who, text });
    window.clearTimeout(speechTimer.current);
    speechTimer.current = window.setTimeout(() => setSpeech(null), Math.max(3800, text.length * 75));
  };

  const burst = (kind: BurstKind, count = 12) => {
    const ps = makeParticles(kind, count);
    setParticles((p) => [...p, ...ps]);
    later(() => setParticles((p) => p.filter((x) => !ps.includes(x))), 2600);
  };

  const celebrate = () => {
    sfx.fanfare();
    unlockNote(loc.id);
    const heart = confetti.shapeFromText({ text: "💖", scalar: 2.4 });
    sideCannons(80);
    confetti({ particleCount: 40, spread: 100, scalar: 2.4, shapes: [heart], origin: { y: 0.5 } });
    later(() => setPerfectOpen(true), 900);
  };

  const reward = (amount: number, onceKey?: string) => {
    let n = amount;
    if (onceKey) {
      if (rewarded.current.has(onceKey)) n = Math.max(1, Math.round(amount / 3));
      rewarded.current.add(onceKey);
    }
    const { reachedPerfect } = addLove(n);
    setPlus({ id: nextId(), n });
    if (reachedPerfect) later(celebrate, 700);
  };

  const react = ({ his, her, pose, blush, ms = 2200 }: Mood & { ms?: number }) => {
    setMood({ his, her, pose, blush });
    window.clearTimeout(moodTimer.current);
    moodTimer.current = window.setTimeout(() => setMood(null), ms);
  };

  const setScene = (patch: Partial<SceneState>) => setSceneState((s) => ({ ...s, ...patch }));

  const api: SceneApi = { scene, setScene, say, reward, burst, react };

  /* ---------------- Core affection actions ---------------- */

  const hug = () => {
    if (busy) return;
    setBusy(true);
    setTalkOpen(false);
    sfx.hug();
    later(() => sfx.heartbeat(), 400);
    setAction("hug");
    react({ his: "happy", her: "happy", pose: "hug", blush: true, ms: 2700 });
    const lines = [...loc.hugLines, ...GENERIC_HUG_LINES];
    say(lines[counters.current.hug % lines.length]);
    counters.current.hug++;
    burst("gold", 14);
    reward(Math.max(4, 11 - counters.current.hug * 2));
    later(() => {
      setAction("idle");
      setBusy(false);
    }, 2700);
  };

  const kiss = () => {
    if (busy) return;
    setBusy(true);
    setTalkOpen(false);
    setAction("kiss");
    react({ his: "kiss", her: "kiss", blush: true, ms: 1500 });
    later(() => {
      sfx.kiss();
      burst("pink", 20);
      confetti({
        particleCount: 50,
        spread: 80,
        startVelocity: 30,
        origin: { y: 0.45 },
        colors: ["#f0517f", "#ffa3b9", "#ffe4ea", "#d63368"],
        shapes: [confetti.shapeFromText({ text: "💗", scalar: 2 }), "circle"],
        scalar: 1.6,
      });
    }, 650);
    later(() => {
      const lines = [...loc.kissLines, ...GENERIC_KISS_LINES];
      say(lines[counters.current.kiss % lines.length]);
      counters.current.kiss++;
      react({ his: "shy", her: "happy", blush: true, ms: 2200 });
      reward(Math.max(5, 15 - counters.current.kiss * 3));
    }, 1500);
    later(() => {
      setAction("idle");
      setBusy(false);
    }, 2600);
  };

  const talk = loc.talks[talkIdx % loc.talks.length];

  const answer = (i: number) => {
    const opt = talk.options[i];
    setTalkOpen(false);
    setBusy(true);
    sfx.pop();
    say(opt.she, "she");
    react({ her: opt.tone === "funny" ? "laugh" : "happy", ms: 1600 });
    later(() => {
      sfx.sparkle();
      say(opt.reply, "he");
      react({ his: TONE_META[opt.tone].mood, her: "happy", blush: opt.tone === "romantic", ms: 2400 });
      burst(opt.tone === "romantic" ? "pink" : opt.tone === "funny" ? "sparkle" : "gold", 10);
      reward(opt.love);
      setTalkIdx((n) => n + 1);
      setBusy(false);
    }, 1700);
  };

  const snap = async () => {
    const stage = stageRef.current;
    if (!stage) return;
    setPerfectOpen(false);
    sfx.shutter();
    setFlash(true);
    later(() => setFlash(false), 450);
    try {
      const photo = await renderStage(stage, 2);
      const now = new Date();
      const date = now.toLocaleDateString(undefined, { day: "numeric", month: "short", year: "numeric" });
      const stamp = `'${String(now.getFullYear()).slice(2)} ${String(now.getMonth() + 1).padStart(2, " ")} ${String(now.getDate()).padStart(2, "0")}`;
      const { png, jpeg } = await makePolaroid(photo, {
        caption: loc.name,
        subcaption: `me & Engineer ♡ ${date}`,
        stamp,
        fontFamily: caveat.style.fontFamily,
        love,
      });
      addPolaroid({
        id: `${now.getTime()}`,
        image: jpeg,
        location: loc.id,
        caption: loc.name,
        createdAt: now.getTime(),
        love,
      });
      reward(5, "polaroid");
      setShot({ png, filename: `date-night-${loc.id}-${now.toISOString().slice(0, 10)}.png` });
    } catch (e) {
      console.error(e);
      say("Hmm, the camera glitched. One more try? 📸");
    }
  };

  /* ---------------- Character motion ---------------- */

  const herPos =
    action === "hug" ? { x: "21%", rotate: 3 } : action === "kiss" ? { x: "8%", rotate: 6 } : scene.closer ? { x: "11%", rotate: 1 } : { x: "0%", rotate: 0 };
  const hisPos =
    action === "hug" ? { x: "-23%", rotate: -3 } : action === "kiss" ? { x: "-9%", rotate: -6 } : scene.closer ? { x: "-11%", rotate: -1 } : { x: "0%", rotate: 0 };

  const herExpr: Expression = mood?.her ?? (love >= 100 ? "happy" : "smile");
  const hisExpr: Expression = mood?.his ?? "smile";
  const blushing = !!mood?.blush || action !== "idle";
  const hisPose: EngineerPose = mood?.pose ?? (scene.hisProp ? "hold" : "idle");
  const engineerOutfit = getEngineerOutfit(loc.id, look);

  const actionBtn =
    "flex flex-1 flex-col items-center gap-0.5 rounded-2xl py-2 text-[11px] font-semibold transition active:scale-95 disabled:opacity-40 sm:text-xs";

  return (
    <motion.section className="flex h-full min-h-0 flex-col" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* header */}
      <div className="relative z-20 flex items-center gap-3 px-3 pb-2 sm:px-5">
        <div className="min-w-0 shrink-0">
          <p className="truncate text-sm font-semibold sm:text-base">
            {loc.emoji} {loc.name}
          </p>
        </div>
        <div className="relative min-w-0 flex-1">
          <LoveMeter love={love} />
          <AnimatePresence>
            {plus && (
              <motion.span
                key={plus.id}
                className="pointer-events-none absolute -bottom-6 right-12 z-30 text-sm font-bold text-blush-300 drop-shadow"
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 6 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                +{plus.n} ❤
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* stage */}
      <div ref={stageRef} className="relative min-h-0 flex-1 overflow-hidden" style={{ containerType: "size" }}>
        <div data-capture className="absolute inset-0">
          <SceneBackground id={loc.id} scene={scene} />
        </div>

        <div className="absolute inset-x-0 flex justify-center" style={coupleFrameStyle(loc.id)}>
          <div className="relative h-full aspect-[480/520]">
            {/* her */}
            <motion.div className="absolute bottom-0 left-0 h-full w-1/2" style={{ originX: 0.5, originY: 1 }} animate={herPos} transition={{ type: "spring", stiffness: 120, damping: 16 }}>
              <motion.div className="h-full w-full" style={{ originX: 0.5, originY: 1 }} animate={danceAnim(scene.dance, "her")}>
                <div data-capture className="absolute inset-0">
                  <FemaleAvatar look={look} expression={herExpr} blushing={blushing} className="h-full w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]" />
                </div>
                {scene.herProp && (
                  <motion.div key={scene.herProp} data-capture className="absolute inset-0" initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} style={{ originX: 0.75, originY: 0.65 }}>
                    <HeldProp id={scene.herProp} who="her" />
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
            {/* him */}
            <motion.div className="absolute bottom-0 right-0 h-full w-1/2" style={{ originX: 0.5, originY: 1 }} animate={hisPos} transition={{ type: "spring", stiffness: 120, damping: 16 }}>
              <motion.div className="h-full w-full" style={{ originX: 0.5, originY: 1 }} animate={danceAnim(scene.dance, "him")}>
                <div className="h-full w-full origin-bottom scale-[1.06]">
                  <div data-capture className="absolute inset-0">
                    <EngineerAvatar outfit={engineerOutfit} expression={hisExpr} blushing={blushing} pose={hisPose} className="h-full w-full drop-shadow-[0_8px_16px_rgba(0,0,0,0.35)]" />
                  </div>
                  {scene.hisProp && hisPose === "hold" && (
                    <motion.div key={scene.hisProp} data-capture className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                      <HeldProp id={scene.hisProp} who="him" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </motion.div>
            {/* foreground in the couple's frame */}
            <div data-capture className="pointer-events-none absolute inset-y-0 -left-1/4 w-[150%]">
              <SceneForeground id={loc.id} scene={scene} />
            </div>
          </div>
        </div>

        {/* particles */}
        <div className="pointer-events-none absolute inset-0">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="absolute top-[40%]"
              style={{ left: `${p.x}%`, fontSize: p.size }}
              initial={{ y: 0, x: 0, opacity: 0, scale: 0.3 }}
              animate={{ y: -p.rise, x: p.dx, opacity: [0, 1, 1, 0], scale: 1, rotate: p.rot }}
              transition={{ duration: 2.2, delay: p.delay, ease: "easeOut" }}
            >
              {p.emoji}
            </motion.span>
          ))}
        </div>

        {/* speech bubble */}
        <div className="pointer-events-none absolute inset-x-3 top-3 flex justify-center sm:top-5">
          <AnimatePresence mode="wait">
            {speech && (
              <motion.div
                key={speech.id}
                initial={{ opacity: 0, y: -10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                className={`relative max-w-md rounded-3xl px-4 py-2.5 text-sm leading-snug shadow-xl sm:text-base ${
                  speech.who === "he" ? "bg-white text-twilight-800" : "bg-blush-500 text-white"
                }`}
              >
                <span className={`mb-0.5 block text-[10px] font-bold uppercase tracking-wider ${speech.who === "he" ? "text-sky-600" : "text-blush-100"}`}>
                  {speech.who === "he" ? "Engineer ❤️" : "You"}
                </span>
                {speech.text}
                <span
                  className={`absolute -bottom-1.5 h-4 w-4 rotate-45 ${speech.who === "he" ? "right-[30%] bg-white" : "left-[30%] bg-blush-500"}`}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* scene shortcuts */}
        <div className="absolute bottom-3 right-3 z-10 flex flex-col gap-2">
          <button
            onClick={() => {
              sfx.click();
              setPhoneOpen(true);
            }}
            className="flex items-center gap-1 rounded-full bg-twilight-950/55 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur"
          >
            <MapPin size={13} /> New spot
          </button>
          <button
            onClick={() => {
              sfx.click();
              setScreen("studio");
            }}
            className="flex items-center gap-1 rounded-full bg-twilight-950/55 px-3 py-1.5 text-xs font-medium ring-1 ring-white/20 backdrop-blur"
          >
            <Shirt size={13} /> Change look
          </button>
        </div>

        <AnimatePresence>
          {flash && (
            <motion.div className="pointer-events-none absolute inset-0 bg-white" initial={{ opacity: 0.95 }} animate={{ opacity: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.45 }} />
          )}
        </AnimatePresence>
      </div>

      {/* control panel */}
      <div className="relative z-10 border-t border-white/10 bg-gradient-to-b from-twilight-800/95 to-twilight-950 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 sm:px-5">
        <div className="mx-auto max-w-3xl">
          <div className="relative mb-3">
            {loc.id === "restaurant" && <RestaurantActivity api={api} />}
            {loc.id === "bowling" && <BowlingActivity api={api} />}
            {loc.id === "club" && <ClubActivity api={api} />}
            {loc.id === "mountains" && <MountainsActivity api={api} />}
            {loc.id === "drive" && <DriveActivity api={api} />}
            {loc.id === "mall" && <MallActivity api={api} />}

            <AnimatePresence>
              {talkOpen && (
                <motion.div
                  className="absolute inset-x-0 bottom-0 z-20 rounded-2xl border border-white/15 bg-twilight-900/95 p-3 shadow-2xl backdrop-blur"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                >
                  <p className="mb-2 text-sm">
                    <span className="font-semibold text-sky-300">Engineer:</span> {talk.he}
                  </p>
                  <div className="grid gap-1.5 sm:grid-cols-3">
                    {talk.options.map((o, i) => (
                      <button
                        key={i}
                        onClick={() => answer(i)}
                        className="rounded-xl bg-white/10 px-3 py-2 text-left text-sm transition hover:bg-white/20 active:scale-[0.98]"
                      >
                        <span className="mr-1">{TONE_META[o.tone].emoji}</span>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-blush-200">{o.label}</span>
                        <span className="block leading-snug">{o.she}</span>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* action bar */}
          <div className="flex gap-2 rounded-3xl bg-black/25 p-1.5">
            <button disabled={busy} onClick={hug} className={`${actionBtn} bg-gradient-to-b from-amber-400/30 to-amber-600/20 text-amber-100`}>
              <span className="text-2xl leading-none">🤗</span>Hug
            </button>
            <button disabled={busy} onClick={kiss} className={`${actionBtn} bg-gradient-to-b from-blush-400/40 to-blush-600/25 text-blush-50`}>
              <span className="text-2xl leading-none">😘</span>Kiss
            </button>
            <button
              disabled={busy}
              onClick={() => {
                sfx.click();
                setTalkOpen((o) => !o);
              }}
              className={`${actionBtn} ${talkOpen ? "bg-sky-400/40" : "bg-gradient-to-b from-sky-400/30 to-sky-600/20"} text-sky-50`}
            >
              <MessageCircleHeart size={24} />
              Flirt / Talk
            </button>
            <button onClick={snap} className={`${actionBtn} bg-gradient-to-b from-white/25 to-white/10 text-white`}>
              <Camera size={24} />
              Polaroid
            </button>
          </div>
        </div>
      </div>

      <PolaroidModal
        shot={shot}
        onClose={() => setShot(null)}
        onAlbum={() => {
          setShot(null);
          setScreen("album");
        }}
      />
      <PerfectDateModal open={perfectOpen} location={loc} onClose={() => setPerfectOpen(false)} onSnap={snap} />
      <CallEngineerModal open={phoneOpen} onClose={() => setPhoneOpen(false)} />
    </motion.section>
  );
}
