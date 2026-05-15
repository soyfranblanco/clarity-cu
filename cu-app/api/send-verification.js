export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  try {
    const { email, nombre, lang } = req.body;
    if (!email || !nombre) return res.status(400).json({ error: "Faltan email o nombre" });

    const es = lang === "es";
    const verifyUrl = `https://cu-app-wheat.vercel.app/?verified=true&email=${encodeURIComponent(email)}`;

    const html = es ? `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 2rem; color: #1a1a1a;">
        <div style="font-family: monospace; font-size: 11px; letter-spacing: 4px; color: #F5A623; margin-bottom: 1.5rem; text-transform: uppercase;">COOK × UNITY</div>
        <h1 style="font-size: 1.8rem; font-weight: 400; margin-bottom: 1rem;">Hola, ${nombre}.</h1>
        <p style="line-height: 1.7; color: #444; margin-bottom: 1.5rem;">
          Gracias por registrarte. Hacé clic en el botón de abajo para verificar tu cuenta y empezar a usar tu asistente de desarrollo profesional.
        </p>
        <a href="${verifyUrl}" style="display: inline-block; background: #F5A623; color: #1a1a1a; text-decoration: none; font-family: monospace; font-size: 12px; letter-spacing: 3px; padding: 14px 28px; border-radius: 28px; font-weight: 700; text-transform: uppercase; margin-bottom: 1.5rem;">
          Verificar mi cuenta
        </a>
        <p style="font-size: 0.8rem; color: #888; line-height: 1.6;">
          Si no creaste esta cuenta, podés ignorar este email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 1.5rem 0;" />
        <p style="font-family: monospace; font-size: 10px; color: #bbb; letter-spacing: 2px;">SIMPLE × COOKUNITY · 2026</p>
      </div>
    ` : `
      <div style="font-family: Georgia, serif; max-width: 480px; margin: 0 auto; padding: 2rem; color: #1a1a1a;">
        <div style="font-family: monospace; font-size: 11px; letter-spacing: 4px; color: #F5A623; margin-bottom: 1.5rem; text-transform: uppercase;">COOK × UNITY</div>
        <h1 style="font-size: 1.8rem; font-weight: 400; margin-bottom: 1rem;">Hi, ${nombre}.</h1>
        <p style="line-height: 1.7; color: #444; margin-bottom: 1.5rem;">
          Thanks for signing up. Click the button below to verify your account and start using your professional development assistant.
        </p>
        <a href="${verifyUrl}" style="display: inline-block; background: #F5A623; color: #1a1a1a; text-decoration: none; font-family: monospace; font-size: 12px; letter-spacing: 3px; padding: 14px 28px; border-radius: 28px; font-weight: 700; text-transform: uppercase; margin-bottom: 1.5rem;">
          Verify my account
        </a>
        <p style="font-size: 0.8rem; color: #888; line-height: 1.6;">
          If you didn't create this account, you can ignore this email.
        </p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 1.5rem 0;" />
        <p style="font-family: monospace; font-size: 10px; color: #bbb; letter-spacing: 2px;">SIMPLE × COOKUNITY · 2026</p>
      </div>
    `;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        from: "SIMPLE × CookUnity <noreply@metodosimple.ar>",
        to: email,
        subject: es ? "Verificá tu cuenta — SIMPLE × CookUnity" : "Verify your account — SIMPLE × CookUnity",
        html
      })
    });

    const data = await r.json();
    if (!r.ok) return res.status(r.status).json({ error: data });
    return res.status(200).json({ ok: true });

  } catch (error) {
    console.error("Error send-verification:", error);
    res.status(500).json({ error: "Error enviando email" });
  }
}
