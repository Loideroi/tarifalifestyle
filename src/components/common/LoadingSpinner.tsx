'use client';

import { cn } from '@/lib/utils';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  text?: string;
}

const sizeStyles = {
  sm: 'h-4 w-4 border-2',
  md: 'h-8 w-8 border-2',
  lg: 'h-12 w-12 border-3',
};

export function LoadingSpinner({ size = 'md', className, text }: LoadingSpinnerProps) {
  return (
    <div className={cn('flex flex-col items-center justify-center gap-3', className)}>
      <div
        className={cn(
          'animate-spin rounded-full border-ocean-200 border-t-ocean-600',
          sizeStyles[size]
        )}
      />
      {text && <p className="text-sm text-driftwood-500">{text}</p>}
    </div>
  );
}

interface LoadingOverlayProps {
  text?: string;
}

export function LoadingOverlay({ text }: LoadingOverlayProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 backdrop-blur-sm">
      <LoadingSpinner size="lg" text={text} />
    </div>
  );
}

interface LoadingCardProps {
  className?: string;
}

export function LoadingCard({ className }: LoadingCardProps) {
  return (
    <div
      className={cn(
        'flex h-48 items-center justify-center rounded-lg border border-sand-200 bg-sand-50',
        className
      )}
    >
      <LoadingSpinner />
    </div>
  );
}
