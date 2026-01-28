'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingCard } from '@/components/common/LoadingSpinner';
import { getStoreUrl } from '@/lib/shopify/mcp-client';
import type { MCPSearchResult } from '@/lib/shopify/types';

interface ShopPreviewProps {
  title?: string;
  subtitle?: string;
  viewStoreLabel?: string;
}

export function ShopPreview({
  title = 'Shop the Look',
  subtitle = 'Beach lifestyle essentials from Tarifa Air Force',
  viewStoreLabel = 'Visit Store',
}: ShopPreviewProps) {
  const [data, setData] = useState<MCPSearchResult | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/shopify/products?action=featured');
        if (!response.ok) throw new Error('Failed to fetch');
        const result = await response.json();
        setData(result);
      } catch {
        // Silently fail - show placeholder cards
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  const storeUrl = getStoreUrl();

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i} className="aspect-square" />
            ))}
          </div>
        ) : data?.content ? (
          <div className="rounded-lg border border-sand-200 bg-sand-50 p-6">
            <div className="prose prose-sm max-w-none text-driftwood-600">
              {data.content.map((item, idx) => (
                <p key={idx} className="whitespace-pre-wrap">
                  {item.text}
                </p>
              ))}
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Card key={i} className="group overflow-hidden transition-all hover:shadow-beach">
                <div className="aspect-square bg-gradient-to-br from-sand-100 to-sand-200 flex items-center justify-center">
                  <ShoppingBag className="h-12 w-12 text-sand-300 transition-transform group-hover:scale-110" />
                </div>
                <CardContent className="p-4">
                  <div className="h-4 w-3/4 rounded bg-sand-200" />
                  <div className="mt-2 h-4 w-1/2 rounded bg-sand-200" />
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        <div className="mt-8 text-center">
          <Button
            asChild
            className="gap-2 bg-sunset-400 hover:bg-sunset-500"
          >
            <a href={storeUrl} target="_blank" rel="noopener noreferrer">
              <ShoppingBag className="h-5 w-5" />
              {viewStoreLabel}
              <ExternalLink className="h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
