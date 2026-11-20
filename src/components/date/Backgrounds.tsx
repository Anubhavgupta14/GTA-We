"use client";

import { motion } from "motion/react";
import { seeded } from "@/components/ui/Sparkles";
import type { LocationId } from "@/data/dates";
import type { SceneState } from "./sceneTypes";

/* All backgrounds: viewBox 0 0 800 600, anchored to the bottom (xMidYMax slice). */

const Twinkle = ({ dur = 2.4, begin = 0, from = 0.35 }: { dur?: number; begin?: number; from?: number }) => (
  <animate attributeName="opacity" values={`1;${from};1`} dur={`${dur}s`} begin={`${begin}s`} repeatCount="indefinite" />
);

function catenary(x1: number, x2: number, y: number, sag: number) {
  return `M${x1} ${y} Q${(x1 + x2) / 2} ${y + sag} ${x2} ${y}`;
}

function bulbsOn(x1: number, x2: number, y: number, sag: number, n: number) {
  return Array.from({ length: n }, (_, i) => {
    const t = (i + 0.5) / n;
    const x = x1 + (x2 - x1) * t;
    const yy = (1 - t) * (1 - t) * y + 2 * (1 - t) * t * (y + sag) + t * t * y;
    return [x, yy] as const;
  });
}

/* ------------------------------------------------------------------ */

function Restaurant() {
  return (
    <>
      <defs>
        <linearGradient id="rs-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3b0f22" />
          <stop offset="1" stopColor="#5a1a2c" />
        </linearGradient>
        <linearGradient id="rs-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#141238" />
          <stop offset="1" stopColor="#4a2a6a" />
        </linearGradient>
        <linearGradient id="rs-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5a2e1c" />
          <stop offset="1" stopColor="#24100a" />
        </linearGradient>
        <radialGradient id="rs-glow">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.9" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="rs-curtain" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#6e0f24" />
          <stop offset="0.5" stopColor="#a3203d" />
          <stop offset="1" stopColor="#6e0f24" />
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#rs-wall)" />
      {/* damask-ish wall pattern */}
      {Array.from({ length: 40 }, (_, i) => (
        <path
          key={i}
          d={`M${(i % 10) * 84 + 20} ${Math.floor(i / 10) * 90 + 40} l6 -10 l6 10 l-6 10 z`}
          fill="#7a2a3e"
          opacity="0.35"
        />
      ))}
      {/* window */}
      <path d="M270 400 L270 190 A130 130 0 0 1 530 190 L530 400 Z" fill="url(#rs-sky)" />
      <circle cx="455" cy="150" r="26" fill="#fff4d6" />
      <circle cx="465" cy="144" r="24" fill="url(#rs-sky)" opacity="0.9" />
      {[[280, 330, 40, 70], [320, 300, 30, 100], [352, 320, 36, 80], [390, 280, 28, 120], [420, 310, 40, 90], [462, 290, 30, 110], [492, 325, 36, 75]].map(([x, y, w, h], i) => (
        <g key={i}>
          <rect x={x} y={y} width={w} height={h} fill="#1a1236" />
          {Array.from({ length: 6 }, (_, j) => (
            <rect key={j} x={x + 5 + (j % 2) * 14} y={y + 8 + Math.floor(j / 2) * 18} width="6" height="8" fill="#ffd98a" opacity={seeded(i * 7 + j) > 0.4 ? 0.85 : 0.15} />
          ))}
        </g>
      ))}
      <path d="M270 400 L270 190 A130 130 0 0 1 530 190 L530 400 Z M400 60 L400 400 M270 260 L530 260" fill="none" stroke="#d9a55a" strokeWidth="6" />
      {/* curtains */}
      <path d="M200 40 C240 140 230 300 250 430 L300 430 C290 300 300 150 290 40 Z" fill="url(#rs-curtain)" />
      <path d="M600 40 C560 140 570 300 550 430 L500 430 C510 300 500 150 510 40 Z" fill="url(#rs-curtain)" />
      <rect x="180" y="30" width="440" height="14" rx="7" fill="#d9a55a" />
      {/* wainscot */}
      <rect x="0" y="400" width="800" height="80" fill="#3a0c1a" />
      <path d="M0 400 H800" stroke="#d9a55a" strokeWidth="3" />
      {/* sconces */}
      {[110, 690].map((x) => (
        <g key={x}>
          <circle cx={x} cy="250" r="70" fill="url(#rs-glow)" opacity="0.6" />
          <path d={`M${x - 14} 280 L${x + 14} 280 L${x + 8} 300 L${x - 8} 300 Z`} fill="#d9a55a" />
          <path d={`M${x - 18} 250 C${x - 18} 228 ${x + 18} 228 ${x + 18} 250 L${x + 12} 280 L${x - 12} 280 Z`} fill="#ffe6b0" />
        </g>
      ))}
      {/* fairy lights */}
      {[
        [0, 400, 20, 70],
        [400, 800, 20, 70],
        [-40, 840, 110, 60],
      ].map(([x1, x2, y, sag], si) => (
        <g key={si}>
          <path d={catenary(x1, x2, y, sag)} stroke="#2a1a10" strokeWidth="1.5" fill="none" />
          {bulbsOn(x1, x2, y, sag, 14).map(([x, yy], i) => (
            <g key={i}>
              <circle cx={x} cy={yy + 4} r="9" fill="url(#rs-glow)">
                <Twinkle dur={1.6 + seeded(i + si * 20) * 2} begin={seeded(i, si + 3) * 2} />
              </circle>
              <circle cx={x} cy={yy + 4} r="3" fill="#fff1c4" />
            </g>
          ))}
        </g>
      ))}
      {/* floating candles */}
      {[[150, 170], [250, 120], [560, 130], [650, 180], [340, 90], [720, 110], [80, 120]].map(([x, y], i) => (
        <g key={i}>
          <animateTransform attributeName="transform" type="translate" values={`0 0;0 -10;0 0`} dur={`${3 + seeded(i, 9) * 2}s`} begin={`${seeded(i, 4) * 2}s`} repeatCount="indefinite" />
          <circle cx={x} cy={y - 14} r="22" fill="url(#rs-glow)" opacity="0.7" />
          <rect x={x - 5} y={y - 8} width="10" height="26" rx="2" fill="#fff6e6" />
          <path d={`M${x} ${y - 22} C${x + 5} ${y - 14} ${x + 3} ${y - 9} ${x} ${y - 9} C${x - 3} ${y - 9} ${x - 5} ${y - 14} ${x} ${y - 22} Z`} fill="#ffc34d">
            <animateTransform attributeName="transform" type="scale" values="1 1;1 1.12;1 1" dur="0.5s" repeatCount="indefinite" additive="sum" />
          </path>
        </g>
      ))}
      {/* floor */}
      <rect x="0" y="480" width="800" height="120" fill="url(#rs-floor)" />
      {Array.from({ length: 9 }, (_, i) => (
        <path key={i} d={`M${i * 100 - 50} 600 L${400 + (i - 4) * 30} 480`} stroke="#000" strokeOpacity="0.2" />
      ))}
      {/* plants */}
      {[30, 770].map((x) => (
        <g key={x}>
          <path d={`M${x - 24} 520 L${x + 24} 520 L${x + 18} 480 L${x - 18} 480 Z`} fill="#8a4a2a" />
          {[-30, -12, 8, 26].map((a, j) => (
            <ellipse key={j} cx={x + a * 0.6} cy={440 - Math.abs(a)} rx="12" ry="40" fill="#2f6b4a" transform={`rotate(${a} ${x} 480)`} />
          ))}
        </g>
      ))}
    </>
  );
}

