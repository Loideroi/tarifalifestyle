import type {
  OpenMeteoResponse,
  WindForecast,
  CurrentConditions,
  DailyForecast,
  WeatherData,
  WindDirection,
} from './types';

// Tarifa, Spain coordinates
const TARIFA_LAT = 36.014;
const TARIFA_LON = -5.604;

const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

/**
 * Get hourly wind forecast for the next 7 days
 */
export async function getWindForecast(): Promise<WindForecast> {
  const params = new URLSearchParams({
    latitude: TARIFA_LAT.toString(),
    longitude: TARIFA_LON.toString(),
    hourly:
      'temperature_2m,relative_humidity_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index',
    wind_speed_unit: 'kn',
    timezone: 'Europe/Madrid',
    forecast_days: '7',
  });

  const response = await fetch(`${BASE_URL}?${params}`, {
    next: { revalidate: 1800 }, // 30 min cache
  });

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data: OpenMeteoResponse = await response.json();

  if (!data.hourly) {
    throw new Error('No hourly data in response');
  }

  return {
    time: data.hourly.time,
    temperature: data.hourly.temperature_2m,
    windSpeed: data.hourly.wind_speed_10m,
    windDirection: data.hourly.wind_direction_10m,
    windGust: data.hourly.wind_gusts_10m,
    uvIndex: data.hourly.uv_index,
  };
}

/**
 * Get current weather conditions
 */
export async function getCurrentConditions(): Promise<CurrentConditions> {
  const params = new URLSearchParams({
    latitude: TARIFA_LAT.toString(),
    longitude: TARIFA_LON.toString(),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
    wind_speed_unit: 'kn',
    timezone: 'Europe/Madrid',
  });

  const response = await fetch(`${BASE_URL}?${params}`, {
    next: { revalidate: 600 }, // 10 min cache for current conditions
  });

  if (!response.ok) {
    throw new Error('Failed to fetch current conditions');
  }

  const data: OpenMeteoResponse = await response.json();

  if (!data.current) {
    throw new Error('No current data in response');
  }

  return {
    time: data.current.time,
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    apparentTemperature: data.current.apparent_temperature,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    windGust: data.current.wind_gusts_10m,
  };
}

/**
 * Get daily forecast summary
 */
export async function getDailyForecast(): Promise<DailyForecast[]> {
  const params = new URLSearchParams({
    latitude: TARIFA_LAT.toString(),
    longitude: TARIFA_LON.toString(),
    daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max',
    timezone: 'Europe/Madrid',
    forecast_days: '7',
  });

  const response = await fetch(`${BASE_URL}?${params}`, {
    next: { revalidate: 3600 }, // 1 hour cache
  });

  if (!response.ok) {
    throw new Error('Failed to fetch daily forecast');
  }

  const data: OpenMeteoResponse = await response.json();

  if (!data.daily) {
    throw new Error('No daily data in response');
  }

  return data.daily.time.map((date, i) => ({
    date,
    tempMax: data.daily!.temperature_2m_max[i],
    tempMin: data.daily!.temperature_2m_min[i],
    sunrise: data.daily!.sunrise[i],
    sunset: data.daily!.sunset[i],
    uvIndexMax: data.daily!.uv_index_max[i],
  }));
}

/**
 * Get full weather data (current + hourly + daily)
 */
export async function getWeatherData(): Promise<WeatherData> {
  const params = new URLSearchParams({
    latitude: TARIFA_LAT.toString(),
    longitude: TARIFA_LON.toString(),
    current:
      'temperature_2m,relative_humidity_2m,apparent_temperature,wind_speed_10m,wind_direction_10m,wind_gusts_10m',
    hourly:
      'temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index',
    daily: 'temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max',
    wind_speed_unit: 'kn',
    timezone: 'Europe/Madrid',
    forecast_days: '7',
  });

  const response = await fetch(`${BASE_URL}?${params}`, {
    next: { revalidate: 1800 }, // 30 min cache
  });

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data: OpenMeteoResponse = await response.json();

  if (!data.current || !data.hourly || !data.daily) {
    throw new Error('Incomplete weather data in response');
  }

  const current: CurrentConditions = {
    time: data.current.time,
    temperature: data.current.temperature_2m,
    humidity: data.current.relative_humidity_2m,
    apparentTemperature: data.current.apparent_temperature,
    windSpeed: data.current.wind_speed_10m,
    windDirection: data.current.wind_direction_10m,
    windGust: data.current.wind_gusts_10m,
  };

  const hourly: WindForecast = {
    time: data.hourly.time,
    temperature: data.hourly.temperature_2m,
    windSpeed: data.hourly.wind_speed_10m,
    windDirection: data.hourly.wind_direction_10m,
    windGust: data.hourly.wind_gusts_10m,
    uvIndex: data.hourly.uv_index,
  };

  const daily: DailyForecast[] = data.daily.time.map((date, i) => ({
    date,
    tempMax: data.daily!.temperature_2m_max[i],
    tempMin: data.daily!.temperature_2m_min[i],
    sunrise: data.daily!.sunrise[i],
    sunset: data.daily!.sunset[i],
    uvIndexMax: data.daily!.uv_index_max[i],
  }));

  return { current, hourly, daily };
}

/**
 * Convert wind direction degrees to cardinal direction
 */
export function degreesToDirection(degrees: number): WindDirection {
  const directions: WindDirection[] = [
    'N',
    'NNE',
    'NE',
    'ENE',
    'E',
    'ESE',
    'SE',
    'SSE',
    'S',
    'SSW',
    'SW',
    'WSW',
    'W',
    'WNW',
    'NW',
    'NNW',
  ];
  const index = Math.round(degrees / 22.5) % 16;
  return directions[index];
}

/**
 * Get wind quality description for kitesurfing
 */
export function getWindQuality(
  speedKnots: number,
  gustKnots: number
): {
  level: 'ideal' | 'good' | 'marginal' | 'too-light' | 'too-strong';
  description: string;
} {
  const gustFactor = gustKnots / speedKnots;

  if (speedKnots < 12) {
    return { level: 'too-light', description: 'Too light for most kites' };
  }

  if (speedKnots > 35) {
    return { level: 'too-strong', description: 'Expert conditions only' };
  }

  if (gustFactor > 1.5) {
    return { level: 'marginal', description: 'Gusty conditions' };
  }

  if (speedKnots >= 15 && speedKnots <= 25 && gustFactor <= 1.3) {
    return { level: 'ideal', description: 'Perfect conditions' };
  }

  return { level: 'good', description: 'Good conditions' };
}

/**
 * Format wind speed with units
 */
export function formatWindSpeed(knots: number): string {
  return `${Math.round(knots)} kn`;
}

/**
 * Format temperature with units
 */
export function formatTemperature(celsius: number): string {
  return `${Math.round(celsius)}°C`;
}

/**
 * Get UV index level description
 */
export function getUVLevel(uvIndex: number): {
  level: 'low' | 'moderate' | 'high' | 'very-high' | 'extreme';
  description: string;
  color: string;
} {
  if (uvIndex < 3) {
    return { level: 'low', description: 'Low', color: 'green' };
  }
  if (uvIndex < 6) {
    return { level: 'moderate', description: 'Moderate', color: 'yellow' };
  }
  if (uvIndex < 8) {
    return { level: 'high', description: 'High', color: 'orange' };
  }
  if (uvIndex < 11) {
    return { level: 'very-high', description: 'Very High', color: 'red' };
  }
  return { level: 'extreme', description: 'Extreme', color: 'purple' };
}
