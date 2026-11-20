"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";
import type { EngineerOutfitId } from "@/data/dates";
import { sparkleStar, type Expression } from "./parts/Face";
import { Both, M, Mirror, VIEWBOXES, useSvgUid, type AvatarView } from "./parts/shared";

export type EngineerPose = "idle" | "hug" | "cheer" | "wave" | "hold";

export interface EngineerAvatarProps {
  outfit?: EngineerOutfitId;
  view?: AvatarView;
  animated?: boolean;
  expression?: Expression;
  blushing?: boolean;
  pose?: EngineerPose;
  className?: string;
}

const SKIN = { base: "#d8a27c", shade: "#b47c58", light: "#eec3a0" };
const HAIR = { base: "#2b1c15", shade: "#140c08", shine: "#5a4034" };

/* ------------------------------------------------------------------ */
/* Outfits                                                            */
/* ------------------------------------------------------------------ */

interface EngineerLook {
  pants: string;
  pantsShade: string;
  shoes: "sneakers" | "oxfords" | "boots" | "mojari";
  sleeve: string;
  sleeveEnd: number;
  cuff?: string;
  torso: (uid: string) => ReactNode;
  hat?: ReactNode;
  kurtaHem?: boolean;
}

const TORSO = M.torso;

function TorsoFill({ fill, uid }: { fill: string; uid: string }) {
  return (
    <>
      <path d={TORSO} fill={fill} />
      <path d={TORSO} fill={`url(#${uid}-mshade)`} />
    </>
  );
}

const Collar = ({ fill, stroke }: { fill: string; stroke?: string }) => (
  <Both>
    <path d="M106 192 L96 214 L114 206 L120 214 Z" fill={fill} stroke={stroke} strokeWidth="0.8" />
  </Both>
);

const Buttons = ({ from = 214, to = 310, color = "#fff" }: { from?: number; to?: number; color?: string }) => (
  <g fill={color}>
    {Array.from({ length: Math.floor((to - from) / 22) + 1 }, (_, i) => (
      <circle key={i} cx="120" cy={from + i * 22} r="1.6" />
    ))}
  </g>
);

