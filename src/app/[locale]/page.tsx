import { useTranslations } from 'next-intl';
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { HeroCarousel } from '@/components/home/HeroCarousel';
import { QuickLinks } from '@/components/home/QuickLinks';
import { ConditionsWidget } from '@/components/home/ConditionsWidget';
import { ShopPreview } from '@/components/home/ShopPreview';
import { PartnerSpotlight } from '@/components/home/PartnerSpotlight';
import { LocalNews } from '@/components/home/LocalNews';
import { WaveDivider } from '@/components/common/WaveDivider';
import { DecorativeBlobs } from './DecorativeBlobs';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('Home.news');

  return (
    <>
      <HeroSection />
      <QuickLinksSection />
      <div className="relative">
        <DecorativeBlobs position="top" />
        <ConditionsSection />
      </div>
      <WaveDivider color="white" />
      <ShopSection />
      <div className="relative">
        <DecorativeBlobs position="middle" />
        <WaveDivider color="sand" flip />
      </div>
      <PartnersSection />
      <LocalNews
        title={t('title')}
        subtitle={t('subtitle')}
        locale={locale}
      />
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
