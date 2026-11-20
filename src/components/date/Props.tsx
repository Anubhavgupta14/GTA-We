import { sparkleStar } from "@/components/character/parts/Face";
import type { PropId } from "./sceneTypes";

/** Each prop is drawn centred on (0,0), roughly 60 units tall, bottom at y≈20. */
export function PropArt({ id }: { id: PropId }) {
  switch (id) {
    case "chai":
      return (
        <g>
          <path d="M-12 -14 L12 -14 L9 14 L-9 14 Z" fill="#fff" fillOpacity="0.55" stroke="#fff" strokeWidth="1.5" />
          <path d="M-11 -6 L11 -6 L9 13 L-9 13 Z" fill="#c68a4e" />
          <ellipse cx="0" cy="18" rx="18" ry="4" fill="#f4ede2" stroke="#d6c8b0" />
          <Steam />
        </g>
      );
    case "coffee":
      return (
        <g>
          <path d="M-13 -14 L13 -14 L11 16 L-11 16 Z" fill="#f06292" />
          <path d="M13 -8 C24 -8 24 8 12 8" stroke="#f06292" strokeWidth="4" fill="none" />
          <ellipse cx="0" cy="-14" rx="13" ry="3.5" fill="#6d4c3d" />
          <path d="M-5 0 C-5 -4 0 -4 0 0 C0 -4 5 -4 5 0 C5 4 0 7 0 7 C0 7 -5 4 -5 0 Z" fill="#fff" />
          <Steam />
        </g>
      );
    case "flowers":
      return (
        <g transform="rotate(-12)">
          <path d="M-18 -10 L18 -10 L4 40 L-4 40 Z" fill="#f8bbd0" stroke="#f48fb1" />
          <path d="M-18 -10 L0 6 L18 -10" fill="#fce4ec" />
          {[
            [-12, -20, "#e91e63"],
            [0, -28, "#f06292"],
            [12, -20, "#e91e63"],
            [-6, -12, "#ff80ab"],
            [7, -11, "#ad1457"],
          ].map(([x, y, c], i) => (
            <g key={i}>
              <circle cx={x as number} cy={y as number} r="8" fill={c as string} />
              <path d={`M${(x as number) - 4} ${y} C${(x as number) - 2} ${(y as number) - 5} ${(x as number) + 3} ${(y as number) - 4} ${(x as number) + 3} ${y}`} stroke="#fff" strokeOpacity="0.4" fill="none" />
            </g>
          ))}
          <ellipse cx="-20" cy="-6" rx="4" ry="9" fill="#66bb6a" transform="rotate(-40 -20 -6)" />
          <ellipse cx="20" cy="-6" rx="4" ry="9" fill="#66bb6a" transform="rotate(40 20 -6)" />
          <path d="M-6 22 L6 22" stroke="#f5c451" strokeWidth="4" />
        </g>
      );
    case "chocolates":
      return (
        <g>
          <path d="M0 -6 C-6 -20 -28 -18 -26 -2 C-24 12 0 24 0 24 C0 24 24 12 26 -2 C28 -18 6 -20 0 -6 Z" fill="#c2185b" stroke="#880e4f" strokeWidth="1.5" />
          <path d="M-26 -2 C-10 4 10 4 26 -2" stroke="#f5c451" strokeWidth="3" fill="none" />
          <path d="M0 -6 L0 24" stroke="#f5c451" strokeWidth="3" />
          <path d="M0 -4 C-8 -14 -14 -8 -6 -4 Z M0 -4 C8 -14 14 -8 6 -4 Z" fill="#f5c451" />
        </g>
      );
    case "plushie":
      return (
        <g>
          <circle cx="-11" cy="-24" r="6" fill="#a1755a" />
          <circle cx="11" cy="-24" r="6" fill="#a1755a" />
          <circle cx="0" cy="-14" r="14" fill="#b98a6a" />
          <ellipse cx="0" cy="12" rx="15" ry="14" fill="#b98a6a" />
          <ellipse cx="0" cy="-9" rx="6" ry="4.5" fill="#e8d0b8" />
          <circle cx="-5" cy="-17" r="1.8" fill="#2a1a10" />
          <circle cx="5" cy="-17" r="1.8" fill="#2a1a10" />
          <circle cx="0" cy="-10" r="1.6" fill="#2a1a10" />
          <path d="M0 6 C-4 0 -10 4 -6 9 C-3 12 0 14 0 14 C0 14 3 12 6 9 C10 4 4 0 0 6 Z" fill="#e8405f" />
          <path d="M-8 -3 L0 2 L8 -3" stroke="#e8405f" strokeWidth="3" fill="none" />
        </g>
      );
    case "jewelry":
      return (
        <g>
          <rect x="-16" y="0" width="32" height="18" rx="4" fill="#7b1fa2" />
          <path d="M-16 0 L-12 -18 L12 -18 L16 0 Z" fill="#9c27b0" />
          <rect x="-12" y="2" width="24" height="10" rx="3" fill="#f3e5f5" />
          <circle cx="0" cy="4" r="6" fill="none" stroke="#f5c451" strokeWidth="2.4" />
          <path d="M-4 -3 L0 -8 L4 -3 L0 0 Z" fill="#e1f5fe" stroke="#81d4fa" strokeWidth="0.6" />
          <path d={sparkleStar(8, -10, 5)} fill="#fff" />
        </g>
      );
    case "milkshake":
      return (
        <g>
          <path d="M-12 -12 L12 -12 L8 20 L-8 20 Z" fill="#fff" fillOpacity="0.5" stroke="#fff" />
          <path d="M-11 -6 L11 -6 L8 19 L-8 19 Z" fill="#f8bbd0" />
          <path d="M-13 -12 C-14 -20 -6 -24 0 -20 C6 -26 16 -20 13 -12 Z" fill="#fffaf2" />
          <circle cx="3" cy="-24" r="3.5" fill="#d81b3c" />
          <path d="M-4 -20 L-10 -40 M2 -20 L10 -40" stroke="#4ee6ff" strokeWidth="2.4" />
        </g>
      );
    case "marshmallow":
      return (
        <g>
          <path d="M-2 20 L22 -30" stroke="#8d6e63" strokeWidth="2.4" />
          <rect x="12" y="-36" width="14" height="12" rx="4" fill="#f6e3c6" transform="rotate(-25 19 -30)" />
          <rect x="12" y="-36" width="14" height="5" rx="2" fill="#c68a4e" transform="rotate(-25 19 -30)" />
        </g>
      );
    case "wine":
      return (
        <g>
          <path d="M-10 -20 C-10 0 10 0 10 -20 Z" fill="#fff" fillOpacity="0.35" stroke="#fff" />
          <path d="M-9 -12 C-8 -2 8 -2 9 -12 Z" fill="#9b1030" />
          <path d="M0 -4 L0 18 M-8 20 L8 20" stroke="#fff" strokeWidth="2" />
        </g>
      );
  }
}

function Steam() {
  return (
    <g stroke="#fff" strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.7">
      {[-5, 4].map((x, i) => (
        <path key={x} d={`M${x} -18 C${x - 4} -24 ${x + 4} -28 ${x} -34`}>
          <animate attributeName="opacity" values="0;0.9;0" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
          <animateTransform attributeName="transform" type="translate" values="0 2;0 -6" dur="2s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
        </path>
      ))}
    </g>
  );
}

/** Overlay with the prop placed at the character's hand (same 240×520 frame as the avatar). */
export function HeldProp({ id, who }: { id: PropId; who: "her" | "him" }) {
  const [x, y] = who === "her" ? [180, 330] : [54, 340];
  return (
    <svg viewBox="0 0 240 520" className="h-full w-full overflow-visible" xmlns="http://www.w3.org/2000/svg">
      <g transform={`translate(${x} ${y}) scale(1.15)`}>
        <PropArt id={id} />
      </g>
    </svg>
  );
}

export function PropIcon({ id, className }: { id: PropId; className?: string }) {
  return (
    <svg viewBox="-34 -46 68 72" className={className} xmlns="http://www.w3.org/2000/svg">
      <PropArt id={id} />
    </svg>
  );
}
