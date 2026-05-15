export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const SUPABASE_URL = process.env.SUPABASE_URL || "https://ebczaoptweskqzuzrmls.supabase.co";
    const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;
    const headers = {
      "apikey": SUPABASE_SERVICE_KEY,
      "Authorization": `Bearer ${SUPABASE_SERVICE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": "return=representation"
    };

    const { action, email, fields, id, mensajes, modo } = req.body;

    // ── Actualizar campo en usuarios (ej: empresa) ──────────────────────
    if (action === "update-usuario" || (!action && email && fields)) {
      if (!email || !fields) return res.status(400).json({ error: "Faltan email o fields" });
      const r = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?email=eq.${encodeURIComponent(email)}`, {
        method: "PATCH", headers,
        body: JSON.stringify(fields)
      });
      const data = await r.json();
      if (!r.ok) return res.status(r.status).json({ error: data });
      return res.status(200).json(data);
    }

    // ── Guardar conversación de equipo (INSERT) ─────────────────────────
    if (action === "insert-conversacion") {
      if (!email || !mensajes) return res.status(400).json({ error: "Faltan email o mensajes" });
      const r = await fetch(`${SUPABASE_URL}/rest/v1/conversaciones`, {
        method: "POST", headers,
        body: JSON.stringify({ usuario_email: email, modo: modo || "equipo", mensajes })
      });
      const data = await r.json();
      if (!r.ok) return res.status(r.status).json({ error: data });
      return res.status(200).json(data);
    }

    // ── Actualizar conversación existente (PATCH) ───────────────────────
    if (action === "update-conversacion") {
      if (!id || !mensajes) return res.status(400).json({ error: "Faltan id o mensajes" });
      const r = await fetch(`${SUPABASE_URL}/rest/v1/conversaciones?id=eq.${id}`, {
        method: "PATCH", headers,
        body: JSON.stringify({ mensajes, updated_at: new Date().toISOString() })
      });
      const data = await r.json();
      if (!r.ok) return res.status(r.status).json({ error: data });
      return res.status(200).json(data);
    }

    return res.status(400).json({ error: "Acción no reconocida" });

  } catch (error) {
    console.error("Error en update-usuario:", error);
    res.status(500).json({ error: "Error interno" });
  }
}
