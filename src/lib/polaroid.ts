"use client";

/**
 * Renders the live date stage into a Polaroid PNG.
 *
 * Every element marked `[data-capture]` inside the stage holds one SVG. Each is serialized
 * to an image and drawn onto a canvas at its on-screen position — including the rotation
 * and scale of any animated ancestors — so the photo matches what the player sees.
 */

function matrixOf(el: Element): DOMMatrix {
  const t = getComputedStyle(el).transform;
  return t && t !== "none" ? new DOMMatrix(t) : new DOMMatrix();
}

function cumulativeMatrix(el: HTMLElement, root: HTMLElement): DOMMatrix {
  let m = new DOMMatrix();
  let node: HTMLElement | null = el;
  while (node && node !== root) {
    m = matrixOf(node).multiply(m);
    node = node.parentElement;
  }
  return m;
}

function svgToImage(svg: SVGSVGElement, w: number, h: number, scale: number): Promise<HTMLImageElement> {
  const clone = svg.cloneNode(true) as SVGSVGElement;
  clone.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  clone.setAttribute("width", String(Math.round(w * scale)));
  clone.setAttribute("height", String(Math.round(h * scale)));
  clone.removeAttribute("class");
  clone.style.removeProperty("width");
  clone.style.removeProperty("height");
  const markup = new XMLSerializer().serializeToString(clone);
  const url = URL.createObjectURL(new Blob([markup], { type: "image/svg+xml;charset=utf-8" }));
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      URL.revokeObjectURL(url);
      resolve(img);
    };
    img.onerror = (e) => {
      URL.revokeObjectURL(url);
      reject(e);
    };
    img.src = url;
  });
}

/** Draws the stage (all capture layers) to a canvas the size of the stage. */
export async function renderStage(stage: HTMLElement, scale = 2): Promise<HTMLCanvasElement> {
  const box = stage.getBoundingClientRect();
  const canvas = document.createElement("canvas");
  canvas.width = Math.round(box.width * scale);
  canvas.height = Math.round(box.height * scale);
  const ctx = canvas.getContext("2d")!;
  ctx.scale(scale, scale);
  ctx.fillStyle = "#1d1036";
  ctx.fillRect(0, 0, box.width, box.height);

  const layers = Array.from(stage.querySelectorAll<HTMLElement>("[data-capture]"));
  for (const layer of layers) {
    const svg = layer.querySelector("svg");
    if (!svg) continue;
    const w = layer.offsetWidth;
    const h = layer.offsetHeight;
    if (!w || !h) continue;
    const r = layer.getBoundingClientRect();
    const m = cumulativeMatrix(layer, stage);
    const angle = Math.atan2(m.b, m.a);
    const sx = Math.hypot(m.a, m.b);
    const sy = Math.hypot(m.c, m.d);
    try {
      const img = await svgToImage(svg, w, h, scale * Math.max(sx, sy));
      ctx.save();
      ctx.translate(r.left + r.width / 2 - box.left, r.top + r.height / 2 - box.top);
      ctx.rotate(angle);
      ctx.scale(sx, sy);
      ctx.drawImage(img, -w / 2, -h / 2, w, h);
      ctx.restore();
    } catch {
      /* skip a layer that failed to rasterize */
    }
  }
  return canvas;
}

export interface PolaroidOptions {
  caption: string;
  subcaption: string;
  stamp: string;
  fontFamily: string;
  love: number;
}