function Bowling() {
  const bottoms = [-420, -110, 200, 510, 820, 1130];
  const tops = [262, 320, 378, 436, 494, 552];
  return (
    <>
      <defs>
        <linearGradient id="bw-bg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#12062e" />
          <stop offset="1" stopColor="#2a0f4a" />
        </linearGradient>
        <linearGradient id="bw-wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#7a4a2a" />
          <stop offset="1" stopColor="#e2b07a" />
        </linearGradient>
        <filter id="bw-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#bw-bg)" />
      {/* back wall with pins area */}
      <rect x="0" y="210" width="800" height="70" fill="#1a0a36" />
      {/* scoreboard */}
      <rect x="250" y="40" width="300" height="110" rx="10" fill="#0a0420" stroke="#4ee6ff" strokeWidth="3" filter="url(#bw-glow)" />
      <text x="400" y="86" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="28" fill="#4ee6ff">LANE 7 ♥</text>
      <text x="400" y="124" textAnchor="middle" fontFamily="ui-monospace, monospace" fontSize="18" fill="#ff7ad9">
        YOU ♥ ENGINEER
        <Twinkle dur={1.2} from={0.5} />
      </text>
      {/* neon signs */}
      <g filter="url(#bw-glow)">
        <text x="110" y="120" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="46" fill="none" stroke="#ff4fd8" strokeWidth="2.5">
          Bowl
          <animate attributeName="opacity" values="1;1;0.3;1;1;0.5;1" dur="4s" repeatCount="indefinite" />
        </text>
        <text x="690" y="120" textAnchor="middle" fontFamily="Georgia, serif" fontSize="56" fill="none" stroke="#ffe14f" strokeWidth="2.5">
          ★
        </text>
      </g>
      {/* lanes */}
      {bottoms.slice(0, -1).map((b, i) => (
        <g key={i}>
          <path d={`M${b + 20} 600 L${tops[i] + 4} 280 L${tops[i + 1] - 4} 280 L${bottoms[i + 1] - 20} 600 Z`} fill="url(#bw-wood)" />
          <path d={`M${b} 600 L${tops[i]} 280 L${tops[i] + 4} 280 L${b + 20} 600 Z`} fill="#140828" />
          <path d={`M${b + 20} 600 L${tops[i] + 4} 280`} stroke={i % 2 ? "#4ee6ff" : "#ff4fd8"} strokeWidth="2" filter="url(#bw-glow)" />
          {/* pins */}
          {[0, 1, 2].map((p) => (
            <g key={p} transform={`translate(${(tops[i] + tops[i + 1]) / 2 + (p - 1) * 9} ${262 - (p === 1 ? 4 : 0)})`}>
              <path d="M0 0 C-3 -6 -2 -10 0 -14 C2 -10 3 -6 0 0 Z" fill="#fff" />
              <path d="M-1.6 -9 H1.6" stroke="#e8405f" strokeWidth="1" />
            </g>
          ))}
          {/* arrows */}
          {[0, 1, 2].map((a) => (
            <path
              key={a}
              d={`M${b + 20 + (bottoms[i + 1] - b - 40) * (0.3 + a * 0.2)} 520 l-6 12 h12 z`}
              fill="#5a3418"
              opacity="0.5"
            />
          ))}
        </g>
      ))}
      {/* overhead lights */}
      {Array.from({ length: 6 }, (_, i) => (
        <g key={i}>
          <rect x={70 + i * 130} y="180" width="70" height="8" rx="4" fill="#fff6e6" opacity="0.9" />
          <path d={`M${70 + i * 130} 188 L${40 + i * 130} 280 L${170 + i * 130} 280 L${140 + i * 130} 188 Z`} fill="#fff6e6" opacity="0.06" />
        </g>
      ))}
      <rect x="0" y="560" width="800" height="40" fill="#0c0420" opacity="0.6" />
    </>
  );
}

