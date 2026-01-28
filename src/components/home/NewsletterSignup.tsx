'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Check, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface NewsletterSignupProps {
  title?: string;
  subtitle?: string;
  placeholder?: string;
  buttonLabel?: string;
  successMessage?: string;
  errorMessage?: string;
}

export function NewsletterSignup({
  title = 'Stay Updated',
  subtitle = 'Get the latest Tarifa news and tips',
  placeholder = 'Your email',
  buttonLabel = 'Subscribe',
  successMessage = 'Thanks for subscribing!',
  errorMessage = 'Failed to subscribe',
}: NewsletterSignupProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setStatus('loading');

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) throw new Error('Failed');

      setStatus('success');
      setEmail('');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section className="bg-ocean-600 py-16 text-white">
      <div className="container mx-auto px-4 text-center">
        <Mail className="mx-auto mb-4 h-10 w-10 text-ocean-200" />
        <h2 className="font-display text-2xl font-bold sm:text-3xl">{title}</h2>
        <p className="mt-2 text-ocean-200">{subtitle}</p>

        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={placeholder}
            required
            disabled={status === 'loading' || status === 'success'}
            className="border-ocean-400 bg-ocean-700 text-white placeholder:text-ocean-300 focus:border-white"
            data-testid="newsletter-email"
          />
          <Button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={cn(
              'shrink-0',
              status === 'success'
                ? 'bg-palm-500 hover:bg-palm-600'
                : 'bg-sunset-400 hover:bg-sunset-500'
            )}
            data-testid="newsletter-submit"
          >
            {status === 'loading'
              ? 'Subscribing...'
              : status === 'success'
                ? 'Subscribed!'
                : buttonLabel}
          </Button>
        </form>

        {status === 'success' && (
          <div
            className="mt-4 flex items-center justify-center gap-2 text-sm text-palm-300"
            data-testid="newsletter-success"
          >
            <Check className="h-4 w-4" />
            {successMessage}
          </div>
        )}

        {status === 'error' && (
          <div className="mt-4 flex items-center justify-center gap-2 text-sm text-sunset-300">
            <AlertCircle className="h-4 w-4" />
            {errorMessage}
            <button
              onClick={() => setStatus('idle')}
              className="underline hover:no-underline"
            >
              Try again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
