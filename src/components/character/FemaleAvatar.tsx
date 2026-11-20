"use client";

import { motion, useReducedMotion } from "motion/react";
import { getHairColor, getSkin, type Look } from "@/data/wardrobe";
import { Bag, Earrings, Necklace, Sunglasses, Watch } from "./parts/Accessories";
import { FemaleFace, type Expression } from "./parts/Face";
import { Footwear } from "./parts/Footwear";
import { HairBack, HairDefs, HairFront } from "./parts/Hair";
import { renderOutfit } from "./parts/Outfit";
import { Both, F, VIEWBOXES, useSvgUid, type AvatarView } from "./parts/shared";

export interface FemaleAvatarProps {
  look: Look;
  view?: AvatarView;
  animated?: boolean;
  expression?: Expression;
  blushing?: boolean;
  className?: string;
}

/**
 * Layered SVG renderer for the protagonist.
 * Paint order: hair(back) → garment back → legs → legwear → shoes → torso → garment
 * → arms → sleeves → jewellery/bag → head → makeup → hair(front) → earrings → shades
 */
export function FemaleAvatar({
  look,
  view = "full",
  animated = true,
  expression = "smile",
  blushing = false,
  className,
}: FemaleAvatarProps) {
  const uid = useSvgUid("fa");
  const reduce = useReducedMotion();
  const skin = getSkin(look.skinTone);
  const hair = getHairColor(look.hairColor);
  const outfit = renderOutfit(look.outfit, uid, skin);
  const live = animated && !reduce;

  const body = (
    <>
      <defs>
        <linearGradient id={`${uid}-skin`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={skin.shade} />
          <stop offset="0.45" stopColor={skin.base} />
          <stop offset="1" stopColor={skin.shade} />
        </linearGradient>
        <linearGradient id={`${uid}-limb`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor={skin.shade} />
          <stop offset="0.6" stopColor={skin.base} />
          <stop offset="1" stopColor={skin.base} />
        </linearGradient>
      </defs>
      <HairDefs uid={uid} color={hair} />
      {outfit.defs}

      <HairBack uid={uid} style={look.hairStyle} color={hair} animated={live} />
      {outfit.back}

      {/* legs */}
      <Both>
        <path d={F.legL} fill={`url(#${uid}-limb)`} />
        <path d="M94 402 C98 406 104 406 108 402" stroke={skin.shade} strokeWidth="1" fill="none" opacity="0.6" />
      </Both>
      {outfit.legwear}
      <Footwear id={look.footwear} skin={skin} />

      {/* torso */}
      <path d={F.hips} fill={skin.base} />
      <path d={F.torso} fill={`url(#${uid}-skin)`} />
      <path d={F.neck} fill={skin.base} />
      <path d={F.neckShadow} fill={skin.shade} opacity="0.55" />
      <g stroke={skin.shade} strokeWidth="1" fill="none" opacity="0.6" strokeLinecap="round">
        <path d="M98 200 C106 202 112 201 116 199" />
        <path d="M142 200 C134 202 128 201 124 199" />
      </g>

      {outfit.main}

      {/* arms */}
      <Both>
        <path d={F.armL} fill={`url(#${uid}-limb)`} />
        <path d={F.handL} fill={skin.base} />
        <path d="M58 346 L60 352 M62 347 L63.5 353" stroke={skin.shade} strokeWidth="0.8" strokeLinecap="round" />
      </Both>
      {outfit.sleeves}

      <Watch id={look.watch} />
      <Necklace id={look.necklace} />
      <Bag id={look.bag} />

      {/* head */}
      <FemaleFace
        uid={uid}
        skin={skin}
        browColor={hair.shade}
        lipstick={look.lipstick}
        lipFinish={look.lipFinish}
        eyeshadow={look.eyeshadow}
        eyeliner={look.eyeliner}
        blush={look.blush}
        blushIntensity={look.blushIntensity}
        bindi={look.bindi}
        highlighter={look.highlighter}
        glitter={look.glitter}
        expression={expression}
        blushing={blushing}
        animated={live}
      />
      <HairFront uid={uid} style={look.hairStyle} color={hair} />
      <Earrings id={look.earrings} />
      <Sunglasses id={look.sunglasses} />
    </>
  );

  if (!live) {
    return (
      <svg viewBox={VIEWBOXES[view]} className={className} xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Your character">
        {body}
      </svg>
    );
  }

  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="Your character"
      initial={false}
      animate={{ viewBox: VIEWBOXES[view] }}
      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      viewBox={VIEWBOXES[view]}
    >
      <motion.g
        style={{ originX: 0.5, originY: 1 }}
        animate={{ y: [0, -1.6, 0], rotate: [0, 0.7, 0, -0.7, 0] }}
        transition={{
          y: { duration: 3.2, repeat: Infinity, ease: "easeInOut" },
          rotate: { duration: 6.4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        {body}
      </motion.g>
    </motion.svg>
  );
}
