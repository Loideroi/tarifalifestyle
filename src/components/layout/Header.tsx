'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Menu, Wind } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileNav } from './MobileNav';

const navItems = [
  { href: '/', labelKey: 'home' },
  { href: '/about', labelKey: 'about' },
  { href: '/conditions', labelKey: 'conditions' },
  { href: '/shop', labelKey: 'shop' },
  { href: '/directory', labelKey: 'directory' },
  { href: '/guides', labelKey: 'guides' },
] as const;

export function Header() {
  const t = useTranslations('Navigation');
  const tCommon = useTranslations('Common');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Wind className="h-8 w-8 text-ocean-500" />
          <span className="font-display text-xl font-bold text-foreground">
            Tarifa<span className="text-ocean-500">Lifestyle</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden items-center gap-4 md:flex">
          <LanguageSwitcher />
          <Button asChild className="bg-sunset-400 hover:bg-sunset-500">
            <Link href="/shop">{t('shop')}</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageSwitcher />
          <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label={tCommon('menu')}>
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <MobileNav onClose={() => setMobileMenuOpen(false)} />
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
