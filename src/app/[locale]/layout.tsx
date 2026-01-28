import { notFound } from 'next/navigation';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Toaster } from '@/components/ui/sonner';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;

  const titles: Record<string, string> = {
    en: 'Tarifa Lifestyle - Your Guide to Expat Life in Tarifa',
    es: 'Tarifa Lifestyle - Tu Guía para la Vida de Expatriado en Tarifa',
    nl: 'Tarifa Lifestyle - Jouw Gids voor het Expat Leven in Tarifa',
    de: 'Tarifa Lifestyle - Dein Guide für das Expat-Leben in Tarifa',
    fr: 'Tarifa Lifestyle - Votre Guide pour la Vie d\'Expatrié à Tarifa',
    it: 'Tarifa Lifestyle - La Tua Guida per la Vita da Espatriato a Tarifa',
    pt: 'Tarifa Lifestyle - O Seu Guia para a Vida de Expatriado em Tarifa',
  };

  const descriptions: Record<string, string> = {
    en: 'The ultimate resource for expats living in or moving to Tarifa, Spain. Kitesurfing, beach life, and practical guides.',
    es: 'El recurso definitivo para expatriados que viven o se mudan a Tarifa, España. Kitesurf, vida de playa y guías prácticas.',
    nl: 'De ultieme bron voor expats die in Tarifa, Spanje wonen of erheen verhuizen. Kitesurfen, strandleven en praktische gidsen.',
    de: 'Die ultimative Ressource für Expats in Tarifa, Spanien. Kitesurfen, Strandleben und praktische Guides.',
    fr: 'La ressource ultime pour les expatriés vivant ou s\'installant à Tarifa, Espagne. Kitesurf, vie de plage et guides pratiques.',
    it: 'La risorsa definitiva per gli espatriati che vivono o si trasferiscono a Tarifa, Spagna. Kitesurf, vita da spiaggia e guide pratiche.',
    pt: 'O recurso definitivo para expatriados que vivem ou se mudam para Tarifa, Espanha. Kitesurf, vida de praia e guias práticos.',
  };

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://tarifalifestyle.com';

  return {
    title: {
      default: titles[locale] || titles.en,
      template: '%s | Tarifa Lifestyle',
    },
    description: descriptions[locale] || descriptions.en,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`])
      ),
    },
    openGraph: {
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
      url: `${baseUrl}/${locale}`,
      siteName: 'Tarifa Lifestyle',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: titles[locale] || titles.en,
      description: descriptions[locale] || descriptions.en,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as typeof routing.locales[number])) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for the current locale
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      <div className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
      <Toaster position="top-center" />
    </NextIntlClientProvider>
  );
}
