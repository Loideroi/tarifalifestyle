import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { QuickLinks } from '@/components/home/QuickLinks';
import { ConditionsWidget } from '@/components/home/ConditionsWidget';
import { ShopPreview } from '@/components/home/ShopPreview';
import { PartnerSpotlight } from '@/components/home/PartnerSpotlight';
import { WaveDivider } from '@/components/common/WaveDivider';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <QuickLinksSection />
      <ConditionsSection />
      <WaveDivider color="white" />
      <ShopSection />
      <WaveDivider color="sand" flip />
      <PartnersSection />
    </>
  );
}

function HeroSection() {
  const t = useTranslations('Home.hero');

  return (
    <HeroCarousel
      heroTitle={t('title')}
      heroSubtitle={t('subtitle')}
      heroCta={t('cta')}
    />
  );
}

function QuickLinksSection() {
  const t = useTranslations('Home.quickLinks');

  return (
    <QuickLinks
      title={t('title')}
      movingLabel={t('moving')}
      healthcareLabel={t('healthcare')}
      schoolsLabel={t('schools')}
      coworkingLabel={t('coworking')}
    />
  );
}

function ConditionsSection() {
  const t = useTranslations('Home.conditions');

  return (
    <ConditionsWidget
      title={t('title')}
      viewForecastLabel={t('viewForecast')}
      windLabel={t('wind')}
      temperatureLabel={t('temperature')}
      uvIndexLabel={t('uvIndex')}
    />
  );
}

function ShopSection() {
  const t = useTranslations('Home.shop');

  return (
    <ShopPreview
      title={t('title')}
      subtitle={t('subtitle')}
      viewStoreLabel={t('viewStore')}
    />
  );
}

function PartnersSection() {
  const t = useTranslations('Home.partners');

  return (
    <PartnerSpotlight
      title={t('title')}
      subtitle={t('subtitle')}
    />
  );
}

