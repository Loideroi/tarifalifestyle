'use client';

import { useState, useCallback, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { LoadingCard } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorBoundary';
import { SearchBar } from '@/components/shop/SearchBar';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { ProductCard } from '@/components/shop/ProductCard';
import { ProductGrid } from '@/components/shop/ProductGrid';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { getStoreUrl, filterDisplayTags } from '@/lib/shopify/mcp-client';
import type { MCPParsedResponse } from '@/lib/shopify/types';

function extractHandle(url: string): string {
  const match = url.match(/\/products\/(.+?)(?:\?|$)/);
  return match?.[1] || '';
}

export default function ShopPage() {
  const t = useTranslations('Shop');
  const [searchResult, setSearchResult] = useState<MCPParsedResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'men', label: t('categories.men') },
    { id: 'women', label: t('categories.women') },
    { id: 'accessories', label: t('categories.accessories') },
  ];

  // Load default products on mount
  useEffect(() => {
    async function loadDefaults() {
      try {
        const response = await fetch('/api/shopify/products?action=featured');
        if (!response.ok) throw new Error('Failed to fetch');
        const data: MCPParsedResponse = await response.json();
        setSearchResult(data);
      } catch {
        // Silently fail
      } finally {
        setLoading(false);
      }
    }
    loadDefaults();
  }, []);

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query) {
        // Reset to default products
        setLoading(true);
        setHasSearched(false);
        try {
          const response = await fetch('/api/shopify/products?action=featured');
          if (!response.ok) throw new Error('Failed to fetch');
          const data: MCPParsedResponse = await response.json();
          setSearchResult(data);
        } catch {
          setSearchResult(null);
        } finally {
          setLoading(false);
        }
        return;
      }

      setLoading(true);
      setError(null);
      setHasSearched(true);

      try {
        const response = await fetch('/api/shopify/products', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query }),
        });

        if (!response.ok) throw new Error('Search failed');

        const data: MCPParsedResponse = await response.json();
        setSearchResult(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search failed');
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const handleCategoryChange = useCallback(
    (categoryId: string) => {
      setActiveCategory(categoryId);
      if (categoryId !== 'all') {
        handleSearch(categoryId);
      } else {
        handleSearch('');
      }
    },
    [handleSearch]
  );

  const storeUrl = getStoreUrl();
  const products = searchResult?.products ?? [];
  const hasProducts = products.length > 0;

  return (
    <>
      <PageHeader
        title={t('title')}
        subtitle={t('subtitle')}
        background="gradient"
        breadcrumbs={[{ label: t('title') }]}
      />

      <Section padding="md">
        <Container>
          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            <SearchBar
              onSearch={handleSearch}
              placeholder={`${t('title')}...`}
            />
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={handleCategoryChange}
            />
          </div>

          {/* Loading State */}
          {loading && (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 md:gap-6">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <LoadingCard key={i} className="aspect-square" />
              ))}
            </div>
          )}

          {/* Error State */}
          {error && (
            <ErrorDisplay
              title="Failed to load products"
              message={error}
              onRetry={() => handleSearch(activeCategory !== 'all' ? activeCategory : '')}
            />
          )}

          {/* Results */}
          {!loading && !error && hasProducts && (
            <ProductGrid columns={4}>
              {products.map((product) => {
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
          )}

          {/* No results (only after an explicit search) */}
          {!loading && !error && hasSearched && !hasProducts && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-sand-300" />
              <p className="text-driftwood-500">{t('noProducts')}</p>
            </div>
          )}

          {/* Store link */}
          {!loading && (
            <div className="mt-10 text-center">
              <Button
                asChild
                size="lg"
                className="gap-2 bg-sunset-400 hover:bg-sunset-500"
              >
                <a href={storeUrl} target="_blank" rel="noopener noreferrer">
                  <ShoppingBag className="h-5 w-5" />
                  {t('viewOnStore')}
                  <ExternalLink className="h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
