import React, { useState } from "react";

const NUNITO = "'Nunito', sans-serif";
const GEORGIA = "Georgia, serif";
const SUPABASE_URL = "https://ebczaoptweskqzuzrmls.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImViY3phb3B0d2Vza3F6dXpybWxzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzU0OTMxODEsImV4cCI6MjA5MTA2OTE4MX0.Q5wqENM29xaLdVdoG8Gx6Pl49WZSQIGfe2704fa-vNc";

const SYSTEM_PROMPT = `Sos un consultor especializado en el método SIMPLE de Diseño Humano, con 15 años de experiencia asesorando a empresarios y directivos. Tu trabajo es traducir el Diseño Humano en orientación práctica y concreta para la vida real.

TONO Y ESTILO:
- Voseo rioplatense siempre. Todo en español, salvo que la persona escriba en inglés.
- Directo, cálido, sin solemnidad. Como un amigo muy inteligente que sabe mucho.
- Frases cortas. Sin paja. Sin intro genérica tipo "gran pregunta" o "en el Diseño Humano...".
- No uses el nombre de la persona, solo "vos" y "tu".
- Adaptá la profundidad al tipo de pregunta: si es simple, respondé corto; si es compleja, desarrollá.
- Siempre cerrá con algo accionable o una regla práctica clara. Nunca termines solo en lo reflexivo.
- NUNCA uses groserías, palabrotas ni expresiones vulgares, sin importar el contexto. Mantené siempre un lenguaje respetuoso y profesional.
- IDIOMA ESTRICTO: cuando el usuario escribe en español, respondé 100% en español. NUNCA insertes palabras en inglés dentro de una oración en español, ni siquiera términos técnicos de Diseño Humano. Usá siempre su equivalente en español.

GLOSARIO DE DISEÑO HUMANO — usá SIEMPRE la versión en español:
Tipos: Manifestor → Manifestador | Generator → Generador | Manifesting Generator → Generador Manifestante | Projector → Proyector | Reflector → Reflector
Autoridades: Sacral → Sacral (este término se mantiene igual) | Splenic → Esplénica | Emotional → Emocional | Ego → Ego | Self-Projected → desde el Sí Mismo | Mental → Mental | Lunar → Lunar
Centros: Sacral Center → Centro Sacral | Solar Plexus → Plexo Solar | Spleen → Bazo | Heart/Ego → Corazón | G Center → Centro G | Throat → Garganta | Ajna → Ajna | Head → Cabeza | Root → Raíz
Otros términos: Not-Self → no-self (se acepta) | signature → firma | profile → perfil | cross → cruz | definition → definición | channels → canales | gates → puertas | conditioning → condicionamiento | deconditioning → desacondicionamiento | aura → aura | strategy → estrategia | authority → autoridad | open center → centro abierto | defined center → centro definido
Anglicismos generales — traducí siempre: worth → valor o mérito, mindset → mentalidad, feedback → devolución, insight → claridad o revelación, output → resultado, burnout → agotamiento, trigger → disparador, default → respuesta automática, flow → flujo.

VOCABULARIO — USÁ SIEMPRE:
vitalidad, mecánica natural, estar en eje / sacarte de eje, dejar decantar, claridad, decisión, impacto, foco, gestionar, accionable, respuesta por default, estrategia, diseño, perfil, tipo, centro, autoridad.

VOCABULARIO — USÁ CON CRITERIO (solo cuando suena natural):
arrancar, bajada práctica, en caliente, ola emocional, decantar, no hay verdad en el ahora.

VOCABULARIO — NUNCA:
- Groserías o expresiones vulgares de ningún tipo, bajo ninguna circunstancia.
- Lunfardo: laburo, posta, quilombo, fiaca, piola, copado, berretín, chabón, zarpado, "re" como intensificador.
- Autoayuda espiritual: vibrar, vibración, manifestar, manifestación, sanar, sanación, propósito de vida, misión de alma, despertar, expandir tu conciencia, anclar esa energía, integrar tu sombra, auras, chakras, encarnación, energías cósmicas.
- Metáforas confusas o coloquiales que no se entiendan con claridad.
- Tecnicismos de Diseño Humano sin explicación: nunca uses términos como "canal", "puerta", "hexagrama", "encarnación" sin explicar en términos simples qué significa para esa persona en su vida cotidiana.

CÓMO USAR EL DISEÑO HUMANO:
- Siempre anclá tu respuesta en el tipo, autoridad, perfil o centros — pero traducilo a consecuencias prácticas, nunca como clase teórica.
- Cuando menciones un concepto de DH (Generador, Sacral, perfil 4/6, etc.), explicá inmediatamente qué significa en términos concretos para esa persona. Nunca asumas que ya lo sabe.
- Ejemplo correcto: "Tu autoridad Sacral significa que tu cuerpo responde antes que tu mente — si algo te genera energía y ganas, es un sí. Si sentís pesadez o indiferencia, es un no."
- Ejemplo incorrecto: "Como tenés autoridad Sacral, deberías escuchar tu Sacral."
- Puertas y canales: mencionarlos SOLO si la persona pregunta por detalles técnicos.
- Para entornos, usá siempre los nombres en español: Cuevas, Montañas, Valles, Costas, Mercados, Cocinas.

ESTRUCTURA DE UNA BUENA RESPUESTA:
1. Anclá en el diseño específico de la persona (tipo + autoridad + perfil) — siempre explicando qué significa
2. Explicá la consecuencia práctica concreta — qué pasa cuando lo aplica y qué pasa cuando no
3. Incluí el riesgo o trampa específica de su diseño ("ojo con esto")
4. Cerrá con una regla práctica o accionable claro

CÓMO RESPONDER SEGÚN EL TIPO DE PREGUNTA:
- Pregunta genérica (ej: "¿cómo tomo mejores decisiones?"): hacé UNA pregunta de contexto antes de responder.
- Pregunta específica con contexto: respondé directo, anclado en su diseño.
- Pregunta sobre decisiones: explicá su autoridad como mecanismo concreto + regla de oro práctica.
- Pregunta sobre vínculos: usá perfil y tipo para describir su patrón natural + cómo gestionarlo.
- Pregunta sobre liderazgo o equipos: estrategia y autoridad como base + qué hacer con cada tipo de vínculo.
- Pregunta sobre energía o agotamiento: usá centros definidos + relación con su firma y no-self theme.
- Pregunta sobre propósito o dirección: usá perfil y tipo sin sonar a autoayuda.

AUTORIDADES — CÓMO EXPLICARLAS EN TÉRMINOS PRÁCTICOS:
- Sacral: la respuesta está en el cuerpo, no en la mente. Sí = expansión, no = contracción. Decidís antes de pensar.
- Emocional: no hay verdad en el ahora. Dejá decantar la ola. Si después de tiempo sentís calma neutra, ese es el camino. Si te presionan a decidir rápido, tu respuesta por default es "no".
- Esplénica: intuición instantánea que no se repite. Es un susurro, no un grito. Si lo ignorás, después sabés que era correcto.
- Ego: decidís desde lo que genuinamente querés, no desde lo que deberías querer.
- Self/G: esperás tener claridad sobre la dirección antes de moverte. La claridad llega sola, no se fuerza.

LÍMITES:
- Si la pregunta no tiene que ver con DH ni con desarrollo personal o profesional, decí amablemente que no es tu área.
- No hagas diagnósticos médicos ni de salud mental.
- Si falta contexto, preguntá antes de responder.

PERSONALIZACIÓN POR DISEÑO — estas reglas se aplican de forma sutil y natural, nunca mecánica ni condescendiente:

NO-SELF THEME (señal de que la persona está fuera de eje):
- Frustración: cuando la detectás en el tono de la pregunta, nombrála directamente. "Eso que sentís es la señal de que algo en este proceso va contra tu mecánica natural."
- Amargura: si hay resignación o sensación de que las oportunidades no llegan, recordale que su estrategia es esperar la invitación correcta, no buscar activamente.
- Enojo: si hay impulsividad o queja de resistencia del entorno, preguntá si informó sus movimientos antes de actuar.
- Decepción: si hay sensación de que las cosas no resultaron como esperaba, explorá si inició desde la mente o esperó respuesta real.

MOTIVACIÓN (motor detrás de sus decisiones — usalo para enmarcar las sugerencias):
- Esperanza: hablale desde las posibilidades futuras. "Esto puede abrirte..."
- Inocencia: no lo sobrecargues de análisis. Sugería probar con ligereza.
- Deseo: preguntá siempre si genuinamente quiere algo antes de sugerir cómo lograrlo.
- Necesidad: se activa con problemas concretos. Dale soluciones específicas, no marcos generales.
- Culpa: si detectás que actúa por obligación, ayudalo a distinguir qué es suyo y qué es expectativa ajena.
- Miedo: no lo empujés. Acompañá desde la claridad de lo que ya tiene.

CRUZ DE ENCARNACIÓN (contexto de vida):
- Right Angle: su camino es personal, no busca impacto masivo. No lo presiones con preguntas de legado o escala.
- Left Angle: sus encuentros con otros la definen. Cuando hables de oportunidades, anclalas en vínculos y contextos específicos.
- Juxtaposition: tiene un solo camino posible. Ayudalo a aceptar su naturaleza sin resistirla, no a buscar alternativas.

DEFINICIÓN (cómo procesa la realidad):
- Simple: consistente y predecible. No necesita mucho tiempo para decidir si su autoridad es clara.
- Doble: puede verse contradictoria. Normalizá que tenga dos naturalezas que coexisten.
- Triple: necesita más tiempo y contexto. No la apures. Sus decisiones maduran despacio.

LÍNEAS DE PERFIL (adaptar el estilo de entrega, no el contenido):
- Línea 1: necesita fundamentos. Dale el marco antes de la sugerencia.
- Línea 2: aprende solo. Sugerí en lugar de instruir. Dejale espacio.
- Línea 3: aprende del error. Cuando pregunte sobre fracasos o frustraciones, recordale que probar es su método. No en cada respuesta — solo cuando sea relevante o muestre autocrítica.
- Línea 4: confía en su red. Cuando evalúe oportunidades, preguntá quién de su entorno cercano está involucrado.
- Línea 5: carga con expectativas ajenas. Ayudalo a separar lo que otros esperan de lo que él realmente quiere.
- Línea 6: proceso de largo plazo. No lo presiones con resultados inmediatos. Su madurez llega en etapas.

CENTROS INDEFINIDOS CLAVE (vulnerabilidades a nombrar solo cuando sean relevantes):
- G indefinido: identidad fluida. No lo encasilles. Ayudalo a encontrar claridad en el contexto, no en definiciones fijas.
- Ego indefinido: tiende a sobre-comprometerse para demostrar valor. Nunca lo presiones a comprometerse. Ayudalo a evaluar desde sus ganas reales.
- Emocional indefinido: absorbe el estado emocional del entorno. Cuando esté confundido, preguntá si lo que siente es suyo o del contexto.
- Cabeza indefinida: se llena de preguntas ajenas. Anclaló en sus preguntas propias, no en las de los demás.`;


const ENTORNOS_ES = {
  "Mountains": "Montañas", "Shores": "Costas", "Valleys": "Valles",
  "Caves": "Cuevas", "Markets": "Mercados", "Kitchens": "Cocinas",
  "Mountain": "Montañas", "Shore": "Costas", "Valley": "Valles",
  "Cave": "Cuevas", "Market": "Mercados", "Kitchen": "Cocinas"
};

const MOTIVACIONES_ES = {
  "Innocence": "Inocencia", "Hope": "Esperanza", "Desire": "Deseo",
  "Need": "Necesidad", "Guilt": "Culpa", "Fear": "Miedo"
};

function traducirEntorno(e) { return ENTORNOS_ES[e] || e; }
function traducirMotivacion(m) { return MOTIVACIONES_ES[m] || m; }

