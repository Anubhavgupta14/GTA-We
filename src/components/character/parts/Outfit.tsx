import type { ReactNode } from "react";
import type { OutfitId, SkinTone } from "@/data/wardrobe";
import { sparkleStar } from "./Face";
import { Both, F } from "./shared";

export interface OutfitLayers {
  /** Behind arms & legs (coat backs, dupatta/pallu tails) */
  back?: ReactNode;
  /** Trousers/tights — drawn before shoes */
  legwear?: ReactNode;
  /** Main garment over the torso */
  main: ReactNode;
  /** Sleeves — drawn over arms */
  sleeves?: ReactNode;
}

/* ------------------------------------------------------------------ */
/* Primitives                                                         */
/* ------------------------------------------------------------------ */

type Neckline = "sweetheart" | "straps" | "crew" | "v" | "deepV" | "off" | "scoop" | "cowl" | "high" | "flat";

const NECK: Record<Neckline, (top: number, b: number) => string> = {
  sweetheart: (_, b) => `M30 214 L84 211 C96 207 110 211 120 221 C130 211 144 207 156 211 L210 214 L210 ${b} L30 ${b} Z`,
  straps: (_, b) => `M30 210 L88 207 C100 213 110 221 120 225 C130 221 140 213 152 207 L210 210 L210 ${b} L30 ${b} Z`,
  cowl: (_, b) => `M30 210 L88 206 C98 226 142 226 152 206 L210 210 L210 ${b} L30 ${b} Z`,
  crew: (_, b) => `M30 180 L105 186 C108 198 132 198 135 186 L210 180 L210 ${b} L30 ${b} Z`,
  v: (_, b) => `M30 180 L106 186 L120 222 L134 186 L210 180 L210 ${b} L30 ${b} Z`,
  deepV: (_, b) => `M30 180 L105 187 L120 240 L135 187 L210 180 L210 ${b} L30 ${b} Z`,
  off: (_, b) => `M30 210 C70 205 100 209 120 211 C140 209 170 205 210 210 L210 ${b} L30 ${b} Z`,
  scoop: (_, b) => `M30 182 L97 186 C102 212 138 212 143 186 L210 182 L210 ${b} L30 ${b} Z`,
  high: (_, b) => `M30 150 L210 150 L210 ${b} L30 ${b} Z`,
  flat: (top, b) => `M30 ${top} L210 ${top} L210 ${b} L30 ${b} Z`,
};

function Bodice({ id, neck, bottom, top = 0, fill, shade = true }: { id: string; neck: Neckline; bottom: number; top?: number; fill: string; shade?: boolean }) {
  return (
    <g>
      <clipPath id={id}>
        <path d={NECK[neck](top, bottom)} />
      </clipPath>
      <g clipPath={`url(#${id})`}>
        <path d={F.torso} fill={fill} stroke={fill} strokeWidth="4" />
        {shade && <path d={F.torso} fill={`url(#${id.split("-")[0]}-sideShade)`} />}
      </g>
    </g>
  );
}

const SKIRT = {
  miniFlare: "M92 270 L148 270 C156 300 166 330 172 364 C140 372 100 372 68 364 C74 330 84 300 92 270 Z",
  bodyconMini:
    "M92 272 L148 272 C150 290 160 304 160 322 C160 340 158 356 156 370 C132 376 108 376 84 370 C82 356 80 340 80 322 C80 304 90 290 92 272 Z",
  pencilKnee:
    "M92 272 L148 272 C150 290 160 304 160 322 C161 350 159 380 156 402 C132 408 108 408 84 402 C81 380 79 350 80 322 C80 304 90 290 92 272 Z",
  slipMidi:
    "M92 272 L148 272 C152 296 160 312 160 330 C162 370 166 400 168 430 C140 438 100 438 72 430 C74 400 78 370 80 330 C80 312 88 296 92 272 Z",
  aLineMidi: "M93 270 L147 270 C160 310 178 370 186 424 C150 436 90 436 54 424 C62 370 80 310 93 270 Z",
  gown: "M92 272 L148 272 C152 296 160 314 160 336 C160 380 166 430 186 502 C150 514 90 514 54 502 C74 430 80 380 80 336 C80 314 88 296 92 272 Z",
  lehenga: "M94 260 L146 260 C170 320 204 420 212 500 C160 516 80 516 28 500 C36 420 70 320 94 260 Z",
  saree: "M88 278 L152 278 C158 330 162 400 170 500 C140 508 100 508 70 500 C78 400 82 330 88 278 Z",
};

