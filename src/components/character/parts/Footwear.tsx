import type { FootwearId, SkinTone } from "@/data/wardrobe";
import { Both, F } from "./shared";

/** Left foot is drawn; mirrored for the right. Ankle ≈ (101, 486). */
export function Footwear({ id, skin }: { id: FootwearId; skin: SkinTone }) {
  const bareFoot = <path d={F.footL} fill={skin.base} />;
  switch (id) {
    case "stilettos":
      return (
        <Both>
          <path d="M108 494 L112 516 L109.5 516 L105 500 Z" fill="#111" />
          <path d="M93 486 C91 496 92 506 96 512 L100 519 L104 512 C108 506 109 496 107 486 C103 491.5 97 491.5 93 486 Z" fill="#1d1719" />
          <path d="M95 492 C96 500 98 508 100 514" stroke="#fff" strokeOpacity="0.35" strokeWidth="1.2" fill="none" />
          <path d="M93.5 486.5 C97 490.6 103 490.6 106.5 486.5" stroke={skin.shade} strokeWidth="0.8" fill={skin.base} />
        </Both>
      );
    case "blockHeels":
      return (
        <Both>
          <rect x="105" y="500" width="6" height="15" rx="1" fill="#c9907e" />
          <path d="M92 488 C90 498 91 508 95 512 C98 515 104 515 106 512 C109 506 109 496 108 488 Z" fill="#e8b8a8" />
          <path d="M93 490 C97 494 103 494 107 490" fill={skin.base} stroke="#c9907e" strokeWidth="0.6" />
          <rect x="92.5" y="481" width="15.5" height="3.4" rx="1.6" fill="#e8b8a8" stroke="#c9907e" strokeWidth="0.5" />
          <circle cx="106" cy="482.7" r="1.1" fill="#f5c451" />
          <path d="M96 500 C97 506 99 509 101 511" stroke="#fff" strokeOpacity="0.45" strokeWidth="1.2" fill="none" />
        </Both>
      );
    case "sneakers":
      return (
        <Both>
          <path d="M90 482 C88 494 88 505 91 511 C94 516 106 516 109 511 C112 505 112 494 110 482 C104 478 96 478 90 482 Z" fill="#fff" stroke="#d6d0d8" strokeWidth="0.8" />
          <path d="M89.5 506 C94 511 106 511 110.5 506 L110 512 C106 518 94 518 90 512 Z" fill="#e8e2ea" />
          <path d="M94 488 L106 488 M94 492 L106 492 M95 496 L105 496" stroke="#c9c2cc" strokeWidth="1.2" strokeLinecap="round" />
          <path d="M90 500 C96 498 102 502 109 498" stroke="#f48fb1" strokeWidth="2" fill="none" strokeLinecap="round" />
        </Both>
      );
    case "ankleBoots":
      return (
        <Both>
          <rect x="104" y="502" width="7" height="13" rx="1.2" fill="#3e2416" />
          <path d="M89 452 L111 452 L110 486 C111 498 111 506 107 512 C103 516 96 516 93 512 C89 506 89 496 90 486 Z" fill="#6b3f26" />
          <path d="M89 452 L111 452 L111 458 L89 458 Z" fill="#53301c" />
          <path d="M94 462 C95 480 96 498 99 510" stroke="#fff" strokeOpacity="0.25" strokeWidth="1.6" fill="none" />
          <path d="M107 456 L107 486" stroke="#3e2416" strokeWidth="1" strokeDasharray="1.6 1.6" />
        </Both>
      );
    case "strappySandals":
      return (
        <Both>
          {bareFoot}
          <path d="M107 496 L110 515 L108 515 L104 500 Z" fill="#b8913c" />
          <g stroke="#d9b25b" strokeWidth="2.2" strokeLinecap="round" fill="none">
            <path d="M93 483 L107 483" />
            <path d="M92.5 494 L107 501" />
            <path d="M107 494 L92.5 501" />
            <path d="M92 506 C96 508.5 104 508.5 107 506" />
          </g>
          <circle cx="100" cy="497.5" r="1.4" fill="#fff6c9" />
        </Both>
      );
    case "juttis":
      return (
        <Both>
          {bareFoot}
          <path d="M91.5 496 C90 504 92 511 96 514 C98 516 100 518 100 521 C102 518 104 515 106 512 C109 506 109 500 108 496 C103 499 97 499 91.5 496 Z" fill="#c2185b" />
          <path d="M92 497 C97 500 103 500 108 497" stroke="#f5c451" strokeWidth="1.6" fill="none" />
          <g fill="#f5c451">
            <circle cx="96" cy="504" r="1" />
            <circle cx="100" cy="507" r="1.2" />
            <circle cx="104" cy="504" r="1" />
            <circle cx="100" cy="512" r="0.9" />
          </g>
        </Both>
      );
    case "loafers":
      return (
        <Both>
          <path d="M91 488 C89 498 90 507 94 512 C97 515 103 515 106 512 C110 507 110 498 109 488 C103 492 97 492 91 488 Z" fill="#7a4a2c" />
          <path d="M92.5 495 C96 498 104 498 107.5 495 L107 499 C104 501.5 96 501.5 93 499 Z" fill="#5e3720" />
          <rect x="97" y="496" width="6" height="2" rx="1" fill="#2e1a0f" />
          <path d="M94 504 C96 509 99 511 101 512" stroke="#fff" strokeOpacity="0.3" strokeWidth="1.2" fill="none" />
          <path d="M90 510 C95 516 105 516 110 510" stroke="#3e2416" strokeWidth="1.6" fill="none" />
        </Both>
      );
    case "wedges":
      return (
        <Both>
          {bareFoot}
          <path d="M90 504 L110 504 L111 516 L89 516 Z" fill="#e7d3a8" />
          <g stroke="#c9ad74" strokeWidth="0.8">
            <path d="M89.5 508 L110.5 508 M89.2 512 L110.8 512" />
          </g>
          <path d="M92 494 C96 497 104 497 108 494 L108 500 C104 503 96 503 92 500 Z" fill="#f1e3c8" stroke="#d8c39a" strokeWidth="0.6" />
          <path d="M94 482 L106 482" stroke="#f1e3c8" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M106 482 C110 486 110 490 108 492" stroke="#f1e3c8" strokeWidth="1.6" fill="none" strokeLinecap="round" />
        </Both>
      );
    case "kneeBoots":
      return (
        <Both>
          <rect x="104" y="502" width="7" height="13" rx="1.2" fill="#1f140f" />
          <path d="M84 398 L113 398 C113 430 111 460 110 486 C111 498 111 506 107 512 C103 516 96 516 93 512 C89 506 89 496 90 486 C88 460 86 430 84 398 Z" fill="#3d2a22" />
          <path d="M84 398 L113 398 L113 404 L84.2 404 Z" fill="#2a1c16" />
          <path d="M92 410 C93 440 95 480 98 508" stroke="#fff" strokeOpacity="0.2" strokeWidth="2" fill="none" />
        </Both>
      );
  }
}
