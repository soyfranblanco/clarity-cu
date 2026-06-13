import { useState, useEffect, useRef } from "react";
import { createClient } from "@supabase/supabase-js";

// ─── SUPABASE ────────────────────────────────────────────────────────────────
const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

// ─── SYSTEM PROMPT BUILDER ────────────────────────────────────────────────────
const buildSystemPrompt = (hdProfile, empresaContexto) => {
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

  const hdSection = hdProfile
    ? `\n═══════════════════════════════════════
DISEÑO BIOLÓGICO DE ESTA PERSONA
═══════════════════════════════════════
${hdProfile}
═══════════════════════════════════════\n`
    : "";

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
- Si no hay documentos de la empresa cargados, trabajá solo con el diseño de la persona y sus documentos personales

═══════════════════════════════════════
PUNTOS DE ENTRADA — SIN AGENDA
═══════════════════════════════════════
La persona puede llegar con cualquier punto de partida. No asumas que quiere mejorar dentro de la empresa, quedarse en su rol actual o adaptarse a lo que le piden. Escuchá primero.

Posibles puntos de entrada:
- Un performance review concreto que quiere analizar
- Un desafío o problema en el trabajo
- Una relación difícil con su manager o equipo
- Una decisión sobre su carrera dentro o fuera de la empresa
- Querer entender cómo funciona para rendir mejor — o para saber si este es su lugar

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
};

// ─── CHIPS ────────────────────────────────────────────────────────────────────
const SUGGESTION_CHIPS = [
  "Tengo un performance review que quiero analizar",
  "Hay un desafío en el trabajo que no sé cómo resolver",
  "Quiero entender cómo funciono para rendir mejor",
  "Estoy evaluando una decisión sobre mi carrera",
];

