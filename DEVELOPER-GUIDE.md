# Developer Guide — Gnatta Immobiliare
# Guida completa per mettere mano al codice

---

## Indice

1. [Mappa del progetto — dove si trova cosa](#1-mappa-del-progetto)
2. [Come funziona il sistema di stile (Tailwind + CSS)](#2-sistema-di-stile)
3. [Modificare le pagine esistenti — prompt pronti](#3-modificare-le-pagine-esistenti)
4. [Aggiungere / rimuovere unità in vendita](#4-unità-in-vendita)
5. [Aggiungere / rimuovere realizzazioni](#5-realizzazioni)
6. [Aggiungere una nuova pagina](#6-nuova-pagina)
7. [Modificare Navbar e Footer](#7-navbar-e-footer)
8. [Animazioni — come funzionano e come cambiarle](#8-animazioni)
9. [SEO — dove si modifica](#9-seo)
10. [Immagini e video](#10-immagini-e-video)
11. [Mobile — cosa funziona e cosa va migliorato](#11-mobile)

---

## 1. Mappa del progetto

```
gnatta-site/
│
├── src/data/              ← CONTENUTI (JSON, editabili senza toccare codice)
│   ├── site.json          ← Dati azienda, hero, valori, stats, chi siamo
│   ├── properties.json    ← Unità in vendita (array)
│   └── realizzazioni.json ← Progetti completati (array)
│
├── src/pages/             ← UNA FILE = UNA PAGINA del sito
│   ├── index.astro        ← Homepage  →  gnatta.it/
│   ├── chi-siamo.astro    ← Chi siamo →  gnatta.it/chi-siamo
│   ├── contatti.astro     ← Contatti  →  gnatta.it/contatti
│   ├── 404.astro          ← Pagina errore
│   ├── unita-in-vendita/
│   │   ├── index.astro    ← Lista unità    → gnatta.it/unita-in-vendita
│   │   └── [id].astro     ← Dettaglio      → gnatta.it/unita-in-vendita/villa-collina
│   └── realizzazioni/
│       ├── index.astro    ← Lista progetti → gnatta.it/realizzazioni
│       └── [id].astro     ← Dettaglio      → gnatta.it/realizzazioni/complesso-aurora
│
├── src/components/        ← BLOCCHI RIUTILIZZABILI (usati dentro le pagine)
│   ├── Navbar.astro       ← Barra di navigazione (usata in tutte le pagine)
│   ├── Footer.astro       ← Piè di pagina (usato in tutte le pagine)
│   ├── Hero.astro         ← Sezione hero homepage
│   ├── StatsCounter.astro ← Contatori animati (25+ anni, 80+ progetti...)
│   ├── ValoriSection.astro← Sezione valori aziendali
│   ├── PropertyCard.astro ← Card singola unità in vendita
│   ├── RealizzioneCard.astro← Card singola realizzazione
│   ├── ImageGallery.astro ← Galleria immagini con thumbnails
│   └── ContactForm.astro  ← Form di contatto
│
├── src/layouts/
│   └── BaseLayout.astro   ← Struttura HTML base (head, navbar, footer, SEO)
│
└── src/styles/
    └── global.css         ← Design system: colori, font, bottoni, animazioni
```

**Regola d'oro**: se devi cambiare un contenuto → `src/data/`. Se devi cambiare come si vede una sezione → `src/components/` o `src/pages/`. Se devi cambiare colori/font globali → `src/styles/global.css`.

---

## 2. Sistema di stile

### Colori principali

Definiti in `tailwind.config.mjs` e `global.css`:

| Variabile Tailwind | Colore | Uso |
|---|---|---|
| `brand-400` | Oro chiaro `#e8bc7c` | Titoli accent, link hover |
| `brand-500` | Oro `#c8832a` | Badge, linee decorative, CTA |
| `stone-950` | Quasi nero `#0c0a09` | Sfondo principale |
| `stone-900` | Nero caldo `#1c1917` | Sfondo sezioni alternate |
| `stone-100` | Bianco caldo | Testi principali |
| `stone-400` | Grigio chiaro | Testi secondari |

### Font

| Classe | Font | Uso |
|---|---|---|
| `font-display` | Cormorant Garamond (serif) | Titoli h1, h2, h3 |
| `font-body` | Jost (sans-serif) | Testi, label, bottoni |

### Classi utility personalizzate (in `global.css`)

```css
.btn-primary   /* Bottone oro pieno */
.btn-outline   /* Bottone bordo trasparente */
.gold-line     /* Lineetta dorata decorativa sopra i titoli */
.form-input    /* Input form */
.badge-vendita / .badge-prossima / .badge-venduto  /* Badge status */
.reveal / .reveal-left / .reveal-right  /* Animazioni scroll */
.delay-100/200/300/400/500              /* Ritardi animazione */
```

---

## 3. Modificare le pagine esistenti

Per ogni pagina trovi sotto il **file da aprire** e un **prompt pronto da dare a Claude** per farlo modificare secondo le tue esigenze.

---

### Homepage (`src/pages/index.astro`)

**Cosa contiene**: Hero → Stats → Valori → Anteprima unità → Anteprima realizzazioni → CTA finale

**Per cambiare testi**: modifica `src/data/site.json` (sezione `hero`, `stats`, `values`)

**Prompt per refactor homepage:**
```
Apri il file src/pages/index.astro del progetto Astro Gnatta.
Voglio che tu modifichi la homepage secondo queste linee guida:

[INSERISCI QUI LE TUE RICHIESTE, esempio:]
- Aggiungi una nuova sezione "Perché sceglierci" tra i Valori e le Unità in vendita
- La sezione deve avere 3 colonne con icona, titolo e testo
- Usa lo stesso stile delle sezioni esistenti (sfondo stone-900, font-display per i titoli)
- Mantieni le animazioni scroll reveal già presenti

Il design system usa Tailwind. I colori principali sono brand-500 (oro) e stone-950 (sfondo).
Mantieni la struttura esistente e aggiungi solo la nuova sezione.
```

---

### Chi Siamo (`src/chi-siamo.astro`)

**Cosa contiene**: Header → Storia → Mission & Approccio → Timeline → CTA

**Per cambiare testi**: modifica `src/data/site.json` (sezione `aboutPage`)

**Prompt per refactor Chi Siamo:**
```
Apri il file src/pages/chi-siamo.astro del progetto Astro Gnatta.
Voglio modificare questa pagina secondo queste istruzioni:

[INSERISCI QUI, esempio:]
- Aggiungi una sezione "Il nostro team" con card per ogni membro
- Ogni card deve avere: foto (placeholder), nome, ruolo, breve bio
- Layout: griglia 3 colonne su desktop, 1 su mobile
- Aggiungila dopo la sezione Mission & Approccio

Mantieni lo stile esistente (font Cormorant Garamond per nomi, Jost per bio,
colori brand-500 per accenti). Usa reveal per animazioni scroll.
```

---

### Unità in Vendita — Lista (`src/pages/unita-in-vendita/index.astro`)

**Cosa contiene**: Header → Filtro status → Griglia card → CTA finale

**Prompt per refactor lista unità:**
```
Apri src/pages/unita-in-vendita/index.astro del progetto Astro Gnatta.

[esempio:]
- Aggiungi un filtro per tipo (Villa / Appartamento / Palazzina) oltre a quello per status
- Mostra il numero di risultati visibili dopo il filtro
- Aggiungi una vista "lista" alternativa alla griglia (toggle icona)

Il componente PropertyCard è in src/components/PropertyCard.astro.
I dati vengono da src/data/properties.json.
Usa solo Tailwind per gli stili. Mantieni le animazioni reveal.
```

---

### Unità in Vendita — Dettaglio (`src/pages/unita-in-vendita/[id].astro`)

**Cosa contiene**: Back link → Galleria → Descrizione → Features → Planimetrie → Sidebar unità + CTA

**Prompt per refactor dettaglio unità:**
```
Apri src/pages/unita-in-vendita/[id].astro del progetto Astro Gnatta.

[esempio:]
- Aggiungi una sezione "Classe energetica" con visualizzazione grafica A/B/C/D
- Aggiungi un box "Posizione" con mappa placeholder (iframe o immagine statica)
- Aggiungi breadcrumb in cima alla pagina (Home > Unità in vendita > [titolo])

I dati della proprietà sono nell'oggetto `property` (Astro.props).
I campi disponibili sono: id, title, location, status, type, description,
longDescription, features, units, images, coverImage.
Se serve aggiungere nuovi campi, aggiungili anche a src/data/properties.json.
```

---

### Realizzazioni — Lista (`src/pages/realizzazioni/index.astro`)

**Prompt per refactor lista realizzazioni:**
```
Apri src/pages/realizzazioni/index.astro del progetto Astro Gnatta.

[esempio:]
- Aggiungi un filtro per anno (2019, 2020, 2021, 2022...)
- Aggiungi un filtro per tipo (Residenziale / Ville Private / Commerciale)
- Implementa il filtro con JavaScript puro (niente framework)

I dati vengono da src/data/realizzazioni.json (campi: id, title, location,
year, type, description, images, coverImage).
Mantieni il design esistente con le classi Tailwind del progetto.
```

---

### Realizzazioni — Dettaglio (`src/pages/realizzazioni/[id].astro`)

**Prompt per refactor dettaglio realizzazione:**
```
Apri src/pages/realizzazioni/[id].astro del progetto Astro Gnatta.

[esempio:]
- Aggiungi una sezione "Dati tecnici" con tabella: superficie totale, n° unità,
  classe energetica, anno consegna, tipologia costruttiva
- Aggiungi in fondo "Condividi questo progetto" con link copia-URL

I dati disponibili sono nell'oggetto `realizzazione` (da Astro.props).
Se aggiungi nuovi campi alla tabella, aggiungili anche a src/data/realizzazioni.json.
```

---

### Contatti (`src/pages/contatti.astro`)

**Cosa contiene**: Header → Info (indirizzo/tel/email/orari/mappa) → Form

**Prompt per refactor contatti:**
```
Apri src/pages/contatti.astro del progetto Astro Gnatta.

[esempio:]
- Sostituisci il placeholder mappa con un vero iframe Google Maps
  (coordinate: inserisci tu lat/lng)
- Aggiungi un campo "Come ci hai conosciuto?" al form (select)
- Aggiungi integrazione form con Formspree: action="https://formspree.io/f/[tuo-id]"

Il form è nel componente src/components/ContactForm.astro.
I dati aziendali (indirizzo, telefono, email, orari) vengono da src/data/site.json.
```

---

### Hero (`src/components/Hero.astro`)

**Prompt per refactor Hero:**
```
Apri src/components/Hero.astro del progetto Astro Gnatta.

[esempio:]
- Sostituisci lo sfondo CSS con un video in autoplay muted loop
  (il file video sarà in public/video/hero.mp4)
- Aggiungi overlay scuro semi-trasparente sopra il video
- Mantieni tutto il testo e le animazioni esistenti
- Aggiungi un controllo mute/unmute in basso a destra

Il componente usa solo CSS per animazioni (niente GSAP).
Mantieni la stessa struttura HTML per non rompere il layout.
```

---

## 4. Unità in vendita

### Aggiungere una nuova unità

Apri `src/data/properties.json` e aggiungi un oggetto nell'array:

```json
{
  "id": "villa-lago",
  "title": "Villa Lago",
  "location": "Varese, VA",
  "status": "in-vendita",
  "statusLabel": "In Vendita",
  "type": "Villa Singola",
  "description": "Breve descrizione per la card (1-2 righe).",
  "longDescription": "Descrizione completa nella pagina di dettaglio. Puoi scrivere più paragrafi.",
  "features": [
    "Classe energetica A+",
    "Piscina privata",
    "Garage doppio"
  ],
  "units": [
    {
      "type": "Villa intera",
      "size": "300 mq",
      "floor": "2 livelli",
      "available": true
    }
  ],
  "images": [
    "https://link-immagine-1.jpg",
    "https://link-immagine-2.jpg"
  ],
  "coverImage": "https://link-immagine-copertina.jpg"
}
```

**Valori validi per `status`:**
- `"in-vendita"` → badge oro
- `"prossimamente"` → badge grigio
- `"venduto"` → badge scuro

⚠️ L'`id` deve essere **unico**, in minuscolo, senza spazi (usa `-` al posto degli spazi). Diventa l'URL: `/unita-in-vendita/villa-lago`.

### Rimuovere una unità

Cancella il blocco `{ ... }` corrispondente dal JSON. Attenzione alle virgole: l'ultimo elemento dell'array non deve avere la virgola finale.

### Cambiare lo status

```json
"status": "venduto",
"statusLabel": "Venduto"
```

---

## 5. Realizzazioni

### Aggiungere una nuova realizzazione

Apri `src/data/realizzazioni.json` e aggiungi:

```json
{
  "id": "residenza-park",
  "title": "Residenza Park",
  "location": "Como, CO",
  "year": "2024",
  "type": "Residenziale",
  "description": "Descrizione del progetto completato. Cosa è stato costruito, quante unità, caratteristiche principali.",
  "images": [
    "https://link-immagine-1.jpg",
    "https://link-immagine-2.jpg"
  ],
  "coverImage": "https://link-immagine-copertina.jpg"
}
```

**Valori comuni per `type`:** `"Residenziale"`, `"Ville Private"`, `"Commerciale"`, `"Ristrutturazione"`

### Rimuovere una realizzazione

Cancella il blocco corrispondente dal JSON.

---

## 6. Aggiungere una nuova pagina

### Pagina semplice (es. "Servizi")

1. Crea il file `src/pages/servizi.astro`
2. Usa questo template:

```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Servizi" description="Descrizione per SEO">

  <!-- Header pagina (uguale alle altre) -->
  <section class="relative pt-40 pb-24"
           style="background: linear-gradient(135deg, #0c0a09 0%, #1c1510 100%);">
    <div class="relative max-w-7xl mx-auto px-6 lg:px-8">
      <span class="gold-line"></span>
      <h1 class="font-display text-7xl text-stone-100 font-light leading-none mb-6">
        I Nostri <em class="text-brand-400 not-italic">Servizi</em>
      </h1>
    </div>
  </section>

  <!-- Contenuto -->
  <section class="bg-stone-950 py-24">
    <div class="max-w-7xl mx-auto px-6 lg:px-8">
      <!-- Il tuo contenuto qui -->
    </div>
  </section>

</BaseLayout>
```

3. Aggiungi il link in `src/components/Navbar.astro` (array `navLinks`) e `src/components/Footer.astro`

**Prompt per creare una nuova pagina:**
```
Nel progetto Astro Gnatta, crea una nuova pagina src/pages/servizi.astro.

La pagina deve contenere:
[descrivi le sezioni che vuoi]

Usa lo stesso stile delle altre pagine:
- BaseLayout come layout base
- Header con sfondo gradient scuro e titolo font-display
- Sezioni alternate bg-stone-950 e bg-stone-900
- Animazioni .reveal per scroll
- Font: font-display per titoli, font-body per testi
- Accenti colore: brand-400/brand-500

Aggiungi anche il link "Servizi" nell'array navLinks di src/components/Navbar.astro.
```

---

## 7. Navbar e Footer

### Aggiungere una voce di menu

In `src/components/Navbar.astro`, trova l'array `navLinks` e aggiungi:

```js
const navLinks = [
  { label: 'Chi Siamo', href: '/chi-siamo' },
  { label: 'Servizi', href: '/servizi' },  // ← aggiunta
  ...
];
```

Lo stesso array va aggiornato manualmente nel Footer (`src/components/Footer.astro`).

### Cambiare dati aziendali nel footer

Vengono letti da `src/data/site.json` → sezione `company`. Cambiare lì aggiorna footer automaticamente.

---

## 8. Animazioni

### Come funzionano le animazioni scroll

In `global.css` ci sono tre classi:

```css
.reveal        /* fade up dal basso */
.reveal-left   /* slide da sinistra */
.reveal-right  /* slide da destra */
```

Aggiungendo `.visible` (fatto automaticamente dall'IntersectionObserver in `BaseLayout.astro`) si attiva l'animazione.

**Come usarle:**
```html
<div class="reveal">Questo appare dal basso quando si scrolla</div>
<div class="reveal delay-200">Questo appare 200ms dopo</div>
<div class="reveal-left delay-400">Questo slide da sinistra con 400ms di ritardo</div>
```

**Ritardi disponibili:** `delay-100`, `delay-200`, `delay-300`, `delay-400`, `delay-500`

### Cambiare la velocità delle animazioni

In `global.css`:

```css
.reveal {
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
  /* Cambia 0.8s per velocizzare o rallentare */
}
```

### Disabilitare un'animazione

Rimuovi la classe `.reveal` dall'elemento HTML.

---

## 9. SEO

### Titolo e descrizione di ogni pagina

Ogni pagina usa `BaseLayout` con queste props:

```astro
<BaseLayout
  title="Titolo Pagina"           ← appare nel tag <title> e OG
  description="Descrizione SEO"  ← appare in meta description e OG
  ogImage="/images/og-page.jpg"  ← immagine per social (opzionale)
>
```

### Dati strutturati (JSON-LD)

Definiti in `src/layouts/BaseLayout.astro`. Attualmente c'è solo `RealEstateAgent`. Per aggiungere `LocalBusiness` o `Product` per le singole unità, modifica il blocco `<script type="application/ld+json">` nel layout.

### Sitemap

Generata automaticamente al build da `@astrojs/sitemap`. Disponibile su `/sitemap-index.xml`.

---

## 10. Immagini e video

### Dove mettere le immagini

**Opzione A (consigliata per il cliente):** URL esterno
```json
"coverImage": "https://res.cloudinary.com/tuo-account/image/upload/v1/gnatta/villa.jpg"
```

**Opzione B (file nel progetto):**
1. Metti il file in `public/images/nome-file.jpg`
2. Nel JSON usa: `"coverImage": "/images/nome-file.jpg"`

### Formati consigliati

| Formato | Uso |
|---|---|
| `.webp` | Foto (miglior compressione, 80% delle immagini) |
| `.jpg` | Foto quando webp non è disponibile |
| `.svg` | Icone, loghi, illustrazioni |
| `.mp4` | Video hero (H.264, max 10MB) |

### Aggiungere un video Hero

In `src/components/Hero.astro`, sostituisci la sezione sfondo con:

```astro
<!-- Video background -->
<video
  autoplay muted loop playsinline
  class="absolute inset-0 w-full h-full object-cover opacity-40"
  poster="/images/hero-poster.jpg"
>
  <source src="/video/hero.mp4" type="video/mp4" />
</video>
```

Metti `hero.mp4` in `public/video/` e `hero-poster.jpg` in `public/images/`.

---

## 11. Mobile — cosa funziona e cosa va migliorato

### ✅ Cosa funziona già bene su mobile

- **Navbar**: menu hamburger funzionante, si apre/chiude correttamente
- **CTA buttons**: `flex-col sm:flex-row` — si impilano verticalmente su mobile
- **Griglie**: tutte usano `grid-cols-1` su mobile → `md:grid-cols-2` → `lg:grid-cols-3/4`
- **Padding**: `px-6` su mobile, `lg:px-8` su desktop
- **Form contatti**: layout singola colonna su mobile, doppio su `md:`

### ⚠️ Aree che potrebbero beneficiare di ottimizzazioni

**1. Titoli Hero troppo grandi su mobile piccolo**

Il titolo usa `text-6xl md:text-8xl lg:text-9xl`. Su iPhone SE (375px) il `text-6xl` (3.75rem / 60px) potrebbe tagliare il testo. Soluzione:

```html
<!-- Da: -->
class="font-display text-6xl md:text-8xl lg:text-9xl"

<!-- A: -->
class="font-display text-5xl sm:text-6xl md:text-8xl lg:text-9xl"
```

**2. Titoli sezione su mobile**

I titoli `text-5xl md:text-6xl` nelle sezioni interne (Valori, Unità, ecc.) vanno bene, ma su schermi 320px potrebbero essere troppo grandi. Soluzione:

```html
class="font-display text-4xl sm:text-5xl md:text-6xl"
```

**3. Stats counter su mobile**

La griglia `grid-cols-2 lg:grid-cols-4` è corretta, ma i numeri `text-6xl md:text-7xl` potrebbero strabordare su schermi molto piccoli. Soluzione:

```html
class="font-display text-5xl md:text-6xl lg:text-7xl"
```

**4. Timeline Chi Siamo**

La timeline usa `md:flex-row` per alternare sinistra/destra. Su mobile si linearizza correttamente in colonna, ma visivamente potrebbe sembrare piatta senza la linea verticale centrale (nascosta su mobile con `hidden md:block`). Considerare di aggiungere una linea sinistra su mobile.

**5. Gallery su mobile**

Le thumbnail della gallery sono in griglia `grid-cols-4`. Su telefoni piccoli le 4 colonne potrebbero rendere le thumbnails troppo piccole per essere cliccabili (< 44px target). Soluzione:

```html
class="grid grid-cols-3 sm:grid-cols-4 gap-3"
```

### Prompt per fix mobile completo

```
Nel progetto Astro Gnatta, applica i seguenti fix per migliorare
l'esperienza mobile (< 640px):

1. In src/components/Hero.astro:
   - Cambia il titolo h1 da text-6xl a "text-5xl sm:text-6xl md:text-8xl lg:text-9xl"

2. In src/components/StatsCounter.astro:
   - Cambia i numeri da text-6xl md:text-7xl a "text-5xl md:text-6xl lg:text-7xl"

3. In src/components/ImageGallery.astro:
   - Cambia le thumbnail da grid-cols-4 a "grid-cols-3 sm:grid-cols-4"

4. In src/pages/chi-siamo.astro e tutte le pagine con titoli h2 text-5xl md:text-6xl:
   - Aggiungi text-4xl come breakpoint base: "text-4xl sm:text-5xl md:text-6xl"

5. In src/pages/chi-siamo.astro, nella timeline mobile:
   - Aggiungi una linea verticale sinistra visibile solo su mobile (hidden md:hidden)
   - Usa border-l border-brand-700 sul container della timeline

Mantieni tutti gli altri stili invariati. Usa solo classi Tailwind esistenti.
```

---

## Note finali

- **Non toccare mai `dist/`** — è generata automaticamente dal build
- **Dopo ogni modifica al codice** fai push su GitHub e Cloudflare Pages si aggiorna da solo
- **Per modifiche solo ai JSON** il sito si aggiorna al prossimo deploy (o triggera il deploy manualmente da Cloudflare dashboard)
- **Per testare in locale**: `npm run dev` — le modifiche si vedono in tempo reale senza rebuild
