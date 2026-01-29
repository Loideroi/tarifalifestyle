import type { PartnerCategory } from '@/types';

export interface PartnerData {
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  category: PartnerCategory;
  phone?: string;
  website?: string;
  email?: string;
  whatsapp?: string;
  instagram?: string;
  address?: string;
  googleMapsUrl?: string;
  heroImage: string;
  featured: boolean;
  tags: string[];
}

export const PARTNERS: PartnerData[] = [
  // === Promoted partners (featured) ===
  {
    name: 'TAF Coworking',
    slug: 'taf-coworking',
    description:
      'The best coworking space in Tarifa. Fixed and flexible desks, private offices, meeting rooms, high-speed WiFi, and an outdoor terrace with views.',
    longDescription:
      'TAF Coworking is the go-to workspace for digital nomads and remote workers in Tarifa. With fixed and flexible desk options, private offices, meeting rooms, high-speed WiFi, and a sunny outdoor terrace overlooking the town, it provides everything you need to stay productive while living the Tarifa dream. The community of regulars includes freelancers, startup founders, and creatives from across Europe.',
    category: 'coworking',
    phone: '+34 606 370 227',
    website: 'https://taf-coworking.com',
    address: 'Tarifa',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=TAF+Coworking+Tarifa',
    heroImage: '/images/partners/taf-coworking.svg',
    featured: true,
    tags: ['coworking', 'wifi', 'digital nomad', 'remote work'],
  },
  {
    name: 'Tarifa Kite Repair',
    slug: 'tarifa-kite-repair',
    description:
      'Expert kite and wing foil repair services. Valve, line, and bladder repair, plus equipment customization. Get your gear fixed fast.',
    longDescription:
      'Tarifa Kite Repair is the trusted expert for kite and wing foil repair in Tarifa. They handle valve replacements, line repairs, bladder fixes, and custom equipment modifications. Whether your kite took a beating on the beach or needs a tune-up before the season, they get your gear back in action quickly and reliably.',
    category: 'watersports',
    phone: '+34 667 97 49 25',
    website: 'https://tarifakiterepair.com',
    address: 'Tarifa',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Tarifa+Kite+Repair',
    heroImage: '/images/partners/tarifa-kite-repair.svg',
    featured: true,
    tags: ['kite repair', 'wing foil', 'equipment', 'watersports'],
  },
  {
    name: 'Explora Watersports',
    slug: 'explora-watersports',
    description:
      'Surf, kite, and wing classes for all levels. Beginner packages, private lessons, and equipment rental available.',
    longDescription:
      'Explora Watersports is one of the leading watersports schools in Tarifa, offering surf, kite, and wing foil classes for all levels. From complete beginners to advanced riders looking to refine their technique, their experienced instructors tailor every session. They also offer equipment rental and multi-day packages for those who want to make the most of the legendary Tarifa wind.',
    category: 'watersports',
    phone: '+34 635 559 631',
    website: 'https://explorawatersportstarifa.com',
    address: 'Tarifa',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Explora+Watersports+Tarifa',
    heroImage: '/images/partners/explora-watersports.svg',
    featured: true,
    tags: ['surf', 'kite', 'wing foil', 'lessons', 'rental'],
  },
  {
    name: 'Stoked Surf Bar',
    slug: 'stoked-surf-bar',
    description:
      'Great vibes, cold drinks, and tasty food. Send Francis a WhatsApp and tell him to "GLOVO" for free deliveries. The go-to spot after a session.',
    longDescription:
      'Stoked Surf Bar is where the Tarifa surf and kite community comes together after a day on the water. Known for its laid-back vibes, cold drinks, and tasty food, it is the go-to spot for riders and expats alike. Pro tip: send Francis a WhatsApp and tell him to "GLOVO" for free deliveries straight to your door.',
    category: 'food',
    address: 'Tarifa',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Stoked+Surf+Bar+Tarifa',
    heroImage: '/images/partners/stoked-surf-bar.svg',
    featured: true,
    tags: ['bar', 'food', 'surf', 'social', 'delivery'],
  },
  {
    name: 'Surfr App',
    slug: 'surfr-app',
    description:
      'The essential app for surfers and kitesurfers. Real-time conditions, spot guides, and community features. Download now.',
    longDescription:
      'Surfr is the essential app for surfers and kitesurfers. It provides real-time wind and wave conditions, detailed spot guides, and community features to connect with other riders. Whether you are planning your next session in Tarifa or exploring new spots around the world, Surfr has you covered.',
    category: 'watersports',
    website: 'https://www.thesurfr.app',
    googleMapsUrl: undefined,
    heroImage: '/images/partners/surfr-app.svg',
    featured: true,
    tags: ['app', 'surf', 'kite', 'conditions', 'community'],
  },
  {
    name: 'Tarifa Air Force',
    slug: 'tarifa-air-force',
    description:
      'Beach lifestyle fashion and kite gear. Eleveight kites, custom boards, and the best brands for the Tarifa lifestyle.',
    longDescription:
      'Tarifa Air Force is the home of beach lifestyle fashion and kite gear in Tarifa. From Eleveight kites and custom boards to apparel that captures the Tarifa spirit, they stock the best brands and products for riders and beach lovers. Visit their shop or browse online for the latest drops.',
    category: 'watersports',
    website: 'https://tarifairforce.com',
    address: 'Tarifa',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Tarifa+Air+Force',
    heroImage: '/images/partners/tarifa-air-force.svg',
    featured: true,
    tags: ['fashion', 'kite gear', 'Eleveight', 'shop', 'lifestyle'],
  },
  // === Local businesses ===
  {
    name: 'Espresso Bar Numero C',
    slug: 'numero-c',
    description:
      'Great coffee and a favourite meeting spot for expats. Perfect place to work, socialise, and feel at home in Tarifa.',
    longDescription:
      'Espresso Bar Numero C is one of Tarifa\'s favourite meeting spots for expats and locals alike. Known for its great coffee, friendly atmosphere, and central location, it is the perfect place to catch up with friends, do some laptop work, or simply people-watch. A true Tarifa institution.',
    category: 'food',
    address: 'Tarifa',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Espresso+Bar+Numero+C+Tarifa',
    heroImage: '/images/partners/numero-c.svg',
    featured: false,
    tags: ['coffee', 'cafe', 'expat', 'social'],
  },
  {
    name: 'La Casa de la Luz',
    slug: 'la-casa-de-la-luz',
    description:
      'International school in Tarifa for ages 3-12. Montessori/Wild-based philosophy with small class sizes and NEASC accreditation.',
    longDescription:
      'La Casa de la Luz is an international school in Tarifa serving children aged 3 to 12. Built on a Montessori and Wild-based educational philosophy, the school offers small class sizes, a nurturing environment, and NEASC accreditation. It is the top choice for expat families looking for quality international education in Tarifa.',
    category: 'education',
    website: 'https://www.lacasadelaluztarifa.com',
    address: 'Tarifa',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=La+Casa+de+la+Luz+Tarifa',
    heroImage: '/images/partners/la-casa-de-la-luz.svg',
    featured: false,
    tags: ['school', 'international', 'Montessori', 'children', 'education'],
  },
  {
    name: 'La Tribu de la Luz',
    slug: 'la-tribu-de-la-luz',
    description:
      'Montessori-based family association for early childhood. Bilingual play groups and nurturing care for your little ones.',
    longDescription:
      'La Tribu de la Luz is a Montessori-based family association in Tarifa focused on early childhood care and development. They offer bilingual play groups in a safe, nurturing environment where your little ones can learn and grow. A wonderful community-driven option for expat families with young children.',
    category: 'education',
    address: 'Tarifa',
    instagram: 'tribuluztarifa',
    googleMapsUrl:
      'https://www.google.com/maps/place/La+Tribu+De+La+Luz/@36.0123952,-5.6097691',
    heroImage: '/images/partners/la-tribu-de-la-luz.svg',
    featured: false,
    tags: ['nursery', 'Montessori', 'bilingual', 'early childhood', 'family'],
  },
  {
    name: 'Cafe Azul',
    slug: 'cafe-azul',
    description:
      'Charming beachfront restaurant serving fresh seafood, tapas, and traditional Andalusian cuisine.',
    longDescription:
      'Cafe Azul is a charming beachfront restaurant on Paseo Alameda, serving fresh seafood, tapas, and traditional Andalusian cuisine. With its relaxed atmosphere and views of the Strait of Gibraltar, it is an ideal spot for a leisurely lunch or dinner in Tarifa.',
    category: 'food',
    phone: '+34 956 68 43 21',
    address: 'Paseo Alameda',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Cafe+Azul+Tarifa+Paseo+Alameda',
    heroImage: '/images/partners/cafe-azul.svg',
    featured: false,
    tags: ['restaurant', 'seafood', 'tapas', 'beachfront'],
  },
  {
    name: 'Tarifa Language Academy',
    slug: 'tarifa-language-academy',
    description:
      'Learn Spanish with immersive classes, cultural activities, and experienced native teachers.',
    longDescription:
      'Tarifa Language Academy offers immersive Spanish classes for all levels, led by experienced native teachers. Combine your language learning with cultural activities and excursions around Tarifa and Andalusia. A great way to integrate into local life.',
    category: 'education',
    phone: '+34 956 68 98 76',
    // website removed: tarifaspanish.com DNS is dead
    address: 'Calle Batalla del Salado',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Tarifa+Language+Academy+Calle+Batalla+del+Salado',
    heroImage: '/images/partners/tarifa-language-academy.svg',
    featured: false,
    tags: ['spanish', 'language', 'classes', 'immersion'],
  },
  {
    name: 'The Tax Point',
    slug: 'the-tax-point',
    description:
      'Tax advisory and business consulting for expats. NIE applications, company formation, and tax returns.',
    longDescription:
      'The Tax Point specialises in tax advisory and business consulting for expats in Spain. They help with NIE applications, company formation, annual tax returns, and ongoing accounting. If you are setting up a business or managing your finances as an expat in Tarifa, they are the people to call.',
    category: 'services',
    phone: '+34 956 68 11 22',
    address: 'Calle Santisima Trinidad',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=The+Tax+Point+Tarifa',
    heroImage: '/images/partners/the-tax-point.svg',
    featured: false,
    tags: ['tax', 'NIE', 'accounting', 'business', 'expat services'],
  },
  {
    name: 'Casa Tarifa Rentals',
    slug: 'casa-tarifa',
    description:
      'Long-term and holiday rental properties throughout Tarifa. From beachfront apartments to old town houses.',
    longDescription:
      'Casa Tarifa Rentals offers a curated selection of long-term and holiday rental properties throughout Tarifa. From beachfront apartments with sea views to charming old town houses, they help you find the perfect home in Tarifa. Ideal for expats looking for their first rental or families seeking a holiday base.',
    category: 'accommodation',
    phone: '+34 956 68 77 88',
    // website removed: casatarifa.com DNS is dead
    address: 'Calle Nuestra Senora de la Luz',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Casa+Tarifa+Rentals',
    heroImage: '/images/partners/casa-tarifa.svg',
    featured: false,
    tags: ['rental', 'accommodation', 'apartments', 'houses'],
  },
  {
    name: 'Chiringuito El Pirata',
    slug: 'chiringuito-el-pirata',
    description:
      'Beach bar on Los Lances with fresh fish, cold drinks, and the best sunset views in Tarifa.',
    longDescription:
      'Chiringuito El Pirata is a beloved beach bar on Playa de Los Lances, famous for its fresh fish, cold drinks, and spectacular sunset views. Sit with your feet in the sand and watch the kites fly while you enjoy the best chiringuito experience in Tarifa.',
    category: 'food',
    phone: '+34 660 98 76 54',
    address: 'Playa de Los Lances',
    googleMapsUrl:
      'https://www.google.com/maps/search/?api=1&query=Chiringuito+El+Pirata+Tarifa',
    heroImage: '/images/partners/chiringuito-el-pirata.svg',
    featured: false,
    tags: ['beach bar', 'chiringuito', 'sunset', 'fish', 'Los Lances'],
  },
];

export function getPartnerBySlug(slug: string): PartnerData | undefined {
  return PARTNERS.find((p) => p.slug === slug);
}

export function getFeaturedPartners(limit?: number): PartnerData[] {
  const featured = PARTNERS.filter((p) => p.featured);
  return limit ? featured.slice(0, limit) : featured;
}

export function getAllSlugs(): string[] {
  return PARTNERS.map((p) => p.slug);
}
