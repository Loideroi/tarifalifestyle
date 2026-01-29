import { cn } from '@/lib/utils';

interface IconProps {
  className?: string;
}

/** House with palm tree — Moving / Relocation */
export function HouseWithPalm({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-16 w-16', className)}
      aria-hidden="true"
    >
      {/* Palm tree */}
      <path
        d="M48 12C48 12 42 18 42 28"
        stroke="var(--color-palm-500)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M48 12C48 12 54 18 52 28"
        stroke="var(--color-palm-500)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M48 12C48 12 44 6 38 8"
        stroke="var(--color-palm-500)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M48 12C48 12 52 6 58 8"
        stroke="var(--color-palm-500)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="48"
        y1="12"
        x2="48"
        y2="52"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* House body */}
      <rect
        x="8"
        y="32"
        width="28"
        height="20"
        rx="2"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-sunset-400)"
        fillOpacity="0.2"
      />
      {/* Roof */}
      <path
        d="M4 32L22 18L40 32"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Door */}
      <rect
        x="18"
        y="40"
        width="8"
        height="12"
        rx="1"
        stroke="var(--color-driftwood-500)"
        strokeWidth="1.5"
        fill="var(--color-ocean-500)"
        fillOpacity="0.2"
      />
      {/* Window */}
      <rect
        x="11"
        y="36"
        width="5"
        height="5"
        rx="0.5"
        stroke="var(--color-driftwood-500)"
        strokeWidth="1.5"
        fill="var(--color-ocean-500)"
        fillOpacity="0.2"
      />
      {/* Ground */}
      <path
        d="M2 52C2 52 16 50 32 52C48 54 62 52 62 52"
        stroke="var(--color-sand-400)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** First aid cross + sun — Healthcare */
export function FirstAidSun({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-16 w-16', className)}
      aria-hidden="true"
    >
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="46"
          y1="18"
          x2={46 + 8 * Math.cos((angle * Math.PI) / 180)}
          y2={18 + 8 * Math.sin((angle * Math.PI) / 180)}
          stroke="var(--color-sunset-400)"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeOpacity="0.6"
        />
      ))}
      {/* Sun circle */}
      <circle
        cx="46"
        cy="18"
        r="5"
        stroke="var(--color-sunset-400)"
        strokeWidth="2"
        fill="var(--color-sunset-400)"
        fillOpacity="0.2"
      />
      {/* First aid box */}
      <rect
        x="8"
        y="22"
        width="32"
        height="28"
        rx="4"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-palm-400)"
        fillOpacity="0.2"
      />
      {/* Cross */}
      <path
        d="M24 30V46M16 38H32"
        stroke="var(--color-palm-500)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Handle */}
      <path
        d="M16 22V18C16 16.9 16.9 16 18 16H30C31.1 16 32 16.9 32 18V22"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/** Open book with wave — Schools */
export function BookWithWave({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-16 w-16', className)}
      aria-hidden="true"
    >
      {/* Left page */}
      <path
        d="M32 14V52C32 52 26 48 14 48C10 48 6 49 6 49V12C6 12 10 10 14 10C22 10 32 14 32 14Z"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-ocean-500)"
        fillOpacity="0.15"
        strokeLinejoin="round"
      />
      {/* Right page */}
      <path
        d="M32 14V52C32 52 38 48 50 48C54 48 58 49 58 49V12C58 12 54 10 50 10C42 10 32 14 32 14Z"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-ocean-500)"
        fillOpacity="0.1"
        strokeLinejoin="round"
      />
      {/* Text lines left */}
      <line x1="12" y1="22" x2="26" y2="20" stroke="var(--color-driftwood-300)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="28" x2="26" y2="26" stroke="var(--color-driftwood-300)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="12" y1="34" x2="22" y2="32" stroke="var(--color-driftwood-300)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Wave on right page */}
      <path
        d="M36 26C38 24 40 24 42 26C44 28 46 28 48 26C50 24 52 24 54 26"
        stroke="var(--color-ocean-400)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M36 34C38 32 40 32 42 34C44 36 46 36 48 34C50 32 52 32 54 34"
        stroke="var(--color-ocean-300)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Laptop on beach — Coworking */
export function LaptopBeach({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-16 w-16', className)}
      aria-hidden="true"
    >
      {/* Laptop screen */}
      <rect
        x="12"
        y="14"
        width="32"
        height="22"
        rx="2"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-ocean-500)"
        fillOpacity="0.15"
      />
      {/* Screen content - code lines */}
      <line x1="16" y1="20" x2="28" y2="20" stroke="var(--color-ocean-400)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="25" x2="36" y2="25" stroke="var(--color-palm-400)" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="16" y1="30" x2="24" y2="30" stroke="var(--color-sunset-300)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Laptop base */}
      <path
        d="M8 36H48L52 42H4L8 36Z"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-driftwood-300)"
        fillOpacity="0.2"
        strokeLinejoin="round"
      />
      {/* Beach sand */}
      <path
        d="M2 50C2 50 12 46 32 48C52 50 62 46 62 46"
        stroke="var(--color-sand-400)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="var(--color-sand-300)"
        fillOpacity="0.2"
      />
      {/* Small wave */}
      <path
        d="M2 56C6 54 10 54 14 56C18 58 22 58 26 56C30 54 34 54 38 56"
        stroke="var(--color-ocean-300)"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

