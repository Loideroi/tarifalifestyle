import { XMLParser } from 'fast-xml-parser';

const RSS_URL = 'https://ciudaddetarifaalminuto.com/feed/';

export interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

export async function getTarifaNews(limit = 5): Promise<NewsItem[]> {
  try {
    const response = await fetch(RSS_URL, {
      next: { revalidate: 1800 }, // 30 min cache
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const feed = parser.parse(xml);
    const items = feed?.rss?.channel?.item;

    if (!items || !Array.isArray(items)) {
      return [];
    }

    return items.slice(0, limit).map((item: Record<string, unknown>) => ({
      title: String(item.title || ''),
      link: String(item.link || ''),
      pubDate: String(item.pubDate || ''),
      description: String(item.description || '')
        .replace(/<[^>]*>/g, '')
        .slice(0, 200),
      image: item['media:content']
        ? String(
            (item['media:content'] as Record<string, unknown>)?.['@_url'] || ''
          )
        : undefined,
    }));
  } catch (error) {
    console.error('RSS fetch error:', error);
    return [];
  }
}

/**
 * Format a date string for display
 */
export function formatNewsDate(dateString: string, locale = 'en'): string {
  try {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  } catch {
    return dateString;
  }
}
