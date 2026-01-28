'use client';

import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from './Container';

interface Breadcrumb {
  label: string;
  href?: string;
}

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  breadcrumbs?: Breadcrumb[];
  className?: string;
  background?: 'default' | 'ocean' | 'gradient';
}

const backgroundStyles = {
  default: 'bg-sand-50',
  ocean: 'bg-ocean-600 text-white',
  gradient: 'bg-gradient-to-r from-ocean-600 to-ocean-500 text-white',
};

export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  className,
  background = 'default',
}: PageHeaderProps) {
  const isLight = background === 'default';

  return (
    <div className={cn('py-12 md:py-16', backgroundStyles[background], className)}>
      <Container>
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav
            aria-label="Breadcrumb"
            className={cn(
              'mb-4 flex items-center gap-2 text-sm',
              isLight ? 'text-driftwood-400' : 'text-white/70'
            )}
          >
            <Link
              href="/"
              className={cn(
                'transition-colors hover:text-ocean-500',
                !isLight && 'hover:text-white'
              )}
            >
              <Home className="h-4 w-4" />
            </Link>
            {breadcrumbs.map((crumb, index) => (
              <span key={index} className="flex items-center gap-2">
                <ChevronRight className="h-4 w-4" />
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className={cn(
                      'transition-colors hover:text-ocean-500',
                      !isLight && 'hover:text-white'
                    )}
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className={isLight ? 'text-driftwood-500' : 'text-white'}>
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </nav>
        )}
        <h1
          className={cn(
            'font-display text-3xl font-bold md:text-4xl lg:text-5xl',
            isLight ? 'text-ocean-800' : 'text-white'
          )}
        >
          {title}
        </h1>
        {subtitle && (
          <p
            className={cn(
              'mt-4 max-w-2xl text-lg',
              isLight ? 'text-driftwood-500' : 'text-white/80'
            )}
          >
            {subtitle}
          </p>
        )}
      </Container>
    </div>
  );
}
