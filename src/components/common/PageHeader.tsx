'use client';

import { cn } from '@/lib/utils';
import { Link } from '@/i18n/navigation';
import { ChevronRight, Home } from 'lucide-react';
import { Container } from './Container';
import { blobB, blobD } from '@/lib/constants/blob-paths';

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
  const hasDecorations = background !== 'default';

  return (
    <div
      className={cn(
        'relative overflow-hidden py-12 md:py-16',
        hasDecorations && 'pb-16 md:pb-20',
        backgroundStyles[background],
        className
      )}
    >
      {/* Dot texture overlay */}
      {hasDecorations && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              'radial-gradient(circle, rgba(255,255,255,0.12) 1px, transparent 1px)',
            backgroundSize: '20px 20px',
            opacity: 0.3,
          }}
        />
      )}

      {/* Blob overlays */}
      {hasDecorations && (
        <>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -top-20 -right-20 h-64 w-64 md:h-80 md:w-80"
            viewBox="0 0 500 500"
          >
            <path d={blobB} fill="white" fillOpacity={0.08} />
          </svg>
          <svg
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-16 -left-16 h-56 w-56 md:h-72 md:w-72"
            viewBox="0 0 500 500"
          >
            <path d={blobD} fill="white" fillOpacity={0.1} />
          </svg>
        </>
      )}

      <Container className="relative z-10">
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

      {/* Wave bottom edge */}
      {hasDecorations && (
        <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
          <svg
            className="block w-full h-8 md:h-12"
            viewBox="0 0 1200 60"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60Z"
              fill="white"
            />
          </svg>
        </div>
      )}
    </div>
  );
}
