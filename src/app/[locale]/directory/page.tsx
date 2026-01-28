'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PartnerCard } from '@/components/partners/PartnerCard';
import { PartnerGrid } from '@/components/partners/PartnerGrid';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { Building2 } from 'lucide-react';

// Sample partner data - will be replaced with Sanity CMS data
const PARTNERS = [
  {
    name: 'Freeride Tarifa',
    slug: 'freeride-tarifa',
    description: 'Professional kitesurfing school with lessons for all levels. IKO certified instructors with 15+ years experience.',
    category: 'watersports',
    phone: '+34 956 68 12 34',
    website: 'https://freetarifa.com',
    address: 'Playa de Los Lances',
    featured: true,
  },
  {
    name: 'La Cocotera Coworking',
    slug: 'la-cocotera',
    description: 'Modern coworking space with stunning views of the Strait of Gibraltar. Fast WiFi, meeting rooms, and great coffee.',
    category: 'coworking',
    phone: '+34 956 68 56 78',
    website: 'https://lacocotera.com',
    address: 'Calle Sancho IV El Bravo',
    featured: true,
  },
  {
    name: 'Cafe Azul',
    slug: 'cafe-azul',
    description: 'Charming beachfront restaurant serving fresh seafood, tapas, and traditional Andalusian cuisine.',
    category: 'food',
    phone: '+34 956 68 43 21',
    address: 'Paseo Alameda',
    featured: false,
  },
  {
    name: 'Tarifa Language Academy',
    slug: 'tarifa-language-academy',
    description: 'Learn Spanish with immersive classes, cultural activities, and experienced native teachers.',
    category: 'education',
    phone: '+34 956 68 98 76',
    website: 'https://tarifaspanish.com',
    address: 'Calle Batalla del Salado',
    featured: true,
  },
  {
    name: 'Spin Out Kite School',
    slug: 'spin-out',
    description: 'IKO certified kite school offering courses from beginner to advanced. Private and group lessons available.',
    category: 'watersports',
    phone: '+34 660 12 34 56',
    website: 'https://spinout.es',
    address: 'Playa de Valdevaqueros',
    featured: false,
  },
  {
    name: 'The Tax Point',
    slug: 'the-tax-point',
    description: 'Tax advisory and business consulting for expats. NIE applications, company formation, and tax returns.',
    category: 'services',
    phone: '+34 956 68 11 22',
    email: 'info@thetaxpoint.com',
    address: 'Calle Santísima Trinidad',
    featured: false,
  },
  {
    name: 'Casa Tarifa Rentals',
    slug: 'casa-tarifa',
    description: 'Long-term and holiday rental properties throughout Tarifa. From beachfront apartments to old town houses.',
    category: 'accommodation',
    phone: '+34 956 68 77 88',
    website: 'https://casatarifa.com',
    address: 'Calle Nuestra Señora de la Luz',
    featured: true,
  },
  {
    name: 'Chiringuito El Pirata',
    slug: 'chiringuito-el-pirata',
    description: 'Beach bar on Los Lances with fresh fish, cold drinks, and the best sunset views in Tarifa.',
    category: 'food',
    phone: '+34 660 98 76 54',
    address: 'Playa de Los Lances',
    featured: false,
  },
];

export default function DirectoryPage() {
  const t = useTranslations('Directory');
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: t('categories.all') },
    { id: 'watersports', label: t('categories.watersports') },
    { id: 'coworking', label: t('categories.coworking') },
    { id: 'education', label: t('categories.education') },
    { id: 'food', label: t('categories.food') },
    { id: 'services', label: t('categories.services') },
    { id: 'accommodation', label: t('categories.accommodation') },
  ];

  const filteredPartners =
    activeCategory === 'all'
      ? PARTNERS
      : PARTNERS.filter((p) => p.category === activeCategory);

  // Sort: featured first, then alphabetical
  const sortedPartners = [...filteredPartners].sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return a.name.localeCompare(b.name);
  });

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
          <CategoryFilter
            categories={categories}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            className="mb-8"
          />

          {sortedPartners.length > 0 ? (
            <PartnerGrid columns={2}>
              {sortedPartners.map((partner) => (
                <PartnerCard key={partner.slug} {...partner} />
              ))}
            </PartnerGrid>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Building2 className="mb-4 h-12 w-12 text-sand-300" />
              <p className="text-driftwood-500">{t('noPartners')}</p>
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}