function Club({ dancing }: { dancing: boolean }) {
  const colors = ["#ff4fd8", "#4ee6ff", "#b6ff4f", "#ffe14f", "#a06bff"];
  return (
    <>
      <defs>
        <radialGradient id="cl-bg" cx="0.5" cy="0.3" r="0.8">
          <stop offset="0" stopColor="#3d1466" />
          <stop offset="1" stopColor="#0a0216" />
        </radialGradient>
        <radialGradient id="cl-ball" cx="0.35" cy="0.35" r="0.7">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.5" stopColor="#b8b8d8" />
          <stop offset="1" stopColor="#4a4a6a" />
        </radialGradient>
        <filter id="cl-blur">
          <feGaussianBlur stdDeviation="2" />
        </filter>
      </defs>
      <rect width="800" height="600" fill="url(#cl-bg)" />
      {/* lasers */}
      <g filter="url(#cl-blur)" opacity={dancing ? 0.85 : 0.5}>
        {Array.from({ length: dancing ? 10 : 6 }, (_, i) => {
          const ox = i % 2 ? 0 : 800;
          return (
            <line key={i} x1={ox} y1="0" x2="400" y2="560" stroke={colors[i % colors.length]} strokeWidth="3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values={`${-18 + i * 3} ${ox} 0;${14 - i * 2} ${ox} 0;${-18 + i * 3} ${ox} 0`}
                dur={`${2.4 + (i % 3) * 0.7}s`}
                repeatCount="indefinite"
              />
            </line>
          );
        })}
      </g>
      {/* disco ball */}
      <line x1="400" y1="0" x2="400" y2="40" stroke="#888" strokeWidth="2" />
      <circle cx="400" cy="80" r="42" fill="url(#cl-ball)" />
      <g stroke="#2a2a44" strokeWidth="0.8" opacity="0.6">
        {[-30, -15, 0, 15, 30].map((d) => (
          <ellipse key={d} cx="400" cy="80" rx={Math.sqrt(42 * 42 - d * d)} ry="6" transform={`translate(0 ${d})`} fill="none" />
        ))}
        {[-28, -14, 0, 14, 28].map((d) => (
          <ellipse key={`v${d}`} cx={400 + d * 0.3} cy="80" rx={Math.max(2, 42 - Math.abs(d) * 1.2)} ry="42" fill="none" />
        ))}
      </g>
      {Array.from({ length: 6 }, (_, i) => (
        <path key={i} d={`M${370 + i * 12} ${60 + (i % 3) * 14} l2 -6 l2 6 l6 2 l-6 2 l-2 6 l-2 -6 l-6 -2 z`} fill="#fff">
          <Twinkle dur={0.8 + i * 0.2} begin={i * 0.3} from={0} />
        </path>
      ))}
      {/* DJ booth */}
      <g>
        <ellipse cx="400" cy="260" rx="22" ry="26" fill="#140828" />
        <g>
          <animateTransform attributeName="transform" type="translate" values="0 0;0 4;0 0" dur="0.48s" repeatCount="indefinite" />
          <circle cx="400" cy="226" r="16" fill="#140828" />
          <path d="M382 226 C382 206 418 206 418 226" stroke="#4ee6ff" strokeWidth="3" fill="none" />
        </g>
        <rect x="320" y="270" width="160" height="60" rx="6" fill="#1c0c38" stroke="#ff4fd8" strokeWidth="2" />
        {Array.from({ length: 8 }, (_, i) => (
          <rect key={i} x={330 + i * 18} y="300" width="10" height="20" fill={colors[i % 5]}>
            <animate attributeName="height" values="4;20;8;16;4" dur={`${0.5 + (i % 3) * 0.15}s`} repeatCount="indefinite" />
          </rect>
        ))}
      </g>
      {/* speakers */}
      {[60, 690].map((x) => (
        <g key={x}>
          <rect x={x} y="220" width="50" height="140" rx="6" fill="#120826" stroke="#2a1a4a" />
          <circle cx={x + 25} cy="260" r="14" fill="#0a0418" stroke="#4ee6ff" strokeWidth="1.5" />
          <circle cx={x + 25} cy="320" r="18" fill="#0a0418" stroke="#ff4fd8" strokeWidth="1.5">
            <animate attributeName="r" values="18;20;18" dur="0.48s" repeatCount="indefinite" />
          </circle>
        </g>
      ))}
      {/* crowd */}
      {Array.from({ length: 12 }, (_, i) => (
        <g key={i}>
          <animateTransform attributeName="transform" type="translate" values={`0 0;0 ${-4 - (i % 3) * 2};0 0`} dur="0.48s" begin={`${(i % 4) * 0.12}s`} repeatCount="indefinite" />
          <circle cx={30 + i * 68} cy={378 - (i % 2) * 8} r="14" fill="#0e0520" />
          <path d={`M${12 + i * 68} 440 C${14 + i * 68} 400 ${46 + i * 68} 400 ${48 + i * 68} 440 Z`} fill="#0e0520" />
        </g>
      ))}
      {/* dance floor */}
      {Array.from({ length: 4 }, (_, row) =>
        Array.from({ length: 10 }, (_, col) => {
          const y0 = 430 + row * 42;
          const y1 = y0 + 42;
          const w0 = 600 + row * 120;
          const w1 = w0 + 120;
          const x0 = 400 - w0 / 2 + (col * w0) / 10;
          const x1 = 400 - w1 / 2 + (col * w1) / 10;
          const c = colors[(row + col) % colors.length];
          return (
            <path
              key={`${row}-${col}`}
              d={`M${x0} ${y0} L${x0 + w0 / 10} ${y0} L${x1 + w1 / 10} ${y1} L${x1} ${y1} Z`}
              fill={c}
              stroke="#0a0216"
              strokeWidth="2"
              opacity="0.25"
            >
              <animate attributeName="opacity" values="0.12;0.7;0.12" dur={`${dancing ? 0.96 : 1.92}s`} begin={`${((row * 3 + col * 7) % 8) * 0.12}s`} repeatCount="indefinite" />
            </path>
          );
        }),
      )}
    </>
  );
}

