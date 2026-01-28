'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ExternalLink, Maximize2 } from 'lucide-react';
import { cn } from '@/lib/utils';

// Windy.com webcam IDs for Tarifa beaches
const BEACH_CAMS = {
  tarifa: {
    id: '1585315307',
    name: 'Tarifa Beach',
    url: 'https://www.windy.com/webcams/1585315307',
  },
  valdevaqueros: {
    id: '1629882534',
    name: 'Valdevaqueros',
    url: 'https://www.windy.com/webcams/1629882534',
  },
} as const;

type CamKey = keyof typeof BEACH_CAMS;

interface BeachCamEmbedProps {
  camKey?: CamKey;
  className?: string;
}

export function BeachCamEmbed({ camKey = 'tarifa', className }: BeachCamEmbedProps) {
  const [isLoading, setIsLoading] = useState(true);
  const cam = BEACH_CAMS[camKey];

  const embedUrl = `https://webcams.windy.com/webcams/public/embed/player/${cam.id}/day`;

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="flex items-center justify-between border-b border-sand-200 bg-sand-50 p-4">
        <div>
          <h3 className="font-semibold text-ocean-800">Beach Cam</h3>
          <p className="text-sm text-driftwood-400">{cam.name}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-driftwood-500 hover:text-ocean-600"
          >
            <a href={cam.url} target="_blank" rel="noopener noreferrer">
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            asChild
            className="text-driftwood-500 hover:text-ocean-600"
          >
            <a href={cam.url} target="_blank" rel="noopener noreferrer">
              <Maximize2 className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>

      <div className="relative aspect-video">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-sand-100">
            <LoadingSpinner text="Loading webcam..." />
          </div>
        )}
        <iframe
          src={embedUrl}
          className="h-full w-full"
          frameBorder="0"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          title={`${cam.name} Beach Cam`}
        />
      </div>
    </Card>
  );
}
