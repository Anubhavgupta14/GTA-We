import type { BagId, EarringId, NecklaceId, SunglassesId, WatchId } from "@/data/wardrobe";
import { sparkleStar } from "./Face";
import { Both } from "./shared";

const GOLD = "#e9b949";
const GOLD_DARK = "#b8862b";

export function Earrings({ id }: { id: EarringId }) {
  switch (id) {
    case "hoops":
      return (
        <Both>
          <circle cx="74" cy="141" r="8.5" fill="none" stroke={GOLD} strokeWidth="2.2" />
          <path d="M67 137 A8.5 8.5 0 0 1 72 133" stroke="#fff6c9" strokeWidth="1" fill="none" />
        </Both>
      );
    case "jhumkas":
      return (
        <Both>
          <g>
            <animateTransform attributeName="transform" type="rotate" values="-4 75 131;4 75 131;-4 75 131" dur="2.4s" repeatCount="indefinite" />
            <circle cx="75" cy="133" r="2.4" fill={GOLD} />
            <path d="M75 135 L75 139" stroke={GOLD} strokeWidth="1.2" />
            <path d="M67.5 148 C67.5 141 70.5 138.5 75 138.5 C79.5 138.5 82.5 141 82.5 148 Z" fill={GOLD} stroke={GOLD_DARK} strokeWidth="0.6" />
            <circle cx="75" cy="143.5" r="1.4" fill="#c2185b" />
            {[68.5, 71.5, 75, 78.5, 81.5].map((x) => (
              <circle key={x} cx={x} cy="150" r="1.3" fill="#fffaf0" stroke="#e6dcc4" strokeWidth="0.3" />
            ))}
          </g>
        </Both>
      );
    case "studs":
      return (
        <Both>
          <path d={sparkleStar(75, 131, 3.2)} fill="#eaf7ff" />
          <circle cx="75" cy="131" r="1.6" fill="#fff" />
        </Both>
      );
    case "pearls":
      return (
        <Both>
          <circle cx="75" cy="131" r="1.4" fill={GOLD} />
          <path d="M75 132.4 L75 137" stroke={GOLD} strokeWidth="1" />
          <ellipse cx="75" cy="141" rx="3.6" ry="4.2" fill="#fffaf2" stroke="#e8dcc8" strokeWidth="0.5" />
          <circle cx="73.8" cy="139.6" r="1" fill="#fff" />
        </Both>
      );
    default:
      return null;
  }
}

export function Necklace({ id }: { id: NecklaceId }) {
  switch (id) {
    case "pearlStrand": {
      const pts = Array.from({ length: 15 }, (_, i) => {
        const t = i / 14;
        const x = 104 + t * 32;
        const y = 190 + Math.sin(t * Math.PI) * 20;
        return [x, y] as const;
      });
      return (
        <g>
          {pts.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="2.2" fill="#fffaf2" stroke="#e6d9c3" strokeWidth="0.4" />
              <circle cx={x - 0.6} cy={y - 0.7} r="0.6" fill="#fff" />
            </g>
          ))}
        </g>
      );
    }
    case "heartPendant":
      return (
        <g>
          <path d="M106 190 C110 206 130 206 134 190" stroke={GOLD} strokeWidth="0.9" fill="none" />
          <path d="M120 206 C117 202 112 204 113.5 208.5 C115 212 120 214.5 120 214.5 C120 214.5 125 212 126.5 208.5 C128 204 123 202 120 206 Z" fill="#e8405f" stroke={GOLD} strokeWidth="0.9" />
          <circle cx="117" cy="207" r="0.9" fill="#fff" opacity="0.8" />
        </g>
      );
    case "choker":
      return (
        <g>
          <path d="M107.5 176 C114 180 126 180 132.5 176 L132.5 182 C126 186 114 186 107.5 182 Z" fill="#2a1a2a" />
          <path d={sparkleStar(120, 184, 3.2)} fill="#f5d6ff" />
        </g>
      );
    case "kundan":
      return (
        <g>
          <path d="M104 188 C106 214 134 214 136 188 L132 188 C130 206 110 206 108 188 Z" fill={GOLD} stroke={GOLD_DARK} strokeWidth="0.5" />
          {[[108, 196], [113, 203], [120, 206], [127, 203], [132, 196]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="2.2" fill={i % 2 ? "#2e7d32" : "#c2185b"} stroke="#fff6c9" strokeWidth="0.6" />
              <circle cx={x} cy={y + 4.5} r="1.1" fill="#fffaf2" />
            </g>
          ))}
          <path d="M120 208 L116 216 L120 222 L124 216 Z" fill="#c2185b" stroke={GOLD} strokeWidth="1" />
          <circle cx="120" cy="225" r="1.6" fill="#fffaf2" />
        </g>
      );
    default:
      return null;
  }
}

