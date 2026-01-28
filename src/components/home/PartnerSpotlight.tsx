'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { PartnerCard } from '@/components/partners/PartnerCard';
import { PartnerGrid } from '@/components/partners/PartnerGrid';

// Featured partners - promoted businesses
const SAMPLE_PARTNERS = [
  {
    name: 'TAF Coworking',
    slug: 'taf-coworking',
    description: 'The best coworking space in Tarifa. Fast WiFi, meeting rooms, and an outdoor terrace.',
    category: 'coworking',
    website: 'https://taf-coworking.com',
    featured: true,
  },
  {
    name: 'Explora Watersports',
    slug: 'explora-watersports',
    description: 'Surf, kite, and wing classes for all levels. The go-to school in Tarifa.',
    category: 'watersports',
    website: 'https://explorawatersportstarifa.com',
    featured: true,
  },
  {
    name: 'Tarifa Kite Repair',
    slug: 'tarifa-kite-repair',
    description: 'Expert kite and wing foil repair. Get your gear fixed fast.',
    category: 'watersports',
    website: 'https://tarifakiterepair.com',
    featured: true,
  },
  {
    name: 'Stoked Surf Bar',
    slug: 'stoked-surf-bar',
    description: 'Great vibes, cold drinks, and tasty food. The go-to spot after a session.',
    category: 'food',
    featured: true,
  },
];

interface PartnerSpotlightProps {
  title?: string;
  subtitle?: string;
}

export function PartnerSpotlight({
  title = 'Local Partners',
  subtitle = 'Trusted businesses recommended by expats',
}: PartnerSpotlightProps) {
  return (
    <section className="bg-sand-50 py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center">
          <h2 className="font-display text-2xl font-bold sm:text-3xl">
            {title}
          </h2>
          <p className="mt-2 text-muted-foreground">{subtitle}</p>
        </div>

        <PartnerGrid columns={2}>
          {SAMPLE_PARTNERS.map((partner) => (
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
      </div>
    </section>
  );
}