/** Wraps a photo canvas in a Polaroid frame. Returns PNG + compact JPEG data URLs. */
export async function makePolaroid(photo: HTMLCanvasElement, o: PolaroidOptions) {
  const W = 1000;
  const pad = 56;
  const photoW = W - pad * 2;
  const photoH = Math.round(photoW * 1.0);
  const H = pad + photoH + 230;

  try {
    await document.fonts.load(`700 64px ${o.fontFamily}`);
  } catch {
    /* fall back to system font */
  }

  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const ctx = c.getContext("2d")!;

  // paper
  const paper = ctx.createLinearGradient(0, 0, W, H);
  paper.addColorStop(0, "#fffdf8");
  paper.addColorStop(1, "#f6efe4");
  ctx.fillStyle = paper;
  ctx.fillRect(0, 0, W, H);

  // photo (cover-crop, biased towards the bottom where the couple stands)
  const srcRatio = photo.width / photo.height;
  const dstRatio = photoW / photoH;
  let sw = photo.width;
  let sh = photo.height;
  let sx = 0;
  let sy = 0;
  if (srcRatio > dstRatio) {
    sw = photo.height * dstRatio;
    sx = (photo.width - sw) / 2;
  } else {
    sh = photo.width / dstRatio;
    sy = (photo.height - sh) * 0.75;
  }
  ctx.fillStyle = "#1d1036";
  ctx.fillRect(pad, pad, photoW, photoH);
  ctx.drawImage(photo, sx, sy, sw, sh, pad, pad, photoW, photoH);

  // warm film tint + vignette
  ctx.fillStyle = "rgba(255, 190, 150, 0.08)";
  ctx.fillRect(pad, pad, photoW, photoH);
  const vg = ctx.createRadialGradient(W / 2, pad + photoH / 2, photoH * 0.35, W / 2, pad + photoH / 2, photoH * 0.75);
  vg.addColorStop(0, "rgba(0,0,0,0)");
  vg.addColorStop(1, "rgba(0,0,0,0.28)");
  ctx.fillStyle = vg;
  ctx.fillRect(pad, pad, photoW, photoH);
  ctx.strokeStyle = "rgba(0,0,0,0.12)";
  ctx.lineWidth = 2;
  ctx.strokeRect(pad, pad, photoW, photoH);

  // retro date stamp
  ctx.font = "700 34px ui-monospace, Menlo, monospace";
  ctx.textAlign = "right";
  ctx.shadowColor = "rgba(255,120,40,0.9)";
  ctx.shadowBlur = 10;
  ctx.fillStyle = "#ff8a3d";
  ctx.fillText(o.stamp, pad + photoW - 24, pad + photoH - 24);
  ctx.shadowBlur = 0;

  // captions
  ctx.textAlign = "center";
  ctx.fillStyle = "#3a2350";
  ctx.font = `700 66px ${o.fontFamily}`;
  ctx.fillText(o.caption, W / 2, pad + photoH + 100);
  ctx.fillStyle = "#8a6a8a";
  ctx.font = `500 40px ${o.fontFamily}`;
  ctx.fillText(o.subcaption, W / 2, pad + photoH + 160);

  // doodles
  ctx.fillStyle = "#f0517f";
  ctx.font = "44px serif";
  ctx.fillText("♥", pad + 40, pad + photoH + 100);
  ctx.fillText("♥", W - pad - 40, pad + photoH + 100);
  ctx.font = `600 32px ${o.fontFamily}`;
  ctx.fillStyle = "#d63368";
  ctx.textAlign = "right";
  ctx.fillText(`love ${Math.round(o.love)}%`, W - pad, H - 26);

  const png = c.toDataURL("image/png");

  const t = document.createElement("canvas");
  t.width = 640;
  t.height = Math.round((H / W) * 640);
  t.getContext("2d")!.drawImage(c, 0, 0, t.width, t.height);
  const jpeg = t.toDataURL("image/jpeg", 0.82);
  return { png, jpeg };
}

export function downloadDataUrl(url: string, filename: string) {
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
}

/** Converts any image data URL to a PNG data URL (album downloads are always PNG). */
export function toPng(dataUrl: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const c = document.createElement("canvas");
      c.width = img.naturalWidth * 2;
      c.height = img.naturalHeight * 2;
      const ctx = c.getContext("2d")!;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(img, 0, 0, c.width, c.height);
      resolve(c.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = dataUrl;
  });
}