const USERS = {
  "mark@multiplaihealth.com": {
    nombre: "Mark Paul", apellido: "Ramondt", tipo: "Generador", autoridad: "Emocional (Plexo Solar)", perfil: "4/1",
    estrategia: "Responder", firma: "Satisfacción", no_self_theme: "Frustración", definicion: "Triple",
    centros: { Emocional: "defined", Ajna: "defined", Sacral: "defined", Bazo: "undefined", Corazon: "undefined", Cabeza: "defined", Garganta: "defined", G: "defined", Raiz: "defined" },
    canales_definidos: ["43-23", "64-47", "46-29", "30-41"],
    variables: { motivación: "Innocence", digestión: "Calm", perspectiva: "Perspective 6", entorno: "Mountains" },
    fecha_nacimiento: "1969-11-14", lugar_nacimiento: "Ciudad de México, México"
  },
  "tomas.fileni@gmail.com": {
    nombre: "Tomás", apellido: "Fileni", tipo: "Generador", autoridad: "Sacral", perfil: "2/4",
    estrategia: "Responder", firma: "Satisfacción", no_self_theme: "Frustración", definicion: "Doble",
    centros: { Bazo: "defined", Sacral: "defined", Emocional: "undefined", Ajna: "undefined", Raiz: "undefined", Corazon: "defined", Garganta: "undefined", G: "defined", Cabeza: "undefined" },
    canales_definidos: ["26-44", "46-29"],
    variables: { motivación: "Guilt", digestión: "Smell", entorno: "Valleys", perspectiva: "Perspective 5" },
    fecha_nacimiento: "1988-02-15", lugar_nacimiento: "Buenos Aires, Argentina"
  },
  "blondyar@gmail.com": {
    nombre: "Daniela", apellido: "Cuppi", tipo: "Generador Manifestante", autoridad: "Sacral", perfil: "6/2",
    estrategia: "Responder y luego informar", firma: "Satisfacción/Paz", no_self_theme: "Frustración/Enojo", definicion: "Simple",
    centros: { Sacral: "defined", Bazo: "undefined", Emocional: "undefined", Ajna: "undefined", Raiz: "defined", Corazon: "undefined", Cabeza: "undefined", G: "defined", Garganta: "defined" },
    canales_definidos: ["10-34", "31-7", "9-52"],
    variables: { motivación: "Hope", digestión: "Calm", perspectiva: "Personal", entorno: "Shores" },
    fecha_nacimiento: "1986-06-30", lugar_nacimiento: "Córdoba, Argentina"
  },
  "mateo@cookunity.com": {
    nombre: "Mateo", apellido: "Marietti", tipo: "Proyector", autoridad: "Emocional (Plexo Solar)", perfil: "3/5",
    estrategia: "Esperar invitación", firma: "Éxito", no_self_theme: "Amargura", definicion: "Doble",
    centros: { Ajna: "defined", G: "undefined", Emocional: "defined", Cabeza: "undefined", Corazon: "undefined", Bazo: "defined", Sacral: "undefined", Garganta: "defined", Raiz: "defined" },
    canales_definidos: ["43-23", "28-38", "30-41"],
    variables: { motivación: "Desire", digestión: "Thirst", entorno: "Caves", perspectiva: "Personal" },
    fecha_nacimiento: "1985-02-15", lugar_nacimiento: "Buenos Aires, Argentina"
  },
  "soyfranblanco@gmail.com": {
    nombre: "Francisco", apellido: "Blanco", tipo: "Generador", autoridad: "Sacral", perfil: "4/6",
    estrategia: "Responder", firma: "Satisfacción", no_self_theme: "Frustración", definicion: "Simple",
    centros: { Corazon: "undefined", Cabeza: "undefined", G: "undefined", Emocional: "undefined", Ajna: "undefined", Raiz: "defined", Sacral: "defined", Garganta: "undefined", Bazo: "defined" },
    canales_definidos: ["28-38", "50-27", "42-53"],
    variables: { motivación: "Hope", perspectiva: "Perspective 6", entorno: "Caves", digestión: "Calm" },
    fecha_nacimiento: "1984-05-06", lugar_nacimiento: "San Andrés de Giles, Argentina"
  },
  "gonzalo@chatcenter.net": {
    nombre: "Gonzalo Ezequiel", apellido: "Baez Veglia", tipo: "Manifestador", autoridad: "Emocional (Plexo Solar)", perfil: "5/1",
    estrategia: "Informar antes de actuar", firma: "Paz", no_self_theme: "Enojo", definicion: "Simple",
    centros: { Ajna: "defined", Bazo: "defined", G: "undefined", Sacral: "undefined", Emocional: "defined", Cabeza: "defined", Garganta: "defined", Raiz: "undefined", Corazon: "defined" },
    canales_definidos: ["26-44", "40-37", "64-47", "11-56", "35-36"],
    variables: { perspectiva: "Perspective 3", motivación: "Hope", digestión: "Cold", entorno: "Mountains" },
    cruz_encarnacion: { tipo: "Left Angle" },
    fecha_nacimiento: "1979-02-28", lugar_nacimiento: "Córdoba, Argentina"
  },
  "nico@becoming.com.ar": {
    nombre: "Nicolás", apellido: "Pimentel", tipo: "Generador Manifestante", autoridad: "Emocional (Plexo Solar)", perfil: "6/3",
    estrategia: "Responder y luego informar", firma: "Satisfacción/Paz", no_self_theme: "Frustración/Enojo", definicion: "Simple",
    centros: { Raiz: "defined", G: "undefined", Ajna: "undefined", Bazo: "defined", Cabeza: "undefined", Garganta: "defined", Corazon: "undefined", Emocional: "defined", Sacral: "defined" },
    canales_definidos: ["20-34", "12-22", "18-58", "42-53"],
    variables: { perspectiva: "Perspective 4", digestión: "Calm", entorno: "Valleys", motivación: "Innocence" },
    cruz_encarnacion: { tipo: "Left Angle" },
    fecha_nacimiento: "1975-03-13", lugar_nacimiento: "Buenos Aires, Argentina"
  },
  "dejatellevaralegremente@gmail.com": {
    nombre: "Mercedes", apellido: "González", tipo: "Proyector", autoridad: "Esplénica (Bazo)", perfil: "4/1",
    estrategia: "Esperar invitación", firma: "Éxito", no_self_theme: "Amargura", definicion: "Simple",
    centros: { Cabeza: "undefined", Corazon: "undefined", Ajna: "undefined", G: "defined", Emocional: "undefined", Raiz: "undefined", Bazo: "defined", Sacral: "undefined", Garganta: "undefined" },
    canales_definidos: ["10-57"],
    variables: { motivación: "Innocence", entorno: "Shores", perspectiva: "Perspective 6", digestión: "Calm" },
    fecha_nacimiento: "1990-01-03", lugar_nacimiento: "Buenos Aires, Argentina"
  }
};

const CHIPS_ES = [
  "¿Cómo tomo decisiones importantes?",
  "¿Cuál es mi superpoder en el trabajo?",
  "¿Qué más puedo conocer de mi diseño?",
  "¿Cómo puedo sacarle más provecho a esta herramienta?"
];

const CHIPS_EN = [
  "How do I make important decisions?",
  "What's my superpower at work?",
  "What else can I learn about my design?",
  "How can I get the most out of this tool?"
];

const C = { bg: "#080808", gold: "#b89a4e", txt: "#f0ebe0", dim: "rgba(240,235,224,0.45)" };

function md(t) {
  return t
    .replace(/^### (.+)$/gm, '<span style="color:#b89a4e">$1</span>')
    .replace(/^## (.+)$/gm, '<span style="color:#b89a4e">$1</span>')
    .replace(/^# (.+)$/gm, '<span style="color:#b89a4e">$1</span>')
    .replace(/\*\*(.*?)\*\*/g, '<span style="color:#b89a4e">$1</span>')
    .replace(/\n/g, "<br/>");
}

const logo = { fontFamily: "monospace", fontSize: ".7rem", letterSpacing: ".5em", color: "#b89a4e", border: "1px solid #b89a4e", padding: ".4em 1em", display: "inline-block", marginBottom: "3rem" };
const lbl = { fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".3em", color: "#b89a4e", textTransform: "uppercase", display: "block", marginBottom: ".35rem" };
const inp = { width: "100%", background: "transparent", border: "none", borderBottom: "1px solid rgba(184,154,78,.3)", color: "#f0ebe0", fontFamily: NUNITO, fontSize: ".95rem", padding: ".6rem 0", outline: "none", marginBottom: "1.3rem", display: "block", boxSizing: "border-box" };

function Eye({ value, onChange, placeholder = "Contraseña", onKeyDown }) {
  const [s, setS] = useState(false);
  return (
    <div style={{ position: "relative", marginBottom: "1.3rem" }}>
      <input style={{ ...inp, marginBottom: 0, paddingRight: "2rem" }} type={s ? "text" : "password"} placeholder={placeholder} value={value} onChange={onChange} onKeyDown={onKeyDown} />
      <button onClick={() => setS(v => !v)} style={{ position: "absolute", right: 0, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(240,235,224,.45)", fontSize: "1rem" }}>
        {s ? "🙈" : "👁"}
      </button>
    </div>
  );
}

function Welcome({ go, lang, setLang }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: NUNITO, color: C.txt }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');`}</style>
      <div style={{ position: "fixed", top: "1.5rem", right: "1.5rem", display: "flex", gap: ".3rem" }}>
        {["es", "en"].map(l => (
          <button key={l} onClick={() => setLang(l)}
            style={{ background: lang === l ? "rgba(184,154,78,.15)" : "none", border: "1px solid rgba(184,154,78,.25)", color: lang === l ? C.gold : C.dim, fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".2em", padding: ".3em .7em", cursor: "pointer", textTransform: "uppercase" }}>
            {l}
          </button>
        ))}
      </div>
      <div style={logo}>SIMPLE</div>
      <div style={{ textAlign: "center", maxWidth: 560 }}>
        <div style={{ fontSize: "clamp(1.8rem,4vw,2.8rem)", fontWeight: 300, lineHeight: 1.25, marginBottom: "1.4rem", fontFamily: GEORGIA }}>
          {lang === "en" ? <>Your personal<br/><span style={{ color: C.gold, fontStyle: "italic" }}>decision-making system.</span></> : <>Tu sistema personal de<br/><span style={{ color: C.gold, fontStyle: "italic" }}>toma de decisiones.</span></>}
        </div>
        <div style={{ color: C.dim, fontSize: "1rem", lineHeight: 1.8, maxWidth: 460, margin: "0 auto 2.5rem", fontFamily: NUNITO, fontWeight: 400 }}>
          {lang === "en" ? "An AI that responds according to how you're designed." : "Una IA que responde según cómo estás diseñado."}
        </div>
        <div style={{ maxWidth: 300, margin: "0 auto", display: "flex", flexDirection: "column", gap: ".8rem" }}>
          <button onClick={() => go("register")} style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: "pointer", textTransform: "uppercase", width: "100%" }}>
            {lang === "en" ? "Create my account" : "Crear mi cuenta"}
          </button>
          <button onClick={() => go("login")} style={{ background: "transparent", color: C.dim, border: "1px solid rgba(184,154,78,.3)", fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: "pointer", textTransform: "uppercase", width: "100%" }}>
            {lang === "en" ? "I already have an account" : "Ya tengo cuenta"}
          </button>
        </div>
      </div>
      <div style={{ position: "fixed", bottom: "2rem", fontFamily: "monospace", fontSize: ".55rem", color: "rgba(240,235,224,.2)", letterSpacing: ".15em", textAlign: "center" }}>
        "SIMPLE es una herramienta creada y registrada por Fran Blanco. 2026"
      </div>
    </div>
  );
}

function CityInput({ value, onChange, placeholder }) {
  const [sugerencias, setSugerencias] = useState([]);
  const [show, setShow] = useState(false);
  const timer = React.useRef(null);

  async function buscar(q) {
    if (q.length < 3) { setSugerencias([]); return; }
    try {
      const r = await fetch(`https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(q)}&format=json&limit=5&featuretype=city&accept-language=es`);
      const data = await r.json();
      setSugerencias(data.map(d => d.display_name));
    } catch { setSugerencias([]); }
  }

  function handleChange(e) {
    onChange(e.target.value);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => buscar(e.target.value), 400);
    setShow(true);
  }

  function elegir(ciudad) {
    onChange(ciudad);
    setSugerencias([]);
    setShow(false);
  }

  return (
    <div style={{ position: "relative", marginBottom: "1.3rem" }}>
      <input style={{ ...inp, marginBottom: 0 }} placeholder={placeholder} value={value} onChange={handleChange} onBlur={() => setTimeout(() => setShow(false), 200)} onFocus={() => sugerencias.length > 0 && setShow(true)} />
      {show && sugerencias.length > 0 && (
        <div style={{ position: "absolute", top: "100%", left: 0, right: 0, background: "#1a1a1a", border: "1px solid rgba(184,154,78,.3)", zIndex: 50, maxHeight: 200, overflowY: "auto" }}>
          {sugerencias.map((s, i) => (
            <div key={i} onClick={() => elegir(s)}
              style={{ padding: ".7rem 1rem", fontSize: ".82rem", color: C.dim, cursor: "pointer", borderBottom: "1px solid rgba(184,154,78,.1)" }}
              onMouseEnter={e => e.target.style.color = C.gold}
              onMouseLeave={e => e.target.style.color = C.dim}>
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function Register({ go, lang, setDynamicUser }) {
  const [f, setF] = useState({ nom: "", ape: "", email: "", tel: "", fecha: "", hora: "", lugar: "", pass: "" });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));

  async function ok() {
    if (!f.nom || !f.ape || !f.email || !f.fecha || !f.hora || !f.lugar || !f.pass) {
      setErr("Completá todos los campos obligatorios."); return;
    }
    setLoading(true);
    setErr("");
    try {
      // 1. Calcular diseño
      const r = await fetch("/api/hd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre: f.nom, apellido: f.ape, birth_date: f.fecha, birth_time: f.hora, ciudad: f.lugar })
      });
      const diseno = await r.json();
      if (diseno.error) { setErr("Error al calcular tu diseño: " + diseno.error); setLoading(false); return; }

      // 2. Guardar en Supabase directamente
      const dbR = await fetch("https://ebczaoptweskqzuzrmls.supabase.co/rest/v1/usuarios", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`,
          "Prefer": "return=minimal"
        },
        body: JSON.stringify({
          email: f.email.toLowerCase().trim(),
          nombre: f.nom,
          apellido: f.ape,
          password_hash: f.pass,
          diseno: diseno
        })
      });

      if (!dbR.ok) {
        const dbErr = await dbR.json().catch(() => ({}));
        if (dbErr.message?.includes("duplicate") || dbErr.code === "23505") {
          setErr("Ese email ya está registrado. Ingresá con tu contraseña."); setLoading(false); return;
        }
        setErr("Error al crear la cuenta: " + (dbErr.message || dbErr.error || dbR.status)); setLoading(false); return;
      }

      setDynamicUser({ ...diseno, email: f.email.toLowerCase().trim() });
      go("onboarding", f.email.toLowerCase().trim());
    } catch (e) {
      setErr("Error: " + (e?.message || "No se pudo conectar con el servidor."));
    }
    setLoading(false);
  }
  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", padding: "2.5rem 2rem", fontFamily: "Georgia,serif", color: C.txt, overflowY: "auto" }}>
      <div style={logo}>SIMPLE</div>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 300, textAlign: "center", marginBottom: ".4rem" }}>Crear cuenta</div>
        <div style={{ color: C.dim, textAlign: "center", marginBottom: "1.5rem", fontSize: ".9rem", lineHeight: 1.6 }}>Ingresá tus datos para calcular tu diseño.</div>
        <div style={{ border: "1px solid rgba(184,154,78,.2)", padding: "2.5rem", background: "rgba(255,255,255,.02)", borderRadius: 16 }}>
          {err && <div style={{ color: "#c06040", fontFamily: "monospace", fontSize: ".63rem", marginBottom: ".8rem", textAlign: "center" }}>{err}</div>}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={lbl}>Nombre *</label><input style={inp} placeholder="Tu nombre" value={f.nom} onChange={e => u("nom", e.target.value)} /></div>
            <div><label style={lbl}>Apellido *</label><input style={inp} placeholder="Tu apellido" value={f.ape} onChange={e => u("ape", e.target.value)} /></div>
          </div>
          <label style={lbl}>Email *</label>
          <input style={inp} type="email" placeholder="tu@email.com" value={f.email} onChange={e => u("email", e.target.value)} />
          <label style={lbl}>Teléfono</label>
          <input style={inp} type="tel" placeholder="+54 11 0000 0000" value={f.tel} onChange={e => u("tel", e.target.value)} />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <div><label style={lbl}>Fecha *</label><input style={{ ...inp, colorScheme: "dark" }} type="date" value={f.fecha} onChange={e => u("fecha", e.target.value)} /></div>
            <div><label style={lbl}>Hora *</label><input style={{ ...inp, colorScheme: "dark" }} type="time" value={f.hora} onChange={e => u("hora", e.target.value)} /></div>
          </div>
          <label style={lbl}>Lugar de nacimiento *</label>
          <CityInput value={f.lugar} onChange={v => u("lugar", v)} placeholder="Ciudad, País" />
          <label style={lbl}>Contraseña *</label>
          <Eye value={f.pass} onChange={e => u("pass", e.target.value)} />
          <div style={{ display: "flex", alignItems: "flex-start", gap: ".7rem", marginBottom: "1.2rem" }}>
            <input type="checkbox" id="tyc" checked={f.tyc || false} onChange={e => u("tyc", e.target.checked)}
              style={{ marginTop: ".2rem", accentColor: C.gold, cursor: "pointer" }} />
            <label htmlFor="tyc" style={{ fontFamily: NUNITO, fontSize: ".78rem", color: C.dim, lineHeight: 1.6, cursor: "pointer" }}>
              Acepto los <span style={{ color: C.gold }}>términos y condiciones</span> de uso de SIMPLE. Esta herramienta es orientativa y no reemplaza el consejo profesional.
            </label>
          </div>
          <button onClick={ok} disabled={loading || !f.tyc} style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: loading ? "wait" : "pointer", textTransform: "uppercase", width: "100%", opacity: loading || !f.tyc ? 0.5 : 1 }}>
            {loading ? "Calculando tu diseño..." : "Registrarme"}
          </button>
        </div>
        <div style={{ textAlign: "center", margin: "1.2rem 0", color: C.dim, fontFamily: "monospace", fontSize: ".7rem" }}>
          ¿Ya tenés cuenta? <button onClick={() => go("login")} style={{ color: C.gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".63rem" }}>Ingresá acá</button>
        </div>
      </div>
    </div>
  );
}

function Pending({ email, go }) {
  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: "Georgia,serif", color: C.txt }}>
      <div style={logo}>SIMPLE</div>
      <div style={{ textAlign: "center", maxWidth: 460 }}>
        <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem" }}>✉️</div>
        <div style={{ fontSize: "1.5rem", fontWeight: 300, marginBottom: ".8rem" }}>Revisá tu email</div>
        <div style={{ color: C.dim, lineHeight: 1.7, marginBottom: "1.5rem" }}>
          Te mandamos un link a <span style={{ color: C.gold }}>{email}</span>.<br /><br />
          Una vez que confirmés podés ingresar y explorar tu diseño.
        </div>
        <div style={{ border: "1px solid rgba(184,154,78,.2)", padding: "1rem 1.5rem", background: "rgba(184,154,78,.04)", marginBottom: "2rem", fontFamily: "monospace", fontSize: ".68rem", color: C.dim, lineHeight: 1.8 }}>
          ¿No recibiste el email? Revisá tu carpeta de spam.
        </div>
        <button onClick={() => go("welcome")} style={{ color: C.gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".63rem" }}>← Volver al inicio</button>
      </div>
    </div>
  );
}

function Login({ go, lang, setDynamicUser }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function ok() {
    if (!email || !pass) { setErr(lang === "en" ? "Please enter email and password." : "Completá email y contraseña."); return; }
    const emailClean = email.toLowerCase().trim();

    // Primero intentar usuarios hardcodeados (demo)
    const demoUser = USERS[emailClean];
    if (demoUser && pass === "demo") {
      go("onboarding", emailClean);
      return;
    }

    // Luego intentar Supabase
    setLoading(true);
    setErr("");
    try {
      const r = await fetch(`https://ebczaoptweskqzuzrmls.supabase.co/rest/v1/usuarios?email=eq.${encodeURIComponent(emailClean)}&select=*`, {
        headers: {
          "apikey": SUPABASE_KEY,
          "Authorization": `Bearer ${SUPABASE_KEY}`
        }
      });
      const users = await r.json();
      if (!users || users.length === 0) {
        setErr(lang === "en" ? "Email not found." : "Email no encontrado."); setLoading(false); return;
      }
      const user = users[0];
      if (user.password_hash !== pass) {
        setErr(lang === "en" ? "Wrong password." : "Contraseña incorrecta."); setLoading(false); return;
      }
      setDynamicUser({ ...user.diseno, nombre: user.nombre, apellido: user.apellido, email: emailClean, rol: user.rol });
      
      // Verificar si tiene conversaciones previas para saltar el onboarding
      try {
        const convR = await fetch(`https://ebczaoptweskqzuzrmls.supabase.co/rest/v1/conversaciones?usuario_email=eq.${encodeURIComponent(emailClean)}&limit=1`, {
          headers: {
            "apikey": SUPABASE_KEY,
            "Authorization": `Bearer ${SUPABASE_KEY}`
          }
        });
        const convs = await convR.json();
        if (Array.isArray(convs) && convs.length > 0) {
          go("chat", emailClean); // Ya usó la app antes → directo al chat
        } else {
          go("onboarding", emailClean); // Primera vez → onboarding
        }
      } catch {
        go("onboarding", emailClean);
      }
    } catch {
      setErr(lang === "en" ? "Connection error. Try again." : "Error de conexión. Intentá de nuevo.");
    }
    setLoading(false);
  }
  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: NUNITO, color: C.txt }}>
      <div style={logo}>SIMPLE</div>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ fontSize: "1.5rem", fontWeight: 300, textAlign: "center", marginBottom: ".4rem", fontFamily: GEORGIA }}>{lang === "en" ? "Sign in" : "Ingresar"}</div>
        <div style={{ color: C.dim, textAlign: "center", marginBottom: "1.5rem", fontSize: ".9rem" }}>{lang === "en" ? "Welcome back." : "Bienvenido de nuevo."}</div>
        <div style={{ border: "1px solid rgba(184,154,78,.2)", padding: "2.5rem", background: "rgba(255,255,255,.02)", borderRadius: 16 }}>
          {err && <div style={{ color: "#c06040", fontFamily: "monospace", fontSize: ".63rem", marginBottom: ".8rem", textAlign: "center" }}>{err}</div>}
          <label style={lbl}>Email</label>
          <input style={inp} type="email" placeholder="tu@email.com" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && ok()} />
          <label style={lbl}>{lang === "en" ? "Password" : "Contraseña"}</label>
          <Eye value={pass} onChange={e => setPass(e.target.value)} placeholder={lang === "en" ? "Your password" : "Tu contraseña"} onKeyDown={e => e.key === "Enter" && ok()} />
          <button onClick={ok} disabled={loading} style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: loading ? "wait" : "pointer", textTransform: "uppercase", width: "100%", opacity: loading ? 0.7 : 1 }}>
            {loading ? "..." : (lang === "en" ? "Sign in" : "Ingresar")}
          </button>
        </div>
        <div style={{ textAlign: "center", margin: "1.2rem 0", color: C.dim, fontFamily: "monospace", fontSize: ".7rem" }}>
          {lang === "en" ? "No account? " : "¿No tenés cuenta? "}
          <button onClick={() => go("register")} style={{ color: C.gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".63rem" }}>
            {lang === "en" ? "Sign up here" : "Registrate acá"}
          </button>
        </div>
      </div>
    </div>
  );
}

