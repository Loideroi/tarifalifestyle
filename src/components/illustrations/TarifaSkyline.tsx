import { cn } from '@/lib/utils';

interface TarifaSkylineProps {
  className?: string;
}

export function TarifaSkyline({ className }: TarifaSkylineProps) {
  return (
    <svg
      viewBox="0 0 800 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('w-full', className)}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Building 1 - narrow tall */}
      <rect x="40" y="50" width="35" height="70" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.6" />
      <rect x="46" y="58" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="56" y="58" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="46" y="72" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="56" y="72" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      {/* Building 2 - wide */}
      <rect x="80" y="55" width="50" height="65" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.5" />
      {/* Terracotta roof */}
      <path d="M78 55L105 40L132 55" stroke="var(--color-sunset-300)" strokeWidth="2" fill="var(--color-sunset-300)" fillOpacity="0.25" strokeLinejoin="round" />
      <rect x="88" y="64" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="100" y="64" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="114" y="64" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="96" y="90" width="12" height="30" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1" fill="var(--color-driftwood-300)" fillOpacity="0.15" />

      {/* Building 3 - small */}
      <rect x="140" y="65" width="30" height="55" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.6" />
      <rect x="148" y="72" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="158" y="72" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      {/* Mosque minaret */}
      <rect x="190" y="25" width="14" height="95" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.6" />
      <path d="M190 35H204" stroke="var(--color-driftwood-300)" strokeWidth="1" />
      <path d="M190 50H204" stroke="var(--color-driftwood-300)" strokeWidth="1" />
      <circle cx="197" cy="22" r="4" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.5" />
      <path d="M197 18V12" stroke="var(--color-driftwood-300)" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M195 12L197 8L199 12" stroke="var(--color-driftwood-300)" strokeWidth="1" fill="none" />

      {/* Building 4 */}
      <rect x="215" y="58" width="40" height="62" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.5" />
      <path d="M213 58L235 45L257 58" stroke="var(--color-sunset-300)" strokeWidth="2" fill="var(--color-sunset-300)" fillOpacity="0.2" strokeLinejoin="round" />
      <rect x="223" y="66" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="233" y="66" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="243" y="66" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      {/* Palm tree */}
      <line x1="280" y1="30" x2="280" y2="120" stroke="var(--color-palm-500)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M280 30 Q270 22 258 28" stroke="var(--color-palm-500)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
      <path d="M280 30 Q290 22 302 28" stroke="var(--color-palm-500)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
      <path d="M280 30 Q275 18 265 20" stroke="var(--color-palm-500)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
      <path d="M280 30 Q285 18 295 20" stroke="var(--color-palm-500)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
      <path d="M280 30 Q280 16 278 12" stroke="var(--color-palm-500)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />

      {/* Building 5 */}
      <rect x="310" y="60" width="35" height="60" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.6" />
      <rect x="318" y="68" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="330" y="68" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="318" y="82" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="330" y="82" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      {/* Building 6 - terracotta roofed */}
      <rect x="355" y="52" width="45" height="68" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.5" />
      <path d="M353 52L377.5 38L402 52" stroke="var(--color-sunset-300)" strokeWidth="2" fill="var(--color-sunset-300)" fillOpacity="0.25" strokeLinejoin="round" />
      <rect x="365" y="62" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="378" y="62" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="390" y="62" width="6" height="8" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      {/* More buildings to fill width */}
      <rect x="410" y="64" width="30" height="56" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.6" />
      <rect x="417" y="72" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="428" y="72" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      <rect x="450" y="56" width="38" height="64" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.5" />
      <path d="M448 56L469 44L490 56" stroke="var(--color-sunset-300)" strokeWidth="2" fill="var(--color-sunset-300)" fillOpacity="0.2" strokeLinejoin="round" />
      <rect x="458" y="64" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="470" y="64" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="480" y="64" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      {/* Second palm tree */}
      <line x1="510" y1="35" x2="510" y2="120" stroke="var(--color-palm-500)" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.7" />
      <path d="M510 35 Q500 27 488 33" stroke="var(--color-palm-500)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
      <path d="M510 35 Q520 27 532 33" stroke="var(--color-palm-500)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
      <path d="M510 35 Q505 23 495 25" stroke="var(--color-palm-500)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />
      <path d="M510 35 Q515 23 525 25" stroke="var(--color-palm-500)" strokeWidth="2" strokeLinecap="round" fill="none" strokeOpacity="0.6" />

      {/* More buildings */}
      <rect x="535" y="62" width="35" height="58" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.6" />
      <rect x="543" y="70" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="555" y="70" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      <rect x="580" y="55" width="42" height="65" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.5" />
      <path d="M578 55L601 42L624 55" stroke="var(--color-sunset-300)" strokeWidth="2" fill="var(--color-sunset-300)" fillOpacity="0.2" strokeLinejoin="round" />
      <rect x="588" y="64" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="600" y="64" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="612" y="64" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      <rect x="630" y="66" width="32" height="54" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.6" />
      <rect x="637" y="74" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="649" y="74" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      <rect x="670" y="58" width="40" height="62" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.5" />
      <path d="M668 58L690 46L712 58" stroke="var(--color-sunset-300)" strokeWidth="2" fill="var(--color-sunset-300)" fillOpacity="0.25" strokeLinejoin="round" />
      <rect x="678" y="66" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="690" y="66" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="700" y="66" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      <rect x="720" y="62" width="35" height="58" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.6" />
      <rect x="728" y="70" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />
      <rect x="740" y="70" width="5" height="7" rx="0.5" fill="var(--color-ocean-200)" fillOpacity="0.5" />

      {/* Ground line */}
      <line x1="0" y1="120" x2="800" y2="120" stroke="var(--color-driftwood-300)" strokeWidth="1" strokeOpacity="0.4" />
    </svg>
  );
}