const LOOKS: Record<EngineerOutfitId, EngineerLook> = {
  casual: {
    pants: "#d9c7a5",
    pantsShade: "#b8a47e",
    shoes: "sneakers",
    sleeve: "#9cc4ec",
    sleeveEnd: 292,
    cuff: "#86b2df",
    torso: (uid) => (
      <g>
        <TorsoFill fill="#9cc4ec" uid={uid} />
        <path d="M120 200 L120 326" stroke="#7aa4d0" strokeWidth="1.2" />
        <Buttons />
        <Collar fill="#b4d4f4" stroke="#7aa4d0" />
        <path d="M84 322 L156 322" stroke="#6b4a2c" strokeWidth="5" />
        <rect x="115" y="318" width="10" height="8" rx="1.5" fill="none" stroke="#c9a14a" strokeWidth="1.5" />
      </g>
    ),
  },
  blazer: {
    pants: "#24304f",
    pantsShade: "#18213a",
    shoes: "oxfords",
    sleeve: "#2c3a62",
    sleeveEnd: 336,
    cuff: "#ffffff",
    torso: (uid) => (
      <g>
        <TorsoFill fill="#fbfbfd" uid={uid} />
        <Collar fill="#ffffff" stroke="#d6d8e0" />
        <Buttons color="#d6d8e0" />
        <Both>
          <path d="M64 206 C58 220 60 240 64 258 C70 280 80 296 82 312 L84 328 L110 328 L112 270 C112 240 112 214 108 194 C92 194 72 196 64 206 Z" fill="#2c3a62" />
          <path d="M108 194 L94 226 L104 232 L112 270 Z" fill="#22304f" />
          <path d="M70 296 L94 296" stroke="#1b2540" strokeWidth="1.4" />
        </Both>
        <path d="M150 232 L162 230 L161 236 Z" fill="#e8405f" />
        <path d="M150 232 C152 226 156 226 158 230" fill="#e8405f" />
        <circle cx="114" cy="292" r="1.8" fill="#1b2540" />
      </g>
    ),
  },
  bowling: {
    pants: "#2f3a52",
    pantsShade: "#222a3c",
    shoes: "sneakers",
    sleeve: "#2bb5a8",
    sleeveEnd: 252,
    cuff: "#f3e6c8",
    torso: (uid) => (
      <g>
        <TorsoFill fill="#2bb5a8" uid={uid} />
        <path d="M92 200 L100 200 L100 326 L90 326 Z M140 200 L148 200 L150 326 L140 326 Z" fill="#f3e6c8" />
        <path d="M95 200 L95 326 M145 200 L145 326" stroke="#e8405f" strokeWidth="1.6" />
        <Collar fill="#f3e6c8" />
        <Buttons color="#f3e6c8" />
        <text x="138" y="246" fontSize="9" fontFamily="Georgia, serif" fontStyle="italic" fontWeight="700" fill="#f3e6c8" textAnchor="middle">
          Strike!
        </text>
      </g>
    ),
  },
  club: {
    pants: "#1b1b22",
    pantsShade: "#0e0e12",
    shoes: "boots",
    sleeve: "#1d1b20",
    sleeveEnd: 338,
    cuff: "#34303a",
    torso: (uid) => (
      <g>
        <TorsoFill fill="#f4f1f6" uid={uid} />
        <path d="M108 194 C112 204 128 204 132 194" stroke="#d6d0da" strokeWidth="2" fill="none" />
        <Both>
          <path d="M64 206 C58 220 60 240 64 258 C70 280 80 296 82 312 L84 328 L108 328 C106 290 104 240 106 194 C92 194 72 196 64 206 Z" fill="#1d1b20" />
          <path d="M106 194 L88 218 L98 228 L106 210 Z" fill="#2a2730" />
          <path d="M104 230 L104 326" stroke="#9a96a0" strokeWidth="1" strokeDasharray="1.4 1.4" />
          <path d="M72 250 L94 262" stroke="#9a96a0" strokeWidth="1.2" />
          <path d="M72 230 C74 260 80 290 86 320" stroke="#fff" strokeOpacity="0.12" strokeWidth="3" fill="none" />
        </Both>
      </g>
    ),
  },
  mountain: {
    pants: "#4a6890",
    pantsShade: "#36507a",
    shoes: "boots",
    sleeve: "url(#ENG-flannel)",
    sleeveEnd: 338,
    cuff: "#8f2420",
    torso: (uid) => (
      <g>
        <TorsoFill fill={`url(#${uid}-flannel)`} uid={uid} />
        <Collar fill="#8f2420" />
        <Both>
          <path d="M64 208 C60 224 62 244 66 262 C72 284 80 300 82 314 L84 328 L110 328 L110 196 C96 196 74 198 64 208 Z" fill="#283a5c" />
          {[226, 246, 266, 286, 306].map((y) => (
            <path key={y} d={`M68 ${y} C80 ${y + 3} 96 ${y + 3} 110 ${y}`} stroke="#1c2a46" strokeWidth="1.4" fill="none" />
          ))}
          <path d="M110 196 L110 328" stroke="#9aa6bb" strokeWidth="1.2" />
        </Both>
        <path d="M106 190 C110 182 130 182 134 190 L134 198 L106 198 Z" fill="#283a5c" />
      </g>
    ),
    hat: (
      <g>
        <path d="M68 96 C64 52 92 26 120 26 C148 26 176 52 172 96 Z" fill="#e3a62c" />
        <path d="M66 82 L174 82 L174 98 C140 92 100 92 66 98 Z" fill="#c98d1c" />
        {[78, 90, 102, 114, 126, 138, 150, 162].map((x) => (
          <path key={x} d={`M${x} 84 L${x} 95`} stroke="#a87414" strokeWidth="1.4" />
        ))}
        <circle cx="120" cy="24" r="10" fill="#f6efe2" />
        <path d="M80 62 C96 48 140 48 160 62" stroke="#c98d1c" strokeWidth="1.2" fill="none" />
      </g>
    ),
  },
  drive: {
    pants: "#cdb68f",
    pantsShade: "#ad9670",
    shoes: "sneakers",
    sleeve: "#5b84b8",
    sleeveEnd: 300,
    cuff: "#8db3e2",
    torso: (uid) => (
      <g>
        <TorsoFill fill="#ffffff" uid={uid} />
        <path d="M108 194 C112 204 128 204 132 194" stroke="#e6e2ea" strokeWidth="2" fill="none" />
        {/* aviators hooked on tee */}
        <g transform="translate(120 214)">
          <path d="M-14 0 C-14 8 -4 10 -2 2 M14 0 C14 8 4 10 2 2" fill="#6d4c3d" stroke="#b8862b" strokeWidth="1" />
          <path d="M-2 1 L2 1" stroke="#b8862b" strokeWidth="1" />
        </g>
        <Both>
          <path d="M64 206 C58 220 60 240 64 258 C70 280 80 296 82 312 L84 328 L106 328 C104 290 102 240 106 194 C92 194 72 196 64 206 Z" fill="#5b84b8" />
          <path d="M106 194 L92 214 L102 216 L102 232 Z" fill="#3e6496" />
          <rect x="76" y="232" width="16" height="12" rx="2" fill="#4f78ad" stroke="#e7c06d" strokeWidth="0.7" strokeDasharray="1.6 1.6" />
          <path d="M102 240 L102 326" stroke="#e7c06d" strokeWidth="0.8" strokeDasharray="2 2" />
        </Both>
      </g>
    ),
  },
  mall: {
    pants: "#5b7fae",
    pantsShade: "#456894",
    shoes: "sneakers",
    sleeve: "#9a9ca8",
    sleeveEnd: 338,
    cuff: "#82848f",
    torso: (uid) => (
      <g>
        <TorsoFill fill="#9a9ca8" uid={uid} />
        <path d="M90 200 C90 184 150 184 150 200 C140 208 100 208 90 200 Z" fill="#82848f" />
        <path d="M110 204 L108 240 M130 204 L132 240" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
        <path d="M92 278 L148 278 L156 314 L84 314 Z" fill="#8e909c" stroke="#82848f" />
        <path d="M84 318 L156 318 L156 328 L84 328 Z" fill="#82848f" />
        <text x="120" y="262" textAnchor="middle" fontSize="9" fontFamily="ui-monospace, monospace" fontWeight="700" fill="#fff" opacity="0.9">
          {"</> ♥"}
        </text>
      </g>
    ),
  },
  kurta: {
    pants: "#fbf7ef",
    pantsShade: "#e6ddc8",
    shoes: "mojari",
    sleeve: "#fbf3e2",
    sleeveEnd: 336,
    cuff: "#e9b949",
    kurtaHem: true,
    torso: (uid) => (
      <g>
        <path d="M82 300 C80 340 78 380 76 412 L164 412 C162 380 160 340 158 300 Z" fill="#fbf3e2" />
        <path d="M76 404 L164 404" stroke="#e9b949" strokeWidth="2" />
        <TorsoFill fill="#fbf3e2" uid={uid} />
        <path d="M108 192 L108 186 C114 184 126 184 132 186 L132 192" fill="#fbf3e2" stroke="#e6d6b4" />
        <Both>
          <path d="M64 206 C58 220 60 240 64 258 C70 280 80 296 82 312 L84 336 L118 336 L118 200 C112 196 108 194 108 194 C92 194 72 196 64 206 Z" fill="#7a1f3d" />
          <path d="M108 194 L112 186 L118 188 L118 200 Z" fill="#651832" />
          <path d="M84 336 L118 336" stroke="#e9b949" strokeWidth="1.4" />
          <path d="M72 276 L94 276" stroke="#e9b949" strokeWidth="1.2" />
        </Both>
        <g fill="#e9b949">
          {[214, 238, 262, 286, 310].map((y) => (
            <circle key={y} cx="120" cy={y} r="2" />
          ))}
        </g>
        <path d="M150 232 L156 222 L160 232 Z" fill="#e9b949" />
      </g>
    ),
  },
};

