'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { PartnerCard } from '@/components/partners/PartnerCard';
import { PartnerGrid } from '@/components/partners/PartnerGrid';
import { TarifaSkyline } from '@/components/illustrations/TarifaSkyline';
import { CoffeeCup } from '@/components/illustrations/BeachIcons';
import { getFeaturedPartners } from '@/data/partners';

interface PartnerSpotlightProps {
  title?: string;
  subtitle?: string;
}

export function PartnerSpotlight({
  title = 'Local Partners',
  subtitle = 'Trusted businesses recommended by expats',
}: PartnerSpotlightProps) {
  const partners = getFeaturedPartners(4);

  return (
    <section className="bg-sand-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          {/* Coffee cup accent */}
          <div className="mb-3 flex justify-center">
            <CoffeeCup className="h-10 w-10 opacity-50" />
          </div>
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        <PartnerGrid columns={2}>
          {partners.map((partner) => (
            <PartnerCard
              key={partner.slug}
              {...partner}
            />
          ))}
        </PartnerGrid>

        <div className="mt-8 text-center">
          <Button asChild variant="outline" className="border-ocean-300 text-ocean-600 hover:bg-ocean-50">
            <Link href="/directory">View all partners</Link>
          </Button>
        </div>

        {/* Tarifa skyline decoration */}
        <div className="mt-12 opacity-30">
          <TarifaSkyline />
        </div>
      </div>
    </section>
  );
}
