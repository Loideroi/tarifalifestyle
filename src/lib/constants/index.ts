// Site configuration
export const SITE_CONFIG = {
  name: 'Tarifa Lifestyle',
  domain: 'tarifalifestyle.com',
  description: 'Your guide to expat life in Tarifa, Spain',
  url: process.env.NEXT_PUBLIC_BASE_URL || 'https://tarifalifestyle.com',
} as const;

// Tarifa location
export const TARIFA_LOCATION = {
  lat: 36.014,
  lon: -5.604,
  timezone: 'Europe/Madrid',
} as const;

// Shopify configuration
export const SHOPIFY_CONFIG = {
  storeDomain: 'tarifairforce.com',
  mcpEndpoint: 'https://tarifairforce.com/api/mcp',
  utmSource: 'tarifalifestyle',
} as const;

// Wind spots
export const WIND_SPOTS = {
  losLances: {
    id: 458886,
    name: 'Los Lances',
    lat: 36.0089,
    lon: -5.6056,
  },
  valdevaqueros: {
    id: 541946,
    name: 'Valdevaqueros',
    lat: 36.0667,
    lon: -5.6833,
  },
  puntaPaloma: {
    id: 13586,
    name: 'Punta Paloma',
    lat: 36.0591,
    lon: -5.6964,
  },
} as const;

// Partner categories
export const PARTNER_CATEGORIES = [
  'watersports',
  'coworking',
  'education',
  'food',
  'services',
  'accommodation',
] as const;

// Social links
export const SOCIAL_LINKS = {
  instagram: 'https://instagram.com/tarifalifestyle',
  facebook: 'https://facebook.com/tarifalifestyle',
} as const;

// Emergency numbers
export const EMERGENCY_NUMBERS = {
  general: '112',
  police: '091',
  localPolice: '092',
  fire: '080',
  ambulance: '061',
} as const;