function Mountains({ shootingStar }: { shootingStar: number }) {
  return (
    <>
      <defs>
        <linearGradient id="mt-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#070b24" />
          <stop offset="0.6" stopColor="#1f1b4e" />
          <stop offset="1" stopColor="#4a3672" />
        </linearGradient>
        <radialGradient id="mt-milky">
          <stop offset="0" stopColor="#c8c0ff" stopOpacity="0.25" />
          <stop offset="1" stopColor="#c8c0ff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="mt-fireglow">
          <stop offset="0" stopColor="#ff9d3a" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff9d3a" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#mt-sky)" />
      <ellipse cx="420" cy="160" rx="460" ry="60" fill="url(#mt-milky)" transform="rotate(-18 420 160)" />
      {Array.from({ length: 90 }, (_, i) => {
        const r = 0.5 + seeded(i, 3) * 1.6;
        return (
          <circle key={i} cx={seeded(i, 1) * 800} cy={seeded(i, 2) * 330} r={r} fill="#fff">
            {i % 3 === 0 && <Twinkle dur={1.5 + seeded(i, 4) * 3} begin={seeded(i, 5) * 3} from={0.2} />}
          </circle>
        );
      })}
      {/* moon */}
      <circle cx="660" cy="90" r="34" fill="#fff6dc" />
      <circle cx="676" cy="80" r="32" fill="#141542" />
      {shootingStar > 0 && (
        <g key={shootingStar} className="shooting-star">
          <line x1="640" y1="40" x2="720" y2="0" stroke="url(#mt-milky)" strokeWidth="2" />
          <line x1="640" y1="40" x2="700" y2="10" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
          <circle cx="640" cy="40" r="3" fill="#fff" />
        </g>
      )}
      {/* far mountains */}
      <path d="M0 360 L90 260 L170 320 L270 220 L380 330 L470 240 L560 310 L660 210 L760 300 L800 270 L800 600 L0 600 Z" fill="#3a3270" />
      <path d="M270 220 L245 248 L262 244 L275 254 L292 240 Z M660 210 L636 236 L652 232 L666 242 L684 228 Z M470 240 L452 260 L470 256 L488 262 Z" fill="#e8e4ff" opacity="0.85" />
      {/* mist */}
      {[[200, 340], [600, 360]].map(([x, y], i) => (
        <ellipse key={i} cx={x} cy={y} rx="260" ry="26" fill="#d8d0ff" opacity="0.12">
          <animateTransform attributeName="transform" type="translate" values="-30 0;30 0;-30 0" dur={`${14 + i * 4}s`} repeatCount="indefinite" />
        </ellipse>
      ))}
      <path d="M0 420 L120 330 L230 400 L360 320 L480 410 L600 340 L720 400 L800 360 L800 600 L0 600 Z" fill="#241f4c" />
      {/* pines */}
      {Array.from({ length: 16 }, (_, i) => {
        const x = i * 52 + seeded(i, 6) * 20;
        const h = 50 + seeded(i, 7) * 40;
        const base = 470 - seeded(i, 8) * 30;
        return <path key={i} d={`M${x} ${base - h} L${x - h * 0.3} ${base} L${x + h * 0.3} ${base} Z`} fill="#141236" />;
      })}
      {/* tent */}
      <g>
        <path d="M600 470 L670 380 L740 470 Z" fill="#c26a3a" />
        <path d="M655 470 L670 400 L685 470 Z" fill="#ffd27a" opacity="0.9" />
        {bulbsOn(600, 740, 420, 30, 6).map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="3" fill="#ffe08a">
            <Twinkle dur={1.4} begin={i * 0.2} />
          </circle>
        ))}
      </g>
      {/* ground */}
      <path d="M0 470 C200 455 600 455 800 470 L800 600 L0 600 Z" fill="#1a1830" />
      <ellipse cx="160" cy="560" rx="300" ry="120" fill="url(#mt-fireglow)" />
    </>
  );
}