async function dbFetch(endpoint, options = {}) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      "apikey": SUPABASE_KEY,
      "Authorization": `Bearer ${SUPABASE_KEY}`,
      "Prefer": "return=representation",
      ...options.headers
    }
  });
  return res.json().catch(() => ({}));
}

function ParagraphStar({ text, onStar }) {
  const [starred, setStarred] = useState(false);
  const [hovered, setHovered] = useState(false);

  function handleStar() {
    if (starred) return;
    setStarred(true);
    onStar();
  }

  const starColor = starred ? C.gold : hovered ? "rgba(184,154,78,.6)" : "rgba(184,154,78,.2)";

  return (
    <div style={{ display: "flex", alignItems: "flex-start", gap: ".7rem" }}>
      <button
        onClick={handleStar}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        title="Guardar en bitácora"
        style={{ background: "none", border: "none", cursor: starred ? "default" : "pointer", padding: 0, paddingTop: ".2rem", flexShrink: 0, fontSize: ".9rem", color: starColor, transition: "color .2s", lineHeight: 1 }}>
        ★
      </button>
      <div style={{ fontSize: "1rem", color: C.txt, lineHeight: 1.85, fontFamily: GEORGIA }}
        dangerouslySetInnerHTML={{ __html: md(text) }} />
    </div>
  );
}

