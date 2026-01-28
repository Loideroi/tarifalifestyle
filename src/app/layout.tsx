import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
});

const playfairDisplay = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Tarifa Lifestyle - Your Guide to Expat Life in Tarifa',
    template: '%s | Tarifa Lifestyle',
  },
  description:
    'The ultimate resource for expats living in or moving to Tarifa, Spain. Kitesurfing, beach life, and practical guides.',
  keywords: [
    'Tarifa',
    'expat',
    'Spain',
    'kitesurfing',
    'beach life',
    'digital nomad',
    'moving to Spain',
  ],
  authors: [{ name: 'Tarifa Lifestyle' }],
  creator: 'Tarifa Lifestyle',
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || 'https://tarifalifestyle.com'
  ),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://tarifalifestyle.com',
    siteName: 'Tarifa Lifestyle',
    title: 'Tarifa Lifestyle - Your Guide to Expat Life in Tarifa',
    description:
      'The ultimate resource for expats living in or moving to Tarifa, Spain.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tarifa Lifestyle',
    description:
      'The ultimate resource for expats living in or moving to Tarifa, Spain.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body
        className={`${inter.variable} ${playfairDisplay.variable} font-body antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
