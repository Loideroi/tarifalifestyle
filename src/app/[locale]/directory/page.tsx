'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { FloatingIllustration } from '@/components/common/FloatingIllustration';
import { CoffeeCup } from '@/components/illustrations/BeachIcons';
import { TarifaSkyline } from '@/components/illustrations/TarifaSkyline';
import { PartnerCard } from '@/components/partners/PartnerCard';
import { PartnerGrid } from '@/components/partners/PartnerGrid';
import { CategoryFilter } from '@/components/shop/CategoryFilter';
import { Building2 } from 'lucide-react';
import { blobA } from '@/lib/constants/blob-paths';
import { PARTNERS } from '@/data/partners';

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

      <Section padding="md" className="relative overflow-hidden">
        {/* Background blob */}
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 md:h-96 md:w-96 opacity-[0.06]"
          viewBox="0 0 500 500"
        >
          <path d={blobA} fill="var(--color-sand-300)" />
        </svg>

        {/* Floating coffee cup */}
        <FloatingIllustration position="top-right" className="opacity-35 hidden md:block">
          <CoffeeCup className="h-20 w-20 md:h-28 md:w-28" />
        </FloatingIllustration>

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

      {/* Decorative skyline */}
      <div className="pointer-events-none w-full opacity-30" aria-hidden="true">
        <TarifaSkyline className="w-full" />
      </div>
    </>
  );
}