/** Surfboard — Decorative accent */
export function Surfboard({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-16 w-16', className)}
      aria-hidden="true"
    >
      <path
        d="M32 4C28 4 24 8 22 16C20 24 20 36 22 44C24 52 28 58 32 60C36 58 40 52 42 44C44 36 44 24 42 16C40 8 36 4 32 4Z"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-sunset-400)"
        fillOpacity="0.2"
      />
      {/* Stringer */}
      <line x1="32" y1="8" x2="32" y2="56" stroke="var(--color-driftwood-500)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Stripe */}
      <path
        d="M27 20C29 19 31 18 33 19C35 20 37 19 39 18"
        stroke="var(--color-ocean-400)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Fin */}
      <path
        d="M32 48L28 54L36 54Z"
        stroke="var(--color-driftwood-500)"
        strokeWidth="1.5"
        fill="var(--color-ocean-500)"
        fillOpacity="0.3"
      />
    </svg>
  );
}

/** Beach umbrella — Decorative accent */
export function BeachUmbrella({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-16 w-16', className)}
      aria-hidden="true"
    >
      {/* Umbrella canopy */}
      <path
        d="M10 28C10 16 20 8 32 8C44 8 54 16 54 28"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-sunset-400)"
        fillOpacity="0.2"
      />
      {/* Canopy stripes */}
      <path d="M18 28C18 20 24 12 32 10" stroke="var(--color-sunset-400)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M32 10C40 12 46 20 46 28" stroke="var(--color-ocean-400)" strokeWidth="1.5" strokeLinecap="round" />
      {/* Pole */}
      <line x1="32" y1="8" x2="32" y2="56" stroke="var(--color-driftwood-500)" strokeWidth="2" strokeLinecap="round" />
      {/* Pole tip */}
      <circle cx="32" cy="6" r="2" stroke="var(--color-driftwood-500)" strokeWidth="1.5" fill="var(--color-sunset-300)" fillOpacity="0.3" />
      {/* Sand mound */}
      <ellipse cx="32" cy="56" rx="8" ry="3" stroke="var(--color-sand-400)" strokeWidth="1.5" fill="var(--color-sand-300)" fillOpacity="0.3" />
    </svg>
  );
}

/** Sunglasses — Decorative accent */
export function Sunglasses({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-16 w-16', className)}
      aria-hidden="true"
    >
      {/* Left lens */}
      <path
        d="M8 28C8 24 10 20 16 20C22 20 26 24 26 28C26 34 22 38 16 38C10 38 8 34 8 28Z"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-ocean-500)"
        fillOpacity="0.2"
      />
      {/* Right lens */}
      <path
        d="M38 28C38 24 40 20 46 20C52 20 56 24 56 28C56 34 52 38 46 38C40 38 38 34 38 28Z"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-ocean-500)"
        fillOpacity="0.2"
      />
      {/* Bridge */}
      <path
        d="M26 26C28 22 36 22 38 26"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      {/* Left arm */}
      <path d="M8 24L2 20" stroke="var(--color-driftwood-500)" strokeWidth="2" strokeLinecap="round" />
      {/* Right arm */}
      <path d="M56 24L62 20" stroke="var(--color-driftwood-500)" strokeWidth="2" strokeLinecap="round" />
      {/* Reflection */}
      <path d="M14 26L12 30" stroke="var(--color-ocean-200)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
      <path d="M44 26L42 30" stroke="var(--color-ocean-200)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.6" />
    </svg>
  );
}

/** Coffee cup — Decorative accent */
export function CoffeeCup({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('h-16 w-16', className)}
      aria-hidden="true"
    >
      {/* Steam */}
      <path d="M20 16C20 12 24 12 24 8" stroke="var(--color-driftwood-300)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M28 14C28 10 32 10 32 6" stroke="var(--color-driftwood-300)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      <path d="M36 16C36 12 40 12 40 8" stroke="var(--color-driftwood-300)" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.5" />
      {/* Cup body */}
      <path
        d="M12 22H44L40 52H16L12 22Z"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="var(--color-sand-200)"
        fillOpacity="0.5"
        strokeLinejoin="round"
      />
      {/* Cup handle */}
      <path
        d="M44 28C50 28 54 32 54 38C54 44 50 48 44 48"
        stroke="var(--color-driftwood-500)"
        strokeWidth="2"
        fill="none"
        strokeLinecap="round"
      />
      {/* Coffee surface */}
      <path
        d="M14 30H42"
        stroke="var(--color-driftwood-400)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Saucer */}
      <ellipse cx="28" cy="54" rx="18" ry="4" stroke="var(--color-driftwood-500)" strokeWidth="2" fill="var(--color-sand-200)" fillOpacity="0.3" />
    </svg>
  );
}
