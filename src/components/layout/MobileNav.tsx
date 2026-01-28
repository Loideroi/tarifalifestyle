'use client';

import { useTranslations } from 'next-intl';
import { Wind, Home, Info, CloudSun, ShoppingBag, Building2, BookOpen } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';

const navItems = [
  { href: '/', labelKey: 'home', icon: Home },
  { href: '/about', labelKey: 'about', icon: Info },
  { href: '/conditions', labelKey: 'conditions', icon: CloudSun },
  { href: '/shop', labelKey: 'shop', icon: ShoppingBag },
  { href: '/directory', labelKey: 'directory', icon: Building2 },
  { href: '/guides', labelKey: 'guides', icon: BookOpen },
] as const;

interface MobileNavProps {
  onClose: () => void;
}

export function MobileNav({ onClose }: MobileNavProps) {
  const t = useTranslations('Navigation');

  return (
    <div className="flex h-full flex-col">
      {/* Logo */}
      <div className="flex items-center gap-2 border-b pb-4">
        <Wind className="h-8 w-8 text-ocean-500" />
        <span className="font-display text-xl font-bold">
          Tarifa<span className="text-ocean-500">Lifestyle</span>
        </span>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-1 flex-col gap-2 py-6">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium text-foreground transition-colors hover:bg-muted"
            >
              <Icon className="h-5 w-5 text-ocean-500" />
              {t(item.labelKey)}
            </Link>
          );
        })}
      </nav>

      {/* CTA Button */}
      <div className="border-t pt-4">
        <Button
          asChild
          className="w-full bg-sunset-400 hover:bg-sunset-500"
          onClick={onClose}
        >
          <Link href="/shop">{t('shop')}</Link>
        </Button>
      </div>
    </div>
  );
}