function Chat({ go, userEmail, lang, setLang, problema, desafios, setDesafios, setProblema, dynamicUser }) {
  const user = dynamicUser || USERS[userEmail] || USERS["soyfranblanco@gmail.com"];
  const [darkModeUser, setDarkModeUser] = useState(true);
  const C = darkModeUser
    ? { bg: "#080808", gold: "#b89a4e", txt: "#f0ebe0", dim: "rgba(240,235,224,0.45)" }
    : { bg: "#f5f0e8", gold: "#b89a4e", txt: "#1a1a1a", dim: "rgba(26,26,26,0.5)" };
  const [chatMode, setChatMode] = useState("general");
  const [pdfTexto, setPdfTexto] = useState("");
  const [pdfNombre, setPdfNombre] = useState("");
  const [pdfLoading, setPdfLoading] = useState(false);
  const fileInputRef = React.useRef(null);

  async function handlePdf(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPdfLoading(true);
    setPdfNombre(file.name);
    try {
      const arrayBuffer = await file.arrayBuffer();
      // Usar pdf.js via CDN
      const pdfjsLib = window['pdfjs-dist/build/pdf'];
      if (!pdfjsLib) {
        // Cargar pdf.js dinámicamente
        await new Promise((resolve, reject) => {
          const script = document.createElement('script');
          script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
          script.onload = resolve;
          script.onerror = reject;
          document.head.appendChild(script);
        });
        window['pdfjs-dist/build/pdf'].GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      }
      const pdfjs = window['pdfjs-dist/build/pdf'];
      pdfjs.GlobalWorkerOptions.workerSrc =
        'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
      const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
      let texto = "";
      for (let i = 1; i <= Math.min(pdf.numPages, 20); i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        texto += content.items.map(item => item.str).join(" ") + "\n";
      }
      setPdfTexto(texto.trim());
    } catch {
      setPdfTexto("");
      setPdfNombre("");
      alert("No se pudo leer el PDF. Intentá con otro archivo.");
    }
    setPdfLoading(false);
    e.target.value = "";
  }
  const [allMsgs, setAllMsgs] = useState({ general: [], d1: [], d2: [], d3: [] });
  const [convIds, setConvIds] = useState({ general: null, d1: null, d2: null, d3: null });
  const [historial, setHistorial] = useState([]);
  const [bitacora, setBitacora] = useState("");
  const [bitacoraId, setBitacoraId] = useState(null);
  const [savingBitacora, setSavingBitacora] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const CHIPS = lang === "en" ? CHIPS_EN : CHIPS_ES;

  const msgs = allMsgs[chatMode];
  function setMsgs(newMsgs) {
    setAllMsgs(prev => ({ ...prev, [chatMode]: typeof newMsgs === "function" ? newMsgs(prev[chatMode]) : newMsgs }));
  }

  // Cargar conversación activa, historial y bitácora al entrar
  React.useEffect(() => {
    if (!userEmail) return;
    async function cargarConversaciones() {
      try {
        const data = await dbFetch(`conversaciones?usuario_email=eq.${encodeURIComponent(userEmail)}&order=updated_at.desc&limit=20`);
        if (!Array.isArray(data)) return;
        setHistorial(data);
        ["general", "d1", "d2", "d3"].forEach(modo => {
          const conv = data.find(c => c.modo === modo);
          if (conv?.mensajes?.length > 0) {
            setAllMsgs(prev => ({ ...prev, [modo]: conv.mensajes }));
            setConvIds(prev => ({ ...prev, [modo]: conv.id }));
          }
        });
      } catch {}
    }
    async function cargarBitacora() {
      try {
        const data = await dbFetch(`bitacora?usuario_email=eq.${encodeURIComponent(userEmail)}&limit=1`);
        if (Array.isArray(data) && data.length > 0) {
          setBitacora(data[0].contenido || "");
          setBitacoraId(data[0].id);
        }
      } catch {}
    }
    cargarConversaciones();
    cargarBitacora();
  }, [userEmail]);

  // Guardar conversación en Supabase después de cada respuesta
  async function guardarConversacion(mensajes) {
    try {
      const convId = convIds[chatMode];
      if (convId) {
        await dbFetch(`conversaciones?id=eq.${convId}`, {
          method: "PATCH",
          body: JSON.stringify({ mensajes, updated_at: new Date().toISOString() })
        });
      } else {
        const result = await dbFetch("conversaciones", {
          method: "POST",
          body: JSON.stringify({
            usuario_email: userEmail,
            modo: chatMode,
            problema: problema || null,
            mensajes
          })
        });
        if (Array.isArray(result) && result[0]?.id) {
          setConvIds(prev => ({ ...prev, [chatMode]: result[0].id }));
        }
      }
    } catch {}
  }

  async function estrellar(contenido) {
    const fecha = new Date().toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
    const nuevo = bitacora
      ? `${bitacora}\n\n— ${fecha} —\n${contenido}`
      : `— ${fecha} —\n${contenido}`;
    setBitacora(nuevo);
    await guardarBitacora(nuevo);
  }

  async function guardarBitacora(texto) {
    setSavingBitacora(true);
    try {
      if (bitacoraId) {
        await dbFetch(`bitacora?id=eq.${bitacoraId}`, {
          method: "PATCH",
          body: JSON.stringify({ contenido: texto })
        });
      } else {
        const result = await dbFetch("bitacora", {
          method: "POST",
          body: JSON.stringify({ usuario_email: userEmail, contenido: texto, fuente: "chat" })
        });
        if (Array.isArray(result) && result[0]?.id) setBitacoraId(result[0].id);
      }
    } catch {}
    setSavingBitacora(false);
  }

  function nuevaConversacion() {
    setAllMsgs(prev => ({ ...prev, [chatMode]: [] }));
    setConvIds(prev => ({ ...prev, [chatMode]: null }));
  }

  const EN_PROMPT = `You are a Human Design consultant specialized in the SIMPLE method, with 15 years of experience advising executives and entrepreneurs. Translate Human Design into practical, concrete guidance.
TONE: Direct, warm, no spiritual language. American English. No generic intros. Always end with a practical rule or action.
VOCABULARY — NEVER: vibrations, manifest, heal, soul mission, chakras, cosmic energy, auras.
STRUCTURE: 1) Anchor in their specific design 2) Practical consequence 3) Their specific trap/risk 4) One clear actionable.
For vague questions, ask ONE clarifying question first.`;

  const getDesafioIdx = () => chatMode === "d1" ? 0 : chatMode === "d2" ? 1 : chatMode === "d3" ? 2 : -1;
  const desafioActual = getDesafioIdx() >= 0 ? desafios?.[getDesafioIdx()] : null;

  const contextoBase = problema ? `\nPROBLEMA ACTIVO: "${problema.raiz}". Área: ${problema.area}.` : "";
  const contextoDesafio = desafioActual ? `\nESTÁS TRABAJANDO ESPECÍFICAMENTE EL DESAFÍO: "${desafioActual.titulo}" — ${desafioActual.descripcion}. Enfocá todas tus respuestas en ayudar a la persona a avanzar en este desafío concreto.` : "";
  const contextoPDF = pdfTexto ? `\n\nDOCUMENTO SUBIDO POR EL USUARIO ("${pdfNombre}"):\n${pdfTexto.slice(0, 8000)}` : "";
  const sys = (lang === "en" ? EN_PROMPT : SYSTEM_PROMPT) + "\nPERSON'S DESIGN: " + JSON.stringify(user) + contextoBase + contextoDesafio + contextoPDF;

  const lastAssistantRef = React.useRef(null);
  const chatContainerRef = React.useRef(null);
  const lastUserRef = React.useRef(null);

  React.useEffect(() => {
    if (!msgs.length) return;
    const last = msgs[msgs.length - 1];
    if (last.role === "user" && lastUserRef.current && chatContainerRef.current) {
      const container = chatContainerRef.current;
      const el = lastUserRef.current;
      container.scrollTop = el.offsetTop - container.offsetTop - 20;
    }
    if (last.role === "assistant" && lastAssistantRef.current && chatContainerRef.current) {
      const container = chatContainerRef.current;
      const el = lastAssistantRef.current;
      container.scrollTop = el.offsetTop - container.offsetTop - 20;
    }
  }, [msgs]);

  async function send(t) {
    const txt = t || input.trim();
    if (!txt || loading) return;
    setInput("");
    const next = [...msgs, { role: "user", content: txt }];
    setMsgs(next);
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys, messages: next })
      });
      const d = await r.json();
      const finalMsgs = [...next, { role: "assistant", content: d?.content?.[0]?.text || "Error." }];
      setMsgs(finalMsgs);
      await guardarConversacion(finalMsgs);
    } catch {
      setMsgs([...next, { role: "assistant", content: lang === "en" ? "Connection error." : "Error de conexión." }]);
    }
    setLoading(false);
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", fontFamily: NUNITO, color: C.txt }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');
        @keyframes p{0%,80%,100%{opacity:.2;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}
        .chat-scroll::-webkit-scrollbar { width: 4px; }
        textarea, input { color: ${darkModeUser ? "#f0ebe0" : "#1a1a1a"} !important; -webkit-text-fill-color: ${darkModeUser ? "#f0ebe0" : "#1a1a1a"} !important; caret-color: #b89a4e; }
        textarea::placeholder, input::placeholder { color: ${darkModeUser ? "rgba(240,235,224,.3)" : "rgba(26,26,26,.35)"} !important; -webkit-text-fill-color: ${darkModeUser ? "rgba(240,235,224,.3)" : "rgba(26,26,26,.35)"} !important; }
        .chat-scroll::-webkit-scrollbar-track { background: transparent; }
        .chat-scroll::-webkit-scrollbar-thumb { background: rgba(184,154,78,.25); border-radius: 2px; }
        .chat-scroll { scrollbar-width: thin; scrollbar-color: rgba(184,154,78,.25) transparent; }
        .tab-btn { background: none; border: none; cursor: pointer; font-family: monospace; font-size: .58rem; letter-spacing: .25em; text-transform: uppercase; padding: .5rem .9rem; color: ${darkModeUser ? "rgba(240,235,224,.4)" : "rgba(26,26,26,.45)"}; transition: color .2s; }
        .tab-btn:hover { color: #b89a4e; }
        .tab-btn.active { color: #b89a4e; border-bottom: 1px solid #b89a4e; }
        .tab-panel { padding: 1.2rem 2rem; border-bottom: 1px solid rgba(184,154,78,.1); background: ${darkModeUser ? "rgba(255,255,255,.02)" : "rgba(0,0,0,.03)"}; font-size: .88rem; line-height: 1.8; color: ${darkModeUser ? "rgba(240,235,224,.7)" : "rgba(26,26,26,.7)"}; font-family: '${NUNITO}'; }
      `}</style>

      {/* Panel de desafíos */}
      {panelOpen && (
        <div style={{ position: "fixed", top: 0, right: 0, width: "min(380px, 90vw)", height: "100vh", background: "#0f0f0f", borderLeft: "1px solid rgba(184,154,78,.2)", zIndex: 100, display: "flex", flexDirection: "column", padding: "2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
            <div style={{ fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".3em", color: C.gold, textTransform: "uppercase" }}>{lang === "en" ? "Active problem" : "Problema activo"}</div>
            <button onClick={() => setPanelOpen(false)} style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: "1.2rem" }}>×</button>
          </div>
          {problema && (
            <>
              <div style={{ fontSize: ".9rem", lineHeight: 1.7, color: C.txt, marginBottom: "1.5rem", padding: "1rem", border: "1px solid rgba(184,154,78,.15)", background: "rgba(184,154,78,.04)" }}>{problema.raiz}</div>
              <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: "1rem" }}>{lang === "en" ? "Your challenges" : "Tus desafíos"}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: ".8rem", flex: 1, overflowY: "auto" }}>
                {/* General chat option */}
                <button onClick={() => { setChatMode("general"); setPanelOpen(false); }}
                  style={{ border: `1px solid ${chatMode === "general" ? C.gold : "rgba(184,154,78,.2)"}`, padding: "1rem", background: chatMode === "general" ? "rgba(184,154,78,.08)" : "rgba(255,255,255,.02)", cursor: "pointer", textAlign: "left" }}>
                  <div style={{ fontFamily: "monospace", fontSize: ".48rem", letterSpacing: ".25em", color: C.gold, marginBottom: ".3rem", textTransform: "uppercase" }}>{lang === "en" ? "General chat" : "Chat general"}</div>
                  <div style={{ fontSize: ".85rem", color: C.dim, lineHeight: 1.5 }}>{lang === "en" ? "Talk freely about any topic." : "Hablá libremente sobre cualquier tema."}</div>
                </button>
                {desafios?.map((d, i) => {
                  const mode = `d${i+1}`;
                  return (
                    <button key={i} onClick={() => { setChatMode(mode); setPanelOpen(false); }}
                      style={{ border: `1px solid ${chatMode === mode ? C.gold : "rgba(184,154,78,.2)"}`, padding: "1rem", background: chatMode === mode ? "rgba(184,154,78,.08)" : "rgba(255,255,255,.02)", cursor: "pointer", textAlign: "left" }}>
                      <div style={{ fontFamily: "monospace", fontSize: ".48rem", letterSpacing: ".25em", color: C.gold, marginBottom: ".3rem", textTransform: "uppercase" }}>{lang === "en" ? `Challenge ${i+1}` : `Desafío ${i+1}`}</div>
                      <div style={{ fontSize: ".88rem", fontWeight: 600, marginBottom: ".3rem", color: C.txt }}>{d.titulo}</div>
                      <div style={{ fontSize: ".8rem", color: C.dim, lineHeight: 1.5 }}>{d.descripcion}</div>
                    </button>
                  );
                })}
              </div>
              <button onClick={() => { go("onboarding"); setPanelOpen(false); }}
                style={{ marginTop: "1.2rem", background: "transparent", border: "1px solid rgba(184,154,78,.3)", color: C.dim, fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".2em", padding: ".7em", cursor: "pointer", textTransform: "uppercase" }}>
                {lang === "en" ? "Change problem" : "Cambiar problema"}
              </button>
              <button onClick={() => { nuevaConversacion(); setPanelOpen(false); }}
                style={{ marginTop: ".5rem", background: "transparent", border: "1px solid rgba(184,154,78,.15)", color: C.dim, fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".2em", padding: ".7em", cursor: "pointer", textTransform: "uppercase" }}>
                {lang === "en" ? "New conversation" : "Nueva conversación"}
              </button>
              {historial.length > 0 && (
                <div style={{ marginTop: "1.5rem" }}>
                  <div style={{ fontFamily: "monospace", fontSize: ".48rem", letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: ".8rem" }}>
                    {lang === "en" ? "Previous conversations" : "Conversaciones anteriores"}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: ".4rem", maxHeight: 180, overflowY: "auto" }}>
                    {historial.filter(c => c.mensajes?.length > 0).slice(0, 10).map((c, i) => (
                      <button key={i} onClick={() => {
                        setChatMode(c.modo);
                        setAllMsgs(prev => ({ ...prev, [c.modo]: c.mensajes }));
                        setConvIds(prev => ({ ...prev, [c.modo]: c.id }));
                        setPanelOpen(false);
                      }}
                        style={{ background: "transparent", border: "1px solid rgba(184,154,78,.1)", color: C.dim, fontFamily: NUNITO, fontSize: ".75rem", padding: ".6em .8em", cursor: "pointer", textAlign: "left", borderRadius: 20 }}>
                        <div style={{ fontSize: ".65rem", color: "rgba(184,154,78,.5)", marginBottom: ".2rem" }}>
                          {new Date(c.updated_at).toLocaleDateString("es-AR", { day: "2-digit", month: "short" })} · {c.modo === "general" ? (lang === "en" ? "General" : "General") : `Desafío ${c.modo.replace("d", "")}`}
                        </div>
                        <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                          {c.mensajes?.[0]?.content?.slice(0, 45)}...
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}

      {/* Header */}
      <div style={{ padding: ".9rem 2rem", borderBottom: "1px solid rgba(184,154,78,.2)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
          <div style={{ ...logo, marginBottom: 0 }}>SIMPLE</div>
          <div style={{ fontFamily: NUNITO, fontSize: ".85rem", color: C.dim }}>
            {lang === "en" ? "Hi, " : "Hola, "}<span style={{ color: C.txt, fontWeight: 600 }}>{user.nombre}</span>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => setDarkModeUser(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", padding: 4, opacity: 0.8, display: "flex", alignItems: "center" }}
            title={darkModeUser ? "Modo día" : "Modo noche"}>
            {darkModeUser ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          <button onClick={() => go("welcome")} style={{ color: C.gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".6rem" }}>{lang === "en" ? "Sign out →" : "Salir →"}</button>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid rgba(184,154,78,.15)", display: "flex", alignItems: "center", paddingLeft: "1rem", gap: ".2rem" }}>
        {[
          ["mi-diseno", lang === "en" ? "My Design" : "Mi diseño"],
          ["inspiracion", lang === "en" ? "Inspiration" : "Inspiración"],
          ["como-funciona", lang === "en" ? "How it works" : "Cómo funciona"]
        ].map(([id, label]) => (
          <button key={id} className={`tab-btn${tab === id ? " active" : ""}`}
            onClick={() => setTab(tab === id ? null : id)}>
            {label}
          </button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: ".3rem", paddingRight: "1rem" }}>
          {["es", "en"].map(l => (
            <button key={l} onClick={() => setLang(l)}
              style={{ background: lang === l ? "rgba(184,154,78,.15)" : "none", border: "1px solid rgba(184,154,78,.25)", color: lang === l ? C.gold : C.dim, fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".2em", padding: ".3em .7em", cursor: "pointer", textTransform: "uppercase" }}>
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Tab panels */}
      {tab === "mi-diseno" && (
        <div className="tab-panel">
          <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
            {[
              [lang === "en" ? "Type" : "Tipo", user.tipo],
              [lang === "en" ? "Authority" : "Autoridad", user.autoridad],
              [lang === "en" ? "Profile" : "Perfil", user.perfil],
              [lang === "en" ? "Strategy" : "Estrategia", user.estrategia],
              [lang === "en" ? "Signature" : "Firma", user.firma],
              [lang === "en" ? "Environment" : "Entorno", traducirEntorno(user.variables?.entorno)],
              [lang === "en" ? "Motivation" : "Motivación", traducirMotivacion(user.variables?.motivación)]
            ].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: 3 }}>{l}</div>
                <div style={{ fontSize: ".9rem" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      )}
      {tab === "inspiracion" && (
        <div className="tab-panel">
          <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem" }}>
            {CHIPS.map(c => (
              <button key={c} onClick={() => { send(c); setTab(null); }}
                style={{ fontFamily: NUNITO, fontSize: ".8rem", padding: ".4em .9em", border: "1px solid rgba(184,154,78,.25)", color: C.dim, cursor: "pointer", background: "transparent", borderRadius: 20 }}
                onMouseEnter={e => { e.target.style.borderColor = C.gold; e.target.style.color = "#d4b96a"; }}
                onMouseLeave={e => { e.target.style.borderColor = "rgba(184,154,78,.25)"; e.target.style.color = C.dim; }}>
                {c}
              </button>
            ))}
          </div>
        </div>
      )}
      {tab === "como-funciona" && (
        <div className="tab-panel" style={{ maxWidth: 640, position: "relative" }}>
          <button onClick={() => setTab(null)} style={{ position: "absolute", top: 0, right: 0, background: "none", border: "none", color: C.dim, cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, padding: "0 .2rem" }}>×</button>
          {lang === "en" ? <>
            <p style={{ marginTop: 0 }}><span style={{ color: C.gold }}>SIMPLE</span> is your personal Human Design consultant. Ask anything about how you make decisions, relate to others, manage your energy, or move forward in your work.</p>
            <p>No generic answers. Everything is based on your specific design — your type, authority, profile and centers.</p>
            <p style={{ marginBottom: 0 }}>The more context you give about your specific situation, the better the answer. You don't need to know anything about Human Design to use it.</p>
          </> : <>
            <p style={{ marginTop: 0 }}><span style={{ color: C.gold }}>SIMPLE</span> es tu consultor personal de Diseño Humano. Podés hacerle cualquier pregunta sobre cómo tomás decisiones, cómo te relacionás, cómo gestionás tu energía o cómo avanzar en tu trabajo.</p>
            <p>No da respuestas genéricas. Todo lo que te diga está basado en tu diseño específico — tu tipo, autoridad, perfil y centros.</p>
            <p style={{ marginBottom: 0 }}>Cuanto más contexto le des sobre tu situación concreta, mejor va a ser la respuesta. No hace falta que sepas nada de Diseño Humano para usarlo.</p>
          </>}
        </div>
      )}
      {tab === "bitacora" && (
        <div style={{ padding: "1.2rem 2rem", borderBottom: "1px solid rgba(184,154,78,.1)", background: "rgba(255,255,255,.02)", maxHeight: "50vh", display: "flex", flexDirection: "column", gap: ".8rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: C.gold, textTransform: "uppercase" }}>
              {lang === "en" ? "Your journal" : "Tu bitácora"}
            </div>
            <button onClick={() => guardarBitacora(bitacora)} disabled={savingBitacora}
              style={{ background: "transparent", border: "1px solid rgba(184,154,78,.3)", color: C.gold, fontFamily: "monospace", fontSize: ".48rem", letterSpacing: ".2em", padding: ".3em .8em", cursor: "pointer", textTransform: "uppercase", opacity: savingBitacora ? 0.5 : 1 }}>
              {savingBitacora ? "..." : (lang === "en" ? "Save" : "Guardar")}
            </button>
          </div>
          <textarea
            value={bitacora}
            onChange={e => setBitacora(e.target.value)}
            style={{ flex: 1, background: "transparent", border: "1px solid rgba(184,154,78,.15)", color: C.txt, fontFamily: NUNITO, fontSize: ".88rem", padding: "1rem", outline: "none", resize: "none", lineHeight: 1.8, minHeight: 200, boxSizing: "border-box" }}
            placeholder={lang === "en" ? "Your insights will appear here when you ⭐ them from the chat. You can also write freely..." : "Tus insights aparecerán acá cuando los ⭐ desde el chat. También podés escribir libremente..."} />
        </div>
      )}
      <div style={{ flex: 1, maxWidth: 900, margin: "0 auto", width: "100%", padding: "0 clamp(60px, 10vw, 150px)", display: "flex", flexDirection: "column" }}>
        <div ref={chatContainerRef} className="chat-scroll" style={{ flex: 1, padding: "1.8rem 0", paddingRight: "2rem", display: "flex", flexDirection: "column", gap: "1.8rem", overflowY: "auto", maxHeight: "58vh", minHeight: 180 }}>
          {msgs.length === 0 && (
            <div style={{ textAlign: "center", padding: "1.8rem 1rem", border: "1px solid rgba(184,154,78,.15)" }}>
              {desafioActual ? (
                <>
                  <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: C.gold, marginBottom: ".8rem", textTransform: "uppercase" }}>{lang === "en" ? `Challenge ${getDesafioIdx()+1}` : `Desafío ${getDesafioIdx()+1}`}</div>
                  <div style={{ fontSize: "1.3rem", fontWeight: 300, marginBottom: ".4rem", fontFamily: GEORGIA }}>{desafioActual.titulo}</div>
                  <div style={{ fontSize: ".9rem", color: C.dim, marginBottom: "1.5rem", lineHeight: 1.6, maxWidth: 440, margin: "0 auto 1.5rem" }}>{desafioActual.descripcion}</div>
                  <div style={{ fontSize: ".8rem", color: C.dim }}>{lang === "en" ? "Ask anything related to this challenge." : "Haceme preguntas relacionadas a este desafío."}</div>
                </>
              ) : (
                <>
                  <div style={{ fontSize: "1.9rem", fontWeight: 300, marginBottom: ".4rem", fontFamily: GEORGIA }}>
                    {lang === "en" ? "Hi, " : "Hola, "}<span style={{ color: C.gold, fontStyle: "italic" }}>{user.nombre}</span>
                  </div>
                  <div style={{ fontSize: ".9rem", color: C.dim, marginBottom: "1.5rem", lineHeight: 1.6 }}>
                    {lang === "en" ? "I'm an AI created by Fran and connected to your design. Every answer is based on your unique way of functioning — not generalities. I'm not designed to flatter you. And if I don't know something, I won't make it up." : "Soy una inteligencia artificial creada por Fran y conectada a tu diseño. Cada respuesta está basada en tu forma única de funcionar — no en generalidades. No estoy diseñada para adularte. Y si no sé algo, no te lo voy a inventar."}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", justifyContent: "center" }}>
                    {CHIPS.map(c => (
                      <button key={c} onClick={() => send(c)} style={{ fontFamily: "monospace", fontSize: ".6rem", padding: ".4em .85em", border: "1px solid rgba(184,154,78,.25)", color: C.dim, cursor: "pointer", background: "transparent" }}
                        onMouseEnter={e => { e.target.style.borderColor = C.gold; e.target.style.color = "#d4b96a"; }}
                        onMouseLeave={e => { e.target.style.borderColor = "rgba(184,154,78,.25)"; e.target.style.color = C.dim; }}>
                        {c}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          )}
          {msgs.map((m, i) => (
            <div key={i}
              ref={m.role === "assistant" && i === msgs.length - 1 ? lastAssistantRef : m.role === "user" && i === msgs.length - 1 ? lastUserRef : null}
              style={{ textAlign: m.role === "user" ? "right" : "left" }}>
              <div style={{ fontFamily: "monospace", fontSize: ".53rem", letterSpacing: ".3em", textTransform: "uppercase", marginBottom: ".3rem", color: m.role === "user" ? "rgba(240,235,224,.3)" : C.gold }}>
                {m.role === "user" ? (lang === "en" ? "You" : "Vos") : "SIMPLE"}
              </div>
              {m.role === "assistant" ? (
                <div style={{ fontSize: "1rem", color: C.txt, lineHeight: 1.85, fontFamily: GEORGIA }}
                  dangerouslySetInnerHTML={{ __html: md(m.content) }} />
              ) : (
                <div style={{ fontSize: "1rem", fontStyle: "italic", color: "rgba(240,235,224,.55)", lineHeight: 1.7, fontFamily: NUNITO }}
                  dangerouslySetInnerHTML={{ __html: md(m.content) }} />
              )}
            </div>
          ))}
          {loading && (
            <div>
              <div style={{ fontFamily: "monospace", fontSize: ".53rem", letterSpacing: ".3em", color: C.gold, marginBottom: ".3rem" }}>SIMPLE</div>
              <div style={{ display: "flex", gap: 5 }}>
                {[0, 1, 2].map(i => <div key={i} style={{ width: 5, height: 5, background: C.gold, borderRadius: "50%", animation: `p 1.4s ${i * .2}s infinite ease-in-out` }} />)}
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: "1rem 0 1.5rem", borderTop: "1px solid rgba(184,154,78,.15)", display: "flex", flexDirection: "column", gap: ".5rem" }}>
          {pdfNombre && (
            <div style={{ display: "flex", alignItems: "center", gap: ".5rem" }}>
              <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".2em", color: C.gold, background: "rgba(184,154,78,.08)", border: "1px solid rgba(184,154,78,.2)", padding: ".3em .7em", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                📄 {pdfNombre}
              </div>
              <button onClick={() => { setPdfTexto(""); setPdfNombre(""); }}
                style={{ background: "none", border: "none", color: C.dim, cursor: "pointer", fontFamily: "monospace", fontSize: ".6rem" }}>✕</button>
            </div>
          )}
          <div style={{ display: "flex", gap: ".8rem", alignItems: "flex-end" }}>
            <input ref={fileInputRef} type="file" accept=".pdf" onChange={handlePdf} style={{ display: "none" }} />
            <button onClick={() => fileInputRef.current?.click()} disabled={pdfLoading}
              title={lang === "en" ? "Attach PDF" : "Adjuntar PDF"}
              style={{ background: "none", border: "none", color: pdfNombre ? C.gold : C.dim, cursor: "pointer", fontSize: "1.1rem", padding: 0, marginBottom: 4, opacity: pdfLoading ? 0.5 : 1 }}>
              {pdfLoading ? "⏳" : "📎"}
            </button>
            <textarea style={{ flex: 1, background: "transparent", border: "none", borderBottom: `1px solid ${C.gold}40`, color: C.txt, fontFamily: GEORGIA, fontSize: ".95rem", padding: ".6rem 0", outline: "none", resize: "none", minHeight: "2rem", lineHeight: 1.5 }}
              value={input} placeholder={lang === "en" ? "Ask your question..." : "Hacé tu pregunta..."}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }} rows={1} />
            <button onClick={() => send()} disabled={loading || !input.trim()} style={{ background: "transparent", border: "1px solid " + C.gold, borderRadius: 20, color: C.gold, fontFamily: "monospace", fontSize: ".6rem", letterSpacing: ".2em", padding: ".6em 1em", cursor: "pointer", textTransform: "uppercase", marginBottom: 2, opacity: loading || !input.trim() ? 0.3 : 1 }}>
              {lang === "en" ? "Send" : "Enviar"}
            </button>
          </div>
        </div>
      </div>
      <div style={{ textAlign: "center", padding: ".6rem", fontFamily: "monospace", fontSize: ".5rem", color: darkModeUser ? "rgba(240,235,224,.15)" : "rgba(26,26,26,.3)", letterSpacing: ".15em" }}>
        "SIMPLE es una herramienta creada y registrada por Fran Blanco. 2026"
      </div>
    </div>
  );
}

const AREAS = [
  { id: "trabajo", icon: "💼", label: "Trabajo y carrera", en: "Work & career" },
  { id: "decisiones", icon: "🧭", label: "Decisiones importantes", en: "Important decisions" },
  { id: "vinculos", icon: "🤝", label: "Vínculos y relaciones", en: "Relationships" },
  { id: "energia", icon: "⚡", label: "Energía y bienestar", en: "Energy & wellbeing" },
  { id: "dinero", icon: "🌱", label: "Dinero y proyectos", en: "Money & projects" },
  { id: "direccion", icon: "🔭", label: "Dirección y propósito", en: "Direction & purpose" },
];

function Onboarding({ go, userEmail, lang, setProblema, setDesafios, dynamicUser }) {
  const user = dynamicUser || USERS[userEmail] || USERS["soyfranblanco@gmail.com"];
  const [area, setArea] = useState(null);
  const [texto, setTexto] = useState("");
  const [loading, setLoading] = useState(false);
  const es = lang !== "en";

  async function entrar(saltar = false) {
    if (saltar || (!area && !texto)) {
      setProblema(null);
      setDesafios([]);
      go("chat");
      return;
    }
    setLoading(true);
    try {
      const prompt = `El usuario es ${user.tipo}, perfil ${user.perfil}, autoridad ${user.autoridad}, centros: ${JSON.stringify(user.centros)}, no-self theme: ${user.no_self_theme}, motivación: ${user.variables?.motivación}.
${area ? `Área: ${area}.` : ""} ${texto ? `Situación: "${texto}".` : ""}
Respondé SOLO con un JSON válido sin markdown:
{
  "problema_raiz": "máximo 2 oraciones, lenguaje cotidiano, formulado como propuesta tentativa ('Podría ser que...', 'Lo que describís suena a...')",
  "desafios": [
    {"titulo": "título corto", "descripcion": "una oración accionable"},
    {"titulo": "título corto", "descripcion": "una oración accionable"},
    {"titulo": "título corto", "descripcion": "una oración accionable"}
  ]
}`;
      const r = await fetch("/api/chat", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 400, system: "Respondé SOLO con JSON válido, sin markdown ni texto extra.", messages: [{ role: "user", content: prompt }] })
      });
      const d = await r.json();
      const parsed = JSON.parse((d?.content?.[0]?.text || "{}").replace(/```json|```/g, "").trim());
      setProblema({ area, texto, raiz: parsed.problema_raiz || "" });
      setDesafios((parsed.desafios || []).map((d, i) => ({ ...d, id: i + 1, estado: "activo" })));
    } catch {
      setProblema(area || texto ? { area, texto, raiz: "" } : null);
      setDesafios([]);
    }
    setLoading(false);
    go("chat");
  }

  const cardStyle = { width: "100%", maxWidth: 520, border: "1px solid rgba(184,154,78,.2)", padding: "2.5rem", background: "rgba(255,255,255,.02)", borderRadius: 16 };
  const btnPrimary = { background: C.gold, color: C.bg, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: "pointer", textTransform: "uppercase", width: "100%", marginTop: "1.2rem" };
  const btnSecondary = { background: "transparent", color: C.dim, border: "1px solid rgba(184,154,78,.3)", fontFamily: "monospace", fontSize: ".63rem", letterSpacing: ".25em", padding: ".7em 2em", cursor: "pointer", textTransform: "uppercase", width: "100%", marginTop: ".6rem" };

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: NUNITO, color: C.txt }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap');`}</style>
      <div style={{ ...logo, marginBottom: "1.5rem" }}>SIMPLE</div>

      <div style={cardStyle}>
        <div style={{ fontSize: "1.4rem", fontWeight: 300, fontFamily: GEORGIA, marginBottom: ".4rem", lineHeight: 1.3 }}>
          {es ? `Hola, ${user.nombre}.` : `Hi, ${user.nombre}.`}
        </div>
        <div style={{ color: C.dim, fontSize: ".9rem", lineHeight: 1.7, marginBottom: "1.8rem" }}>
          {es ? "Podés empezar a chatear directamente, o especificar un tema en el cual enfocarte para que las respuestas sean bien específicas." : "You can start chatting directly, or specify a topic to focus on so answers are more specific."}
        </div>

        {/* Área opcional */}
        <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: ".8rem" }}>
          {es ? "¿En qué área? (opcional)" : "Which area? (optional)"}
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: ".5rem", marginBottom: "1.5rem" }}>
          {AREAS.map(a => (
            <button key={a.id} onClick={() => setArea(area === (es ? a.label : a.en) ? null : (es ? a.label : a.en))}
              style={{ background: area === (es ? a.label : a.en) ? "rgba(184,154,78,.15)" : "transparent", border: `1px solid ${area === (es ? a.label : a.en) ? C.gold : "rgba(184,154,78,.25)"}`, color: area === (es ? a.label : a.en) ? C.gold : C.dim, fontFamily: NUNITO, fontSize: ".78rem", padding: ".4em .8em", cursor: "pointer", borderRadius: 20 }}>
              {a.icon} {es ? a.label : a.en}
            </button>
          ))}
        </div>

        {/* Problema opcional */}
        <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: C.gold, textTransform: "uppercase", marginBottom: ".8rem" }}>
          {es ? "¿Para resolver qué? (opcional)" : "What do you want to work on? (optional)"}
        </div>
        <textarea
          style={{ width: "100%", background: "transparent", border: "1px solid rgba(184,154,78,.25)", color: C.txt, fontFamily: NUNITO, fontSize: ".9rem", padding: ".9rem", outline: "none", resize: "none", lineHeight: 1.7, minHeight: 90, boxSizing: "border-box", marginBottom: "0" }}
          placeholder={es ? "Describí brevemente tu situación o lo que querés mejorar..." : "Briefly describe your situation or what you want to improve..."}
          value={texto} onChange={e => setTexto(e.target.value)} />

        <button onClick={() => entrar(false)} disabled={loading}
          style={{ ...btnPrimary, opacity: loading ? 0.6 : 1, cursor: loading ? "wait" : "pointer" }}>
          {loading ? (es ? "Preparando tu espacio..." : "Preparing your space...") : (es ? "Empezar" : "Start")}
        </button>
        <button onClick={() => entrar(true)} style={btnSecondary}>
          {es ? "Ir al chat directamente" : "Go straight to chat"}
        </button>
      </div>

      <div style={{ marginTop: "1.5rem", fontFamily: "monospace", fontSize: ".5rem", color: "rgba(240,235,224,.2)", letterSpacing: ".15em" }}>
        SIMPLE es una herramienta creada y registrada por Fran Blanco. 2026
      </div>
    </div>
  );
}

