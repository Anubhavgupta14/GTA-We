"use client";

import { useEffect } from "react";
import { sfx, startMusic } from "@/lib/audio";
import type { DanceMove, SceneApi } from "../sceneTypes";
import { ActivityButton, ActivityRow } from "./shared";

const MOVES: { id: DanceMove; emoji: string; label: string; line: string }[] = [
  { id: "sway", emoji: "💃", label: "Sway", line: "Sway with me… I'm smooth. Mostly. Sometimes." },
  { id: "bounce", emoji: "🕺", label: "Bounce", line: "BOUNCE! My calves will hate me tomorrow. Worth it." },
  { id: "spin", emoji: "🌀", label: "Spin", line: "Spin! Okay the room is also spinning. Or is it you?" },
  { id: "twirl", emoji: "✨", label: "Twirl", line: "Twirl for me! …Wow. Just wow." },
  { id: "slow", emoji: "💞", label: "Slow dance", line: "They're playing a slow song. Can I have this dance?" },
];

export function ClubActivity({ api }: { api: SceneApi }) {
  useEffect(() => startMusic("club"), []);
  const dance = api.scene.dance;
  return (
    <div className="flex flex-col gap-2.5">
      <ActivityRow title="Dance together (toggle)">
        {MOVES.map((m) => (
          <ActivityButton
            key={m.id}
            emoji={m.emoji}
            label={m.label}
            active={dance === m.id}
            onClick={() => {
              sfx.pop();
              if (dance === m.id) {
                api.setScene({ dance: "none", closer: false });
                return;
              }
              api.setScene({ dance: m.id, closer: m.id === "slow" });
              api.say(m.line);
              api.react({ his: m.id === "slow" ? "shy" : "laugh", her: "happy", blush: m.id === "slow", ms: 2400 });
              api.burst(m.id === "slow" ? "pink" : "notes", 10);
              api.reward(m.id === "slow" ? 10 : 6, `dance-${m.id}`);
            }}
          />
        ))}
      </ActivityRow>
      <ActivityRow title="Vibes">
        <ActivityButton
          emoji="🎧"
          label="Request our song"
          onClick={() => {
            sfx.sparkle();
            api.burst("notes", 14);
            api.say("DJ! This one's for the girl in the best outfit in the room. Yes, her. 👉");
            api.react({ his: "happy", her: "shy", blush: true });
            api.reward(8, "request");
          }}
        />
        <ActivityButton
          emoji="🍹"
          label="Mocktails"
          onClick={() => {
            sfx.clink();
            api.setScene({ herProp: "milkshake", hisProp: "wine" });
            api.say("Two strawberry fizz mocktails. Hydration is romantic.");
            api.reward(5, "mocktail");
          }}
        />
      </ActivityRow>
    </div>
  );
}
