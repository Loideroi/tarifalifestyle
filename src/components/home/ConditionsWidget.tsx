'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { Wind, Thermometer, Sun, Navigation } from 'lucide-react';
import { LoadingCard } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorBoundary';
import { FloatingIllustration } from '@/components/common/FloatingIllustration';
import { CoastlineStrip } from '@/components/illustrations/CoastlineStrip';
import { Surfboard } from '@/components/illustrations/BeachIcons';
import {
  degreesToDirection,
  formatWindSpeed,
  formatTemperature,
  getWindQuality,
  getUVLevel,
} from '@/lib/weather/open-meteo';
import type { WeatherData } from '@/lib/weather/types';

interface ConditionsWidgetProps {
  title?: string;
  viewForecastLabel?: string;
  windLabel?: string;
  temperatureLabel?: string;
  uvIndexLabel?: string;
}

export function ConditionsWidget({
  title = 'Current Conditions',
  viewForecastLabel = 'View full forecast',
  windLabel = 'Wind',
  temperatureLabel = 'Temperature',
  uvIndexLabel = 'UV Index',
}: ConditionsWidgetProps) {
  const [data, setData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        const response = await fetch('/api/weather?type=full');
        if (!response.ok) throw new Error('Failed to fetch weather');
        const weatherData = await response.json();
        setData(weatherData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load weather');
      } finally {
        setLoading(false);
      }
    }

    fetchWeather();
  }, []);

  if (loading) {
    return (
      <section className="relative bg-sand-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <LoadingCard key={i} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error || !data) {
    return (
      <section className="relative bg-sand-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <ErrorDisplay
            title="Weather data unavailable"
            message={error || 'Unable to load current conditions'}
            onRetry={() => window.location.reload()}
          />
        </div>
      </section>
    );
  }

  const { current, hourly } = data;
  const windDirection = degreesToDirection(current.windDirection);
  const windQuality = getWindQuality(current.windSpeed, current.windGust);

  // Find current UV from hourly data
  const now = new Date();
  const currentHourIndex = hourly.time.findIndex(
    (t) => new Date(t) >= now
  );
  const currentUV =
    currentHourIndex >= 0 ? hourly.uvIndex[currentHourIndex] : 0;
  const uvLevel = getUVLevel(currentUV);

  return (
    <section className="relative overflow-hidden bg-sand-100 py-16">
      {/* Floating surfboard accent */}
      <FloatingIllustration position="top-right" className="opacity-15 hidden md:block" animationDelay={1}>
        <Surfboard className="h-20 w-20" />
      </FloatingIllustration>

      <div className="container mx-auto px-4">
        <div className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <Button asChild variant="outline">
            <Link href="/conditions">{viewForecastLabel}</Link>
          </Button>
        </div>

        {/* Coastline illustration strip */}
        <div className="mb-8 -mx-4 opacity-60">
          <CoastlineStrip className="w-full h-auto" />
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Wind className="h-5 w-5 text-ocean-500" />
                {windLabel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-ocean-600">
                {formatWindSpeed(current.windSpeed)}
              </div>
              <div className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                <Navigation
                  className="h-3 w-3"
                  style={{ transform: `rotate(${current.windDirection}deg)` }}
                />
                {windDirection} - {windQuality.description}
              </div>
              <div className="mt-1 text-xs text-driftwood-400">
                Gusts: {formatWindSpeed(current.windGust)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Thermometer className="h-5 w-5 text-sunset-400" />
                {temperatureLabel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-sunset-500">
                {formatTemperature(current.temperature)}
              </div>
              <div className="text-sm text-muted-foreground">
                Feels like {formatTemperature(current.apparentTemperature)}
              </div>
              <div className="mt-1 text-xs text-driftwood-400">
                Humidity: {current.humidity}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sun className="h-5 w-5 text-palm-500" />
                {uvIndexLabel}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-palm-600">
                {Math.round(currentUV)}
              </div>
              <div className="text-sm text-muted-foreground">
                {uvLevel.description}
              </div>
              {currentUV >= 6 && (
                <div className="mt-1 text-xs text-sunset-500">
                  Use sunscreen!
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
