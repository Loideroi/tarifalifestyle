'use client';

import { Wind, Thermometer, Droplets, Navigation } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import {
  degreesToDirection,
  formatWindSpeed,
  formatTemperature,
  getWindQuality,
} from '@/lib/weather/open-meteo';
import type { CurrentConditions as CurrentConditionsType } from '@/lib/weather/types';

interface CurrentConditionsProps {
  data: CurrentConditionsType;
  className?: string;
}

export function CurrentConditions({ data, className }: CurrentConditionsProps) {
  const windDirection = degreesToDirection(data.windDirection);
  const windQuality = getWindQuality(data.windSpeed, data.windGust);

  const qualityColors = {
    ideal: 'bg-green-500',
    good: 'bg-emerald-400',
    marginal: 'bg-yellow-500',
    'too-light': 'bg-blue-400',
    'too-strong': 'bg-red-500',
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="bg-ocean-600 p-4 text-white">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold">Current Conditions</h3>
          <span
            className={cn(
              'rounded-full px-3 py-1 text-xs font-medium text-white',
              qualityColors[windQuality.level]
            )}
          >
            {windQuality.description}
          </span>
        </div>
        <p className="mt-1 text-sm text-white/70">Tarifa, Spain</p>
      </div>

      <div className="grid grid-cols-2 gap-4 p-4 md:grid-cols-4">
        <div className="flex items-center gap-3">
          <div className="rounded-full bg-ocean-100 p-2">
            <Wind className="h-5 w-5 text-ocean-600" />
          </div>
          <div>
            <p className="text-sm text-driftwood-400">Wind</p>
            <p className="font-semibold text-ocean-800">
              {formatWindSpeed(data.windSpeed)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-ocean-100 p-2">
            <Navigation
              className="h-5 w-5 text-ocean-600"
              style={{ transform: `rotate(${data.windDirection}deg)` }}
            />
          </div>
          <div>
            <p className="text-sm text-driftwood-400">Direction</p>
            <p className="font-semibold text-ocean-800">{windDirection}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-sunset-100 p-2">
            <Thermometer className="h-5 w-5 text-sunset-500" />
          </div>
          <div>
            <p className="text-sm text-driftwood-400">Temperature</p>
            <p className="font-semibold text-ocean-800">
              {formatTemperature(data.temperature)}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="rounded-full bg-blue-100 p-2">
            <Droplets className="h-5 w-5 text-blue-500" />
          </div>
          <div>
            <p className="text-sm text-driftwood-400">Humidity</p>
            <p className="font-semibold text-ocean-800">{data.humidity}%</p>
          </div>
        </div>
      </div>

      <div className="border-t border-sand-200 bg-sand-50 px-4 py-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-driftwood-400">
            Gusts up to {formatWindSpeed(data.windGust)}
          </span>
          <span className="text-driftwood-400">
            Feels like {formatTemperature(data.apparentTemperature)}
          </span>
        </div>
      </div>
    </Card>
  );
}
