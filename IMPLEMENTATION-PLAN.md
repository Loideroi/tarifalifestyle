# Tarifalifestyle.com - Implementation Plan

**Version:** 1.0
**Created:** January 28, 2026
**Status:** Ready for Execution

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [Pre-Implementation Checklist](#2-pre-implementation-checklist)
3. [Phase 1: Project Foundation](#3-phase-1-project-foundation)
4. [Phase 2: Core Infrastructure](#4-phase-2-core-infrastructure)
5. [Phase 3: MVP Pages](#5-phase-3-mvp-pages)
6. [Phase 4: Integrations](#6-phase-4-integrations)
7. [Phase 5: i18n & Content](#7-phase-5-i18n--content)
8. [Phase 6: Polish & Launch](#8-phase-6-polish--launch)
9. [Phase 7: Post-MVP Refinements](#9-phase-7-post-mvp-refinements)
10. [Test Cases](#10-test-cases)
11. [Context Management Strategy](#11-context-management-strategy)
12. [File-by-File Implementation Order](#12-file-by-file-implementation-order)
13. [Quality Gates](#13-quality-gates)
14. [Troubleshooting Guide](#14-troubleshooting-guide)

---

## 1. Executive Summary

### Project Overview
- **Domain:** tarifalifestyle.com
- **Type:** Multilingual expat resource website
- **Stack:** Next.js 14+ / Tailwind / Sanity / Vercel
- **Languages:** 7 (MVP: en, es, nl)

### Implementation Approach
- **Total Phases:** 7
- **Estimated Scope:** ~150 files
- **Context Clears:** After each phase
- **Subagent Usage:** For research, testing, and parallel tasks

### Key Dependencies
```
Shopify MCP:     https://tarifairforce.com/api/mcp (NO AUTH!)
Weather API:     Open-Meteo (free, no key)
Wind Widgets:    Windguru embeds
CMS:             Sanity.io (requires project setup)
Deployment:      Vercel
```

---

## 2. Pre-Implementation Checklist

### Environment Requirements

```bash
# Required versions
Node.js:    >= 18.17.0
npm:        >= 9.0.0
Git:        >= 2.0.0
```

### Accounts Needed

| Service | Required | Notes |
|---------|----------|-------|
| Vercel | Yes | Deployment |
| Sanity.io | Yes | CMS - free tier available |
| GitHub | Yes | Repository |
| Google Analytics | Optional | Analytics |
| Sentry | Optional | Error tracking |

### Environment Variables Template

Create `.env.local`:

```env
# ===========================================
# SANITY CMS
# ===========================================
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=

# ===========================================
# SHOPIFY (Fallback - MCP needs no auth)
# ===========================================
SHOPIFY_STORE_URL=tarifairforce.com
SHOPIFY_CLIENT_ID=<your-shopify-client-id>
SHOPIFY_SECRET=<your-shopify-secret>

# ===========================================
# ANALYTICS (Optional)
# ===========================================
NEXT_PUBLIC_GA_ID=
SENTRY_DSN=

# ===========================================
# SITE CONFIG
# ===========================================
NEXT_PUBLIC_BASE_URL=https://tarifalifestyle.com
NEXT_PUBLIC_SITE_NAME=Tarifa Lifestyle

# ===========================================
# WEATHER (No key needed for Open-Meteo)
# ===========================================
TARIFA_LAT=36.014
TARIFA_LON=-5.604
```

---

## 3. Phase 1: Project Foundation

**Goal:** Set up project scaffold with all tooling configured
**Context Clear:** After completion
**Estimated Files:** ~25

### Step 1.1: Create Next.js Project

```bash
# Command to execute
npx create-next-app@latest tarifalifestyle --typescript --tailwind --eslint --app --src-dir --import-alias "@/*"

cd tarifalifestyle
```

### Step 1.2: Install Core Dependencies

```bash
# UI & Styling
npm install framer-motion lucide-react clsx tailwind-merge class-variance-authority

# shadcn/ui initialization
npx shadcn@latest init

# i18n
npm install next-intl

# CMS
npm install next-sanity @sanity/image-url @portabletext/react

# Data fetching
npm install @tanstack/react-query

# Forms & Validation
npm install react-hook-form zod @hookform/resolvers
```

### Step 1.3: Install shadcn/ui Components

```bash
npx shadcn@latest add button card navigation-menu sheet carousel dialog tabs badge separator skeleton scroll-area input textarea label select accordion avatar dropdown-menu toast
```

### Step 1.4: Configure Tailwind

**File: `tailwind.config.ts`**

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: "#E3F2FD",
          100: "#BBDEFB",
          200: "#90CAF9",
          300: "#64B5F6",
          400: "#42A5F5",
          500: "#1E88E5",
          600: "#1976D2",
          700: "#1565C0",
          800: "#0D47A1",
          900: "#0A3A8A",
        },
        sand: {
          50: "#FDFBF7",
          100: "#FAF6EF",
          200: "#F5E6D3",
          300: "#E8D5BC",
          400: "#D4BEA0",
          500: "#C0A684",
        },
        sunset: {
          300: "#FF8A65",
          400: "#FF7043",
          500: "#FF5722",
          600: "#F4511E",
        },
        palm: {
          400: "#66BB6A",
          500: "#4CAF50",
          600: "#43A047",
        },
        driftwood: {
          300: "#A1887F",
          400: "#8D6E63",
          500: "#795548",
        },
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        accent: ["var(--font-pacifico)", "cursive"],
      },
      borderRadius: {
        organic: "1rem 1.5rem 1rem 1.5rem",
      },
      boxShadow: {
        beach: "0 4px 20px -4px rgba(139, 112, 80, 0.2)",
        "beach-lg": "0 8px 40px -8px rgba(139, 112, 80, 0.25)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
```

### Step 1.5: Project Structure Setup

Create the following directory structure:

```
src/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── about/
│   │   ├── shop/
│   │   ├── conditions/
│   │   ├── directory/
│   │   ├── guides/
│   │   ├── lifestyle/
│   │   └── community/
│   ├── api/
│   │   ├── shopify/
│   │   ├── weather/
│   │   └── newsletter/
│   ├── globals.css
│   └── sitemap.ts
├── components/
│   ├── ui/           # shadcn components
│   ├── layout/       # Header, Footer, Navigation
│   ├── home/         # Homepage sections
│   ├── shop/         # Product components
│   ├── weather/      # Weather widgets
│   ├── partners/     # Partner cards
│   └── common/       # Shared components
├── lib/
│   ├── shopify/      # Shopify MCP client
│   ├── sanity/       # Sanity client & queries
│   ├── weather/      # Weather API
│   ├── utils/        # Utility functions
│   └── constants/    # App constants
├── i18n/
│   ├── routing.ts
│   ├── request.ts
│   └── navigation.ts
├── messages/
│   ├── en.json
│   ├── es.json
│   └── nl.json
├── types/
│   └── index.ts
└── hooks/
    └── index.ts
```

### Step 1.6: Files to Create (Phase 1)

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/lib/utils/cn.ts` | Class name utility |
| 2 | `src/lib/constants/index.ts` | App constants |
| 3 | `src/types/index.ts` | TypeScript types |
| 4 | `src/i18n/routing.ts` | Locale configuration |
| 5 | `src/i18n/request.ts` | Request config |
| 6 | `src/i18n/navigation.ts` | Localized navigation |
| 7 | `src/middleware.ts` | i18n middleware |
| 8 | `next.config.ts` | Next.js config with i18n |
| 9 | `src/messages/en.json` | English translations (base) |
| 10 | `src/messages/es.json` | Spanish translations (stub) |
| 11 | `src/messages/nl.json` | Dutch translations (stub) |
| 12 | `src/app/globals.css` | Global styles + CSS variables |
| 13 | `src/app/[locale]/layout.tsx` | Root locale layout |
| 14 | `src/app/[locale]/page.tsx` | Homepage (placeholder) |
| 15 | `src/components/layout/Header.tsx` | Site header |
| 16 | `src/components/layout/Footer.tsx` | Site footer |
| 17 | `src/components/layout/MobileNav.tsx` | Mobile navigation |
| 18 | `src/components/layout/LanguageSwitcher.tsx` | Language selector |
| 19 | `.env.local` | Environment variables |
| 20 | `.env.example` | Example env file |

### Phase 1 Quality Gate

Before proceeding to Phase 2, verify:

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes successfully
- [ ] `/` redirects to `/en` (or shows English content)
- [ ] `/es` shows Spanish locale
- [ ] Language switcher changes URL
- [ ] Tailwind custom colors work (test with `bg-ocean-500`)
- [ ] shadcn/ui Button component renders
- [ ] No TypeScript errors

### Phase 1 Test Cases

```typescript
// tests/phase1.test.ts
describe('Phase 1: Foundation', () => {
  test('App renders without crashing', async () => {
    // Visit homepage
    // Expect no console errors
  });

  test('Locale routing works', async () => {
    // Visit /en - expect English
    // Visit /es - expect Spanish
    // Visit /nl - expect Dutch
  });

  test('Language switcher updates URL', async () => {
    // Click ES in switcher
    // Expect URL to contain /es
  });

  test('Custom Tailwind colors render', async () => {
    // Render element with bg-ocean-500
    // Expect correct background color
  });

  test('shadcn/ui components work', async () => {
    // Render Button component
    // Expect it to be clickable
  });
});
```

---

## 4. Phase 2: Core Infrastructure

**Goal:** Set up Sanity CMS, Shopify client, and Weather API
**Context Clear:** After completion
**Estimated Files:** ~30

### Step 2.1: Initialize Sanity Project

```bash
# In project root
npm create sanity@latest -- --project-id <PROJECT_ID> --dataset production --template clean --typescript --output-path sanity

# Install Sanity plugins
cd sanity
npm install @sanity/document-internationalization sanity-plugin-internationalized-array @sanity/language-filter
```

### Step 2.2: Sanity Schema Files

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `sanity/schemas/index.ts` | Schema registry |
| 2 | `sanity/schemas/documents/partner.ts` | Partner profiles |
| 3 | `sanity/schemas/documents/guide.ts` | Guide articles |
| 4 | `sanity/schemas/documents/faqItem.ts` | FAQ items |
| 5 | `sanity/schemas/documents/homepageBlock.ts` | Homepage sections |
| 6 | `sanity/schemas/documents/category.ts` | Categories |
| 7 | `sanity/schemas/objects/blockContent.ts` | Rich text |
| 8 | `sanity/schemas/objects/seo.ts` | SEO fields |
| 9 | `sanity/lib/languages.ts` | Language config |
| 10 | `sanity/sanity.config.ts` | Sanity configuration |
| 11 | `sanity/structure.ts` | Desk structure |

### Step 2.3: Sanity Client Setup

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/lib/sanity/client.ts` | Sanity client |
| 2 | `src/lib/sanity/queries.ts` | GROQ queries |
| 3 | `src/lib/sanity/image.ts` | Image URL builder |
| 4 | `src/lib/sanity/fetch.ts` | Fetch helper with locale |

### Step 2.4: Shopify MCP Client

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/lib/shopify/mcp-client.ts` | Storefront MCP client |
| 2 | `src/lib/shopify/types.ts` | Shopify types |
| 3 | `src/lib/shopify/queries.ts` | Product queries |
| 4 | `src/app/api/shopify/products/route.ts` | Products API route |

**Key Implementation: `src/lib/shopify/mcp-client.ts`**

```typescript
const STORE_MCP_ENDPOINT = 'https://tarifairforce.com/api/mcp';

interface MCPRequest {
  jsonrpc: '2.0';
  method: string;
  id: number;
  params?: Record<string, unknown>;
}

export async function mcpRequest<T>(
  method: string,
  params?: Record<string, unknown>
): Promise<T> {
  const request: MCPRequest = {
    jsonrpc: '2.0',
    method,
    id: Date.now(),
    params,
  };

  const response = await fetch(STORE_MCP_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(request),
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!response.ok) {
    throw new Error(`MCP request failed: ${response.status}`);
  }

  const data = await response.json();

  if (data.error) {
    throw new Error(data.error.message);
  }

  return data.result;
}

export async function searchProducts(query: string, context?: string) {
  return mcpRequest('tools/call', {
    name: 'search_shop_catalog',
    arguments: {
      query,
      context: context || 'Customer interested in beach lifestyle and kitesurfing products',
    },
  });
}

export async function listMCPTools() {
  return mcpRequest('tools/list');
}
```

### Step 2.5: Weather API Client

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/lib/weather/open-meteo.ts` | Open-Meteo client |
| 2 | `src/lib/weather/types.ts` | Weather types |
| 3 | `src/app/api/weather/route.ts` | Weather API route |

**Key Implementation: `src/lib/weather/open-meteo.ts`**

```typescript
const TARIFA_LAT = 36.014;
const TARIFA_LON = -5.604;

export interface WindForecast {
  time: string[];
  temperature: number[];
  windSpeed: number[];
  windDirection: number[];
  windGust: number[];
  uvIndex: number[];
}

export async function getWindForecast(): Promise<WindForecast> {
  const params = new URLSearchParams({
    latitude: TARIFA_LAT.toString(),
    longitude: TARIFA_LON.toString(),
    hourly: 'temperature_2m,wind_speed_10m,wind_direction_10m,wind_gusts_10m,uv_index',
    wind_speed_unit: 'kn',
    timezone: 'Europe/Madrid',
    forecast_days: '7',
  });

  const response = await fetch(
    `https://api.open-meteo.com/v1/forecast?${params}`,
    { next: { revalidate: 1800 } } // 30 min cache
  );

  if (!response.ok) {
    throw new Error('Failed to fetch weather data');
  }

  const data = await response.json();

  return {
    time: data.hourly.time,
    temperature: data.hourly.temperature_2m,
    windSpeed: data.hourly.wind_speed_10m,
    windDirection: data.hourly.wind_direction_10m,
    windGust: data.hourly.wind_gusts_10m,
    uvIndex: data.hourly.uv_index,
  };
}
```

### Phase 2 Quality Gate

Before proceeding to Phase 3, verify:

- [ ] Sanity Studio runs (`cd sanity && npm run dev`)
- [ ] Sanity schemas load without errors
- [ ] Can create a test Partner in Sanity Studio
- [ ] Shopify MCP endpoint responds (test `listMCPTools()`)
- [ ] Product search returns results
- [ ] Weather API returns forecast data
- [ ] All API routes return valid JSON
- [ ] No TypeScript errors

### Phase 2 Test Cases

```typescript
// tests/phase2.test.ts
describe('Phase 2: Infrastructure', () => {
  describe('Sanity CMS', () => {
    test('Client connects successfully', async () => {
      const result = await sanityClient.fetch('*[_type == "partner"][0]');
      expect(result).toBeDefined();
    });

    test('GROQ queries execute', async () => {
      const partners = await getPartners('en');
      expect(Array.isArray(partners)).toBe(true);
    });
  });

  describe('Shopify MCP', () => {
    test('MCP endpoint responds', async () => {
      const tools = await listMCPTools();
      expect(tools).toBeDefined();
    });

    test('Product search returns results', async () => {
      const products = await searchProducts('t-shirt');
      expect(products).toBeDefined();
    });

    test('Handles empty search gracefully', async () => {
      const products = await searchProducts('xyznonexistent123');
      expect(Array.isArray(products)).toBe(true);
    });
  });

  describe('Weather API', () => {
    test('Returns forecast data', async () => {
      const forecast = await getWindForecast();
      expect(forecast.time.length).toBeGreaterThan(0);
      expect(forecast.windSpeed.length).toBeGreaterThan(0);
    });

    test('Wind speed is in knots', async () => {
      const forecast = await getWindForecast();
      // Tarifa typically has 10-40 knot winds
      expect(forecast.windSpeed[0]).toBeGreaterThan(0);
      expect(forecast.windSpeed[0]).toBeLessThan(100);
    });
  });
});
```

---

## 5. Phase 3: MVP Pages

**Goal:** Build all core page layouts and components
**Context Clear:** After each major page
**Estimated Files:** ~50

### Page Implementation Order

| Order | Page | Priority | Components Needed |
|-------|------|----------|-------------------|
| 1 | Homepage | Critical | Hero, ConditionsWidget, ShopPreview, PartnerGrid |
| 2 | Conditions | Critical | WindWidget, WeatherCard, BeachCam, SpotSelector |
| 3 | Shop | Critical | ProductGrid, ProductCard, CategoryFilter |
| 4 | Directory | High | PartnerCard, CategoryFilter, MapEmbed |
| 5 | About | High | ContentSection, Gallery, CostTable |
| 6 | Guides (hub) | Medium | GuideCard, CategoryNav |
| 7 | Guide detail | Medium | ArticleContent, TOC, RelatedGuides |
| 8 | Lifestyle | Low | ActivityCard, SpotGuide |
| 9 | Community | Low | NewsWidget, EventCard |

### Step 3.1: Common Components

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/components/common/Section.tsx` | Page section wrapper |
| 2 | `src/components/common/Container.tsx` | Max-width container |
| 3 | `src/components/common/WaveDivider.tsx` | Wave SVG section divider |
| 4 | `src/components/common/PageHeader.tsx` | Page title + breadcrumb |
| 5 | `src/components/common/LoadingSpinner.tsx` | Loading state |
| 6 | `src/components/common/ErrorBoundary.tsx` | Error handling |

### Step 3.2: Homepage Components

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/components/home/HeroCarousel.tsx` | Hero section |
| 2 | `src/components/home/ConditionsWidget.tsx` | Quick wind/weather |
| 3 | `src/components/home/ShopPreview.tsx` | Featured products |
| 4 | `src/components/home/PartnerSpotlight.tsx` | Featured partners |
| 5 | `src/components/home/NewsletterSignup.tsx` | Email capture |
| 6 | `src/components/home/QuickLinks.tsx` | Essential links grid |

### Step 3.3: Weather Components

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/components/weather/WindForecast.tsx` | Hourly wind chart |
| 2 | `src/components/weather/CurrentConditions.tsx` | Current weather |
| 3 | `src/components/weather/WindguruEmbed.tsx` | Windguru iframe |
| 4 | `src/components/weather/BeachCamEmbed.tsx` | Windy webcam |
| 5 | `src/components/weather/SpotSelector.tsx` | Spot dropdown |
| 6 | `src/components/weather/UVIndex.tsx` | UV display |

### Step 3.4: Shop Components

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/components/shop/ProductGrid.tsx` | Product listing |
| 2 | `src/components/shop/ProductCard.tsx` | Single product |
| 3 | `src/components/shop/CategoryFilter.tsx` | Filter tabs |
| 4 | `src/components/shop/SearchBar.tsx` | Product search |
| 5 | `src/components/shop/CollectionBanner.tsx` | Featured collection |

### Step 3.5: Partner Components

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/components/partners/PartnerCard.tsx` | Partner listing card |
| 2 | `src/components/partners/PartnerDetail.tsx` | Full partner info |
| 3 | `src/components/partners/ContactButtons.tsx` | WhatsApp, email, etc |
| 4 | `src/components/partners/MapEmbed.tsx` | Google Maps iframe |

### Step 3.6: Page Files

| # | File Path | Purpose |
|---|-----------|---------|
| 1 | `src/app/[locale]/page.tsx` | Homepage |
| 2 | `src/app/[locale]/about/page.tsx` | About Tarifa |
| 3 | `src/app/[locale]/conditions/page.tsx` | Live conditions |
| 4 | `src/app/[locale]/shop/page.tsx` | Shop listing |
| 5 | `src/app/[locale]/directory/page.tsx` | Partner directory |
| 6 | `src/app/[locale]/directory/[slug]/page.tsx` | Partner detail |
| 7 | `src/app/[locale]/guides/page.tsx` | Guides hub |
| 8 | `src/app/[locale]/guides/[category]/page.tsx` | Guide category |
| 9 | `src/app/[locale]/guides/[category]/[slug]/page.tsx` | Guide article |
| 10 | `src/app/[locale]/lifestyle/page.tsx` | Lifestyle hub |
| 11 | `src/app/[locale]/community/page.tsx` | Community page |

### Phase 3 Quality Gate

Before proceeding to Phase 4, verify:

- [ ] Homepage renders with all sections
- [ ] Conditions page shows wind forecast
- [ ] Shop page displays products from Shopify MCP
- [ ] Directory page lists partners (or shows placeholder)
- [ ] All pages are mobile responsive
- [ ] Navigation works between all pages
- [ ] No layout shifts (CLS < 0.1)
- [ ] Images use Next.js Image component
- [ ] Loading states display correctly

### Phase 3 Test Cases

```typescript
// tests/phase3.test.ts
describe('Phase 3: MVP Pages', () => {
  describe('Homepage', () => {
    test('Hero carousel renders', async () => {});
    test('Conditions widget shows data', async () => {});
    test('Shop preview displays products', async () => {});
    test('Newsletter form submits', async () => {});
  });

  describe('Conditions Page', () => {
    test('Wind forecast chart renders', async () => {});
    test('Windguru embed loads', async () => {});
    test('Beach cam displays', async () => {});
    test('Spot selector changes data', async () => {});
  });

  describe('Shop Page', () => {
    test('Products load from Shopify MCP', async () => {});
    test('Category filter works', async () => {});
    test('Product cards link to tarifairforce.com', async () => {});
    test('UTM parameters are added to links', async () => {});
  });

  describe('Directory Page', () => {
    test('Partner cards render', async () => {});
    test('Contact buttons work', async () => {});
    test('Map embeds load', async () => {});
  });

  describe('Responsive Design', () => {
    test('Mobile navigation works', async () => {});
    test('Pages render correctly at 375px width', async () => {});
    test('Pages render correctly at 1440px width', async () => {});
  });
});
```

---

## 6. Phase 4: Integrations

**Goal:** Complete all external integrations
**Context Clear:** After completion
**Estimated Files:** ~15

### Integration Checklist

| Integration | Type | Priority | Status |
|-------------|------|----------|--------|
| Shopify MCP | API | Critical | Phase 2 |
| Open-Meteo | API | Critical | Phase 2 |
| Windguru | Embed | High | This phase |
| Windy Webcam | Embed | High | This phase |
| Google Maps | Embed | Medium | This phase |
| RSS (News) | API | Medium | This phase |
| WhatsApp | Links | Low | This phase |
| Newsletter | API | Low | This phase |

### Step 4.1: Windguru Integration

**File: `src/components/weather/WindguruEmbed.tsx`**

```typescript
'use client';

import { useEffect, useRef } from 'react';

interface WindguruEmbedProps {
  spotId: number;
  language?: string;
}

const SPOT_IDS = {
  losLances: 48776,
  valdevaqueros: 541946,
  campoDeFutbol: 976270,
};

export function WindguruEmbed({ spotId, language = 'en' }: WindguruEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const script = document.createElement('script');
    const uid = `wg_fwdg_${spotId}_${Date.now()}`;

    script.id = uid;
    script.innerHTML = `
      (function (window, document) {
        var loader = function () {
          var arg = [
            "s=${spotId}",
            "m=100",
            "uid=${uid}",
            "wj=knots",
            "tj=c",
            "fhours=240",
            "lng=${language}",
            "p=WINDSPD,GUST,SMER,TMPE,FLHGT,CDC,APCP1s,RATING",
            "ai=0",
            "waj=m",
            "tij=cm",
            "odh=0",
            "doh=24",
            "hrsm=2",
            "vt=forecasts",
            "idbs=1"
          ];
          var s = document.createElement("script");
          var tag = document.getElementsByTagName("script")[0];
          s.src = "https://www.windguru.cz/js/widget.php?" + (arg.join("&"));
          tag.parentNode.insertBefore(s, tag);
        };
        if (document.readyState === 'complete') {
          loader();
        } else {
          window.addEventListener("load", loader, false);
        }
      })(window, document);
    `;

    containerRef.current.appendChild(script);

    return () => {
      script.remove();
    };
  }, [spotId, language]);

  return <div ref={containerRef} className="windguru-widget" />;
}

export { SPOT_IDS };
```

### Step 4.2: RSS Feed Integration

**File: `src/lib/rss/tarifa-news.ts`**

```typescript
import { XMLParser } from 'fast-xml-parser';

const RSS_URL = 'https://ciudaddetarifaalminuto.com/feed/';

interface NewsItem {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  image?: string;
}

export async function getTarifaNews(limit = 5): Promise<NewsItem[]> {
  try {
    const response = await fetch(RSS_URL, {
      next: { revalidate: 1800 }, // 30 min cache
    });

    if (!response.ok) {
      throw new Error('Failed to fetch RSS feed');
    }

    const xml = await response.text();
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
    });

    const feed = parser.parse(xml);
    const items = feed.rss.channel.item.slice(0, limit);

    return items.map((item: any) => ({
      title: item.title,
      link: item.link,
      pubDate: item.pubDate,
      description: item.description?.replace(/<[^>]*>/g, '').slice(0, 200),
      image: item['media:content']?.['@_url'],
    }));
  } catch (error) {
    console.error('RSS fetch error:', error);
    return [];
  }
}
```

### Step 4.3: Newsletter Integration

**File: `src/app/api/newsletter/route.ts`**

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400 }
      );
    }

    // TODO: Integrate with Mailchimp/ConvertKit
    // For now, just log the email
    console.log('Newsletter signup:', email);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to subscribe' },
      { status: 500 }
    );
  }
}
```

### Phase 4 Quality Gate

Before proceeding to Phase 5, verify:

- [ ] Windguru widget loads and displays forecast
- [ ] Windy webcam embed shows video
- [ ] Google Maps embeds load for partners
- [ ] RSS news feed displays articles
- [ ] WhatsApp links open correctly (mobile)
- [ ] Newsletter form submits without error
- [ ] All embeds have loading states
- [ ] Embeds don't block page load (lazy loaded)

### Phase 4 Test Cases

```typescript
// tests/phase4.test.ts
describe('Phase 4: Integrations', () => {
  describe('Windguru', () => {
    test('Widget script loads', async () => {});
    test('Spot selector changes widget', async () => {});
  });

  describe('RSS Feed', () => {
    test('Fetches news articles', async () => {
      const news = await getTarifaNews(5);
      expect(news.length).toBeLessThanOrEqual(5);
    });

    test('News items have required fields', async () => {
      const news = await getTarifaNews(1);
      expect(news[0]).toHaveProperty('title');
      expect(news[0]).toHaveProperty('link');
    });
  });

  describe('Newsletter', () => {
    test('Accepts valid email', async () => {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: 'test@example.com' }),
      });
      expect(res.ok).toBe(true);
    });

    test('Rejects invalid email', async () => {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        body: JSON.stringify({ email: 'invalid' }),
      });
      expect(res.status).toBe(400);
    });
  });
});
```

---

## 7. Phase 5: i18n & Content

**Goal:** Complete translations and CMS content
**Context Clear:** After each language
**Estimated Files:** ~20

### Step 5.1: Translation Structure

**File: `src/messages/en.json` (base structure)**

```json
{
  "Metadata": {
    "title": "Tarifa Lifestyle - Your Guide to Expat Life in Tarifa",
    "description": "The ultimate resource for expats living in or moving to Tarifa, Spain. Kitesurfing, beach life, and practical guides."
  },
  "Navigation": {
    "home": "Home",
    "about": "About Tarifa",
    "conditions": "Conditions",
    "shop": "Shop",
    "directory": "Directory",
    "guides": "Guides",
    "lifestyle": "Lifestyle",
    "community": "Community"
  },
  "Common": {
    "loading": "Loading...",
    "error": "Something went wrong",
    "retry": "Try again",
    "viewAll": "View all",
    "learnMore": "Learn more",
    "contact": "Contact",
    "share": "Share"
  },
  "Home": {
    "hero": {
      "title": "Live the Tarifa Dream",
      "subtitle": "Your guide to expat life at Europe's kitesurfing capital",
      "cta": "Explore Tarifa"
    },
    "conditions": {
      "title": "Current Conditions",
      "wind": "Wind",
      "temperature": "Temperature",
      "uvIndex": "UV Index"
    },
    "shop": {
      "title": "Shop the Look",
      "subtitle": "Beach lifestyle essentials from Tarifa Air Force",
      "viewStore": "Visit Store"
    },
    "partners": {
      "title": "Local Partners",
      "subtitle": "Trusted businesses recommended by expats"
    },
    "newsletter": {
      "title": "Stay Updated",
      "subtitle": "Get the latest Tarifa news and tips",
      "placeholder": "Your email",
      "button": "Subscribe",
      "success": "Thanks for subscribing!",
      "error": "Failed to subscribe"
    }
  },
  "Conditions": {
    "title": "Live Conditions",
    "subtitle": "Real-time wind, weather, and beach cams",
    "spots": {
      "losLances": "Los Lances",
      "valdevaqueros": "Valdevaqueros",
      "campoDeFutbol": "Campo de Fútbol"
    },
    "forecast": "10-Day Forecast",
    "beachCam": "Beach Cam",
    "windguru": "Windguru Forecast"
  },
  "Shop": {
    "title": "Shop",
    "subtitle": "Beach lifestyle fashion from Tarifa Air Force",
    "categories": {
      "all": "All",
      "men": "Men",
      "women": "Women",
      "accessories": "Accessories"
    },
    "shopNow": "Shop Now",
    "viewOnStore": "View on tarifairforce.com"
  },
  "Directory": {
    "title": "Business Directory",
    "subtitle": "Trusted local partners",
    "categories": {
      "all": "All",
      "watersports": "Watersports",
      "coworking": "Coworking",
      "education": "Education",
      "food": "Food & Drink",
      "services": "Services"
    },
    "contact": "Contact",
    "website": "Website",
    "directions": "Get Directions"
  },
  "Footer": {
    "tagline": "Your guide to expat life in Tarifa",
    "quickLinks": "Quick Links",
    "partners": "Partners",
    "legal": "Legal",
    "privacy": "Privacy Policy",
    "terms": "Terms of Service",
    "copyright": "© {year} Tarifa Lifestyle. All rights reserved."
  }
}
```

### Step 5.2: Translation Files

| # | File | Language | Status |
|---|------|----------|--------|
| 1 | `en.json` | English | Complete |
| 2 | `es.json` | Spanish | MVP |
| 3 | `nl.json` | Dutch | MVP |
| 4 | `de.json` | German | Post-MVP |
| 5 | `fr.json` | French | Post-MVP |
| 6 | `it.json` | Italian | Post-MVP |
| 7 | `pt.json` | Portuguese | Post-MVP |

### Step 5.3: Sanity Content Creation

| Content Type | Documents Needed | Priority |
|--------------|------------------|----------|
| Partners | 8-10 | Critical |
| Homepage Blocks | 5-6 | Critical |
| Guide Categories | 5 | High |
| Guide Articles | 10-15 | High |
| FAQ Items | 20-30 | Medium |

### Phase 5 Quality Gate

Before proceeding to Phase 6, verify:

- [ ] All English translations complete
- [ ] Spanish translations complete (MVP)
- [ ] Dutch translations complete (MVP)
- [ ] Language switcher shows correct content
- [ ] hreflang tags present in HTML
- [ ] All Sanity content created
- [ ] Content displays correctly in all MVP languages
- [ ] No missing translation keys (check console)

### Phase 5 Test Cases

```typescript
// tests/phase5.test.ts
describe('Phase 5: i18n & Content', () => {
  describe('Translations', () => {
    test('English translations load', async () => {
      const res = await fetch('/en');
      const html = await res.text();
      expect(html).toContain('Live the Tarifa Dream');
    });

    test('Spanish translations load', async () => {
      const res = await fetch('/es');
      const html = await res.text();
      expect(html).toContain('Vive el Sueño de Tarifa');
    });

    test('No missing translation keys', async () => {
      // Check console for warnings
    });
  });

  describe('SEO', () => {
    test('hreflang tags present', async () => {
      const res = await fetch('/en');
      const html = await res.text();
      expect(html).toContain('hreflang="es"');
      expect(html).toContain('hreflang="nl"');
    });

    test('Meta descriptions are localized', async () => {});
  });

  describe('Sanity Content', () => {
    test('Partners load from CMS', async () => {});
    test('Guides load from CMS', async () => {});
    test('Content is localized', async () => {});
  });
});
```

---

## 8. Phase 6: Polish & Launch

**Goal:** Performance optimization, testing, deployment
**Context Clear:** Before deployment
**Estimated Files:** ~10

### Step 6.1: Performance Optimization

| Task | File/Action | Priority |
|------|-------------|----------|
| Image optimization | Verify all images use Next/Image | Critical |
| Bundle analysis | `npm run build && npm run analyze` | High |
| Core Web Vitals | Test with Lighthouse | High |
| Code splitting | Verify dynamic imports | Medium |
| Font optimization | Use next/font | Medium |

### Step 6.2: SEO Implementation

| Task | File | Priority |
|------|------|----------|
| Sitemap | `src/app/sitemap.ts` | Critical |
| Robots.txt | `src/app/robots.ts` | Critical |
| OpenGraph images | `src/app/[locale]/opengraph-image.tsx` | High |
| Schema.org markup | `src/components/common/JsonLd.tsx` | Medium |

### Step 6.3: Error Handling

| Task | File | Priority |
|------|------|----------|
| 404 page | `src/app/[locale]/not-found.tsx` | Critical |
| Error page | `src/app/[locale]/error.tsx` | Critical |
| Global error | `src/app/global-error.tsx` | High |
| Sentry setup | `sentry.client.config.ts` | Medium |

### Step 6.4: Deployment Checklist

```bash
# Pre-deployment checks
npm run lint
npm run type-check
npm run build
npm run test

