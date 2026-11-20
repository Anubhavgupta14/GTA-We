import { useId, type ReactNode } from "react";

/**
 * Shared geometry for the 240×520 character canvas.
 * Left-side shapes are drawn once and mirrored around x=120 for the right side.
 */
export const CANVAS_W = 240;
export const CANVAS_H = 520;

export const VIEWBOXES = {
  full: "0 0 240 520",
  face: "62 30 116 150",
  upper: "18 14 204 330",
  feet: "62 430 116 92",
  hairThumb: "40 4 160 200",
  outfitThumb: "24 160 192 352",
  eye: "76 96 48 38",
} as const;

export type AvatarView = keyof typeof VIEWBOXES;

/** SVG-safe unique id prefix (React ids contain characters that break url(#id)). */
export function useSvgUid(prefix: string) {
  return `${prefix}${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
}

export function Mirror({ children }: { children: ReactNode }) {
  return <g transform="matrix(-1 0 0 1 240 0)">{children}</g>;
}

/** Renders children as-is and mirrored (left + right side). */
export function Both({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Mirror>{children}</Mirror>
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Her body                                                           */
/* ------------------------------------------------------------------ */

export const F = {
  face: "M120 62 C153 62 166 88 166 118 C166 147 148 168 120 171 C92 168 74 147 74 118 C74 88 87 62 120 62 Z",
  neck: "M108 148 L108 192 C113 197 127 197 132 192 L132 148 Z",
  neckShadow: "M108 160 C114 174 126 174 132 160 L132 171 C126 180 114 180 108 171 Z",
  torso:
    "M110 186 C100 190 82 192 74 200 C68 208 70 224 74 238 C78 252 88 264 92 276 C92 290 84 304 80 322 L160 322 C156 304 148 290 148 276 C152 264 162 252 166 238 C170 224 172 208 166 200 C158 192 140 190 130 186 Z",
  armL: "M78 197 C64 201 60 222 58 246 C56 270 54 300 55 330 L68 331 C69 302 72 276 76 256 C78 244 82 232 86 222 Z",
  handL: "M54 327 C51 337 53 350 59 355 C65 358 70 352 70 343 L68 328 Z",
  legL: "M81 314 C79 350 82 392 88 432 C91 456 93 474 95 487 L107 487 C107 472 108 452 110 432 C113 400 117 360 121 322 Z",
  hips: "M80 312 L160 312 L157 342 C140 350 100 350 83 342 Z",
  footL: "M94 484 C92 492 90 500 92 506 C94 511 104 511 106 506 C108 500 108 492 107 484 Z",
  ear: { cx: 75, cy: 122, rx: 6, ry: 10 },
  /** oversized sleeve (hoodies, jackets, coats) */
  bigSleeveL:
    "M80 195 C60 200 52 226 50 254 C48 282 48 306 50 332 L72 334 C72 306 74 282 78 262 C80 248 86 232 92 222 Z",
};

/* ------------------------------------------------------------------ */
/* Engineer's body (broader shoulders, straight trousers)             */
/* ------------------------------------------------------------------ */

export const M = {
  face: "M120 58 C154 58 168 84 168 116 C168 140 160 158 146 168 C138 174 128 177 120 177 C112 177 102 174 94 168 C80 158 72 140 72 116 C72 84 86 58 120 58 Z",
  neck: "M106 150 L106 198 C112 203 128 203 134 198 L134 150 Z",
  neckShadow: "M106 164 C114 180 126 180 134 164 L134 176 C126 186 114 186 106 176 Z",
  torso:
    "M108 192 C94 194 72 196 64 206 C58 216 60 236 64 256 C68 276 78 292 82 306 L84 326 L156 326 L158 306 C162 292 172 276 176 256 C180 236 182 216 176 206 C168 196 146 194 132 192 Z",
  armL: "M66 204 C54 210 48 236 47 262 C46 290 46 314 48 340 L63 342 C63 314 64 290 67 268 C69 254 72 242 78 232 Z",
  handL: "M46 338 C43 349 45 361 52 366 C59 369 64 363 64 352 L63 339 Z",
  legL: "M84 318 C84 380 86 430 88 490 L113 490 C113 440 116 380 121 330 Z",
  ear: { cx: 72, cy: 120, rx: 6.5, ry: 11 },
  /** shoulder pivot for arm rotation (left arm) */
  shoulderL: { x: 70, y: 210 },
};