// ─── SCREENS ──────────────────────────────────────────────────────────────────
const SCREEN = {
  LOADING: "loading",
  AUTH: "auth",
  REGISTER_EMPRESA: "register_empresa",
  ONBOARDING_HD: "onboarding_hd",
  CHAT: "chat",
};

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [screen, setScreen] = useState(SCREEN.LOADING);
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [empresaData, setEmpresaData] = useState(null);

  // Auth
  const [authMode, setAuthMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState("");
  const [authError, setAuthError] = useState("");
  const [authLoading, setAuthLoading] = useState(false);

  // Empresa
  const [empresas, setEmpresas] = useState([]);
  const [selectedEmpresa, setSelectedEmpresa] = useState("");
  const [codigoEmpresa, setCodigoEmpresa] = useState("");
  const [empresaError, setEmpresaError] = useState("");
  const [empresaLoading, setEmpresaLoading] = useState(false);

  // HD
  const [hdTipo, setHdTipo] = useState("");
  const [hdAutoridad, setHdAutoridad] = useState("");
  const [hdPerfil, setHdPerfil] = useState("");
  const [hdLoading, setHdLoading] = useState(false);

  // Chat
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [showChips, setShowChips] = useState(true);
  const messagesEndRef = useRef(null);
  const textareaRef = useRef(null);

  // ── Init ────────────────────────────────────────────────────────────────────
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      } else {
        setScreen(SCREEN.AUTH);
      }
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        loadProfile(session.user.id);
      } else {
        setUser(null);
        setProfile(null);
        setEmpresaData(null);
        setMessages([]);
        setScreen(SCREEN.AUTH);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [input]);

  // ── Profile loader ──────────────────────────────────────────────────────────
  const loadProfile = async (userId) => {
    const { data, error } = await supabase
      .from("perfiles")
      .select("*")
      .eq("user_id", userId)
      .single();

    if (error || !data) {
      await loadEmpresas();
      setScreen(SCREEN.REGISTER_EMPRESA);
      return;
    }

    setProfile(data);

    if (!data.hd_tipo) {
      setScreen(SCREEN.ONBOARDING_HD);
      return;
    }

    // Load empresa context
    let emp = null;
    if (data.empresa_id) {
      const { data: empData } = await supabase
        .from("empresas")
        .select("nombre, documentos_contexto")
        .eq("id", data.empresa_id)
        .single();
      emp = empData;
      setEmpresaData(emp);
    }

    // Load message history
    const { data: hist } = await supabase
      .from("mensajes")
      .select("role, content")
      .eq("user_id", userId)
      .order("created_at", { ascending: true });

    if (!hist || hist.length === 0) {
      setScreen(SCREEN.CHAT);
      await sendOnboarding(data, emp);
    } else {
      setMessages(hist);
      setShowChips(false);
      setScreen(SCREEN.CHAT);
    }
  };

  const loadEmpresas = async () => {
    const { data } = await supabase
      .from("empresas")
      .select("id, nombre, codigo")
      .eq("activa", true)
      .order("nombre");
    setEmpresas(data || []);
  };

  // ── Auth ────────────────────────────────────────────────────────────────────
  const handleAuth = async (e) => {
    e.preventDefault();
    setAuthError("");
    setAuthLoading(true);
    try {
      if (authMode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) setAuthError("Email o contraseña incorrectos.");
      } else {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) {
          setAuthError(error.message);
        } else if (data.user) {
          setUser(data.user);
          await loadEmpresas();
          setScreen(SCREEN.REGISTER_EMPRESA);
        }
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // ── Empresa ─────────────────────────────────────────────────────────────────
  const handleEmpresaSubmit = async (e) => {
    e.preventDefault();
    setEmpresaError("");
    setEmpresaLoading(true);
    try {
      const empresa = empresas.find((em) => em.id === selectedEmpresa);
      if (!empresa) { setEmpresaError("Seleccioná una empresa."); return; }
      if (empresa.codigo !== codigoEmpresa.trim().toUpperCase()) {
        setEmpresaError("El código no es correcto. Pedíselo a tu empresa.");
        return;
      }
      const { data: newProfile, error } = await supabase
        .from("perfiles")
        .insert({
          user_id: user.id,
          nombre: nombre || email.split("@")[0],
          empresa_id: empresa.id,
        })
        .select()
        .single();

      if (error) { setEmpresaError("Hubo un error. Intentá de nuevo."); return; }
      setProfile(newProfile);
      setScreen(SCREEN.ONBOARDING_HD);
    } finally {
      setEmpresaLoading(false);
    }
  };

  // ── HD Submit ───────────────────────────────────────────────────────────────
  const handleHdSubmit = async (e) => {
    e.preventDefault();
    if (!hdTipo || !hdAutoridad || !hdPerfil) return;
    setHdLoading(true);

    const { data: updated, error } = await supabase
      .from("perfiles")
      .update({ hd_tipo: hdTipo, hd_autoridad: hdAutoridad, hd_perfil: hdPerfil })
      .eq("user_id", user.id)
      .select()
      .single();

    if (error) { setHdLoading(false); return; }
    setProfile(updated);

    let emp = null;
    if (updated.empresa_id) {
      const { data: empData } = await supabase
        .from("empresas")
        .select("nombre, documentos_contexto")
        .eq("id", updated.empresa_id)
        .single();
      emp = empData;
      setEmpresaData(emp);
    }

    setScreen(SCREEN.CHAT);
    await sendOnboarding(updated, emp);
    setHdLoading(false);
  };

  // ── Onboarding ──────────────────────────────────────────────────────────────
  const sendOnboarding = async (prof, emp) => {
    const hdProfile = prof?.hd_tipo
      ? `Tipo: ${prof.hd_tipo}\nAutoridad: ${prof.hd_autoridad}\nPerfil: ${prof.hd_perfil}`
      : null;
    const systemPrompt = buildSystemPrompt(hdProfile, emp?.documentos_contexto || null);
    setChatLoading(true);
    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: systemPrompt,
          messages: [{ role: "user", content: "__CLARITY_START__" }],
        }),
      });
      const data = await response.json();
      const assistantText = data.content?.find((b) => b.type === "text")?.text || "";
      const assistantMsg = { role: "assistant", content: assistantText };
      setMessages([assistantMsg]);
      setShowChips(true);
      await supabase.from("mensajes").insert({
        user_id: prof.user_id || user.id,
        role: "assistant",
        content: assistantText,
      });
    } finally {
      setChatLoading(false);
    }
  };

  // ── Send message ────────────────────────────────────────────────────────────
  const sendMessage = async (text) => {
    if (!text.trim() || chatLoading) return;
    const userMsg = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setShowChips(false);
    setChatLoading(true);

    await supabase.from("mensajes").insert({ user_id: user.id, role: "user", content: text });

    const hdProfile = profile?.hd_tipo
      ? `Tipo: ${profile.hd_tipo}\nAutoridad: ${profile.hd_autoridad}\nPerfil: ${profile.hd_perfil}`
      : null;
    const systemPrompt = buildSystemPrompt(hdProfile, empresaData?.documentos_contexto || null);

    try {
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6",
          max_tokens: 1000,
          system: systemPrompt,
          messages: newMessages,
        }),
      });
      const data = await response.json();
      const assistantText = data.content?.find((b) => b.type === "text")?.text || "";
      setMessages([...newMessages, { role: "assistant", content: assistantText }]);
      await supabase.from("mensajes").insert({ user_id: user.id, role: "assistant", content: assistantText });
    } finally {
      setChatLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(input); }
  };

  // ── RENDER ──────────────────────────────────────────────────────────────────
  if (screen === SCREEN.LOADING) return <LoadingScreen />;
  if (screen === SCREEN.AUTH)
    return <AuthScreen authMode={authMode} setAuthMode={setAuthMode} email={email} setEmail={setEmail} password={password} setPassword={setPassword} nombre={nombre} setNombre={setNombre} authError={authError} authLoading={authLoading} onSubmit={handleAuth} />;
  if (screen === SCREEN.REGISTER_EMPRESA)
    return <EmpresaScreen empresas={empresas} selectedEmpresa={selectedEmpresa} setSelectedEmpresa={setSelectedEmpresa} codigoEmpresa={codigoEmpresa} setCodigoEmpresa={setCodigoEmpresa} nombre={nombre} setNombre={setNombre} error={empresaError} loading={empresaLoading} onSubmit={handleEmpresaSubmit} authMode={authMode} />;
  if (screen === SCREEN.ONBOARDING_HD)
    return <HdScreen hdTipo={hdTipo} setHdTipo={setHdTipo} hdAutoridad={hdAutoridad} setHdAutoridad={setHdAutoridad} hdPerfil={hdPerfil} setHdPerfil={setHdPerfil} loading={hdLoading} onSubmit={handleHdSubmit} />;

  // ── CHAT ────────────────────────────────────────────────────────────────────
  return (
    <div style={S.chatRoot}>
      <header style={S.header}>
        <div style={S.headerInner}>
          <div style={S.logoMark}>
            <span style={S.logoS}>S</span>
            <span style={S.logoLabel}>CLARITY</span>
          </div>
          {empresaData && <span style={S.empresaBadge}>{empresaData.nombre}</span>}
          <button style={S.signOutBtn} onClick={() => supabase.auth.signOut()}>Salir</button>
        </div>
      </header>

      <main style={S.messagesArea}>
        {messages.length === 0 && !chatLoading && <WelcomeCard />}
        {messages.map((msg, i) => (
          <MessageBubble key={i} role={msg.role} content={msg.content} />
        ))}
        {chatLoading && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </main>

      {showChips && messages.length > 0 && (
        <div style={S.chipsArea}>
          {SUGGESTION_CHIPS.map((chip, i) => (
            <button key={i} style={S.chip} onClick={() => sendMessage(chip)}>{chip}</button>
          ))}
        </div>
      )}

      <div style={S.inputArea}>
        <div style={S.inputWrapper}>
          <textarea
            ref={textareaRef}
            style={S.textarea}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribí lo que tenés en mente..."
            rows={1}
          />
          <button
            style={{ ...S.sendBtn, opacity: input.trim() && !chatLoading ? 1 : 0.35 }}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || chatLoading}
          >
            <SendIcon />
          </button>
        </div>
        <p style={S.privacyNote}>Tus conversaciones son privadas. La empresa no tiene acceso.</p>
      </div>
    </div>
  );
}