function Drive({ night }: { night: boolean }) {
  const lamps = [0, 1, 2, 3];
  return (
    <>
      <defs>
        <linearGradient id="dr-sky" x1="0" y1="0" x2="0" y2="1">
          {night ? (
            <>
              <stop offset="0" stopColor="#060a24" />
              <stop offset="0.6" stopColor="#1d1450" />
              <stop offset="1" stopColor="#4a2a72" />
            </>
          ) : (
            <>
              <stop offset="0" stopColor="#5b3a8c" />
              <stop offset="0.45" stopColor="#ff6f91" />
              <stop offset="0.8" stopColor="#ff9a62" />
              <stop offset="1" stopColor="#ffd07a" />
            </>
          )}
        </linearGradient>
        <linearGradient id="dr-sun" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff3b0" />
          <stop offset="1" stopColor="#ff7a59" />
        </linearGradient>
        <radialGradient id="dr-lamp">
          <stop offset="0" stopColor="#fff2c4" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff2c4" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#dr-sky)" />
      {night ? (
        <>
          {Array.from({ length: 60 }, (_, i) => (
            <circle key={i} cx={seeded(i, 21) * 800} cy={seeded(i, 22) * 280} r={0.5 + seeded(i, 23)} fill="#fff">
              {i % 4 === 0 && <Twinkle dur={2 + seeded(i, 24) * 2} />}
            </circle>
          ))}
          <circle cx="160" cy="110" r="30" fill="#fff6dc" />
        </>
      ) : (
        <g>
          <circle cx="400" cy="330" r="110" fill="url(#dr-sun)" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x="280" y={300 + i * 9} width="240" height={2 + i} fill="#ff6f91" opacity="0.8" />
          ))}
        </g>
      )}
      {/* city skyline */}
      <g fill={night ? "#120c30" : "#5a2a5a"}>
        {Array.from({ length: 22 }, (_, i) => {
          const w = 24 + seeded(i, 31) * 20;
          const h = 30 + seeded(i, 32) * 80;
          const x = i * 38 - 10;
          return (
            <g key={i}>
              <rect x={x} y={330 - h} width={w} height={h} />
              {night &&
                Array.from({ length: 4 }, (_, j) => (
                  <rect key={j} x={x + 4 + (j % 2) * 10} y={330 - h + 8 + Math.floor(j / 2) * 14} width="5" height="6" fill="#ffd98a" opacity={seeded(i * 4 + j, 33) > 0.5 ? 0.9 : 0.15} />
                ))}
            </g>
          );
        })}
      </g>
      {/* hills */}
      <path d="M0 340 C150 300 260 320 400 330 C540 340 650 300 800 330 L800 600 L0 600 Z" fill={night ? "#16123a" : "#7a3a6a"} />
      {/* road */}
      <path d="M380 330 L420 330 L900 600 L-100 600 Z" fill={night ? "#1c1a2a" : "#3a2a3e"} />
      <path d="M380 330 L-100 600 M420 330 L900 600" stroke="#f3e6c8" strokeWidth="3" opacity="0.7" />
      <path d="M400 330 L400 600" stroke="#ffd34d" strokeWidth="6" strokeDasharray="30 30" className="road-dash" />
      {/* passing street lamps */}
      {lamps.map((i) =>
        [-1, 1].map((side) => (
          <g key={`${i}${side}`}>
            <animateTransform
              attributeName="transform"
              type="translate"
              values={`${400 + side * 30} 330;${400 + side * 560} 700`}
              dur="3.2s"
              begin={`${-i * 0.8}s`}
              repeatCount="indefinite"
            />
            <animateTransform attributeName="transform" type="scale" values="0.08;1.8" dur="3.2s" begin={`${-i * 0.8}s`} repeatCount="indefinite" additive="sum" />
            <rect x="-3" y="-160" width="6" height="160" fill={night ? "#2a2840" : "#4a2a4a"} />
            <path d={`M0 -160 Q${-side * 20} -175 ${-side * 40} -165`} stroke={night ? "#2a2840" : "#4a2a4a"} strokeWidth="5" fill="none" />
            {night && <circle cx={-side * 40} cy="-160" r="34" fill="url(#dr-lamp)" />}
            <circle cx={-side * 40} cy="-162" r="6" fill="#fff2c4" />
          </g>
        )),
      )}
    </>
  );
}

