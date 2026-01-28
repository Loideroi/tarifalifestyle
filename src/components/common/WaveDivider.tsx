'use client';

import { cn } from '@/lib/utils';

interface WaveDividerProps {
  className?: string;
  flip?: boolean;
  color?: 'white' | 'sand' | 'ocean';
}

const colorStyles = {
  white: 'fill-white',
  sand: 'fill-sand-50',
  ocean: 'fill-ocean-50',
};

export function WaveDivider({
  className,
  flip = false,
  color = 'white',
}: WaveDividerProps) {
  return (
    <div
      className={cn(
        'w-full overflow-hidden leading-none',
        flip && 'rotate-180',
        className
      )}
    >
      <svg
        className={cn('relative block h-12 w-full md:h-16', colorStyles[color])}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" />
      </svg>
    </div>
  );
}
