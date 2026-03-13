# Architecture Design — Gnatta Immobiliare

## Overview

Il sito è costruito come **Static Site Generation (SSG)** con Astro 4.  
Tutto il HTML viene generato al momento del build — non c'è server-side rendering runtime.  
Questo garantisce massime performance e compatibilità con Cloudflare Pages (CDN edge-first).

---

## Stack decisionale

### Perché Astro?

Astro è il framework ottimale per siti content-driven:
- **Zero JS by default**: ogni componente Astro è puro HTML+CSS senza JavaScript runtime
- **Island architecture**: JS solo dove serve (form, gallery, counters)
- **Build-time data fetching**: i file JSON vengono letti una volta al build
- **Lighthouse 90+** out of the box

### Perché JSON come CMS?

Per un proprietario non tecnico, la soluzione più robusta e senza dipendenze esterne è **file JSON editabili direttamente su GitHub**:

```
Cliente modifica JSON su GitHub → GitHub Actions → Cloudflare Pages rebuild → sito aggiornato in ~60s
```

Vantaggi:
- Zero costi mensili (nessun SaaS CMS)
- Nessun account aggiuntivo da gestire
- Rollback immediato via git
- Backup automatico nella history git

Alternativa futura: integrare **TinaCMS** o **Decap CMS** per un'interfaccia visuale più semplice, senza cambiare la struttura dati.

---

## Data Flow

```
src/data/*.json
       │
       ▼
Astro build (SSG)
       │
  ┌────┴────┐
  │  Pages  │
  │ (Astro) │
  └────┬────┘
       │
  Static HTML
       │
  Cloudflare Pages CDN
       │
  Browser (0ms TTFB da edge)
```

---

## Component Architecture

### Layout Layer

```
BaseLayout.astro
  ├── <head> SEO (title, description, OG, JSON-LD)
  ├── Navbar.astro (sticky, scroll-aware)
  ├── <slot /> (page content)
  └── Footer.astro
```

### Page Layer

| Pagina | Route | Dynamic? |
|--------|-------|----------|
| Home | `/` | No |
| Chi Siamo | `/chi-siamo` | No |
| Unità listing | `/unita-in-vendita` | No |
| Unità detail | `/unita-in-vendita/[id]` | Sì (da properties.json) |
| Realizzazioni listing | `/realizzazioni` | No |
| Realizzazione detail | `/realizzazioni/[id]` | Sì (da realizzazioni.json) |
| Contatti | `/contatti` | No |
| 404 | `/404` | No |

### Component Layer

```
Hero.astro
  ├── Animazioni CSS-only (fadeUp, fadeIn)
  ├── Grid pattern decorativo
  └── Scroll indicator

StatsCounter.astro
  ├── IntersectionObserver per trigger
  └── requestAnimationFrame counter (easeOutExpo)

ValoriSection.astro
  └── Card grid con hover animations

PropertyCard.astro
  ├── Immagine con zoom on hover
  ├── Status badge (in-vendita / prossimamente / venduto)
  └── Link a pagina dettaglio

ImageGallery.astro
  ├── Main image display
  ├── Thumbnail strip
  └── Keyboard navigation (← →)

ContactForm.astro
  ├── Client-side validation
  ├── Async submit (pronto per API)
  └── States: idle / loading / success / error
```

---

## Animation Strategy

**Principio**: animazioni che migliorano la percezione di qualità senza penalizzare performance.

### Scroll Reveal

```javascript
// IntersectionObserver globale in BaseLayout
// Classes: .reveal, .reveal-left, .reveal-right
// Delays: .delay-100 → .delay-500
```

Nessuna libreria esterna — pure CSS transitions attivate dall'observer.

### Hero animations

CSS `@keyframes` con `animation-delay` progressivi per stagger effect:
- Eyebrow: 0.2s delay
- H1: 0.4s delay
- Subheadline: 0.6s delay
- CTAs: 0.8s delay

### Counter animation

```javascript
// easeOutExpo: 1 - Math.pow(2, -10 * progress)
// requestAnimationFrame per 60fps
// IntersectionObserver per trigger on scroll
```

---

## SEO Implementation

### Per ogni pagina

```html
<title>{title} | Costruzioni Gnatta</title>
<meta name="description" content="..." />
<link rel="canonical" href="..." />

<!-- Open Graph -->
<meta property="og:title" content="..." />
<meta property="og:description" content="..." />
<meta property="og:image" content="..." />

<!-- Structured Data -->
<script type="application/ld+json">
  { "@type": "RealEstateAgent", ... }
</script>
```

### Sitemap

Generato automaticamente da `@astrojs/sitemap` al build — disponibile su `/sitemap-index.xml`.

---

## Performance Budget

| Metrica | Target | Strategia |
|---------|--------|-----------|
| LCP | < 2.5s | Immagini lazy loading, font preconnect |
| FID | < 100ms | Minimal JS, nessun framework UI |
| CLS | < 0.1 | Dimensioni immagini esplicite |
| TTI | < 3.5s | SSG, zero hydration overhead |
| Bundle JS | < 50kb | Nessuna dipendenza runtime grande |

---

## Deploy Pipeline

```
git push main
     │
     ▼
Cloudflare Pages Build
  npm run build
  → dist/
     │
     ▼
CDN Distribution
  100+ edge locations worldwide
     │
     ▼
costruzioni-gnatta.it live
```

Build time stimato: ~30-45 secondi.

---

## Estensioni future

### Form backend (prossimo step)

Il `ContactForm.astro` è pronto per integrarsi con:

```javascript
// Opzione A: Cloudflare Workers (serverless)
const response = await fetch('/api/contact', {
  method: 'POST',
  body: JSON.stringify(formData),
});

// Opzione B: Resend / SendGrid API
// Opzione C: Zapier webhook
// Opzione D: Formspree (zero config)
```

### CMS visuale

Quando la frequenza di aggiornamenti aumenta, si può integrare:

1. **TinaCMS**: si connette al repo GitHub, fornisce UI React sopra i JSON esistenti
2. **Decap CMS**: simile, open source, compatibile Cloudflare Pages
3. **Sanity**: headless CMS completo, richiede migrazione dati

La struttura JSON attuale è pensata per essere compatibile con entrambi senza refactoring.

### i18n

L'architettura supporta nativamente l'internazionalizzazione con Astro i18n routing (`/it/`, `/en/`).
