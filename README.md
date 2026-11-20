# Date Night with Engineer 💖

A cozy, romantic 2D dress-up & dating game. Get ready at the vanity, call **Engineer** on your in-game phone, pick a date spot, and make memories: hug, kiss, flirt, play mini-games, fill the love meter and snap Polaroids for your Memory Album.

Built with **Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Zustand · lucide-react · canvas-confetti**. Every character, outfit and location is hand-built SVG — there are no image assets to break.

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run lint
```

## Game loop

1. **Title** – both characters preview your current look, plus Start / Memory Album.
2. **Vanity & Wardrobe Studio** – live animated preview with Full Body / Face zoom (Makeup auto-zooms to the face).
   - Hair: 9 styles · 9 colours · 7 skin tones
   - Makeup: 12 lipsticks (matte/glossy), 9 eyeshadow palettes, 5 liner/lash styles, 5 blushes + intensity, bindi, highlighter, face glitter
   - 14 outfits across Party, Dinner, Casual, Cozy and Traditional
   - 9 footwear options · earrings, necklaces, bags, sunglasses, watches
   - Randomize (picks a coherent look), Reset, and **Ready! Call Engineer 📞**
3. **Smartphone** – contact card → ringing → Engineer picks up and compliments your actual outfit and makeup (`getEngineerReaction`), then suggests destinations.
4. **Date scenes** – 6 illustrated, animated locations, each with its own activity and music:
   | Location | Activity |
   | --- | --- |
   | 🕯️ Candlelight Restaurant | order mains & dessert (they appear on the table), clink glasses |
   | 🎳 Bowling Alley | timing-bar mini-game, 5-frame scoreboard, Engineer cheers on strikes |
   | 🪩 Night Club | toggle dance moves to the beat, request a song, mocktails |
   | 🏔️ Mountains | shooting stars, chai / coffee, cozy blanket, marshmallows |
   | 🚗 Long Drive | convertible view, 4 radio stations, sunset ↔ night, hold hands, sing along |
   | 🛍️ Shopping Mall | Engineer buys a surprise gift (chocolates, flowers, plushie, jewelry) |
5. **Affection** – Hug 🤗, Kiss 😘, Flirt/Talk 💬 (sweet / funny / romantic replies per location) and the **Love Meter**. Hitting 100% triggers a *Perfect Date!* celebration and unlocks a love note.
6. **Polaroid 📸** – renders the live scene (background, both characters, props, foreground) to a framed PNG with a date stamp, offers a download, and saves it to the **Memory Album**.

Progress (look, love, polaroids, notes, mute) is saved to `localStorage` via Zustand `persist`.

## Project layout

```
src/
  app/                     layout, fonts, global styles, icon, page
  store/gameStore.ts       Zustand store (persisted)
  data/wardrobe.ts         all wardrobe/makeup options + randomizer
  data/dates.ts            locations, dialogue, compliment engine, Engineer outfits
  lib/audio.ts             Web Audio synth: SFX, ringtone, generated music loops
  lib/polaroid.ts          stage → canvas → Polaroid PNG
  components/
    character/             FemaleAvatar, EngineerAvatar + layered parts (hair, face, outfit, shoes, accessories)
    studio/                WardrobeStudio, CategoryTabs, MakeupControls, WardrobeControls
    phone/                 CallEngineerModal
    date/                  DateScene, Backgrounds, Props, LoveMeter, modals, per-location activities
    album/                 MemoryAlbum
    screens/, ui/          title screen, top bar, sparkles
```

### How the characters are drawn

Both avatars live on a shared 240×520 canvas. Left-side shapes are drawn once and mirrored around x=120, and each layer (hair back → garment back → legs → shoes → torso → garment → arms → sleeves → jewellery → face & makeup → hair front) is its own component keyed by wardrobe id. Zoom works by animating the SVG `viewBox`, so the art stays sharp at any size. Blinking uses CSS, and swaying uses Motion.

## Deploy

- **Vercel** – import the repo; no configuration needed.
- **Docker / Google Cloud Run** – the `Dockerfile` builds with `DOCKER_BUILD=1`, which turns on `output: "standalone"` in `next.config.ts`, and serves on `$PORT` (8080 by default).

  ```bash
  docker build -t date-night .
  docker run -p 8080:8080 date-night
  # or: gcloud run deploy date-night --source . --allow-unauthenticated
  ```
# GTA-We
