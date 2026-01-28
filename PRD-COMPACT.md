# Tarifalifestyle.com - Compact PRD

**Updated:** January 29, 2026 (Phase 7.2 updates applied)

## Overview

**What:** Multilingual expat resource website for Tarifa, Spain
**Who:** Expats, digital nomads, kite enthusiasts considering/living in Tarifa
**Why:** No single trusted source exists connecting lifestyle + practical expat info

---

## Tech Stack

```
Framework:    Next.js 14+ (App Router)
Styling:      Tailwind CSS + shadcn/ui
CMS:          Sanity.io (headless)
i18n:         next-intl
Deployment:   Vercel
Analytics:    GA4 + Vercel Analytics
```

---

## Languages (7)

`en` | `es` | `nl` | `de` | `fr` | `it` | `pt`

---

## Design

**Style:** Tarifa meets Bali - bohemian beach aesthetic
**Colors:** Ocean blue (#1E88E5), sandy beige (#F5E6D3), sunset orange (#FF7043), palm green (#4CAF50)
**Vibe:** Golden hour photography, organic shapes, wave patterns

---

## Core Pages

| Page | Purpose |
|------|---------|
| `/` | Hero, conditions, fashion preview, partners, local news feed (ISR 30min, no newsletter) |
| `/about` | Tarifa intro, cost of living, pros/cons (positive spin), airports (incl. Sevilla 2h) |
| `/conditions` | Live wind/weather/beach cams |
| `/fashion` | Tarifa Air Force products + kite gear promo banner (renamed from "Shop") |
| `/directory` | Partner businesses with map, promoted spotlight |
| `/guides/*` | Moving, healthcare, education, working |
| `/lifestyle` | Kite spots, activities, dining |
| `/community` | Events, news, expat stories |

---

## Shopify Integration (UPDATED - Research Complete)

### Discovery: Storefront MCP (No Auth Required!)

Every Shopify store has a built-in MCP endpoint requiring **NO authentication**:

```
https://tarifairforce.com/api/mcp
```

### Integration Priority

| Priority | Method | Auth | Use Case |
|----------|--------|------|----------|
| **1. Storefront MCP** | JSON-RPC | None | Product search, catalog |
| 2. Admin API | Server-side | Yes | Inventory, advanced queries |
| 3. Static Fallback | Manual | None | If APIs fail |

### Tier 1: Storefront MCP (PRIMARY - No Auth!)

```typescript
// Simple product fetch - NO API KEY NEEDED
const response = await fetch('https://tarifairforce.com/api/mcp', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    jsonrpc: '2.0',
    method: 'tools/call',
    id: Date.now(),
    params: {
      name: 'search_shop_catalog',
      arguments: {
        query: 'kitesurf',
        context: 'Beach lifestyle products'
      }
    }
  })
});
```

### Tier 2: Admin API (Fallback)
```env
SHOPIFY_CLIENT_ID=<your-shopify-client-id>
SHOPIFY_SECRET=<your-shopify-secret>
SHOPIFY_STORE=tarifairforce.com
```
- Server Components / API Routes ONLY
- Use for inventory checks, advanced filtering

### Product Display
- Product cards with images, prices, sizes
- "Shop Now" → links to tarifairforce.com
- UTM tracking: `?utm_source=tarifalifestyle`
- No on-site checkout (redirect model)

---

## Partner Integrations (Research Complete)

| Partner | URL | Integration | Contact |
|---------|-----|-------------|---------|
| **Tarifa Air Force** | tarifairforce.com | **Storefront MCP** | Promoted |
| Tarifa Kite Repair | tarifakiterepair.com | WhatsApp chat | Promoted |
| TAF Coworking | taf-coworking.com | Quote form | Promoted |
| Explora Watersports | explorawatersportstarifa.com | Booking widget | Promoted |
| Stoked Surf Bar | Google Maps | Profile + Glovo | Promoted |
| Surfr App | App stores | Download links | Promoted |
| La Casa de la Luz | lacasadelaluztarifa.com | Contact form | lighthouse@... |
| Cafe Azul | - | Profile card | Restored |
| Tarifa Language Academy | - | Profile card | Restored |
| The Tax Point | - | Profile card | Restored |
| Casa Tarifa Rentals | - | Profile card | Restored |
| Chiringuito El Pirata | - | Profile card | Restored |
| Espresso Bar Numero C | - | Profile card (food) | New in 7.1 |
| Tarifa Day Care | - | Map embed (education) | New in 7.1 |
| **Ciudad de Tarifa** | ciudaddetarifaalminuto.com | **RSS feed -- live on homepage (LocalNews component)** | - |

### Weather/Wind Widgets

| Service | Type | Spot IDs / Config |
|---------|------|-------------------|
| **Windguru** | Widget embed | 48776 (Los Lances), 541946 (Valdevaqueros), 976270 (Campo de Fútbol) -- model m=100, 240h (10-day), includes wave/cloud/precip |
| **Open-Meteo** | API (free) | Lat: 36.014, Lon: -5.604 |
| **Windy.com** | Map + webcam | Embed URL available |

---

## Essential Info Pages

- Emergency numbers (112, 091, 092, 080, 061)
- Healthcare (Centro de Salud, Hospital Punta Europa)
- Town hall (Ayuntamiento Tarifa)
- NIE/Empadronamiento process
- Consulates (UK, German, Dutch, French)

---

## Research Checklist

### Shopify ✅ COMPLETE
- [x] Approach: **Storefront MCP (no auth!)** + Admin API fallback
- [x] Endpoint: `https://tarifairforce.com/api/mcp`
- [x] Tools: `search_shop_catalog`, `get_cart`, `update_cart`
- [ ] Test MCP connection
- [ ] Identify products to feature

### Weather/Conditions ✅ COMPLETE
- [x] Windguru: Spot IDs 48776 (Los Lances), 541946 (Valdevaqueros), 976270 (Campo de Fútbol) -- model m=100, 240h/10-day forecast, wave/cloud/precip data
- [x] **Open-Meteo API** (free, no key) - RECOMMENDED
- [x] Windy.com embed for visual maps
- [x] Beach cams via Windy webcams
- [ ] Implement weather components

### CMS ✅ COMPLETE
- [x] Sanity.io with hybrid translation approach
- [x] Document-level: guides, FAQs
- [x] Field-level: partners, homepage blocks
- [x] Plugins: `@sanity/document-internationalization`, `sanity-plugin-internationalized-array`
- [ ] Set up Sanity project
- [ ] Create schemas

### i18n ✅ COMPLETE
- [x] next-intl with App Router
- [x] URL structure: `/[locale]/...`
- [x] Middleware for locale detection
- [x] hreflang in generateMetadata
- [ ] Create translation files
- [ ] Implement language switcher

### Design ✅ COMPLETE
- [x] Color palette defined (ocean, sand, sunset, palm, driftwood)
- [x] Typography: Playfair Display, Inter, Pacifico
- [x] shadcn/ui components selected
- [x] Framer Motion animation patterns
- [ ] Source Tarifa photography
- [ ] Build component library

---

## MVP Scope

**Must Have:**
- Homepage with hero + key sections
- Live conditions (Windguru + Spotfav)
- Shop page (Shopify products)
- Partner directory
- Basic guides (moving, healthcare)
- 3 languages (en, es, nl)
- Mobile responsive

**Nice to Have:**
- All 7 languages
- ~~News feed integration~~ ✅ Live on homepage (Phase 7.1)
- Event calendar

**Post-MVP:**
- User accounts
- Reviews/ratings
- PWA features (manifest already created)

---

## Success Metrics

| Metric | 3-month | 12-month |
|--------|---------|----------|
| Monthly visitors | 2,000 | 10,000 |
| Partner clicks | 200/mo | 500/mo |
| Returning visitors | 500/mo | 2,000/mo |
| Fashion/shop clicks | 100/mo | 300/mo |

---

## Next Steps

1. ~~Decide Shopify approach~~ ✅ Storefront MCP (no auth!)
2. ~~Research integrations~~ ✅ See Research.md
3. Set up Next.js project scaffold
4. Test Shopify MCP connection
5. Create Sanity CMS project + schemas
6. Build core components (design system)
7. Implement i18n with next-intl
8. Build MVP pages
9. Source photography
10. Launch

---

## Quick Reference

```
Domain:           tarifalifestyle.com
Shopify Store:    tarifairforce.com
Shopify MCP:      https://tarifairforce.com/api/mcp (NO AUTH!)
Deploy:           Vercel
Tarifa Coords:    36.014, -5.604
Favicon:          /src/app/icon.svg (wind icon SVG)
PWA Manifest:     /src/app/manifest.ts
Social Links:     None (Instagram/Facebook removed)
```

**Key Docs:**
- Shopify Storefront MCP: https://shopify.dev/docs/apps/build/storefront-mcp
- next-intl: https://next-intl.dev/docs/getting-started/app-router
- Sanity i18n: https://www.sanity.io/docs/localization
- Open-Meteo: https://open-meteo.com/en/docs
- Windguru Widgets: https://www.windguru.cz/help.php?sec=distr
- shadcn/ui: https://ui.shadcn.com/
- Framer Motion: https://www.framer.com/motion/

**Project Files:**
- PRD.md - Full requirements document
- PRD-COMPACT.md - Quick reference (this file)
- Research.md - Technical research findings
