/**
 * Every wearable / paintable option in the Vanity & Wardrobe Studio.
 * Renderers live in `src/components/character/parts/*` and are keyed by these ids.
 */

/* ------------------------------------------------------------------ */
/* Skin                                                               */
/* ------------------------------------------------------------------ */

export interface SkinTone {
  id: string;
  name: string;
  base: string;
  shade: string;
  light: string;
}

export const SKIN_TONES = [
  { id: "porcelain", name: "Porcelain", base: "#fde4d6", shade: "#efc2ae", light: "#fff3ec" },
  { id: "rosy", name: "Rosy Fair", base: "#f7d3c0", shade: "#e6ae96", light: "#ffe9de" },
  { id: "wheat", name: "Wheatish", base: "#ecbf98", shade: "#d49a72", light: "#f8d8bb" },
  { id: "honey", name: "Honey", base: "#d9a074", shade: "#bb7f55", light: "#ecbf98" },
  { id: "caramel", name: "Caramel", base: "#c0845a", shade: "#9c6440", light: "#d9a27a" },
  { id: "mocha", name: "Mocha", base: "#8f5b3c", shade: "#6f4229", light: "#ab7656" },
  { id: "ebony", name: "Ebony", base: "#6a412a", shade: "#4f2e1c", light: "#875a3e" },
] as const satisfies readonly SkinTone[];

/* ------------------------------------------------------------------ */
/* Hair                                                               */
/* ------------------------------------------------------------------ */

export const HAIR_STYLES = [
  { id: "longWavy", name: "Long Waves" },
  { id: "highPonytail", name: "High Ponytail" },
  { id: "messyBun", name: "Messy Bun" },
  { id: "bob", name: "Chic Bob" },
  { id: "braids", name: "Twin Braids" },
  { id: "halfUp", name: "Half-Up Bow" },
  { id: "curly", name: "Cloud Curls" },
  { id: "sleekStraight", name: "Sleek Straight" },
  { id: "chignon", name: "Gajra Chignon" },
] as const;

export type HairStyleId = (typeof HAIR_STYLES)[number]["id"];

export interface HairColor {
  id: string;
  name: string;
  base: string;
  shade: string;
  shine: string;
  streak?: string;
}

export const HAIR_COLORS = [
  { id: "jetBlack", name: "Jet Black", base: "#1d1719", shade: "#0b0809", shine: "#4d4249" },
  { id: "espresso", name: "Espresso", base: "#3b2419", shade: "#21130c", shine: "#6d4a37" },
  { id: "chestnut", name: "Chestnut", base: "#7a3f22", shade: "#4c2513", shine: "#ad6942" },
  { id: "burgundy", name: "Burgundy", base: "#5e1a2e", shade: "#360d19", shine: "#98405a" },
  { id: "caramel", name: "Caramel Highlights", base: "#4a2c1b", shade: "#2c180e", shine: "#7d5236", streak: "#d9a35f" },
  { id: "roseGold", name: "Rose Gold", base: "#d4978a", shade: "#a96c66", shine: "#f4cbbf" },
  { id: "honeyBlonde", name: "Honey Blonde", base: "#d1a05a", shade: "#a0733a", shine: "#f1d391" },
  { id: "ashBrown", name: "Ash Brown", base: "#6c5a50", shade: "#463a33", shine: "#a08f84" },
  { id: "lavender", name: "Lavender Dream", base: "#b39ad7", shade: "#8467b2", shine: "#e0d2f5" },
] as const satisfies readonly HairColor[];

/* ------------------------------------------------------------------ */
/* Makeup                                                             */
/* ------------------------------------------------------------------ */

export interface Lipstick {
  id: string;
  name: string;
  color: string;
  deep: string;
}

export const LIPSTICKS = [
  { id: "nudePink", name: "Nude Pink", color: "#d98b84", deep: "#b4655f" },
  { id: "classicRed", name: "Classic Red", color: "#c8102e", deep: "#8d0a1f" },
  { id: "berry", name: "Berry", color: "#8e1f4f", deep: "#5f1233" },
  { id: "coral", name: "Coral", color: "#f2665a", deep: "#c8473d" },
  { id: "mauve", name: "Mauve", color: "#b0707e", deep: "#865160" },
  { id: "pinkGloss", name: "Pink Gloss", color: "#f39ab2", deep: "#d4708e" },
  { id: "plum", name: "Plum", color: "#6b1f45", deep: "#46112c" },
  { id: "peachNude", name: "Peach Nude", color: "#e9a283", deep: "#c47d5f" },
  { id: "hotPink", name: "Hot Pink", color: "#e0307a", deep: "#ab1f5a" },
  { id: "brick", name: "Brick Red", color: "#a63a2a", deep: "#76281c" },
  { id: "rosewood", name: "Rosewood", color: "#9c4f58", deep: "#73363f" },
  { id: "clearGloss", name: "Clear Gloss", color: "#e2a49d", deep: "#c4847d" },
] as const satisfies readonly Lipstick[];

