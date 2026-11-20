"use client";

import { Footprints, Gem, Palette, Scissors, Shirt, type LucideIcon } from "lucide-react";
import { motion } from "motion/react";

export type StudioTab = "hair" | "makeup" | "outfit" | "shoes" | "bling";

export const STUDIO_TABS: { id: StudioTab; label: string; icon: LucideIcon }[] = [
  { id: "hair", label: "Hair", icon: Scissors },
  { id: "makeup", label: "Makeup", icon: Palette },
  { id: "outfit", label: "Outfits", icon: Shirt },
  { id: "shoes", label: "Shoes", icon: Footprints },
  { id: "bling", label: "Bling", icon: Gem },
];

export function CategoryTabs({ active, onChange }: { active: StudioTab; onChange: (t: StudioTab) => void }) {
  return (
    <nav role="tablist" aria-label="Customization categories" className="grid grid-cols-5 gap-1 rounded-2xl bg-black/20 p-1">
      {STUDIO_TABS.map(({ id, label, icon: Icon }) => {
        const on = id === active;
        return (
          <button
            key={id}
            role="tab"
            aria-selected={on}
            onClick={() => onChange(id)}
            className={`relative flex flex-col items-center gap-0.5 rounded-xl py-2 text-[11px] font-medium transition ${on ? "text-white" : "text-blush-200/70 hover:text-blush-100"}`}
          >
            {on && (
              <motion.span
                layoutId="studio-tab"
                className="absolute inset-0 rounded-xl bg-gradient-to-b from-blush-400 to-blush-600 shadow-[0_6px_16px_-6px_rgba(240,81,127,0.9)]"
                transition={{ type: "spring", stiffness: 400, damping: 32 }}
              />
            )}
            <Icon size={18} className="relative" />
            <span className="relative">{label}</span>
          </button>
        );
      })}
    </nav>
  );
}
