'use client';

import { motion } from 'framer-motion';

interface CoastlineStripProps {
  className?: string;
}

export function CoastlineStrip({ className }: CoastlineStripProps) {
  return (
    <svg
      viewBox="0 0 1200 150"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
      preserveAspectRatio="xMidYMid meet"
    >
      {/* Distant hills with wind turbines */}
      <path
        d="M0 90 Q100 60 200 75 Q300 90 400 70 Q500 50 600 65 Q700 80 800 60 Q900 40 1000 55 Q1100 70 1200 50 V150 H0 Z"
        fill="var(--color-sand-200)"
        fillOpacity="0.3"
      />

      {/* Wind turbines */}
      {[180, 520, 900].map((x, i) => (
        <g key={i}>
          <line
            x1={x}
            y1={i === 1 ? 32 : 45}
            x2={x}
            y2={i === 1 ? 65 : 75}
            stroke="var(--color-driftwood-300)"
            strokeWidth="1.5"
          />
          <motion.g
            animate={{ rotate: 360 }}
            transition={{ duration: 6 + i * 2, repeat: Infinity, ease: 'linear' }}
            style={{ transformOrigin: `${x}px ${i === 1 ? 32 : 45}px` }}
          >
            <line
              x1={x}
              y1={i === 1 ? 32 : 45}
              x2={x}
              y2={i === 1 ? 20 : 33}
              stroke="var(--color-driftwood-300)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={x}
              y1={i === 1 ? 32 : 45}
              x2={x - 10}
              y2={i === 1 ? 38 : 51}
              stroke="var(--color-driftwood-300)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <line
              x1={x}
              y1={i === 1 ? 32 : 45}
              x2={x + 10}
              y2={i === 1 ? 38 : 51}
              stroke="var(--color-driftwood-300)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </motion.g>
        </g>
      ))}

      {/* Kites in sky */}
      {[
        { x: 300, y: 25, color: 'var(--color-sunset-400)' },
        { x: 650, y: 20, color: 'var(--color-ocean-400)' },
        { x: 1000, y: 30, color: 'var(--color-palm-400)' },
      ].map((kite, i) => (
        <motion.g
          key={i}
          animate={{ y: [-2, 2, -2], rotate: [-3, 3, -3] }}
          transition={{ duration: 3 + i, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
          style={{ transformOrigin: `${kite.x}px ${kite.y}px` }}
        >
          <path
            d={`M${kite.x} ${kite.y - 8}L${kite.x + 6} ${kite.y}L${kite.x} ${kite.y + 4}L${kite.x - 6} ${kite.y}Z`}
            stroke={kite.color}
            strokeWidth="1.5"
            fill={kite.color}
            fillOpacity="0.3"
          />
          {/* Kite line */}
          <line
            x1={kite.x}
            y1={kite.y + 4}
            x2={kite.x + 15}
            y2={kite.y + 60}
            stroke={kite.color}
            strokeWidth="0.5"
            strokeOpacity="0.4"
          />
        </motion.g>
      ))}

      {/* Beach outline */}
      <path
        d="M0 100 C100 95 200 105 300 100 C400 95 500 100 600 98 C700 96 800 105 900 100 C1000 95 1100 100 1200 98"
        stroke="var(--color-sand-400)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
      />

      {/* Lighthouse hint */}
      <g>
        <rect x="1100" y="55" width="8" height="30" rx="1" stroke="var(--color-driftwood-300)" strokeWidth="1.5" fill="var(--color-sand-100)" fillOpacity="0.5" />
        <path d="M1096 55L1104 55L1108 55" stroke="var(--color-driftwood-300)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="1104" cy="52" r="3" stroke="var(--color-sunset-400)" strokeWidth="1" fill="var(--color-sunset-300)" fillOpacity="0.4" />
      </g>

      {/* Ocean waves */}
      <motion.path
        d="M0 115 Q30 110 60 115 Q90 120 120 115 Q150 110 180 115 Q210 120 240 115 Q270 110 300 115 Q330 120 360 115 Q390 110 420 115 Q450 120 480 115 Q510 110 540 115 Q570 120 600 115 Q630 110 660 115 Q690 120 720 115 Q750 110 780 115 Q810 120 840 115 Q870 110 900 115 Q930 120 960 115 Q990 110 1020 115 Q1050 120 1080 115 Q1110 110 1140 115 Q1170 120 1200 115"
        stroke="var(--color-ocean-400)"
        strokeWidth="1.5"
        fill="none"
        strokeLinecap="round"
        strokeOpacity="0.4"
        animate={{ x: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.path
        d="M0 125 Q40 120 80 125 Q120 130 160 125 Q200 120 240 125 Q280 130 320 125 Q360 120 400 125 Q440 130 480 125 Q520 120 560 125 Q600 130 640 125 Q680 120 720 125 Q760 130 800 125 Q840 120 880 125 Q920 130 960 125 Q1000 120 1040 125 Q1080 130 1120 125 Q1160 120 1200 125"
        stroke="var(--color-ocean-300)"
        strokeWidth="1"
        fill="none"
        strokeLinecap="round"
        strokeOpacity="0.3"
        animate={{ x: [0, -20, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />
    </svg>
  );
}