export type LipstickId = (typeof LIPSTICKS)[number]["id"];
export type LipFinish = "matte" | "glossy";

export interface EyeshadowPalette {
  id: string;
  name: string;
  lid: string;
  crease: string;
  shimmer: boolean;
}

export const EYESHADOWS = [
  { id: "bare", name: "Bare", lid: "transparent", crease: "transparent", shimmer: false },
  { id: "shimmerGold", name: "Shimmer Gold", lid: "#ecc96d", crease: "#b8863b", shimmer: true },
  { id: "smoky", name: "Smoky Night", lid: "#5d5862", crease: "#262229", shimmer: false },
  { id: "rosePink", name: "Rose Pink", lid: "#f3a5b8", crease: "#c76a86", shimmer: true },
  { id: "peach", name: "Peach Fuzz", lid: "#f7b892", crease: "#d9845e", shimmer: false },
  { id: "lavender", name: "Lavender Haze", lid: "#cdb0ec", crease: "#8b6ab8", shimmer: true },
  { id: "bronze", name: "Bronze Goddess", lid: "#c98a4d", crease: "#7d4a24", shimmer: true },
  { id: "champagne", name: "Champagne", lid: "#f4e0c6", crease: "#c9a07a", shimmer: true },
  { id: "emerald", name: "Emerald Glam", lid: "#43a87f", crease: "#1d5e45", shimmer: true },
] as const satisfies readonly EyeshadowPalette[];

export type EyeshadowId = (typeof EYESHADOWS)[number]["id"];

export const EYELINERS = [
  { id: "natural", name: "Natural" },
  { id: "classicWing", name: "Classic Wing" },
  { id: "catEye", name: "Cat-Eye" },
  { id: "softKohl", name: "Soft Kohl" },
  { id: "dramatic", name: "Drama Lashes" },
] as const;

export type EyelinerId = (typeof EYELINERS)[number]["id"];

export const BLUSHES = [
  { id: "rosy", name: "Rosy", color: "#e8667a" },
  { id: "peach", name: "Peach", color: "#f69a76" },
  { id: "sunKissed", name: "Sun-Kissed", color: "#d6774f" },
  { id: "softPink", name: "Soft Pink", color: "#f59cb8" },
  { id: "berryFlush", name: "Berry Flush", color: "#c4506e" },
] as const;

export type BlushId = (typeof BLUSHES)[number]["id"];

export const BINDIS = [
  { id: "none", name: "None" },
  { id: "redDot", name: "Red Dot" },
  { id: "maroonDrop", name: "Maroon Drop" },
  { id: "crystal", name: "Crystal" },
] as const;

export type BindiId = (typeof BINDIS)[number]["id"];

/* ------------------------------------------------------------------ */
/* Outfits                                                            */
/* ------------------------------------------------------------------ */

export type OutfitCategory = "party" | "dinner" | "casual" | "cozy" | "traditional";

export const OUTFIT_CATEGORIES: { id: OutfitCategory; name: string; emoji: string }[] = [
  { id: "party", name: "Party / Club", emoji: "🪩" },
  { id: "dinner", name: "Romantic Dinner", emoji: "🕯️" },
  { id: "casual", name: "Casual / Shopping", emoji: "🛍️" },
  { id: "cozy", name: "Cozy / Mountains", emoji: "🏔️" },
  { id: "traditional", name: "Traditional", emoji: "🪷" },
];