export function Bag({ id }: { id: BagId }) {
  switch (id) {
    case "clutch":
      return (
        <g transform="rotate(-12 180 346)">
          <rect x="164" y="336" width="34" height="20" rx="4" fill="#f5d0dc" stroke="#d99ab0" strokeWidth="0.8" />
          <path d="M164 342 L198 342 L181 352 Z" fill="#efbccd" />
          <circle cx="181" cy="347" r="2.4" fill={GOLD} />
        </g>
      );
    case "chainSling":
      return (
        <g>
          <path d="M86 200 L150 292" stroke={GOLD} strokeWidth="1.6" strokeDasharray="2.4 1.6" />
          <rect x="138" y="286" width="30" height="22" rx="5" fill="#1d1719" />
          <path d="M138 294 L168 294" stroke="#3a3238" />
          <rect x="149" y="291" width="8" height="5" rx="1.5" fill={GOLD} />
        </g>
      );
    case "potli":
      return (
        <g>
          <path d="M178 344 L182 360" stroke={GOLD} strokeWidth="1.4" />
          <path d="M172 364 C168 372 168 386 176 392 C182 396 190 394 194 388 C200 380 198 368 192 362 Z" fill="#c2185b" />
          <path d="M172 364 C178 358 188 358 192 362 C186 366 178 366 172 364 Z" fill="#e2477e" />
          <path d="M174 366 C180 369 186 369 192 365" stroke={GOLD} strokeWidth="1.8" fill="none" />
          <GoldBeads />
        </g>
      );
    case "tote":
      return (
        <g>
          <path d="M52 268 C52 252 74 252 74 268" stroke="#c9a77a" strokeWidth="2.6" fill="none" />
          <path d="M40 280 L86 280 L82 336 L44 336 Z" fill="#f3ead8" stroke="#d6c7a8" strokeWidth="0.8" />
          <path d="M54 300 C54 296 60 294 63 299 C66 294 72 296 72 300 C72 306 63 312 63 312 C63 312 54 306 54 300 Z" fill="#f06292" />
        </g>
      );
    default:
      return null;
  }
}

function GoldBeads() {
  return (
    <g fill={GOLD}>
      <circle cx="176" cy="384" r="1.2" />
      <circle cx="183" cy="388" r="1.2" />
      <circle cx="190" cy="384" r="1.2" />
      <circle cx="183" cy="378" r="1.6" fill="#fff6c9" />
    </g>
  );
}

export function Watch({ id }: { id: WatchId }) {
  if (id === "none") return null;
  const band = id === "gold" ? GOLD : id === "roseGold" ? "#e7a99a" : "#2a2a32";
  return (
    <g>
      <path d="M54.5 318 L69 319 L68.8 325 L54.6 324 Z" fill={band} />
      {id === "smart" ? (
        <rect x="56" y="315.5" width="11" height="12" rx="3" fill="#111" stroke="#555" strokeWidth="0.6" />
      ) : (
        <circle cx="61.8" cy="321.5" r="5" fill="#fff8ec" stroke={band} strokeWidth="1.6" />
      )}
      {id === "smart" ? (
        <path d="M59 321 C60 319 62 319 61.5 321.5 C61 319 63.5 319 64 321 C64.5 323 61.5 325 61.5 325 C61.5 325 58.5 323 59 321 Z" fill="#ff5c8a" />
      ) : (
        <path d="M61.8 321.5 L61.8 318.6 M61.8 321.5 L63.8 322.4" stroke="#333" strokeWidth="0.6" />
      )}
    </g>
  );
}

export function Sunglasses({ id }: { id: SunglassesId }) {
  if (id === "none") return null;
  // perched on top of the head
  if (id === "heart") {
    const heart = (x: number) =>
      `M${x} 72 C${x - 3} 66 ${x - 13} 66 ${x - 12} 74 C${x - 11} 80 ${x} 86 ${x} 86 C${x} 86 ${x + 11} 80 ${x + 12} 74 C${x + 13} 66 ${x + 3} 66 ${x} 72 Z`;
    return (
      <g>
        <path d="M108 74 C114 70 126 70 132 74" stroke="#d81b60" strokeWidth="2" fill="none" />
        <path d={heart(97)} fill="#ff4f8b" fillOpacity="0.85" stroke="#d81b60" strokeWidth="2" />
        <path d={heart(143)} fill="#ff4f8b" fillOpacity="0.85" stroke="#d81b60" strokeWidth="2" />
        <path d="M90 72 L94 70" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" />
      </g>
    );
  }
  const frame = id === "aviator" ? GOLD_DARK : "#1d1719";
  const lens = id === "aviator" ? "#6d4c3d" : "#2a1f2a";
  return (
    <g>
      <path d="M78 74 C80 70 84 68 86 68 M162 74 C160 70 156 68 154 68" stroke={frame} strokeWidth="2" fill="none" />
      {id === "catEye" ? (
        <Both>
          <path d="M84 68 C92 64 106 64 114 70 C112 80 104 84 96 83 C88 82 84 76 84 68 Z" fill={lens} fillOpacity="0.9" stroke={frame} strokeWidth="2.4" />
          <path d="M84 68 L80 63" stroke={frame} strokeWidth="2.4" strokeLinecap="round" />
          <path d="M90 70 L96 68" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
        </Both>
      ) : (
        <Both>
          <path d="M86 68 C94 66 108 66 113 70 C113 80 106 88 98 88 C90 88 85 80 86 68 Z" fill={lens} fillOpacity="0.8" stroke={frame} strokeWidth="1.6" />
          <path d="M91 72 L97 70" stroke="#fff" strokeWidth="1.3" strokeLinecap="round" opacity="0.7" />
        </Both>
      )}
      <path d="M113 71 C117 68 123 68 127 71" stroke={frame} strokeWidth="2" fill="none" />
    </g>
  );
}