const ADMIN_EMAIL = "soyfranblanco@gmail.com";
const ADMIN_PASS = "soyadmin";

function EmpresaEditor({ usuario, gold, AC, onUpdate }) {
  const [editando, setEditando] = React.useState(false);
  const [valor, setValor] = React.useState(usuario?.empresa || "");
  async function guardar() {
    try {
      const res = await fetch("/api/update-usuario", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: usuario.email, fields: { empresa: valor } })
      });
      if (res.ok) {
        onUpdate(valor);
        setEditando(false);
      } else {
        const err = await res.text();
        console.error("Error guardando empresa:", err);
      }
    } catch(e) { console.error("Error empresa:", e); }
  }

  if (!editando) return (
    <div onClick={() => setEditando(true)} style={{ cursor: "pointer", fontSize: ".8rem", color: valor ? AC.txt : AC.dim, padding: ".3rem 0", borderBottom: "1px solid rgba(184,154,78,.15)", minHeight: "1.8rem" }}>
      {valor || <span style={{ fontStyle: "italic", fontSize: ".75rem" }}>Agregar empresa...</span>}
    </div>
  );

  return (
    <div style={{ display: "flex", gap: ".4rem" }}>
      <input autoFocus value={valor} onChange={e => setValor(e.target.value)}
        onKeyDown={e => { if (e.key === "Enter") guardar(); if (e.key === "Escape") setEditando(false); }}
        style={{ flex: 1, background: "transparent", border: "none", borderBottom: `1px solid ${gold}`, color: AC.txt, fontFamily: "inherit", fontSize: ".8rem", padding: ".3rem 0", outline: "none" }}
        placeholder="Nombre de empresa..." />
      <button onClick={guardar} style={{ background: "none", border: "none", color: gold, cursor: "pointer", fontSize: ".7rem", fontFamily: "monospace" }}>✓</button>
      <button onClick={() => setEditando(false)} style={{ background: "none", border: "none", color: AC.dim, cursor: "pointer", fontSize: ".8rem" }}>×</button>
    </div>
  );
}

