'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { MapPin, Globe, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';

interface PartnerCardProps {
  name: string;
  slug: string;
  description: string;
  category: string;
  logoUrl?: string;
  website?: string;
  phone?: string;
  address?: string;
  featured?: boolean;
  className?: string;
}

const categoryColors: Record<string, string> = {
  watersports: 'bg-ocean-100 text-ocean-700',
  coworking: 'bg-purple-100 text-purple-700',
  education: 'bg-green-100 text-green-700',
  food: 'bg-sunset-100 text-sunset-600',
  services: 'bg-sand-200 text-driftwood-500',
};

export function PartnerCard({
  name,
  slug,
  description,
  category,
  logoUrl,
  website,
  phone,
  address,
  featured = false,
  className,
}: PartnerCardProps) {
  return (
    <Link href={`/directory/${slug}`}>
      <Card
        className={cn(
          'group h-full overflow-hidden transition-all duration-300 hover:shadow-beach-lg',
          featured && 'ring-2 ring-ocean-400',
          className
        )}
      >
        <CardContent className="p-5">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-sand-100">
              {logoUrl ? (
                <Image
                  src={logoUrl}
                  alt={name}
                  width={56}
                  height={56}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-xl font-bold text-ocean-600">
                  {name.charAt(0)}
                </span>
              )}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-ocean-800 transition-colors group-hover:text-ocean-600">
                  {name}
                </h3>
                {featured && (
                  <Badge variant="secondary" className="bg-ocean-100 text-ocean-700 text-xs">
                    Featured
                  </Badge>
                )}
              </div>
              <Badge
                variant="secondary"
                className={cn(
                  'mt-1 text-xs',
                  categoryColors[category] || 'bg-sand-100 text-driftwood-500'
                )}
              >
                {category}
              </Badge>
              <p className="mt-2 line-clamp-2 text-sm text-driftwood-500">
                {description}
              </p>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap gap-3 text-sm text-driftwood-400">
            {address && (
              <span className="flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {address}
              </span>
            )}
            {website && (
              <span className="flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                Website
              </span>
            )}
            {phone && (
              <span className="flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" />
                {phone}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
