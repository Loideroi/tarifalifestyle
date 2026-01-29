'use client';

import { cn } from '@/lib/utils';

type ShapeVariant = 'blob' | 'wave-edge' | 'organic-circle';
type ShapeColor = 'ocean' | 'sunset' | 'sand' | 'palm' | 'driftwood';

interface ShapedContainerProps {
  variant?: ShapeVariant;
  color?: ShapeColor;
  size?: string;
  className?: string;
  children: React.ReactNode;
}

const colorMap: Record<ShapeColor, string> = {
  ocean: 'bg-ocean-100',
  sunset: 'bg-sunset-300/20',
  sand: 'bg-sand-200',
  palm: 'bg-palm-400/20',
  driftwood: 'bg-driftwood-300/20',
};

const shadowColorMap: Record<ShapeColor, string> = {
  ocean: 'shadow-[0_8px_30px_-8px_rgba(30,136,229,0.3)]',
  sunset: 'shadow-[0_8px_30px_-8px_rgba(255,112,67,0.3)]',
  sand: 'shadow-[0_8px_30px_-8px_rgba(139,112,80,0.2)]',
  palm: 'shadow-[0_8px_30px_-8px_rgba(76,175,80,0.3)]',
  driftwood: 'shadow-[0_8px_30px_-8px_rgba(121,85,72,0.3)]',
};

const variantStyles: Record<ShapeVariant, string> = {
  blob: 'rounded-[60%_40%_50%_50%/40%_60%_40%_60%]',
  'wave-edge':
    '[clip-path:polygon(0%_8%,5%_2%,10%_6%,15%_1%,20%_5%,25%_2%,30%_7%,35%_3%,40%_6%,45%_1%,50%_5%,55%_2%,60%_6%,65%_1%,70%_5%,75%_2%,80%_7%,85%_3%,90%_6%,95%_2%,100%_8%,100%_92%,95%_98%,90%_94%,85%_97%,80%_93%,75%_98%,70%_95%,65%_99%,60%_94%,55%_98%,50%_95%,45%_99%,40%_94%,35%_97%,30%_93%,25%_98%,20%_95%,15%_99%,10%_94%,5%_98%,0%_92%)]',
  'organic-circle': '[clip-path:ellipse(48%_45%_at_50%_50%)]',
};

export function ShapedContainer({
  variant = 'blob',
  color = 'ocean',
  size,
  className,
  children,
}: ShapedContainerProps) {
  return (
    <div
      className={cn(
        'flex items-center justify-center',
        colorMap[color],
        shadowColorMap[color],
        variantStyles[variant],
        size,
        className
      )}
    >
      {children}
    </div>
  );
}
