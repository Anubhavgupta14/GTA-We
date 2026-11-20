import type { HairColor, HairStyleId } from "@/data/wardrobe";
import { Both } from "./shared";

interface HairProps {
  uid: string;
  style: HairStyleId;
  color: HairColor;
  animated?: boolean;
}

export function HairDefs({ uid, color }: { uid: string; color: HairColor }) {
  return (
    <defs>
      <linearGradient id={`${uid}-hair`} x1="0" y1="0" x2="0.35" y2="1">
        <stop offset="0" stopColor={color.shine} />
        <stop offset="0.28" stopColor={color.base} />
        <stop offset="1" stopColor={color.shade} />
      </linearGradient>
      <linearGradient id={`${uid}-hairBack`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor={color.base} />
        <stop offset="1" stopColor={color.shade} />
      </linearGradient>
    </defs>
  );
}

/** Thin shine & strand strokes that sell the "crafted" look. */
function Strands({ d, color, width = 1.2, opacity = 0.5 }: { d: string[]; color: string; width?: number; opacity?: number }) {
  return (
    <g fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" opacity={opacity}>
      {d.map((p, i) => (
        <path key={i} d={p} />
      ))}
    </g>
  );
}

function Streaks({ color }: { color?: string }) {
  if (!color) return null;
  return (
    <Strands
      color={color}
      width={2.4}
      opacity={0.75}
      d={["M100 56 C88 70 82 90 80 116", "M134 54 C150 66 158 84 160 108", "M116 50 C110 60 104 72 100 86"]}
    />
  );
}

/* ------------------------------------------------------------------ */
/* Back layer                                                         */
/* ------------------------------------------------------------------ */

export function HairBack({ uid, style, color, animated = true }: HairProps) {
  const fill = `url(#${uid}-hairBack)`;
  switch (style) {
    case "longWavy":
      return (
        <g>
          <path
            d="M66 120 C58 70 92 42 122 42 C156 42 184 70 176 122 C182 160 172 190 184 220 C194 250 176 280 186 306 C170 318 150 312 140 300 L100 300 C90 312 70 318 54 306 C64 280 46 250 56 220 C68 190 58 160 66 120 Z"
            fill={fill}
          />
          <Strands
            color={color.shine}
            opacity={0.35}
            d={["M62 200 C70 230 56 250 64 280", "M178 200 C170 230 184 250 176 280", "M70 150 C64 175 72 190 66 210"]}
          />
        </g>
      );
    case "highPonytail":
      return (
        <g>
          <g>
            {animated && (
              <animateTransform attributeName="transform" type="rotate" values="0 132 54;5 132 54;0 132 54;-3 132 54;0 132 54" dur="4.2s" repeatCount="indefinite" />
            )}
            <path
              d="M126 52 C152 28 190 40 194 80 C198 118 184 154 198 204 C186 200 176 186 172 166 C166 136 176 104 166 82 C160 68 146 60 132 62 Z"
              fill={fill}
            />
            <Strands color={color.shine} opacity={0.45} d={["M150 44 C174 52 184 76 182 110", "M182 120 C178 150 184 176 192 196"]} />
          </g>
          <path d="M70 120 C66 76 94 48 120 48 C146 48 174 76 170 120 C170 140 168 150 164 156 L76 156 C72 150 70 140 70 120 Z" fill={fill} />
        </g>
      );
    case "messyBun":
      return (
        <g>
          <path d="M70 120 C66 76 94 48 120 48 C146 48 174 76 170 120 C170 140 168 150 164 156 L76 156 C72 150 70 140 70 120 Z" fill={fill} />
        </g>
      );
    case "bob":
      return (
        <path
          d="M66 118 C60 70 92 44 120 44 C148 44 180 70 174 118 C176 140 180 160 174 182 C162 188 150 184 146 178 L94 178 C90 184 78 188 66 182 C60 160 64 140 66 118 Z"
          fill={fill}
        />
      );
    case "braids":
      return (
        <path d="M68 118 C62 70 92 44 120 44 C148 44 178 70 172 118 C174 150 170 170 160 182 L80 182 C70 170 66 150 68 118 Z" fill={fill} />
      );
    case "halfUp":
    case "sleekStraight":
      return (
        <g>
          <path
            d={
              style === "halfUp"
                ? "M66 118 C60 70 92 42 120 42 C148 42 180 70 174 118 C178 180 182 250 180 302 C164 310 140 306 132 300 L108 300 C100 306 76 310 60 302 C58 250 62 180 66 118 Z"
                : "M66 118 C62 70 92 42 120 42 C148 42 178 70 174 118 L182 332 C162 338 142 334 132 328 L108 328 C98 334 78 338 58 332 Z"
            }
            fill={fill}
          />
          <Strands color={color.shine} opacity={0.3} d={["M68 170 L64 300", "M172 170 L176 300"]} />
        </g>
      );
    case "curly": {
      const curls: [number, number, number][] = [
        [70, 92, 24], [88, 60, 26], [120, 46, 28], [152, 60, 26], [170, 92, 24], [180, 126, 24], [178, 160, 23], [172, 192, 21],
        [60, 126, 24], [62, 160, 23], [68, 192, 21], [82, 214, 17], [158, 214, 17], [104, 210, 14], [136, 210, 14],
      ];
      return (
        <g fill={fill}>
          <ellipse cx="120" cy="136" rx="58" ry="80" />
          {curls.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} />
          ))}
          <Strands
            color={color.shine}
            opacity={0.4}
            d={["M58 150 c4 -6 10 -2 8 4", "M178 150 c-4 -6 -10 -2 -8 4", "M70 196 c4 -6 10 -2 8 4", "M170 196 c-4 -6 -10 -2 -8 4", "M84 52 c4 -6 10 -2 8 4", "M150 52 c4 -6 10 -2 8 4"]}
          />
        </g>
      );
    }
    case "chignon":
      return (
        <g>
          <path d="M70 120 C66 76 94 48 120 48 C146 48 174 76 170 120 C170 140 168 150 164 156 L76 156 C72 150 70 140 70 120 Z" fill={fill} />
          <ellipse cx="120" cy="164" rx="44" ry="20" fill={fill} />
          {/* gajra (jasmine) peeking out */}
          <g fill="#fffdf4" stroke="#e8e2c8" strokeWidth="0.5">
            {[[160, 156], [165, 162], [163, 170], [157, 176], [77, 158], [74, 166]].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="3.2" />
                <circle cx={x} cy={y} r="1" fill="#f3e3a0" stroke="none" />
              </g>
            ))}
          </g>
        </g>
      );
  }
}

