'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ExternalLink, ShoppingBag } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { getStoreProductUrl } from '@/lib/shopify/mcp-client';

interface ProductCardProps {
  title: string;
  handle: string;
  price: string;
  currency?: string;
  imageUrl?: string;
  imageAlt?: string;
  vendor?: string;
  tags?: string[];
  available?: boolean;
  className?: string;
}

export function ProductCard({
  title,
  handle,
  price,
  currency = 'EUR',
  imageUrl,
  imageAlt,
  vendor,
  tags = [],
  available = true,
  className,
}: ProductCardProps) {
  const productUrl = getStoreProductUrl(handle);

  const formatPrice = (amount: string, curr: string) => {
    return new Intl.NumberFormat('en-EU', {
      style: 'currency',
      currency: curr,
    }).format(parseFloat(amount));
  };

  return (
    <Card
      className={cn(
        'group overflow-hidden transition-all duration-300 hover:shadow-beach-lg',
        !available && 'opacity-60',
        className
      )}
    >
      <div className="relative aspect-square overflow-hidden bg-sand-100">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageAlt || title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <ShoppingBag className="h-12 w-12 text-sand-300" />
          </div>
        )}
        {!available && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/40">
            <Badge variant="secondary" className="text-sm">
              Sold Out
            </Badge>
          </div>
        )}
        {tags.length > 0 && (
          <div className="absolute left-2 top-2 flex flex-wrap gap-1">
            {tags.slice(0, 2).map((tag) => (
              <Badge
                key={tag}
                variant="secondary"
                className="bg-white/90 text-xs backdrop-blur-sm"
              >
                {tag}
              </Badge>
            ))}
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {vendor && (
          <p className="mb-1 text-xs uppercase tracking-wide text-driftwood-400">
            {vendor}
          </p>
        )}
        <h3 className="line-clamp-2 font-medium text-ocean-800">{title}</h3>
        <p className="mt-2 text-lg font-semibold text-ocean-600">
          {formatPrice(price, currency)}
        </p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          asChild
          className="w-full gap-2 bg-ocean-600 hover:bg-ocean-700"
          disabled={!available}
        >
          <a href={productUrl} target="_blank" rel="noopener noreferrer">
            Shop Now
            <ExternalLink className="h-4 w-4" />
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
}