function Mall() {
  const shops = [
    { x: 30, name: "Bloom", color: "#f48fb1", awning: "#ffffff" },
    { x: 290, name: "Sweet Co.", color: "#ffb74d", awning: "#fff3e0" },
    { x: 550, name: "Glitter", color: "#ba68c8", awning: "#f3e5f5" },
  ];
  return (
    <>
      <defs>
        <linearGradient id="ml-wall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fbe4f0" />
          <stop offset="1" stopColor="#e9c8ec" />
        </linearGradient>
        <linearGradient id="ml-floor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#f5dbe8" />
          <stop offset="1" stopColor="#caa5d2" />
        </linearGradient>
        <linearGradient id="ml-glass" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.7" />
          <stop offset="1" stopColor="#d7e8ff" stopOpacity="0.4" />
        </linearGradient>
        <radialGradient id="ml-glow">
          <stop offset="0" stopColor="#fff6d0" stopOpacity="0.9" />
          <stop offset="1" stopColor="#fff6d0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width="800" height="600" fill="url(#ml-wall)" />
      {/* upper floor */}
      <rect x="0" y="0" width="800" height="170" fill="#f3d3e6" />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={20 + i * 132} y="40" width="110" height="100" rx="8" fill="url(#ml-glass)" stroke="#e0b8d0" strokeWidth="3" />
      ))}
      <rect x="0" y="150" width="800" height="40" fill="url(#ml-glass)" stroke="#d6a8c8" strokeWidth="3" />
      {/* escalator */}
      <path d="M330 420 L470 190 L520 190 L380 420 Z" fill="#cfd8e8" />
      <path d="M330 420 L470 190 M380 420 L520 190" stroke="#9aa8c0" strokeWidth="4" />
      {/* hanging globe lights */}
      {Array.from({ length: 7 }, (_, i) => {
        const x = 60 + i * 113;
        const y = 220 + (i % 2) * 30;
        return (
          <g key={i}>
            <line x1={x} y1="190" x2={x} y2={y} stroke="#c9a0b8" />
            <circle cx={x} cy={y} r="26" fill="url(#ml-glow)">
              <Twinkle dur={2 + (i % 3)} begin={i * 0.3} from={0.5} />
            </circle>
            <circle cx={x} cy={y} r="9" fill="#fffaf0" />
          </g>
        );
      })}
      {/* shopfronts */}
      {shops.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y="260" width="220" height="210" fill={s.color} rx="6" />
          <path d={`M${s.x + 20} 470 L${s.x + 20} 340 A90 50 0 0 1 ${s.x + 200} 340 L${s.x + 200} 470 Z`} fill="url(#ml-glass)" />
          {Array.from({ length: 8 }, (_, j) => (
            <path key={j} d={`M${s.x + j * 27.5} 300 L${s.x + (j + 1) * 27.5} 300 L${s.x + (j + 0.5) * 27.5} 322 Z`} fill={j % 2 ? s.awning : s.color} stroke="#fff" strokeWidth="0.5" />
          ))}
          <rect x={s.x} y="268" width="220" height="32" fill={s.awning} />
          <text x={s.x + 110} y="292" textAnchor="middle" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fontSize="22" fill={s.color}>
            {s.name}
          </text>
          {/* mannequin / display */}
          {i === 0 && (
            <g>
              <circle cx={s.x + 80} cy="370" r="10" fill="#f6e0d8" />
              <path d={`M${s.x + 64} 470 L${s.x + 72} 386 L${s.x + 88} 386 L${s.x + 96} 470 Z`} fill="#e8405f" />
              <circle cx={s.x + 145} cy="372" r="10" fill="#f6e0d8" />
              <path d={`M${s.x + 128} 470 L${s.x + 137} 388 L${s.x + 153} 388 L${s.x + 162} 470 Z`} fill="#7e57c2" />
            </g>
          )}
          {i === 1 && (
            <g>
              {[0, 1, 2].map((k) => (
                <g key={k}>
                  <rect x={s.x + 40 + k * 50} y="420" width="40" height="40" rx="4" fill={["#e57373", "#8d6e63", "#f06292"][k]} />
                  <rect x={s.x + 58 + k * 50} y="420" width="4" height="40" fill="#fff" />
                </g>
              ))}
              <text x={s.x + 110} y="400" textAnchor="middle" fontSize="30">🍫🍬</text>
            </g>
          )}
          {i === 2 && (
            <g>
              {[0, 1, 2].map((k) => (
                <path key={k} d={`M${s.x + 70 + k * 40} 410 l8 -14 l8 14 l-8 14 z`} fill="#fff" opacity="0.9">
                  <Twinkle dur={1.6} begin={k * 0.4} from={0.3} />
                </path>
              ))}
              <rect x={s.x + 50} y="440" width="120" height="20" rx="4" fill="#4a148c" opacity="0.5" />
            </g>
          )}
        </g>
      ))}
      {/* floor */}
      <rect x="0" y="470" width="800" height="130" fill="url(#ml-floor)" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${i * 100 - 100} 600 L${400 + (i - 4.5) * 40} 470`} stroke="#fff" strokeOpacity="0.35" />
      ))}
      <path d="M0 520 H800 M0 560 H800" stroke="#fff" strokeOpacity="0.25" />
      {/* plants */}
      {[275, 525].map((x) => (
        <g key={x}>
          <rect x={x - 14} y="440" width="28" height="34" rx="4" fill="#fff" />
          {[-24, -8, 8, 24].map((a, j) => (
            <ellipse key={j} cx={x} cy="410" rx="7" ry="28" fill="#4caf7a" transform={`rotate(${a} ${x} 440)`} />
          ))}
        </g>
      ))}
    </>
  );
}

export function SceneBackground({ id, scene }: { id: LocationId; scene: SceneState }) {
  return (
    <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMax slice" className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
      {id === "restaurant" && <Restaurant />}
      {id === "bowling" && <Bowling />}
      {id === "club" && <Club dancing={scene.dance !== "none"} />}
      {id === "mountains" && <Mountains shootingStar={scene.shootingStar} />}
      {id === "drive" && <Drive night={scene.night} />}
      {id === "mall" && <Mall />}
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Foregrounds — drawn in the couple's coordinate frame                */
/* (viewBox -120 0 720 520: she is 0–240, he is 240–480)               */
/* ------------------------------------------------------------------ */

function RestaurantTable({ scene }: { scene: SceneState }) {
  return (
    <>
      <defs>
        <radialGradient id="ft-glow">
          <stop offset="0" stopColor="#ffd27a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd27a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="ft-cloth" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fffaf2" />
          <stop offset="1" stopColor="#e9dccb" />
        </linearGradient>
      </defs>
      <circle cx="240" cy="330" r="90" fill="url(#ft-glow)" />
      <path d="M-80 372 C40 352 440 352 560 372 L600 520 L-120 520 Z" fill="url(#ft-cloth)" />
      <ellipse cx="240" cy="372" rx="320" ry="26" fill="#fffdf8" />
      {[-40, 60, 160, 320, 420, 520].map((x) => (
        <path key={x} d={`M${x} 398 C${x + 6} 440 ${x - 4} 480 ${x + 4} 520`} stroke="#d8c8b4" strokeWidth="2" fill="none" />
      ))}
      <path d="M-80 380 C40 400 440 400 560 380" stroke="#c9102e" strokeWidth="6" fill="none" opacity="0.8" />
      {/* plates */}
      {[110, 370].map((x, i) => (
        <g key={x}>
          <ellipse cx={x} cy="372" rx="44" ry="12" fill="#fff" stroke="#e2d6c6" strokeWidth="2" />
          <ellipse cx={x} cy="372" rx="30" ry="7" fill="none" stroke="#d9a55a" strokeWidth="1" />
          {scene.dishes[i] && (
            <text x={x} y="374" textAnchor="middle" fontSize="34">
              {scene.dishes[i]}
            </text>
          )}
        </g>
      ))}
      {/* candle + rose */}
      <rect x="226" y="322" width="10" height="46" rx="2" fill="#fff6e6" />
      <path d="M231 304 C238 314 236 322 231 322 C226 322 224 314 231 304 Z" fill="#ffc34d">
        <animateTransform attributeName="transform" type="scale" values="1 1;1.04 1.1;1 1" dur="0.6s" repeatCount="indefinite" additive="sum" />
      </path>
      <rect x="216" y="364" width="30" height="8" rx="3" fill="#d9a55a" />
      <path d="M256 368 L256 334" stroke="#3a7a4a" strokeWidth="2" />
      <circle cx="256" cy="330" r="7" fill="#d81b3c" />
      <path d="M252 328 C254 324 258 324 260 328" stroke="#8a0a1f" strokeWidth="1.2" fill="none" />
      {/* wine glasses (clink!) */}
      {[
        { x: 170, dir: 1 },
        { x: 310, dir: -1 },
      ].map(({ x, dir }) => (
        <motion.g
          key={`${x}-${scene.clink}`}
          initial={false}
          animate={scene.clink ? { x: [0, dir * 46, dir * 40, 0], rotate: [0, dir * 10, dir * 6, 0] } : {}}
          transition={{ duration: 1.1, times: [0, 0.35, 0.5, 1] }}
          style={{ originX: 0.5, originY: 1 }}
        >
          <path d={`M${x - 12} 320 C${x - 12} 344 ${x + 12} 344 ${x + 12} 320 Z`} fill="#fff" fillOpacity="0.35" stroke="#fff" strokeOpacity="0.8" />
          <path d={`M${x - 10} 330 C${x - 9} 342 ${x + 9} 342 ${x + 10} 330 Z`} fill="#9b1030" />
          <path d={`M${x} 340 L${x} 364 M${x - 9} 366 L${x + 9} 366`} stroke="#fff" strokeOpacity="0.8" strokeWidth="2" />
        </motion.g>
      ))}
    </>
  );
}

function Convertible() {
  return (
    <>
      <defs>
        <linearGradient id="cv-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ff5a74" />
          <stop offset="0.5" stopColor="#d81b3c" />
          <stop offset="1" stopColor="#7a0a1f" />
        </linearGradient>
        <radialGradient id="cv-light">
          <stop offset="0" stopColor="#fffbe6" />
          <stop offset="0.5" stopColor="#fff2b0" stopOpacity="0.7" />
          <stop offset="1" stopColor="#fff2b0" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* windshield */}
      <path d="M30 258 L450 258 L478 330 L2 330 Z" fill="#dff1ff" fillOpacity="0.16" />
      <path d="M90 270 L150 270 L60 326 L20 326 Z" fill="#fff" opacity="0.15" />
      <path d="M30 258 L450 258 L478 330 M2 330 L30 258" stroke="#e8e8f0" strokeWidth="6" fill="none" strokeLinejoin="round" />
      {/* mirrors */}
      <ellipse cx="-36" cy="318" rx="22" ry="14" fill="#c9102e" stroke="#e8e8f0" strokeWidth="3" />
      <ellipse cx="516" cy="318" rx="22" ry="14" fill="#c9102e" stroke="#e8e8f0" strokeWidth="3" />
      {/* body */}
      <path d="M-120 368 C-60 334 540 334 600 368 L600 520 L-120 520 Z" fill="url(#cv-body)" />
      <path d="M-40 352 C80 342 400 342 520 352" stroke="#ffd0d8" strokeWidth="3" fill="none" opacity="0.7" />
      <path d="M160 360 C200 380 280 380 320 360" stroke="#7a0a1f" strokeWidth="2" fill="none" opacity="0.6" />
      {/* headlights */}
      {[-30, 510].map((x) => (
        <g key={x}>
          <circle cx={x} cy="420" r="70" fill="url(#cv-light)" opacity="0.6" />
          <circle cx={x} cy="420" r="30" fill="#fff8e1" stroke="#e8e8f0" strokeWidth="5" />
          <circle cx={x - 8} cy="412" r="8" fill="#fff" />
        </g>
      ))}
      {/* grille */}
      <rect x="150" y="420" width="180" height="50" rx="22" fill="#2a1a22" stroke="#e8e8f0" strokeWidth="5" />
      {[170, 190, 210, 230, 250, 270, 290, 310].map((x) => (
        <path key={x} d={`M${x} 428 L${x} 462`} stroke="#8a8a9a" strokeWidth="3" />
      ))}
      <path d="M240 400 C234 392 222 396 226 404 C230 410 240 414 240 414 C240 414 250 410 254 404 C258 396 246 392 240 400 Z" fill="#e8e8f0" />
      {/* plate */}
      <rect x="190" y="484" width="100" height="28" rx="4" fill="#fffdf2" stroke="#2a1a22" strokeWidth="2" />
      <text x="240" y="504" textAnchor="middle" fontFamily="ui-monospace, monospace" fontWeight="700" fontSize="16" fill="#2a1a22">
        ENGR ♥ 143
      </text>
    </>
  );
}

function Bonfire({ blanket }: { blanket: boolean }) {
  return (
    <>
      <defs>
        <radialGradient id="bf-glow">
          <stop offset="0" stopColor="#ffb547" stopOpacity="0.85" />
          <stop offset="1" stopColor="#ff6a1a" stopOpacity="0" />
        </radialGradient>
        <pattern id="bf-plaid" width="24" height="24" patternUnits="userSpaceOnUse">
          <rect width="24" height="24" fill="#b23a48" />
          <rect y="9" width="24" height="6" fill="#f6e7d0" opacity="0.6" />
          <rect x="9" width="6" height="24" fill="#f6e7d0" opacity="0.45" />
          <path d="M0 3 H24 M3 0 V24" stroke="#3a1a20" strokeWidth="1" opacity="0.5" />
        </pattern>
      </defs>
      {blanket && (
        <g>
          <path
            d="M66 236 C80 204 150 196 200 212 C240 224 280 206 330 200 C380 196 414 214 420 246 L428 396 C340 414 140 414 58 396 Z"
            fill="url(#bf-plaid)"
          />
          <path d="M66 236 C80 204 150 196 200 212 C240 224 280 206 330 200 C380 196 414 214 420 246" stroke="#7a1f2c" strokeWidth="4" fill="none" />
          <path d="M140 230 C150 300 146 360 150 404 M330 224 C326 300 334 360 330 406" stroke="#7a1f2c" strokeWidth="2" opacity="0.4" fill="none" />
          {Array.from({ length: 30 }, (_, i) => (
            <path key={i} d={`M${62 + i * 12.2} ${398 + Math.sin(i) * 2} l0 10`} stroke="#b23a48" strokeWidth="2.4" />
          ))}
        </g>
      )}
      <g transform="translate(-60 0)">
        <ellipse cx="0" cy="470" rx="120" ry="80" fill="url(#bf-glow)" />
        <path d="M-50 506 L46 486 M-46 486 L50 506" stroke="#5a3418" strokeWidth="14" strokeLinecap="round" />
        {[
          ["#ff6a1a", 1, 0],
          ["#ffb547", 0.75, 0.15],
          ["#fff2b0", 0.45, 0.3],
        ].map(([c, s, d], i) => (
          <path
            key={i}
            d={`M0 ${500 - 90 * (s as number)} C${30 * (s as number)} ${500 - 50 * (s as number)} ${36 * (s as number)} 496 0 498 C${-36 * (s as number)} 496 ${-30 * (s as number)} ${500 - 50 * (s as number)} 0 ${500 - 90 * (s as number)} Z`}
            fill={c as string}
          >
            <animateTransform attributeName="transform" type="skewX" values="0;6;-5;0" dur={`${0.7 + (d as number)}s`} repeatCount="indefinite" />
          </path>
        ))}
        {[0, 1, 2, 3].map((i) => (
          <circle key={i} cx={(i - 1.5) * 10} cy="420" r="2" fill="#ffd27a">
            <animate attributeName="cy" values="440;360" dur={`${1.4 + i * 0.3}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
            <animate attributeName="opacity" values="1;0" dur={`${1.4 + i * 0.3}s`} begin={`${i * 0.4}s`} repeatCount="indefinite" />
          </circle>
        ))}
      </g>
    </>
  );
}

