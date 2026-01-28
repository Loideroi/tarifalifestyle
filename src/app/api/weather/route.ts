import { NextRequest, NextResponse } from 'next/server';
import {
  getWeatherData,
  getWindForecast,
  getCurrentConditions,
  getDailyForecast,
} from '@/lib/weather/open-meteo';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const type = searchParams.get('type');

  try {
    switch (type) {
      case 'current':
        const current = await getCurrentConditions();
        return NextResponse.json(current);

      case 'hourly':
        const hourly = await getWindForecast();
        return NextResponse.json(hourly);

      case 'daily':
        const daily = await getDailyForecast();
        return NextResponse.json(daily);

      case 'full':
      default:
        const full = await getWeatherData();
        return NextResponse.json(full);
    }
  } catch (error) {
    console.error('Weather API error:', error);
    return NextResponse.json(
      {
        error: 'Failed to fetch weather data',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
