import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { PageHeader } from '@/components/common/PageHeader';
import { Container } from '@/components/common/Container';
import { Section } from '@/components/common/Section';
import { FloatingIllustration } from '@/components/common/FloatingIllustration';
import { ShapedContainer } from '@/components/common/ShapedContainer';
import { WaveDivider } from '@/components/common/WaveDivider';
import { HouseWithPalm, Surfboard } from '@/components/illustrations/BeachIcons';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  MapPin,
  Sun,
  Wind,
  Users,
  Plane,
  DollarSign,
  ThumbsUp,
  ThumbsDown,
} from 'lucide-react';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <AboutHeader />
      <IntroSection />
      <QuickFacts />
      <WaveDivider color="white" />
      <CostOfLiving />
      <WaveDivider color="sand" flip />
      <ProsAndCons />
    </>
  );
}

function AboutHeader() {
  const t = useTranslations('About');

  return (
    <PageHeader
      title={t('title')}
      subtitle={t('subtitle')}
      background="gradient"
      breadcrumbs={[{ label: t('title') }]}
    />
  );
}

function IntroSection() {
  const t = useTranslations('About.intro');

  return (
    <Section background="default" className="relative overflow-hidden">
      <FloatingIllustration position="top-right" className="opacity-40">
        <HouseWithPalm className="h-24 w-24 md:h-32 md:w-32" />
      </FloatingIllustration>
      <Container size="md">
        <h2 className="font-display text-2xl font-bold text-ocean-800 sm:text-3xl">
          {t('title')}
        </h2>
        <p className="mt-4 text-lg leading-relaxed text-driftwood-500">
          {t('description')}
        </p>
      </Container>
    </Section>
  );
}

function QuickFacts() {
  const facts: {
    icon: typeof MapPin;
    label: string;
    value: string;
    color: 'ocean' | 'sunset' | 'sand' | 'palm' | 'driftwood';
  }[] = [
    {
      icon: MapPin,
      label: 'Location',
      value: 'Southernmost point of continental Europe',
      color: 'ocean',
    },
    {
      icon: Users,
      label: 'Population',
      value: '~18,000 (growing expat community)',
      color: 'palm',
    },
    {
      icon: Wind,
      label: 'Wind Days',
      value: '300+ days per year',
      color: 'driftwood',
    },
    {
      icon: Sun,
      label: 'Sunshine',
      value: '320+ sunny days per year',
      color: 'sunset',
    },
    {
      icon: Plane,
      label: 'Nearest Airports',
      value: 'Gibraltar (45min), Jerez (1h), Sevilla (2h), Malaga (2h)',
      color: 'ocean',
    },
    {
      icon: DollarSign,
      label: 'Currency',
      value: 'Euro (EUR)',
      color: 'sand',
    },
  ];

  return (
    <Section background="sand">
      <Container>
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-ocean-800 sm:text-3xl">
          Quick Facts
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {facts.map((fact) => {
            const Icon = fact.icon;
            return (
              <Card key={fact.label}>
                <CardContent className="flex items-start gap-4 p-5">
                  <ShapedContainer variant="blob" color={fact.color} size="p-2.5">
                    <Icon className="h-5 w-5 text-current" />
                  </ShapedContainer>
                  <div>
                    <p className="font-medium text-ocean-800">{fact.label}</p>
                    <p className="mt-1 text-sm text-driftwood-500">
                      {fact.value}
                    </p>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}

function CostOfLiving() {
  const t = useTranslations('About.costOfLiving');

  const costs = [
    {
      category: t('rent'),
      range: '€500 - €1,200/month',
      description: 'Studio to 2-bedroom apartment',
    },
    {
      category: t('groceries'),
      range: '€200 - €350/month',
      description: 'Per person, local markets',
    },
    {
      category: t('utilities'),
      range: '€80 - €150/month',
      description: 'Electricity, water, internet',
    },
    {
      category: t('dining'),
      range: '€10 - €25/meal',
      description: 'Menu del día to restaurant dinner',
    },
  ];

  return (
    <Section background="default">
      <Container size="md">
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-ocean-800 sm:text-3xl">
          {t('title')}
        </h2>
        <div className="space-y-4">
          {costs.map((cost) => (
            <Card key={cost.category}>
              <CardContent className="flex items-center justify-between p-5">
                <div>
                  <p className="font-medium text-ocean-800">{cost.category}</p>
                  <p className="text-sm text-driftwood-400">{cost.description}</p>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-ocean-100 text-ocean-700 text-base font-semibold"
                >
                  {cost.range}
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function ProsAndCons() {
  const t = useTranslations('About.prosAndCons');

  const pros = [
    'World-class kitesurfing and windsurfing',
    'Affordable cost of living compared to northern Europe',
    '320+ days of sunshine per year',
    'Friendly international community',
    'Beautiful natural landscapes (beaches, mountains, forests)',
    'Rich culture and excellent food',
    'Gateway to Morocco (35-minute ferry)',
  ];

  const cons = [
    'Strong wind can be relentless (especially Levante) - but this is why we are here!',
    'Limited public transport connections - rent a car',
    'Seasonal economy - quieter in winter, more space on the water',
    'Spanish bureaucracy can be challenging - use a gestoria',
    'Limited healthcare facilities (nearest hospital in Algeciras)',
    'Rental market is competitive in peak season',
  ];

  return (
    <Section background="sand" className="relative overflow-hidden">
      <FloatingIllustration position="bottom-left" className="opacity-25 hidden md:block">
        <Surfboard className="h-20 w-20 md:h-28 md:w-28" />
      </FloatingIllustration>
      <Container>
        <h2 className="mb-8 text-center font-display text-2xl font-bold text-ocean-800 sm:text-3xl">
          {t('title')}
        </h2>
        <div className="grid gap-8 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-palm-600">
                <ThumbsUp className="h-5 w-5" />
                {t('pros')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {pros.map((pro) => (
                  <li
                    key={pro}
                    className="flex items-start gap-3 text-sm text-driftwood-500"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-palm-500" />
                    {pro}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-sunset-500">
                <ThumbsDown className="h-5 w-5" />
                {t('cons')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {cons.map((con) => (
                  <li
                    key={con}
                    className="flex items-start gap-3 text-sm text-driftwood-500"
                  >
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sunset-400" />
                    {con}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Container>
    </Section>
  );
}
