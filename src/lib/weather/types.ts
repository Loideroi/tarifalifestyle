// Weather API Types

export interface OpenMeteoResponse {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units?: {
    time: string;
    interval: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    apparent_temperature: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
  };
  current?: {
    time: string;
    interval: number;
    temperature_2m: number;
    relative_humidity_2m: number;
    apparent_temperature: number;
    wind_speed_10m: number;
    wind_direction_10m: number;
    wind_gusts_10m: number;
  };
  hourly_units?: {
    time: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    wind_speed_10m: string;
    wind_direction_10m: string;
    wind_gusts_10m: string;
    uv_index: string;
  };
  hourly?: {
    time: string[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    wind_speed_10m: number[];
    wind_direction_10m: number[];
    wind_gusts_10m: number[];
    uv_index: number[];
  };
  daily_units?: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    sunrise: string;
    sunset: string;
    uv_index_max: string;
  };
  daily?: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    sunrise: string[];
    sunset: string[];
    uv_index_max: number[];
  };
}

export interface WindForecast {
  time: string[];
  temperature: number[];
  windSpeed: number[];
  windDirection: number[];
  windGust: number[];
  uvIndex: number[];
}

export interface CurrentConditions {
  time: string;
  temperature: number;
  humidity: number;
  apparentTemperature: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  uvIndex?: number;
}

export interface DailyForecast {
  date: string;
  tempMax: number;
  tempMin: number;
  sunrise: string;
  sunset: string;
  uvIndexMax: number;
}

export interface WeatherData {
  current: CurrentConditions;
  hourly: WindForecast;
  daily: DailyForecast[];
}

export type WindDirection =
  | 'N'
  | 'NNE'
  | 'NE'
  | 'ENE'
  | 'E'
  | 'ESE'
  | 'SE'
  | 'SSE'
  | 'S'
  | 'SSW'
  | 'SW'
  | 'WSW'
  | 'W'
  | 'WNW'
  | 'NW'
  | 'NNW';

export interface WindguruSpot {
  id: number;
  name: string;
  nameKey: string;
}

export const WINDGURU_SPOTS: WindguruSpot[] = [
  { id: 458886, name: 'Los Lances', nameKey: 'losLances' },
  { id: 541946, name: 'Valdevaqueros', nameKey: 'valdevaqueros' },
  { id: 13586, name: 'Punta Paloma', nameKey: 'puntaPaloma' },
];
