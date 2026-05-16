import React, { useState, useEffect, useRef } from "react";

// ── Constants ────────────────────────────────────────────────────────────────
const SUPABASE_URL = "https://ebczaoptweskqzuzrmls.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY3phb3B0d2Vza3F6dXpybWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwMjE5NjgsImV4cCI6MjA1ODU5Nzk2OH0.O3bMDrCYkpijv74GnLPdekJRMCFzqXpAbEkdMSvGrR0";

const CU_ORANGE = "#F5A623";
const CU_DARK = "#1A1A1A";
const CU_MID = "#2C2C2C";
const CU_LIGHT = "#F5F0E8";

const NUNITO = "'Nunito', sans-serif";
const GEORGIA = "Georgia, 'Times New Roman', serif";

// ── CookUnity Leadership Principles (hardcoded context) ──────────────────────
const CU_PRINCIPLES = `COOKUNITY LEADERSHIP PRINCIPLES:

1. Build authentic Relationships, drama-free.
We prioritize building authentic relationships. We embrace collaboration, trust, and direct, candid communication. Great things emerge from healthy tension. We avoid unnecessary drama and distractions.

2. Create moments that matter for every guest.
Hospitality is about creating experiences that make every person feel seen, valued, and a true sense of belonging. Our hospitality is rooted in kindness, generosity, and the belief that great food brings people together.

3. Think slow, act fast.
We take time to deeply understand problems, but once a path is clear, we move quickly. Speed matters. We operate with high agency and a sense of urgency. Impatient with actions, patient with results.

4. Make it nice, not twice.
Mastery starts with commitment to quality and getting things right the first time. Taste guides clarity, focus, and the pursuit of the elegant solution. We don't waste time on rework. Life is too short for mediocrity.

5. Seek the truth, no matter how uncomfortable.
Growth requires intellectual honesty and low ego. We prioritize transparency and embrace difficult truths. Keep your actions aligned with your words. Question assumptions, confront challenges directly, rely on evidence.

6. Encourage growth and multiply success.
Everyone has a superpower, and our mission is to let it shine. "Do. Fail. Learn." Leaders are multipliers — unlock maximum potential in people. Being great is being good, consistently.

7. Balance progress with purpose.
Our mission is the ultimate decision maker: does this move us closer to fulfilling our mission? We balance growth with the need to nourish people, communities, and the planet. Individuals should leave this relationship better than they started it.

8. Best ideas win, no trade-offs.
The best ideas must always win, regardless of their source. We celebrate being non-consensus and right. Embrace creative solutions, simplify, and innovate. True innovation requires breaking boundaries and thinking differently.

9. Be an owner and make us win.
Ownership means having a high agency mindset and a bias for action. No problem is too big, too small, or outside our scope. High-accountability and low blame culture.

10. Live courageously, or leave.
Courage allows all other qualities to surface. We value those who challenge the norm, push for progress, speak up, and take risks. All progress depends on unreasonable people willing to fail and keep going.

11. Small teams, Big impact.
Small teams can do amazing work when empowered, agile, and committed. We trust teams to make decisions quickly, innovate boldly, and deliver exceptional results with autonomy and creativity.`;

// ── System Prompt ────────────────────────────────────────────────────────────
const SYSTEM_PROMPT_CU = `Sos un asesor de desarrollo profesional que combina Diseño Humano con coaching ejecutivo. Tu misión es ayudar a cada empleado de CookUnity a mejorar su desempeño de una forma que sea auténtica a cómo está diseñado/a.

Tenés acceso a tres fuentes de información sobre esta persona:
1. Su perfil de Diseño Humano — cómo procesa decisiones, gestiona energía, se relaciona y aprende
2. Su performance review — qué hizo bien, dónde mejorar, el feedback concreto de su manager
3. Los Leadership Principles de CookUnity — los valores y comportamientos que la empresa espera

VALIDACIÓN DE IDENTIDAD — MUY IMPORTANTE:
Al inicio de cada conversación o cuando recibas el performance review, verificá si el nombre del empleado registrado coincide con el nombre de la persona evaluada en el review. Si detectás una discrepancia (por ejemplo, el usuario se llama "Juan García" pero el review es de "María López"), mencionalo de forma amable y directa: "Noto que tu nombre no coincide con el del review. ¿Es tuyo este documento?" No bloquees la conversación, pero sí dejá claro lo que observás.

TU TRABAJO:
- Cruzar estas tres fuentes para dar orientación concreta y personalizada
- Ayudar al empleado a entender cómo mejorar sus puntos débiles de una forma que respete su diseño
- Mostrar cómo sus fortalezas naturales se alinean con los principios de CookUnity
- Dar estrategias específicas, no genéricas
- Nunca inventés nada — todo debe estar anclado en su diseño, su review o los principios de CookUnity

TONO:
- Directo, cálido, sin vueltas
- Como un coach que te conoce bien y te dice la verdad con cuidado
- Sin jerga de DH — traducí siempre al impacto concreto en el trabajo
- Respondé en el mismo idioma que escribe el empleado (español o inglés)
- Frases cortas. Siempre cerrá con algo accionable.

IDIOMA ESTRICTO: Si el empleado escribe en español, respondé 100% en español sin mezclar palabras en inglés. Si escribe en inglés, respondé en inglés. Nunca mezcles idiomas dentro de una misma respuesta.`;

