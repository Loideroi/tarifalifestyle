'use client';

import { useEffect, useRef, useState } from 'react';
import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { cn } from '@/lib/utils';

export const WINDGURU_SPOTS = {
  losLances: 48776,
  valdevaqueros: 541946,
  campoDeFutbol: 976270,
} as const;

type SpotKey = keyof typeof WINDGURU_SPOTS;

interface WindguruEmbedProps {
  spotId?: number;
  spotKey?: SpotKey;
  language?: string;
  className?: string;
}

export function WindguruEmbed({
  spotId,
  spotKey = 'losLances',
  language = 'en',
  className,
}: WindguruEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const actualSpotId = spotId ?? WINDGURU_SPOTS[spotKey];

  useEffect(() => {
    if (!containerRef.current) return;

    const uid = `wg_fwdg_${actualSpotId}_${Date.now()}`;

    // Clear previous content
    containerRef.current.innerHTML = '';

    const script = document.createElement('script');
    script.innerHTML = `
      (function (window, document) {
        var loader = function () {
          var arg = [
            "s=${actualSpotId}",
            "m=100",
            "uid=${uid}",
            "ai=0",
            "wj=knots",
            "tj=c",
            "waj=m",
            "tij=cm",
            "odh=0",
            "doh=24",
            "fhours=240",
            "hrsm=2",
            "vt=forecasts",
            "lng=${language}",
            "idbs=1",
            "p=WINDSPD,GUST,SMER,TMPE,FLHGT,CDC,APCP1s,RATING"
          ];
          var s = document.createElement("script");
          var tag = document.getElementsByTagName("script")[0];
          s.src = "https://www.windguru.cz/js/widget.php?" + (arg.join("&"));
          s.onload = function() {
            window.dispatchEvent(new Event('windguru-loaded'));
          };
          tag.parentNode.insertBefore(s, tag);
        };
        if (document.readyState === 'complete') {
          loader();
        } else {
          window.addEventListener("load", loader, false);
        }
      })(window, document);
    `;

    containerRef.current.appendChild(script);

    const handleLoad = () => {
      setTimeout(() => setIsLoading(false), 1000);
    };

    window.addEventListener('windguru-loaded', handleLoad);

    // Fallback timeout
    const timeout = setTimeout(() => setIsLoading(false), 5000);

    return () => {
      window.removeEventListener('windguru-loaded', handleLoad);
      clearTimeout(timeout);
    };
  }, [actualSpotId, language]);

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="border-b border-sand-200 bg-sand-50 p-4">
        <h3 className="font-semibold text-ocean-800">Windguru Forecast</h3>
        <p className="text-sm text-driftwood-400">10-day professional forecast</p>
      </div>
      <div className="relative min-h-[300px]">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-white">
            <LoadingSpinner text="Loading forecast..." />
          </div>
        )}
        <div
          ref={containerRef}
          className={cn('windguru-widget', isLoading && 'invisible')}
        />
      </div>
    </Card>
  );
}
