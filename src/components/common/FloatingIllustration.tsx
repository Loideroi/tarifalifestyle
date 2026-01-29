'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

type Position =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center';

interface FloatingIllustrationProps {
  children: React.ReactNode;
  position?: Position;
  size?: string;
  animationDelay?: number;
  className?: string;
}

const positionClasses: Record<Position, string> = {
  'top-left': 'top-4 left-4 md:top-8 md:left-8',
  'top-right': 'top-4 right-4 md:top-8 md:right-8',
  'bottom-left': 'bottom-4 left-4 md:bottom-8 md:left-8',
  'bottom-right': 'bottom-4 right-4 md:bottom-8 md:right-8',
  center: 'top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2',
};

export function FloatingIllustration({
  children,
  position = 'top-right',
  size,
  animationDelay = 0,
  className,
}: FloatingIllustrationProps) {
  return (
    <motion.div
      className={cn(
        'pointer-events-none absolute z-0',
        positionClasses[position],
        size,
        className
      )}
      aria-hidden="true"
      animate={{
        y: [0, -8, 0],
        rotate: [0, 1.5, 0, -1.5, 0],
      }}
      transition={{
        duration: 6,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: animationDelay,
      }}
    >
      {children}
    </motion.div>
  );
}
