import { getTarifaNews, formatNewsDate } from '@/lib/rss/tarifa-news';
import { Card, CardContent } from '@/components/ui/card';
import { Newspaper, ExternalLink } from 'lucide-react';

interface LocalNewsProps {
  title?: string;
  subtitle?: string;
  locale?: string;
}

export async function LocalNews({
  title = 'Local News',
  subtitle = 'Latest from Tarifa',
  locale = 'en',
}: LocalNewsProps) {
  const news = await getTarifaNews(4);

  if (news.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-sand-50 py-16"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 60'%3E%3Cpath fill='%231E88E5' fill-opacity='0.04' d='M0,30 Q60,20 120,30 Q180,40 240,30 Q300,20 360,30 Q420,40 480,30 Q540,20 600,30 Q660,40 720,30 Q780,20 840,30 Q900,40 960,30 Q1020,20 1080,30 Q1140,40 1200,30 Q1260,20 1320,30 Q1380,40 1440,30 V60 H0 Z'/%3E%3C/svg%3E")`,
        backgroundRepeat: 'repeat-y',
        backgroundSize: '100% 60px',
      }}
    >
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <Newspaper className="mx-auto mb-3 h-8 w-8 text-ocean-500" />
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {news.map((item) => (
            <a
              key={item.link}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className="group"
            >
              <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-beach">
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-xs text-driftwood-400">
                        {formatNewsDate(item.pubDate, locale)}
                      </p>
                      <h3 className="mt-1 font-semibold text-ocean-800 transition-colors group-hover:text-ocean-600 line-clamp-2">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-sm text-driftwood-500 line-clamp-2">
                        {item.description}
                      </p>
                    </div>
                    <ExternalLink className="mt-1 h-4 w-4 shrink-0 text-driftwood-300 transition-colors group-hover:text-ocean-500" />
                  </div>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        <div className="mt-6 text-center">
          <a
            href="https://ciudaddetarifaalminuto.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-ocean-600 hover:text-ocean-700 hover:underline"
          >
            ciudaddetarifaalminuto.com
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