/* ------------------------------------------------------------------ */
/* Front layer                                                        */
/* ------------------------------------------------------------------ */

const SIDE_PART_CAP =
  "M72 128 C66 78 92 46 124 46 C156 46 176 76 168 128 C166 112 160 96 150 88 C138 96 112 98 96 92 C86 100 78 112 72 128 Z";
const SLEEK_CAP = "M72 124 C68 76 94 48 120 48 C146 48 172 76 168 124 C164 100 150 80 120 78 C90 80 76 100 72 124 Z";
const CENTER_CAP =
  "M72 124 C68 76 92 46 120 48 C148 46 172 76 168 124 C166 104 156 84 124 78 L120 74 L116 78 C84 84 74 104 72 124 Z";

export function HairFront({ uid, style, color }: HairProps) {
  const fill = `url(#${uid}-hair)`;
  switch (style) {
    case "longWavy":
      return (
        <g>
          <path d={SIDE_PART_CAP} fill={fill} />
          <Both>
            <path
              d="M74 120 C64 150 78 176 70 200 C62 224 80 246 74 270 C88 264 94 244 88 224 C84 204 94 180 86 156 C82 142 80 130 74 120 Z"
              fill={fill}
            />
          </Both>
          <Strands color={color.shine} opacity={0.55} d={["M106 54 C94 62 86 76 82 96", "M138 52 C152 60 160 74 162 96", "M120 50 C114 58 110 70 108 80"]} />
          <Streaks color={color.streak} />
        </g>
      );
    case "highPonytail":
      return (
        <g>
          <path d={SLEEK_CAP} fill={fill} />
          <Strands color={color.shine} opacity={0.5} d={["M100 54 C110 60 120 60 130 54", "M86 72 C100 66 114 62 128 56", "M154 72 C146 64 140 60 132 56"]} />
          <ellipse cx="130" cy="52" rx="8" ry="5" fill="#f06292" transform="rotate(-20 130 52)" />
          <ellipse cx="130" cy="52" rx="4" ry="2" fill="#ff9fc0" transform="rotate(-20 130 52)" />
          <Streaks color={color.streak} />
        </g>
      );
    case "messyBun":
      return (
        <g>
          <circle cx="120" cy="38" r="21" fill={fill} />
          <Strands color={color.shine} opacity={0.6} d={["M104 34 C110 22 130 20 136 32", "M108 46 C116 40 128 40 134 46", "M101 40 C96 30 104 18 116 18"]} />
          <path d={SLEEK_CAP} fill={fill} />
          <Strands
            color={color.base}
            opacity={0.95}
            width={2.4}
            d={["M78 104 C72 124 78 140 73 158", "M162 104 C168 124 162 140 167 158", "M96 82 C92 92 92 100 95 108"]}
          />
          <Strands color={color.shine} opacity={0.4} d={["M104 56 C112 62 128 62 136 56"]} />
          <Streaks color={color.streak} />
        </g>
      );
    case "bob":
      return (
        <g>
          <path
            d="M72 120 C68 74 94 48 120 48 C146 48 172 74 168 120 C164 106 160 96 157 92 C140 97 100 97 83 92 C80 96 76 106 72 120 Z"
            fill={fill}
          />
          <Both>
            <path d="M72 116 C69 140 71 162 78 180 C86 176 86 160 84 140 C82 128 80 118 78 110 Z" fill={fill} />
          </Both>
          <Strands color={color.shine} opacity={0.5} d={["M92 60 C100 56 120 54 138 58", "M90 92 L92 76", "M108 95 L109 78", "M128 95 L128 78", "M148 93 L147 76"]} />
          <Streaks color={color.streak} />
        </g>
      );
    case "braids": {
      const seg = Array.from({ length: 9 }, (_, i) => i);
      return (
        <g>
          <path d={CENTER_CAP} fill={fill} />
          <Both>
            <g>
              {seg.map((i) => (
                <ellipse
                  key={i}
                  cx={i % 2 ? 83 : 80}
                  cy={150 + i * 16}
                  rx="9.5"
                  ry="10.5"
                  fill={fill}
                  stroke={color.shade}
                  strokeWidth="0.8"
                  transform={`rotate(${i % 2 ? 22 : -22} ${i % 2 ? 83 : 80} ${150 + i * 16})`}
                />
              ))}
              <rect x="76" y="290" width="10" height="5" rx="2.5" fill="#f06292" />
              <path d="M78 295 C76 304 78 310 74 316 M82 295 C82 304 84 310 86 316 M80 295 L80 318" stroke={color.base} strokeWidth="2.4" strokeLinecap="round" fill="none" />
              <path d="M76 132 C74 140 76 146 80 148" fill="none" stroke={color.base} strokeWidth="6" strokeLinecap="round" />
            </g>
          </Both>
          <Strands color={color.shine} opacity={0.5} d={["M116 56 C100 62 88 76 82 98", "M124 56 C140 62 152 76 158 98"]} />
          <Streaks color={color.streak} />
        </g>
      );
    }
    case "halfUp":
      return (
        <g>
          <path d={CENTER_CAP} fill={fill} />
          <Both>
            <path d="M74 120 C70 160 72 220 70 270 C78 274 86 272 90 266 C88 220 86 170 84 136 C82 128 78 122 74 120 Z" fill={fill} />
          </Both>
          {/* bow */}
          <g transform="translate(150 54) rotate(18)">
            <path d="M0 0 C-12 -10 -18 -2 -14 6 C-10 12 -4 6 0 0 Z" fill="#f48fb1" />
            <path d="M0 0 C12 -10 18 -2 14 6 C10 12 4 6 0 0 Z" fill="#f48fb1" />
            <path d="M0 0 L-5 14 M0 0 L5 14" stroke="#ec6f9c" strokeWidth="2.4" strokeLinecap="round" />
            <circle r="3.4" fill="#ec6f9c" />
          </g>
          <Strands color={color.shine} opacity={0.55} d={["M114 58 C100 64 88 78 82 100", "M126 58 C140 64 152 78 158 100"]} />
          <Streaks color={color.streak} />
        </g>
      );
    case "curly": {
      const front: [number, number, number][] = [
        [82, 88, 14], [96, 74, 14], [112, 66, 14], [128, 66, 14], [144, 74, 14], [158, 88, 14], [75, 106, 12], [165, 106, 12],
      ];
      return (
        <g>
          {front.map(([x, y, r], i) => (
            <circle key={i} cx={x} cy={y} r={r} fill={fill} />
          ))}
          <Strands
            color={color.shine}
            opacity={0.55}
            d={["M90 70 c4 -6 10 -2 8 4", "M118 58 c4 -6 10 -2 8 4", "M146 68 c4 -6 10 -2 8 4", "M78 96 c4 -6 10 -2 8 4", "M158 96 c4 -6 10 -2 8 4"]}
          />
          <Streaks color={color.streak} />
        </g>
      );
    }
    case "sleekStraight":
      return (
        <g>
          <path d={CENTER_CAP} fill={fill} />
          <Both>
            <path d="M74 120 L72 304 C78 310 86 308 90 302 L86 160 C84 140 80 128 74 120 Z" fill={fill} />
            <path d="M80 150 L79 290" stroke={color.shine} strokeWidth="2" opacity="0.4" strokeLinecap="round" />
          </Both>
          <Strands color={color.shine} opacity={0.6} width={2} d={["M112 58 C98 64 88 78 84 100", "M128 58 C142 64 152 78 156 100"]} />
          <Streaks color={color.streak} />
        </g>
      );
    case "chignon":
      return (
        <g>
          <path d={SIDE_PART_CAP} fill={fill} />
          <Strands color={color.shine} opacity={0.5} d={["M106 54 C94 62 86 76 82 96", "M138 52 C152 60 160 74 162 96"]} />
          <path d="M78 108 C74 120 76 132 80 140" stroke={color.base} strokeWidth="2.6" fill="none" strokeLinecap="round" />
          <Streaks color={color.streak} />
        </g>
      );
  }
}
