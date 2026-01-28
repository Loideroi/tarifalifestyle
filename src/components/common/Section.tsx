'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface SectionProps {
  children: ReactNode;
  className?: string;
  id?: string;
  background?: 'default' | 'sand' | 'ocean' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

const backgroundStyles = {
  default: 'bg-white',
  sand: 'bg-sand-50',
  ocean: 'bg-ocean-50',
  gradient: 'bg-gradient-to-b from-ocean-50 to-sand-50',
};

const paddingStyles = {
  sm: 'py-8 md:py-12',
  md: 'py-12 md:py-16',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
};

export function Section({
  children,
  className,
  id,
  background = 'default',
  padding = 'lg',
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        backgroundStyles[background],
        paddingStyles[padding],
        className
      )}
    >
      {children}
    </section>
  );
}
