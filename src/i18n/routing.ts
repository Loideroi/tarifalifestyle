import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'es', 'nl', 'de', 'fr', 'it', 'pt'] as const;
export const defaultLocale = 'en' as const;

// MVP languages
export const mvpLocales = ['en', 'es', 'nl'] as const;

export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: 'always',
});

// Locale display names
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  nl: 'Nederlands',
  de: 'Deutsch',
  fr: 'Français',
  it: 'Italiano',
  pt: 'Português',
};

// Locale flags (emoji)
export const localeFlags: Record<Locale, string> = {
  en: '🇬🇧',
  es: '🇪🇸',
  nl: '🇳🇱',
  de: '🇩🇪',
  fr: '🇫🇷',
  it: '🇮🇹',
  pt: '🇵🇹',
};
