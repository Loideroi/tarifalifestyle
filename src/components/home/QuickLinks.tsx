'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { ShapedContainer } from '@/components/common/ShapedContainer';
import {
  HouseWithPalm,
  FirstAidSun,
  BookWithWave,
  LaptopBeach,
} from '@/components/illustrations/BeachIcons';

interface QuickLink {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  color: 'sunset' | 'palm' | 'ocean' | 'driftwood';
}

interface QuickLinksProps {
  title?: string;
  movingLabel?: string;
  healthcareLabel?: string;
  schoolsLabel?: string;
  coworkingLabel?: string;
}

export function QuickLinks({
  title = 'Quick Links',
  movingLabel = 'Moving Guide',
  healthcareLabel = 'Healthcare',
  schoolsLabel = 'Schools',
  coworkingLabel = 'Coworking',
}: QuickLinksProps) {
  const links: QuickLink[] = [
    {
      href: '/about',
      icon: HouseWithPalm,
      title: movingLabel,
      color: 'sunset',
    },
    {
      href: '/about',
      icon: FirstAidSun,
      title: healthcareLabel,
      color: 'palm',
    },
    {
      href: '/about',
      icon: BookWithWave,
      title: schoolsLabel,
      color: 'ocean',
    },
    {
      href: '/directory',
      icon: LaptopBeach,
      title: coworkingLabel,
      color: 'driftwood',
    },
  ];

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="mb-8 text-center font-display text-2xl font-bold sm:text-3xl">
          {title}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {links.map((link) => {
            const Icon = link.icon;
            return (
              <Link key={link.title} href={link.href}>
                <Card className="h-full clip-wave-bottom transition-all hover:-translate-y-1 hover:shadow-beach">
                  <CardContent className="flex flex-col items-center gap-4 p-6 text-center">
                    <ShapedContainer
                      variant="blob"
                      color={link.color}
                      className="h-20 w-20 blob-shadow"
                    >
                      <Icon className="h-12 w-12" />
                    </ShapedContainer>
                    <span className="font-medium">{link.title}</span>
                  </CardContent>
                </Card>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
