import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tarifa Lifestyle',
    short_name: 'TarifaLife',
    description: 'Your guide to expat life in Tarifa, Spain',
    start_url: '/',
    display: 'standalone',
    background_color: '#FAFAFA',
    theme_color: '#1E88E5',
    icons: [
      {
        src: '/icon.svg',
        sizes: 'any',
        type: 'image/svg+xml',
      },
    ],
  };
}
