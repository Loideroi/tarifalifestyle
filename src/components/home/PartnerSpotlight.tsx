'use client';

import { Button } from '@/components/ui/button';
import { Link } from '@/i18n/navigation';
import { PartnerCard } from '@/components/partners/PartnerCard';
import { PartnerGrid } from '@/components/partners/PartnerGrid';

// Sample partners data - will be replaced with Sanity data
const SAMPLE_PARTNERS = [
  {
    name: 'Freeride Tarifa',
    slug: 'freeride-tarifa',
    description: 'Professional kitesurfing school with lessons for all levels. IKO certified instructors.',
    category: 'watersports',
    featured: true,
  },
  {
    name: 'La Cocotera',
    slug: 'la-cocotera',
    description: 'Coworking space with stunning views of the Strait of Gibraltar. Fast WiFi and great coffee.',
    category: 'coworking',
    featured: true,
  },
  {
    name: 'Cafe Azul',
    slug: 'cafe-azul',
    description: 'Charming beachfront restaurant serving fresh seafood and traditional Spanish cuisine.',
    category: 'food',
    featured: true,
  },
  {
    name: 'Tarifa Language School',
    slug: 'tarifa-language-school',
    description: 'Learn Spanish in Tarifa with immersive classes and cultural activities.',
    category: 'education',
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