export const OUTFITS = [
  { id: "sequinMini", name: "Sequin Mini Dress", category: "party", swatch: "#e9d3a6" },
  { id: "satinSlip", name: "Satin Slip Dress", category: "party", swatch: "#f2b8c0" },
  { id: "offShoulderBodycon", name: "Off-Shoulder Bodycon", category: "party", swatch: "#d6246e" },
  { id: "redGown", name: "Red Evening Gown", category: "dinner", swatch: "#c3102c" },
  { id: "floralMidi", name: "Floral Midi Dress", category: "dinner", swatch: "#fbf3e6" },
  { id: "emeraldWrap", name: "Emerald Wrap Dress", category: "dinner", swatch: "#1f7a5a" },
  { id: "denimCrop", name: "Denim Jacket & Jeans", category: "casual", swatch: "#5b84b8" },
  { id: "coordSet", name: "Lilac Gingham Co-ord", category: "casual", swatch: "#c9b6ec" },
  { id: "hoodieSkirt", name: "Hoodie & Pleated Skirt", category: "casual", swatch: "#f4a7c0" },
  { id: "knitTrench", name: "Knit Sweater & Trench", category: "cozy", swatch: "#c9a77a" },
  { id: "sweaterDress", name: "Turtleneck Knit Dress", category: "cozy", swatch: "#8a6a55" },
  { id: "pastelLehenga", name: "Pastel Lehenga", category: "traditional", swatch: "#bfe8d6" },
  { id: "chicSaree", name: "Rani Pink Saree", category: "traditional", swatch: "#e2477e" },
  { id: "embroideredKurti", name: "Embroidered Kurti", category: "traditional", swatch: "#f0b93a" },
] as const satisfies readonly { id: string; name: string; category: OutfitCategory; swatch: string }[];

export type OutfitId = (typeof OUTFITS)[number]["id"];

/* ------------------------------------------------------------------ */
/* Footwear                                                           */
/* ------------------------------------------------------------------ */

export const FOOTWEAR = [
  { id: "stilettos", name: "Stiletto Heels", color: "#1d1719" },
  { id: "blockHeels", name: "Block Heels", color: "#e8b8a8" },
  { id: "sneakers", name: "White Sneakers", color: "#ffffff" },
  { id: "ankleBoots", name: "Ankle Boots", color: "#6b3f26" },
  { id: "strappySandals", name: "Strappy Sandals", color: "#d9b25b" },
  { id: "juttis", name: "Embroidered Juttis", color: "#c2185b" },
  { id: "loafers", name: "Loafers", color: "#7a4a2c" },
  { id: "wedges", name: "Espadrille Wedges", color: "#f1e3c8" },
  { id: "kneeBoots", name: "Knee-High Boots", color: "#3d2a22" },
] as const;

export type FootwearId = (typeof FOOTWEAR)[number]["id"];

/* ------------------------------------------------------------------ */
/* Accessories                                                        */
/* ------------------------------------------------------------------ */

export const EARRINGS = [
  { id: "none", name: "None" },
  { id: "hoops", name: "Gold Hoops" },
  { id: "jhumkas", name: "Jhumkas" },
  { id: "studs", name: "Diamond Studs" },
  { id: "pearls", name: "Pearl Drops" },
] as const;
export type EarringId = (typeof EARRINGS)[number]["id"];

export const NECKLACES = [
  { id: "none", name: "None" },
  { id: "pearlStrand", name: "Pearl Strand" },
  { id: "heartPendant", name: "Heart Pendant" },
  { id: "choker", name: "Velvet Choker" },
  { id: "kundan", name: "Kundan Set" },
] as const;
export type NecklaceId = (typeof NECKLACES)[number]["id"];

export const BAGS = [
  { id: "none", name: "None" },
  { id: "clutch", name: "Mini Clutch" },
  { id: "chainSling", name: "Chain Sling" },
  { id: "potli", name: "Potli Bag" },
  { id: "tote", name: "Canvas Tote" },
] as const;
export type BagId = (typeof BAGS)[number]["id"];

export const SUNGLASSES = [
  { id: "none", name: "None" },
  { id: "catEye", name: "Cat-Eye" },
  { id: "aviator", name: "Aviator" },
  { id: "heart", name: "Heart Shades" },
] as const;
export type SunglassesId = (typeof SUNGLASSES)[number]["id"];

export const WATCHES = [
  { id: "none", name: "None" },
  { id: "gold", name: "Gold Watch" },
  { id: "roseGold", name: "Rose Gold" },
  { id: "smart", name: "Smartwatch" },
] as const;
export type WatchId = (typeof WATCHES)[number]["id"];

/* ------------------------------------------------------------------ */
/* Look                                                               */
/* ------------------------------------------------------------------ */