/* ------------------------------------------------------------------ */
/* Face                                                               */
/* ------------------------------------------------------------------ */

function EngineerMouth({ expression }: { expression: Expression }) {
  const ink = "#7a3b2e";
  switch (expression) {
    case "happy":
      return (
        <g>
          <path d="M106 150 C112 162 128 162 134 150 C126 154 114 154 106 150 Z" fill="#7a2a2a" />
          <path d="M108 151 C114 154 126 154 132 151 L131 153.5 C124 156 116 156 109 153.5 Z" fill="#fff" />
        </g>
      );
    case "laugh":
      return (
        <g>
          <path d="M105 149 C110 168 130 168 135 149 C126 153 114 153 105 149 Z" fill="#6b1f2a" />
          <path d="M107 150 C114 153 126 153 133 150 L132 154 C124 156 116 156 108 154 Z" fill="#fff" />
          <ellipse cx="120" cy="161" rx="7" ry="2.6" fill="#e0607a" />
        </g>
      );
    case "kiss":
      return (
        <g>
          <ellipse cx="121" cy="153" rx="4.6" ry="4" fill="#c06a5a" />
          <path d="M117.5 153 C119.5 154 122.5 154 124.5 153" stroke={ink} strokeWidth="1" />
        </g>
      );
    case "shy":
      return <path d="M112 153 C116 156 124 156 128 152.6" stroke={ink} strokeWidth="2.2" fill="none" strokeLinecap="round" />;
    case "surprised":
      return <ellipse cx="120" cy="154" rx="4.6" ry="5.4" fill="#6b1f2a" />;
    default:
      return <path d="M107 151 C113 159 127 159 133 151" stroke={ink} strokeWidth="2.3" fill="none" strokeLinecap="round" />;
  }
}

