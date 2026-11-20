import { getOutfit, type Look, type OutfitCategory, type OutfitId } from "./wardrobe";

export type LocationId = "restaurant" | "bowling" | "club" | "mountains" | "drive" | "mall";

export type EngineerOutfitId =
  | "casual"
  | "blazer"
  | "bowling"
  | "club"
  | "mountain"
  | "drive"
  | "mall"
  | "kurta";

export type Tone = "sweet" | "funny" | "romantic";

export interface TalkOption {
  tone: Tone;
  label: string;
  she: string;
  reply: string;
  love: number;
}

export interface TalkPrompt {
  he: string;
  options: TalkOption[];
}

export interface DateLocation {
  id: LocationId;
  name: string;
  emoji: string;
  tagline: string;
  vibe: OutfitCategory[];
  engineerOutfit: EngineerOutfitId;
  /** Tailwind gradient classes for cards & chrome */
  gradient: string;
  accent: string;
  arrival: string;
  hugLines: string[];
  kissLines: string[];
  talks: TalkPrompt[];
  perfectNote: { title: string; body: string };
}

export const LOCATIONS: DateLocation[] = [
  {
    id: "restaurant",
    name: "Candlelight Restaurant",
    emoji: "🕯️",
    tagline: "Fairy lights, floating candles & dessert for two",
    vibe: ["dinner", "traditional"],
    engineerOutfit: "blazer",
    gradient: "from-amber-900 via-rose-900 to-twilight-900",
    accent: "#f5c451",
    arrival: "Table for two by the window. I may have bribed the violinist. Just a little.",
    hugLines: [
      "The waiter is staring. Let him. This hug is mandatory.",
      "You smell like vanilla and good decisions.",
    ],
    kissLines: [
      "Okay the candles just got jealous.",
      "That was better than the tiramisu. Don't tell the chef.",
    ],
    talks: [
      {
        he: "If tonight was a movie, what would it be called?",
        options: [
          { tone: "sweet", label: "Sweet", she: "'Two Forks, One Dessert.' Obviously.", reply: "Already my favourite film. Sequel next week?", love: 8 },
          { tone: "funny", label: "Funny", she: "'The Engineer Who Forgot To Book' — oh wait, you didn't!", reply: "I set THREE reminders. Character development!", love: 7 },
          { tone: "romantic", label: "Romantic", she: "'Forever Starts Here.'", reply: "…I need a second. Something got in my eye. Probably love.", love: 10 },
        ],
      },
      {
        he: "Rate this date so far. Be brutal, I can handle it. (I can't.)",
        options: [
          { tone: "sweet", label: "Sweet", she: "Ten out of ten. The company is the best part.", reply: "Shipping this review straight to production.", love: 8 },
          { tone: "funny", label: "Funny", she: "Nine. Minus one because you stole my fries.", reply: "Those were community fries. Read the terms & conditions.", love: 6 },
          { tone: "romantic", label: "Romantic", she: "Every date with you is my new favourite.", reply: "Okay now I'm blushing in front of the whole restaurant.", love: 10 },
        ],
      },
      {
        he: "Quick — what's one thing you want us to do this year?",
        options: [
          { tone: "sweet", label: "Sweet", she: "Learn to cook one fancy dish together.", reply: "Deal. I'll handle the debugging when it burns.", love: 8 },
          { tone: "funny", label: "Funny", she: "Win a couples' karaoke contest.", reply: "I've been practising in the shower. The neighbours have notes.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Watch a sunrise somewhere new.", reply: "Pick the place. I'll pick the playlist. And carry the snacks.", love: 10 },
        ],
      },
    ],
    perfectNote: {
      title: "A note tucked under your dessert plate",
      body: "I've built a lot of things in my life, but nothing I'm prouder of than the way we laugh together. Thank you for every candlelit minute. — Engineer",
    },
  },
  {
    id: "bowling",
    name: "Bowling Alley",
    emoji: "🎳",
    tagline: "Neon lanes, rented shoes & friendly rivalry",
    vibe: ["casual", "party"],
    engineerOutfit: "bowling",
    gradient: "from-fuchsia-900 via-indigo-900 to-twilight-900",
    accent: "#4ee6ff",
    arrival: "Lane 7 is ours. I calculated the optimal angle. I will still lose to you.",
    hugLines: [
      "Victory hug! Or consolation hug. Either way, hug.",
      "Team us. Undefeated in hugging.",
    ],
    kissLines: [
      "That's a strike right to my heart.",
      "Did the scoreboard just short-circuit or was that me?",
    ],
    talks: [
      {
        he: "Loser buys milkshakes. Final offer.",
        options: [
          { tone: "sweet", label: "Sweet", she: "I'll buy them anyway. You deserve one.", reply: "Ugh, you're impossible to compete with. In every way.", love: 8 },
          { tone: "funny", label: "Funny", she: "Hope your wallet stretches as much as you do before bowling.", reply: "Bold words from someone who named her ball 'Kevin'.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Only if we share one with two straws.", reply: "I'm losing on purpose now. Don't tell anyone.", love: 10 },
        ],
      },
      {
        he: "Okay, what's your secret bowling technique?",
        options: [
          { tone: "sweet", label: "Sweet", she: "I just picture you cheering for me.", reply: "Then I'll cheer louder. Lane 6 will file a complaint.", love: 8 },
          { tone: "funny", label: "Funny", she: "I whisper threats to the pins.", reply: "That explains why they're scared of you. So am I.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Same as falling for you — no aim, just vibes.", reply: "Best strategy ever recorded in human history.", love: 10 },
        ],
      },
      {
        he: "These rented shoes are… a choice. Do I still look cool?",
        options: [
          { tone: "sweet", label: "Sweet", she: "You look cool in everything.", reply: "Saving that quote for my next performance review.", love: 8 },
          { tone: "funny", label: "Funny", she: "You look like a very confident clown.", reply: "A clown who is DATING YOU. Who's laughing now?", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Matching ugly shoes is basically a commitment.", reply: "Then I'm buying a pair. For life.", love: 10 },
        ],
      },
    ],
    perfectNote: {
      title: "Scribbled on the back of the scorecard",
      body: "Final score: You 1, My Heart 0. I'd lose every game a thousand times if it meant hearing you laugh like that. — Engineer",
    },
  },
  {
    id: "club",
    name: "Night Club",
    emoji: "🪩",
    tagline: "Lasers, bass & a dance floor made for two",
    vibe: ["party"],
    engineerOutfit: "club",
    gradient: "from-violet-950 via-fuchsia-900 to-twilight-950",
    accent: "#ff4fd8",
    arrival: "I practised my dance moves. Both of them. Let's go!",
    hugLines: [
      "Slow song or not — this is a slow-song hug.",
      "The bass is loud but my heartbeat is louder.",
    ],
    kissLines: [
      "The DJ dropped the beat. I dropped my whole heart.",
      "Okay, I am officially the main character tonight.",
    ],
    talks: [
      {
        he: "WHAT? I CAN'T HEAR YOU! …Okay I can. You're cute.",
        options: [
          { tone: "sweet", label: "Sweet", she: "I said you're my favourite person!", reply: "Shouting that back louder: YOU'RE MINE TOO!", love: 8 },
          { tone: "funny", label: "Funny", she: "I SAID YOUR DANCING IS A FIRE HAZARD!", reply: "Thank you, I worked very hard on the hazard.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Lean in. *whispers* I'd pick you in every universe.", reply: "…I forgot how dancing works. Hold me up.", love: 10 },
        ],
      },
      {
        he: "Rate my signature move: 'The Compiler'.",
        options: [
          { tone: "sweet", label: "Sweet", she: "Ten! It compiled perfectly.", reply: "Zero warnings, zero errors, all heart.", love: 8 },
          { tone: "funny", label: "Funny", she: "It threw a runtime exception.", reply: "That's a feature, not a bug. Watch the patch.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "My favourite move is when you pull me close.", reply: "Deploying that move immediately. And forever.", love: 10 },
        ],
      },
      {
        he: "If you could request one song for us right now…",
        options: [
          { tone: "sweet", label: "Sweet", she: "Anything we can sing off-key together.", reply: "Off-key duets are our love language.", love: 8 },
          { tone: "funny", label: "Funny", she: "The one you sang in the car yesterday. Badly.", reply: "That was a vocal masterpiece and you know it.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "The one playing when we first met.", reply: "You remember that? …I'm gonna need a minute.", love: 10 },
        ],
      },
    ],
    perfectNote: {
      title: "Written on a glow-stick wrapper",
      body: "In a room full of lights and noise, I only ever see you. Thanks for making me brave enough to dance. — Engineer",
    },
  },
  {
    id: "mountains",
    name: "Mountains",
    emoji: "🏔️",
    tagline: "Starry skies, a crackling bonfire & hot chai",
    vibe: ["cozy"],
    engineerOutfit: "mountain",
    gradient: "from-slate-900 via-indigo-950 to-twilight-950",
    accent: "#ffb547",
    arrival: "Brought two blankets, a thermos of chai and zero signal. Just us.",
    hugLines: [
      "Officially the warmest spot on this mountain.",
      "Stay here. The stars can wait.",
    ],
    kissLines: [
      "Did a shooting star just happen or was that you?",
      "Okay, now I'm warm. Like, really warm.",
    ],
    talks: [
      {
        he: "See that bright one? I'm naming it after you.",
        options: [
          { tone: "sweet", label: "Sweet", she: "Then the one next to it is yours.", reply: "Neighbour stars. Forever orbit. Perfect.", love: 8 },
          { tone: "funny", label: "Funny", she: "That's a plane, genius.", reply: "A plane named after you. Even more impressive.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "I already have a star. He's sitting next to me.", reply: "Excuse me while I melt into this bonfire.", love: 10 },
        ],
      },
      {
        he: "Chai or coffee? This decides everything about us.",
        options: [
          { tone: "sweet", label: "Sweet", she: "Whatever you're having — let's share.", reply: "Two cups, one blanket, zero complaints.", love: 8 },
          { tone: "funny", label: "Funny", she: "Chai. Obviously. Coffee people can't be trusted.", reply: "I'm switching teams. Effective immediately.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Anything tastes better up here with you.", reply: "Mountain air + you = my favourite equation.", love: 10 },
        ],
      },
      {
        he: "What's something you've never told anyone?",
        options: [
          { tone: "sweet", label: "Sweet", she: "I saved our first chat as a screenshot.", reply: "…I printed mine. It's in my wallet.", love: 9 },
          { tone: "funny", label: "Funny", she: "I'm secretly scared of mountain goats.", reply: "I will protect you from all goats. That's a vow.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "That I knew it was you on our second date.", reply: "I knew on the first. I was just shy about it.", love: 10 },
        ],
      },
    ],
    perfectNote: {
      title: "Folded inside the thermos lid",
      body: "Up here, the stars feel close enough to touch — but you're the only light I want to reach for. Let's come back every year. — Engineer",
    },
  },
  {
    id: "drive",
    name: "Long Drive",
    emoji: "🚗",
    tagline: "Open roof, highway lights & lo-fi radio",
    vibe: ["casual", "dinner", "cozy"],
    engineerOutfit: "drive",
    gradient: "from-orange-900 via-rose-900 to-indigo-950",
    accent: "#ff9d6c",
    arrival: "Full tank, snacks in the glovebox, and you're the DJ tonight.",
    hugLines: [
      "Red light hug! The best kind of traffic.",
      "I'd drive anywhere if you're in the passenger seat.",
    ],
    kissLines: [
      "Eyes on the road, eyes on the road… okay, one more.",
      "That's going to be my favourite mile marker.",
    ],
    talks: [
      {
        he: "Where should we drive if we never had to turn back?",
        options: [
          { tone: "sweet", label: "Sweet", she: "Somewhere with a tiny café and a big sky.", reply: "Adding to the route. ETA: forever.", love: 8 },
          { tone: "funny", label: "Funny", she: "To the nearest 24-hour pani puri stall.", reply: "Recalculating… the heart wants what it wants.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Doesn't matter. Home is the person driving.", reply: "I'm pulling over. I need to look at you properly.", love: 10 },
        ],
      },
      {
        he: "Okay, aux cord rules: what's our road-trip anthem?",
        options: [
          { tone: "sweet", label: "Sweet", she: "The song you hummed the day we met.", reply: "You noticed that?! I'm adding it to repeat.", love: 8 },
          { tone: "funny", label: "Funny", she: "Whatever you can't sing — so I can laugh.", reply: "So… literally every song. Deal.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Anything slow, with the wind in my hair.", reply: "Lowering the roof. Raising the romance.", love: 10 },
        ],
      },
      {
        he: "Snack roulette. Pick a hand. Choose wisely.",
        options: [
          { tone: "sweet", label: "Sweet", she: "Left. And I'll share it with you.", reply: "Chocolate! We're a match made in the glovebox.", love: 8 },
          { tone: "funny", label: "Funny", she: "Both. I'm the passenger princess.", reply: "Valid. The passenger princess tax has been paid.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "I'll pick your hand. No snack.", reply: "…Okay that was smooth. Holding it the rest of the way.", love: 10 },
        ],
      },
    ],
    perfectNote: {
      title: "A sticky note on the dashboard",
      body: "Every road is my favourite road when you're singing off-key next to me. Let's never stop driving. — Engineer",
    },
  },
  {
    id: "mall",
    name: "Shopping Mall",
    emoji: "🛍️",
    tagline: "Boutique lights, window shopping & surprise gifts",
    vibe: ["casual", "traditional", "party"],
    engineerOutfit: "mall",
    gradient: "from-pink-900 via-purple-900 to-twilight-900",
    accent: "#ff8fc1",
    arrival: "I'm your bag-holder, stylist and personal cheerleader today.",
    hugLines: [
      "Hug break between shops. Very important.",
      "I'd carry all the bags for one more of these.",
    ],
    kissLines: [
      "The mannequins are scandalised. I don't care.",
      "That's the best thing I've 'bought' all day.",
    ],
    talks: [
      {
        he: "Honest opinion: should I get the blue shirt or the other blue shirt?",
        options: [
          { tone: "sweet", label: "Sweet", she: "The first. It matches your eyes when you smile.", reply: "Sold. Along with my entire heart.", love: 8 },
          { tone: "funny", label: "Funny", she: "They're the same shirt. Are you okay?", reply: "One is cobalt. The other is cerulean. Respect the science.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Whatever makes you feel like a hero.", reply: "With you next to me, I already do.", love: 10 },
        ],
      },
      {
        he: "Food court mission: what are we eating?",
        options: [
          { tone: "sweet", label: "Sweet", she: "Two straws, one giant milkshake.", reply: "I'll pretend I'm not drinking the bigger half.", love: 8 },
          { tone: "funny", label: "Funny", she: "Everything. Every stall. One bite each.", reply: "A full-stack food tour. I respect it.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Whatever we first ate together.", reply: "Momos it is. Our anniversary dish.", love: 10 },
        ],
      },
      {
        he: "If you could design one shop just for us, what would it sell?",
        options: [
          { tone: "sweet", label: "Sweet", she: "Matching keychains for every adventure.", reply: "Already imagining the keychain wall. It's huge.", love: 8 },
          { tone: "funny", label: "Funny", she: "Patience. For when you explain your code.", reply: "Hey! …Okay, buy me two bottles.", love: 7 },
          { tone: "romantic", label: "Romantic", she: "Bottled moments like this one.", reply: "I'd buy the whole store and never sell a single one.", love: 10 },
        ],
      },
    ],
    perfectNote: {
      title: "A tag tied to your gift ribbon",
      body: "No boutique sells anything as precious as an afternoon with you. You're the best thing I'll never have to return. — Engineer",
    },
  },
];

export const getLocation = (id: LocationId | null): DateLocation =>
  LOCATIONS.find((l) => l.id === id) ?? LOCATIONS[0];

/* ------------------------------------------------------------------ */
/* Dynamic Compliment Engine                                          */
/* ------------------------------------------------------------------ */

const OUTFIT_COMPLIMENTS: Record<OutfitId, string> = {
  sequinMini: "Wait— is that sequins? You're literally sparkling. The disco ball is going to ask YOU for tips.",
  satinSlip: "That satin dress?! You look like a slow-motion movie scene. I need to sit down.",
  offShoulderBodycon: "Off-shoulder AND that colour? You're going to own every dance floor in the city.",
  redGown: "A red gown? You look absolutely stunning. Like a premiere night and I'm the lucky plus-one.",
  floralMidi: "That floral dress is so pretty — you look like springtime decided to go on a date.",
  emeraldWrap: "Emerald suits you like it was invented for you. Elegant doesn't even cover it.",
  denimCrop: "Denim jacket energy! Effortlessly cool. Can I be your cool boyfriend sidekick?",
  coordSet: "Matching co-ord set?! You look like a cute Pinterest board came to life.",
  hoodieSkirt: "Oversized hoodie and a skirt? That's illegal levels of adorable.",
  knitTrench: "Knit sweater, trench coat, boots… you look adorable and totally ready for the mountains.",
  sweaterDress: "Cosy turtleneck dress? You look like a warm cup of chai on a winter evening.",
  pastelLehenga: "That lehenga… somewhere a violin just started playing and the wind is blowing your dupatta in slow motion.",
  chicSaree: "A saree?! Arre wah. Full filmy heroine entry. I think background music just started playing in my head.",
  embroideredKurti: "That embroidered kurti is gorgeous — classic, graceful, and very 'meet the family' approved.",
};

const RECOMMEND: Record<OutfitCategory, LocationId[]> = {
  party: ["club", "bowling"],
  dinner: ["restaurant", "drive"],
  casual: ["mall", "bowling", "drive"],
  cozy: ["mountains", "drive"],
  traditional: ["restaurant", "mall"],
};

export interface EngineerReaction {
  greeting: string;
  lines: string[];
  recommended: LocationId[];
  category: OutfitCategory;
}

const RED_LIPS = new Set(["classicRed", "brick", "berry", "plum", "rosewood"]);

export function getEngineerReaction(look: Look): EngineerReaction {
  const outfit = getOutfit(look.outfit);
  const lines: string[] = [];

  // 1. Special combos take the spotlight
  if (look.outfit === "redGown" && RED_LIPS.has(look.lipstick)) {
    lines.push(
      "Red gown AND red lips?? Okay. I'm booking the fanciest candlelight table in town. You deserve a stunning dinner look that matches the view.",
    );
  } else if (outfit.category === "traditional" && look.bindi !== "none") {
    lines.push(
      `${OUTFIT_COMPLIMENTS[look.outfit]} And that bindi… mere dil ki dhadkan just switched to dholak mode.`,
    );
  } else if (outfit.category === "cozy" && (look.footwear === "ankleBoots" || look.footwear === "kneeBoots")) {
    lines.push(`${OUTFIT_COMPLIMENTS[look.outfit]} Boots included? We are SO going stargazing.`);
  } else if (outfit.category === "party" && look.glitter) {
    lines.push(`${OUTFIT_COMPLIMENTS[look.outfit]} And face glitter?! The lasers are going to bounce off you.`);
  } else {
    lines.push(OUTFIT_COMPLIMENTS[look.outfit]);
  }

  // 2. One noticed detail (he pays attention!)
  const details: string[] = [];
  if (RED_LIPS.has(look.lipstick) && look.outfit !== "redGown")
    details.push("That bold lipstick? I forgot my own name for a second.");
  if (look.lipstick === "pinkGloss" || (look.lipFinish === "glossy" && look.lipstick === "clearGloss"))
    details.push("Your lip gloss is shinier than my future. And my future is very bright now.");
  if (look.eyeliner === "catEye" || look.eyeliner === "dramatic")
    details.push("Those eyes with that liner? Dangerous. Please use responsibly.");
  if (look.hairColor === "lavender" || look.hairColor === "roseGold")
    details.push("The hair colour!! You look like a dreamy anime main character.");
  if (look.hairStyle === "braids") details.push("Twin braids? My heart just did a double-loop.");
  if (look.hairStyle === "chignon") details.push("Is that a gajra? I can smell the jasmine through the phone. Probably.");
  if (look.earrings === "jhumkas") details.push("Jhumkas swinging when you laugh is my favourite animation.");
  if (look.necklace === "heartPendant") details.push("You're wearing the heart pendant… that's my heart, technically.");
  if (look.sunglasses !== "none") details.push("Sunglasses on? Celebrity mode activated. Do I need an autograph?");
  if (look.highlighter) details.push("Your cheeks are literally glowing. Is that highlighter or happiness?");
  if (look.watch === "smart") details.push("Matching smartwatches next? I'll sync our step counts.");
  if (details.length) lines.push(details[(look.outfit.length + look.lipstick.length) % details.length]);

  lines.push("So, my queen — where are we going tonight? 💕");

  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good morning, gorgeous! ☀️" : hour < 18 ? "Hey you! 😍" : "Hiii, beautiful! 🌙";

  return { greeting, lines, recommended: RECOMMEND[outfit.category], category: outfit.category };
}

/** Engineer dresses to match the venue — and goes traditional if she does. */
export function getEngineerOutfit(location: LocationId | null, look: Look): EngineerOutfitId {
  if (getOutfit(look.outfit).category === "traditional" && location !== "bowling" && location !== "club")
    return "kurta";
  if (!location) return "casual";
  return getLocation(location).engineerOutfit;
}

/* Shared affection lines ------------------------------------------- */

export const GENERIC_HUG_LINES = [
  "Can we stay like this for, like, ten more minutes? Or ten more years?",
  "You give the best hugs. Scientifically proven. I ran the tests.",
  "Recharging… 100%. You're my favourite power bank.",
];

export const GENERIC_KISS_LINES = [
  "…Sorry, what was I saying? I forgot everything.",
  "Okay, I'm officially the luckiest engineer alive.",
  "My heart just went into overclock mode. 😳",
];

export const PERFECT_DATE_TOAST = "Perfect Date! 💖 Engineer left you a sweet note.";