// ─── SUB-COMPONENTS ───────────────────────────────────────────────────────────

function LoadingScreen() {
  return <div style={S.fullCenter}><div style={S.pulsingDot} /></div>;
}

function WelcomeCard() {
  return (
    <div style={S.welcomeCard}>
      <p style={S.welcomeTitle}>Una IA para potenciar equipos, pero con estrategias personalizadas para cada uno.</p>
      <p style={S.welcomeSub}>Porque todos tenemos una forma única de rendir, decidir y crecer.</p>
    </div>
  );
}

function MessageBubble({ role, content }) {
  const isUser = role === "user";
  return (
    <div style={{ ...S.bubbleRow, justifyContent: isUser ? "flex-end" : "flex-start" }}>
      {!isUser && <div style={S.avatarDot} />}
      <div style={isUser ? S.bubbleUser : S.bubbleAssistant}>
        {content.split("\n").map((line, i, arr) => (
          <span key={i}>{line}{i < arr.length - 1 && <br />}</span>
        ))}
      </div>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div style={{ ...S.bubbleRow, justifyContent: "flex-start" }}>
      <div style={S.avatarDot} />
      <div style={S.typingBubble}>
        <span style={S.dot1} /><span style={S.dot2} /><span style={S.dot3} />
      </div>
    </div>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function AuthScreen({ authMode, setAuthMode, email, setEmail, password, setPassword, nombre, setNombre, authError, authLoading, onSubmit }) {
  return (
    <div style={S.authRoot}>
      <div style={S.authCard}>
        <div style={S.authLogo}><span style={S.logoS}>S</span><span style={{ ...S.logoLabel, fontSize: "1.1rem" }}>CLARITY</span></div>
        <p style={S.authTagline}>Tu coach de desarrollo profesional</p>
        <form onSubmit={onSubmit} style={S.form}>
          {authMode === "register" && (
            <input style={S.input} type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          )}
          <input style={S.input} type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <input style={S.input} type="password" placeholder="Contraseña" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {authError && <p style={S.errorText}>{authError}</p>}
          <button style={S.primaryBtn} type="submit" disabled={authLoading}>
            {authLoading ? "..." : authMode === "login" ? "Ingresar" : "Crear cuenta"}
          </button>
        </form>
        <button style={S.switchBtn} onClick={() => setAuthMode(authMode === "login" ? "register" : "login")}>
          {authMode === "login" ? "¿Primera vez? Crear cuenta" : "Ya tengo cuenta"}
        </button>
      </div>
    </div>
  );
}

function EmpresaScreen({ empresas, selectedEmpresa, setSelectedEmpresa, codigoEmpresa, setCodigoEmpresa, nombre, setNombre, error, loading, onSubmit, authMode }) {
  return (
    <div style={S.authRoot}>
      <div style={S.authCard}>
        <div style={S.authLogo}><span style={S.logoS}>S</span><span style={{ ...S.logoLabel, fontSize: "1.1rem" }}>CLARITY</span></div>
        <p style={S.authTagline}>¿En qué organización trabajás?</p>
        <p style={S.authSub}>El código te lo comparte tu empresa. Si no lo tenés, pedíselo a tu manager o a Recursos Humanos.</p>
        <form onSubmit={onSubmit} style={S.form}>
          {authMode === "register" && (
            <input style={S.input} type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          )}
          <select style={S.input} value={selectedEmpresa} onChange={(e) => setSelectedEmpresa(e.target.value)} required>
            <option value="">Seleccioná tu empresa</option>
            {empresas.map((em) => <option key={em.id} value={em.id}>{em.nombre}</option>)}
          </select>
          <input style={S.input} type="text" placeholder="Código de acceso (ej: CU2026)" value={codigoEmpresa} onChange={(e) => setCodigoEmpresa(e.target.value.toUpperCase())} required />
          {error && <p style={S.errorText}>{error}</p>}
          <button style={S.primaryBtn} type="submit" disabled={loading}>{loading ? "Validando..." : "Confirmar"}</button>
        </form>
      </div>
    </div>
  );
}

function HdScreen({ hdTipo, setHdTipo, hdAutoridad, setHdAutoridad, hdPerfil, setHdPerfil, loading, onSubmit }) {
  const tipos = ["Generador", "Generador Manifestante", "Proyector", "Manifestador", "Reflector"];
  const autoridades = ["Sacral", "Emocional", "Esplénica", "Ego", "Self / G", "Mental / Sounding Board"];
  const perfiles = ["1/3", "1/4", "2/4", "2/5", "3/5", "3/6", "4/6", "4/1", "5/1", "5/2", "6/2", "6/3"];
  const complete = hdTipo && hdAutoridad && hdPerfil;
  return (
    <div style={S.authRoot}>
      <div style={{ ...S.authCard, maxWidth: 480 }}>
        <div style={S.authLogo}><span style={S.logoS}>S</span><span style={{ ...S.logoLabel, fontSize: "1.1rem" }}>CLARITY</span></div>
        <p style={S.authTagline}>Tu diseño biológico</p>
        <p style={S.authSub}>Esta información define cómo procesás decisiones, generás energía y te relacionás con otros. Es la base de todo lo que te voy a decir.</p>
        <form onSubmit={onSubmit} style={S.form}>
          <label style={S.fieldLabel}>Tipo</label>
          <select style={S.input} value={hdTipo} onChange={(e) => setHdTipo(e.target.value)} required>
            <option value="">Seleccioná tu tipo</option>
            {tipos.map((t) => <option key={t}>{t}</option>)}
          </select>
          <label style={S.fieldLabel}>Autoridad</label>
          <select style={S.input} value={hdAutoridad} onChange={(e) => setHdAutoridad(e.target.value)} required>
            <option value="">Seleccioná tu autoridad</option>
            {autoridades.map((a) => <option key={a}>{a}</option>)}
          </select>
          <label style={S.fieldLabel}>Perfil</label>
          <select style={S.input} value={hdPerfil} onChange={(e) => setHdPerfil(e.target.value)} required>
            <option value="">Seleccioná tu perfil</option>
            {perfiles.map((p) => <option key={p}>{p}</option>)}
          </select>
          <p style={{ ...S.authSub, fontSize: "0.75rem", marginTop: 4 }}>
            Si no conocés tu diseño, calculalo en{" "}
            <a href="https://www.jovianarchive.com" target="_blank" rel="noreferrer" style={{ color: "#C4A882" }}>jovianarchive.com</a>
            {" "}— solo necesitás fecha, hora y lugar de nacimiento.
          </p>
          <button style={{ ...S.primaryBtn, opacity: complete ? 1 : 0.5 }} type="submit" disabled={loading || !complete}>
            {loading ? "Cargando..." : "Comenzar"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────────
const C = {
  bg: "#0E0D0C",
  surface: "#1A1917",
  border: "#2C2A27",
  text: "#E8E4DF",
  textMuted: "#6A6560",
  accent: "#8B6F4E",
  accentLight: "#C4A882",
};

const S = {
  chatRoot: { display: "flex", flexDirection: "column", height: "100dvh", background: C.bg, color: C.text, fontFamily: "'Inter', -apple-system, sans-serif", fontSize: "0.9375rem" },
  fullCenter: { display: "flex", alignItems: "center", justifyContent: "center", height: "100dvh", background: C.bg },
  pulsingDot: { width: 10, height: 10, borderRadius: "50%", background: C.accent, animation: "clarity-pulse 1.4s ease-in-out infinite" },

  header: { borderBottom: `1px solid ${C.border}`, background: C.bg, position: "sticky", top: 0, zIndex: 10 },
  headerInner: { maxWidth: 720, margin: "0 auto", padding: "12px 20px", display: "flex", alignItems: "center", gap: 12 },
  logoMark: { display: "flex", alignItems: "baseline", gap: 6, flex: 1 },
  logoS: { fontWeight: 700, fontSize: "1.25rem", color: C.accentLight, letterSpacing: "-0.02em", fontFamily: "Georgia, serif" },
  logoLabel: { fontSize: "0.68rem", letterSpacing: "0.2em", color: C.textMuted, fontWeight: 500, textTransform: "uppercase" },
  empresaBadge: { fontSize: "0.72rem", color: C.textMuted, border: `1px solid ${C.border}`, borderRadius: 20, padding: "2px 10px" },
  signOutBtn: { background: "none", border: "none", color: C.textMuted, cursor: "pointer", fontSize: "0.8rem", padding: "4px 8px", fontFamily: "inherit" },

  messagesArea: { flex: 1, overflowY: "auto", padding: "24px 20px", display: "flex", flexDirection: "column", gap: 16, maxWidth: 720, width: "100%", margin: "0 auto", boxSizing: "border-box" },
  welcomeCard: { margin: "auto", maxWidth: 460, textAlign: "center", padding: "48px 24px 32px" },
  welcomeTitle: { fontSize: "1.2rem", fontWeight: 400, lineHeight: 1.5, color: C.text, margin: "0 0 12px", fontFamily: "Georgia, serif" },
  welcomeSub: { fontSize: "0.875rem", color: C.textMuted, lineHeight: 1.65, margin: 0 },

  bubbleRow: { display: "flex", alignItems: "flex-start", gap: 10 },
  avatarDot: { width: 28, height: 28, borderRadius: "50%", background: C.surface, border: `1px solid ${C.border}`, flexShrink: 0, marginTop: 2 },
  bubbleAssistant: { background: "#131211", border: `1px solid ${C.border}`, borderRadius: "4px 14px 14px 14px", padding: "12px 16px", lineHeight: 1.7, color: C.text, maxWidth: "82%", whiteSpace: "pre-wrap" },
  bubbleUser: { background: C.surface, borderRadius: "14px 4px 14px 14px", padding: "12px 16px", lineHeight: 1.7, color: C.text, maxWidth: "72%", whiteSpace: "pre-wrap" },
  typingBubble: { background: "#131211", border: `1px solid ${C.border}`, borderRadius: "4px 14px 14px 14px", padding: "14px 18px", display: "flex", gap: 5, alignItems: "center" },
  dot1: { width: 6, height: 6, borderRadius: "50%", background: C.textMuted, display: "inline-block", animation: "clarity-blink 1.2s 0s infinite" },
  dot2: { width: 6, height: 6, borderRadius: "50%", background: C.textMuted, display: "inline-block", animation: "clarity-blink 1.2s 0.2s infinite" },
  dot3: { width: 6, height: 6, borderRadius: "50%", background: C.textMuted, display: "inline-block", animation: "clarity-blink 1.2s 0.4s infinite" },

  chipsArea: { maxWidth: 720, width: "100%", margin: "0 auto", padding: "0 20px 12px", display: "flex", flexWrap: "wrap", gap: 8, boxSizing: "border-box" },
  chip: { background: "none", border: `1px solid ${C.border}`, borderRadius: 20, padding: "7px 14px", color: C.textMuted, fontSize: "0.8rem", cursor: "pointer", fontFamily: "inherit" },

  inputArea: { borderTop: `1px solid ${C.border}`, padding: "12px 20px 20px", background: C.bg },
  inputWrapper: { maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "flex-end", gap: 10, background: C.surface, border: `1px solid ${C.border}`, borderRadius: 14, padding: "8px 8px 8px 14px" },
  textarea: { flex: 1, background: "none", border: "none", outline: "none", color: C.text, fontSize: "0.9375rem", lineHeight: 1.6, resize: "none", fontFamily: "inherit", minHeight: 24, maxHeight: 160 },
  sendBtn: { background: C.accent, border: "none", borderRadius: 8, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "#fff", flexShrink: 0, transition: "opacity 0.15s" },
  privacyNote: { maxWidth: 720, margin: "8px auto 0", fontSize: "0.7rem", color: C.textMuted, textAlign: "center" },

  authRoot: { display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100dvh", background: C.bg, padding: 20, boxSizing: "border-box" },
  authCard: { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 16, padding: "36px 32px", width: "100%", maxWidth: 400 },
  authLogo: { display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 },
  authTagline: { fontSize: "1.05rem", fontWeight: 500, color: C.text, margin: "0 0 6px", fontFamily: "Georgia, serif" },
  authSub: { fontSize: "0.82rem", color: C.textMuted, lineHeight: 1.6, margin: "0 0 20px" },
  form: { display: "flex", flexDirection: "column", gap: 10 },
  input: { background: C.bg, border: `1px solid ${C.border}`, borderRadius: 8, padding: "10px 12px", color: C.text, fontSize: "0.9rem", fontFamily: "inherit", outline: "none", width: "100%", boxSizing: "border-box" },
  fieldLabel: { fontSize: "0.78rem", color: C.textMuted, marginBottom: -4, display: "block" },
  primaryBtn: { background: C.accent, border: "none", borderRadius: 8, padding: "11px 16px", color: "#fff", fontWeight: 600, fontSize: "0.9rem", cursor: "pointer", marginTop: 4, fontFamily: "inherit" },
  switchBtn: { background: "none", border: "none", color: C.textMuted, fontSize: "0.82rem", cursor: "pointer", marginTop: 16, display: "block", width: "100%", textAlign: "center", fontFamily: "inherit" },
  errorText: { color: "#E07070", fontSize: "0.82rem", margin: 0 },
};

// ─── ANIMATIONS ───────────────────────────────────────────────────────────────
const styleEl = document.createElement("style");
styleEl.textContent = `
  @keyframes clarity-pulse { 0%,100%{opacity:.3;transform:scale(.8)} 50%{opacity:1;transform:scale(1)} }
  @keyframes clarity-blink { 0%,80%,100%{opacity:.2} 40%{opacity:1} }
  select option { background: #1A1917; color: #E8E4DF; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-thumb { background: #2C2A27; border-radius: 4px; }
  textarea::placeholder { color: #3E3B38; }
`;
document.head.appendChild(styleEl);
