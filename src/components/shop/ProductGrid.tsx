'use client';

import { cn } from '@/lib/utils';
import { type ReactNode } from 'react';

interface ProductGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  className?: string;
}

const columnStyles = {
  2: 'grid-cols-1 sm:grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
};

export function ProductGrid({
  children,
  columns = 4,
  className,
}: ProductGridProps) {
  return (
    <div
      className={cn('grid gap-4 md:gap-6', columnStyles[columns], className)}
    >
      {children}
    </div>
  );
}
