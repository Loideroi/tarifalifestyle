'use client';

import { blobA, blobC, blobE } from '@/lib/constants/blob-paths';

interface DecorativeBlobsProps {
  position: 'top' | 'middle';
}

export function DecorativeBlobs({ position }: DecorativeBlobsProps) {
  if (position === 'top') {
    return (
      <>
        {/* Ocean blob — top-left, bleeds out */}
        <svg
          viewBox="0 0 500 500"
          className="pointer-events-none absolute -left-16 -top-20 h-48 w-48 md:h-64 md:w-64"
          aria-hidden="true"
        >
          <path
            d={blobA}
            fill="var(--color-ocean-100)"
            fillOpacity="0.35"
          />
        </svg>
        {/* Sunset blob — top-right */}
        <svg
          viewBox="0 0 500 500"
          className="pointer-events-none absolute -right-12 -top-16 h-40 w-40 md:h-56 md:w-56"
          aria-hidden="true"
        >
          <path
            d={blobC}
            fill="var(--color-sunset-300)"
            fillOpacity="0.2"
          />
        </svg>
      </>
    );
  }

  return (
    <>
      {/* Palm blob — left side between Shop and Partners */}
      <svg
        viewBox="0 0 500 500"
        className="pointer-events-none absolute -left-20 top-1/2 -translate-y-1/2 h-52 w-52 md:h-72 md:w-72"
        aria-hidden="true"
      >
        <path
          d={blobE}
          fill="var(--color-palm-400)"
          fillOpacity="0.15"
        />
      </svg>
      {/* Sand blob — right side */}
      <svg
        viewBox="0 0 500 500"
        className="pointer-events-none absolute -right-16 top-1/3 h-44 w-44 md:h-60 md:w-60"
        aria-hidden="true"
      >
        <path
          d={blobA}
          fill="var(--color-sand-300)"
          fillOpacity="0.25"
        />
      </svg>
    </>
  );
}
