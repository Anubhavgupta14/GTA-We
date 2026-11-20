/**
 * Tiny Web Audio synth — every sound is generated, no audio files needed.
 * The AudioContext is created lazily on the first user gesture.
 */

type Wave = OscillatorType;

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let noiseBuffer: AudioBuffer | null = null;
let muted = false;
const MASTER_VOL = 0.55;

function getCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!ctx) {
    const AC =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = muted ? 0 : MASTER_VOL;
    master.connect(ctx.destination);
  }
  if (ctx.state === "suspended") void ctx.resume();
  return ctx;
}

export function setMuted(value: boolean) {
  muted = value;
  if (ctx && master) master.gain.setTargetAtTime(value ? 0 : MASTER_VOL, ctx.currentTime, 0.05);
}

function getNoise(c: AudioContext) {
  if (!noiseBuffer) {
    noiseBuffer = c.createBuffer(1, c.sampleRate * 1.5, c.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
  }
  return noiseBuffer;
}

interface ToneOpts {
  freq: number;
  endFreq?: number;
  type?: Wave;
  at?: number;
  dur?: number;
  vol?: number;
  attack?: number;
  dest?: AudioNode;
  detune?: number;
}

function tone(c: AudioContext, o: ToneOpts) {
  const t = o.at ?? c.currentTime;
  const dur = o.dur ?? 0.2;
  const osc = c.createOscillator();
  const g = c.createGain();
  osc.type = o.type ?? "sine";
  osc.frequency.setValueAtTime(o.freq, t);
  if (o.detune) osc.detune.value = o.detune;
  if (o.endFreq) osc.frequency.exponentialRampToValueAtTime(o.endFreq, t + dur);
  const vol = o.vol ?? 0.2;
  g.gain.setValueAtTime(0.0001, t);
  g.gain.exponentialRampToValueAtTime(vol, t + (o.attack ?? 0.008));
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  osc.connect(g).connect(o.dest ?? master!);
  osc.start(t);
  osc.stop(t + dur + 0.05);
}

interface NoiseOpts {
  at?: number;
  dur?: number;
  vol?: number;
  filter?: BiquadFilterType;
  freq?: number;
  q?: number;
  dest?: AudioNode;
}

function noise(c: AudioContext, o: NoiseOpts) {
  const t = o.at ?? c.currentTime;
  const dur = o.dur ?? 0.1;
  const src = c.createBufferSource();
  src.buffer = getNoise(c);
  const f = c.createBiquadFilter();
  f.type = o.filter ?? "highpass";
  f.frequency.value = o.freq ?? 2000;
  f.Q.value = o.q ?? 0.8;
  const g = c.createGain();
  g.gain.setValueAtTime(o.vol ?? 0.2, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
  src.connect(f).connect(g).connect(o.dest ?? master!);
  src.start(t, Math.random() * 0.5);
  src.stop(t + dur + 0.05);
}

function play(fn: (c: AudioContext, t: number) => void) {
  if (muted) return;
  const c = getCtx();
  if (!c || !master) return;
  fn(c, c.currentTime);
}

/* ------------------------------------------------------------------ */
/* Sound effects                                                      */
/* ------------------------------------------------------------------ */

export const sfx = {
  click: () =>
    play((c, t) => {
      tone(c, { freq: 1200, endFreq: 900, type: "triangle", at: t, dur: 0.05, vol: 0.07 });
    }),
  select: () =>
    play((c, t) => {
      tone(c, { freq: 660, type: "sine", at: t, dur: 0.08, vol: 0.09 });
      tone(c, { freq: 990, type: "sine", at: t + 0.05, dur: 0.1, vol: 0.07 });
    }),
  pop: () =>
    play((c, t) => {
      tone(c, { freq: 380, endFreq: 980, type: "sine", at: t, dur: 0.12, vol: 0.16 });
    }),
  sparkle: () =>
    play((c, t) => {
      [1568, 2093, 2637, 3136].forEach((f, i) =>
        tone(c, { freq: f, type: "sine", at: t + i * 0.055, dur: 0.35, vol: 0.06 }),
      );
    }),
  chime: () =>
    play((c, t) => {
      [784, 988, 1175, 1568].forEach((f, i) =>
        tone(c, { freq: f, type: "triangle", at: t + i * 0.09, dur: 0.9, vol: 0.08 }),
      );
    }),
  kiss: () =>
    play((c, t) => {
      tone(c, { freq: 1400, endFreq: 420, type: "sine", at: t, dur: 0.11, vol: 0.18 });
      noise(c, { at: t, dur: 0.04, vol: 0.08, filter: "bandpass", freq: 3200 });
      tone(c, { freq: 1046, type: "sine", at: t + 0.16, dur: 0.25, vol: 0.06 });
      tone(c, { freq: 1318, type: "sine", at: t + 0.22, dur: 0.3, vol: 0.05 });
    }),
  heartbeat: () =>
    play((c, t) => {
      [0, 0.22, 0.8, 1.02].forEach((d) =>
        tone(c, { freq: 90, endFreq: 45, type: "sine", at: t + d, dur: 0.16, vol: 0.35 }),
      );
    }),
  hug: () =>
    play((c, t) => {
      [523, 659, 784].forEach((f, i) =>
        tone(c, { freq: f, type: "sine", at: t + i * 0.07, dur: 0.6, vol: 0.07, attack: 0.04 }),
      );
    }),
  shutter: () =>
    play((c, t) => {
      noise(c, { at: t, dur: 0.045, vol: 0.4, filter: "highpass", freq: 1800 });
      tone(c, { freq: 180, type: "square", at: t, dur: 0.03, vol: 0.06 });
      noise(c, { at: t + 0.09, dur: 0.06, vol: 0.3, filter: "highpass", freq: 1400 });
    }),
  clink: () =>
    play((c, t) => {
      [2637, 3520, 4186, 5274].forEach((f, i) =>
        tone(c, { freq: f, type: "sine", at: t + i * 0.004, dur: 0.9 - i * 0.12, vol: 0.06 }),
      );
      tone(c, { freq: 2794, type: "sine", at: t + 0.12, dur: 0.6, vol: 0.04 });
    }),
  pickup: () =>
    play((c, t) => {
      tone(c, { freq: 880, type: "sine", at: t, dur: 0.1, vol: 0.1 });
      tone(c, { freq: 1320, type: "sine", at: t + 0.1, dur: 0.16, vol: 0.1 });
    }),
  hangup: () =>
    play((c, t) => {
      tone(c, { freq: 660, type: "sine", at: t, dur: 0.12, vol: 0.1 });
      tone(c, { freq: 440, type: "sine", at: t + 0.12, dur: 0.18, vol: 0.1 });
    }),
  roll: () =>
    play((c, t) => {
      noise(c, { at: t, dur: 1.1, vol: 0.25, filter: "lowpass", freq: 260 });
      tone(c, { freq: 70, endFreq: 50, type: "sine", at: t, dur: 1.0, vol: 0.12, attack: 0.2 });
    }),
  pins: (strength = 1) =>
    play((c, t) => {
      for (let i = 0; i < Math.max(2, Math.round(7 * strength)); i++) {
        noise(c, { at: t + i * 0.035, dur: 0.12, vol: 0.18 * strength, filter: "bandpass", freq: 900 + i * 260, q: 4 });
      }
    }),
  cheer: () =>
    play((c, t) => {
      noise(c, { at: t, dur: 1.2, vol: 0.12, filter: "bandpass", freq: 1500, q: 0.6 });
      [523, 659, 784, 1046].forEach((f, i) =>
        tone(c, { freq: f, type: "triangle", at: t + i * 0.08, dur: 0.4, vol: 0.07 }),
      );
    }),
  fanfare: () =>
    play((c, t) => {
      const notes = [523, 659, 784, 1046, 784, 1046, 1318];
      notes.forEach((f, i) => {
        tone(c, { freq: f, type: "triangle", at: t + i * 0.11, dur: 0.45, vol: 0.09 });
        tone(c, { freq: f * 2, type: "sine", at: t + i * 0.11, dur: 0.3, vol: 0.03 });
      });
    }),
  gift: () =>
    play((c, t) => {
      noise(c, { at: t, dur: 0.25, vol: 0.08, filter: "bandpass", freq: 3000 });
      [1046, 1318, 1568, 2093, 2637].forEach((f, i) =>
        tone(c, { freq: f, type: "sine", at: t + 0.15 + i * 0.06, dur: 0.5, vol: 0.06 }),
      );
    }),
  whoosh: () =>
    play((c, t) => {
      const src = c.createBufferSource();
      src.buffer = getNoise(c);
      const f = c.createBiquadFilter();
      f.type = "bandpass";
      f.Q.value = 1.4;
      f.frequency.setValueAtTime(400, t);
      f.frequency.exponentialRampToValueAtTime(4000, t + 0.5);
      const g = c.createGain();
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.2, t + 0.2);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.6);
      src.connect(f).connect(g).connect(master!);
      src.start(t);
      src.stop(t + 0.7);
    }),
};

