'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Link } from '@/i18n/navigation';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Page error:', error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <AlertTriangle className="mx-auto h-16 w-16 text-sunset-400" />
        <h1 className="mt-6 font-display text-2xl font-bold text-ocean-800">
          Something went wrong
        </h1>
        <p className="mt-2 max-w-md text-driftwood-500">
          An error occurred while loading this page. Please try again or return
          to the homepage.
        </p>
        {error.digest && (
          <p className="mt-2 text-xs text-driftwood-300">
            Error ID: {error.digest}
          </p>
        )}
      </div>

      <div className="flex gap-4">
        <Button onClick={reset} variant="outline" className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Try again
        </Button>
        <Button asChild className="gap-2 bg-ocean-600 hover:bg-ocean-700">
          <Link href="/">
            <Home className="h-4 w-4" />
            Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