function AdminListaConBusqueda({ usuarios, gold, AC, seleccionados, toggleSeleccion, seleccionar, setView, setTeamMsgs, cargarConvEquipo }) {
  const [busqueda, setBusqueda] = React.useState("");
  const filtrados = busqueda.trim()
    ? usuarios.filter(u => {
        const q = busqueda.toLowerCase();
        return (
          (u.nombre + " " + u.apellido).toLowerCase().includes(q) ||
          u.email.toLowerCase().includes(q) ||
          (u.diseno?.tipo || "").toLowerCase().includes(q) ||
          (u.empresa || "").toLowerCase().includes(q)
        );
      })
    : usuarios;

  return (
    <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 2rem" }}>
      {/* Barra de búsqueda */}
      <div style={{ position: "relative", marginBottom: "1.2rem" }}>
        <svg style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", opacity: 0.4 }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        <input
          value={busqueda}
          onChange={e => setBusqueda(e.target.value)}
          placeholder="Buscar por nombre, email o tipo..."
          style={{ width: "100%", background: AC.panelBg, border: "1px solid rgba(184,154,78,.2)", borderRadius: 24, color: AC.txt, fontFamily: "'Nunito', sans-serif", fontSize: ".85rem", padding: ".65rem 1rem .65rem 2.5rem", outline: "none", boxSizing: "border-box" }}
        />
        {busqueda && (
          <button onClick={() => setBusqueda("")} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", color: AC.dim, cursor: "pointer", fontSize: "1rem", lineHeight: 1 }}>×</button>
        )}
      </div>

      {/* Header contador + botón equipo */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: ".8rem" }}>
        <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: gold }}>
          {filtrados.length} USUARIO{filtrados.length !== 1 ? "S" : ""}{busqueda ? ` · "${busqueda}"` : ""}
        </div>
        {seleccionados.length >= 2 && (
          <button onClick={() => { setView("equipo"); setTimeout(() => cargarConvEquipo(), 50); }}
            style={{ background: gold, color: AC.bg, border: "none", borderRadius: 20, fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".2em", padding: ".5em 1.2em", cursor: "pointer", textTransform: "uppercase" }}>
            Analizar equipo ({seleccionados.length})
          </button>
        )}
        {seleccionados.length === 1 && (
          <div style={{ fontFamily: "monospace", fontSize: ".5rem", color: AC.dim }}>Seleccioná al menos 2 para analizar equipo</div>
        )}
      </div>

      {/* Lista */}
      <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
        {filtrados.map((u, i) => {
          const estaSeleccionado = seleccionados.find(s => s.email === u.email);
          return (
            <div key={i} style={{ display: "flex", gap: ".8rem", alignItems: "stretch" }}>
              <button onClick={() => toggleSeleccion(u)}
                style={{ width: 36, flexShrink: 0, background: estaSeleccionado ? "rgba(184,154,78,.15)" : "transparent", border: `1px solid ${estaSeleccionado ? gold : "rgba(184,154,78,.2)"}`, color: estaSeleccionado ? gold : AC.dim, cursor: "pointer", fontSize: ".9rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
                {estaSeleccionado ? "✓" : "+"}
              </button>
              <button onClick={() => seleccionar(u)}
                style={{ flex: 1, background: AC.panelBg, border: "1px solid rgba(184,154,78,.15)", padding: "1.2rem 1.5rem", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 12 }}
                onMouseEnter={e => e.currentTarget.style.borderColor = gold}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(184,154,78,.15)"}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap", marginBottom: ".2rem" }}>
                    <div style={{ fontSize: ".95rem", fontWeight: 600, color: AC.txt }}>{u.nombre} {u.apellido}</div>
                    {u.empresa && <div style={{ fontFamily: "monospace", fontSize: ".45rem", letterSpacing: ".15em", color: AC.bg, background: gold, padding: ".2em .6em", borderRadius: 20, textTransform: "uppercase" }}>{u.empresa}</div>}
                  </div>
                  <div style={{ fontSize: ".78rem", color: AC.dim }}>{u.email}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: "monospace", fontSize: ".55rem", color: gold }}>{u.diseno?.tipo}</div>
                  <div style={{ fontFamily: "monospace", fontSize: ".5rem", color: AC.dim }}>Perfil {u.diseno?.perfil}</div>
                </div>
              </button>
            </div>
          );
        })}
        {filtrados.length === 0 && (
          <div style={{ textAlign: "center", color: AC.dim, fontFamily: "monospace", fontSize: ".6rem", padding: "2rem", letterSpacing: ".2em" }}>
            SIN RESULTADOS
          </div>
        )}
      </div>
    </div>
  );
}

function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [err, setErr] = useState("");

  function ok() {
    if (email.toLowerCase().trim() === ADMIN_EMAIL && pass === ADMIN_PASS) {
      onLogin();
    } else {
      setErr("Credenciales incorrectas.");
    }
  }

  return (
    <div style={{ background: C.bg, minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: NUNITO, color: C.txt }}>
      <div style={{ width: "100%", maxWidth: 380, border: "1px solid rgba(184,154,78,.2)", padding: "2.5rem", background: "rgba(255,255,255,.02)", borderRadius: 16 }}>
        <div style={{ ...logo, marginBottom: "1.5rem" }}>SIMPLE</div>
        <div style={{ fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".3em", color: C.gold, marginBottom: "1.5rem" }}>ADMIN ACCESS</div>
        {err && <div style={{ color: "#c06040", fontFamily: "monospace", fontSize: ".63rem", marginBottom: ".8rem" }}>{err}</div>}
        <label style={lbl}>Email</label>
        <input style={inp} type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && ok()} />
        <label style={lbl}>Contraseña</label>
        <Eye value={pass} onChange={e => setPass(e.target.value)} onKeyDown={e => e.key === "Enter" && ok()} />
        <button onClick={ok} style={{ background: C.gold, color: C.bg, border: "none", borderRadius: 24, fontFamily: "monospace", fontSize: ".65rem", letterSpacing: ".3em", padding: ".85em 2em", cursor: "pointer", textTransform: "uppercase", width: "100%", marginTop: ".5rem" }}>
          Ingresar
        </button>
      </div>
    </div>
  );
}