/** Cute marimba ringtone. Returns a stop function. */
export function startRingtone(): () => void {
  const melody = [1319, 1568, 1976, 1568, 1319, 0, 1760, 1976];
  const ringOnce = () =>
    play((c, t) => {
      melody.forEach((f, i) => {
        if (!f) return;
        tone(c, { freq: f, type: "sine", at: t + i * 0.12, dur: 0.25, vol: 0.1 });
        tone(c, { freq: f * 3, type: "sine", at: t + i * 0.12, dur: 0.08, vol: 0.02 });
      });
    });
  ringOnce();
  const id = window.setInterval(ringOnce, 1700);
  return () => window.clearInterval(id);
}

/* ------------------------------------------------------------------ */
/* Music loops (step sequencer)                                       */
/* ------------------------------------------------------------------ */

export type MusicKind = "club" | "lofi" | "synth" | "filmy" | "fire" | "lounge";

type StepFn = (c: AudioContext, step: number, t: number, out: AudioNode, stepDur: number) => void;

function kick(c: AudioContext, t: number, out: AudioNode, vol = 0.5) {
  tone(c, { freq: 150, endFreq: 42, type: "sine", at: t, dur: 0.28, vol, dest: out, attack: 0.002 });
}
function hat(c: AudioContext, t: number, out: AudioNode, vol = 0.06) {
  noise(c, { at: t, dur: 0.04, vol, filter: "highpass", freq: 7500, dest: out });
}
function snare(c: AudioContext, t: number, out: AudioNode, vol = 0.14) {
  noise(c, { at: t, dur: 0.14, vol, filter: "bandpass", freq: 1800, q: 0.7, dest: out });
  tone(c, { freq: 200, endFreq: 140, type: "triangle", at: t, dur: 0.08, vol: vol * 0.6, dest: out });
}
function pad(c: AudioContext, freqs: number[], t: number, dur: number, out: AudioNode, vol = 0.04, type: Wave = "triangle") {
  freqs.forEach((f, i) =>
    tone(c, { freq: f, type, at: t + i * 0.012, dur, vol, attack: 0.08, dest: out, detune: i % 2 ? 6 : -6 }),
  );
}

