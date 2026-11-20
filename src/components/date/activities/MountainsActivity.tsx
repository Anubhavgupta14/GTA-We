"use client";

import { useEffect } from "react";
import { sfx, startMusic } from "@/lib/audio";
import type { SceneApi } from "../sceneTypes";
import { ActivityButton, ActivityRow } from "./shared";

const WISHES = [
  "Quick, make a wish! …Mine already came true. She's sitting right here.",
  "Another one! I wished for more nights like this. And snacks.",
  "Did you see that?! The universe is clearly shipping us.",
];

export function MountainsActivity({ api }: { api: SceneApi }) {
  useEffect(() => startMusic("fire"), []);
  const { blanket } = api.scene;
  return (
    <div className="flex flex-col gap-2.5">
      <ActivityRow title="Under the stars">
        <ActivityButton
          emoji="🌠"
          label="Stargaze"
          sub="catch a shooting star"
          onClick={() => {
            sfx.whoosh();
            setTimeout(() => sfx.sparkle(), 500);
            api.setScene({ shootingStar: api.scene.shootingStar + 1 });
            api.say(WISHES[api.scene.shootingStar % WISHES.length]);
            api.react({ his: "happy", her: "surprised", ms: 1800 });
            api.burst("stars", 10);
            api.reward(9, "stargaze");
          }}
        />
        <ActivityButton
          emoji="🧣"
          label={blanket ? "Uncuddle" : "Cozy up"}
          active={blanket}
          onClick={() => {
            sfx.hug();
            if (blanket) {
              api.setScene({ blanket: false, closer: false });
              return;
            }
            api.setScene({ blanket: true, closer: true });
            api.say("Shared blanket. Shared warmth. Shared everything.");
            api.react({ his: "shy", her: "happy", blush: true, ms: 3000 });
            api.burst("pink", 12);
            api.reward(10, "cozy");
          }}
        />
      </ActivityRow>
      <ActivityRow title="Warm sips & snacks">
        <ActivityButton
          emoji="🫖"
          label="Masala chai"
          onClick={() => {
            sfx.pop();
            api.setScene({ herProp: "chai", hisProp: "chai" });
            api.say("Adrak wali chai, extra elaichi — exactly how you like it.");
            api.react({ his: "happy" });
            api.reward(7, "chai");
          }}
        />
        <ActivityButton
          emoji="☕"
          label="Hot coffee"
          onClick={() => {
            sfx.pop();
            api.setScene({ herProp: "coffee", hisProp: "coffee" });
            api.say("Coffee at 2,000 metres. Basically a five-star café.");
            api.reward(6, "coffee");
          }}
        />
        <ActivityButton
          emoji="🔥"
          label="Toast marshmallows"
          onClick={() => {
            sfx.sparkle();
            api.setScene({ hisProp: "marshmallow" });
            api.burst("gold", 10);
            api.say("Golden brown, just for you. The burnt ones are mine.");
            api.react({ his: "happy", her: "laugh" });
            api.reward(7, "smores");
          }}
        />
      </ActivityRow>
    </div>
  );
}
