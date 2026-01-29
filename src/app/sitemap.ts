import type { MetadataRoute } from 'next';
import { getAllSlugs } from '@/data/partners';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://tarifalifestyle.com';

const locales = ['en', 'es', 'nl', 'de', 'fr', 'it', 'pt'];

const pages = [
  { path: '', priority: 1.0, changeFrequency: 'daily' as const },
  { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
  { path: '/conditions', priority: 0.9, changeFrequency: 'hourly' as const },
  { path: '/shop', priority: 0.8, changeFrequency: 'daily' as const },
  { path: '/directory', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/guides', priority: 0.7, changeFrequency: 'weekly' as const },
  { path: '/lifestyle', priority: 0.6, changeFrequency: 'weekly' as const },
  { path: '/community', priority: 0.6, changeFrequency: 'weekly' as const },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const page of pages) {
    for (const locale of locales) {
      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        alternates[altLocale] = `${BASE_URL}/${altLocale}${page.path}`;
      }

      entries.push({
        url: `${BASE_URL}/${locale}${page.path}`,
        lastModified: new Date(),
        changeFrequency: page.changeFrequency,
        priority: page.priority,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  // Partner detail pages
  const partnerSlugs = getAllSlugs();
  for (const slug of partnerSlugs) {
    for (const locale of locales) {
      const alternates: Record<string, string> = {};
      for (const altLocale of locales) {
        alternates[altLocale] = `${BASE_URL}/${altLocale}/directory/${slug}`;
      }

      entries.push({
        url: `${BASE_URL}/${locale}/directory/${slug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
        alternates: {
          languages: alternates,
        },
      });
    }
  }

  return entries;
}