export type SkinToneId = (typeof SKIN_TONES)[number]["id"];
export type HairColorId = (typeof HAIR_COLORS)[number]["id"];

export interface Look {
  skinTone: SkinToneId;
  hairStyle: HairStyleId;
  hairColor: HairColorId;
  lipstick: LipstickId;
  lipFinish: LipFinish;
  eyeshadow: EyeshadowId;
  eyeliner: EyelinerId;
  blush: BlushId;
  blushIntensity: number; // 0..1
  bindi: BindiId;
  highlighter: boolean;
  glitter: boolean;
  outfit: OutfitId;
  footwear: FootwearId;
  earrings: EarringId;
  necklace: NecklaceId;
  bag: BagId;
  sunglasses: SunglassesId;
  watch: WatchId;
}

export const DEFAULT_LOOK: Look = {
  skinTone: "wheat",
  hairStyle: "longWavy",
  hairColor: "espresso",
  lipstick: "nudePink",
  lipFinish: "glossy",
  eyeshadow: "champagne",
  eyeliner: "natural",
  blush: "rosy",
  blushIntensity: 0.45,
  bindi: "none",
  highlighter: false,
  glitter: false,
  outfit: "floralMidi",
  footwear: "blockHeels",
  earrings: "studs",
  necklace: "heartPendant",
  bag: "none",
  sunglasses: "none",
  watch: "none",
};

/* Lookup helpers ---------------------------------------------------- */

function byId<T extends { id: string }>(list: readonly T[], id: string): T {
  return list.find((x) => x.id === id) ?? list[0];
}

export const getSkin = (id: string) => byId(SKIN_TONES, id);
export const getHairColor = (id: string): HairColor => byId(HAIR_COLORS, id);
export const getLipstick = (id: string) => byId(LIPSTICKS, id);
export const getEyeshadow = (id: string): EyeshadowPalette => byId(EYESHADOWS, id);
export const getBlush = (id: string) => byId(BLUSHES, id);
export const getOutfit = (id: string) => byId(OUTFITS, id);
export const getFootwear = (id: string) => byId(FOOTWEAR, id);

/* Randomizer --------------------------------------------------------- */

function pick<T extends { id: string }>(list: readonly T[]): T["id"] {
  return list[Math.floor(Math.random() * list.length)].id;
}

/** Picks a coherent random look (shoes/accessories lean towards the outfit's vibe). */
export function randomLook(current: Look): Look {
  const outfit = OUTFITS[Math.floor(Math.random() * OUTFITS.length)];
  const traditional = outfit.category === "traditional";
  const cozy = outfit.category === "cozy";
  const shoesFor: Record<OutfitCategory, FootwearId[]> = {
    party: ["stilettos", "strappySandals", "blockHeels"],
    dinner: ["stilettos", "blockHeels", "strappySandals", "wedges"],
    casual: ["sneakers", "loafers", "wedges", "ankleBoots"],
    cozy: ["ankleBoots", "kneeBoots", "loafers"],
    traditional: ["juttis", "strappySandals", "blockHeels"],
  };
  const shoes = shoesFor[outfit.category];
  return {
    ...current,
    hairStyle: pick(HAIR_STYLES),
    hairColor: pick(HAIR_COLORS),
    lipstick: pick(LIPSTICKS),
    lipFinish: Math.random() > 0.5 ? "glossy" : "matte",
    eyeshadow: pick(EYESHADOWS),
    eyeliner: pick(EYELINERS),
    blush: pick(BLUSHES),
    blushIntensity: Math.round((0.25 + Math.random() * 0.6) * 100) / 100,
    bindi: traditional && Math.random() > 0.3 ? pick(BINDIS.slice(1)) : "none",
    highlighter: Math.random() > 0.5,
    glitter: Math.random() > 0.7,
    outfit: outfit.id,
    footwear: shoes[Math.floor(Math.random() * shoes.length)],
    earrings: traditional ? "jhumkas" : pick(EARRINGS),
    necklace: traditional ? (Math.random() > 0.5 ? "kundan" : "none") : pick(NECKLACES),
    bag: traditional ? (Math.random() > 0.5 ? "potli" : "none") : pick(BAGS),
    sunglasses: cozy || traditional ? "none" : Math.random() > 0.6 ? pick(SUNGLASSES.slice(1)) : "none",
    watch: Math.random() > 0.5 ? pick(WATCHES) : "none",
  };
}