function EngineerFace({ uid, expression, blushing, animated }: { uid: string; expression: Expression; blushing: boolean; animated: boolean }) {
  const closed = expression === "kiss" || expression === "happy" || expression === "laugh";
  return (
    <g>
      <Both>
        <ellipse cx={M.ear.cx} cy={M.ear.cy} rx={M.ear.rx} ry={M.ear.ry} fill={SKIN.base} />
        <path d="M71 114 C68 118 69 126 72 128" fill="none" stroke={SKIN.shade} strokeWidth="1.4" strokeLinecap="round" />
      </Both>
      <path d={M.face} fill={`url(#${uid}-mface)`} />
      {/* jaw stubble */}
      <path d="M84 146 C92 172 148 172 156 146 C150 180 90 180 84 146 Z" fill="#3b2a22" opacity="0.1" />

      <g opacity={blushing ? 0.75 : 0.18}>
        <Both>
          <ellipse cx="94" cy="140" rx="11" ry="6" fill={`url(#${uid}-mblush)`} />
        </Both>
      </g>
      {blushing && (
        <g stroke="#d9506a" strokeWidth="1" strokeLinecap="round" opacity="0.6">
          <Both>
            <path d="M89 137 L87 141 M94 137 L92 141 M99 137 L97 141" />
          </Both>
        </g>
      )}

      {/* eyes */}
      <Both>
        {closed ? (
          expression === "kiss" ? (
            <path d="M90 119 C95 124 107 124 112 119" fill="none" stroke="#1f1418" strokeWidth="2.2" strokeLinecap="round" />
          ) : (
            <path d="M90 122 C95 114 107 114 112 122" fill="none" stroke="#1f1418" strokeWidth="2.4" strokeLinecap="round" />
          )
        ) : (
          <g className={animated ? "avatar-blink" : undefined} style={animated ? { animationDelay: "1.7s" } : undefined}>
            <path d="M90 119 C93 112.5 108 112 112 118.5 C109 124.5 94 125 90 119 Z" fill="#fffaf6" />
            <circle cx="101" cy="118.4" r="5" fill="#3a2214" />
            <circle cx="101" cy="118.4" r="2.4" fill="#120a06" />
            <circle cx="102.8" cy="116.6" r="1.4" fill="#fff" />
            <path d="M89 119.6 C93 111.6 108 111 113 118" fill="none" stroke="#1f1418" strokeWidth="1.8" strokeLinecap="round" />
          </g>
        )}
      </Both>
      {/* brows */}
      <Both>
        <path
          d={expression === "surprised" ? "M85 97 C92 91 106 90 114 94" : expression === "shy" ? "M85 101 C92 98 106 97 114 98" : "M85 102 C92 96.5 106 96 114 99"}
          fill="none"
          stroke={HAIR.base}
          strokeWidth="4.2"
          strokeLinecap="round"
        />
      </Both>
      {/* nose */}
      <path d="M120 124 C119 132 116.5 137 119 140.5 C121 141.5 124 141 125 139.5" fill="none" stroke={SKIN.shade} strokeWidth="1.5" strokeLinecap="round" />
      <EngineerMouth expression={expression} />

      {/* round glasses — engineer essential */}
      <g fill="none" stroke="#2a2230" strokeWidth="2.2">
        <circle cx="101" cy="119" r="13.5" fill="#cfe8ff" fillOpacity="0.12" />
        <circle cx="139" cy="119" r="13.5" fill="#cfe8ff" fillOpacity="0.12" />
        <path d="M114.5 117 C117 114.5 123 114.5 125.5 117" />
        <path d="M87.5 116 L76 112 M152.5 116 L164 112" />
      </g>
      <Both>
        <path d="M92 112 L97 108" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.65" />
      </Both>
    </g>
  );
}

