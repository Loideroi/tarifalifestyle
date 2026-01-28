'use client';

import { useEffect } from 'react';

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error('Global error:', error);
  }, [error]);

  return (
    <html lang="en">
      <body>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            fontFamily: 'system-ui, sans-serif',
            textAlign: 'center',
            padding: '2rem',
          }}
        >
          <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#1565C0' }}>
            Something went wrong
          </h1>
          <p style={{ color: '#666', marginBottom: '2rem', maxWidth: '400px' }}>
            A critical error occurred. Please try refreshing the page.
          </p>
          <button
            onClick={reset}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              backgroundColor: '#1976D2',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              cursor: 'pointer',
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
