'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorBoundary';
import { CurrentConditions } from '@/components/weather/CurrentConditions';
import { WindForecast } from '@/components/weather/WindForecast';
import { WindguruEmbed, WINDGURU_SPOTS } from '@/components/weather/WindguruEmbed';
import { BeachCamEmbed } from '@/components/weather/BeachCamEmbed';
import { SpotSelector } from '@/components/weather/SpotSelector';
import { UVIndexBar } from '@/components/weather/UVIndex';
import type { WeatherData } from '@/lib/weather/types';

type SpotKey = keyof typeof WINDGURU_SPOTS;

export default function ConditionsPage() {
  const t = useTranslations('Conditions');
  const [selectedSpot, setSelectedSpot] = useState<string>('losLances');
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeather() {
      try {
        setLoading(true);
        const response = await fetch('/api/weather?type=full');
        if (!response.ok) throw new Error('Failed to fetch weather');
        const data = await response.json();
        setWeatherData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load');
      } finally {
        setLoading(false);
      }
    }
    fetchWeather();
  }, []);

  // Find current UV from hourly data
  const currentUV = (() => {
    if (!weatherData?.hourly) return 0;
    const now = new Date();
    const idx = weatherData.hourly.time.findIndex((t) => new Date(t) >= now);
    return idx >= 0 ? weatherData.hourly.uvIndex[idx] : 0;
  })();

  return (
    <>
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        background="gradient"
        breadcrumbs={[{ label: t('title') }]}
      />

      <Section padding="md">
        <Container>
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-display text-xl font-bold text-ocean-800">
              {t('spots.' + selectedSpot)}
            </h2>
            <SpotSelector
              value={selectedSpot}
              onValueChange={setSelectedSpot}
            />
          </div>

          {loading && (
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner size="lg" text="Loading conditions..." />
            </div>
          )}

          {error && (
            <ErrorDisplay
              title="Weather data unavailable"
              message={error}
              onRetry={() => window.location.reload()}
            />
          )}

          {weatherData && !loading && (
            <div className="space-y-8">
              {/* Current Conditions */}
              <CurrentConditions data={weatherData.current} />

              {/* UV Index */}
              <UVIndexBar value={currentUV} />

              {/* Hourly Wind Forecast */}
              <WindForecast data={weatherData.hourly} hours={48} />

              {/* Windguru Widget */}
              <WindguruEmbed
                spotKey={selectedSpot as SpotKey}
              />

              {/* Beach Cam */}
              <div>
                <h2 className="mb-4 font-display text-xl font-bold text-ocean-800">
                  {t('beachCam')}
                </h2>
                <BeachCamEmbed camKey="tarifa" />
              </div>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
