'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { cn } from '@/lib/utils';

interface MapEmbedProps {
  address: string;
  name?: string;
  className?: string;
  height?: number;
}

export function MapEmbed({
  address,
  name,
  className,
  height = 300,
}: MapEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const query = encodeURIComponent(`${address}, Tarifa, Spain`);
  const embedUrl = `https://maps.google.com/maps?q=${query}&t=&z=15&ie=UTF8&iwloc=&output=embed`;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="relative" style={{ height }}>
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-sand-100">
            <LoadingSpinner text="Loading map..." />
          </div>
        )}
        <iframe
          src={embedUrl}
          className="h-full w-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          onLoad={() => setIsLoading(false)}
          title={name ? `Map of ${name}` : 'Map'}
        />
      </div>
    </Card>
  );
}
