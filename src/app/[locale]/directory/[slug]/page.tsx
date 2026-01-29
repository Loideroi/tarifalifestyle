import { notFound } from 'next/navigation';
import { getTranslations } from 'next-intl/server';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { PartnerDetailContent } from '@/components/partners/PartnerDetailContent';
import { getPartnerBySlug, getAllSlugs } from '@/data/partners';
import { locales } from '@/i18n/routing';
import type { Metadata } from 'next';

interface PartnerDetailPageProps {
  params: Promise<{ locale: string; slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  const params: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      params.push({ locale, slug });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: PartnerDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    return { title: 'Not Found' };
  }

  return {
    title: `${partner.name} - Tarifa Lifestyle Directory`,
    description: partner.description,
    openGraph: {
      title: partner.name,
      description: partner.description,
      images: [partner.heroImage],
    },
  };
}

export default async function PartnerDetailPage({
  params,
}: PartnerDetailPageProps) {
  const { slug } = await params;
  const partner = getPartnerBySlug(slug);

  if (!partner) {
    notFound();
  }

  const t = await getTranslations('Directory');

  return (
    <>
      <PageHeader
        title={partner.name}
        subtitle={partner.description}
        background="gradient"
        breadcrumbs={[
          { label: t('title'), href: '/directory' },
          { label: partner.name },
        ]}
      />

      <Section padding="md">
        <Container>
          <PartnerDetailContent partner={partner} />
        </Container>
      </Section>
    </>
  );
}