# Vercel deployment
vercel --prod
```

### Step 6.5: Post-Deployment Verification

| Check | URL | Expected |
|-------|-----|----------|
| Homepage | tarifalifestyle.com | Loads < 3s |
| Locale redirect | tarifalifestyle.com → /en | Works |
| Spanish | tarifalifestyle.com/es | Spanish content |
| Shop | tarifalifestyle.com/shop | Products load |
| Conditions | tarifalifestyle.com/conditions | Weather displays |
| Mobile | Test on phone | Responsive |

### Phase 6 Quality Gate (Launch Readiness)

- [ ] Lighthouse Performance > 90
- [ ] Lighthouse Accessibility > 90
- [ ] Lighthouse SEO > 90
- [ ] Core Web Vitals pass
- [ ] All pages load < 3s
- [ ] Mobile responsive (375px - 1440px)
- [ ] No console errors
- [ ] All links work (no 404s)
- [ ] Forms submit correctly
- [ ] Analytics tracking verified
- [ ] SSL certificate valid
- [ ] Domain configured correctly

---

## 9. Phase 7: Post-MVP Refinements

**Goal:** Polish and refine the shipped MVP based on real usage and priorities
**Status:** Complete (through 7.2)
**Date:** January 29, 2026

### 7.1 Favicon & PWA

- [x] Wind icon SVG added as favicon (`/src/app/icon.svg`)
- [x] PWA manifest created (`/src/app/manifest.ts`) for installability

### 7.2 Homepage Fixes

- [x] Quick links updated to point to `/about` instead of non-existent `/guides/*` pages
- [x] Newsletter signup section removed from homepage
- [x] Newsletter-related translations and components cleaned up

### 7.3 Navigation & Header

- [x] Orange shop button removed from Header and MobileNav
- [x] Shop tab renamed to "Fashion" in navigation

### 7.4 About Page Updates

- [x] Sevilla airport (2h drive) added to airports list
- [x] Cons section rewritten with positive spin:
  - Wind = "that's why we're here"
  - Limited transport = "rent a car and enjoy the freedom"
  - Quiet winters = "more space for you"
  - Bureaucracy = "use a gestoria"

### 7.5 Footer & Social

- [x] Instagram and Facebook social links removed from Footer
- [x] Social link constants removed from codebase

### 7.6 Shop / Fashion Page

- [x] Kite gear promotion banner added promoting Tarifa Air Force Eleveight kites

### 7.7 Directory & Partner Spotlight

- [x] Directory and Partner Spotlight updated with promoted businesses:
  - TAF Coworking
  - Tarifa Kite Repair
  - Explora Watersports
  - Stoked Surf Bar
  - Surfr App
  - Tarifa Air Force

### 7.8 Local News Feed (Partial)

- [x] RSS client exists (`src/lib/rss/tarifa-news.ts`) for ciudaddetarifaalminuto.com
- [ ] **Not yet displayed** on any page -- client fetches data but no UI component renders it

### Phase 7 Quality Gate

- [x] Favicon displays in browser tab
- [x] PWA manifest is served at `/manifest.json`
- [x] Quick links navigate to `/about`
- [x] No newsletter section on homepage
- [x] No social links in footer
- [x] Shop renamed to Fashion in navigation
- [x] Kite gear banner visible on fashion/shop page
- [x] Partner spotlight shows promoted businesses
- [x] About page cons have positive framing
- [x] Sevilla airport listed on about page
- [x] Build passes with all changes

### Phase 7.1: Refinements & Local News Feed

**Goal:** Fix UI bugs, implement local news feed, expand directory with local partners and education listings
**Status:** Complete
**Date:** January 29, 2026

#### 7.1.1 Hero Button Fix

- [x] "Check Conditions" button on hero had white text on white background (outline variant used `bg-background`)
- [x] Added `bg-transparent` class to override and restore proper contrast

#### 7.1.2 Local News Feed (Homepage)

- [x] New `LocalNews` server component renders RSS data from ciudaddetarifaalminuto.com on the homepage
- [x] Uses existing RSS client (`src/lib/rss/tarifa-news.ts`) -- no new API integration needed
- [x] Shows 4 latest news items in a responsive 2-column grid
- [x] Homepage now uses ISR with 30-minute revalidation (`revalidate = 1800`)

#### 7.1.3 Directory Additions

- [x] Added **Espresso Bar Numero C** (food category) -- popular expat meeting spot
- [x] Added **La Casa de la Luz** international school (education, https://www.lacasadelaluztarifa.com)
- [x] Added **Tarifa Day Care** (education, affordable day care)

#### 7.1.4 Directory Restorations

- [x] Restored original local partners that were accidentally removed in Phase 7:
  - Cafe Azul
  - Tarifa Language Academy
  - The Tax Point
  - Casa Tarifa Rentals
  - Chiringuito El Pirata
- [x] Competitors excluded from directory: no other kite schools (Freeride, Spin Out), no other coworking (La Cocotera)

#### 7.1.5 News Translations

- [x] Added news-related translation keys to all 7 language files (en, es, nl, de, fr, it, pt)

#### Phase 7.1 Quality Gate

- [x] Hero "Check Conditions" button is visible and readable on all backgrounds
- [x] Local news feed renders on homepage with 4 articles
- [x] Homepage revalidates every 30 minutes (ISR)
- [x] Espresso Bar Numero C appears in directory under food category
- [x] La Casa de la Luz appears in directory under education category
- [x] Tarifa Day Care appears in directory under education category
- [x] Cafe Azul, Tarifa Language Academy, The Tax Point, Casa Tarifa Rentals, Chiringuito El Pirata all present in directory
- [x] No competitor listings (Freeride, Spin Out, La Cocotera)
- [x] News translations present in all 7 locale files
- [x] Build passes with all changes

### Phase 7.2: Windguru Forecast Updates

**Goal:** Update Windguru spots and widget parameters for more accurate, extended forecasts
**Status:** Complete
**Date:** January 29, 2026

#### 7.2.1 Windguru Spot Changes

- [x] Los Lances spot ID changed from `458886` to `48776`
- [x] Valdevaqueros kept at `541946` (unchanged)
- [x] Punta Paloma (`13586`) replaced with Campo de Fútbol (`976270`)

#### 7.2.2 Widget Parameter Updates

- [x] Model changed from `m=3` to `m=100`
- [x] Forecast window extended from 168h (7-day) to 240h (10-day) via `fhours=240`
- [x] Added wave height (`FLHGT`), cloud cover (`CDC`), and precipitation (`APCP1s`) to data fields
- [x] Additional params: `ai=0`, `waj=m`, `tij=cm`, `odh=0`, `doh=24`, `hrsm=2`, `vt=forecasts`, `idbs=1`

#### 7.2.3 Translation Updates

- [x] `"puntaPaloma"` key replaced with `"campoDeFutbol"` in all 7 locale files (en, es, nl, de, fr, it, pt)

#### 7.2.4 Files Changed

- `src/components/weather/WindguruEmbed.tsx` -- spot IDs, widget params, spot key rename
- `src/types/types.ts` -- spot type updated
- `src/messages/en.json`, `es.json`, `nl.json`, `de.json`, `fr.json`, `it.json`, `pt.json` -- translation key rename

#### Phase 7.2 Quality Gate

- [x] Windguru widget loads with new spot IDs (48776, 541946, 976270)
- [x] Forecast shows 10-day (240h) window
- [x] Wave height, cloud cover, and precipitation visible in widget
- [x] "Campo de Futbol" appears as spot name in all 7 locales
- [x] No references to "Punta Paloma" or old spot ID 458886/13586 remain in code
- [x] Build passes with all changes

### Phase 7.3: Visual Design Upgrade - SVG Illustrations & Playful Shapes

**Goal:** Add hand-coded inline SVG illustrations and organic/playful shapes across all homepage sections
**Status:** Complete
**Date:** January 29, 2026

#### 7.3.1 Shared Foundation Components

- [x] `src/lib/constants/blob-paths.ts` — 6 pre-defined SVG blob path strings (blobA–blobF), 500×500 viewBox
- [x] `src/components/common/ShapedContainer.tsx` — Wrapper with blob (asymmetric border-radius), wave-edge (CSS clip-path polygon), and organic-circle variants; color props (ocean/sunset/sand/palm/driftwood)
- [x] `src/components/common/FloatingIllustration.tsx` — Absolutely positioned wrapper with Framer Motion translateY bob + slight rotate sway animation
- [x] `src/app/globals.css` — Added `.clip-wave-top`/`.clip-wave-bottom` utilities, `.blob-shadow`, `gentle-float` keyframes

#### 7.3.2 SVG Illustration Components

All in line-art style with 2px stroke, rounded caps, partial fills at low opacity using the beach color palette.

- [x] `src/components/illustrations/BeachIcons.tsx` — 8 named exports:
  - `HouseWithPalm` (Moving/QuickLink), `FirstAidSun` (Healthcare), `BookWithWave` (Schools), `LaptopBeach` (Coworking)
  - `Surfboard`, `BeachUmbrella`, `Sunglasses`, `CoffeeCup` (decorative accents)
  - Each 64×64 viewBox, accepts `className`, stroke in driftwood-500, accent fills at 20% opacity
- [x] `src/components/illustrations/KitesurferScene.tsx` — 800×400 animated hero SVG:
  - Kitesurfer silhouette, kite with sway animation, ocean waves with horizontal drift, sun rays with opacity pulse, seagulls with path animation, scattered clouds
- [x] `src/components/illustrations/CoastlineStrip.tsx` — 1200×150 panoramic line-art:
  - Rolling waves, distant wind turbines (rotating blades), kites in sky, beach outline, lighthouse hint, animated wave paths
- [x] `src/components/illustrations/TarifaSkyline.tsx` — 800×120 static whitewashed buildings:
  - Multiple buildings with terracotta roofs, mosque minaret, two palm trees, windows in ocean-200

#### 7.3.3 Homepage Section Updates

- [x] `HeroCarousel.tsx` — KitesurferScene layered behind text at 30% opacity with mix-blend-mode: soft-light; floating Surfboard accent at bottom-left
- [x] `QuickLinks.tsx` — Lucide icons replaced with BeachIcons in ShapedContainer blob wrappers (80×80); cards get clip-wave-bottom
- [x] `ConditionsWidget.tsx` — CoastlineStrip between title and data cards; floating Surfboard accent top-right
- [x] `ShopPreview.tsx` — Floating Sunglasses (top-left) + BeachUmbrella (bottom-right) at 15% opacity; wavy SVG underline accent on title
- [x] `PartnerSpotlight.tsx` — CoffeeCup accent above heading; TarifaSkyline at bottom at 30% opacity
- [x] `LocalNews.tsx` — Repeating wave pattern as background-image (inline SVG data URI, ocean-100 at ~4% fill-opacity)

#### 7.3.4 Decorative Blobs Between Sections

- [x] `src/app/[locale]/DecorativeBlobs.tsx` — Client component rendering organic blob SVGs
- [x] `src/app/[locale]/page.tsx` — DecorativeBlobs placed at two section boundaries (QuickLinks→Conditions, Shop→Partners)
- [x] Colors: ocean-100, sunset-300, palm-400, sand-300 at low opacity

#### 7.3.5 New Files (8)

| File | Purpose |
|------|---------|
| `src/lib/constants/blob-paths.ts` | 6 blob SVG path constants |
| `src/components/common/ShapedContainer.tsx` | Playful shape wrapper (blob/wave-edge/organic-circle) |
| `src/components/common/FloatingIllustration.tsx` | Positioned + animated illustration wrapper |
| `src/components/illustrations/BeachIcons.tsx` | 8 hand-coded SVG beach icons |
| `src/components/illustrations/KitesurferScene.tsx` | Animated hero kitesurfer scene |
| `src/components/illustrations/CoastlineStrip.tsx` | Panoramic coastline line-art |
| `src/components/illustrations/TarifaSkyline.tsx` | Whitewashed building skyline |
| `src/app/[locale]/DecorativeBlobs.tsx` | Decorative blob elements between sections |

#### 7.3.6 Modified Files (8)

| File | Changes |
|------|---------|
| `src/app/globals.css` | Wave clip-path utilities, blob shadow, float keyframes |
| `src/components/common/index.ts` | Barrel exports for ShapedContainer, FloatingIllustration |
| `src/components/home/HeroCarousel.tsx` | KitesurferScene + floating accents |
| `src/components/home/QuickLinks.tsx` | BeachIcons in blob containers, wavy-edge cards |
| `src/components/home/ConditionsWidget.tsx` | CoastlineStrip + floating accent |
| `src/components/home/ShopPreview.tsx` | FloatingIllustration accents + wavy underline |
| `src/components/home/PartnerSpotlight.tsx` | TarifaSkyline + CoffeeCup accent |
| `src/components/home/LocalNews.tsx` | Wave pattern background texture |
| `src/app/[locale]/page.tsx` | DecorativeBlobs between sections |

#### Phase 7.3 Quality Gate

- [x] `npm run build` passes with 0 errors
- [x] Every homepage section has at least one illustrated/decorative element
- [x] QuickLinks use blob-shaped icon containers instead of rectangular Lucide icons
- [x] Framer Motion animations use transform/opacity only (GPU-accelerated)
- [x] All decorative SVGs have `aria-hidden="true"`
- [x] Illustrations hidden or scaled appropriately on mobile (hidden md:block where needed)

---

## 10. Test Cases

### Unit Tests

```typescript
// tests/unit/shopify.test.ts
describe('Shopify MCP Client', () => {
  test('mcpRequest sends correct format', () => {});
  test('searchProducts handles empty results', () => {});
  test('Error handling works', () => {});
});

// tests/unit/weather.test.ts
describe('Weather API', () => {
  test('getWindForecast returns data', () => {});
  test('Handles API errors gracefully', () => {});
});

// tests/unit/i18n.test.ts
describe('Internationalization', () => {
  test('All locales have same keys', () => {});
  test('No missing translations', () => {});
});
```

### Integration Tests

```typescript
// tests/integration/pages.test.ts
describe('Page Integration', () => {
  test('Homepage loads all sections', () => {});
  test('Shop page fetches products', () => {});
  test('Conditions page loads weather', () => {});
  test('Directory page shows partners', () => {});
});

// tests/integration/api.test.ts
describe('API Routes', () => {
  test('/api/shopify/products returns data', () => {});
  test('/api/weather returns forecast', () => {});
  test('/api/newsletter validates email', () => {});
});
```

### E2E Tests (Playwright)

```typescript
// tests/e2e/user-journey.test.ts
describe('User Journey', () => {
  test('User can navigate site', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/Tarifa Lifestyle/);

    await page.click('text=Shop');
    await expect(page).toHaveURL(/\/shop/);

    await page.click('text=Conditions');
    await expect(page).toHaveURL(/\/conditions/);
  });

  test('User can change language', async ({ page }) => {
    await page.goto('/en');
    await page.click('[data-testid="language-switcher"]');
    await page.click('text=Español');
    await expect(page).toHaveURL(/\/es/);
  });

  test('User can subscribe to newsletter', async ({ page }) => {
    await page.goto('/');
    await page.fill('[data-testid="newsletter-email"]', 'test@example.com');
    await page.click('[data-testid="newsletter-submit"]');
    await expect(page.locator('[data-testid="newsletter-success"]')).toBeVisible();
  });
});
```

---

## 11. Context Management Strategy

### When to Clear Context

| Trigger | Action |
|---------|--------|
| Phase completion | Clear context, summarize state |
| 50+ files modified | Clear context, document progress |
| Major feature complete | Clear context, verify functionality |
| Error recovery needed | Clear context, restart from checkpoint |
| Memory issues | Clear context immediately |

### Subagent Usage

| Task Type | Agent Type | When to Use |
|-----------|------------|-------------|
| File exploration | Explore | Finding patterns, understanding codebase |
| Research | general-purpose | API documentation, best practices |
| Testing | general-purpose | Running test suites |
| Parallel tasks | Task (multiple) | Independent file creation |

### Context Clear Protocol

Before clearing context:

1. **Document current state** in this file or a STATUS.md
2. **List completed files** with checkmarks
3. **Note any blockers** or issues
4. **Specify next step** clearly

After clearing context, start with:

```
Resume implementation of Tarifalifestyle.com.
Read: IMPLEMENTATION-PLAN.md, STATUS.md (if exists)
Current phase: [X]
Next task: [specific task]
```

### Checkpoints

| Checkpoint | State to Save |
|------------|---------------|
| Phase 1 complete | Project scaffold, i18n configured |
| Phase 2 complete | CMS/API clients working |
| Phase 3 complete | All MVP pages rendering |
| Phase 4 complete | All integrations functional |
| Phase 5 complete | All translations done |
| Phase 6 complete | Ready for launch |
| Phase 7 complete | Post-MVP refinements applied |

---

## 12. File-by-File Implementation Order

### Critical Path (Must Complete in Order)

```
1. Project Setup
   └── create-next-app
   └── tailwind.config.ts
   └── Install dependencies

2. i18n Foundation
   └── src/i18n/routing.ts
   └── src/i18n/request.ts
   └── src/i18n/navigation.ts
   └── src/middleware.ts
   └── next.config.ts
   └── src/messages/en.json

3. Layout Foundation
   └── src/app/[locale]/layout.tsx
   └── src/components/layout/Header.tsx
   └── src/components/layout/Footer.tsx
   └── src/components/layout/MobileNav.tsx

4. API Clients
   └── src/lib/shopify/mcp-client.ts
   └── src/lib/weather/open-meteo.ts
   └── src/lib/sanity/client.ts

5. Core Components
   └── src/components/common/Section.tsx
   └── src/components/common/Container.tsx
   └── src/components/home/HeroCarousel.tsx

6. MVP Pages (in order)
   └── src/app/[locale]/page.tsx (Homepage)
   └── src/app/[locale]/conditions/page.tsx
   └── src/app/[locale]/shop/page.tsx
   └── src/app/[locale]/directory/page.tsx
   └── src/app/[locale]/about/page.tsx
```

### Parallel Workstreams

These can be developed independently:

```
Stream A: Shop Components
├── ProductCard.tsx
├── ProductGrid.tsx
├── CategoryFilter.tsx
└── CollectionBanner.tsx

Stream B: Weather Components
├── WindForecast.tsx
├── CurrentConditions.tsx
├── WindguruEmbed.tsx
└── BeachCamEmbed.tsx

Stream C: Partner Components
├── PartnerCard.tsx
├── PartnerDetail.tsx
├── ContactButtons.tsx
└── MapEmbed.tsx

Stream D: Sanity Schemas
├── partner.ts
├── guide.ts
├── homepageBlock.ts
└── category.ts
```

---

## 13. Quality Gates

### Gate 1: Project Foundation

| Requirement | Verification |
|-------------|--------------|
| Project builds | `npm run build` succeeds |
| No TS errors | `npm run type-check` passes |
| Lint passes | `npm run lint` passes |
| Dev server works | `npm run dev` serves pages |
| Basic routing | `/`, `/en`, `/es` all work |

### Gate 2: Infrastructure

| Requirement | Verification |
|-------------|--------------|
| Sanity connects | Query returns data |
| Shopify MCP works | Products returned |
| Weather API works | Forecast returned |
| API routes respond | All return valid JSON |

### Gate 3: MVP Pages

| Requirement | Verification |
|-------------|--------------|
| Homepage complete | All sections render |
| Conditions works | Weather displays |
| Shop works | Products from Shopify |
| Directory works | Partners display |
| Mobile responsive | Works at 375px |

### Gate 4: Integrations

| Requirement | Verification |
|-------------|--------------|
| Windguru loads | Widget displays |
| Beach cam works | Video plays |
| Maps load | Embeds display |
| Newsletter works | Form submits |

### Gate 5: i18n Complete

| Requirement | Verification |
|-------------|--------------|
| EN complete | All strings translated |
| ES complete | All strings translated |
| NL complete | All strings translated |
| hreflang correct | SEO validated |

### Gate 6: Launch Ready

| Requirement | Verification |
|-------------|--------------|
| Performance | Lighthouse > 90 |
| Accessibility | WCAG AA compliant |
| SEO | All meta tags present |
| No errors | Console clean |
| Analytics | Tracking verified |

### Gate 7: Post-MVP Refinements

| Requirement | Verification |
|-------------|--------------|
| Favicon displays | Wind icon SVG in browser tab |
| PWA manifest served | `/manifest.json` accessible |
| No newsletter on homepage | Section removed |
| No social links in footer | Instagram/Facebook removed |
| Navigation updated | "Fashion" tab, no orange shop button |
| Partner spotlight | 6 promoted businesses shown |
| About page updated | Positive cons, Sevilla airport |
| Kite gear banner | Visible on fashion/shop page |

### Gate 7.1: Refinements & Local News Feed

| Requirement | Verification |
|-------------|--------------|
| Hero button readable | "Check Conditions" visible on hero bg |
| Local news feed live | 4 articles from ciudaddetarifaalminuto.com on homepage |
| ISR active | Homepage revalidates every 30 minutes |
| Numero C in directory | Listed under food category |
| La Casa de la Luz in directory | Listed under education category |
| Tarifa Day Care in directory | Listed under education category |
| Original partners restored | Cafe Azul, Tarifa Language Academy, The Tax Point, Casa Tarifa Rentals, Chiringuito El Pirata |
| No competitors listed | No Freeride, Spin Out, La Cocotera |
| News translations | All 7 locale files updated |

### Gate 7.2: Windguru Forecast Updates

| Requirement | Verification |
|-------------|--------------|
| Spot IDs updated | Los Lances=48776, Valdevaqueros=541946, Campo de Futbol=976270 |
| Model updated | Widget uses m=100 |
| Forecast extended | 240h (10-day) window |
| Extra data fields | Wave height (FLHGT), cloud cover (CDC), precipitation (APCP1s) visible |
| Translation key renamed | "campoDeFutbol" in all 7 locale files |
| No stale references | No "puntaPaloma", 458886, or 13586 in codebase |

---

## 14. Troubleshooting Guide

### Common Issues

#### Shopify MCP Not Responding

```typescript
// Test MCP endpoint
const test = await fetch('https://tarifairforce.com/api/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/list',
    id: 1
  })
});
console.log(await test.json());
```

**Solutions:**
1. Verify store domain is correct (`tarifairforce.com` not `tarifaairforce.com`)
2. Check if store has MCP enabled (should be default)
3. Try from server-side (may be CORS blocked client-side)

#### i18n Routing Issues

**Symptoms:** 404 on locale routes, wrong language displayed

**Solutions:**
1. Verify middleware.ts is in correct location
2. Check matcher config includes all locales
3. Ensure routing.ts locales match middleware

#### Sanity Content Not Loading

**Solutions:**
1. Verify NEXT_PUBLIC_SANITY_PROJECT_ID is set
2. Check dataset name matches
3. Verify GROQ query syntax
4. Check language parameter is passed

#### Build Failures

```bash
# Clean and rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### Vercel Deployment Issues

```bash
# Check build logs
vercel logs

# Verify environment variables
vercel env ls
```

---

## Appendix: Quick Commands

```bash
# Development
npm run dev              # Start dev server
npm run build            # Production build
npm run start            # Production server
npm run lint             # Run ESLint
npm run type-check       # TypeScript check

# Sanity
cd sanity && npm run dev # Start Sanity Studio
npm run sanity:deploy    # Deploy Studio

# Testing
npm run test             # Run tests
npm run test:e2e         # E2E tests
npm run test:coverage    # Coverage report

# Deployment
vercel                   # Preview deployment
vercel --prod           # Production deployment

# Analysis
npm run analyze          # Bundle analysis
npx lighthouse https://tarifalifestyle.com # Performance
```

---

## Phase 7.4: Business Directory Upgrade

### Summary
Upgraded the business directory with consolidated partner data, individual detail pages, fixed external links, corrected nursery name, partner hero images, and updated navigation targets.

### New Files
- `src/data/partners.ts` — Shared `PartnerData` type, `PARTNERS` array (14 entries), helper functions (`getPartnerBySlug`, `getFeaturedPartners`, `getAllSlugs`)
- `src/app/[locale]/directory/[slug]/page.tsx` — Partner detail page (server component, `generateStaticParams`, `generateMetadata`, breadcrumbs)
- `src/components/partners/PartnerDetailContent.tsx` — Client component for detail page body (hero image, two-column layout, contact sidebar, map, back link)
- `public/images/partners/{slug}.svg` — 14 branded SVG placeholder hero images with category-themed gradients

### Modified Files
- `src/app/[locale]/directory/page.tsx` — Removed inline data, imports from `@/data/partners`
- `src/components/home/PartnerSpotlight.tsx` — Uses `getFeaturedPartners()` from shared data
- `src/components/home/QuickLinks.tsx` — "Schools" link changed from `/about` to `/directory`
- `src/app/sitemap.ts` — Added partner detail URLs via `getAllSlugs()`
- `src/components/partners/index.ts` — Added `MapEmbed` and `PartnerDetailContent` exports
- `src/messages/{en,es,nl,de,fr,it,pt}.json` — Added `Directory.detail` keys

### Data Fixes Applied
- "Tarifa Day Care" renamed to "La Tribu de la Luz" (Montessori family association)
- `tarifaspanish.com` website removed (DNS dead)
- `casatarifa.com` website removed (DNS dead)
- All other partner links verified working

---

**Document End**

*This implementation plan should be read alongside PRD.md, PRD-COMPACT.md, and Research.md*
