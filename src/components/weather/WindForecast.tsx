'use client';

import { useMemo } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { degreesToDirection, getWindQuality } from '@/lib/weather/open-meteo';
import type { WindForecast as WindForecastType } from '@/lib/weather/types';

interface WindForecastProps {
  data: WindForecastType;
  className?: string;
  hours?: number;
}

export function WindForecast({ data, className, hours = 24 }: WindForecastProps) {
  const forecastData = useMemo(() => {
    const now = new Date();
    const startIndex = data.time.findIndex((t) => new Date(t) >= now);
    const endIndex = startIndex + hours;

    return {
      time: data.time.slice(startIndex, endIndex),
      windSpeed: data.windSpeed.slice(startIndex, endIndex),
      windGust: data.windGust.slice(startIndex, endIndex),
      windDirection: data.windDirection.slice(startIndex, endIndex),
      temperature: data.temperature.slice(startIndex, endIndex),
    };
  }, [data, hours]);

  const maxWind = Math.max(...forecastData.windSpeed, ...forecastData.windGust);

  const getBarHeight = (value: number) => {
    return Math.max((value / maxWind) * 100, 5);
  };

  const getWindColor = (speed: number, gust: number) => {
    const quality = getWindQuality(speed, gust);
    const colors = {
      ideal: 'bg-green-500',
      good: 'bg-emerald-400',
      marginal: 'bg-yellow-500',
      'too-light': 'bg-blue-300',
      'too-strong': 'bg-red-500',
    };
    return colors[quality.level];
  };

  const formatHour = (timeString: string) => {
    const date = new Date(timeString);
    return date.toLocaleTimeString('en-US', { hour: 'numeric', hour12: true });
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="border-b border-sand-200 bg-sand-50 p-4">
        <h3 className="font-semibold text-ocean-800">Wind Forecast</h3>
        <p className="text-sm text-driftwood-400">Next {hours} hours</p>
      </div>

      <div className="overflow-x-auto">
        <div className="flex min-w-max p-4">
          {forecastData.time.map((time, index) => {
            const windSpeed = forecastData.windSpeed[index];
            const windGust = forecastData.windGust[index];
            const direction = degreesToDirection(forecastData.windDirection[index]);

            return (
              <div
                key={time}
                className="flex w-12 flex-col items-center gap-1 text-center"
              >
                <span className="text-xs text-driftwood-400">{formatHour(time)}</span>
                <div className="relative flex h-24 w-full items-end justify-center gap-0.5">
                  <div
                    className={cn('w-3 rounded-t', getWindColor(windSpeed, windGust))}
                    style={{ height: `${getBarHeight(windSpeed)}%` }}
                    title={`Wind: ${Math.round(windSpeed)} kn`}
                  />
                  <div
                    className="w-2 rounded-t bg-driftwood-300"
                    style={{ height: `${getBarHeight(windGust)}%` }}
                    title={`Gust: ${Math.round(windGust)} kn`}
                  />
                </div>
                <span className="text-xs font-medium text-ocean-700">
                  {Math.round(windSpeed)}
                </span>
                <span className="text-[10px] text-driftwood-400">{direction}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex items-center justify-center gap-6 border-t border-sand-200 bg-sand-50 px-4 py-3 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-green-500" />
          <span className="text-driftwood-500">Ideal</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-yellow-500" />
          <span className="text-driftwood-500">Gusty</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded bg-driftwood-300" />
          <span className="text-driftwood-500">Gusts</span>
        </div>
      </div>
    </Card>
  );
}
