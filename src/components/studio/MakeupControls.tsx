"use client";

import { useState } from "react";
import { FemaleAvatar } from "@/components/character/FemaleAvatar";
import {
  BINDIS,
  BLUSHES,
  EYELINERS,
  EYESHADOWS,
  LIPSTICKS,
  type Look,
} from "@/data/wardrobe";
import { Chip, OptionCard, Section, Swatch, Toggle } from "./OptionCard";

type MakeupSection = "lips" | "eyes" | "liner" | "blush" | "extras";

const SECTIONS: { id: MakeupSection; label: string }[] = [
  { id: "lips", label: "💄 Lips" },
  { id: "eyes", label: "✨ Shadow" },
  { id: "liner", label: "👁️ Liner" },
  { id: "blush", label: "🌸 Blush" },
  { id: "extras", label: "💎 Extras" },
];

export function MakeupControls({ look, update }: { look: Look; update: (patch: Partial<Look>) => void }) {
  const [section, setSection] = useState<MakeupSection>("lips");

  return (
    <div>
      <div className="no-scrollbar -mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
        {SECTIONS.map((s) => (
          <Chip key={s.id} selected={section === s.id} onClick={() => setSection(s.id)}>
            {s.label}
          </Chip>
        ))}
      </div>

      {section === "lips" && (
        <>
          <Section
            title="Lipstick"
            aside={
              <div className="flex rounded-full bg-white/10 p-0.5 text-xs">
                {(["matte", "glossy"] as const).map((f) => (
                  <button
                    key={f}
                    onClick={() => update({ lipFinish: f })}
                    aria-pressed={look.lipFinish === f}
                    className={`rounded-full px-3 py-1 capitalize transition ${look.lipFinish === f ? "bg-white text-blush-600 font-semibold" : "text-blush-100"}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            }
          >
            <div className="grid grid-cols-5 gap-x-1 gap-y-3 sm:grid-cols-6">
              {LIPSTICKS.map((l) => (
                <Swatch
                  key={l.id}
                  label={l.name}
                  selected={look.lipstick === l.id}
                  onClick={() => update({ lipstick: l.id })}
                  background={
                    look.lipFinish === "glossy"
                      ? `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.85) 0 12%, transparent 30%), linear-gradient(160deg, ${l.color}, ${l.deep})`
                      : l.color
                  }
                />
              ))}
            </div>
          </Section>
        </>
      )}

      {section === "eyes" && (
        <Section title="Eyeshadow palette">
          <div className="grid grid-cols-3 gap-2">
            {EYESHADOWS.map((e) => (
              <OptionCard key={e.id} label={e.name} selected={look.eyeshadow === e.id} onClick={() => update({ eyeshadow: e.id })}>
                <div className="flex h-14 items-center justify-center gap-1">
                  {e.id === "bare" ? (
                    <span className="text-2xl">🚫</span>
                  ) : (
                    <>
                      <span className="h-9 w-9 rounded-full border border-white/40" style={{ background: e.lid }} />
                      <span className="h-9 w-9 rounded-full border border-white/40" style={{ background: e.crease }} />
                      {e.shimmer && <span className="text-sm">✨</span>}
                    </>
                  )}
                </div>
              </OptionCard>
            ))}
          </div>
        </Section>
      )}

      {section === "liner" && (
        <Section title="Eyeliner & lashes">
          <div className="grid grid-cols-3 gap-2">
            {EYELINERS.map((e) => (
              <OptionCard key={e.id} label={e.name} selected={look.eyeliner === e.id} onClick={() => update({ eyeliner: e.id })}>
                <FemaleAvatar look={{ ...look, eyeliner: e.id }} view="eye" animated={false} className="h-16 w-full" />
              </OptionCard>
            ))}
          </div>
        </Section>
      )}

      {section === "blush" && (
        <>
          <Section title="Blush shade">
            <div className="grid grid-cols-5 gap-1">
              {BLUSHES.map((b) => (
                <Swatch
                  key={b.id}
                  label={b.name}
                  size="lg"
                  selected={look.blush === b.id}
                  onClick={() => update({ blush: b.id })}
                  background={`radial-gradient(circle, ${b.color} 0%, ${b.color}88 55%, ${b.color}33 100%)`}
                />
              ))}
            </div>
          </Section>
          <Section title={`Intensity · ${Math.round(look.blushIntensity * 100)}%`}>
            <input
              type="range"
              min={0}
              max={100}
              value={Math.round(look.blushIntensity * 100)}
              onChange={(e) => update({ blushIntensity: Number(e.target.value) / 100 })}
              className="love-range w-full"
              aria-label="Blush intensity"
            />
            <div className="mt-1 flex justify-between text-[10px] text-blush-200/70">
              <span>Barely there</span>
              <span>Flushed</span>
            </div>
          </Section>
        </>
      )}

      {section === "extras" && (
        <>
          <Section title="Bindi">
            <div className="grid grid-cols-4 gap-2">
              {BINDIS.map((b) => (
                <OptionCard key={b.id} label={b.name} selected={look.bindi === b.id} onClick={() => update({ bindi: b.id })}>
                  <div className="grid h-12 place-items-center">
                    {b.id === "none" && <span className="text-xl">🚫</span>}
                    {b.id === "redDot" && <span className="h-4 w-4 rounded-full bg-[#c8102e] shadow" />}
                    {b.id === "maroonDrop" && <span className="h-5 w-3.5 rounded-[50%_50%_50%_50%/60%_60%_40%_40%] bg-[#7a1030]" />}
                    {b.id === "crystal" && <span className="text-xl">💎</span>}
                  </div>
                </OptionCard>
              ))}
            </div>
          </Section>
          <div className="flex flex-col gap-2">
            <Toggle emoji="🌟" label="Cheek highlighter shimmer" on={look.highlighter} onChange={(v) => update({ highlighter: v })} />
            <Toggle emoji="✨" label="Subtle face glitter" on={look.glitter} onChange={(v) => update({ glitter: v })} />
          </div>
        </>
      )}
    </div>
  );
}
