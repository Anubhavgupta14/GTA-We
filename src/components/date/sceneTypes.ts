import type { Expression } from "@/components/character/parts/Face";
import type { EngineerPose } from "@/components/character/EngineerAvatar";

export type PropId =
  | "chai"
  | "coffee"
  | "flowers"
  | "chocolates"
  | "plushie"
  | "jewelry"
  | "milkshake"
  | "marshmallow"
  | "wine";

export type DanceMove = "none" | "sway" | "bounce" | "spin" | "twirl" | "slow";

export interface SceneState {
  dance: DanceMove;
  herProp: PropId | null;
  hisProp: PropId | null;
  dishes: string[];
  clink: number;
  night: boolean;
  blanket: boolean;
  shootingStar: number;
  closer: boolean;
}

export const INITIAL_SCENE: SceneState = {
  dance: "none",
  herProp: null,
  hisProp: null,
  dishes: [],
  clink: 0,
  night: false,
  blanket: false,
  shootingStar: 0,
  closer: false,
};

export type BurstKind = "pink" | "gold" | "notes" | "stars" | "sparkle";

export interface SceneApi {
  scene: SceneState;
  setScene: (patch: Partial<SceneState>) => void;
  /** Engineer (or her) says something in the speech bubble */
  say: (text: string, who?: "he" | "she") => void;
  /** Adds love; first-time rewards can pass a key to avoid farming */
  reward: (amount: number, onceKey?: string) => void;
  burst: (kind: BurstKind, count?: number) => void;
  react: (opts: { his?: Expression; her?: Expression; pose?: EngineerPose; blush?: boolean; ms?: number }) => void;
}
