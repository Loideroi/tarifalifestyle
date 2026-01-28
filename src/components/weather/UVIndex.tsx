'use client';

import { Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { getUVLevel } from '@/lib/weather/open-meteo';

interface UVIndexProps {
  value: number;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizeStyles = {
  sm: {
    container: 'gap-2',
    icon: 'h-4 w-4',
    value: 'text-lg',
    label: 'text-xs',
  },
  md: {
    container: 'gap-3',
    icon: 'h-5 w-5',
    value: 'text-2xl',
    label: 'text-sm',
  },
  lg: {
    container: 'gap-4',
    icon: 'h-6 w-6',
    value: 'text-3xl',
    label: 'text-base',
  },
};

const levelColors = {
  low: {
    bg: 'bg-green-100',
    icon: 'text-green-600',
    text: 'text-green-700',
  },
  moderate: {
    bg: 'bg-yellow-100',
    icon: 'text-yellow-600',
    text: 'text-yellow-700',
  },
  high: {
    bg: 'bg-orange-100',
    icon: 'text-orange-600',
    text: 'text-orange-700',
  },
  'very-high': {
    bg: 'bg-red-100',
    icon: 'text-red-600',
    text: 'text-red-700',
  },
  extreme: {
    bg: 'bg-purple-100',
    icon: 'text-purple-600',
    text: 'text-purple-700',
  },
};

export function UVIndex({ value, className, size = 'md' }: UVIndexProps) {
  const uvLevel = getUVLevel(value);
  const styles = sizeStyles[size];
  const colors = levelColors[uvLevel.level];

  return (
    <div
      className={cn(
        'flex items-center rounded-lg p-3',
        colors.bg,
        styles.container,
        className
      )}
    >
      <Sun className={cn(styles.icon, colors.icon)} />
      <div>
        <p className={cn('font-bold', styles.value, colors.text)}>
          {Math.round(value)}
        </p>
        <p className={cn(styles.label, 'text-driftwood-500')}>
          UV {uvLevel.description}
        </p>
      </div>
    </div>
  );
}

interface UVIndexBarProps {
  value: number;
  className?: string;
}

export function UVIndexBar({ value, className }: UVIndexBarProps) {
  const percentage = Math.min((value / 11) * 100, 100);
  const uvLevel = getUVLevel(value);

  return (
    <div className={cn('space-y-2', className)}>
      <div className="flex items-center justify-between text-sm">
        <span className="text-driftwood-500">UV Index</span>
        <span className="font-medium">{Math.round(value)} - {uvLevel.description}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-gradient-to-r from-green-400 via-yellow-400 via-orange-400 to-red-500">
        <div
          className="relative h-full"
          style={{ width: `${percentage}%` }}
        >
          <div className="absolute right-0 top-1/2 h-4 w-1 -translate-y-1/2 rounded bg-white shadow" />
        </div>
      </div>
    </div>
  );
}
