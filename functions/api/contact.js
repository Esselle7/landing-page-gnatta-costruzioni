export const onRequestPost = async ({ request, env }) => {
  const data = await request.json();

  const {
    nome,
    email,
    telefono,
    interesse,
    unita,
    messaggio,
    appuntamento_data,
    appuntamento_fascia
  } = data;

  if (!nome || !email || !messaggio) {
    return new Response(
      JSON.stringify({ error: "Campi obbligatori mancanti" }),
      { status: 400 }
    );
  }

  let unitaSerialized = null;
  if (unita && Array.isArray(unita)) {
    unitaSerialized = JSON.stringify(unita);
  }

  await env.DB.prepare(`
    INSERT INTO contacts (
      nome,
      email,
      telefono,
      interesse,
      unita,
      messaggio,
      appuntamento_data,
      appuntamento_fascia
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `)
  .bind(
    nome,
    email,
    telefono,
    interesse,
    unitaSerialized,
    messaggio,
    appuntamento_data,
    appuntamento_fascia
  )
  .run();

  return new Response(
    JSON.stringify({ success: true }),
    { headers: { "Content-Type": "application/json" } }
  );
};