function EngineerHair({ uid }: { uid: string }) {
  return (
    <g>
      <path
        d="M70 120 C62 68 90 38 124 38 C160 38 180 66 172 116 C170 102 166 92 160 86 C150 92 126 94 108 88 C96 86 84 92 78 102 C74 108 72 114 70 120 Z"
        fill={`url(#${uid}-hair)`}
      />
      <path d="M92 54 C100 34 128 26 150 38 C140 38 132 42 128 50 C120 40 106 42 92 54 Z" fill={HAIR.shine} />
      <g stroke={HAIR.shine} strokeWidth="1.3" fill="none" strokeLinecap="round" opacity="0.6">
        <path d="M100 60 C108 52 120 50 132 52" />
        <path d="M84 84 C92 72 104 66 116 64" />
        <path d="M144 62 C154 68 162 78 166 90" />
      </g>
      <Both>
        <path d="M70 104 L77 102 L78 124 L73 126 Z" fill={HAIR.base} />
      </Both>
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Arms & shoes                                                       */
/* ------------------------------------------------------------------ */

function Arm({ look, uid, baseUid, deg, wave, watch }: { look: EngineerLook; uid: string; baseUid: string; deg: number; wave?: boolean; watch?: boolean }) {
  const sleeve = look.sleeve.replace("ENG", baseUid);
  const style: CSSProperties = {
    transformBox: "view-box",
    transformOrigin: `${M.shoulderL.x}px ${M.shoulderL.y}px`,
    transform: `rotate(${deg}deg)`,
    transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
  };
  return (
    <g style={style}>
      <g className={wave ? "eng-wave" : undefined}>
        <path d={M.armL} fill={SKIN.base} />
        <path d={M.handL} fill={SKIN.base} />
        <clipPath id={`${uid}-sl`}>
          <rect x="0" y="0" width="240" height={look.sleeveEnd} />
        </clipPath>
        <path d={M.armL} fill={sleeve} stroke={sleeve} strokeWidth="3" clipPath={`url(#${uid}-sl)`} />
        <path d="M58 220 C52 250 52 290 53 330" stroke="#000" strokeOpacity="0.12" strokeWidth="5" fill="none" clipPath={`url(#${uid}-sl)`} />
        {look.cuff && (
          <path d={`M${look.sleeveEnd > 320 ? 46.5 : 47} ${look.sleeveEnd - 4} L${look.sleeveEnd > 320 ? 64 : 67} ${look.sleeveEnd - 4}`} stroke={look.cuff} strokeWidth="5" />
        )}
        {watch && <rect x="46" y="326" width="17" height="6" rx="2" fill="#2a2a32" />}
      </g>
    </g>
  );
}

function Shoes({ kind }: { kind: EngineerLook["shoes"] }) {
  switch (kind) {
    case "oxfords":
      return (
        <Both>
          <path d="M86 488 C84 498 86 508 92 512 C98 515 108 515 112 510 C116 504 115 496 114 488 Z" fill="#6b3f26" />
          <path d="M92 496 C98 500 106 500 110 496" stroke="#3e2416" strokeWidth="1" fill="none" />
          <path d="M94 504 C96 508 100 510 104 510" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.4" fill="none" />
        </Both>
      );
    case "boots":
      return (
        <Both>
          <path d="M86 470 L114 470 L114 488 C116 500 114 508 110 512 C104 516 94 516 90 512 C85 506 84 496 86 488 Z" fill="#4a2f1f" />
          <path d="M86 508 C94 516 106 516 114 508 L114 514 C104 520 94 520 86 514 Z" fill="#2a1a10" />
          <path d="M92 476 L108 476 M92 482 L108 482" stroke="#2a1a10" strokeWidth="1.2" />
        </Both>
      );
    case "mojari":
      return (
        <Both>
          <path d="M87 492 C85 502 88 510 94 513 C98 515 100 518 100 521 C104 516 110 514 113 508 C115 502 114 496 113 492 C104 496 96 496 87 492 Z" fill="#e9b949" />
          <path d="M88 494 C96 498 104 498 112 494" stroke="#a87414" strokeWidth="1.2" fill="none" />
          <circle cx="100" cy="504" r="1.6" fill="#c2185b" />
        </Both>
      );
    default:
      return (
        <Both>
          <path d="M85 484 C83 496 84 506 89 512 C94 516 108 516 112 511 C116 505 116 494 115 484 C106 480 94 480 85 484 Z" fill="#fff" stroke="#d6d0d8" strokeWidth="0.8" />
          <path d="M84.5 506 C92 512 108 512 115.5 506 L115 512 C108 519 92 519 85 512 Z" fill="#e8e2ea" />
          <path d="M92 490 L108 490 M92 494 L108 494" stroke="#c9c2cc" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M86 500 C94 498 102 502 113 497" stroke="#2bb5a8" strokeWidth="2" fill="none" />
        </Both>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Avatar                                                             */
/* ------------------------------------------------------------------ */

const POSE_DEG: Record<EngineerPose, [number, number]> = {
  // [viewer-left arm (his right), viewer-right arm (mirrored)]
  idle: [0, 0],
  hug: [72, 18],
  cheer: [150, 150],
  wave: [0, 150],
  hold: [24, 8],
};

export function EngineerAvatar({
  outfit = "casual",
  view = "full",
  animated = true,
  expression = "smile",
  blushing = false,
  pose = "idle",
  className,
}: EngineerAvatarProps) {
  const uid = useSvgUid("en");
  const reduce = useReducedMotion();
  const live = animated && !reduce;
  const look = LOOKS[outfit] ?? LOOKS.casual;
  const [degL, degR] = POSE_DEG[pose];

  const body = (
    <>
      <defs>
        <radialGradient id={`${uid}-mface`} cx="0.45" cy="0.42" r="0.62">
          <stop offset="0" stopColor={SKIN.light} />
          <stop offset="0.6" stopColor={SKIN.base} />
          <stop offset="1" stopColor={SKIN.shade} />
        </radialGradient>
        <radialGradient id={`${uid}-mblush`}>
          <stop offset="0" stopColor="#e8667a" stopOpacity="0.8" />
          <stop offset="1" stopColor="#e8667a" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-mshade`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#000" stopOpacity="0.22" />
          <stop offset="0.3" stopColor="#000" stopOpacity="0" />
          <stop offset="0.7" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`${uid}-hair`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={HAIR.shine} />
          <stop offset="0.4" stopColor={HAIR.base} />
          <stop offset="1" stopColor={HAIR.shade} />
        </linearGradient>
        <pattern id={`${uid}-flannel`} width="16" height="16" patternUnits="userSpaceOnUse">
          <rect width="16" height="16" fill="#b8322c" />
          <rect y="6" width="16" height="4" fill="#1d1d24" opacity="0.55" />
          <rect x="6" width="4" height="16" fill="#1d1d24" opacity="0.45" />
          <path d="M0 2 H16 M2 0 V16" stroke="#f0d0c0" strokeWidth="0.6" opacity="0.6" />
        </pattern>
      </defs>

      {/* legs / trousers */}
      <Both>
        <path d={M.legL} fill={look.pants} />
        <path d="M90 340 C92 400 94 450 96 488" stroke={look.pantsShade} strokeWidth="1.4" fill="none" />
      </Both>
      {look.kurtaHem && (
        <Both>
          <path d="M90 440 L112 440 M90 452 L112 452 M90 464 L112 464 M90 476 L113 476" stroke={look.pantsShade} strokeWidth="1" />
        </Both>
      )}
      <path d="M84 300 L156 300 L156 334 C140 340 100 340 84 334 Z" fill={look.pants} />
      <Shoes kind={look.shoes} />

      {/* torso */}
      <path d={TORSO} fill={SKIN.base} />
      <path d={M.neck} fill={SKIN.base} />
      <path d={M.neckShadow} fill={SKIN.shade} opacity="0.5" />
      {look.torso(uid)}

      {/* arms (poseable) */}
      <Arm look={look} uid={`${uid}a`} baseUid={uid} deg={degL} />
      <Mirror>
        <Arm look={look} uid={`${uid}b`} baseUid={uid} deg={degR} wave={pose === "wave" && live} watch />
      </Mirror>

      <EngineerFace uid={uid} expression={expression} blushing={blushing} animated={live} />
      {look.hat ? (
        <g>
          <Both>
            <path d="M70 100 L78 98 L79 124 L73 126 Z" fill={HAIR.base} />
          </Both>
          {look.hat}
        </g>
      ) : (
        <EngineerHair uid={uid} />
      )}
      {blushing && (
        <g>
          <path d={sparkleStar(176, 72, 5)} fill="#ffd1e6" />
          <path d={sparkleStar(64, 80, 3.5)} fill="#ffd1e6" />
        </g>
      )}
    </>
  );

  if (!live) {
    return (
      <svg viewBox={VIEWBOXES[view]} className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Engineer">
        {body}
      </svg>
    );
  }

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Engineer"
      initial={false}
      animate={{ viewBox: VIEWBOXES[view] }}
      transition={{ duration: 0.7 }}
      viewBox={VIEWBOXES[view]}
    >
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        animate={{ y: [0, -1.4, 0], rotate: [0, -0.6, 0, 0.6, 0] }}
        transition={{
          y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {body}
      </motion.g>
    </motion.svg>
  );
}
