'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { LoadingSpinner } from '@/components/common/LoadingSpinner';
import { ErrorDisplay } from '@/components/common/ErrorBoundary';
import { SearchBar } from '@/components/shop/SearchBar';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { Button } from '@/components/ui/button';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { getStoreUrl } from '@/lib/shopify/mcp-client';
import type { MCPSearchResult } from '@/lib/shopify/types';

export default function ShopPage() {
  const t = useTranslations('Shop');
  const [searchResult, setSearchResult] = useState<MCPSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [hasSearched, setHasSearched] = useState(false);

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'men', label: t('categories.men') },
    { id: 'women', label: t('categories.women') },
    { id: 'accessories', label: t('categories.accessories') },
  ];

  const handleSearch = useCallback(
    async (query: string) => {
      if (!query) {
        setSearchResult(null);
        setHasSearched(false);
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

        const data = await response.json();
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
        setSearchResult(null);
        setHasSearched(false);
      }
    },
    [handleSearch]
  );

  const storeUrl = getStoreUrl();

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
            <div className="flex items-center justify-center py-16">
              <LoadingSpinner size="lg" text="Searching products..." />
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
          {!loading && !error && hasSearched && searchResult?.content && (
            <div className="rounded-lg border border-sand-200 bg-sand-50 p-6">
              <div className="prose prose-sm max-w-none text-driftwood-600">
                {searchResult.content.map((item, idx) => (
                  <p key={idx} className="whitespace-pre-wrap">
                    {item.text}
                  </p>
                ))}
              </div>
            </div>
          )}

          {/* No results */}
          {!loading && !error && hasSearched && !searchResult?.content?.length && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="mb-4 h-12 w-12 text-sand-300" />
              <p className="text-driftwood-500">{t('noProducts')}</p>
            </div>
          )}

          {/* Default: link to store */}
          {!hasSearched && !loading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="mb-4 h-16 w-16 text-ocean-300" />
              <h3 className="mb-2 text-xl font-semibold text-ocean-800">
                Tarifa Air Force Shop
              </h3>
              <p className="mb-6 max-w-md text-driftwood-500">
                Browse the full collection of beach lifestyle fashion and accessories.
                Search above or visit the store directly.
              </p>
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
