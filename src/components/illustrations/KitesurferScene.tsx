'use client';

import { motion } from 'framer-motion';

interface KitesurferSceneProps {
  className?: string;
}

export function KitesurferScene({ className }: KitesurferSceneProps) {
  return (
    <svg
      viewBox="0 0 800 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Sun + rays */}
      <motion.g
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx="680" cy="80" r="40" fill="var(--color-sunset-400)" fillOpacity="0.25" />
        <circle cx="680" cy="80" r="28" fill="var(--color-sunset-300)" fillOpacity="0.3" />
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
          <line
            key={angle}
            x1={680 + 44 * Math.cos((angle * Math.PI) / 180)}
            y1={80 + 44 * Math.sin((angle * Math.PI) / 180)}
            x2={680 + 56 * Math.cos((angle * Math.PI) / 180)}
            y2={80 + 56 * Math.sin((angle * Math.PI) / 180)}
            stroke="var(--color-sunset-400)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeOpacity="0.3"
          />
        ))}
      </motion.g>

      {/* Clouds */}
      <motion.g
        animate={{ x: [0, 15, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      >
        <ellipse cx="150" cy="70" rx="40" ry="16" fill="white" fillOpacity="0.15" />
        <ellipse cx="170" cy="62" rx="30" ry="14" fill="white" fillOpacity="0.12" />
        <ellipse cx="130" cy="66" rx="25" ry="12" fill="white" fillOpacity="0.1" />
      </motion.g>

      <motion.g
        animate={{ x: [0, -10, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
      >
        <ellipse cx="500" cy="50" rx="35" ry="14" fill="white" fillOpacity="0.12" />
        <ellipse cx="520" cy="44" rx="25" ry="10" fill="white" fillOpacity="0.1" />
      </motion.g>

      {/* Seagulls */}
      <motion.g
        animate={{ y: [0, -6, 0], x: [0, 4, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M280 100 Q285 94 290 100 Q295 94 300 100"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeOpacity="0.4"
        />
      </motion.g>
      <motion.g
        animate={{ y: [0, -4, 0], x: [0, -3, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      >
        <path
          d="M420 80 Q424 75 428 80 Q432 75 436 80"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeOpacity="0.35"
        />
      </motion.g>
      <motion.g
        animate={{ y: [0, -5, 0], x: [0, 6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      >
        <path
          d="M560 110 Q563 106 566 110 Q569 106 572 110"
          stroke="white"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
      </motion.g>

      {/* Kite */}
      <motion.g
        animate={{ rotate: [-4, 4, -4] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
        style={{ transformOrigin: '350px 120px' }}
      >
        <path
          d="M350 80L380 120L350 140L320 120Z"
          stroke="white"
          strokeWidth="2"
          fill="var(--color-sunset-400)"
          fillOpacity="0.3"
          strokeLinejoin="round"
          strokeOpacity="0.6"
        />
        {/* Kite cross */}
        <line x1="350" y1="80" x2="350" y2="140" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
        <line x1="320" y1="120" x2="380" y2="120" stroke="white" strokeWidth="1" strokeOpacity="0.4" />
        {/* Kite lines */}
        <line x1="350" y1="140" x2="300" y2="280" stroke="white" strokeWidth="0.8" strokeOpacity="0.25" />
        <line x1="350" y1="140" x2="310" y2="280" stroke="white" strokeWidth="0.8" strokeOpacity="0.25" />
      </motion.g>

      {/* Kitesurfer silhouette */}
      <g opacity="0.35">
        {/* Body */}
        <path
          d="M300 275C302 270 306 268 310 272L315 280"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Legs */}
        <path
          d="M308 278L298 290L290 288"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
        {/* Board */}
        <path
          d="M282 290C286 286 298 284 308 288"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          fill="none"
        />
        {/* Arms holding bar */}
        <path
          d="M310 272L305 265L300 268"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
        />
      </g>

      {/* Ocean waves */}
      <motion.g
        animate={{ x: [0, 20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <path
          d="M0 320 Q50 310 100 320 Q150 330 200 320 Q250 310 300 320 Q350 330 400 320 Q450 310 500 320 Q550 330 600 320 Q650 310 700 320 Q750 330 800 320 V400 H0 Z"
          fill="white"
          fillOpacity="0.08"
        />
      </motion.g>
      <motion.g
        animate={{ x: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      >
        <path
          d="M0 340 Q60 330 120 340 Q180 350 240 340 Q300 330 360 340 Q420 350 480 340 Q540 330 600 340 Q660 350 720 340 Q780 330 840 340 V400 H0 Z"
          fill="white"
          fillOpacity="0.06"
        />
      </motion.g>
      <path
        d="M0 360 Q40 352 80 360 Q120 368 160 360 Q200 352 240 360 Q280 368 320 360 Q360 352 400 360 Q440 368 480 360 Q520 352 560 360 Q600 368 640 360 Q680 352 720 360 Q760 368 800 360 V400 H0 Z"
        fill="white"
        fillOpacity="0.04"
      />
    </svg>
  );
}
