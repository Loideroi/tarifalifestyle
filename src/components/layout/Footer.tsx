import { useTranslations } from 'next-intl';
import { Wind, Instagram, Facebook, Heart } from 'lucide-react';
import { Link } from '@/i18n/navigation';
import { SOCIAL_LINKS } from '@/lib/constants';

const footerLinks = {
  quickLinks: [
    { href: '/about', labelKey: 'about' },
    { href: '/conditions', labelKey: 'conditions' },
    { href: '/shop', labelKey: 'shop' },
    { href: '/directory', labelKey: 'directory' },
  ],
  guides: [
    { href: '/guides/moving', labelKey: 'moving' },
    { href: '/guides/healthcare', labelKey: 'healthcare' },
    { href: '/guides/education', labelKey: 'education' },
    { href: '/guides/working', labelKey: 'working' },
  ],
} as const;

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Navigation');
  const tGuides = useTranslations('Guides.categories');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-sand-100">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Wind className="h-8 w-8 text-ocean-500" />
              <span className="font-display text-xl font-bold">
                Tarifa<span className="text-ocean-500">Lifestyle</span>
              </span>
            </Link>
            <p className="text-sm text-muted-foreground">{t('tagline')}</p>
            <div className="flex gap-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-ocean-500"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-ocean-500"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold">
              {t('quickLinks')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tNav(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Guides */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold">
              {tNav('guides')}
            </h3>
            <ul className="space-y-2">
              {footerLinks.guides.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {tGuides(link.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 font-display text-sm font-semibold">
              {t('legal')}
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('privacy')}
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                  {t('terms')}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t pt-8 md:flex-row">
          <p className="text-sm text-muted-foreground">
            {t('copyright', { year: currentYear })}
          </p>
          <p className="flex items-center gap-1 text-sm text-muted-foreground">
            {t('madeWith')} <Heart className="h-4 w-4 text-sunset-400" />
          </p>
        </div>
      </div>
    </footer>
  );
}
