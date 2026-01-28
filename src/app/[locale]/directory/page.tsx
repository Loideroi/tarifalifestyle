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

// Partner data - promoted partners (featured) + local businesses
const PARTNERS = [
  // === Promoted partners (featured, no competition) ===
  {
    name: 'TAF Coworking',
    slug: 'taf-coworking',
    description: 'The best coworking space in Tarifa. Fixed and flexible desks, private offices, meeting rooms, high-speed WiFi, and an outdoor terrace with views.',
    category: 'coworking',
    phone: '+34 606 370 227',
    website: 'https://taf-coworking.com',
    address: 'Tarifa',
    featured: true,
  },
  {
    name: 'Tarifa Kite Repair',
    slug: 'tarifa-kite-repair',
    description: 'Expert kite and wing foil repair services. Valve, line, and bladder repair, plus equipment customization. Get your gear fixed fast.',
    category: 'watersports',
    phone: '+34 667 97 49 25',
    website: 'https://tarifakiterepair.com',
    address: 'Tarifa',
    featured: true,
  },
  {
    name: 'Explora Watersports',
    slug: 'explora-watersports',
    description: 'Surf, kite, and wing classes for all levels. Beginner packages, private lessons, and equipment rental available.',
    category: 'watersports',
    phone: '+34 635 559 631',
    website: 'https://explorawatersportstarifa.com',
    address: 'Tarifa',
    featured: true,
  },
  {
    name: 'Stoked Surf Bar',
    slug: 'stoked-surf-bar',
    description: 'Great vibes, cold drinks, and tasty food. Send Francis a WhatsApp and tell him to "GLOVO" for free deliveries. The go-to spot after a session.',
    category: 'food',
    address: 'Tarifa',
    featured: true,
  },
  {
    name: 'Surfr App',
    slug: 'surfr-app',
    description: 'The essential app for surfers and kitesurfers. Real-time conditions, spot guides, and community features. Download now.',
    category: 'watersports',
    website: 'https://www.thesurfr.app',
    featured: true,
  },
  {
    name: 'Tarifa Air Force',
    slug: 'tarifa-air-force',
    description: 'Beach lifestyle fashion and kite gear. Eleveight kites, custom boards, and the best brands for the Tarifa lifestyle.',
    category: 'watersports',
    website: 'https://tarifairforce.com',
    address: 'Tarifa',
    featured: true,
  },
  // === Local businesses ===
  {
    name: 'Espresso Bar Número C',
    slug: 'numero-c',
    description: 'Great coffee and a favourite meeting spot for expats. Perfect place to work, socialise, and feel at home in Tarifa.',
    category: 'food',
    address: 'Tarifa',
    featured: false,
  },
  {
    name: 'La Casa de la Luz',
    slug: 'la-casa-de-la-luz',
    description: 'International school in Tarifa for ages 3-12. Montessori/Wild-based philosophy with small class sizes and NEASC accreditation.',
    category: 'education',
    website: 'https://www.lacasadelaluztarifa.com',
    address: 'Tarifa',
    featured: false,
  },
  {
    name: 'Tarifa Day Care',
    slug: 'tarifa-day-care',
    description: 'Excellent and affordable day care in Tarifa. A safe and nurturing environment for your little ones.',
    category: 'education',
    address: 'Tarifa',
    featured: false,
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
    featured: false,
  },
  {
    name: 'The Tax Point',
    slug: 'the-tax-point',
    description: 'Tax advisory and business consulting for expats. NIE applications, company formation, and tax returns.',
    category: 'services',
    phone: '+34 956 68 11 22',
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
    featured: false,
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