// ── Helpers ──────────────────────────────────────────────────────────────────
function md(t) {
  return t
    .replace(/^### (.+)$/gm, '<span style="color:#F5A623">$1</span>')
    .replace(/^## (.+)$/gm, '<span style="color:#F5A623">$1</span>')
    .replace(/^# (.+)$/gm, '<span style="color:#F5A623">$1</span>')
    .replace(/\*\*(.*?)\*\*/g, '<span style="color:#F5A623">$1</span>')
    .replace(/\n/g, "<br/>");
}

async function dbFetch(endpoint, opts = {}) {
  const r = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    headers: {
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Content-Type": "application/json",
      "Prefer": opts.method === "POST" ? "return=representation" : undefined,
      ...opts.headers,
    },
    ...opts,
  });
  return r.json();
}

// ── Welcome Screen ───────────────────────────────────────────────────────────
// ── PasswordField component ──────────────────────────────────────────────────
function PasswordField({ placeholder, value, onChange, onEnter, style }) {
  const [show, setShow] = React.useState(false);
  return (
    <div style={{ position: "relative", marginBottom: style?.marginBottom || ".8rem" }}>
      <input
        type={show ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        onKeyDown={e => e.key === "Enter" && onEnter && onEnter()}
        style={{ ...style, marginBottom: 0, paddingRight: "2.5rem" }}
      />
      <button
        type="button"
        onClick={() => setShow(v => !v)}
        style={{ position: "absolute", right: "0.7rem", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(240,235,224,.4)", fontSize: "1rem", padding: 0, lineHeight: 1 }}>
        {show ? "🙈" : "👁"}
      </button>
    </div>
  );
}

// ── HourglassAnim component ───────────────────────────────────────────────────
function HourglassAnim() {
  const [frame, setFrame] = React.useState(0);
  const frames = ["⏳", "⌛"];
  React.useEffect(() => {
    const t = setInterval(() => setFrame(f => (f + 1) % 2), 800);
    return () => clearInterval(t);
  }, []);
  return <div style={{ fontSize: "1.5rem", marginBottom: ".5rem" }}>{frames[frame]}</div>;
}

// ── Welcome ───────────────────────────────────────────────────────────────────
function Welcome({ go, lang, setLang }) {
  const es = lang === "es";
  return (
    <div style={{ minHeight: "100vh", background: CU_DARK, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", position: "relative", overflow: "hidden" }}>
      {/* Background texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 80%, rgba(245,166,35,.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(245,166,35,.05) 0%, transparent 50%)", pointerEvents: "none" }} />

      {/* Lang toggle */}
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", display: "flex", gap: ".5rem" }}>
        {["es", "en"].map(l => (
          <button key={l} onClick={() => setLang(l)}
            style={{ background: lang === l ? CU_ORANGE : "transparent", color: lang === l ? CU_DARK : "rgba(255,255,255,.4)", border: `1px solid ${lang === l ? CU_ORANGE : "rgba(255,255,255,.2)"}`, borderRadius: 20, fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".15em", padding: ".3em .8em", cursor: "pointer", textTransform: "uppercase" }}>
            {l}
          </button>
        ))}
      </div>

      {/* Logo */}
      <div style={{ marginBottom: "3rem", textAlign: "center" }}>
        <div style={{ fontFamily: "monospace", fontSize: ".6rem", letterSpacing: ".4em", color: CU_ORANGE, marginBottom: ".5rem", textTransform: "uppercase" }}>Cook × Unity</div>
        <div style={{ fontFamily: GEORGIA, fontSize: "clamp(2rem, 5vw, 3.5rem)", color: "#fff", lineHeight: 1.1, fontWeight: 400 }}>
          {es ? "Tu camino al" : "Your path to"}
          <br />
          <span style={{ color: CU_ORANGE, fontStyle: "italic" }}>
            {es ? "mejor desempeño." : "better performance."}
          </span>
        </div>
        <div style={{ color: "rgba(255,255,255,.45)", fontSize: ".9rem", marginTop: "1rem", fontFamily: NUNITO, maxWidth: 420, lineHeight: 1.6 }}>
          {es
            ? "Una herramienta que cruza tu Diseño Humano con tu performance review para darte estrategias personalizadas de crecimiento."
            : "A tool that combines your Human Design with your performance review to give you personalized growth strategies."}
        </div>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", flexDirection: "column", gap: ".8rem", width: "100%", maxWidth: 320 }}>
        <button onClick={() => go("register")}
          style={{ background: CU_ORANGE, color: CU_DARK, border: "none", borderRadius: 28, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".9em 2em", cursor: "pointer", textTransform: "uppercase", fontWeight: 700 }}>
          {es ? "Crear mi cuenta" : "Create my account"}
        </button>
        <button onClick={() => go("login")}
          style={{ background: "transparent", color: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.15)", borderRadius: 28, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".9em 2em", cursor: "pointer", textTransform: "uppercase" }}>
          {es ? "Ya tengo cuenta" : "I already have an account"}
        </button>
      </div>

      <div style={{ position: "absolute", bottom: "1.5rem", fontFamily: "monospace", fontSize: ".45rem", color: "rgba(255,255,255,.2)", letterSpacing: ".15em" }}>
        SIMPLE × COOKUNITY · 2026
      </div>
    </div>
  );
}

// ── Register ─────────────────────────────────────────────────────────────────
function Register({ go, setEmail: setParentEmail, lang, setLang }) {
  const es = lang === "es";
  const [f, setF] = useState({ nom: "", ape: "", email: "", pass: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const C = { bg: CU_DARK, txt: "#f0ebe0", dim: "rgba(240,235,224,.45)", gold: CU_ORANGE };

  async function submit() {
    if (!f.nom || !f.email || !f.pass) { setErr(es ? "Completá todos los campos." : "Please fill all fields."); return; }
    if (f.pass !== f.pass2) { setErr(es ? "Las contraseñas no coinciden." : "Passwords don't match."); return; }
    if (f.pass.length < 6) { setErr(es ? "La contraseña debe tener al menos 6 caracteres." : "Password must be at least 6 characters."); return; }
    setLoading(true); setErr("");
    try {
      const emailClean = f.email.toLowerCase().trim();
      const checkRes = await fetch("/api/update-usuario", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get-cu-usuario", email: emailClean })
      });
      const checkData = await checkRes.json();
      if (Array.isArray(checkData) && checkData.length > 0) { setErr(es ? "Ese email ya está registrado." : "Email already registered."); setLoading(false); return; }
      const res = await fetch("/api/update-usuario", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "insert-cu-usuario", fields: { nombre: f.nom, apellido: f.ape, email: emailClean, password_hash: f.pass } })
      });
      if (!res.ok) { setErr(es ? "Error al registrar." : "Registration error."); setLoading(false); return; }
      setParentEmail(emailClean);
      // Send verification email
      fetch("/api/send-verification", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailClean, nombre: f.nom, lang })
      }).catch(() => {});
      go("pending");
    } catch { setErr(es ? "Error al registrar. Intentá de nuevo." : "Registration error. Please try again."); }
    setLoading(false);
  }

  const inp = { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 12, color: C.txt, fontFamily: NUNITO, fontSize: ".9rem", padding: ".7rem 1rem", outline: "none", boxSizing: "border-box", marginBottom: ".8rem" };

  return (
    <div style={{ minHeight: "100vh", background: CU_DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <button onClick={() => go("welcome")} style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", cursor: "pointer", fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".15em" }}>← {es ? "Volver" : "Back"}</button>
          <div style={{ display: "flex", gap: ".4rem" }}>
            {["es", "en"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ background: lang === l ? "rgba(245,166,35,.15)" : "transparent", color: lang === l ? CU_ORANGE : "rgba(255,255,255,.3)", border: `1px solid ${lang === l ? CU_ORANGE : "rgba(255,255,255,.15)"}`, borderRadius: 20, fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".1em", padding: ".25em .6em", cursor: "pointer", textTransform: "uppercase" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ border: "1px solid rgba(245,166,35,.2)", borderRadius: 16, padding: "2.5rem", background: "rgba(255,255,255,.02)" }}>
          <div style={{ fontFamily: GEORGIA, fontSize: "1.5rem", color: "#fff", marginBottom: ".4rem" }}>{es ? "Crear cuenta" : "Create account"}</div>
          <div style={{ color: C.dim, fontSize: ".8rem", marginBottom: "1.8rem", fontFamily: NUNITO }}>{es ? "Empleados de CookUnity" : "CookUnity employees"}</div>
          <div style={{ display: "flex", gap: ".8rem" }}>
            <input placeholder={es ? "Nombre" : "First name"} value={f.nom} onChange={e => setF({ ...f, nom: e.target.value })} style={{ ...inp, flex: 1, marginBottom: 0 }} />
            <input placeholder={es ? "Apellido" : "Last name"} value={f.ape} onChange={e => setF({ ...f, ape: e.target.value })} style={{ ...inp, flex: 1, marginBottom: 0 }} />
          </div>
          <div style={{ height: ".8rem" }} />
          <input type="email" placeholder="Email" value={f.email} onChange={e => setF({ ...f, email: e.target.value })} style={inp} />
          <PasswordField
            placeholder={es ? "Contraseña" : "Password"}
            value={f.pass}
            onChange={v => setF({ ...f, pass: v })}
            onEnter={submit}
            style={inp}
          />
          <PasswordField
            placeholder={es ? "Repetir contraseña" : "Confirm password"}
            value={f.pass2 || ""}
            onChange={v => setF({ ...f, pass2: v })}
            onEnter={submit}
            style={inp}
          />
          {err && <div style={{ color: "#e07070", fontSize: ".78rem", marginBottom: ".8rem", fontFamily: NUNITO }}>{err}</div>}
          <button onClick={submit} disabled={loading}
            style={{ background: CU_ORANGE, color: CU_DARK, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: loading ? "wait" : "pointer", textTransform: "uppercase", width: "100%", fontWeight: 700, opacity: loading ? 0.6 : 1 }}>
            {loading ? (es ? "Registrando..." : "Registering...") : (es ? "Continuar" : "Continue")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Login ────────────────────────────────────────────────────────────────────
function Login({ go, setEmail: setParentEmail, setDynamicUser, lang, setLang }) {
  const es = lang === "es";
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const C = { bg: CU_DARK, txt: "#f0ebe0", dim: "rgba(240,235,224,.45)", gold: CU_ORANGE };
  const inp = { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 12, color: C.txt, fontFamily: NUNITO, fontSize: ".9rem", padding: ".7rem 1rem", outline: "none", boxSizing: "border-box", marginBottom: ".8rem" };

  async function submit() {
    if (!email || !pass) { setErr(es ? "Completá todos los campos." : "Please fill all fields."); return; }
    setLoading(true); setErr("");
    try {
      const loginRes = await fetch("/api/update-usuario", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get-cu-usuario", email: email.toLowerCase().trim() })
      });
      const loginData = await loginRes.json();
      if (!Array.isArray(loginData) || loginData.length === 0) { setErr(es ? "Email no encontrado." : "Email not found."); setLoading(false); return; }
      const user = loginData[0];
      if (user.password_hash !== pass) { setErr(es ? "Contraseña incorrecta." : "Incorrect password."); setLoading(false); return; }
      setParentEmail(user.email);
      setDynamicUser(user);
      if (!user.diseno) go("onboarding");
      else if (!user.performance_review) go("upload");
      else go("chat");
    } catch { setErr(es ? "Error de conexión." : "Connection error."); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: CU_DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
          <button onClick={() => go("welcome")} style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", cursor: "pointer", fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".15em" }}>← {es ? "Volver" : "Back"}</button>
          <div style={{ display: "flex", gap: ".4rem" }}>
            {["es", "en"].map(l => (
              <button key={l} onClick={() => setLang(l)}
                style={{ background: lang === l ? "rgba(245,166,35,.15)" : "transparent", color: lang === l ? CU_ORANGE : "rgba(255,255,255,.3)", border: `1px solid ${lang === l ? CU_ORANGE : "rgba(255,255,255,.15)"}`, borderRadius: 20, fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".1em", padding: ".25em .6em", cursor: "pointer", textTransform: "uppercase" }}>
                {l}
              </button>
            ))}
          </div>
        </div>
        <div style={{ border: "1px solid rgba(245,166,35,.2)", borderRadius: 16, padding: "2.5rem", background: "rgba(255,255,255,.02)" }}>
          <div style={{ fontFamily: GEORGIA, fontSize: "1.5rem", color: "#fff", marginBottom: ".4rem" }}>{es ? "Ingresar" : "Sign in"}</div>
          <div style={{ color: C.dim, fontSize: ".8rem", marginBottom: "1.8rem", fontFamily: NUNITO }}>CookUnity</div>
          <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} style={inp} />
          <PasswordField
            placeholder={es ? "Contraseña" : "Password"}
            value={pass}
            onChange={v => setPass(v)}
            onEnter={submit}
            style={inp}
          />
          {err && <div style={{ color: "#e07070", fontSize: ".78rem", marginBottom: ".8rem", fontFamily: NUNITO }}>{err}</div>}
          <button onClick={submit} disabled={loading}
            style={{ background: CU_ORANGE, color: CU_DARK, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: loading ? "wait" : "pointer", textTransform: "uppercase", width: "100%", fontWeight: 700, opacity: loading ? 0.6 : 1 }}>
            {loading ? (es ? "Ingresando..." : "Signing in...") : (es ? "Ingresar" : "Sign in")}
          </button>
          <button onClick={() => go("recover")}
            style={{ background: "none", border: "none", color: "rgba(240,235,224,.3)", cursor: "pointer", fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".15em", marginTop: ".8rem", width: "100%", textAlign: "center" }}>
            {es ? "¿Olvidaste tu contraseña?" : "Forgot your password?"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Onboarding DH ────────────────────────────────────────────────────────────
function Onboarding({ go, userEmail, setDynamicUser, lang, setLang }) {
  const es = lang === "es";
  const [f, setF] = useState({ fecha: "", hora: "", lugar: "" });
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const C = { bg: CU_DARK, txt: "#f0ebe0", dim: "rgba(240,235,224,.45)" };
  const inp = { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 12, color: C.txt, fontFamily: NUNITO, fontSize: ".9rem", padding: ".7rem 1rem", outline: "none", boxSizing: "border-box", marginBottom: ".8rem" };

  async function calcular() {
    if (!f.fecha || !f.hora || !f.lugar) { setErr(es ? "Completá todos los campos." : "Please fill all fields."); return; }
    setLoading(true); setErr("");
    try {
      const r = await fetch("/api/hd", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ birth_date: f.fecha, birth_time: f.hora, ciudad: f.lugar }),
      });
      const diseno = await r.json();
      if (diseno.error) { setErr(es ? "Error al calcular tu diseño." : "Error calculating your design."); setLoading(false); return; }
      await fetch("/api/update-usuario", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update-cu-usuario", email: userEmail, fields: { diseno } }),
      });
      const updRes = await fetch("/api/update-usuario", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get-cu-usuario", email: userEmail })
      });
      const updData = await updRes.json();
      if (Array.isArray(updData) && updData[0]) setDynamicUser(updData[0]);
      go("upload");
    } catch { setErr(es ? "Error de conexión." : "Connection error."); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: CU_DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", display: "flex", gap: ".4rem" }}>
        {["es", "en"].map(l => (
          <button key={l} onClick={() => setLang(l)}
            style={{ background: lang === l ? "rgba(245,166,35,.15)" : "transparent", color: lang === l ? CU_ORANGE : "rgba(255,255,255,.3)", border: `1px solid ${lang === l ? CU_ORANGE : "rgba(255,255,255,.15)"}`, borderRadius: 20, fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".1em", padding: ".25em .6em", cursor: "pointer", textTransform: "uppercase" }}>
            {l}
          </button>
        ))}
      </div>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <div style={{ border: "1px solid rgba(245,166,35,.2)", borderRadius: 16, padding: "2.5rem", background: "rgba(255,255,255,.02)" }}>
          <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: CU_ORANGE, marginBottom: ".5rem", textTransform: "uppercase" }}>
            {es ? "Paso 1 de 2" : "Step 1 of 2"}
          </div>
          <div style={{ fontFamily: GEORGIA, fontSize: "1.5rem", color: "#fff", marginBottom: ".4rem" }}>
            {es ? "Tu Diseño Humano" : "Your Human Design"}
          </div>
          <div style={{ color: "rgba(240,235,224,.45)", fontSize: ".82rem", marginBottom: "1.8rem", fontFamily: NUNITO, lineHeight: 1.6 }}>
            {es
              ? "Necesitamos tu fecha, hora y lugar de nacimiento para calcular tu diseño."
              : "We need your birth date, time and place to calculate your design."}
          </div>
          <input type="date" value={f.fecha} onChange={e => setF({ ...f, fecha: e.target.value })} style={inp} />
          <input type="time" value={f.hora} onChange={e => setF({ ...f, hora: e.target.value })} style={inp} />
          <input placeholder={es ? "Ciudad de nacimiento" : "City of birth"} value={f.lugar} onChange={e => setF({ ...f, lugar: e.target.value })} style={inp} />
          {err && <div style={{ color: "#e07070", fontSize: ".78rem", marginBottom: ".8rem", fontFamily: NUNITO }}>{err}</div>}
          <button onClick={calcular} disabled={loading}
            style={{ background: CU_ORANGE, color: CU_DARK, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: loading ? "wait" : "pointer", textTransform: "uppercase", width: "100%", fontWeight: 700, opacity: loading ? 0.6 : 1 }}>
            {loading ? (es ? "Calculando..." : "Calculating...") : (es ? "Calcular mi diseño" : "Calculate my design")}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Upload Performance Review ─────────────────────────────────────────────────
function Upload({ go, userEmail, setDynamicUser, lang, setLang }) {
  const es = lang === "es";
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [texto, setTexto] = useState("");
  const [modo, setModo] = useState("pdf"); // "pdf" or "text"
  const C = { txt: "#f0ebe0", dim: "rgba(240,235,224,.45)" };

  async function guardar() {
    if (!texto.trim()) { setErr(es ? "El contenido está vacío." : "Content is empty."); return; }
    setLoading(true); setErr("");
    try {
      const saveRes = await fetch("/api/update-usuario", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update-cu-usuario", email: userEmail, fields: { performance_review: texto.trim() } }),
      });
      const updRes = await fetch("/api/update-usuario", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get-cu-usuario", email: userEmail })
      });
      const updData = await updRes.json();
      if (Array.isArray(updData) && updData[0]) setDynamicUser(updData[0]);
      go("chat");
    } catch(e) { console.error("Error guardar:", e); setErr(es ? "Error al guardar: " + e.message : "Error saving: " + e.message); }
    setLoading(false);
  }

  const [loadingMsg, setLoadingMsg] = useState(0);
  const PDF_MSGS_ES = [
    "Preparate un buen café mientras analizamos el documento...",
    "Leyendo tu review con atención...",
    "Procesando el feedback de tu manager...",
    "Casi listo, extrayendo los puntos clave...",
    "Un momento más, vale la pena la espera...",
  ];
  const PDF_MSGS_EN = [
    "Grab a coffee while we analyze your document...",
    "Reading your review carefully...",
    "Processing your manager's feedback...",
    "Almost done, extracting key points...",
    "Just a moment more, it's worth the wait...",
  ];

  async function parsePDF(file) {
    if (file.size > 5 * 1024 * 1024) {
      setErr(es ? "El PDF supera los 5MB. Intentá con un archivo más liviano." : "PDF exceeds 5MB. Please try a lighter file.");
      return;
    }
    setLoading(true); setErr(""); setLoadingMsg(0);
    const msgInterval = setInterval(() => {
      setLoadingMsg(prev => prev < (es ? PDF_MSGS_ES.length - 1 : PDF_MSGS_EN.length - 1) ? prev + 1 : prev);
    }, 7000);
    try {
      const base64 = await new Promise((res, rej) => {
        const r = new FileReader();
        r.onload = () => res(r.result.split(",")[1]);
        r.onerror = () => rej(new Error("Read failed"));
        r.readAsDataURL(file);
      });
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 4000,
          messages: [{
            role: "user",
            content: [
              { type: "document", source: { type: "base64", media_type: "application/pdf", data: base64 } },
              { type: "text", text: "Extract all the text content from this performance review document. Return only the extracted text, preserving structure with line breaks. No commentary." }
            ]
          }]
        })
      });
      if (!response.ok) {
        const errText = await response.text();
        console.error("Error API:", errText);
        setErr(es ? "Error al procesar el PDF." : "Error processing PDF.");
        setLoading(false); return;
      }
      const data = await response.json();
      const extracted = data.content?.[0]?.text || "";
      if (!extracted) {
        setErr(es ? "No se pudo extraer texto del PDF." : "Could not extract text from PDF.");
        setLoading(false); return;
      }
      setTexto(extracted);
    } catch(e) {
      console.error("Error parsePDF:", e);
      setErr(es ? "Error al leer el PDF: " + e.message : "Error reading PDF: " + e.message);
    }
    clearInterval(msgInterval);
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: CU_DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", display: "flex", gap: ".4rem" }}>
        {["es", "en"].map(l => (
          <button key={l} onClick={() => setLang(l)}
            style={{ background: lang === l ? "rgba(245,166,35,.15)" : "transparent", color: lang === l ? CU_ORANGE : "rgba(255,255,255,.3)", border: `1px solid ${lang === l ? CU_ORANGE : "rgba(255,255,255,.15)"}`, borderRadius: 20, fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".1em", padding: ".25em .6em", cursor: "pointer", textTransform: "uppercase" }}>
            {l}
          </button>
        ))}
      </div>
      <div style={{ width: "100%", maxWidth: 560 }}>
        <div style={{ border: "1px solid rgba(245,166,35,.2)", borderRadius: 16, padding: "2.5rem", background: "rgba(255,255,255,.02)" }}>
          <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: CU_ORANGE, marginBottom: ".5rem", textTransform: "uppercase" }}>
            {es ? "Paso 2 de 2" : "Step 2 of 2"}
          </div>
          <div style={{ fontFamily: GEORGIA, fontSize: "1.5rem", color: "#fff", marginBottom: ".4rem" }}>
            {es ? "Tu performance review" : "Your performance review"}
          </div>
          <div style={{ color: C.dim, fontSize: ".82rem", marginBottom: "1.5rem", fontFamily: NUNITO, lineHeight: 1.6 }}>
            {es
              ? "Subí tu performance review. La IA lo usará junto a tu Diseño Humano para darte estrategias personalizadas."
              : "Upload your performance review. The AI will use it with your Human Design to give you personalized strategies."}
          </div>

          {/* Mode toggle */}
          <div style={{ display: "flex", gap: ".5rem", marginBottom: "1.2rem" }}>
            {["pdf", "text"].map(m => (
              <button key={m} onClick={() => setModo(m)}
                style={{ background: modo === m ? "rgba(245,166,35,.15)" : "transparent", border: `1px solid ${modo === m ? CU_ORANGE : "rgba(245,166,35,.2)"}`, borderRadius: 20, color: modo === m ? CU_ORANGE : C.dim, fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".15em", padding: ".4em 1em", cursor: "pointer", textTransform: "uppercase" }}>
                {m === "pdf" ? "PDF" : (es ? "Texto" : "Text")}
              </button>
            ))}
          </div>

          {modo === "pdf" ? (
            <div>
              <label style={{ display: "block", border: "2px dashed rgba(245,166,35,.3)", borderRadius: 12, padding: "2rem", textAlign: "center", cursor: "pointer", color: C.dim, fontFamily: NUNITO, fontSize: ".85rem", lineHeight: 1.6, transition: "border-color .2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = CU_ORANGE}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(245,166,35,.3)"}>
                <input type="file" accept=".pdf" style={{ display: "none" }} onChange={e => e.target.files[0] && parsePDF(e.target.files[0])} />
                {loading ? (
                  <div style={{ lineHeight: 1.7 }}>
                    <HourglassAnim />
                    <div>{es ? PDF_MSGS_ES[loadingMsg] : PDF_MSGS_EN[loadingMsg]}</div>
                    <div style={{ fontSize: ".7rem", marginTop: ".5rem", opacity: .5 }}>{es ? "Esto puede tardar hasta 30 segundos" : "This may take up to 30 seconds"}</div>
                  </div>
                ) : (
                  <>
                    <div style={{ fontSize: "1.5rem", marginBottom: ".5rem" }}>📄</div>
                    {es ? "Hacé clic para seleccionar tu PDF" : "Click to select your PDF"}
                    <div style={{ fontSize: ".75rem", marginTop: ".3rem", opacity: .6 }}>{es ? "Solo archivos PDF · Máx. 5MB" : "PDF files only · Max. 5MB"}</div>
                  </>
                )}
              </label>
              {texto && (
                <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(245,166,35,.05)", border: "1px solid rgba(245,166,35,.15)", borderRadius: 10, fontSize: ".78rem", color: C.dim, fontFamily: NUNITO, lineHeight: 1.6, maxHeight: 200, overflowY: "auto" }}>
                  <div style={{ color: CU_ORANGE, fontFamily: "monospace", fontSize: ".45rem", letterSpacing: ".2em", marginBottom: ".5rem" }}>
                    {es ? "TEXTO EXTRAÍDO" : "EXTRACTED TEXT"}
                  </div>
                  {texto.slice(0, 500)}...
                </div>
              )}
            </div>
          ) : (
            <textarea
              value={texto}
              onChange={e => setTexto(e.target.value)}
              placeholder={es ? "Pegá el texto de tu performance review aquí..." : "Paste your performance review text here..."}
              style={{ width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 12, color: C.txt, fontFamily: NUNITO, fontSize: ".85rem", padding: "1rem", outline: "none", resize: "vertical", lineHeight: 1.6, minHeight: 200, boxSizing: "border-box" }}
            />
          )}

          {err && <div style={{ color: "#e07070", fontSize: ".78rem", margin: ".8rem 0", fontFamily: NUNITO }}>{err}</div>}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1.2rem" }}>
            <button onClick={() => go("chat")} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".15em" }}>
              {es ? "Saltar por ahora →" : "Skip for now →"}
            </button>
            <button onClick={guardar} disabled={loading || !texto.trim()}
              style={{ background: CU_ORANGE, color: CU_DARK, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".6rem", letterSpacing: ".25em", padding: ".75em 1.8em", cursor: loading || !texto.trim() ? "not-allowed" : "pointer", textTransform: "uppercase", fontWeight: 700, opacity: loading || !texto.trim() ? 0.5 : 1 }}>
              {loading ? (es ? "Guardando..." : "Saving...") : (es ? "Continuar al chat" : "Continue to chat")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Chat ─────────────────────────────────────────────────────────────────────
function Chat({ go, userEmail, dynamicUser, lang, setLang }) {
  const es = lang === "es";
  const [user, setUser] = useState(dynamicUser);
  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [convId, setConvId] = useState(null);
  const [showUpload, setShowUpload] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const chatRef = useRef(null);
  const lastUserRef = useRef(null);
  const shouldScrollRef = useRef(false);

  const bg = darkMode ? CU_DARK : CU_LIGHT;
  const txt = darkMode ? "#f0ebe0" : "#1a1a1a";
  const dim = darkMode ? "rgba(240,235,224,.45)" : "rgba(26,26,26,.5)";
  const panelBg = darkMode ? CU_MID : "#ede8df";

  useEffect(() => {
    if (!userEmail) return;
    async function load() {
      try {
        const convRes = await fetch("/api/update-usuario", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "get-cu-conversacion", email: userEmail })
        });
        const convData = await convRes.json();
        if (Array.isArray(convData) && convData[0]?.mensajes?.length) {
          setMsgs(convData[0].mensajes);
          setConvId(convData[0].id);
        }
      } catch {}
    }
    load();
  }, [userEmail]);

  useEffect(() => {
    if (shouldScrollRef.current && lastUserRef.current) {
      lastUserRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [msgs, loading]);

  function buildSystemPrompt() {
    const d = user?.diseno;
    const review = user?.performance_review;
    let sys = SYSTEM_PROMPT_CU + "\n\n";
    if (d) {
      sys += `DISEÑO HUMANO DE ${user.nombre} ${user.apellido}:\n`;
      sys += `Tipo: ${d.tipo}\nAutoridad: ${d.autoridad}\nPerfil: ${d.perfil}\nEstrategia: ${d.estrategia}\nFirma: ${d.firma}\nNo-self: ${d.no_self}\nEntorno: ${d.entorno}\n\n`;
    }
    if (review) {
      sys += `PERFORMANCE REVIEW:\n${review}\n\n`;
    }
    sys += CU_PRINCIPLES;
    return sys;
  }

  async function guardarConv(mensajes, currentId) {
    try {
      if (currentId) {
        await fetch("/api/update-usuario", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "update-cu-conversacion", id: currentId, mensajes })
        });
        return currentId;
      } else {
        const r = await fetch("/api/update-usuario", {
          method: "POST", headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "insert-cu-conversacion", email: userEmail, mensajes })
        });
        const data = await r.json();
        if (Array.isArray(data) && data[0]?.id) return data[0].id;
      }
    } catch {}
    return currentId;
  }

  async function send() {
    const txt_ = input.trim();
    if (!txt_ || loading) return;
    setInput("");
    shouldScrollRef.current = true;
    const next = [...msgs, { role: "user", content: txt_ }];
    setMsgs(next);
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: buildSystemPrompt(), messages: next }),
      });
      const data = await r.json();
      const final = [...next, { role: "assistant", content: data?.content?.[0]?.text || "Error." }];
      setMsgs(final);
      const newId = await guardarConv(final, convId);
      if (newId && !convId) setConvId(newId);
    } catch { setMsgs([...next, { role: "assistant", content: es ? "Error de conexión." : "Connection error." }]); }
    setLoading(false);
    shouldScrollRef.current = false;
  }

  const hasReview = !!user?.performance_review;
  const hasDH = !!user?.diseno;

  return (
    <div style={{ minHeight: "100vh", background: bg, display: "flex", flexDirection: "column", transition: "background .3s" }}>
      <style>{`
        textarea, input { color: ${txt} !important; -webkit-text-fill-color: ${txt} !important; caret-color: ${CU_ORANGE}; }
        textarea::placeholder, input::placeholder { color: ${dim} !important; -webkit-text-fill-color: ${dim} !important; }
        .cu-scroll::-webkit-scrollbar { width: 4px; }
        .cu-scroll::-webkit-scrollbar-track { background: transparent; }
        .cu-scroll::-webkit-scrollbar-thumb { background: rgba(245,166,35,.25); border-radius: 2px; }
        .cu-scroll { scrollbar-width: thin; scrollbar-color: rgba(245,166,35,.25) transparent; }
        @keyframes p { 0%,80%,100% { opacity:.2; transform:scale(.8) } 40% { opacity:1; transform:scale(1) } }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: ".9rem 2rem", borderBottom: `1px solid rgba(245,166,35,.12)`, background: panelBg, position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".3em", color: CU_ORANGE, fontWeight: 700 }}>COOK × UNITY</div>
          <div style={{ fontFamily: GEORGIA, fontSize: ".85rem", color: dim }}>
            {es ? `Hola, ${user?.nombre || ""}` : `Hi, ${user?.nombre || ""}`}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: ".8rem" }}>
          {!hasReview && (
            <button onClick={() => setShowUpload(true)}
              style={{ background: "rgba(245,166,35,.15)", border: `1px solid ${CU_ORANGE}`, borderRadius: 20, color: CU_ORANGE, fontFamily: "monospace", fontSize: ".45rem", letterSpacing: ".15em", padding: ".35em .8em", cursor: "pointer", textTransform: "uppercase" }}>
              {es ? "+ Subir review" : "+ Upload review"}
            </button>
          )}
          {/* Lang */}
          {["es", "en"].map(l => (
            <button key={l} onClick={() => setLang(l)}
              style={{ background: lang === l ? "rgba(245,166,35,.15)" : "transparent", color: lang === l ? CU_ORANGE : dim, border: `1px solid ${lang === l ? CU_ORANGE : "rgba(245,166,35,.15)"}`, borderRadius: 20, fontFamily: "monospace", fontSize: ".45rem", letterSpacing: ".1em", padding: ".25em .6em", cursor: "pointer", textTransform: "uppercase" }}>
              {l}
            </button>
          ))}
          {/* Dark mode */}
          <button onClick={() => setDarkMode(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, opacity: .8, display: "flex", alignItems: "center" }}>
            {darkMode
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={CU_ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={CU_ORANGE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            }
          </button>
          <button onClick={() => go("welcome")} style={{ color: CU_ORANGE, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".1em" }}>
            {es ? "Salir →" : "Sign out →"}
          </button>
        </div>
      </div>

      {/* Context warning if no review */}
      {!hasReview && (
        <div style={{ background: "rgba(245,166,35,.08)", borderBottom: `1px solid rgba(245,166,35,.15)`, padding: ".7rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ color: CU_ORANGE, fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".15em" }}>
            {es ? "⚠ Sin performance review — las respuestas serán menos personalizadas" : "⚠ No performance review — answers will be less personalized"}
          </div>
          <button onClick={() => setShowUpload(true)} style={{ background: "none", border: "none", color: CU_ORANGE, fontFamily: "monospace", fontSize: ".45rem", cursor: "pointer", letterSpacing: ".1em", textDecoration: "underline" }}>
            {es ? "Subir ahora" : "Upload now"}
          </button>
        </div>
      )}

      {/* Upload modal */}
      {showUpload && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.7)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}>
          <div style={{ background: CU_DARK, border: `1px solid rgba(245,166,35,.25)`, borderRadius: 16, width: "100%", maxWidth: 520, maxHeight: "80vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "flex-end", padding: "1rem 1.5rem 0" }}>
              <button onClick={() => setShowUpload(false)} style={{ background: "none", border: "none", color: dim, cursor: "pointer", fontSize: "1.2rem" }}>×</button>
            </div>
            <Upload go={(s) => { setShowUpload(false); }} userEmail={userEmail} setDynamicUser={(u) => { setUser(u); setShowUpload(false); }} lang={lang} setLang={setLang} />
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="cu-scroll" ref={chatRef} style={{ flex: 1, overflowY: "auto", padding: "2rem clamp(60px, 10vw, 150px)", display: "flex", flexDirection: "column", gap: "1.8rem" }}>

        {msgs.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem 0" }}>
            <div style={{ fontFamily: GEORGIA, fontSize: "1.3rem", color: txt, marginBottom: ".8rem" }}>
              {es ? `Hola, ${user?.nombre}.` : `Hello, ${user?.nombre}.`}
            </div>
            <div style={{ color: dim, fontSize: ".88rem", fontFamily: NUNITO, maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
              {es
                ? "Estoy acá para ayudarte a crecer dentro de CookUnity de una forma que sea auténtica a tu diseño. Podés preguntarme sobre tu performance review, cómo mejorar áreas específicas, o cómo tus fortalezas se alinean con los principios de la empresa."
                : "I'm here to help you grow within CookUnity in a way that's authentic to your design. You can ask me about your performance review, how to improve specific areas, or how your strengths align with the company's principles."}
            </div>
            {hasDH && (
              <div style={{ display: "flex", gap: ".5rem", flexWrap: "wrap", justifyContent: "center", marginTop: "1.5rem" }}>
                {[
                  es ? "¿Cuáles son mis puntos más fuertes según mi diseño?" : "What are my strongest points according to my design?",
                  es ? "¿Cómo puedo mejorar las áreas de desarrollo de mi review?" : "How can I improve my development areas from my review?",
                  es ? "¿Cómo se alinea mi diseño con los Leadership Principles?" : "How does my design align with the Leadership Principles?",
                ].map((q, i) => (
                  <button key={i} onClick={() => { setInput(q); }}
                    style={{ background: "rgba(245,166,35,.08)", border: `1px solid rgba(245,166,35,.2)`, borderRadius: 20, color: dim, fontFamily: NUNITO, fontSize: ".78rem", padding: ".5em 1em", cursor: "pointer", transition: "all .2s" }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = CU_ORANGE; e.currentTarget.style.color = CU_ORANGE; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(245,166,35,.2)"; e.currentTarget.style.color = dim; }}>
                    {q}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {msgs.map((m, i) => (
          <div key={i} ref={m.role === "user" ? lastUserRef : null}
            style={{ maxWidth: "85%", alignSelf: m.role === "user" ? "flex-end" : "flex-start" }}>
            {m.role === "user" ? (
              <div style={{ background: "rgba(245,166,35,.12)", border: `1px solid rgba(245,166,35,.2)`, borderRadius: "16px 16px 4px 16px", padding: ".8rem 1.1rem", color: txt, fontFamily: GEORGIA, fontSize: ".95rem", lineHeight: 1.7 }}>
                {m.content}
              </div>
            ) : (
              <div style={{ color: txt, fontFamily: GEORGIA, fontSize: ".95rem", lineHeight: 1.85 }}
                dangerouslySetInnerHTML={{ __html: md(m.content) }} />
            )}
          </div>
        ))}

        {loading && (
          <div style={{ display: "flex", gap: 5, padding: ".5rem 0" }}>
            {[0, 1, 2].map(i => (
              <div key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: CU_ORANGE, animation: "p 1.2s ease-in-out infinite", animationDelay: `${i * .2}s` }} />
            ))}
          </div>
        )}
      </div>

      {/* Input */}
      <div style={{ padding: "1rem clamp(60px, 10vw, 150px)", borderTop: `1px solid rgba(245,166,35,.12)`, display: "flex", gap: ".8rem", alignItems: "flex-end", background: panelBg }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder={es ? `Preguntá sobre tu desempeño, ${user?.nombre || ""}...` : `Ask about your performance, ${user?.nombre || ""}...`}
          rows={1}
          style={{ flex: 1, background: "transparent", border: "none", borderBottom: `1px solid rgba(245,166,35,.25)`, color: txt, fontFamily: GEORGIA, fontSize: ".95rem", padding: ".6rem 0", outline: "none", resize: "none", lineHeight: 1.5 }}
        />
        <button onClick={send} disabled={loading || !input.trim()}
          style={{ border: `1px solid ${CU_ORANGE}`, borderRadius: 20, color: CU_ORANGE, fontFamily: "monospace", fontSize: ".6rem", letterSpacing: ".2em", padding: ".6em 1.2em", cursor: loading || !input.trim() ? "not-allowed" : "pointer", textTransform: "uppercase", background: "none", opacity: loading || !input.trim() ? 0.3 : 1 }}>
          {es ? "Enviar" : "Send"}
        </button>
      </div>

      <div style={{ textAlign: "center", padding: ".5rem", fontFamily: "monospace", fontSize: ".42rem", color: dim, letterSpacing: ".12em" }}>
        SIMPLE es una herramienta creada y registrada por Fran Blanco. 2026
      </div>
    </div>
  );
}

// ── Recover Password screen ──────────────────────────────────────────────────
function Recover({ go, lang, setLang }) {
  const es = lang === "es";
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const inp = { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 12, color: "#f0ebe0", fontFamily: NUNITO, fontSize: ".9rem", padding: ".7rem 1rem", outline: "none", boxSizing: "border-box", marginBottom: ".8rem" };

  async function enviar() {
    if (!email) { setErr(es ? "Ingresá tu email." : "Enter your email."); return; }
    setLoading(true); setErr("");
    try {
      const r = await fetch("/api/update-usuario", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "get-cu-usuario", email: email.toLowerCase().trim() })
      });
      const data = await r.json();
      if (!Array.isArray(data) || data.length === 0) {
        setErr(es ? "Email no encontrado." : "Email not found."); setLoading(false); return;
      }
      const user = data[0];
      await fetch("/api/send-verification", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.toLowerCase().trim(), nombre: user.nombre, lang, type: "recover" })
      });
      setSent(true);
    } catch { setErr(es ? "Error de conexión." : "Connection error."); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: CU_DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", display: "flex", gap: ".4rem" }}>
        {["es", "en"].map(l => (
          <button key={l} onClick={() => setLang(l)}
            style={{ background: lang === l ? "rgba(245,166,35,.15)" : "transparent", color: lang === l ? CU_ORANGE : "rgba(255,255,255,.3)", border: `1px solid ${lang === l ? CU_ORANGE : "rgba(255,255,255,.15)"}`, borderRadius: 20, fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".1em", padding: ".25em .6em", cursor: "pointer", textTransform: "uppercase" }}>
            {l}
          </button>
        ))}
      </div>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <button onClick={() => go("login")} style={{ background: "none", border: "none", color: "rgba(255,255,255,.3)", cursor: "pointer", fontFamily: "monospace", fontSize: ".55rem", marginBottom: "2rem", letterSpacing: ".15em" }}>← {es ? "Volver" : "Back"}</button>
        <div style={{ border: "1px solid rgba(245,166,35,.2)", borderRadius: 16, padding: "2.5rem", background: "rgba(255,255,255,.02)", textAlign: sent ? "center" : "left" }}>
          {sent ? <>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>📬</div>
            <div style={{ fontFamily: GEORGIA, fontSize: "1.3rem", color: "#fff", marginBottom: ".8rem" }}>{es ? "Revisá tu email" : "Check your email"}</div>
            <div style={{ color: "rgba(240,235,224,.45)", fontSize: ".82rem", fontFamily: NUNITO, lineHeight: 1.6 }}>
              {es ? "Te enviamos un link para restablecer tu contraseña." : "We sent you a link to reset your password."}
            </div>
          </> : <>
            <div style={{ fontFamily: GEORGIA, fontSize: "1.5rem", color: "#fff", marginBottom: ".4rem" }}>{es ? "Recuperar contraseña" : "Reset password"}</div>
            <div style={{ color: "rgba(240,235,224,.45)", fontSize: ".82rem", marginBottom: "1.5rem", fontFamily: NUNITO }}>
              {es ? "Te enviamos un link a tu email." : "We'll send a link to your email."}
            </div>
            <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && enviar()} style={inp} />
            {err && <div style={{ color: "#e07070", fontSize: ".78rem", marginBottom: ".8rem" }}>{err}</div>}
            <button onClick={enviar} disabled={loading}
              style={{ background: CU_ORANGE, color: CU_DARK, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: loading ? "wait" : "pointer", textTransform: "uppercase", width: "100%", fontWeight: 700, opacity: loading ? 0.6 : 1 }}>
              {loading ? (es ? "Enviando..." : "Sending...") : (es ? "Enviar link" : "Send link")}
            </button>
          </>}
        </div>
      </div>
    </div>
  );
}

// ── Pending verification screen ──────────────────────────────────────────────
function Pending({ go, email, lang, setLang }) {
  const es = lang === "es";
  return (
    <div style={{ minHeight: "100vh", background: CU_DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ position: "absolute", top: "1.5rem", right: "1.5rem", display: "flex", gap: ".4rem" }}>
        {["es", "en"].map(l => (
          <button key={l} onClick={() => setLang(l)}
            style={{ background: lang === l ? "rgba(245,166,35,.15)" : "transparent", color: lang === l ? CU_ORANGE : "rgba(255,255,255,.3)", border: `1px solid ${lang === l ? CU_ORANGE : "rgba(255,255,255,.15)"}`, borderRadius: 20, fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".1em", padding: ".25em .6em", cursor: "pointer", textTransform: "uppercase" }}>
            {l}
          </button>
        ))}
      </div>
      <div style={{ width: "100%", maxWidth: 420, textAlign: "center" }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem" }}>📬</div>
        <div style={{ fontFamily: GEORGIA, fontSize: "1.5rem", color: "#fff", marginBottom: ".8rem" }}>
          {es ? "Revisá tu email" : "Check your email"}
        </div>
        <div style={{ color: "rgba(240,235,224,.45)", fontSize: ".85rem", fontFamily: NUNITO, lineHeight: 1.7, marginBottom: "2rem" }}>
          {es
            ? `Te enviamos un link de verificación a ${email}. Hacé clic en el link para activar tu cuenta y continuar.`
            : `We sent a verification link to ${email}. Click the link to activate your account and continue.`}
        </div>
        <div style={{ color: "rgba(240,235,224,.3)", fontSize: ".75rem", fontFamily: NUNITO, marginBottom: "1.5rem" }}>
          {es ? "¿No lo encontrás? Revisá la carpeta de spam." : "Can't find it? Check your spam folder."}
        </div>
        <div style={{ color: "rgba(240,235,224,.25)", fontFamily: "monospace", fontSize: ".45rem", letterSpacing: ".15em", marginTop: "1rem" }}>
          {es ? "DEBÉS VERIFICAR TU EMAIL PARA CONTINUAR" : "YOU MUST VERIFY YOUR EMAIL TO CONTINUE"}
        </div>
      </div>
    </div>
  );
}

// ── Reset Password screen ────────────────────────────────────────────────────
function Reset({ go, email, lang, setLang }) {
  const es = lang === "es";
  const [pass, setPass] = useState("");
  const [pass2, setPass2] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [done, setDone] = useState(false);
  const inp = { width: "100%", background: "rgba(255,255,255,.04)", border: "1px solid rgba(245,166,35,.2)", borderRadius: 12, color: "#f0ebe0", fontFamily: NUNITO, fontSize: ".9rem", padding: ".7rem 1rem", outline: "none", boxSizing: "border-box", marginBottom: ".8rem" };

  async function guardar() {
    if (!pass) { setErr(es ? "Ingresá una contraseña." : "Enter a password."); return; }
    if (pass !== pass2) { setErr(es ? "Las contraseñas no coinciden." : "Passwords don't match."); return; }
    if (pass.length < 6) { setErr(es ? "Mínimo 6 caracteres." : "Minimum 6 characters."); return; }
    setLoading(true); setErr("");
    try {
      await fetch("/api/update-usuario", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "update-cu-usuario", email, fields: { password_hash: pass } })
      });
      setDone(true);
    } catch { setErr(es ? "Error de conexión." : "Connection error."); }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: CU_DARK, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ border: "1px solid rgba(245,166,35,.2)", borderRadius: 16, padding: "2.5rem", background: "rgba(255,255,255,.02)", textAlign: done ? "center" : "left" }}>
          {done ? <>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✅</div>
            <div style={{ fontFamily: GEORGIA, fontSize: "1.3rem", color: "#fff", marginBottom: ".8rem" }}>
              {es ? "Contraseña actualizada" : "Password updated"}
            </div>
            <button onClick={() => go("login")}
              style={{ background: CU_ORANGE, color: CU_DARK, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".6rem", letterSpacing: ".25em", padding: ".75em 1.8em", cursor: "pointer", textTransform: "uppercase", fontWeight: 700, marginTop: "1rem" }}>
              {es ? "Ingresar" : "Sign in"}
            </button>
          </> : <>
            <div style={{ fontFamily: GEORGIA, fontSize: "1.5rem", color: "#fff", marginBottom: ".4rem" }}>
              {es ? "Nueva contraseña" : "New password"}
            </div>
            <div style={{ color: "rgba(240,235,224,.45)", fontSize: ".82rem", marginBottom: "1.5rem", fontFamily: NUNITO }}>{email}</div>
            <PasswordField placeholder={es ? "Nueva contraseña" : "New password"} value={pass} onChange={setPass} style={inp} />
            <PasswordField placeholder={es ? "Repetir contraseña" : "Confirm password"} value={pass2} onChange={setPass2} onEnter={guardar} style={inp} />
            {err && <div style={{ color: "#e07070", fontSize: ".78rem", marginBottom: ".8rem" }}>{err}</div>}
            <button onClick={guardar} disabled={loading}
              style={{ background: CU_ORANGE, color: CU_DARK, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: loading ? "wait" : "pointer", textTransform: "uppercase", width: "100%", fontWeight: 700, opacity: loading ? 0.6 : 1 }}>
              {loading ? (es ? "Guardando..." : "Saving...") : (es ? "Guardar contraseña" : "Save password")}
            </button>
          </>}
        </div>
      </div>
    </div>
  );
}

// ── App Root ─────────────────────────────────────────────────────────────────
export default function App() {
  const params = new URLSearchParams(window.location.search);
  const verifiedEmail = params.get("email") ? decodeURIComponent(params.get("email")) : "";
  const isVerified = params.get("verified") === "true";
  const isRecover = params.get("recover") === "true";

  const [screen, setScreen] = useState(
    isVerified && verifiedEmail ? "onboarding" :
    isRecover && verifiedEmail ? "reset" :
    "welcome"
  );
  const [email, setEmail] = useState(verifiedEmail || "");
  const [dynamicUser, setDynamicUser] = useState(null);
  const [lang, setLang] = useState("es");

  function go(s) { setScreen(s); }

  return (
    <div>
      <style>{"*{box-sizing:border-box;margin:0;padding:0}body{background:#1A1A1A}"}</style>
      {screen === "welcome" && <Welcome go={go} lang={lang} setLang={setLang} />}
      {screen === "register" && <Register go={go} setEmail={setEmail} lang={lang} setLang={setLang} />}
      {screen === "login" && <Login go={go} setEmail={setEmail} setDynamicUser={setDynamicUser} lang={lang} setLang={setLang} />}
      {screen === "pending" && <Pending go={go} email={email} lang={lang} setLang={setLang} />}
      {screen === "recover" && <Recover go={go} lang={lang} setLang={setLang} />}
      {screen === "reset" && <Reset go={go} email={email} lang={lang} setLang={setLang} />}
      {screen === "onboarding" && <Onboarding go={go} userEmail={email} setDynamicUser={setDynamicUser} lang={lang} setLang={setLang} />}
      {screen === "upload" && <Upload go={go} userEmail={email} setDynamicUser={setDynamicUser} lang={lang} setLang={setLang} />}
      {screen === "chat" && <Chat go={go} userEmail={email} dynamicUser={dynamicUser} lang={lang} setLang={setLang} />}
    </div>
  );
}