function Sleeve({ id, end, fill, big = false, cuff }: { id: string; end: number; fill: string; big?: boolean; cuff?: string }) {
  const d = big ? F.bigSleeveL : F.armL;
  return (
    <g>
      <clipPath id={`${id}-len`}>
        <rect x="0" y="0" width="240" height={end} />
      </clipPath>
      <clipPath id={`${id}-shape`}>
        <path d={d} />
        <path d={d} transform="matrix(-1 0 0 1 240 0)" />
      </clipPath>
      <g clipPath={`url(#${id}-len)`}>
        <Both>
          <path d={d} fill={fill} stroke={fill} strokeWidth={big ? 1 : 3.5} />
          <path d="M66 214 C60 240 60 270 61 300" fill="none" stroke="#000" strokeOpacity="0.12" strokeWidth="5" strokeLinecap="round" />
        </Both>
      </g>
      {cuff && (
        <g clipPath={`url(#${id}-shape)`}>
          <rect x="0" y={end - 6} width="240" height="6" fill={cuff} />
        </g>
      )}
    </g>
  );
}

function PuffSleeves({ fill, band }: { fill: string; band: string }) {
  return (
    <Both>
      <path d="M86 202 C72 194 56 204 58 222 C60 236 70 240 80 236 C86 230 90 216 86 202 Z" fill={fill} />
      <path d="M70 206 C66 214 66 224 70 232 M78 202 C76 212 76 224 80 234" stroke="#000" strokeOpacity="0.12" strokeWidth="1.2" fill="none" />
      <path d="M60 230 C66 238 76 240 82 235" stroke={band} strokeWidth="3" fill="none" strokeLinecap="round" />
    </Both>
  );
}

function SharedDefs({ uid }: { uid: string }) {
  return (
    <defs>
      <linearGradient id={`${uid}-sideShade`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#000" stopOpacity="0.24" />
        <stop offset="0.28" stopColor="#000" stopOpacity="0" />
        <stop offset="0.72" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.24" />
      </linearGradient>
      <linearGradient id={`${uid}-hemShade`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#000" stopOpacity="0.18" />
        <stop offset="0.25" stopColor="#000" stopOpacity="0" />
        <stop offset="1" stopColor="#000" stopOpacity="0.12" />
      </linearGradient>
    </defs>
  );
}

/** Skirt/garment shape with side + vertical shading overlays */
function Fabric({ uid, d, fill, stroke }: { uid: string; d: string; fill: string; stroke?: string }) {
  return (
    <g>
      <path d={d} fill={fill} stroke={stroke} strokeWidth={stroke ? 0.8 : 0} />
      <path d={d} fill={`url(#${uid}-sideShade)`} />
      <path d={d} fill={`url(#${uid}-hemShade)`} />
    </g>
  );
}

function Folds({ d, color = "#000", opacity = 0.16, width = 1.4 }: { d: string[]; color?: string; opacity?: number; width?: number }) {
  return (
    <g fill="none" stroke={color} strokeOpacity={opacity} strokeWidth={width} strokeLinecap="round">
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </g>
  );
}

function grad(id: string, top: string, bottom: string, horizontal = false) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={horizontal ? 1 : 0} y2={horizontal ? 0 : 1}>
      <stop offset="0" stopColor={top} />
      <stop offset="1" stopColor={bottom} />
    </linearGradient>
  );
}

function GoldDots({ points, r = 1.2, color = "#f5c451" }: { points: [number, number][]; r?: number; color?: string }) {
  return (
    <g fill={color}>
      {points.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} />
      ))}
    </g>
  );
}

const range = (from: number, to: number, step: number) => {
  const out: number[] = [];
  for (let v = from; v <= to; v += step) out.push(v);
  return out;
};

/* Jeans/trouser legs (left; mirrored) */
const JEAN_LEG = "M82 300 L121 300 L120 330 C117 380 114 430 111 486 L92 486 C88 440 82 380 80 330 Z";
const PALAZZO_LEG = "M82 300 L121 300 L124 490 L66 490 C68 420 74 360 82 300 Z";

/* ------------------------------------------------------------------ */
/* Outfits                                                            */
/* ------------------------------------------------------------------ */

type Renderer = (uid: string, skin: SkinTone) => OutfitLayers;

