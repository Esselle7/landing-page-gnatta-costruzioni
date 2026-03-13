import { describe, it, expect } from 'vitest';

// ─── Form Validation Logic ────────────────────────────────────────────────────

interface FormData {
  nome: string;
  email: string;
  telefono?: string;
  messaggio: string;
  privacy: boolean;
}

function validateForm(data: FormData): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.nome.trim()) {
    errors.nome = 'Campo obbligatorio';
  }

  if (!data.email.trim()) {
    errors.email = 'Campo obbligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Email non valida';
  }

  if (!data.messaggio.trim()) {
    errors.messaggio = 'Campo obbligatorio';
  } else if (data.messaggio.trim().length < 10) {
    errors.messaggio = 'Messaggio troppo breve (minimo 10 caratteri)';
  }

  if (!data.privacy) {
    errors.privacy = 'Devi accettare la privacy policy';
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

describe('Form validation', () => {
  const validData: FormData = {
    nome: 'Mario Rossi',
    email: 'mario@example.com',
    messaggio: 'Vorrei avere informazioni sulle unità in vendita',
    privacy: true,
  };

  it('passes with valid data', () => {
    const result = validateForm(validData);
    expect(result.valid).toBe(true);
    expect(Object.keys(result.errors)).toHaveLength(0);
  });

  it('fails when nome is empty', () => {
    const result = validateForm({ ...validData, nome: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.nome).toBeTruthy();
  });

  it('fails when nome is only whitespace', () => {
    const result = validateForm({ ...validData, nome: '   ' });
    expect(result.valid).toBe(false);
    expect(result.errors.nome).toBeTruthy();
  });

  it('fails when email is empty', () => {
    const result = validateForm({ ...validData, email: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.email).toBeTruthy();
  });

  it('fails with invalid email format', () => {
    const invalidEmails = ['notanemail', 'missing@', '@domain.com', 'no-at-sign'];
    invalidEmails.forEach((email) => {
      const result = validateForm({ ...validData, email });
      expect(result.valid).toBe(false);
      expect(result.errors.email).toContain('non valida');
    });
  });

  it('passes with valid email formats', () => {
    const validEmails = ['user@example.com', 'user+tag@domain.it', 'a@b.co'];
    validEmails.forEach((email) => {
      const result = validateForm({ ...validData, email });
      expect(result.valid).toBe(true);
    });
  });

  it('fails when messaggio is empty', () => {
    const result = validateForm({ ...validData, messaggio: '' });
    expect(result.valid).toBe(false);
    expect(result.errors.messaggio).toBeTruthy();
  });

  it('fails when messaggio is too short', () => {
    const result = validateForm({ ...validData, messaggio: 'Ciao' });
    expect(result.valid).toBe(false);
    expect(result.errors.messaggio).toContain('breve');
  });

  it('fails when privacy is not accepted', () => {
    const result = validateForm({ ...validData, privacy: false });
    expect(result.valid).toBe(false);
    expect(result.errors.privacy).toBeTruthy();
  });

  it('accumulates multiple errors', () => {
    const result = validateForm({ nome: '', email: 'bad', messaggio: '', privacy: false });
    expect(Object.keys(result.errors).length).toBeGreaterThanOrEqual(3);
  });

  it('telefono is optional', () => {
    const result = validateForm({ ...validData, telefono: undefined });
    expect(result.valid).toBe(true);
  });
});

// ─── URL Slug tests ──────────────────────────────────────────────────────────

describe('URL slug utilities', () => {
  function toSlug(text: string): string {
    return text
      .toLowerCase()
      .replace(/[àáâ]/g, 'a')
      .replace(/[èéê]/g, 'e')
      .replace(/[ìíî]/g, 'i')
      .replace(/[òóô]/g, 'o')
      .replace(/[ùúû]/g, 'u')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  }

  it('converts Italian title to slug', () => {
    expect(toSlug('Residenza Verde')).toBe('residenza-verde');
    expect(toSlug('Villa Collina')).toBe('villa-collina');
  });

  it('handles accented characters', () => {
    expect(toSlug('Città Nuova')).toBe('citta-nuova');
    expect(toSlug('Complesso Aurò')).toBe('complesso-auro');
  });

  it('handles multiple spaces/special chars', () => {
    expect(toSlug('  Test   Project  ')).toBe('test-project');
  });

  it('produces lowercase output', () => {
    const result = toSlug('UPPER CASE');
    expect(result).toBe(result.toLowerCase());
  });

  it('produces URL-safe output', () => {
    const result = toSlug('Test Project 123!@#');
    expect(result).toMatch(/^[a-z0-9-]+$/);
  });
});
