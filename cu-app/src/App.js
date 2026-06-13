import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── CONFIG ───────────────────────────────────────────────────────────────────
const NUNITO = "'Nunito', sans-serif";
const GEORGIA = "Georgia, serif";

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// ─── COLORES (idénticos a INSIDE) ────────────────────────────────────────────
const C = {
  bg: "#080808",
  gold: "#b89a4e",
  txt: "#f0ebe0",
  dim: "rgba(240,235,224,0.45)",
};

// ─── ESTILOS BASE (idénticos a INSIDE) ───────────────────────────────────────
const logo = {
  fontFamily: "monospace",
  fontSize: ".7rem",
  letterSpacing: ".5em",
  color: "#b89a4e",
  border: "1px solid #b89a4e",
  padding: ".4em 1em",
  display: "inline-block",
  marginBottom: "3rem",
};
const lbl = {
  fontFamily: "monospace",
  fontSize: ".55rem",
  letterSpacing: ".3em",
  color: "#b89a4e",
  textTransform: "uppercase",
  display: "block",
  marginBottom: ".35rem",
};
const inp = {
  width: "100%",
  background: "transparent",
  border: "none",
  borderBottom: "1px solid rgba(184,154,78,.3)",
  color: "#f0ebe0",
  fontFamily: NUNITO,
  fontSize: ".95rem",
  padding: ".6rem 0",
  outline: "none",
  marginBottom: "1.3rem",
  display: "block",
  boxSizing: "border-box",
};

