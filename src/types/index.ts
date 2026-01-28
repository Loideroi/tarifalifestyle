// Locale types
export type Locale = 'en' | 'es' | 'nl' | 'de' | 'fr' | 'it' | 'pt';

// Product types
export interface Product {
  id: string;
  title: string;
  description: string;
  handle: string;
  images: ProductImage[];
  variants: ProductVariant[];
  priceRange: {
    minPrice: Price;
    maxPrice: Price;
  };
  tags: string[];
}

export interface ProductImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ProductVariant {
  id: string;
  title: string;
  price: Price;
  availableForSale: boolean;
}

export interface Price {
  amount: string;
  currencyCode: string;
}

// Partner types
export interface Partner {
  id: string;
  name: string;
  slug: string;
  description: string;
  category: PartnerCategory;
  logo?: SanityImage;
  coverImage?: SanityImage;
  website?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  address?: string;
  location?: GeoLocation;
  featured: boolean;
}

export type PartnerCategory =
  | 'watersports'
  | 'coworking'
  | 'education'
  | 'food'
  | 'services'
  | 'accommodation';

export interface GeoLocation {
  lat: number;
  lng: number;
}

// Sanity types
export interface SanityImage {
  _type: 'image';
  asset: {
    _ref: string;
    _type: 'reference';
  };
  alt?: string;
}

// Weather types
export interface WindForecast {
  time: string[];
  temperature: number[];
  windSpeed: number[];
  windDirection: number[];
  windGust: number[];
  uvIndex: number[];
}

export interface CurrentConditions {
  temperature: number;
  windSpeed: number;
  windDirection: number;
  windGust: number;
  uvIndex: number;
  weatherCode: number;
}

// Guide types
export interface Guide {
  id: string;
  title: string;
  slug: string;
  description: string;
  category: GuideCategory;
  content: PortableTextBlock[];
  coverImage?: SanityImage;
  publishedAt: string;
  updatedAt: string;
}

export type GuideCategory =
  | 'moving'
  | 'healthcare'
  | 'education'
  | 'working'
  | 'lifestyle'
  | 'legal';

// Portable Text
export interface PortableTextBlock {
  _type: string;
  _key: string;
  // Additional fields depend on block type
  [key: string]: unknown;
}

// News types
export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

// Newsletter types
export interface NewsletterSubscription {
  email: string;
  locale?: Locale;
}

// API response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  success: boolean;
}
