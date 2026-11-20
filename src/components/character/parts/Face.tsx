import {
  getBlush,
  getEyeshadow,
  getLipstick,
  type BindiId,
  type BlushId,
  type EyelinerId,
  type EyeshadowId,
  type LipFinish,
  type LipstickId,
  type SkinTone,
} from "@/data/wardrobe";
import { Both } from "./shared";

export type Expression = "smile" | "happy" | "kiss" | "laugh" | "shy" | "surprised";

export const sparkleStar = (cx: number, cy: number, r: number) =>
  `M${cx} ${cy - r} L${cx + r * 0.22} ${cy - r * 0.22} L${cx + r} ${cy} L${cx + r * 0.22} ${cy + r * 0.22} L${cx} ${cy + r} L${cx - r * 0.22} ${cy + r * 0.22} L${cx - r} ${cy} L${cx - r * 0.22} ${cy - r * 0.22} Z`;

/* ------------------------------------------------------------------ */
/* Lips                                                               */
/* ------------------------------------------------------------------ */

const LIPS: Record<Expression, { upper: string; lower: string; line?: string }> = {
  smile: {
    upper: "M109 150 C112.5 146.5 116.5 146 120 148 C123.5 146 127.5 146.5 131 150 C126 151.3 114 151.3 109 150 Z",
    lower: "M109 150 C114 151.8 126 151.8 131 150 C129 157.5 111 157.5 109 150 Z",
    line: "M108.5 149.6 C114 152.4 126 152.4 131.5 149.6",
  },
  happy: {
    upper: "M107 148.5 C111 146 116 145.5 120 147.5 C124 145.5 129 146 133 148.5 C127 151 113 151 107 148.5 Z",
    lower: "M107 148.5 C113 152.5 127 152.5 133 148.5 C130 158 110 158 107 148.5 Z",
    line: "M106.5 148 C113 153 127 153 133.5 148",
  },
  shy: {
    upper: "M112 150 C114.5 147.5 117.5 147.2 120 148.6 C122.5 147.2 125.5 147.5 128 150 C124.5 151 115.5 151 112 150 Z",
    lower: "M112 150 C116 151.3 124 151.3 128 150 C126.5 155.5 113.5 155.5 112 150 Z",
    line: "M112 150 C116 151.6 124 151.6 128 150",
  },
  kiss: {
    upper: "M114.5 150.5 C114.5 146.5 118 146 120 147.6 C122 146 125.5 146.5 125.5 150.5 C123 151.2 117 151.2 114.5 150.5 Z",
    lower: "M114.5 150.5 C117 151.4 123 151.4 125.5 150.5 C126 156 114 156 114.5 150.5 Z",
    line: "M115 150.8 C118 151.6 122 151.6 125 150.8",
  },
  laugh: {
    upper: "M107 148 C111 145.5 116 145 120 147 C124 145 129 145.5 133 148 C127 149.6 113 149.6 107 148 Z",
    lower: "M107 148 C109 161 131 161 133 148 C131 158 109 158 107 148 Z",
  },
  surprised: {
    upper: "M114.5 150 C114.5 145.5 125.5 145.5 125.5 150 C122 149 118 149 114.5 150 Z",
    lower: "M114.5 150 C118 151.5 122 151.5 125.5 150 C125.5 157 114.5 157 114.5 150 Z",
  },
};