const LOFI_CHORDS = [
  [174.6, 220, 261.6, 329.6],
  [164.8, 196, 246.9, 293.7],
  [146.8, 174.6, 220, 261.6],
  [130.8, 164.8, 196, 246.9],
];

const PATTERNS: Record<MusicKind, { bpm: number; fn: StepFn; lowpass?: number }> = {
  club: {
    bpm: 124,
    lowpass: 9000,
    fn: (c, s, t, out, sd) => {
      const bar = Math.floor(s / 16) % 4;
      const roots = [55, 43.65, 65.41, 49];
      if (s % 4 === 0) kick(c, t, out, 0.55);
      if (s % 4 === 2) hat(c, t, out, 0.08);
      if (s % 16 === 4 || s % 16 === 12) snare(c, t, out, 0.12);
      if (s % 2 === 1) tone(c, { freq: roots[bar] * 2, type: "sawtooth", at: t, dur: sd * 0.9, vol: 0.05, dest: out });
      if (s % 16 === 0) pad(c, [roots[bar] * 4, roots[bar] * 5, roots[bar] * 6], t, sd * 15, out, 0.025, "sawtooth");
    },
  },
  lofi: {
    bpm: 76,
    lowpass: 1800,
    fn: (c, s, t, out, sd) => {
      const bar = Math.floor(s / 16) % 4;
      if (s % 16 === 0) pad(c, LOFI_CHORDS[bar], t, sd * 15, out, 0.05);
      if (s % 16 === 0 || s % 16 === 10) kick(c, t, out, 0.4);
      if (s % 16 === 4 || s % 16 === 12) snare(c, t, out, 0.08);
      if (s % 2 === 0) hat(c, t + (s % 4 === 2 ? sd * 0.15 : 0), out, 0.03);
      if (Math.random() < 0.18) noise(c, { at: t, dur: 0.02, vol: 0.03, filter: "highpass", freq: 3000, dest: out });
      if (s % 8 === 6 && Math.random() > 0.4) {
        const mel = LOFI_CHORDS[bar][Math.floor(Math.random() * 4)] * 2;
        tone(c, { freq: mel, type: "sine", at: t, dur: sd * 3, vol: 0.04, dest: out });
      }
    },
  },
  synth: {
    bpm: 108,
    lowpass: 3200,
    fn: (c, s, t, out, sd) => {
      const chords = [
        [220, 261.6, 329.6],
        [174.6, 220, 261.6],
        [196, 246.9, 293.7],
        [164.8, 207.7, 246.9],
      ];
      const bar = Math.floor(s / 16) % 4;
      const ch = chords[bar];
      tone(c, { freq: ch[s % 3] * (s % 6 < 3 ? 2 : 4), type: "square", at: t, dur: sd * 0.8, vol: 0.025, dest: out });
      if (s % 4 === 0) {
        kick(c, t, out, 0.4);
        tone(c, { freq: ch[0] / 2, type: "sawtooth", at: t, dur: sd * 3.5, vol: 0.05, dest: out });
      }
      if (s % 8 === 4) snare(c, t, out, 0.12);
    },
  },
  filmy: {
    bpm: 92,
    lowpass: 4000,
    fn: (c, s, t, out, sd) => {
      const scale = [261.6, 293.7, 329.6, 392, 440, 523.3, 587.3];
      const phrase = [0, 2, 3, 4, 3, 2, 1, 0, 2, 4, 5, 4, 3, 2, 3, -1];
      // tabla-ish: dha (low) / na (high)
      if (s % 8 === 0 || s % 8 === 3) tone(c, { freq: 120, endFreq: 85, type: "sine", at: t, dur: 0.22, vol: 0.28, dest: out });
      if (s % 8 === 2 || s % 8 === 6 || s % 8 === 7)
        tone(c, { freq: 620, endFreq: 560, type: "sine", at: t, dur: 0.08, vol: 0.08, dest: out });
      if (s % 2 === 0) {
        const idx = phrase[(s / 2) % phrase.length];
        if (idx >= 0) {
          tone(c, { freq: scale[idx] * 2, type: "sine", at: t, dur: sd * 2.2, vol: 0.05, attack: 0.03, dest: out });
          tone(c, { freq: scale[idx] * 4, type: "sine", at: t, dur: sd * 1.5, vol: 0.012, dest: out });
        }
      }
      if (s % 32 === 0) pad(c, [130.8, 196, 261.6], t, sd * 31, out, 0.03, "sine");
    },
  },
  fire: {
    bpm: 120,
    lowpass: 6000,
    fn: (c, s, t, out) => {
      if (s % 8 === 0) noise(c, { at: t, dur: 1.1, vol: 0.03, filter: "lowpass", freq: 500, dest: out });
      if (Math.random() < 0.35)
        noise(c, { at: t + Math.random() * 0.1, dur: 0.02 + Math.random() * 0.04, vol: 0.05 + Math.random() * 0.12, filter: "bandpass", freq: 1500 + Math.random() * 3000, q: 2, dest: out });
      if (s % 64 === 0) pad(c, [196, 246.9, 293.7], t, 6, out, 0.012, "sine");
    },
  },
  lounge: {
    bpm: 70,
    lowpass: 2400,
    fn: (c, s, t, out, sd) => {
      const chords = [
        [146.8, 185, 220, 277.2],
        [196, 246.9, 293.7, 370],
        [164.8, 207.7, 246.9, 311.1],
        [220, 277.2, 329.6, 415.3],
      ];
      const bar = Math.floor(s / 16) % 4;
      if (s % 16 === 0) pad(c, chords[bar], t, sd * 15, out, 0.04, "sine");
      if (s % 4 === 0) tone(c, { freq: chords[bar][0] / 2, type: "sine", at: t, dur: sd * 3, vol: 0.08, dest: out });
      if (s % 4 === 2) noise(c, { at: t, dur: 0.12, vol: 0.02, filter: "highpass", freq: 5000, dest: out });
      if (s % 16 === 6 || s % 16 === 11) tone(c, { freq: chords[bar][(s / 3) % 4 | 0] * 2, type: "triangle", at: t, dur: sd * 4, vol: 0.03, dest: out });
    },
  },
};

/** Starts a generated music loop. Returns a stop function. Safe to call while muted. */
export function startMusic(kind: MusicKind): () => void {
  const c = getCtx();
  if (!c || !master) return () => {};
  const { bpm, fn, lowpass } = PATTERNS[kind];
  const out = c.createGain();
  out.gain.value = 0;
  out.gain.setTargetAtTime(0.9, c.currentTime, 0.3);
  const lp = c.createBiquadFilter();
  lp.type = "lowpass";
  lp.frequency.value = lowpass ?? 8000;
  out.connect(lp).connect(master);
  const stepDur = 60 / bpm / 4;
  let next = c.currentTime + 0.08;
  let step = 0;
  const id = window.setInterval(() => {
    while (next < c.currentTime + 0.15) {
      fn(c, step, next, out, stepDur);
      next += stepDur;
      step++;
    }
  }, 30);
  return () => {
    window.clearInterval(id);
    out.gain.setTargetAtTime(0, c.currentTime, 0.15);
    window.setTimeout(() => {
      out.disconnect();
      lp.disconnect();
    }, 900);
  };
}