// ─── SYSTEM PROMPT BUILDER ────────────────────────────────────────────────────
function buildSystemPrompt(hdProfile, empresaContexto) {
  const hdSection = hdProfile
    ? `\n═══════════════════════════════════════
DISEÑO BIOLÓGICO DE ESTA PERSONA
═══════════════════════════════════════
${hdProfile}
═══════════════════════════════════════\n`
    : "";

  const empresaSection = empresaContexto
    ? `\n═══════════════════════════════════════
CONTEXTO DE LA ORGANIZACIÓN (cargado automáticamente)
═══════════════════════════════════════
${empresaContexto}
═══════════════════════════════════════\n`
    : `\n═══════════════════════════════════════
CONTEXTO DE LA ORGANIZACIÓN
No hay documentos de empresa cargados. Trabajá solo con el diseño de la persona y sus documentos personales.
═══════════════════════════════════════\n`;

  return `Sos un AI Coach personal de desarrollo profesional.

Tu trabajo no es decirle al empleado cómo mejorar dentro de la empresa. Tu trabajo es ayudarlo a entenderse mejor — y desde ese entendimiento, que pueda tomar sus propias decisiones sobre su carrera, su desempeño y su lugar en la organización.

A veces esa decisión va a ser "ahora sé cómo mejorar esto a mi manera." Otras veces va a ser "ahora entiendo que este entorno no me permite brillar." Las dos son respuestas válidas. No empujás ninguna de las dos — iluminás.

Tenés acceso a tres fuentes de información:
1. El diseño biológico de esta persona — cómo procesa decisiones, gestiona energía, se relaciona y aprende
2. Sus documentos personales — performance review, feedback, descripción de un rol, o cualquier otro material que haya subido
3. El contexto de la organización — valores, misión, principios y objetivos de la empresa donde trabaja

Cruzás estas tres fuentes para dar orientación concreta y personalizada. Nunca inventés nada — todo debe estar anclado en su diseño, sus documentos o el contexto de la empresa.
${hdSection}${empresaSection}
═══════════════════════════════════════
EL FILTRO — DISEÑO HUMANO
═══════════════════════════════════════
Todo lo que respondés está filtrado por el diseño biológico único de esta persona. Eso significa que tus consejos, preguntas y sugerencias están calibrados para cómo ella realmente funciona — no para cómo debería funcionar según un estándar genérico.

REGLA CRÍTICA SOBRE EL LENGUAJE:
Nunca usés términos técnicos de Diseño Humano en tus respuestas — ni tipo, ni autoridad, ni perfil, ni centros, ni canales, ni puertas. Traducí siempre al impacto concreto en la vida laboral de esta persona.

Si la persona pregunta qué hay detrás de tu forma de responder, o quiere entender su diseño, o pide los términos técnicos — ahí sí los explicás. Pero solo si lo pide explícitamente.

Ejemplo incorrecto: "Tu autoridad Sacral te dice que no analices tanto."
Ejemplo correcto: "Tu mejor decisión no viene de pensar más — viene de sentir si algo te genera energía o no. Cuando tu cuerpo dice sí, es sí. Cuando dice no, es no."

═══════════════════════════════════════
CÓMO USAR EL DISEÑO PARA RESPONDER
═══════════════════════════════════════
TIPO — cómo genera y gestiona energía, y cuál es su rol natural:
- Generador / Generador Manifestante: energía sostenida para construir. Su trampa es el compromiso por inercia — hacer cosas que ya no los cargan. Pregunta clave: ¿esto todavía te genera energía genuina?
- Proyector: no tiene energía constante — tiene visión y sabiduría. Su trampa es forzar resultados sin ser reconocido. Pregunta clave: ¿sentiste que te invitaron a contribuir o te metiste solo?
- Manifestador: tiene el impulso de iniciar. Su trampa es no informar a los demás antes de actuar. Pregunta clave: ¿informaste o simplemente hiciste?
- Reflector: es un espejo del entorno. Su trampa es decidir apurado. Pregunta clave: ¿dejaste pasar suficiente tiempo antes de decidir?

AUTORIDAD — cómo toma sus mejores decisiones:
- Sacral: decide desde la respuesta del cuerpo. Si algo genera energía, es sí. Si genera pesadez, es no.
- Emocional: necesita tiempo para que la ola emocional decante. La claridad llega después, no en el momento.
- Esplénica: intuición instantánea que no se repite. Un susurro, no un grito.
- Ego: decide desde lo que genuinamente quiere, no desde el deber.
- Self/G: espera tener claridad sobre la dirección antes de moverse.
- Mental/Sounding Board: necesita hablar la decisión con otros para encontrar su propia claridad.

PERFIL — su rol en el mundo y cómo aprende:
- Línea 1: necesita fundamentos sólidos antes de actuar. Sin base, hay inseguridad.
- Línea 2: aprende solo, necesita espacio. Se resiste a la instrucción directa.
- Línea 3: aprende del error. Los fracasos no son fracasos — son datos.
- Línea 4: confía en su red. Las oportunidades llegan a través de vínculos cercanos.
- Línea 5: carga con expectativas ajenas. Necesita separar lo que otros esperan de lo que genuinamente quiere.
- Línea 6: vive en etapas. Tiene un proceso de largo plazo — no lo presionés con resultados inmediatos.

NO-SELF THEME — la señal de que algo está mal:
- Frustración (Generador): está haciendo cosas que ya no lo cargan.
- Amargura (Proyector): está buscando activamente reconocimiento en lugar de esperar la invitación.
- Enojo (Manifestador): no está informando — está generando resistencia sin entender por qué.
- Decepción (Reflector): tomó una decisión apurado, sin dejar decantar.

Si detectás el no-self en el tono o el contenido, señalalo con cuidado: "Lo que describís suena a [frustración/amargura/enojo/decepción]. ¿Puede ser que algo en este entorno va contra tu forma natural de funcionar?"

═══════════════════════════════════════
CÓMO USAR EL CONTEXTO DE LA ORGANIZACIÓN
═══════════════════════════════════════
- Cuando la persona traiga un desafío laboral, cruzá su diseño con el contexto de la empresa para ver dónde hay alineación natural y dónde puede haber fricción
- Nunca uses el contexto de la empresa para empujar al empleado a adaptarse — usalo para iluminar la relación entre su forma de funcionar y el entorno donde está
- Si el diseño de la persona y el contexto de la empresa están en tensión, señalalo honestamente: "Tu forma natural de funcionar y lo que esta organización valora tienen puntos de encuentro, pero también tensiones. ¿Querés que las exploremos?"

═══════════════════════════════════════
ONBOARDING — PRIMERA VEZ
═══════════════════════════════════════
Si recibís el mensaje "__CLARITY_START__", es la primera vez que la persona entra. Conducís el onboarding de forma conversacional. Nunca usés listas ni bullets durante el onboarding.

PASO 1 — Presentación:
Presentate. Explicá que sos diferente a cualquier otra IA: todo lo que decís está basado en el diseño biológico único de esta persona — no en fórmulas genéricas de desarrollo profesional. Aclará que todo lo que se hable es privado — solo ella tiene acceso, la empresa no puede ver sus conversaciones. Preguntá: "¿De acuerdo con esto?"

PASO 2 — Conocimiento previo:
Explicá brevemente que el filtro que usás es su diseño biológico — información que tiene desde que nació y que describe cómo toma decisiones, genera energía y se relaciona con otros. Preguntá: "¿Conocés algo sobre Diseño Humano o es la primera vez que lo escuchás?"

Según la respuesta:
- Lo conoce → ir directo al paso 3
- Algo pero no mucho → explicar en 2-3 líneas qué es, sin jerga técnica
- No lo conoce → explicar brevemente que es un sistema de autoconocimiento y que no necesita saber nada de eso para usar la herramienta — vos lo traducís todo a lenguaje concreto

PASO 3 — El momento de revelación:
Antes de arrancar, compartí UN insight sobre su diseño aplicado al contexto laboral. Que sea contraintuitivo, específico y que conecte con algo que probablemente ya vivió en el trabajo. No un resumen — una sola idea que haga pensar "esto me conoce."

PASO 4 — Privacidad reforzada:
"Todo lo que hablemos acá es tuyo. La empresa no tiene acceso a tus conversaciones ni a tus documentos. Si algún día te vas de la empresa, tu cuenta y tu historial se quedan con vos."

PASO 5 — Frecuencia y uso:
"Podés consultarme cuando tengas un feedback que quieras procesar, antes de una conversación difícil con tu manager, cuando estés evaluando una decisión sobre tu carrera, o simplemente cuando algo en el trabajo no esté funcionando y no sepas exactamente qué. No hay una frecuencia correcta."

PASO 6 — Transición:
"Ya sé cómo funcionás. ¿Por dónde querés empezar?"

═══════════════════════════════════════
CÓMO ESTRUCTURAR TUS RESPUESTAS
═══════════════════════════════════════
1. Anclá en el diseño de la persona — sin nombrarlo técnicamente
2. Cruzá con el contexto laboral o de la empresa cuando sea relevante
3. Mostrá la consecuencia práctica concreta
4. Identificá la trampa o el riesgo específico
5. Cerrá con una pregunta poderosa o una acción concreta — nunca termines solo en lo reflexivo

Para preguntas vagas: hacé UNA pregunta de contexto antes de responder.
Para decisiones de carrera: no empujés en ninguna dirección — iluminá las dos caras y dejá que la persona decida.
Para conflictos con manager o equipo: usá el diseño de ambos si tenés información. Si no, preguntá cómo es la otra persona.
Para performance reviews: cruzá lo que le piden mejorar con su forma natural de funcionar.

═══════════════════════════════════════
TONO Y ESTILO
═══════════════════════════════════════
- Directo y cálido. Sin solemnidad ni condescendencia.
- Como un coach que te conoce bien y te dice la verdad con cuidado.
- Frases cortas. Sin paja. Sin intros genéricas tipo "gran pregunta" o "entiendo perfectamente".
- Nunca adulés. Nunca des la razón solo para dar la razón.
- Respondé en el mismo idioma que escribe la persona. Nunca mezcles idiomas.

═══════════════════════════════════════
LÍMITES CLAROS
═══════════════════════════════════════
- No hacés diagnósticos médicos ni de salud mental.
- Si detectás signos de crisis real, lo nombrás con cuidado y sugerís apoyo profesional.
- No tomás decisiones por la persona — la ayudás a llegar a la suya.
- No empujás al empleado a adaptarse a la empresa ni a irse de ella.
- La última palabra siempre es de la persona.
- La empresa no tiene acceso a las conversaciones del empleado bajo ninguna circunstancia.`;
}

