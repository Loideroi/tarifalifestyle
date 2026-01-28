import { Link } from '@/i18n/navigation';
import { Button } from '@/components/ui/button';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4 text-center">
      <div className="mb-8">
        <h1 className="font-display text-8xl font-bold text-ocean-200">404</h1>
        <h2 className="mt-4 font-display text-2xl font-bold text-ocean-800">
          Page not found
        </h2>
        <p className="mt-2 max-w-md text-driftwood-500">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          It might have drifted away with the wind.
        </p>
      </div>

      <div className="flex gap-4">
        <Button asChild variant="outline" className="gap-2">
          <Link href="/">
            <ArrowLeft className="h-4 w-4" />
            Go back
          </Link>
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
