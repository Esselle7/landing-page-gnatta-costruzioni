# Costruzioni Gnatta — Sito Web

Sito web immobiliare premium costruito con **Astro 4**, **Tailwind CSS** e animazioni scroll-based. Deployato su **Cloudflare Pages**.

---

## Stack tecnologico

| Layer | Tecnologia |
|-------|-----------|
| Framework | Astro 4 (SSG) |
| Stile | Tailwind CSS |
| Animazioni | CSS custom (scroll reveal, counters) |
| Test | Vitest |
| Deploy | Cloudflare Pages |
| CMS | File JSON editabili (`src/data/`) |

---

## Struttura del progetto

```
gnatta-site/
├── public/                    # Asset statici
│   ├── favicon.svg
│   ├── _headers               # Security headers Cloudflare
│   └── _redirects             # Redirect rules Cloudflare
├── src/
│   ├── components/            # Componenti Astro riutilizzabili
│   │   ├── Navbar.astro
│   │   ├── Footer.astro
│   │   ├── Hero.astro
│   │   ├── StatsCounter.astro
│   │   ├── ValoriSection.astro
│   │   ├── PropertyCard.astro
│   │   ├── RealizzioneCard.astro
│   │   ├── ImageGallery.astro
│   │   └── ContactForm.astro
│   ├── layouts/
│   │   └── BaseLayout.astro   # Layout base con SEO completo
│   ├── pages/                 # Pagine del sito
│   │   ├── index.astro        # Homepage
│   │   ├── chi-siamo.astro
│   │   ├── contatti.astro
│   │   ├── 404.astro
│   │   ├── unita-in-vendita/
│   │   │   ├── index.astro
│   │   │   └── [id].astro     # Pagina dinamica singola unità
│   │   └── realizzazioni/
│   │       ├── index.astro
│   │       └── [id].astro     # Pagina dinamica singola realizzazione
│   ├── data/                  # ← CONTENUTI MODIFICABILI (CMS)
│   │   ├── site.json          # Dati aziendali, hero, valori, stats
│   │   ├── properties.json    # Unità in vendita
│   │   └── realizzazioni.json # Progetti completati
│   └── styles/
│       └── global.css         # Design system + animazioni
└── tests/
    ├── data.test.ts           # Test integrità dati JSON
    └── utils.test.ts          # Test validazione form + utilities
```

---

## Installazione

```bash
# 1. Clona il repository
git clone https://github.com/tuoutente/gnatta-site.git
cd gnatta-site

# 2. Installa le dipendenze
npm install

# 3. Avvia il server di sviluppo
npm run dev
# Apri http://localhost:4321
```

---

## Deploy su Cloudflare Pages

### Prima configurazione

1. Fai push del progetto su GitHub
2. Accedi a [dash.cloudflare.com](https://dash.cloudflare.com)
3. Vai su **Pages → Create a project → Connect to Git**
4. Seleziona il repository
5. Configura:
   - **Framework preset**: Astro
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`

### Deploy automatico

Ogni push sul branch `main` triggera automaticamente un nuovo deploy.

---

## Comandi utili

```bash
npm run dev        # Server locale con hot reload
npm run build      # Build di produzione
npm run preview    # Anteprima build locale
npm run test       # Esegui i test
npm run test:ui    # Test con interfaccia visuale
```

---

## Aggiornamento contenuti

Vedi **GUIDA-CONTENUTI.md** per istruzioni passo-passo su come modificare testi e immagini.