// ─── MARKDOWN renderer (idéntico a INSIDE) ───────────────────────────────────
function md(t) {
  return t
    .replace(/^### (.+)$/gm, '<span style="color:#b89a4e">$1</span>')
    .replace(/^## (.+)$/gm, '<span style="color:#b89a4e">$1</span>')
    .replace(/^# (.+)$/gm, '<span style="color:#b89a4e">$1</span>')
    .replace(/\*\*(.*?)\*\*/g, '<span style="color:#b89a4e">$1</span>')
    .replace(/\n/g, "<br/>");
}

// ─── CHIPS ────────────────────────────────────────────────────────────────────
const CHIPS = [
  "Tengo un performance review que quiero analizar",
  "Hay un desafío en el trabajo que no sé cómo resolver",
  "Quiero entender cómo funciono para rendir mejor",
  "Estoy evaluando una decisión sobre mi carrera",
];

// ─── Eye input (idéntico a INSIDE) ───────────────────────────────────────────
function Eye({ value, onChange, placeholder = "Contraseña", onKeyDown }) {
  const [s, setS] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "1.3rem" }}>
      <input
        style={{ ...inp, marginBottom: 0, paddingRight: "2rem" }}
        type={s ? "text" : "password"}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      <button
        onClick={() => setS((v) => !v)}
        style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(240,235,224,.45)", fontSize: "1rem" }}
      >
        {s ? "🙈" : "👁"}
      </button>
    </div>
  );
}

// ─── LANG TOGGLE (compartido) ─────────────────────────────────────────────────
function LangToggle({ lang, setLang }) {
  return (
    <div style={{ position: "fixed", top: "1.5rem", right: "1.5rem", display: "flex", gap: ".3rem", zIndex: 150 }}>
      {["es", "en"].map((l) => (
        <button key={l} onClick={() => setLang(l)}
          style={{ background: lang === l ? "rgba(184,154,78,.15)" : "none", border: "1px solid rgba(184,154,78,.25)", color: lang === l ? C.gold : C.dim, fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".2em", padding: ".3em .7em", cursor: "pointer", textTransform: "uppercase" }}>
          {l}
        </button>
      ))}
    </div>
  );
}

// ─── SELECT estilizado (sin azul nativo) ──────────────────────────────────────
const selStyle = {
  width: "100%",
  background: "#111",
  border: "none",
  borderBottom: "1px solid rgba(184,154,78,.3)",
  color: "#f0ebe0",
  fontFamily: NUNITO,
  fontSize: ".95rem",
  padding: ".6rem 0",
  outline: "none",
  marginBottom: "1.3rem",
  display: "block",
  boxSizing: "border-box",
  WebkitAppearance: "none",
  appearance: "none",
  cursor: "pointer",
};

// ─── WELCOME ──────────────────────────────────────────────────────────────────
function Welcome({ go, lang, setLang }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: NUNITO, color: C.txt }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');`}</style>
      <LangToggle lang={lang} setLang={setLang} />
      <div style={logo}>SIMPLE <strong>CLARITY</strong></div>
      <div style={{ textAlign: "center", maxWidth: 580 }}>
        <div style={{ fontSize: "clamp(1.6rem,4vw,2.4rem)", fontWeight: 300, lineHeight: 1.3, marginBottom: "2.5rem", fontFamily: GEORGIA }}>
          Una IA para potenciar equipos,<br />
          <span style={{ color: C.gold, fontStyle: "italic" }}>pero con estrategias personalizadas para cada uno.</span>
        </div>
        <div style={{ maxWidth: 320, margin: "0 auto", display: "flex", flexDirection: "column", gap: ".8rem" }}>
          <button
            onClick={() => go("register")}
            style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: "pointer", textTransform: "uppercase", width: "100%" }}
          >
            Crear cuenta
          </button>
          <button
            onClick={() => go("login")}
            style={{ background: "transparent", color: C.dim, border: "1px solid rgba(184,154,78,.3)", fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: "pointer", textTransform: "uppercase", width: "100%" }}
          >
            Ya tengo cuenta
          </button>
        </div>
        <div style={{ marginTop: "2rem", fontFamily: NUNITO, fontSize: ".82rem", color: C.dim, lineHeight: 1.6 }}>
          Porque todos tenemos una forma única de rendir, decidir y crecer.
        </div>
      </div>
      <div style={{ position: "fixed", bottom: "2rem", fontFamily: "monospace", fontSize: ".55rem", color: "rgba(240,235,224,.2)", letterSpacing: ".15em", textAlign: "center" }}>
        SIMPLE CLARITY · 2026
      </div>
    </div>
  );
}