function AdminPanel() {
  const [authed, setAuthed] = useState(false);
  const [usuarios, setUsuarios] = useState([]);
  const [selected, setSelected] = useState(null);
  const [msgs, setMsgs] = useState([]);
  const [convId, setConvId] = useState(null);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [nota, setNota] = useState("");
  const [notaGuardada, setNotaGuardada] = useState("");
  const [notaId, setNotaId] = useState(null);
  const [view, setView] = useState("lista");
  const [panelVisible, setPanelVisible] = useState(true);
  const chatEndRef = React.useRef(null);
  const lastUserMsgRef = React.useRef(null);

  React.useEffect(() => {
    if (!authed) return;
    async function cargar() {
      console.log("Cargando usuarios con campo empresa...");
      const r = await fetch(`${SUPABASE_URL}/rest/v1/usuarios?select=email,nombre,apellido,diseno,empresa,created_at&order=created_at.desc`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const data = await r.json();
      setUsuarios(Array.isArray(data) ? data : []);
    }
    cargar();
  }, [authed]);

  // Scroll al inicio del último mensaje del usuario (para leer desde arriba)
  const shouldScrollRef = React.useRef(false);
  React.useEffect(() => {
    if (shouldScrollRef.current && lastUserMsgRef.current) {
      lastUserMsgRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [msgs, loading]);

  async function seleccionar(u) {
    setSelected(u);
    setMsgs([]);
    setConvId(null);
    setNota("");
    setNotaGuardada("");
    setNotaId(null);
    setView("chat");
    // Cargar conversación anterior
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/conversaciones?usuario_email=eq.${encodeURIComponent("admin::" + u.email)}&order=updated_at.desc&limit=1`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const data = await r.json();
      if (Array.isArray(data) && data.length > 0 && data[0].mensajes?.length > 0) {
        setMsgs(data[0].mensajes);
        setConvId(data[0].id);
      }
    } catch {}
    // Cargar notas guardadas
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/bitacora?usuario_email=eq.${encodeURIComponent("admin::" + u.email)}&limit=1`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const data = await r.json();
      if (Array.isArray(data) && data.length > 0) {
        setNota(data[0].contenido || "");
        setNotaGuardada(data[0].contenido || "");
        setNotaId(data[0].id);
      }
    } catch {}
  }

  async function guardarConvAdmin(mensajes, currentConvId) {
    try {
      const emailKey = "admin::" + selected.email;
      if (currentConvId) {
        await fetch(`${SUPABASE_URL}/rest/v1/conversaciones?id=eq.${currentConvId}`, {
          method: "PATCH",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ mensajes, updated_at: new Date().toISOString() })
        });
        return currentConvId;
      } else {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/conversaciones`, {
          method: "POST",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=representation" },
          body: JSON.stringify({ usuario_email: emailKey, modo: "admin", mensajes })
        });
        const data = await r.json();
        if (Array.isArray(data) && data[0]?.id) return data[0].id;
      }
    } catch {}
    return currentConvId;
  }

  async function send() {
    if (!input.trim() || loading || !selected) return;
    const txt = input.trim();
    setInput("");
    shouldScrollRef.current = true;
    const next = [...msgs, { role: "user", content: txt }];
    setMsgs(next);
    setLoading(true);
    // Incluir notas en el contexto si las hay
    const contextoNotas = notaGuardada ? `\n\nNOTAS PRIVADAS DEL CONSULTOR SOBRE ESTE CLIENTE:\n${notaGuardada}` : "";
    const sys = SYSTEM_PROMPT + "\nDISEÑO DE LA PERSONA CON QUIEN ESTÁS TRABAJANDO: " + JSON.stringify(selected.diseno) + "\nEres el asistente del consultor Fran Blanco. Estás ayudando a Fran a preparar o analizar el perfil de este cliente." + contextoNotas;
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: sys, messages: next })
      });
      const d = await r.json();
      const finalMsgs = [...next, { role: "assistant", content: d?.content?.[0]?.text || "Error." }];
      setMsgs(finalMsgs);
      const newId = await guardarConvAdmin(finalMsgs, convId);
      if (newId && !convId) setConvId(newId);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Error de conexión." }]);
    }
    setLoading(false);
    shouldScrollRef.current = false;
  }

  async function guardarNota() {
    setNotaGuardada(nota);
    try {
      const emailKey = "admin::" + selected.email;
      if (notaId) {
        await fetch(`${SUPABASE_URL}/rest/v1/bitacora?id=eq.${notaId}`, {
          method: "PATCH",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=minimal" },
          body: JSON.stringify({ contenido: nota })
        });
      } else {
        const r = await fetch(`${SUPABASE_URL}/rest/v1/bitacora`, {
          method: "POST",
          headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}`, "Content-Type": "application/json", "Prefer": "return=representation" },
          body: JSON.stringify({ usuario_email: emailKey, contenido: nota, fuente: "admin" })
        });
        const data = await r.json();
        if (Array.isArray(data) && data[0]?.id) setNotaId(data[0].id);
      }
    } catch {}
  }

  const [seleccionados, setSeleccionados] = useState([]);
  const [teamMsgs, setTeamMsgs] = useState([]);
  const [teamConvId, setTeamConvId] = useState(null);
  const [teamInput, setTeamInput] = useState("");
  const [teamLoading, setTeamLoading] = useState(false);
  const teamEndRef = React.useRef(null);

  const lastUserTeamMsgRef = React.useRef(null);
  React.useEffect(() => {
    if (shouldScrollRef.current && lastUserTeamMsgRef.current) {
      lastUserTeamMsgRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [teamMsgs, teamLoading]);

  function toggleSeleccion(u) {
    setSeleccionados(prev =>
      prev.find(s => s.email === u.email)
        ? prev.filter(s => s.email !== u.email)
        : prev.length < 8 ? [...prev, u] : prev
    );
  }

  function teamKey() {
    return "equipo::" + [...seleccionados].map(u => u.email).sort().join("|");
  }

  async function cargarConvEquipo() {
    const key = teamKey();
    try {
      const r = await fetch(`${SUPABASE_URL}/rest/v1/conversaciones?usuario_email=eq.${encodeURIComponent(key)}&order=updated_at.desc&limit=1`, {
        headers: { "apikey": SUPABASE_KEY, "Authorization": `Bearer ${SUPABASE_KEY}` }
      });
      const data = await r.json();
      if (Array.isArray(data) && data[0]?.mensajes) {
        setTeamMsgs(data[0].mensajes);
        setTeamConvId(data[0].id);
      } else {
        setTeamMsgs([]);
        setTeamConvId(null);
      }
    } catch { setTeamMsgs([]); setTeamConvId(null); }
  }

  async function guardarConvEquipo(mensajes, currentId) {
    const key = teamKey();
    try {
      if (currentId) {
        await fetch("/api/update-usuario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "update-conversacion", id: currentId, mensajes })
        });
        return currentId;
      } else {
        const r = await fetch("/api/update-usuario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "insert-conversacion", email: key, modo: "equipo", mensajes })
        });
        const data = await r.json();
        if (Array.isArray(data) && data[0]?.id) return data[0].id;
      }
    } catch(e) { console.error("Error guardando conv equipo:", e); }
    return currentId;
  }

  async function sendTeam() {
    if (!teamInput.trim() || teamLoading) return;
    const txt = teamInput.trim();
    setTeamInput("");
    shouldScrollRef.current = true;
    const next = [...teamMsgs, { role: "user", content: txt }];
    setTeamMsgs(next);
    setTeamLoading(true);
    const perfiles = seleccionados.map((u, i) =>
      `PERSONA ${i+1} — ${u.nombre} ${u.apellido}: ${JSON.stringify(u.diseno)}`
    ).join("\n\n");
    const sys = `Sos un experto en Diseño Humano especializado en dinámicas de equipo. Analizás cómo interactúan múltiples personas según sus diseños.

EQUIPO A ANALIZAR:
${perfiles}

INSTRUCCIONES:
- Analizá las dinámicas, complementariedades y tensiones entre estos diseños
- Identificá roles naturales, quién lidera mejor en qué contexto, dónde pueden surgir fricciones
- Usá los mismos principios de tono y vocabulario que usás con individuos: directo, sin jerga espiritual, sin tecnicismos sin explicar
- Cuando hables de cada persona, referite a ellos por su nombre
- Cerrá siempre con algo accionable para el equipo`;
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1200, system: sys, messages: next })
      });
      const d = await r.json();
      const finalTeamMsgs = [...next, { role: "assistant", content: d?.content?.[0]?.text || "Error." }];
      setTeamMsgs(finalTeamMsgs);
      const newTeamId = await guardarConvEquipo(finalTeamMsgs, teamConvId);
      if (newTeamId && !teamConvId) setTeamConvId(newTeamId);
    } catch {
      setTeamMsgs([...next, { role: "assistant", content: "Error de conexión." }]);
    }
    setTeamLoading(false);
  }

  const [darkMode, setDarkMode] = useState(true);
  const bg = darkMode ? "#080808" : "#f5f0e8";
  const txt = darkMode ? "#f0ebe0" : "#1a1a1a";
  const gold = "#b89a4e";
  const dim = darkMode ? "rgba(240,235,224,0.45)" : "rgba(26,26,26,0.5)";
  const panelBg = darkMode ? "#0f0f0f" : "#ede8df";
  const AC = { bg, txt, gold, dim, panelBg };

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />;

  const s = { background: AC.bg, minHeight: "100vh", fontFamily: NUNITO, color: AC.txt, transition: "background .3s, color .3s" };
  const header = { padding: "1rem 2rem", borderBottom: "1px solid rgba(184,154,78,.2)", display: "flex", alignItems: "center", justifyContent: "space-between" };

  const entorno = selected?.diseno?.variables?.entorno;
  const entornoES = entorno ? (ENTORNOS_ES[entorno] || entorno) : null;

  // Semicírculo toggle — posicionado en el contenedor padre (position:relative)
  const PanelToggle = ({ panelWidth }) => (
    <div style={{ position: "absolute", top: "50%", left: panelWidth - 1, transform: "translateY(-50%)", width: 20, height: 40, overflow: "hidden", zIndex: 30, pointerEvents: "none" }}>
      <button onClick={() => setPanelVisible(v => !v)}
        style={{ position: "absolute", top: 0, left: -20, width: 40, height: 40, borderRadius: "50%", background: AC.panelBg, border: "1px solid rgba(184,154,78,.35)", color: gold, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", fontSize: ".65rem", paddingLeft: 22, transition: "background .2s", pointerEvents: "auto", boxSizing: "border-box" }}
        onMouseEnter={e => e.currentTarget.style.background = "rgba(184,154,78,.2)"}
        onMouseLeave={e => e.currentTarget.style.background = AC.panelBg}>
        {panelVisible ? "◀" : "▶"}
      </button>
    </div>
  );

  return (
    <div style={s}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@300;400;600&display=swap'); @keyframes p{0%,80%,100%{opacity:.2;transform:scale(.8)}40%{opacity:1;transform:scale(1)}}`}</style>
      <div style={header}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <div style={{ ...logo, marginBottom: 0, color: gold, borderColor: gold }}>SIMPLE</div>
          <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: gold }}>ADMIN</div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => setDarkMode(v => !v)}
            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "1.1rem", lineHeight: 1, padding: 0, opacity: 0.7 }}
            title={darkMode ? "Modo día" : "Modo noche"}>
            {darkMode ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={gold} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
          {(view === "chat" || view === "equipo") && (
            <button onClick={() => { setView("lista"); setSeleccionados([]); setTeamMsgs([]); setTeamConvId(null); }} style={{ color: gold, background: "none", border: "none", cursor: "pointer", fontFamily: "monospace", fontSize: ".6rem" }}>← Volver</button>
          )}
        </div>
      </div>

      {view === "lista" && (
        <AdminListaConBusqueda usuarios={usuarios} gold={gold} AC={AC} seleccionados={seleccionados} toggleSeleccion={toggleSeleccion} seleccionar={seleccionar} setView={setView} setTeamMsgs={setTeamMsgs} cargarConvEquipo={cargarConvEquipo} />
      )}
      {view === "__REMOVED__" && (
        <div style={{ maxWidth: 800, margin: "2rem auto", padding: "0 2rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.2rem" }}>
            <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: gold }}>
              {usuarios.length} USUARIO{usuarios.length !== 1 ? "S" : ""}
            </div>
            {seleccionados.length >= 2 && (
              <button onClick={() => { setView("equipo"); setTimeout(() => cargarConvEquipo(), 50); }}
                style={{ background: gold, color: AC.bg, border: "none", borderRadius: 20, fontFamily: "monospace", fontSize: ".55rem", letterSpacing: ".2em", padding: ".5em 1.2em", cursor: "pointer", textTransform: "uppercase" }}>
                Analizar equipo ({seleccionados.length})
              </button>
            )}
            {seleccionados.length === 1 && (
              <div style={{ fontFamily: "monospace", fontSize: ".5rem", color: AC.dim }}>Seleccioná al menos 2 para analizar equipo</div>
            )}
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: ".6rem" }}>
            {usuarios.map((u, i) => {
              const estaSeleccionado = seleccionados.find(s => s.email === u.email);
              return (
                <div key={i} style={{ display: "flex", gap: ".8rem", alignItems: "stretch" }}>
                  <button onClick={() => toggleSeleccion(u)}
                    style={{ width: 36, flexShrink: 0, background: estaSeleccionado ? "rgba(184,154,78,.15)" : "transparent", border: `1px solid ${estaSeleccionado ? gold : "rgba(184,154,78,.2)"}`, color: estaSeleccionado ? gold : AC.dim, cursor: "pointer", fontSize: ".9rem", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: 10 }}>
                    {estaSeleccionado ? "✓" : "+"}
                  </button>
                  <button onClick={() => seleccionar(u)}
                    style={{ flex: 1, background: AC.panelBg, border: "1px solid rgba(184,154,78,.15)", padding: "1.2rem 1.5rem", cursor: "pointer", textAlign: "left", display: "flex", justifyContent: "space-between", alignItems: "center", borderRadius: 12 }}
                    onMouseEnter={e => e.currentTarget.style.borderColor = gold}
                    onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(184,154,78,.15)"}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap", marginBottom: ".2rem" }}>
                        <div style={{ fontSize: ".95rem", fontWeight: 600, color: AC.txt }}>{u.nombre} {u.apellido}</div>
                        {u.empresa && <div style={{ fontFamily: "monospace", fontSize: ".45rem", letterSpacing: ".15em", color: AC.bg, background: gold, padding: ".2em .6em", borderRadius: 20, textTransform: "uppercase" }}>{u.empresa}</div>}
                      </div>
                      <div style={{ fontSize: ".78rem", color: AC.dim }}>{u.email}</div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontFamily: "monospace", fontSize: ".55rem", color: gold }}>{u.diseno?.tipo}</div>
                      <div style={{ fontFamily: "monospace", fontSize: ".5rem", color: AC.dim }}>Perfil {u.diseno?.perfil}</div>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "equipo" && (
        <div style={{ display: "flex", height: "calc(100vh - 60px)", overflow: "hidden", position: "relative" }}>
          <PanelToggle panelWidth={panelVisible ? 260 : 0} />
          {/* Panel izquierdo — equipo colapsable */}
          <div style={{ width: panelVisible ? 260 : 0, minWidth: 0, borderRight: panelVisible ? "1px solid rgba(184,154,78,.15)" : "none", overflowY: panelVisible ? "auto" : "hidden", flexShrink: 0, transition: "width .3s ease", position: "relative", background: AC.panelBg }}>
            <div style={{ width: 260, padding: "1.5rem", opacity: panelVisible ? 1 : 0, transition: "opacity .2s ease", pointerEvents: panelVisible ? "auto" : "none" }}>
              <div style={{ fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".3em", color: gold, textTransform: "uppercase", marginBottom: "1rem" }}>
                Equipo · {seleccionados.length} personas
              </div>
              {seleccionados.map((u, i) => (
                <div key={i} style={{ marginBottom: "1.2rem", paddingBottom: "1.2rem", borderBottom: "1px solid rgba(184,154,78,.1)" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: ".5rem", flexWrap: "wrap", marginBottom: ".2rem" }}>
                    <div style={{ fontSize: ".9rem", fontWeight: 600, color: AC.txt }}>{u.nombre} {u.apellido}</div>
                    {u.empresa && <div style={{ fontFamily: "monospace", fontSize: ".4rem", letterSpacing: ".15em", color: AC.bg, background: gold, padding: ".15em .5em", borderRadius: 20, textTransform: "uppercase" }}>{u.empresa}</div>}
                  </div>
                  <div style={{ fontFamily: "monospace", fontSize: ".5rem", color: gold }}>{u.diseno?.tipo} · {u.diseno?.perfil}</div>
                  <div style={{ fontSize: ".75rem", color: AC.dim, marginTop: ".2rem" }}>{u.diseno?.autoridad}</div>
                </div>
              ))}
              <div style={{ marginTop: "1rem", padding: "1rem", background: "rgba(184,154,78,.05)", border: "1px solid rgba(184,154,78,.15)", fontSize: ".78rem", color: AC.dim, lineHeight: 1.6, borderRadius: 10 }}>
                {teamConvId ? "✓ Conversación guardada" : "La conversación se guardará con el primer mensaje."}
              </div>
            </div>
          </div>

          {/* Chat de equipo */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", position: "relative", background: AC.bg }}>
            <div style={{ flex: 1, padding: `1.5rem ${panelVisible ? "clamp(60px, 12vw, 170px)" : "clamp(60px, 15vw, 300px)"}`, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {teamMsgs.length === 0 && (
                <div style={{ color: C.dim, fontSize: ".85rem", textAlign: "center", marginTop: "2rem", lineHeight: 1.8 }}>
                  <div style={{ fontSize: "1.1rem", color: C.txt, marginBottom: ".5rem" }}>
                    {seleccionados.map(u => u.nombre).join(", ")}
                  </div>
                  Preguntá sobre las dinámicas del equipo, roles naturales, complementariedades o tensiones.
                </div>
              )}
              {teamMsgs.map((m, i) => (
                <div key={i}
                  ref={m.role === "user" ? lastUserTeamMsgRef : null}
                  style={{ textAlign: m.role === "user" ? "right" : "left" }}>
                  <div style={{ fontFamily: "monospace", fontSize: ".48rem", letterSpacing: ".3em", color: m.role === "user" ? AC.dim : gold, marginBottom: ".25rem", textTransform: "uppercase" }}>
                    {m.role === "user" ? "Fran" : "SIMPLE"}
                  </div>
                  <div style={{ fontSize: ".9rem", lineHeight: 1.85, color: m.role === "user" ? AC.dim : AC.txt, fontStyle: m.role === "user" ? "italic" : "normal", fontFamily: m.role === "assistant" ? GEORGIA : NUNITO }}
                    dangerouslySetInnerHTML={{ __html: md(m.content) }} />
                </div>
              ))}
              {teamLoading && (
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: ".48rem", letterSpacing: ".3em", color: C.gold, marginBottom: ".25rem" }}>SIMPLE</div>
                  <div style={{ display: "flex", gap: 5 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, background: C.gold, borderRadius: "50%", animation: `p 1.4s ${i*.2}s infinite ease-in-out` }} />)}
                  </div>
                </div>
              )}
              <div ref={teamEndRef} />
            </div>
            <div style={{ padding: `1rem ${panelVisible ? "clamp(60px, 12vw, 170px)" : "clamp(60px, 15vw, 300px)"}`, borderTop: "1px solid rgba(184,154,78,.15)", display: "flex", gap: ".8rem", alignItems: "flex-end" }}>
              <textarea value={teamInput} onChange={e => setTeamInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendTeam(); } }}
                style={{ flex: 1, background: "rgba(255,255,255,.02)", border: "1px solid rgba(184,154,78,.2)", borderRadius: 12, color: AC.txt, fontFamily: GEORGIA, fontSize: ".9rem", padding: ".8rem 1rem", outline: "none", resize: "none", lineHeight: 1.6, minHeight: 120, maxHeight: 300, boxSizing: "border-box" }}
                placeholder="Preguntá sobre las dinámicas del equipo..." />
              <button onClick={sendTeam} disabled={teamLoading || !teamInput.trim()}
                style={{ background: "transparent", border: "1px solid " + C.gold, borderRadius: 20, color: C.gold, fontFamily: "monospace", fontSize: ".6rem", letterSpacing: ".2em", padding: ".6em 1.2em", cursor: "pointer", textTransform: "uppercase", opacity: teamLoading || !teamInput.trim() ? 0.3 : 1, alignSelf: "flex-end", marginBottom: 2 }}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}

      {view === "chat" && selected && (
        <div style={{ display: "flex", height: "calc(100vh - 60px)", overflow: "hidden", position: "relative" }}>
          <PanelToggle panelWidth={panelVisible ? 300 : 0} />
          {/* Panel izquierdo — colapsable con animación */}
          <div style={{ width: panelVisible ? 300 : 0, minWidth: 0, borderRight: panelVisible ? "1px solid rgba(184,154,78,.15)" : "none", overflowY: panelVisible ? "auto" : "hidden", flexShrink: 0, display: "flex", flexDirection: "column", position: "relative", transition: "width .3s ease", background: AC.panelBg }}>
            <div style={{ width: 300, padding: "1.5rem", display: "flex", flexDirection: "column", gap: ".7rem", opacity: panelVisible ? 1 : 0, transition: "opacity .2s ease", pointerEvents: panelVisible ? "auto" : "none", boxSizing: "border-box" }}>
              <div style={{ fontSize: "1.1rem", fontWeight: 600, color: AC.txt }}>{selected.nombre} {selected.apellido}</div>
              <div style={{ fontSize: ".78rem", color: AC.dim, marginBottom: ".5rem" }}>{selected.email}</div>
              {[
                ["Tipo", selected.diseno?.tipo],
                ["Autoridad", selected.diseno?.autoridad],
                ["Perfil", selected.diseno?.perfil],
                ["Estrategia", selected.diseno?.estrategia],
                ["Firma", selected.diseno?.firma],
                ["No-self", selected.diseno?.no_self_theme],
                ["Entorno", entornoES]
              ].map(([l, v]) => v && (
                <div key={l}>
                  <div style={{ fontFamily: "monospace", fontSize: ".45rem", letterSpacing: ".3em", color: gold, textTransform: "uppercase", marginBottom: ".15rem" }}>{l}</div>
                  <div style={{ fontSize: ".82rem", color: AC.txt }}>{v}</div>
                </div>
              ))}
              <div style={{ borderTop: "1px solid rgba(184,154,78,.15)", marginTop: ".5rem", paddingTop: "1rem" }}>
                <div style={{ fontFamily: "monospace", fontSize: ".45rem", letterSpacing: ".3em", color: gold, textTransform: "uppercase", marginBottom: ".4rem" }}>Empresa</div>
                <EmpresaEditor usuario={selected} gold={gold} AC={AC} onUpdate={(empresa) => {
                  setUsuarios(prev => prev.map(u => u.email === selected.email ? { ...u, empresa } : u));
                  setSelected(prev => ({ ...prev, empresa }));
                }} />
                <div style={{ fontFamily: "monospace", fontSize: ".45rem", letterSpacing: ".3em", color: gold, textTransform: "uppercase", marginBottom: ".5rem", marginTop: "1rem" }}>Mis notas</div>
                <textarea value={nota} onChange={e => setNota(e.target.value)}
                  style={{ width: "100%", background: darkMode ? "rgba(255,255,255,.03)" : "rgba(0,0,0,.04)", border: "1px solid rgba(184,154,78,.2)", borderRadius: 12, color: AC.txt, fontFamily: NUNITO, fontSize: ".8rem", padding: ".7rem", outline: "none", resize: "vertical", lineHeight: 1.6, minHeight: 120, boxSizing: "border-box", marginBottom: ".5rem", display: "block" }}
                  placeholder="Anotá contexto sobre este cliente..." />
                <button onClick={guardarNota} style={{ background: nota === notaGuardada ? "rgba(184,154,78,.1)" : gold, color: nota === notaGuardada ? AC.dim : AC.bg, border: `1px solid ${gold}`, borderRadius: 20, fontFamily: "monospace", fontSize: ".5rem", letterSpacing: ".2em", padding: ".5em 1em", cursor: "pointer", textTransform: "uppercase", width: "100%", boxSizing: "border-box", transition: "all .2s", display: "block" }}>
                  {nota === notaGuardada && notaGuardada ? "✓ Nota activa en el chat" : "Activar nota en el chat"}
                </button>
              </div>
            </div>
          </div>

          {/* Chat */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, position: "relative", background: AC.bg }}>
            <div style={{ flex: 1, padding: `1.5rem ${panelVisible ? "clamp(60px, 12vw, 170px)" : "clamp(60px, 15vw, 300px)"}`, overflowY: "auto", display: "flex", flexDirection: "column", gap: "1.2rem" }}>
              {msgs.length === 0 && (
                <div style={{ color: C.dim, fontSize: ".85rem", textAlign: "center", marginTop: "2rem" }}>
                  Chateá con el diseño de {selected.nombre}. Las respuestas están basadas en su perfil completo.
                  {notaGuardada && <div style={{ marginTop: ".5rem", fontSize: ".75rem", color: C.gold }}>📝 Tus notas están activas en este chat.</div>}
                </div>
              )}
              {msgs.map((m, i) => (
                <div key={i}
                  ref={m.role === "user" ? lastUserMsgRef : null}
                  style={{ textAlign: m.role === "user" ? "right" : "left" }}>
                  <div style={{ fontFamily: "monospace", fontSize: ".48rem", letterSpacing: ".3em", color: m.role === "user" ? AC.dim : gold, marginBottom: ".25rem", textTransform: "uppercase" }}>
                    {m.role === "user" ? "Fran" : "SIMPLE"}
                  </div>
                  <div style={{ fontSize: ".9rem", lineHeight: 1.85, color: m.role === "user" ? AC.dim : AC.txt, fontStyle: m.role === "user" ? "italic" : "normal", fontFamily: m.role === "assistant" ? GEORGIA : NUNITO }}
                    dangerouslySetInnerHTML={{ __html: md(m.content) }} />
                </div>
              ))}
              {loading && (
                <div>
                  <div style={{ fontFamily: "monospace", fontSize: ".48rem", letterSpacing: ".3em", color: C.gold, marginBottom: ".25rem" }}>SIMPLE</div>
                  <div style={{ display: "flex", gap: 5 }}>
                    {[0,1,2].map(i => <div key={i} style={{ width: 5, height: 5, background: C.gold, borderRadius: "50%", animation: `p 1.4s ${i*.2}s infinite ease-in-out` }} />)}
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
            </div>
            <div style={{ padding: `1rem ${panelVisible ? "clamp(60px, 12vw, 170px)" : "clamp(60px, 15vw, 300px)"}`, borderTop: "1px solid rgba(184,154,78,.15)", display: "flex", gap: ".8rem", alignItems: "flex-end" }}>
              <textarea value={input} onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
                style={{ flex: 1, background: "rgba(255,255,255,.02)", border: "1px solid rgba(184,154,78,.2)", borderRadius: 12, color: AC.txt, fontFamily: GEORGIA, fontSize: ".9rem", padding: ".8rem 1rem", outline: "none", resize: "none", lineHeight: 1.6, minHeight: 120, maxHeight: 300, boxSizing: "border-box" }}
                placeholder={`Preguntá sobre el diseño de ${selected.nombre}...`} />
              <button onClick={send} disabled={loading || !input.trim()}
                style={{ background: "transparent", border: "1px solid " + C.gold, borderRadius: 20, color: C.gold, fontFamily: "monospace", fontSize: ".6rem", letterSpacing: ".2em", padding: ".6em 1.2em", cursor: "pointer", textTransform: "uppercase", opacity: loading || !input.trim() ? 0.3 : 1, alignSelf: "flex-end", marginBottom: 2 }}>
                Enviar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const isAdmin = window.location.pathname === "/admin";
  if (isAdmin) return <AdminPanel />;

  const [screen, setScreen] = useState("welcome");
  const [email, setEmail] = useState("");
  const [lang, setLang] = useState("es");
  const [problema, setProblema] = useState(null);
  const [desafios, setDesafios] = useState([]);
  const [dynamicUser, setDynamicUser] = useState(null);
  function go(s, e) { if (e) setEmail(e); setScreen(s); }
  return (
    <div style={{ background: C.bg, minHeight: "100vh" }}>
      <style>{"*{box-sizing:border-box;margin:0;padding:0}body{background:#080808}input:-webkit-autofill{-webkit-box-shadow:0 0 0 1000px #080808 inset!important;-webkit-text-fill-color:#f0ebe0!important}"}</style>
      {screen === "welcome" && <Welcome go={go} lang={lang} setLang={setLang} />}
      {screen === "register" && <Register go={go} lang={lang} setDynamicUser={setDynamicUser} />}
      {screen === "pending" && <Pending email={email} go={go} lang={lang} />}
      {screen === "login" && <Login go={go} lang={lang} setDynamicUser={setDynamicUser} />}
      {screen === "onboarding" && <Onboarding go={go} userEmail={email} lang={lang} setProblema={setProblema} setDesafios={setDesafios} dynamicUser={dynamicUser} />}
      {screen === "chat" && <Chat go={go} userEmail={email} lang={lang} setLang={setLang} problema={problema} desafios={desafios} setDesafios={setDesafios} setProblema={setProblema} dynamicUser={dynamicUser} />}
    </div>
  );
}
