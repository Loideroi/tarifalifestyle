'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface PartnerGridProps {
  children: ReactNode;
  columns?: 2 | 3;
  className?: string;
}

const columnStyles = {
  2: 'grid-cols-1 md:grid-cols-2',
  3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
};

export function PartnerGrid({
  children,
  columns = 2,
  className,
}: PartnerGridProps) {
  return (
    <div className={cn('grid gap-4 md:gap-6', columnStyles[columns], className)}>
      {children}
    </div>
  );
}
