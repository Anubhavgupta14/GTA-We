"use client";

import { useState } from "react";
import { FemaleAvatar } from "@/components/character/FemaleAvatar";
import {
  BAGS,
  EARRINGS,
  FOOTWEAR,
  HAIR_COLORS,
  HAIR_STYLES,
  NECKLACES,
  OUTFITS,
  OUTFIT_CATEGORIES,
  SKIN_TONES,
  SUNGLASSES,
  WATCHES,
  type Look,
  type OutfitCategory,
} from "@/data/wardrobe";
import { Chip, OptionCard, Section, Swatch } from "./OptionCard";

type Props = { look: Look; update: (patch: Partial<Look>) => void };

export function HairControls({ look, update }: Props) {
  return (
    <>
      <Section title="Hairstyle">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
          {HAIR_STYLES.map((h) => (
            <OptionCard key={h.id} label={h.name} selected={look.hairStyle === h.id} onClick={() => update({ hairStyle: h.id })}>
              <FemaleAvatar look={{ ...look, hairStyle: h.id, sunglasses: "none" }} view="hairThumb" animated={false} className="h-20 w-full" />
            </OptionCard>
          ))}
        </div>
      </Section>
      <Section title="Hair colour">
        <div className="grid grid-cols-5 gap-x-1 gap-y-3">
          {HAIR_COLORS.map((c) => (
            <Swatch
              key={c.id}
              label={c.name}
              selected={look.hairColor === c.id}
              onClick={() => update({ hairColor: c.id })}
              background={
                "streak" in c
                  ? `repeating-linear-gradient(120deg, ${c.base} 0 6px, ${c.streak} 6px 9px)`
                  : `linear-gradient(150deg, ${c.shine}, ${c.base} 45%, ${c.shade})`
              }
            />
          ))}
        </div>
      </Section>
      <Section title="Skin tone">
        <div className="grid grid-cols-7 gap-1">
          {SKIN_TONES.map((s) => (
            <Swatch
              key={s.id}
              label={s.name}
              selected={look.skinTone === s.id}
              onClick={() => update({ skinTone: s.id })}
              background={`linear-gradient(150deg, ${s.light}, ${s.base} 50%, ${s.shade})`}
            />
          ))}
        </div>
      </Section>
    </>
  );
}

export function OutfitControls({ look, update }: Props) {
  const [cat, setCat] = useState<OutfitCategory | "all">("all");
  const list = OUTFITS.filter((o) => cat === "all" || o.category === cat);
  return (
    <>
      <div className="no-scrollbar -mx-1 mb-4 flex gap-2 overflow-x-auto px-1 pb-1">
        <Chip selected={cat === "all"} onClick={() => setCat("all")}>
          ✨ All
        </Chip>
        {OUTFIT_CATEGORIES.map((c) => (
          <Chip key={c.id} selected={cat === c.id} onClick={() => setCat(c.id)}>
            {c.emoji} {c.name}
          </Chip>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
        {list.map((o) => (
          <OptionCard
            key={o.id}
            label={o.name}
            selected={look.outfit === o.id}
            onClick={() => update({ outfit: o.id })}
            badge={
              <span className="absolute left-1.5 top-1.5 text-sm drop-shadow">
                {OUTFIT_CATEGORIES.find((c) => c.id === o.category)?.emoji}
              </span>
            }
          >
            <FemaleAvatar
              look={{ ...look, outfit: o.id, bag: "none" }}
              view="outfitThumb"
              animated={false}
              className="h-32 w-full"
            />
          </OptionCard>
        ))}
      </div>
    </>
  );
}

export function FootwearControls({ look, update }: Props) {
  return (
    <Section title="Footwear">
      <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 lg:grid-cols-3">
        {FOOTWEAR.map((f) => (
          <OptionCard key={f.id} label={f.name} selected={look.footwear === f.id} onClick={() => update({ footwear: f.id })}>
            <FemaleAvatar look={{ ...look, footwear: f.id, outfit: "sequinMini" }} view="feet" animated={false} className="h-16 w-full" />
          </OptionCard>
        ))}
      </div>
    </Section>
  );
}

const ICONS: Record<string, string> = {
  hoops: "⭕", jhumkas: "🔔", studs: "💎", pearls: "🦪",
  pearlStrand: "📿", heartPendant: "💗", choker: "🖤", kundan: "👑",
  clutch: "👛", chainSling: "👜", potli: "🎒", tote: "🛍️",
  catEye: "😼", aviator: "🕶️", heart: "💘",
  gold: "⌚", roseGold: "🌹", smart: "📱",
  none: "🚫",
};

function AccessoryRow<T extends { id: string; name: string }>({
  title,
  list,
  value,
  onPick,
}: {
  title: string;
  list: readonly T[];
  value: string;
  onPick: (id: T["id"]) => void;
}) {
  return (
    <Section title={title}>
      <div className="grid grid-cols-5 gap-1.5">
        {list.map((item) => (
          <OptionCard key={item.id} label={item.name} selected={value === item.id} onClick={() => onPick(item.id)}>
            <div className="grid h-10 place-items-center text-xl">{ICONS[item.id] ?? "✨"}</div>
          </OptionCard>
        ))}
      </div>
    </Section>
  );
}

export function AccessoryControls({ look, update }: Props) {
  return (
    <>
      <AccessoryRow title="Earrings" list={EARRINGS} value={look.earrings} onPick={(id) => update({ earrings: id })} />
      <AccessoryRow title="Necklace" list={NECKLACES} value={look.necklace} onPick={(id) => update({ necklace: id })} />
      <AccessoryRow title="Bag" list={BAGS} value={look.bag} onPick={(id) => update({ bag: id })} />
      <AccessoryRow title="Sunglasses" list={SUNGLASSES} value={look.sunglasses} onPick={(id) => update({ sunglasses: id })} />
      <AccessoryRow title="Watch" list={WATCHES} value={look.watch} onPick={(id) => update({ watch: id })} />
    </>
  );
}