function Lips({
  uid,
  lipstick,
  finish,
  expression,
  skin,
}: {
  uid: string;
  lipstick: LipstickId;
  finish: LipFinish;
  expression: Expression;
  skin: SkinTone;
}) {
  const lip = getLipstick(lipstick);
  const shape = LIPS[expression];
  const sheer = lipstick === "clearGloss";
  const fill = `url(#${uid}-lip)`;
  return (
    <g>
      <defs>
        <linearGradient id={`${uid}-lip`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor={lip.color} />
          <stop offset="1" stopColor={finish === "glossy" ? lip.deep : lip.color} />
        </linearGradient>
      </defs>
      {expression === "laugh" && (
        <>
          <path d="M108.5 148.6 C110 159 130 159 131.5 148.6 C126 150.4 114 150.4 108.5 148.6 Z" fill="#6b1f2a" />
          <path d="M110 149 C116 150.6 124 150.6 130 149 L129 152.2 C123 153.4 117 153.4 111 152.2 Z" fill="#fff" />
          <ellipse cx="120" cy="155.6" rx="5.5" ry="2" fill="#e0607a" />
        </>
      )}
      {expression === "surprised" && (
        <ellipse cx="120" cy="151.5" rx="4" ry="4.2" fill="#6b1f2a" />
      )}
      {/* natural lip base so sheer glosses read as tinted */}
      <g fill={skin.shade} opacity={sheer ? 0.9 : 0}>
        <path d={shape.upper} />
        <path d={shape.lower} />
      </g>
      <g fill={fill} opacity={sheer ? 0.55 : 0.97}>
        <path d={shape.upper} />
        <path d={shape.lower} />
      </g>
      {shape.line && (
        <path d={shape.line} fill="none" stroke={lip.deep} strokeWidth="0.9" strokeLinecap="round" opacity="0.8" />
      )}
      {finish === "glossy" && expression !== "laugh" && (
        <g fill="#fff">
          <ellipse cx="122.5" cy={expression === "kiss" ? 153.2 : 153.6} rx="3.6" ry="1.1" opacity="0.75" />
          <ellipse cx="115.5" cy="148.3" rx="1.6" ry="0.6" opacity="0.6" />
          <circle cx="127" cy="152.6" r="0.6" opacity="0.8" />
        </g>
      )}
      {finish === "matte" && (
        <path d={shape.lower} fill="none" stroke={lip.deep} strokeWidth="0.4" opacity="0.5" />
      )}
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Eyes                                                               */
/* ------------------------------------------------------------------ */

const EYE_WHITE = "M89 121 C92 113 109 112 113 120 C110 127 93 128 89 121 Z";
const LASH_LINE = "M87.5 121.5 C91 112.4 108 110.6 114 119";
const LID_REGION = "M86 122 C85 107 109 100 117 117 C108 110.5 92 111.5 86 122 Z";

function Eyeliner({ style }: { style: EyelinerId }) {
  const ink = "#1f1418";
  switch (style) {
    case "classicWing":
      return (
        <g fill={ink}>
          <path d={LASH_LINE} fill="none" stroke={ink} strokeWidth="2.7" strokeLinecap="round" />
          <path d="M89.5 120.5 L79.5 113.6 L91.5 116.6 Z" />
        </g>
      );
    case "catEye":
      return (
        <g fill={ink}>
          <path d={LASH_LINE} fill="none" stroke={ink} strokeWidth="3.3" strokeLinecap="round" />
          <path d="M90.5 121 L74.5 109.5 L93.5 115.6 Z" />
          <path d="M89 122.5 C92 125.8 97 126.6 101 126.4" fill="none" stroke={ink} strokeWidth="1.2" strokeLinecap="round" />
        </g>
      );
    case "softKohl":
      return (
        <g fill="none" stroke="#2b1d22" strokeLinecap="round" style={{ filter: "blur(0.6px)" }}>
          <path d={LASH_LINE} strokeWidth="3.2" opacity="0.8" />
          <path d="M90 123.5 C95 128.6 107 128.6 112.5 123.2" strokeWidth="2" opacity="0.65" />
        </g>
      );
    case "dramatic":
      return (
        <g fill="none" stroke={ink} strokeLinecap="round">
          <path d={LASH_LINE} strokeWidth="3" />
          <path d="M89.5 120.5 L81 114.5" strokeWidth="2.4" />
          <path d="M88.8 119.2 C85 117 83 114 82.6 111" strokeWidth="1.3" />
          <path d="M90.6 116.6 C88 113.6 87 110.4 87.4 107.4" strokeWidth="1.3" />
          <path d="M93.6 114.4 C92 111 92 108 93 105.6" strokeWidth="1.2" />
          <path d="M97.4 113 C96.8 109.8 97.4 107 98.8 104.8" strokeWidth="1.1" />
          <path d="M101.6 112.4 C101.8 109.4 103 107 104.6 105.4" strokeWidth="1" />
          <path d="M105.8 112.6 C106.6 110 108 108.2 109.6 107.2" strokeWidth="0.9" />
        </g>
      );
    default:
      return <path d={LASH_LINE} fill="none" stroke={ink} strokeWidth="2" strokeLinecap="round" />;
  }
}

function OpenEye({ uid, liner, blinkDelay }: { uid: string; liner: EyelinerId; blinkDelay: number | null }) {
  return (
    <g className={blinkDelay !== null ? "avatar-blink" : undefined} style={blinkDelay !== null ? { animationDelay: `${blinkDelay}s` } : undefined}>
      <path d={EYE_WHITE} fill="#fffaf8" />
      <path d="M89 121 C92 113 109 112 113 120 C104 116 95 116 89 121 Z" fill="#000" opacity="0.08" />
      <circle cx="101.5" cy="120.2" r="5.9" fill={`url(#${uid}-iris)`} />
      <circle cx="101.5" cy="120.2" r="2.7" fill="#140c0c" />
      <circle cx="103.6" cy="118.1" r="1.7" fill="#fff" />
      <circle cx="99.6" cy="122.4" r="0.8" fill="#fff" opacity="0.8" />
      <Eyeliner style={liner} />
      {liner !== "dramatic" && (
        <g stroke="#1f1418" strokeWidth="1.1" strokeLinecap="round" fill="none">
          <path d="M89 119.4 C87 118.4 85.6 117.2 84.6 115.6" />
          <path d="M91.4 116.4 C89.8 115 88.8 113.4 88.4 111.6" />
          <path d="M94.8 114.4 C94 112.8 93.6 111.2 93.8 109.6" />
        </g>
      )}
      <path d="M91 124.2 C96 127.2 106 127.2 111 123.4" fill="none" stroke="#8a5a4a" strokeWidth="0.7" opacity="0.45" />
    </g>
  );
}

function ClosedEye({ happy, liner }: { happy: boolean; liner: EyelinerId }) {
  const ink = "#1f1418";
  if (happy) {
    return (
      <path d="M89 123.5 C94 115.5 108 115.5 113 123.5" fill="none" stroke={ink} strokeWidth="2.4" strokeLinecap="round" />
    );
  }
  return (
    <g fill="none" stroke={ink} strokeLinecap="round">
      <path d="M88.5 120 C94 125.6 108 125.6 113.5 120" strokeWidth={liner === "catEye" || liner === "dramatic" ? 2.8 : 2.1} />
      <path d="M90 122 L87 125.5" strokeWidth="1" />
      <path d="M93.5 124 L91.5 127.6" strokeWidth="1" />
      <path d="M97.5 125 L96.6 128.6" strokeWidth="1" />
    </g>
  );
}

/* ------------------------------------------------------------------ */
/* Full face                                                          */
/* ------------------------------------------------------------------ */

export interface FemaleFaceProps {
  uid: string;
  skin: SkinTone;
  browColor: string;
  lipstick: LipstickId;
  lipFinish: LipFinish;
  eyeshadow: EyeshadowId;
  eyeliner: EyelinerId;
  blush: BlushId;
  blushIntensity: number;
  bindi: BindiId;
  highlighter: boolean;
  glitter: boolean;
  expression: Expression;
  blushing: boolean;
  animated: boolean;
}

export function FemaleFace(p: FemaleFaceProps) {
  const { uid, skin } = p;
  const shadow = getEyeshadow(p.eyeshadow);
  const blush = getBlush(p.blush);
  const closed = p.expression === "kiss" || p.expression === "happy" || p.expression === "laugh" || p.expression === "shy";
  const happyEyes = p.expression === "happy" || p.expression === "laugh";
  const blushOpacity = Math.min(1, p.blushIntensity * 0.85 + (p.blushing ? 0.45 : 0));

  return (
    <g>
      <defs>
        <radialGradient id={`${uid}-face`} cx="0.45" cy="0.42" r="0.62">
          <stop offset="0" stopColor={skin.light} />
          <stop offset="0.6" stopColor={skin.base} />
          <stop offset="1" stopColor={skin.shade} />
        </radialGradient>
        <radialGradient id={`${uid}-iris`} cx="0.5" cy="0.35" r="0.65">
          <stop offset="0" stopColor="#a36a3c" />
          <stop offset="0.7" stopColor="#5a321b" />
          <stop offset="1" stopColor="#2c170c" />
        </radialGradient>
        <radialGradient id={`${uid}-blush`}>
          <stop offset="0" stopColor={blush.color} stopOpacity="0.85" />
          <stop offset="1" stopColor={blush.color} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${uid}-hl`}>
          <stop offset="0" stopColor="#fffbe8" stopOpacity="0.95" />
          <stop offset="1" stopColor="#ffe6b0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`${uid}-shadow`} gradientUnits="userSpaceOnUse" x1="0" y1="102" x2="0" y2="121">
          <stop offset="0" stopColor={shadow.crease} stopOpacity="0" />
          <stop offset="0.35" stopColor={shadow.crease} stopOpacity="0.75" />
          <stop offset="1" stopColor={shadow.lid} stopOpacity="0.95" />
        </linearGradient>
      </defs>

      {/* ears */}
      <Both>
        <ellipse cx="75" cy="122" rx="6.5" ry="10.5" fill={skin.base} />
        <path d="M74 116 C71 120 72 127 75 129" fill="none" stroke={skin.shade} strokeWidth="1.4" strokeLinecap="round" />
      </Both>

      {/* face */}
      <path d="M120 62 C153 62 166 88 166 118 C166 147 148 168 120 171 C92 168 74 147 74 118 C74 88 87 62 120 62 Z" fill={`url(#${uid}-face)`} />

      {/* blush */}
      <g opacity={blushOpacity}>
        <Both>
          <ellipse cx="95" cy="139" rx="12.5" ry="7.5" fill={`url(#${uid}-blush)`} />
        </Both>
      </g>
      {p.blushing && (
        <g stroke="#e0507a" strokeWidth="1" strokeLinecap="round" opacity="0.55">
          <Both>
            <path d="M90 136.5 L88 140.5 M95 136.5 L93 140.5 M100 136.5 L98 140.5" />
          </Both>
        </g>
      )}

      {/* highlighter */}
      {p.highlighter && (
        <g>
          <Both>
            <ellipse cx="97" cy="131" rx="8" ry="3" fill={`url(#${uid}-hl)`} />
            <path d={sparkleStar(101, 129.5, 2.2)} fill="#fff" opacity="0.9" />
          </Both>
          <path d="M120 117 L120 131" stroke="#fff8e6" strokeWidth="1.6" strokeLinecap="round" opacity="0.45" />
          <ellipse cx="120" cy="162" rx="3" ry="1.4" fill="#fff8e6" opacity="0.4" />
        </g>
      )}

      {/* eyeshadow */}
      {shadow.id !== "bare" && (
        <Both>
          <path d={LID_REGION} fill={`url(#${uid}-shadow)`} />
          {shadow.shimmer && (
            <g fill="#fff">
              <circle cx="95" cy="114.5" r="0.7" opacity="0.9" />
              <circle cx="100.5" cy="112.6" r="0.55" opacity="0.8" />
              <circle cx="106.5" cy="113.4" r="0.75" opacity="0.9" />
              <circle cx="103" cy="116" r="0.5" opacity="0.7" />
              <circle cx="110" cy="115.5" r="0.5" opacity="0.8" />
            </g>
          )}
        </Both>
      )}

      {/* crease */}
      <Both>
        <path d="M89.5 113.5 C96 108 106 107.4 112.5 112" fill="none" stroke={skin.shade} strokeWidth="0.9" opacity="0.5" />
      </Both>

      {/* eyes */}
      <Both>
        {closed ? (
          <ClosedEye happy={happyEyes} liner={p.eyeliner} />
        ) : (
          <OpenEye uid={uid} liner={p.eyeliner} blinkDelay={p.animated ? 0.4 : null} />
        )}
      </Both>

      {/* brows */}
      <Both>
        <path
          d={
            p.expression === "surprised"
              ? "M87 101 C93 94 106 93 114 97.5"
              : p.expression === "shy"
                ? "M87 104.5 C93 100.5 106 99 114 100.5"
                : "M87 106 C93 99 106 98 114 102.5"
          }
          fill="none"
          stroke={p.browColor}
          strokeWidth="3.1"
          strokeLinecap="round"
        />
      </Both>

      {/* nose */}
      <path d="M119.5 126 C118.4 132.5 116.8 136.6 118.6 139.4" fill="none" stroke={skin.shade} strokeWidth="1.3" strokeLinecap="round" opacity="0.75" />
      <path d="M115.6 140.2 C117.6 141.8 122.4 141.8 124.4 140.2" fill="none" stroke={skin.shade} strokeWidth="1.1" strokeLinecap="round" opacity="0.6" />

      <Lips uid={uid} lipstick={p.lipstick} finish={p.lipFinish} expression={p.expression} skin={skin} />

      {/* bindi */}
      {p.bindi === "redDot" && (
        <g>
          <circle cx="120" cy="99" r="2.7" fill="#c8102e" />
          <circle cx="119.2" cy="98.2" r="0.8" fill="#fff" opacity="0.6" />
        </g>
      )}
      {p.bindi === "maroonDrop" && (
        <g>
          <path d="M120 94.5 C122.6 98 123.2 100.6 120 102.8 C116.8 100.6 117.4 98 120 94.5 Z" fill="#7a1030" />
          <circle cx="120" cy="92.4" r="1" fill="#e9c46a" />
        </g>
      )}
      {p.bindi === "crystal" && (
        <g>
          <path d="M120 94.6 L123.2 99 L120 103.4 L116.8 99 Z" fill="#c9ecff" stroke="#7fb7da" strokeWidth="0.5" />
          <path d="M120 94.6 L121.4 99 L120 103.4 Z" fill="#fff" opacity="0.7" />
          <path d={sparkleStar(123.5, 95.5, 2.2)} fill="#fff" />
        </g>
      )}

      {/* face glitter */}
      {p.glitter && (
        <Both>
          {[
            [83.5, 128, 2.2, "#fff6c9", 0],
            [87.5, 134, 1.6, "#ffd1e6", 0.6],
            [81.5, 121, 1.4, "#ffffff", 1.1],
            [92, 138.5, 1.2, "#fff6c9", 1.6],
          ].map(([x, y, r, c, d], i) => (
            <path key={i} d={sparkleStar(x as number, y as number, r as number)} fill={c as string}>
              <animate attributeName="opacity" values="1;0.25;1" dur="1.8s" begin={`${d}s`} repeatCount="indefinite" />
            </path>
          ))}
        </Both>
      )}
    </g>
  );
}
