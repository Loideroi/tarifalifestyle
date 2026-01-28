# Tarifalifestyle.com - Technical Research Document

**Research Date:** January 28, 2026
**Status:** Complete

---

## Table of Contents

1. [Shopify Integration (MCP & API)](#1-shopify-integration)
2. [Next.js i18n with next-intl](#2-nextjs-i18n-with-next-intl)
3. [Sanity CMS Multilingual Setup](#3-sanity-cms-multilingual-setup)
4. [Weather & Wind Integrations](#4-weather--wind-integrations)
5. [Partner Websites Analysis](#5-partner-websites-analysis)
6. [Design System & UI Components](#6-design-system--ui-components)
7. [Implementation Recommendations](#7-implementation-recommendations)

---

## 1. Shopify Integration

### Key Discovery: Storefront MCP (No Auth Required!)

Every Shopify store has a **built-in MCP endpoint** that requires NO authentication for public operations:

```
https://tarifairforce.com/api/mcp
```

### Available MCP Options

| MCP Server | Purpose | Auth Required | Best For |
|------------|---------|---------------|----------|
| **Storefront MCP** | Single store product access | **No** | Our use case |
| Catalog MCP | Global multi-store search | Yes (OAuth) | Future features |
| Admin MCP | Full store management | Yes (App token) | Backend ops |
| Dev MCP | Documentation/validation | No | Development |

### Storefront MCP Implementation (RECOMMENDED)

```typescript
// lib/shopify/storefront-mcp.ts
const STORE_MCP_ENDPOINT = 'https://tarifairforce.com/api/mcp';

export async function fetchProducts(searchQuery: string) {
  const response = await fetch(STORE_MCP_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'tools/call',
      id: Date.now(),
      params: {
        name: 'search_shop_catalog',
        arguments: {
          query: searchQuery,
          context: 'Customer interested in kitesurfing and beach lifestyle products'
        }
      }
    })
  });

  const data = await response.json();
  return data.result;
}

// Discover available tools
export async function listAvailableTools() {
  const response = await fetch(STORE_MCP_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      jsonrpc: '2.0',
      method: 'tools/list',
      id: 1
    })
  });
  return response.json();
}
```

### Available Storefront MCP Tools

| Tool | Description |
|------|-------------|
| `search_shop_catalog` | Search products with AI context |
| `search_shop_policies_and_faqs` | Get store policies |
| `get_cart` | Retrieve cart by ID |
| `update_cart` | Add/remove cart items |

### Rate Limits

- **Storefront API:** No rate limits (designed for high traffic)
- **Admin API (GraphQL):** 1,000 points/minute
- **Admin API (REST):** ~2 requests/second

### Integration Strategy Update

```
Priority 1: Storefront MCP (No auth, simple)
Priority 2: Admin API server-side (existing credentials)
Priority 3: Static fallback (manual product curation)
```

---

## 2. Next.js i18n with next-intl

### Project Structure

```
├── messages/
│   ├── en.json
│   ├── es.json
│   ├── nl.json
│   ├── de.json
│   ├── fr.json
│   ├── it.json
│   └── pt.json
├── src/
│   ├── i18n/
│   │   ├── routing.ts      # Locale definitions
│   │   ├── request.ts      # Request config
│   │   └── navigation.ts   # Localized Link/router
│   └── app/
│       └── [locale]/
│           ├── layout.tsx
│           └── page.tsx
├── middleware.ts
└── next.config.ts
```

### Key Configuration Files

**routing.ts**
```typescript
import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'es', 'nl', 'de', 'fr', 'it', 'pt'] as const;
export type Locale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed', // Hide /en prefix for default
  pathnames: {
    '/about': {
      en: '/about',
      es: '/acerca-de',
      nl: '/over-ons',
      de: '/uber-uns',
      fr: '/a-propos',
      it: '/chi-siamo',
      pt: '/sobre'
    }
  }
});
```

**middleware.ts**
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(en|es|nl|de|fr|it|pt)/:path*']
};
```

**Layout with Provider**
```typescript
// app/[locale]/layout.tsx
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) notFound();

  setRequestLocale(locale); // Enable static rendering
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

### Server vs Client Components

| Context | Function | Usage |
|---------|----------|-------|
| Server Component | `await getTranslations('namespace')` | Async, better performance |
| Client Component | `useTranslations('namespace')` | Interactive components |
| Shared | `useTranslations()` | Works in both |

### SEO: Hreflang Implementation

```typescript
// generateMetadata in page.tsx
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  const languages: Record<string, string> = {};
  for (const loc of routing.locales) {
    languages[loc] = `https://tarifalifestyle.com/${loc}`;
  }
  languages['x-default'] = 'https://tarifalifestyle.com/en';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `https://tarifalifestyle.com/${locale}`,
      languages
    }
  };
}
```

---

## 3. Sanity CMS Multilingual Setup

### Recommended Plugin Stack

```bash
npm install @sanity/document-internationalization sanity-plugin-internationalized-array @sanity/language-filter next-sanity
```

### Two Translation Approaches

| Approach | Best For | Plugin |
|----------|----------|--------|
| **Document-level** | Guides, articles, FAQs | `@sanity/document-internationalization` |
| **Field-level** | Partner profiles, homepage blocks | `sanity-plugin-internationalized-array` |

### Languages Configuration

```typescript
// sanity/lib/languages.ts
export const languages = [
  { id: 'en', title: 'English', isDefault: true },
  { id: 'es', title: 'Spanish' },
  { id: 'nl', title: 'Dutch' },
  { id: 'de', title: 'German' },
  { id: 'fr', title: 'French' },
  { id: 'it', title: 'Italian' },
  { id: 'pt', title: 'Portuguese' },
] as const;
```

### Schema Examples

**Partner Profile (Field-Level)**
```typescript
defineType({
  name: 'partner',
  type: 'document',
  fields: [
    { name: 'name', type: 'string' },  // Not translated
    { name: 'slug', type: 'slug' },     // Not translated
    { name: 'logo', type: 'image' },    // Not translated
    { name: 'tagline', type: 'internationalizedArrayString' },  // Translated
    { name: 'description', type: 'internationalizedArrayText' }, // Translated
    { name: 'contact', type: 'object', fields: [...] }  // Not translated
  ]
})
```

**Guide Article (Document-Level)**
```typescript
defineType({
  name: 'guide',
  type: 'document',
  fields: [
    { name: 'language', type: 'string', readOnly: true, hidden: true },
    { name: 'title', type: 'string' },
    { name: 'slug', type: 'slug' },
    { name: 'content', type: 'array', of: [{ type: 'block' }] }
  ]
})
```

### GROQ Query with Language Fallback

```groq
*[_type == "partner"] {
  _id,
  name,
  "slug": slug.current,
  logo,
  "tagline": coalesce(
    tagline[_key == $language][0].value,
    tagline[_key == "en"][0].value,
    ""
  ),
  "description": coalesce(
    description[_key == $language][0].value,
    description[_key == "en"][0].value,
    ""
  )
}
```

### Content Model Summary

| Content Type | Translation | Approach |
|--------------|-------------|----------|
| Partner profiles | Field-level | Shared assets, translated descriptions |
| Guide articles | Document-level | Separate docs per language |
| FAQ items | Document-level | Full translation per language |
| Homepage blocks | Field-level | Shared structure, translated text |

---

## 4. Weather & Wind Integrations

### Windguru.cz

**Tarifa Spot IDs:**

| Spot | ID | URL |
|------|-----|-----|
| Tarifa (General) | 43 | windguru.cz/43 |
| Los Lances Tarifa | 458886 | windguru.cz/458886 |
| Valdevaqueros | 541946 | windguru.cz/541946 |
| Punta Paloma | 13586 | windguru.cz/13586 |

**Embed Code:**
```html
<script id="wg_fwdg_458886_3_tarifa">
(function (window, document) {
  var loader = function () {
    var arg = [
      "s=458886",
      "m=3",
      "uid=wg_fwdg_458886_3_tarifa",
      "wj=knots",
      "tj=c",
      "fhours=240",
      "lng=en",
      "p=WINDSPD,GUST,SMER,TMPE,RATING"
    ];
    var script = document.createElement("script");
    var tag = document.getElementsByTagName("script")[0];
    script.src = "https://www.windguru.cz/js/widget.php?" + (arg.join("&"));
    tag.parentNode.insertBefore(script, tag);
  };
  window.addEventListener("load", loader, false);
})(window, document);
</script>
```

### Open-Meteo API (RECOMMENDED - Free)

**Why:** Free, no API key, no registration, reliable.

```typescript
// lib/weather/open-meteo.ts
const TARIFA_LAT = 36.014;
const TARIFA_LON = -5.604;

export async function getWindForecast() {
  const params = new URLSearchParams({
    latitude: TARIFA_LAT.toString(),
    longitude: TARIFA_LON.toString(),
    hourly: 'temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index',
    daily: 'uv_index_max',
    wind_speed_unit: 'kn',
    timezone: 'Europe/Madrid',
    forecast_days: '7'
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
    { next: { revalidate: 1800 } }
  );

  return response.json();
}
```

### Windy.com Embed (Visual Maps)

```html
<iframe
  width="100%"
  height="450"
  src="https://embed.windy.com/embed.html?type=map&location=coordinates&metricWind=kt&zoom=10&overlay=wind&lat=36.014&lon=-5.604&marker=true"
  frameborder="0">
</iframe>
```

### Beach Cams

**Windy.com Webcam (Tarifa Arte-Vida):**
```html
<iframe
  src="https://webcams.windy.com/webcams/public/embed/player/1499427214/day"
  width="100%"
  height="400"
  frameborder="0">
</iframe>
```

### API Comparison

| Service | Cost | API Key | Best For |
|---------|------|---------|----------|
| **Open-Meteo** | Free | No | Wind/weather API |
| **Windguru** | Free widget | No | Trusted kite forecasts |
| **Windy.com** | Free widget | No | Visual wind maps |
| OpenWeather | Free (1k/day) | Yes | Current weather |
| StormGlass | €19-129/mo | Yes | Marine/wave data |

---

## 5. Partner Websites Analysis

### Tarifa Air Force (tarifairforce.com)

**Note:** Correct domain is `tarifairforce.com` (not `tarifaairforce.com`)

**Categories:**
- Apparel (Men/Women/Kids)
- Footwear
- Swimwear
- Accessories
- Sports Equipment (wetsuits, harnesses)

**Brands:** Mystic, Billabong, Levi's, Deus Ex Machina, Brixton, Carhartt, Patagonia

**Integration:** Storefront MCP (no auth required)

### Tarifa Kite Repair (tarifakiterepair.com)

**Services:**
- Kite and wing foil repair
- Valve/line/bladder repair
- Equipment customization

**Contact:**
- Phone: +34 667 97 49 25
- Email: kiterepair@tarifairforce.com
- WhatsApp available

**Integration:** WhatsApp click-to-chat, contact card

### TAF Coworking (taf-coworking.com)

**Facilities:**
- Fixed/flexible desks
- Private offices
- Meeting rooms
- High-speed WiFi
- Outdoor terrace

**Hours:** Mon-Fri 9:30-20:30, Sat 10:00-14:30

**Contact:** +34 606 370 227

**Integration:** Quote request form, facility showcase

### Explora Watersports (explorawatersportstarifa.com)

**Lessons:**
- Kitesurfing (all levels)
- Surfing
- Wing foil

**Packages:** 3x3h Beginner Pack, Private lessons, Rentals

**Contact:**
- Phone/WhatsApp: +34 635 559 631
- Email: info@explorawatersportstarifa.com

**Integration:** Online booking available, WhatsApp chat

### La Casa de la Luz (lacasadelaluztarifa.com)

**School Info:**
- Ages: 3-12 years
- Kindergarten: 1:9 ratio
- Elementary: 1:11 ratio
- Philosophy: Montessori/Wild-based
- NEASC accredited

**Contact:** lighthouse@lacasadelaluztarifa.com

**Integration:** Contact form, open house calendar

### Ciudad de Tarifa al Minuto (ciudaddetarifaalminuto.com)

**RSS Feed:** `ciudaddetarifaalminuto.com/feed/` (RSS 2.0)

**Categories:** Actualidad, Deportes, Gastronomia, Cultura, Playas

**Integration:** RSS feed for news headlines

### Espresso Bar Numero C

**Category:** Food & Drink

**Why included:** Popular meeting spot for expats and locals. Great coffee, relaxed atmosphere in the old town. Recommended for newcomers looking to connect with the expat community.

**Integration:** Profile card in directory (food category)

### Tarifa Day Care

**Category:** Education

**Why included:** Affordable day care option for expat families. Fills a gap for parents who need childcare but don't require a full international school.

**Integration:** Profile card in directory (education category), map embed

### Promoted Partners (Directory & Partner Spotlight)

The following businesses are actively promoted in the Directory page and Partner Spotlight component:

| Partner | Best Integration | Promoted |
|---------|------------------|----------|
| Tarifa Air Force | Storefront MCP (products) + kite gear promo banner | Yes |
| Tarifa Kite Repair | WhatsApp + contact card | Yes |
| TAF Coworking | Quote form + gallery | Yes |
| Explora Watersports | Booking widget + WhatsApp | Yes |
| Stoked Surf Bar | Profile + Glovo link | Yes |
| Surfr App | App store download links | Yes |
| La Casa de la Luz | Contact form + info (education) | Yes (Phase 7.1) |
| Tarifa Day Care | Profile + map embed (education) | Yes (Phase 7.1) |
| Espresso Bar Numero C | Profile card (food) | Yes (Phase 7.1) |
| Cafe Azul | Profile card | Restored (Phase 7.1) |
| Tarifa Language Academy | Profile card | Restored (Phase 7.1) |
| The Tax Point | Profile card | Restored (Phase 7.1) |
| Casa Tarifa Rentals | Profile card | Restored (Phase 7.1) |
| Chiringuito El Pirata | Profile card | Restored (Phase 7.1) |
| Ciudad de Tarifa | **RSS feed -- live on homepage** (LocalNews component, ISR 30min) | N/A |

**Excluded competitors:** Freeride Tarifa (kite school), Spin Out Tarifa (kite school), La Cocotera (coworking)

---

## 6. Design System & UI Components

### Color Palette

```css
/* Beach Colors */
--ocean-500: #1E88E5;      /* Primary - Mediterranean waters */
--sand-200: #F5E6D3;       /* Secondary - Tarifa beaches */
--sunset-400: #FF7043;     /* Accent - African sunsets */
--palm-500: #4CAF50;       /* Tropical accents */
--driftwood-400: #8D6E63;  /* Natural wood elements */
```

### Tailwind Config Highlights

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        ocean: { 500: '#1E88E5', /* ...shades */ },
        sand: { 200: '#F5E6D3', /* ...shades */ },
        sunset: { 400: '#FF7043', /* ...shades */ },
        palm: { 500: '#4CAF50' },
        driftwood: { 400: '#8D6E63' }
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
        accent: ['Pacifico', 'cursive']
      },
      borderRadius: {
        'organic': '1rem 1.5rem 1rem 1.5rem',
        'blob': '30% 70% 70% 30% / 30% 30% 70% 70%'
      },
      boxShadow: {
        'beach': '0 4px 20px -4px rgba(139, 112, 80, 0.2)',
        'sunset': '0 4px 20px -4px rgba(255, 112, 67, 0.3)'
      }
    }
  }
}
```

### shadcn/ui Components to Install

```bash
npx shadcn@latest add card button navigation-menu sheet carousel dialog tabs badge separator skeleton scroll-area
```

### Key Design Patterns

1. **Wave SVG Dividers** - Organic section separators
2. **Organic Border Radius** - Asymmetric rounded corners
3. **Soft Beach Shadows** - Warm-toned shadows
4. **Golden Hour Photography** - Consistent image treatment
5. **Parallax Scrolling** - Gentle depth effects

### Framer Motion Animations

```typescript
// Page transitions
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } }
};

// Stagger children
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};
```

---

## 7. Implementation Recommendations

### Priority Order

1. **Project Setup**
   - Next.js 14+ with App Router
   - Tailwind CSS + shadcn/ui
   - next-intl for i18n
   - Framer Motion for animations

2. **Core Infrastructure**
   - Sanity CMS with language plugins
   - Shopify Storefront MCP integration
   - Weather API integration (Open-Meteo)

3. **MVP Pages**
   - Homepage with hero carousel
   - Live conditions dashboard
   - Shop page (Shopify products)
   - Partner directory
   - Basic guides (moving, healthcare)

4. **Polish & Launch**
   - All 7 language translations
   - SEO optimization (hreflang, sitemaps)
   - Performance tuning
   - Analytics setup

### Updated Tech Stack

```
Framework:      Next.js 14+ (App Router)
Styling:        Tailwind CSS + shadcn/ui
Animation:      Framer Motion
CMS:            Sanity.io (with i18n plugins)
i18n:           next-intl
Shopify:        Storefront MCP (primary), Admin API (fallback)
Weather:        Open-Meteo API + Windguru widgets
Deployment:     Vercel
Analytics:      GA4 + Vercel Analytics
```

### Key Decisions Made

| Decision | Choice | Reason |
|----------|--------|--------|
| Shopify Integration | Storefront MCP | No auth required, simple |
| Weather API | Open-Meteo | Free, no API key |
| Wind Forecast | Windguru widgets | Trusted by kite community |
| CMS Translations | Hybrid (doc + field) | Flexible per content type |
| i18n Library | next-intl | Best App Router support |
| Styling | Tailwind + shadcn | Customizable, accessible |

### Environment Variables Needed

```env
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# Shopify (fallback only - MCP needs no auth)
SHOPIFY_STORE_URL=tarifairforce.com
SHOPIFY_CLIENT_ID=<your-shopify-client-id>
SHOPIFY_SECRET=<your-shopify-secret>

# Analytics
NEXT_PUBLIC_GA_ID=

# Base URL
NEXT_PUBLIC_BASE_URL=https://tarifalifestyle.com
```

---

## Sources

- Shopify MCP Documentation: https://shopify.dev/docs/apps/build/storefront-mcp
- Shopify Catalog MCP: https://shopify.dev/docs/agents/catalog/catalog-mcp
- next-intl Documentation: https://next-intl.dev/docs/getting-started/app-router
- Sanity Localization: https://www.sanity.io/docs/localization
- Open-Meteo API: https://open-meteo.com/en/docs
- Windguru Widgets: https://www.windguru.cz/help.php?sec=distr
- Windy Embed: https://embed.windy.com/
- shadcn/ui: https://ui.shadcn.com/
- Framer Motion: https://www.framer.com/motion/

---

**Document End**

*Research compiled from multiple sources on January 28, 2026*