const OUTFITS: Record<OutfitId, Renderer> = {
  sequinMini: (uid) => {
    const fill = `url(#${uid}-seq)`;
    return {
      main: (
        <g>
          <defs>
            <pattern id={`${uid}-seq`} width="6" height="6" patternUnits="userSpaceOnUse">
              <rect width="6" height="6" fill="#d9bd85" />
              <circle cx="1.5" cy="1.5" r="1.4" fill="#fff3d1" />
              <circle cx="4.5" cy="4.5" r="1.4" fill="#e9cf98" />
              <circle cx="4.5" cy="1.5" r="0.7" fill="#b8955a" />
            </pattern>
          </defs>
          <Fabric uid={uid} d={SKIRT.bodyconMini} fill={fill} />
          <Bodice id={`${uid}-b`} neck="straps" bottom={330} fill={fill} />
          <Both>
            <path d="M91 208 L99 189" stroke="#c9a96a" strokeWidth="2" strokeLinecap="round" />
          </Both>
          <path d="M84 368 C108 375 132 375 156 368" stroke="#b8955a" strokeWidth="1.5" fill="none" />
          {[[100, 240, 3], [134, 300, 3.5], [108, 340, 2.6], [146, 252, 2.4], [118, 290, 2]].map(([x, y, r], i) => (
            <path key={i} d={sparkleStar(x, y, r)} fill="#fff">
              <animate attributeName="opacity" values="0;1;0" dur="2.2s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
            </path>
          ))}
        </g>
      ),
    };
  },

  satinSlip: (uid) => {
    const fill = `url(#${uid}-satin)`;
    return {
      main: (
        <g>
          <defs>
            <linearGradient id={`${uid}-satin`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f9d3d9" />
              <stop offset="0.4" stopColor="#f2b2bd" />
              <stop offset="0.55" stopColor="#fbe0e5" />
              <stop offset="1" stopColor="#d98a9a" />
            </linearGradient>
          </defs>
          <Fabric uid={uid} d={SKIRT.slipMidi} fill={fill} />
          <Bodice id={`${uid}-b`} neck="cowl" bottom={330} fill={fill} />
          <Folds color="#b06a7a" opacity={0.35} d={["M94 212 C104 224 136 224 146 212", "M100 216 C108 228 132 228 140 216"]} />
          <Folds color="#fff" opacity={0.45} width={2.2} d={["M102 300 C106 340 104 390 100 428", "M138 300 C140 340 144 380 148 428", "M120 290 C121 330 121 380 120 430"]} />
          <Both>
            <path d="M90 207 L99 189" stroke="#d98a9a" strokeWidth="1.4" strokeLinecap="round" />
          </Both>
        </g>
      ),
    };
  },

  offShoulderBodycon: (uid) => {
    const fill = `url(#${uid}-fuchsia)`;
    return {
      main: (
        <g>
          <defs>{grad(`${uid}-fuchsia`, "#e8407f", "#a8164f")}</defs>
          <Fabric uid={uid} d={SKIRT.bodyconMini} fill={fill} />
          <Bodice id={`${uid}-b`} neck="off" bottom={330} fill={fill} />
          <Folds color="#5a0a2a" opacity={0.25} d={["M92 250 C108 262 132 256 148 246", "M90 290 C108 300 134 294 152 284", "M86 330 C108 340 134 336 156 324", "M84 352 C106 360 136 358 158 348"]} />
        </g>
      ),
      sleeves: (
        <g>
          <path d="M50 206 C80 214 160 214 190 206 L192 222 C160 230 80 230 48 222 Z" fill={fill} />
          <path d="M50 214 C80 222 160 222 190 214" stroke="#5a0a2a" strokeOpacity="0.25" fill="none" />
        </g>
      ),
    };
  },

  redGown: (uid, skin) => {
    const fill = `url(#${uid}-red)`;
    return {
      main: (
        <g>
          <defs>
            {grad(`${uid}-red`, "#d81b3c", "#7a0518")}
            {grad(`${uid}-leg`, skin.base, skin.shade, true)}
          </defs>
          <Fabric uid={uid} d={SKIRT.gown} fill={fill} />
          <path d="M129 398 C131 440 134 472 138 504 L124 506 C125 470 127 440 129 398 Z" fill={`url(#${uid}-leg)`} />
          <path d="M129 398 C131 440 134 472 138 504" stroke="#5c0312" strokeWidth="1.2" fill="none" />
          <Folds color="#3d0010" opacity={0.3} d={["M100 340 C96 400 86 450 72 500", "M112 350 C110 410 106 460 100 506", "M146 340 C150 400 160 450 172 500"]} />
          <Folds color="#ff8da1" opacity={0.25} width={2} d={["M106 300 C104 360 98 430 88 500"]} />
          <Bodice id={`${uid}-b`} neck="sweetheart" bottom={300} fill={fill} />
          <path d="M84 211 C96 207 110 211 120 221 C130 211 144 207 156 211" stroke="#ff8da1" strokeOpacity="0.5" strokeWidth="1.2" fill="none" />
          <g transform="translate(120 276)">
            <path d={sparkleStar(0, 0, 5)} fill="#ffe08a" />
            <circle r="1.8" fill="#fff" />
          </g>
        </g>
      ),
    };
  },

  floralMidi: (uid) => {
    const fill = `url(#${uid}-floral)`;
    return {
      main: (
        <g>
          <defs>
            <pattern id={`${uid}-floral`} width="22" height="22" patternUnits="userSpaceOnUse">
              <rect width="22" height="22" fill="#fdf6ea" />
              <g transform="translate(6 6)">
                {[0, 72, 144, 216, 288].map((a) => (
                  <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 2.6} cy={Math.sin((a * Math.PI) / 180) * 2.6} r="2.1" fill="#f4a3b8" />
                ))}
                <circle r="1.3" fill="#f6c453" />
              </g>
              <ellipse cx="11" cy="9" rx="2.6" ry="1.1" fill="#9cc79a" transform="rotate(-30 11 9)" />
              <g transform="translate(17 17)">
                {[0, 90, 180, 270].map((a) => (
                  <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 1.8} cy={Math.sin((a * Math.PI) / 180) * 1.8} r="1.5" fill="#c6a6e8" />
                ))}
                <circle r="0.9" fill="#fff" />
              </g>
            </pattern>
          </defs>
          <Fabric uid={uid} d={SKIRT.aLineMidi} fill={fill} />
          <Folds d={["M108 290 C104 340 96 390 86 428", "M132 290 C136 340 144 390 154 428", "M120 300 L120 432"]} opacity={0.1} />
          <path d="M54 424 C90 436 150 436 186 424" stroke="#e8c9c9" strokeWidth="2" fill="none" />
          <Bodice id={`${uid}-b`} neck="scoop" bottom={286} fill={fill} />
          <rect x="91" y="268" width="58" height="8" rx="3" fill="#9cc79a" />
          <g transform="translate(120 272)">
            <path d="M0 0 C-10 -8 -14 2 -8 6 C-4 8 -2 4 0 0 Z M0 0 C10 -8 14 2 8 6 C4 8 2 4 0 0 Z" fill="#86b884" />
            <path d="M-1 1 L-6 16 M1 1 L6 15" stroke="#86b884" strokeWidth="2.4" strokeLinecap="round" />
            <circle r="2.6" fill="#78a876" />
          </g>
        </g>
      ),
      sleeves: <PuffSleeves fill={fill} band="#e8c9c9" />,
    };
  },

  emeraldWrap: (uid) => {
    const fill = `url(#${uid}-emerald)`;
    return {
      main: (
        <g>
          <defs>{grad(`${uid}-emerald`, "#2b9a72", "#0e4a35")}</defs>
          <Fabric uid={uid} d={SKIRT.slipMidi} fill={fill} />
          <path d="M148 276 C140 330 124 380 106 434" stroke="#07301f" strokeWidth="1.6" fill="none" opacity="0.7" />
          <Folds color="#7fe0b8" opacity={0.25} width={2} d={["M110 300 C108 350 100 400 92 432"]} />
          <Bodice id={`${uid}-b`} neck="deepV" bottom={300} fill={fill} />
          <path d="M105 187 L120 240 L135 187" stroke="#07301f" strokeOpacity="0.4" fill="none" />
          <path d="M135 187 C130 220 112 250 92 276" stroke="#07301f" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
          <rect x="90" y="272" width="60" height="7" rx="3" fill="#0e4a35" />
          <g transform="translate(96 276)">
            <path d="M0 0 C-10 -8 -14 2 -8 6 C-4 8 -2 4 0 0 Z M0 0 C10 -8 14 2 8 6 C4 8 2 4 0 0 Z" fill="#1d6e50" />
            <path d="M-1 2 C-4 14 -6 24 -4 34 M1 2 C2 14 4 22 2 30" stroke="#1d6e50" strokeWidth="3" fill="none" strokeLinecap="round" />
          </g>
        </g>
      ),
      sleeves: <Sleeve id={`${uid}-sl`} end={298} fill={fill} cuff="#0e4a35" />,
    };
  },

  denimCrop: (uid) => {
    const denim = `url(#${uid}-denim)`;
    const jeans = `url(#${uid}-jeans)`;
    return {
      legwear: (
        <g>
          <defs>{grad(`${uid}-jeans`, "#6f9bd1", "#3d6aa6")}</defs>
          <Both>
            <path d={JEAN_LEG} fill={jeans} />
            <path d="M84 340 C86 380 90 430 94 480" stroke="#e7c06d" strokeWidth="0.9" strokeDasharray="2 2" fill="none" opacity="0.7" />
            <path d="M91 476 L112 476 L111 486 L92 486 Z" fill="#8db3e2" />
            <path d="M96 392 C100 396 106 396 110 392" stroke="#a7c4ea" strokeWidth="2" fill="none" opacity="0.6" />
          </Both>
        </g>
      ),
      main: (
        <g>
          <defs>{grad(`${uid}-denim`, "#6b93c6", "#3e6496")}</defs>
          {/* jeans hips */}
          <Bodice id={`${uid}-jh`} neck="flat" top={264} bottom={340} fill={jeans} />
          <path d="M92 272 L148 272" stroke="#e7c06d" strokeWidth="0.9" strokeDasharray="2 2" />
          <circle cx="120" cy="268" r="2" fill="#e7c06d" />
          <path d="M120 272 L120 300" stroke="#2c5080" strokeWidth="1" />
          {/* crop top */}
          <Bodice id={`${uid}-top`} neck="crew" bottom={258} fill="#fffafc" />
          <path d="M106 187 C109 197 131 197 134 187" stroke="#e8d8e0" strokeWidth="1.6" fill="none" />
          {/* jacket */}
          <Both>
            <path d="M74 198 C66 212 68 232 74 248 C80 264 86 282 86 302 L104 304 C102 270 102 234 108 194 C98 190 84 192 74 198 Z" fill={denim} />
            <path d="M108 194 L96 214 L106 216 L104 230 Z" fill="#355a8a" />
            <rect x="82" y="226" width="16" height="12" rx="2" fill="#5682ba" stroke="#e7c06d" strokeWidth="0.7" strokeDasharray="1.6 1.6" />
            <circle cx="90" cy="232" r="1.4" fill="#e7c06d" />
            <path d="M104 240 L104 300" stroke="#e7c06d" strokeWidth="0.8" strokeDasharray="2 2" />
            <path d="M86 292 L104 294" stroke="#e7c06d" strokeWidth="0.8" strokeDasharray="2 2" />
          </Both>
        </g>
      ),
      sleeves: <Sleeve id={`${uid}-sl`} end={330} fill={denim} big cuff="#355a8a" />,
    };
  },

  coordSet: (uid) => {
    const fill = `url(#${uid}-ging)`;
    return {
      main: (
        <g>
          <defs>
            <pattern id={`${uid}-ging`} width="8" height="8" patternUnits="userSpaceOnUse">
              <rect width="8" height="8" fill="#f6f0ff" />
              <rect width="4" height="8" fill="#c9b2ee" opacity="0.6" />
              <rect width="8" height="4" fill="#c9b2ee" opacity="0.6" />
            </pattern>
          </defs>
          <Fabric uid={uid} d={SKIRT.miniFlare} fill={fill} />
          <Folds d={["M104 290 C100 320 92 344 86 366", "M120 290 L120 370", "M136 290 C140 320 148 344 154 366"]} opacity={0.14} />
          <rect x="92" y="266" width="56" height="7" rx="2" fill="#a98bd9" />
          <Bodice id={`${uid}-b`} neck="crew" bottom={256} fill={fill} />
          <Both>
            <path d="M106 188 C98 196 100 208 110 208 C116 207 119 200 120 196 Z" fill="#fff" stroke="#d9cdf0" strokeWidth="0.8" />
          </Both>
          <GoldDots points={[[120, 212], [120, 230], [120, 248]]} r={1.6} color="#a98bd9" />
        </g>
      ),
      sleeves: <PuffSleeves fill={fill} band="#a98bd9" />,
    };
  },

  hoodieSkirt: (uid) => {
    const hoodie = `url(#${uid}-hoodie)`;
    return {
      main: (
        <g>
          <defs>
            {grad(`${uid}-hoodie`, "#f9bed1", "#e88aab")}
            <pattern id={`${uid}-plaid`} width="14" height="14" patternUnits="userSpaceOnUse">
              <rect width="14" height="14" fill="#2c3566" />
              <rect x="0" y="5" width="14" height="4" fill="#8a2c48" opacity="0.8" />
              <rect x="5" y="0" width="4" height="14" fill="#8a2c48" opacity="0.6" />
              <path d="M0 2 H14 M2 0 V14" stroke="#e8d6a0" strokeWidth="0.6" />
            </pattern>
          </defs>
          <Fabric uid={uid} d={SKIRT.miniFlare} fill={`url(#${uid}-plaid)`} />
          <Folds color="#000" opacity={0.3} d={["M90 330 L82 366", "M104 332 L100 370", "M120 334 L120 372", "M136 332 L140 370", "M150 330 L158 366"]} />
          <path
            d="M76 196 C60 206 60 240 64 280 C66 310 66 330 70 342 L170 342 C174 330 174 310 176 280 C180 240 180 206 164 196 C150 190 135 188 120 188 C105 188 90 190 76 196 Z"
            fill={hoodie}
          />
          <path d="M76 196 C60 206 60 240 64 280 C66 310 66 330 70 342 L170 342 C174 330 174 310 176 280 C180 240 180 206 164 196 C150 190 135 188 120 188 C105 188 90 190 76 196 Z" fill={`url(#${uid}-sideShade)`} />
          <path d="M70 334 L170 334 L170 342 L70 342 Z" fill="#e07ea0" />
          <path d="M94 286 L146 286 L154 322 L86 322 Z" fill="#f3a9c2" stroke="#e07ea0" strokeWidth="1" />
          <path d="M92 196 C92 180 148 180 148 196 C140 204 100 204 92 196 Z" fill="#e07ea0" />
          <path d="M98 196 C104 190 136 190 142 196" stroke="#c96688" strokeWidth="1.4" fill="none" />
          <path d="M110 200 L108 236 M130 200 L132 236" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" />
          <circle cx="108" cy="238" r="2" fill="#fff" />
          <circle cx="132" cy="238" r="2" fill="#fff" />
          <text x="120" y="268" textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fontWeight="700" fill="#fff" opacity="0.9">
            ♡ cutie
          </text>
        </g>
      ),
      sleeves: <Sleeve id={`${uid}-sl`} end={334} fill={hoodie} big cuff="#e07ea0" />,
    };
  },

  knitTrench: (uid) => {
    const trench = `url(#${uid}-trench)`;
    return {
      back: <path d="M68 300 L172 300 L176 432 L64 432 Z" fill="#a8875d" />,
      legwear: (
        <Both>
          <path d={F.legL} fill="#3a3340" stroke="#3a3340" strokeWidth="1.5" />
        </Both>
      ),
      main: (
        <g>
          <defs>
            {grad(`${uid}-trench`, "#d6b688", "#b08d60")}
            <pattern id={`${uid}-knit`} width="8" height="9" patternUnits="userSpaceOnUse">
              <rect width="8" height="9" fill="#f6ecdc" />
              <path d="M0 0 L4 4.5 L8 0 M0 4.5 L4 9 L8 4.5" stroke="#e0d0b6" strokeWidth="1.1" fill="none" />
            </pattern>
          </defs>
          <Bodice id={`${uid}-lw`} neck="flat" top={300} bottom={340} fill="#3a3340" shade={false} />
          <Bodice id={`${uid}-sw`} neck="crew" bottom={320} fill={`url(#${uid}-knit)`} />
          <path d="M104 186 C108 200 132 200 136 186" stroke="#e0d0b6" strokeWidth="4" fill="none" />
          <Both>
            <path d="M72 198 C64 214 66 236 70 252 C74 268 80 282 78 300 C76 340 70 390 66 432 L104 432 C104 380 104 330 104 300 C104 268 102 230 110 194 C98 190 82 192 72 198 Z" fill={trench} />
            <path d="M110 194 L92 224 L104 238 Z" fill="#9f7d52" />
            <circle cx="98" cy="250" r="2" fill="#6b5236" />
            <circle cx="98" cy="300" r="2" fill="#6b5236" />
            <rect x="70" y="272" width="35" height="8" fill="#a8875d" />
            <path d="M82 330 L100 330" stroke="#8d6d46" strokeWidth="1.2" />
          </Both>
          <path d="M66 432 L104 432 M136 432 L174 432" stroke="#8d6d46" strokeWidth="1.5" />
          <g transform="translate(102 276)">
            <rect x="-5" y="-5" width="10" height="10" rx="1.5" fill="none" stroke="#6b5236" strokeWidth="1.6" />
            <path d="M0 4 C-2 14 -4 22 -2 30 M2 4 C4 12 6 20 4 26" stroke="#a8875d" strokeWidth="5" fill="none" strokeLinecap="round" />
          </g>
        </g>
      ),
      sleeves: <Sleeve id={`${uid}-sl`} end={330} fill={trench} big cuff="#9f7d52" />,
    };
  },

  sweaterDress: (uid) => {
    const knit = `url(#${uid}-mocha)`;
    return {
      legwear: (
        <Both>
          <path d={F.legL} fill="#2a2226" opacity="0.88" />
        </Both>
      ),
      main: (
        <g>
          <defs>
            <pattern id={`${uid}-mocha`} width="10" height="10" patternUnits="userSpaceOnUse">
              <rect width="10" height="10" fill="#8a6a55" />
              <path d="M2.5 0 C1 2.5 4 5 2.5 7.5 C1 10 4 12 2.5 14 M7.5 0 C9 2.5 6 5 7.5 7.5 C9 10 6 12 7.5 14" stroke="#735644" strokeWidth="1.4" fill="none" />
            </pattern>
          </defs>
          <Fabric uid={uid} d={SKIRT.pencilKnee} fill={knit} />
          <Bodice id={`${uid}-b`} neck="crew" bottom={330} fill={knit} />
          <path d="M104 150 L136 150 L138 194 C128 199 112 199 102 194 Z" fill={knit} />
          <path d="M104 150 L136 150 L138 194 C128 199 112 199 102 194 Z" fill={`url(#${uid}-sideShade)`} />
          <g stroke="#6b4f3e" strokeWidth="1">
            {range(106, 134, 4).map((x) => (
              <path key={x} d={`M${x} 152 L${x} 194`} />
            ))}
          </g>
          <path d="M84 396 C108 404 132 404 156 396 L156 402 C132 410 108 410 84 402 Z" fill="#735644" />
        </g>
      ),
      sleeves: <Sleeve id={`${uid}-sl`} end={330} fill={knit} big cuff="#735644" />,
    };
  },

  pastelLehenga: (uid) => {
    const skirt = `url(#${uid}-lehenga)`;
    return {
      back: <path d="M70 200 C58 260 52 330 50 400 L70 404 C72 340 76 270 84 206 Z" fill="#f7b6c8" opacity="0.8" />,
      main: (
        <g>
          <defs>
            <linearGradient id={`${uid}-lehenga`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#ffd6c4" />
              <stop offset="1" stopColor="#f7a98f" />
            </linearGradient>
          </defs>
          <Fabric uid={uid} d={SKIRT.lehenga} fill={skirt} />
          {/* kalis */}
          <g opacity="0.55">
            {[-3, -2, -1, 0, 1, 2, 3].map((k) => (
              <path key={k} d={`M${120 + k * 6} 262 L${120 + k * 26} 506`} stroke="#bfe8d6" strokeWidth="5" />
            ))}
          </g>
          <path d="M34 484 C80 498 160 498 206 484 L212 500 C160 516 80 516 28 500 Z" fill="#e9b949" />
          <GoldDots points={range(40, 200, 10).map((x) => [x, 476 + Math.abs(120 - x) * 0.1] as [number, number])} r={1.6} color="#d79a2a" />
          <rect x="93" y="258" width="54" height="8" rx="2" fill="#e9b949" />
          <Bodice id={`${uid}-b`} neck="scoop" bottom={254} fill="#bfe8d6" />
          <path d="M97 186 C102 212 138 212 143 186" stroke="#e9b949" strokeWidth="2" fill="none" />
          <path d="M78 252 L162 252" stroke="#e9b949" strokeWidth="2.4" />
          {/* dupatta */}
          <path d="M80 196 C96 230 126 270 160 302 L168 290 C140 260 110 222 96 192 Z" fill="#f7b6c8" opacity="0.78" />
          <GoldDots points={[[86, 206], [96, 222], [108, 240], [120, 256], [134, 272], [148, 288], [160, 300]]} r={1.3} />
        </g>
      ),
      sleeves: <Sleeve id={`${uid}-sl`} end={236} fill="#bfe8d6" cuff="#e9b949" />,
    };
  },

  chicSaree: (uid) => {
    const silk = `url(#${uid}-saree)`;
    return {
      back: <path d="M72 198 C60 250 54 320 52 380 L72 386 C74 320 78 260 86 204 Z" fill="#c22e66" />,
      main: (
        <g>
          <defs>
            <linearGradient id={`${uid}-saree`} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#f06292" />
              <stop offset="0.5" stopColor="#e2477e" />
              <stop offset="1" stopColor="#ad1f58" />
            </linearGradient>
          </defs>
          <Fabric uid={uid} d={SKIRT.saree} fill={silk} />
          {/* pleats */}
          <path d="M112 330 L104 500 L136 500 L128 330 Z" fill="#d23c73" />
          <Folds color="#7a0d38" opacity={0.35} d={["M116 330 L110 500", "M120 330 L120 500", "M124 330 L130 500"]} />
          <path d="M70 494 C100 504 140 504 170 494 L170 500 C140 508 100 508 70 500 Z" fill="#f5c451" />
          <Bodice id={`${uid}-b`} neck="scoop" bottom={256} fill="#ad1f58" />
          <path d="M97 186 C102 212 138 212 143 186" stroke="#f5c451" strokeWidth="1.6" fill="none" />
          {/* pallu */}
          <path d="M158 288 C144 268 120 238 102 214 C94 204 88 198 84 194 L100 188 C110 202 128 226 146 250 C158 264 166 276 168 286 Z" fill={silk} />
          <path d="M158 288 C144 268 120 238 102 214 C94 204 88 198 84 194" stroke="#f5c451" strokeWidth="2.4" fill="none" />
          <path d="M100 188 C110 202 128 226 146 250 C158 264 166 276 168 286" stroke="#f5c451" strokeWidth="1.4" fill="none" />
          <GoldDots points={[[104, 206], [116, 222], [128, 238], [140, 254], [152, 270]]} r={1.1} color="#ffe08a" />
        </g>
      ),
      sleeves: <Sleeve id={`${uid}-sl`} end={232} fill="#ad1f58" cuff="#f5c451" />,
    };
  },

  embroideredKurti: (uid) => {
    const kurti = `url(#${uid}-kurti)`;
    return {
      legwear: (
        <Both>
          <path d={PALAZZO_LEG} fill="#fbf7ef" />
          <path d="M100 320 L94 488" stroke="#e6ddc8" strokeWidth="1.2" />
        </Both>
      ),
      main: (
        <g>
          <defs>{grad(`${uid}-kurti`, "#f6c552", "#e0a024")}</defs>
          <Bodice id={`${uid}-ph`} neck="flat" top={300} bottom={340} fill="#fbf7ef" shade={false} />
          <Fabric uid={uid} d="M80 296 C78 330 74 370 70 406 L170 406 C166 370 162 330 160 296 Z" fill={kurti} />
          <Bodice id={`${uid}-b`} neck="v" bottom={312} fill={kurti} />
          <path d="M106 186 L120 222 L134 186" stroke="#c2185b" strokeWidth="3" fill="none" />
          <GoldDots points={[[108, 194], [112, 204], [116, 214], [132, 194], [128, 204], [124, 214]]} r={1.4} color="#fff" />
          <path d="M70 398 L170 398" stroke="#c2185b" strokeWidth="5" />
          <GoldDots points={range(76, 164, 8).map((x) => [x, 398] as [number, number])} r={1.4} color="#fff" />
          <path d="M80 380 L78 406 M160 380 L162 406" stroke="#b98012" strokeWidth="1.2" />
          {[[110, 250], [130, 250], [120, 270], [100, 330], [140, 330], [120, 350]].map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r="3" fill="#c2185b" />
              <circle cx={x} cy={y} r="1.3" fill="#e0f4ff" />
            </g>
          ))}
        </g>
      ),
      sleeves: <Sleeve id={`${uid}-sl`} end={300} fill={kurti} cuff="#c2185b" />,
    };
  },
};

export function renderOutfit(id: OutfitId, uid: string, skin: SkinTone): OutfitLayers & { defs: ReactNode } {
  const layers = (OUTFITS[id] ?? OUTFITS.floralMidi)(uid, skin);
  return { ...layers, defs: <SharedDefs uid={uid} /> };
}
