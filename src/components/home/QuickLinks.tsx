'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Link } from '@/i18n/navigation';
import { MapPin, Sun, BookOpen, Building2 } from 'lucide-react';

interface QuickLink {
  href: string;
  icon: React.ElementType;
  title: string;
  color: string;
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
      icon: MapPin,
      title: movingLabel,
      color: 'text-sunset-400',
    },
    {
      href: '/about',
      icon: Sun,
      title: healthcareLabel,
      color: 'text-palm-500',
    },
    {
      href: '/about',
      icon: BookOpen,
      title: schoolsLabel,
      color: 'text-ocean-500',
    },
    {
      href: '/directory',
      icon: Building2,
      title: coworkingLabel,
      color: 'text-driftwood-400',
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
              <Link key={link.href} href={link.href}>
                <Card className="h-full transition-all hover:-translate-y-1 hover:shadow-beach">
                  <CardContent className="flex items-center gap-4 p-6">
                    <Icon className={`h-8 w-8 ${link.color}`} />
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
