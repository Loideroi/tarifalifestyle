'use client';

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ContactButtons } from './ContactButtons';
import { MapEmbed } from './MapEmbed';
import { ArrowLeft, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { PartnerData } from '@/data/partners';

const categoryColors: Record<string, string> = {
  watersports: 'bg-ocean-100 text-ocean-700',
  coworking: 'bg-purple-100 text-purple-700',
  education: 'bg-green-100 text-green-700',
  food: 'bg-sunset-100 text-sunset-600',
  services: 'bg-sand-200 text-driftwood-500',
  accommodation: 'bg-amber-100 text-amber-700',
};

interface PartnerDetailContentProps {
  partner: PartnerData;
}

export function PartnerDetailContent({ partner }: PartnerDetailContentProps) {
  const t = useTranslations('Directory');

  return (
    <div className="space-y-8">
      {/* Hero image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-sand-100">
        <Image
          src={partner.heroImage}
          alt={partner.name}
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Two-column layout */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left column - Description */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex flex-wrap items-center gap-2">
            <Badge
              variant="secondary"
              className={
                categoryColors[partner.category] ||
                'bg-sand-100 text-driftwood-500'
              }
            >
              {t(`categories.${partner.category}`)}
            </Badge>
            {partner.featured && (
              <Badge
                variant="secondary"
                className="bg-ocean-100 text-ocean-700"
              >
                Featured
              </Badge>
            )}
            {partner.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <div>
            <h2 className="mb-4 font-display text-xl font-semibold text-ocean-800">
              {t('detail.about')}
            </h2>
            <p className="text-driftwood-600 leading-relaxed">
              {partner.longDescription}
            </p>
          </div>
        </div>

        {/* Right column - Contact sidebar */}
        <div className="space-y-6">
          <Card>
            <CardContent className="p-5 space-y-4">
              <h3 className="font-semibold text-ocean-800">
                {t('detail.contact')}
              </h3>
              <ContactButtons
                phone={partner.phone}
                email={partner.email}
                website={partner.website}
                whatsapp={partner.whatsapp}
                address={partner.address}
                layout="column"
              />
              {partner.instagram && (
                <Button
                  asChild
                  variant="outline"
                  size="sm"
                  className="w-full gap-2 border-pink-300 text-pink-600 hover:bg-pink-50"
                >
                  <a
                    href={`https://instagram.com/${partner.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Instagram className="h-4 w-4" />
                    @{partner.instagram}
                  </a>
                </Button>
              )}
            </CardContent>
          </Card>

          {/* Map */}
          {partner.address && (
            <div>
              <h3 className="mb-3 font-semibold text-ocean-800">
                {t('detail.location')}
              </h3>
              <MapEmbed
                address={partner.address}
                name={partner.name}
                height={250}
              />
            </div>
          )}
        </div>
      </div>

      {/* Back link */}
      <div className="pt-4 border-t border-sand-200">
        <Link
          href="/directory"
          className="inline-flex items-center gap-2 text-ocean-600 transition-colors hover:text-ocean-800"
        >
          <ArrowLeft className="h-4 w-4" />
          {t('detail.backToDirectory')}
        </Link>
      </div>
    </div>
  );
}
