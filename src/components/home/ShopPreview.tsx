'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingBag, ExternalLink } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { LoadingCard } from '@/components/common/LoadingSpinner';
import { FloatingIllustration } from '@/components/common/FloatingIllustration';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { Sunglasses, BeachUmbrella } from '@/components/illustrations/BeachIcons';
import { getStoreUrl, filterDisplayTags } from '@/lib/shopify/mcp-client';
import type { MCPParsedResponse } from '@/lib/shopify/types';

function extractHandle(url: string): string {
  const match = url.match(/\/products\/(.+?)(?:\?|$)/);
  return match?.[1] || '';
}

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
  const [data, setData] = useState<MCPParsedResponse | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch('/api/shopify/products?action=featured');
        if (!response.ok) throw new Error('Failed to fetch');
        const result: MCPParsedResponse = await response.json();
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
  const products = data?.products ?? [];
  const hasProducts = products.length > 0;

  return (
    <section className="relative overflow-hidden py-16">
      {/* Floating decorative accents */}
      <FloatingIllustration position="top-left" className="opacity-15 hidden md:block" animationDelay={0.5}>
        <Sunglasses className="h-20 w-20" />
      </FloatingIllustration>
      <FloatingIllustration position="bottom-right" className="opacity-15 hidden md:block" animationDelay={2}>
        <BeachUmbrella className="h-24 w-24" />
      </FloatingIllustration>

      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          {/* Wavy underline accent */}
          <svg className="mx-auto mt-2 h-2 w-24" viewBox="0 0 96 8" fill="none" aria-hidden="true">
            <path
              d="M0 4 Q12 0 24 4 Q36 8 48 4 Q60 0 72 4 Q84 8 96 4"
              stroke="var(--color-ocean-400)"
              strokeWidth="2"
              strokeLinecap="round"
              fill="none"
              strokeOpacity="0.5"
            />
          </svg>
          <p className="mt-3 text-muted-foreground">{subtitle}</p>
        </div>

        {loading ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <LoadingCard key={i} className="aspect-square" />
            ))}
          </div>
        ) : hasProducts ? (
          <ProductGrid columns={4}>
            {products.slice(0, 4).map((product) => {
              const handle = extractHandle(product.url);
              const hasAvailableVariant = product.variants.some((v) => v.available);
              return (
                <ProductCard
                  key={product.product_id}
                  title={product.title}
                  handle={handle}
                  price={product.price_range.min}
                  currency={product.price_range.currency}
                  imageUrl={product.image_url}
                  imageAlt={product.image_alt_text}
                  tags={filterDisplayTags(product.tags, product.product_type).slice(0, 2)}
                  available={hasAvailableVariant}
                />
              );
            })}
          </ProductGrid>
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
