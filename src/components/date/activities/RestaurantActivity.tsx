"use client";

import { useEffect } from "react";
import { sfx, startMusic } from "@/lib/audio";
import type { SceneApi } from "../sceneTypes";
import { ActivityButton, ActivityRow } from "./shared";

const MAINS = [
  { emoji: "🍝", name: "Truffle Pasta", line: "Truffle pasta for my truffle-level special person." },
  { emoji: "🍛", name: "Butter Paneer", line: "Butter paneer + garlic naan. I'll fight you for the last piece. Lovingly." },
  { emoji: "🍣", name: "Sushi Platter", line: "Sushi! You're the only roll I'd never share. Wait—that came out weird." },
  { emoji: "🍕", name: "Margherita", line: "A classic. Like us. Simple, perfect, extra cheesy." },
];

const DESSERTS = [
  { emoji: "🍰", name: "Tiramisu", line: "Tiramisu literally means 'pick me up'. You do that every day." },
  { emoji: "🍫", name: "Lava Cake", line: "Molten lava cake. Warm in the middle. Like my heart right now." },
  { emoji: "🍨", name: "Gelato", line: "Two spoons, one gelato, zero chill." },
  { emoji: "🍓", name: "Strawberries", line: "Chocolate strawberries? Who taught you to be this romantic?" },
];

export function RestaurantActivity({ api }: { api: SceneApi }) {
  useEffect(() => startMusic("lounge"), []);
  const [main, dessert] = api.scene.dishes;

  return (
    <div className="flex flex-col gap-2.5">
      <ActivityRow title="Order mains">
        {MAINS.map((m) => (
          <ActivityButton
            key={m.name}
            emoji={m.emoji}
            label={m.name}
            active={main === m.emoji}
            onClick={() => {
              sfx.pop();
              api.setScene({ dishes: [m.emoji, dessert ?? ""] });
              api.say(m.line);
              api.react({ his: "happy" });
              api.reward(6, `main-${m.name}`);
            }}
          />
        ))}
      </ActivityRow>
      <ActivityRow title="Dessert & toast">
        {DESSERTS.map((d) => (
          <ActivityButton
            key={d.name}
            emoji={d.emoji}
            label={d.name}
            active={dessert === d.emoji}
            onClick={() => {
              sfx.pop();
              api.setScene({ dishes: [main ?? "", d.emoji] });
              api.say(d.line);
              api.react({ his: "happy", her: "happy" });
              api.reward(6, `dessert-${d.name}`);
            }}
          />
        ))}
        <ActivityButton
          emoji="🥂"
          label="Clink glasses"
          onClick={() => {
            api.setScene({ clink: api.scene.clink + 1 });
            setTimeout(() => sfx.clink(), 380);
            api.burst("gold", 14);
            api.say("To us — and to a thousand more dates like this. 🥂");
            api.react({ his: "happy", her: "happy", blush: true });
            api.reward(9, "clink");
          }}
        />
      </ActivityRow>
    </div>
  );
}