// ─── CITY INPUT (idéntico a INSIDE) ──────────────────────────────────────────
function CityInput({ value, onChange, placeholder }) {
  const [sugerencias, setSugerencias] = useState([]);
  const [show, setShow] = useState(false);
  const timer = useRef(null);

  async function buscar(q) {
    if (q.length < 3) { setSugerencias([]); return; }
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&featuretype=city&accept-language=es`);
      const data = await r.json();
      setSugerencias(data.map((d) => d.display_name));
    } catch { setSugerencias([]); }
  }

  function handleChange(e) {
    onChange(e.target.value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => buscar(e.target.value), 400);
    setShow(true);
  }

  return (
    <div style={{ position: "relative", marginBottom: "1.3rem" }}>
      <input style={{ ...inp, marginBottom: 0 }} placeholder={placeholder} value={value} onChange={handleChange}
        onBlur={() => setTimeout(() => setShow(false), 200)}
        onFocus={() => sugerencias.length > 0 && setShow(true)} />
      {show && sugerencias.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#1a1a1a", border: "1px solid rgba(184,154,78,.3)", zIndex: 50, maxHeight: 200, overflowY: "auto" }}>
          {sugerencias.map((s, i) => (
            <div key={i} onClick={() => { onChange(s); setSugerencias([]); setShow(false); }}
              style={{ padding: ".7rem 1rem", fontSize: ".82rem", color: C.dim, cursor: "pointer", borderBottom: "1px solid rgba(184,154,78,.1)" }}
              onMouseEnter={(e) => (e.target.style.color = C.gold)}
              onMouseLeave={(e) => (e.target.style.color = C.dim)}>
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── REGISTER ────────────────────────────────────────────────────────────────
function Register({ go, lang, setLang }) {
  const [step, setStep] = useState(1); // 1: cuenta, 2: empresa, 3: nacimiento
  const [f, setF] = useState({ nombre: "", apellido: "", email: "", pass: "" });
  const [empresa, setEmpresa] = useState({ id: "", nombre: "", codigo: "" });
  const [codigoInput, setCodigoInput] = useState("");
  const [nacimiento, setNacimiento] = useState({ fecha: "", hora: "", lugar: "" });
  const [empresas, setEmpresas] = useState([]);
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const u = (k, v) => setF((p) => ({ ...p, [k]: v }));
  const uN = (k, v) => setNacimiento((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    supabase.from("empresas").select("id, nombre, codigo").eq("activa", true).order("nombre")
      .then(({ data }) => setEmpresas(data || []));
  }, []);

  function calcularEdad(fecha) {
    if (!fecha) return null;
    const hoy = new Date();
    const nac = new Date(fecha);
    let edad = hoy.getFullYear() - nac.getFullYear();
    const m = hoy.getMonth() - nac.getMonth();
    if (m < 0 || (m === 0 && hoy.getDate() < nac.getDate())) edad--;
    return edad;
  }

  async function okStep1() {
    if (!f.nombre || !f.email || !f.pass) { setErr("Completá todos los campos."); return; }
    setErr(""); setStep(2);
  }

  async function okStep2() {
    if (!empresa.id) { setErr("Seleccioná tu empresa."); return; }
    if (codigoInput.trim().toUpperCase() !== empresa.codigo) { setErr("El código no es correcto. Pedíselo a tu empresa."); return; }
    setErr(""); setStep(3);
  }

  async function okStep3() {
    if (!nacimiento.fecha || !nacimiento.hora || !nacimiento.lugar) { setErr("Completá todos los campos."); return; }
    const edad = calcularEdad(nacimiento.fecha);
    if (edad !== null && edad < 18) { setErr("SIMPLE CLARITY está diseñado para mayores de 18 años."); return; }
    setLoading(true); setErr("");
    try {
      // Calcular HD
      const hdR = await fetch("/api/hd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: f.nombre, apellido: f.apellido, birth_date: nacimiento.fecha, birth_time: nacimiento.hora, ciudad: nacimiento.lugar }),
      });
      const diseno = await hdR.json();
      if (diseno.error) { setErr("Error al calcular tu diseño: " + diseno.error); setLoading(false); return; }

      // Crear usuario en Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({ email: f.email.toLowerCase().trim(), password: f.pass });
      if (authError) { setErr(authError.message.includes("already") ? "Ese email ya está registrado." : authError.message); setLoading(false); return; }

      const userId = authData.user?.id;
      if (!userId) { setErr("Error al crear cuenta."); setLoading(false); return; }

      // Guardar perfil con diseño calculado
      await supabase.from("perfiles").insert({
        user_id: userId,
        nombre: f.nombre,
        apellido: f.apellido,
        empresa_id: empresa.id,
        diseno: diseno,
        hd_tipo: diseno.tipo || diseno.type || "",
        hd_autoridad: diseno.autoridad || diseno.authority || "",
        hd_perfil: diseno.perfil || diseno.profile || "",
      });

      go("pending", f.email.toLowerCase().trim());
    } catch (e) { setErr("Error: " + (e?.message || "No se pudo conectar.")); }
    setLoading(false);
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "2.5rem 2rem", fontFamily: GEORGIA, color: C.txt, overflowY: "auto" }}>
      <LangToggle lang={lang} setLang={setLang} />
      <div style={logo}>SIMPLE <strong>CLARITY</strong></div>
      <div style={{ width: "100%", maxWidth: 440 }}>
        {/* Steps */}
        <div style={{ display: "flex", justifyContent: "center", gap: ".4rem", marginBottom: "1.5rem" }}>
          {[1,2,3].map((s) => (
            <div key={s} style={{ width: 28, height: 4, borderRadius: 2, background: step >= s ? C.gold : "rgba(184,154,78,.2)", transition: "background .3s" }} />
          ))}
        </div>

        <div style={{ fontSize: "1.5rem", fontWeight: 300, textAlign: "center", marginBottom: ".4rem" }}>
          {step === 1 ? "Crear cuenta" : step === 2 ? "Tu empresa" : "Tus datos de nacimiento"}
        </div>
        <div style={{ color: C.dim, textAlign: "center", marginBottom: "1.5rem", fontSize: ".88rem", lineHeight: 1.6, fontFamily: NUNITO }}>
          {step === 1 && "Ingresá tus datos para empezar."}
          {step === 2 && "El código de acceso te lo comparte tu empresa."}
          {step === 3 && "Necesitamos esta info para calcular tu diseño biológico y darte una experiencia 100% personalizada."}
        </div>

        <div style={{ border: "1px solid rgba(184,154,78,.2)", padding: "2.5rem", background: "rgba(255,255,255,.02)", borderRadius: 16 }}>
          {err && <div style={{ color: "#c06040", fontFamily: "monospace", fontSize: ".63rem", marginBottom: ".8rem", textAlign: "center" }}>{err}</div>}

          {step === 1 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div><label style={lbl}>Nombre *</label><input style={inp} placeholder="Tu nombre" value={f.nombre} onChange={(e) => u("nombre", e.target.value)} /></div>
                <div><label style={lbl}>Apellido</label><input style={inp} placeholder="Tu apellido" value={f.apellido} onChange={(e) => u("apellido", e.target.value)} /></div>
              </div>
              <label style={lbl}>Email *</label>
              <input style={inp} type="email" placeholder="tu@email.com" value={f.email} onChange={(e) => u("email", e.target.value)} />
              <label style={lbl}>Contraseña *</label>
              <Eye value={f.pass} onChange={(e) => u("pass", e.target.value)} placeholder="Mínimo 6 caracteres" />
              <button onClick={okStep1} style={btnGold}>Continuar</button>
            </>
          )}

          {step === 2 && (
            <>
              <label style={lbl}>Empresa *</label>
              <select
                style={selStyle}
                value={empresa.id}
                onChange={(e) => {
                  const found = empresas.find((em) => em.id === e.target.value);
                  setEmpresa(found ? { id: found.id, nombre: found.nombre, codigo: found.codigo } : { id: "", nombre: "", codigo: "" });
                }}
              >
                <option value="">Seleccioná tu empresa</option>
                {empresas.map((em) => <option key={em.id} value={em.id}>{em.nombre}</option>)}
              </select>
              <label style={lbl}>Código de acceso *</label>
              <input style={inp} placeholder="Código de tu empresa" value={codigoInput} onChange={(e) => setCodigoInput(e.target.value.toUpperCase())} />
              <button onClick={okStep2} style={btnGold}>Confirmar empresa</button>
              <button onClick={() => { setStep(1); setErr(""); }} style={btnBack}>← Volver</button>
            </>
          )}

          {step === 3 && (
            <>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                <div>
                  <label style={lbl}>Fecha de nacimiento *</label>
                  <input style={{ ...inp, colorScheme: "dark" }} type="date" value={nacimiento.fecha} onChange={(e) => uN("fecha", e.target.value)} />
                </div>
                <div>
                  <label style={lbl}>Hora de nacimiento *</label>
                  <input style={{ ...inp, colorScheme: "dark" }} type="time" value={nacimiento.hora} onChange={(e) => uN("hora", e.target.value)} />
                </div>
              </div>
              <label style={lbl}>Lugar de nacimiento *</label>
              <CityInput value={nacimiento.lugar} onChange={(v) => uN("lugar", v)} placeholder="Ciudad, País" />
              <button onClick={okStep3} disabled={loading} style={{ ...btnGold, opacity: loading ? 0.6 : 1, cursor: loading ? "wait" : "pointer" }}>
                {loading ? "Calculando tu diseño..." : "Crear cuenta"}
              </button>
              <button onClick={() => { setStep(2); setErr(""); }} style={btnBack}>← Volver</button>
            </>
          )}
        </div>

        <div style={{ textAlign: "center", margin: "1.2rem 0", color: C.dim, fontFamily: "monospace", fontSize: ".7rem" }}>
          ¿Ya tenés cuenta?{" "}
          <button onClick={() => go("login")} style={{ color: C.gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".63rem" }}>
            Ingresá acá
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── PENDING ──────────────────────────────────────────────────────────────────
function Pending({ email, go }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: GEORGIA, color: C.txt }}>
      <div style={logo}>SIMPLE <strong>CLARITY</strong></div>
      <div style={{ textAlign: "center", maxWidth: 460 }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem" }}>✉️</div>
        <div style={{ fontSize: "1.5rem", fontWeight: 300, marginBottom: ".8rem" }}>Revisá tu email</div>
        <div style={{ color: C.dim, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Te mandamos un link a <span style={{ color: C.gold }}>{email}</span>.<br /><br />
          Una vez que confirmés podés iniciar tu sesión.
        </div>
        <div style={{ border: "1px solid rgba(184,154,78,.2)", padding: "1rem 1.5rem", background: "rgba(184,154,78,.04)", marginBottom: "2rem", fontFamily: "monospace", fontSize: ".68rem", color: C.dim, lineHeight: 1.8 }}>
          ¿No recibiste el email? Revisá tu carpeta de spam.
        </div>
        <button onClick={() => go("welcome")} style={{ color: C.gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".63rem" }}>← Volver al inicio</button>
      </div>
    </div>
  );
}

// ─── LOGIN ────────────────────────────────────────────────────────────────────
function Login({ go, setSessionData }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function ok() {
    if (!email || !pass) { setErr("Completá email y contraseña."); return; }
    setLoading(true); setErr("");
    try {
      const { error: authError } = await supabase.auth.signInWithPassword({ email: email.toLowerCase().trim(), password: pass });
      if (authError) {
        setErr(authError.message.includes("Email not confirmed") ? "Confirmá tu email antes de ingresar." : "Email o contraseña incorrectos.");
        setLoading(false); return;
      }
      // profile se carga en App via onAuthStateChange
    } catch { setErr("Error de conexión."); }
    setLoading(false);
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: NUNITO, color: C.txt }}>
      <div style={logo}>SIMPLE <strong>CLARITY</strong></div>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 300, textAlign: "center", marginBottom: ".4rem", fontFamily: GEORGIA }}>Ingresar</div>
        <div style={{ color: C.dim, textAlign: "center", marginBottom: "1.5rem", fontSize: ".9rem" }}>Bienvenido de nuevo.</div>
        <div style={{ border: "1px solid rgba(184,154,78,.2)", padding: "2.5rem", background: "rgba(255,255,255,.02)", borderRadius: 16 }}>
          {err && <div style={{ color: "#c06040", fontFamily: "monospace", fontSize: ".63rem", marginBottom: ".8rem", textAlign: "center" }}>{err}</div>}
          <label style={lbl}>Email</label>
          <input style={inp} type="email" placeholder="tu@email.com" value={email} onChange={(e) => setEmail(e.target.value)} onKeyDown={(e) => e.key === "Enter" && ok()} />
          <label style={lbl}>Contraseña</label>
          <Eye value={pass} onChange={(e) => setPass(e.target.value)} placeholder="Tu contraseña" onKeyDown={(e) => e.key === "Enter" && ok()} />
          <div style={{ textAlign: "right", marginBottom: "1rem" }}>
            <button onClick={async () => {
              if (!email) { setErr("Ingresá tu email primero."); return; }
              const { error } = await supabase.auth.resetPasswordForEmail(email.toLowerCase().trim(), { redirectTo: "https://clarity.metodosimple.ar" });
              if (!error) setErr("✓ Te mandamos un link para resetear tu contraseña.");
              else setErr(error.message);
            }} style={{ color: C.gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".1em" }}>
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          <button onClick={ok} disabled={loading} style={{ ...btnGold, opacity: loading ? 0.7 : 1 }}>
            {loading ? "..." : "Ingresar"}
          </button>
        </div>
        <div style={{ textAlign: "center", margin: "1.2rem 0", color: C.dim, fontFamily: "monospace", fontSize: ".7rem" }}>
          ¿No tenés cuenta?{" "}
          <button onClick={() => go("register")} style={{ color: C.gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".63rem" }}>
            Crear cuenta
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── CHAT ─────────────────────────────────────────────────────────────────────
function Chat({ go, profile, empresaData }) {
  const [darkMode, setDarkMode] = useState(true);
  const DC = darkMode
    ? { bg: "#080808", gold: "#b89a4e", txt: "#f0ebe0", dim: "rgba(240,235,224,0.45)" }
    : { bg: "#f5f0e8", gold: "#b89a4e", txt: "#1a1a1a", dim: "rgba(26,26,26,0.5)" };

  const [msgs, setMsgs] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [started, setStarted] = useState(false);

  const chatContainerRef = useRef(null);
  const lastAssistantRef = useRef(null);
  const lastUserRef = useRef(null);

  const hdProfile = profile?.diseno
    ? JSON.stringify(profile.diseno, null, 2)
    : profile?.hd_tipo
    ? `Tipo: ${profile.hd_tipo}\nAutoridad: ${profile.hd_autoridad}\nPerfil: ${profile.hd_perfil}`
    : null;

  // Load history
  useEffect(() => {
    if (!profile?.user_id) return;
    supabase.from("mensajes").select("role, content").eq("user_id", profile.user_id).order("created_at", { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) {
          setMsgs(data);
          setStarted(true);
        }
      });
  }, [profile?.user_id]);

  // Scroll
  useEffect(() => {
    if (!msgs.length) return;
    const last = msgs[msgs.length - 1];
    const ref = last.role === "assistant" ? lastAssistantRef : lastUserRef;
    if (ref.current && chatContainerRef.current) {
      chatContainerRef.current.scrollTop = ref.current.offsetTop - chatContainerRef.current.offsetTop - 20;
    }
  }, [msgs]);

  async function saveMsg(role, content) {
    await supabase.from("mensajes").insert({ user_id: profile.user_id, role, content });
  }

  async function send(t) {
    const txt = t || input.trim();
    if (!txt || loading) return;
    setInput("");
    setStarted(true);
    const next = [...msgs, { role: "user", content: txt }];
    setMsgs(next);
    setLoading(true);
    if (txt !== "__CLARITY_START__") await saveMsg("user", txt);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: buildSystemPrompt(hdProfile, empresaData?.documentos_contexto || null),
          messages: next,
        }),
      });
      const data = await response.json();
      const reply = data.content?.find((b) => b.type === "text")?.text || "Error al responder.";
      const finalMsgs = [...next, { role: "assistant", content: reply }];
      setMsgs(finalMsgs);
      await saveMsg("assistant", reply);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Error de conexión." }]);
    }
    setLoading(false);
  }

  async function startSession() {
    await send("__CLARITY_START__");
  }

  return (
    <div style={{ background: DC.bg, minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: NUNITO, color: DC.txt }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');
        @keyframes p{0%,80%,100%{opacity:.2;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
        .chat-scroll::-webkit-scrollbar{width:4px}
        .chat-scroll::-webkit-scrollbar-track{background:transparent}
        .chat-scroll::-webkit-scrollbar-thumb{background:rgba(184,154,78,.25);border-radius:2px}
        .chat-scroll{scrollbar-width:thin;scrollbar-color:rgba(184,154,78,.25) transparent}
        textarea, input { color: ${darkMode ? "#f0ebe0" : "#1a1a1a"} !important; -webkit-text-fill-color: ${darkMode ? "#f0ebe0" : "#1a1a1a"} !important; caret-color: #b89a4e; }
        textarea::placeholder, input::placeholder { color: ${darkMode ? "rgba(240,235,224,.3)" : "rgba(26,26,26,.35)"} !important; -webkit-text-fill-color: ${darkMode ? "rgba(240,235,224,.3)" : "rgba(26,26,26,.35)"} !important; }
        select option { background: #080808; color: #f0ebe0; }
      `}</style>

      {/* Header */}
      <div style={{ padding: ".9rem 2rem", borderBottom: "1px solid rgba(184,154,78,.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <div style={{ ...logo, marginBottom: 0 }}>CLARITY</div>
          <div style={{ fontFamily: NUNITO, fontSize: ".85rem", color: DC.dim }}>
            Hola, <span style={{ color: DC.txt, fontWeight: 600 }}>{profile?.nombre}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {empresaData && (
            <span style={{ fontFamily: "monospace", fontSize: ".52rem", letterSpacing: ".15em", color: DC.dim, border: "1px solid rgba(184,154,78,.2)", padding: ".3em .8em", borderRadius: 20 }}>
              {empresaData.nombre}
            </span>
          )}
          <button onClick={() => setDarkMode((v) => !v)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, opacity: 0.8, display: "flex", alignItems: "center" }}>
            {darkMode
              ? <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DC.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
              : <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={DC.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>}
          </button>
          <button onClick={() => supabase.auth.signOut()} style={{ color: DC.gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".6rem" }}>
            Salir →
          </button>
        </div>
      </div>

      {/* Chat area */}
      <div style={{ flex: 1, maxWidth: 900, margin: "0 auto", width: "100%", padding: "0 clamp(60px,10vw,150px)", display: "flex", flexDirection: "column" }}>
        <div ref={chatContainerRef} className="chat-scroll" style={{ flex: 1, padding: "1.8rem 0", paddingRight: "2rem", display: "flex", flexDirection: "column", gap: "1.8rem", overflowY: "auto", maxHeight: "72vh", minHeight: 180 }}>

          {!started && msgs.length === 0 && (
            <div style={{ textAlign: "center", padding: "2.5rem 1rem", border: "1px solid rgba(184,154,78,.15)" }}>
              <div style={{ fontSize: "1.9rem", fontWeight: 300, marginBottom: ".8rem", fontFamily: GEORGIA }}>
                Hola, <span style={{ color: DC.gold, fontStyle: "italic" }}>{profile?.nombre}</span>
              </div>
              <div style={{ fontSize: ".9rem", color: DC.dim, marginBottom: "2rem", lineHeight: 1.7, maxWidth: 480, margin: "0 auto 2rem" }}>
                Soy tu AI Coach personal. Todo lo que te digo está basado en tu diseño biológico único — no en fórmulas genéricas. Y es completamente privado: tu empresa no tiene acceso a esta conversación.
              </div>
              <button onClick={startSession} style={{ ...btnGold, display: "inline-block", width: "auto", marginBottom: "2rem" }}>
                Empezar
              </button>
              <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", justifyContent: "center" }}>
                {CHIPS.map((c) => (
                  <button key={c} onClick={() => send(c)}
                    style={{ fontFamily: "monospace", fontSize: ".58rem", padding: ".4em .85em", border: "1px solid rgba(184,154,78,.25)", color: DC.dim, cursor: "pointer", background: "transparent", borderRadius: 20 }}
                    onMouseEnter={(e) => { e.target.style.borderColor = DC.gold; e.target.style.color = DC.gold; }}
                    onMouseLeave={(e) => { e.target.style.borderColor = "rgba(184,154,78,.25)"; e.target.style.color = DC.dim; }}>
                    {c}
                  </button>
                ))}
              </div>
            </div>
          )}

          {msgs.filter((m) => m.content !== "__CLARITY_START__").map((m, i, arr) => (
            <div key={i}
              ref={m.role === "assistant" && i === arr.length - 1 ? lastAssistantRef : m.role === "user" && i === arr.length - 1 ? lastUserRef : null}
              style={{ textAlign: m.role === "user" ? "right" : "left" }}>
              <div style={{ fontFamily: "monospace", fontSize: ".53rem", letterSpacing: ".3em", textTransform: "uppercase", marginBottom: ".3rem", color: m.role === "user" ? "rgba(240,235,224,.3)" : DC.gold }}>
                {m.role === "user" ? "Vos" : "CLARITY"}
              </div>
              {m.role === "assistant" ? (
                <div style={{ fontSize: "1rem", color: DC.txt, lineHeight: 1.85, fontFamily: GEORGIA }} dangerouslySetInnerHTML={{ __html: md(m.content) }} />
              ) : (
                <div style={{ fontSize: "1rem", fontStyle: "italic", color: "rgba(240,235,224,.55)", lineHeight: 1.7, fontFamily: NUNITO }}>
                  {m.content}
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div>
              <div style={{ fontFamily: "monospace", fontSize: ".53rem", letterSpacing: ".3em", color: DC.gold, marginBottom: ".3rem" }}>CLARITY</div>
              <div style={{ display: "flex", gap: 5 }}>
                {[0, 1, 2].map((i) => (
                  <div key={i} style={{ width: 5, height: 5, background: DC.gold, borderRadius: "50%", animation: `p 1.4s ${i * 0.2}s infinite ease-in-out` }} />
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div style={{ padding: "1rem 0 1.5rem", borderTop: "1px solid rgba(184,154,78,.15)", display: "flex", gap: ".8rem", alignItems: "flex-end" }}>
          <textarea
            style={{ flex: 1, background: "transparent", border: "none", borderBottom: `1px solid ${DC.gold}40`, color: DC.txt, fontFamily: GEORGIA, fontSize: ".95rem", padding: ".6rem 0", outline: "none", resize: "none", minHeight: "2rem", lineHeight: 1.5 }}
            value={input}
            placeholder="¿De qué hablamos?"
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
            rows={1}
          />
          <button onClick={() => send()} disabled={loading || !input.trim()}
            style={{ background: "transparent", border: "1px solid " + DC.gold, borderRadius: 20, color: DC.gold, fontFamily: "monospace", fontSize: ".6rem", letterSpacing: ".2em", padding: ".6em 1em", cursor: "pointer", textTransform: "uppercase", marginBottom: 2, opacity: loading || !input.trim() ? 0.3 : 1 }}>
            Enviar
          </button>
        </div>
      </div>

      <div style={{ textAlign: "center", padding: ".6rem", fontFamily: "monospace", fontSize: ".5rem", color: darkMode ? "rgba(240,235,224,.15)" : "rgba(26,26,26,.3)", letterSpacing: ".15em" }}>
        SIMPLE CLARITY · 2026 · Tus conversaciones son privadas. La empresa no tiene acceso.
      </div>
    </div>
  );
}

// ─── SHARED BUTTON STYLES ─────────────────────────────────────────────────────
const btnGold = {
  background: C.gold,
  color: C.bg,
  border: "none",
  borderRadius: 24,
  fontFamily: "monospace",
  fontSize: ".65rem",
  letterSpacing: ".3em",
  padding: ".85em 2em",
  cursor: "pointer",
  textTransform: "uppercase",
  width: "100%",
};
const btnBack = {
  background: "none",
  border: "none",
  color: C.dim,
  cursor: "pointer",
  fontFamily: "monospace",
  fontSize: ".55rem",
  letterSpacing: ".1em",
  marginTop: ".8rem",
  width: "100%",
  textAlign: "center",
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState("loading");
  const [pendingEmail, setPendingEmail] = useState("");
  const [profile, setProfile] = useState(null);
  const [empresaData, setEmpresaData] = useState(null);
  const [lang, setLang] = useState("es");

  function go(s, e) {
    if (e) setPendingEmail(e);
    setScreen(s);
  }

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) loadProfile(session.user.id);
      else setScreen("welcome");
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) loadProfile(session.user.id);
      else { setProfile(null); setEmpresaData(null); setScreen("welcome"); }
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  async function loadProfile(userId) {
    const { data, error } = await supabase.from("perfiles").select("*").eq("user_id", userId).single();
    if (error || !data) { setScreen("welcome"); return; }
    setProfile(data);
    if (data.empresa_id) {
      const { data: emp } = await supabase.from("empresas").select("nombre, documentos_contexto").eq("id", data.empresa_id).single();
      setEmpresaData(emp);
    }
    setScreen("chat");
  }

  if (screen === "loading") return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.gold, animation: "pulse 1.4s ease-in-out infinite" }} />
      <style>{`@keyframes pulse{0%,100%{opacity:.3;transform:scale(.8)}50%{opacity:1;transform:scale(1)}}`}</style>
    </div>
  );

  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{"*{box-sizing:border-box;margin:0;padding:0}body{background:#080808}input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #080808 inset!important;-webkit-text-fill-color:#f0ebe0!important}select{-webkit-appearance:none;appearance:none}"}</style>
      {screen === "welcome"  && <Welcome go={go} lang={lang} setLang={setLang} />}
      {screen === "register" && <Register go={go} lang={lang} setLang={setLang} />}
      {screen === "pending"  && <Pending email={pendingEmail} go={go} />}
      {screen === "login"    && <Login go={go} />}
      {screen === "chat"     && <Chat go={go} profile={profile} empresaData={empresaData} />}
    </div>
  );
}
