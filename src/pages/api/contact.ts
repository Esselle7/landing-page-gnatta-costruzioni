import type { APIRoute } from 'astro';

export const prerender = false;

const INTERESSE_LABELS: Record<string, string> = {
  "unita-vendita": "Informazioni su unità in vendita",
  "informazioni": "Informazioni generali",
  "appuntamento": "Richiesta appuntamento",
  "altro": "Altro",
};

const FASCIA_LABELS: Record<string, string> = {
  "mattina": "Mattina (9:00 – 12:00)",
  "pomeriggio": "Pomeriggio (14:00 – 18:00)",
};

interface ContactData {
  nome: string;
  email: string;
  telefono?: string;
  interesse?: string;
  unita?: string[];
  messaggio: string;
  appuntamento_data?: string;
  appuntamento_fascia?: string;
}

function buildEmailHtml(d: ContactData): string {
  const interesseLabel = INTERESSE_LABELS[d.interesse ?? ''] || d.interesse || '—';
  const fasciaLabel = FASCIA_LABELS[d.appuntamento_fascia ?? ''] || null;

  const row = (label: string, value: string | null | undefined) =>
    value
      ? `<tr>
           <td style="padding:10px 16px;background:#f5f5f5;font-weight:600;color:#555;white-space:nowrap;width:180px;">${label}</td>
           <td style="padding:10px 16px;color:#222;">${value}</td>
         </tr>`
      : '';

  const unitaRows =
    d.unita && d.unita.length > 0
      ? `<tr>
           <td style="padding:10px 16px;background:#f5f5f5;font-weight:600;color:#555;white-space:nowrap;width:180px;">Unità di interesse</td>
           <td style="padding:10px 16px;color:#222;">
             <ul style="margin:0;padding-left:20px;">${d.unita.map((u) => `<li>${u}</li>`).join('')}</ul>
           </td>
         </tr>`
      : '';

  return `<!DOCTYPE html>
<html lang="it">
<head><meta charset="UTF-8"><title>Nuova richiesta di contatto</title></head>
<body style="margin:0;padding:0;background:#f9f9f9;font-family:Arial,sans-serif;">
  <div style="max-width:640px;margin:40px auto;background:#fff;border-radius:4px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.08);">

    <div style="background:#1a1a1a;padding:28px 32px;">
      <p style="margin:0;font-size:12px;letter-spacing:3px;text-transform:uppercase;color:#c8832a;">Costruzioni Gnatta</p>
      <h1 style="margin:8px 0 0;font-size:22px;font-weight:400;color:#fff;">Nuova richiesta di contatto</h1>
    </div>

    <div style="padding:32px;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;border:1px solid #e5e5e5;">
        <tbody>
          ${row('Nome', d.nome)}
          ${row('Email', `<a href="mailto:${d.email}" style="color:#c8832a;">${d.email}</a>`)}
          ${row('Telefono', d.telefono ? `<a href="tel:${d.telefono}" style="color:#c8832a;">${d.telefono}</a>` : null)}
          ${row('Tipo richiesta', interesseLabel)}
          ${unitaRows}
          ${row('Data appuntamento', d.appuntamento_data)}
          ${row('Fascia oraria', fasciaLabel)}
        </tbody>
      </table>

      <div style="margin-top:28px;">
        <p style="margin:0 0 10px;font-size:12px;letter-spacing:2px;text-transform:uppercase;color:#999;">Messaggio</p>
        <div style="background:#f5f5f5;padding:20px;border-left:3px solid #c8832a;font-size:14px;color:#333;line-height:1.7;white-space:pre-wrap;">${d.messaggio}</div>
      </div>

      <p style="margin-top:32px;font-size:12px;color:#bbb;border-top:1px solid #eee;padding-top:20px;">
        Questa email è stata generata automaticamente dal sito <strong>costruzioni-gnatta.it</strong>
        il ${new Date().toLocaleString('it-IT', { timeZone: 'Europe/Rome' })}.
      </p>
    </div>
  </div>
</body>
</html>`;
}

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as any).runtime?.env ?? {};
  const data = await request.json() as Record<string, any>;

  const nome               = data.nome as string;
  const email              = data.email as string;
  const telefono           = data.telefono || undefined;
  const interesse          = data.interesse || undefined;
  const unitaRaw           = data['unita[]'];
  const unita: string[]    = Array.isArray(unitaRaw) ? unitaRaw : (unitaRaw ? [unitaRaw] : []);
  const messaggio          = data.messaggio as string;
  const appuntamento_data  = data.appuntamento_data || undefined;
  const appuntamento_fascia = data.appuntamento_fascia || undefined;

  if (!nome || !email || !messaggio) {
    return new Response(
      JSON.stringify({ error: 'Campi obbligatori mancanti' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const apiKey: string = env.RESEND_API_KEY || import.meta.env.RESEND_API_KEY;

  if (!apiKey) {
    return new Response(
      JSON.stringify({ error: 'Configurazione email mancante' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  const interesseLabel = INTERESSE_LABELS[interesse ?? ''] || interesse || 'Contatto';
  const html = buildEmailHtml({ nome, email, telefono, interesse, unita, messaggio, appuntamento_data, appuntamento_fascia });

  const resendRes = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'Sito Gnatta <onboarding@resend.dev>',
      to: ['simone.leone300900@gmail.com'],
      reply_to: email,
      subject: `[Sito] ${interesseLabel} – ${nome}`,
      html,
    }),
  });

  if (!resendRes.ok) {
    const err = await resendRes.text();
    console.error('Resend error:', err);
    return new Response(
      JSON.stringify({ error: 'Errore invio email' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { 'Content-Type': 'application/json' } }
  );
};
