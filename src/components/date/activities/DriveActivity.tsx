"use client";

import { useEffect, useState } from "react";
import { sfx, startMusic, type MusicKind } from "@/lib/audio";
import type { SceneApi } from "../sceneTypes";
import { ActivityButton, ActivityRow } from "./shared";

const STATIONS: { id: MusicKind | "off"; emoji: string; name: string; freq: string; line: string }[] = [
  { id: "lofi", emoji: "📻", name: "Lo-fi Love", freq: "98.3 FM", line: "Lo-fi Love FM. Certified mood. Certified us." },
  { id: "synth", emoji: "🌆", name: "Retro Synth", freq: "88.8 FM", line: "Retro synth at sunset? Main-character highway energy." },
  { id: "filmy", emoji: "🎻", name: "Filmy Breeze", freq: "92.7 FM", line: "Filmy Breeze! Hold on, I need to do the hair-in-the-wind thing." },
  { id: "off", emoji: "🔇", name: "Just us", freq: "radio off", line: "Radio off. Just the wind and your voice." },
];

const SONGS = [
  "🎤 *sings off-key* …You're laughing! That means it's working.",
  "🎤 I don't know the lyrics but I know I love you. That's the chorus.",
  "🎤 Harmonising with you is the only group project I enjoy.",
];

export function DriveActivity({ api }: { api: SceneApi }) {
  const [station, setStation] = useState<MusicKind | "off">("lofi");
  const [songs, setSongs] = useState(0);
  useEffect(() => (station === "off" ? undefined : startMusic(station)), [station]);
  const { night, closer } = api.scene;

  return (
    <div className="flex flex-col gap-2.5">
      <ActivityRow title="Radio">
        {STATIONS.map((s) => (
          <ActivityButton
            key={s.id}
            emoji={s.emoji}
            label={s.name}
            sub={s.freq}
            active={station === s.id}
            onClick={() => {
              sfx.click();
              setStation(s.id);
              api.say(s.line);
              api.reward(4, `radio-${s.id}`);
            }}
          />
        ))}
      </ActivityRow>
      <ActivityRow title="On the road">
        <ActivityButton
          emoji={night ? "🌅" : "🌙"}
          label={night ? "Back to sunset" : "Drive into the night"}
          onClick={() => {
            sfx.whoosh();
            api.setScene({ night: !night });
            api.say(night ? "Golden hour, golden girl." : "City lights for my favourite night owl.");
            api.reward(5, "daynight");
          }}
        />
        <ActivityButton
          emoji="🤝"
          label={closer ? "Let go" : "Hold hands"}
          active={closer}
          onClick={() => {
            sfx.hug();
            api.setScene({ closer: !closer });
            if (!closer) {
              api.say("One hand on the wheel, one hand on my whole world.");
              api.react({ his: "shy", her: "happy", blush: true, ms: 2600 });
              api.burst("pink", 10);
              api.reward(9, "hands");
            }
          }}
        />
        <ActivityButton
          emoji="🎤"
          label="Sing along"
          onClick={() => {
            sfx.sparkle();
            api.burst("notes", 14);
            api.say(SONGS[songs % SONGS.length]);
            setSongs((n) => n + 1);
            api.react({ his: "laugh", her: "laugh", ms: 2000 });
            api.reward(7, "sing");
          }}
        />
      </ActivityRow>
    </div>
  );
}