export function SceneForeground({ id, scene }: { id: LocationId; scene: SceneState }) {
  if (id !== "restaurant" && id !== "drive" && id !== "mountains") return null;
  return (
    <svg viewBox="-120 0 720 520" preserveAspectRatio="xMidYMax meet" className="h-full w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
      {id === "restaurant" && <RestaurantTable scene={scene} />}
      {id === "drive" && <Convertible />}
      {id === "mountains" && <Bonfire blanket={scene.blanket} />}
    </svg>
  );
}

/**
 * Where the couple stands, per location.
 * `height` is % of stage height (capped by stage width so the couple keeps its aspect);
 * `sink` pushes the couple below the stage edge (as a fraction of their height) so tables/cars cover their legs.
 */
export const STAGE_LAYOUT: Record<LocationId, { height: number; sink: number }> = {
  restaurant: { height: 104, sink: 0.27 },
  bowling: { height: 86, sink: -0.01 },
  club: { height: 86, sink: -0.01 },
  mountains: { height: 86, sink: -0.01 },
  drive: { height: 108, sink: 0.2 },
  mall: { height: 86, sink: -0.01 },
};

export function coupleFrameStyle(id: LocationId) {
  const { height, sink } = STAGE_LAYOUT[id];
  const h = `min(${height}cqh, 104cqw)`;
  return { height: h, bottom: `calc(${-sink} * ${h})` };
}
