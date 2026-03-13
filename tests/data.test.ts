import { describe, it, expect } from 'vitest';
import properties from '../src/data/properties.json';
import realizzazioni from '../src/data/realizzazioni.json';
import siteData from '../src/data/site.json';

// ─── Data Integrity Tests ───────────────────────────────────────────────────

describe('site.json', () => {
  it('has required company fields', () => {
    const { company } = siteData;
    expect(company.name).toBeTruthy();
    expect(company.email).toContain('@');
    expect(company.phone).toBeTruthy();
    expect(company.address).toBeTruthy();
  });

  it('has stats array with correct shape', () => {
    const { stats } = siteData;
    expect(Array.isArray(stats)).toBe(true);
    expect(stats.length).toBeGreaterThan(0);
    stats.forEach((stat) => {
      expect(typeof stat.value).toBe('number');
      expect(typeof stat.label).toBe('string');
      expect(typeof stat.suffix).toBe('string');
    });
  });

  it('has values array with required fields', () => {
    const { values } = siteData;
    expect(Array.isArray(values)).toBe(true);
    values.forEach((value) => {
      expect(value.icon).toBeTruthy();
      expect(value.title).toBeTruthy();
      expect(value.description).toBeTruthy();
    });
  });

  it('has hero with required fields', () => {
    const { hero } = siteData;
    expect(hero.headline).toBeTruthy();
    expect(hero.subheadline).toBeTruthy();
    expect(hero.ctaPrimary.href).toMatch(/^\//);
    expect(hero.ctaSecondary.href).toMatch(/^\//);
  });

  it('has aboutPage with timeline', () => {
    const { aboutPage } = siteData;
    expect(aboutPage.title).toBeTruthy();
    expect(aboutPage.story).toBeTruthy();
    expect(Array.isArray(aboutPage.timeline)).toBe(true);
    aboutPage.timeline.forEach((item) => {
      expect(item.year).toBeTruthy();
      expect(item.event).toBeTruthy();
    });
  });
});

describe('properties.json', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(properties)).toBe(true);
    expect(properties.length).toBeGreaterThan(0);
  });

  it('each property has required fields', () => {
    properties.forEach((p) => {
      expect(p.id).toBeTruthy();
      expect(p.title).toBeTruthy();
      expect(p.location).toBeTruthy();
      expect(p.status).toBeTruthy();
      expect(p.statusLabel).toBeTruthy();
      expect(p.type).toBeTruthy();
      expect(p.description).toBeTruthy();
      expect(p.longDescription).toBeTruthy();
      expect(p.coverImage).toBeTruthy();
    });
  });

  it('each property has valid status', () => {
    const validStatuses = ['in-vendita', 'prossimamente', 'venduto'];
    properties.forEach((p) => {
      expect(validStatuses).toContain(p.status);
    });
  });

  it('each property has at least one image', () => {
    properties.forEach((p) => {
      expect(Array.isArray(p.images)).toBe(true);
      expect(p.images.length).toBeGreaterThan(0);
    });
  });

  it('each property has at least one unit', () => {
    properties.forEach((p) => {
      expect(Array.isArray(p.units)).toBe(true);
      expect(p.units.length).toBeGreaterThan(0);
      p.units.forEach((u) => {
        expect(u.type).toBeTruthy();
        expect(u.size).toBeTruthy();
        expect(typeof u.available).toBe('boolean');
      });
    });
  });

  it('has unique IDs', () => {
    const ids = properties.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('IDs are URL-safe slugs', () => {
    properties.forEach((p) => {
      expect(p.id).toMatch(/^[a-z0-9-]+$/);
    });
  });
});

describe('realizzazioni.json', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(realizzazioni)).toBe(true);
    expect(realizzazioni.length).toBeGreaterThan(0);
  });

  it('each realizzazione has required fields', () => {
    realizzazioni.forEach((r) => {
      expect(r.id).toBeTruthy();
      expect(r.title).toBeTruthy();
      expect(r.location).toBeTruthy();
      expect(r.year).toBeTruthy();
      expect(r.type).toBeTruthy();
      expect(r.description).toBeTruthy();
      expect(r.coverImage).toBeTruthy();
    });
  });

  it('years are valid 4-digit strings', () => {
    realizzazioni.forEach((r) => {
      expect(r.year).toMatch(/^\d{4}$/);
      const year = parseInt(r.year, 10);
      expect(year).toBeGreaterThan(1990);
      expect(year).toBeLessThanOrEqual(new Date().getFullYear());
    });
  });

  it('each realizzazione has at least one image', () => {
    realizzazioni.forEach((r) => {
      expect(Array.isArray(r.images)).toBe(true);
      expect(r.images.length).toBeGreaterThan(0);
    });
  });

  it('has unique IDs', () => {
    const ids = realizzazioni.map((r) => r.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('IDs are URL-safe slugs', () => {
    realizzazioni.forEach((r) => {
      expect(r.id).toMatch(/^[a-z0-9-]+$/);
    });
  });
});

// ─── Utility Logic Tests ─────────────────────────────────────────────────────

describe('Badge class logic', () => {
  const getBadgeClass = (status: string): string => {
    const map: Record<string, string> = {
      'in-vendita': 'badge-vendita',
      'prossimamente': 'badge-prossima',
      'venduto': 'badge-venduto',
    };
    return map[status] ?? 'badge-prossima';
  };

  it('returns correct badge for in-vendita', () => {
    expect(getBadgeClass('in-vendita')).toBe('badge-vendita');
  });

  it('returns correct badge for prossimamente', () => {
    expect(getBadgeClass('prossimamente')).toBe('badge-prossima');
  });

  it('returns correct badge for venduto', () => {
    expect(getBadgeClass('venduto')).toBe('badge-venduto');
  });

  it('returns fallback for unknown status', () => {
    expect(getBadgeClass('unknown')).toBe('badge-prossima');
  });
});

describe('Counter animation logic', () => {
  function easeOutExpo(progress: number): number {
    return progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
  }

  it('starts at 0 when progress is 0', () => {
    expect(easeOutExpo(0)).toBe(0);
  });

  it('ends at 1 when progress is 1', () => {
    expect(easeOutExpo(1)).toBe(1);
  });

  it('is monotonically increasing', () => {
    const steps = [0, 0.1, 0.2, 0.4, 0.6, 0.8, 1];
    for (let i = 1; i < steps.length; i++) {
      expect(easeOutExpo(steps[i])).toBeGreaterThan(easeOutExpo(steps[i - 1]));
    }
  });

  it('eases correctly at midpoint', () => {
    const mid = easeOutExpo(0.5);
    expect(mid).toBeGreaterThan(0.96); // Fast at start
  });
});

describe('Static paths generation', () => {
  it('generates correct paths for properties', () => {
    const paths = properties.map((p) => ({ params: { id: p.id } }));
    expect(paths.length).toBe(properties.length);
    paths.forEach((path) => {
      expect(path.params.id).toBeTruthy();
      expect(typeof path.params.id).toBe('string');
    });
  });

  it('generates correct paths for realizzazioni', () => {
    const paths = realizzazioni.map((r) => ({ params: { id: r.id } }));
    expect(paths.length).toBe(realizzazioni.length);
    paths.forEach((path) => {
      expect(path.params.id).toBeTruthy();
    });
  });
});
