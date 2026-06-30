/* eslint-disable */
const { useState, useEffect, useRef, useMemo } = React;

/* ─────────── tokens (default + tweaks) ─────────── */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "palette": ["#f3ecdf", "#3a2f24", "#7c8a63"],
  "serif": "Cormorant Garamond",
  "darkMode": false,
  "showCursor": true
}/*EDITMODE-END*/;

const PALETTES = [
  ['#f3ecdf', '#3a2f24', '#7c8a63'], // linho · espresso · sálvia
  ['#f1e8da', '#433425', '#a9763f'], // creme · nogueira · carvalho
  ['#eef0e6', '#2f3a2a', '#9c6b4a'], // sálvia clara · verde-mata · terracota-barro
  ['#221c15', '#efe6d6', '#c79a5c'], // noite cabana · creme · âmbar de vela
];
const SERIFS = ['Instrument Serif', 'Cormorant Garamond'];

/* ─────────── small UI bits ─────────── */
function StatusPill({ accent }) {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.14em', textTransform: 'uppercase' }}>
      <span style={{
        position: 'relative', width: 7, height: 7, borderRadius: '50%', background: accent,
        boxShadow: `0 0 0 0 ${accent}66`, animation: 'pulse 2.4s ease-out infinite',
      }}></span>
      Disponível p/ junho
      <style>{`@keyframes pulse { 0%{box-shadow:0 0 0 0 ${accent}66} 70%{box-shadow:0 0 0 8px transparent} 100%{box-shadow:0 0 0 0 transparent} }`}</style>
    </span>
  );
}

function Nav({ accent }) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  const items = [
    ['Trabalhos', '#work'],
    ['Serviços', '#services'],
    ['Contato', '#contact'],
  ];
  return (
    <nav data-screen-label="nav" style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
      padding: scrolled ? '14px 32px' : '22px 32px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      backdropFilter: scrolled ? 'blur(10px)' : 'none',
      background: scrolled ? 'color-mix(in oklab, var(--bg) 78%, transparent)' : 'transparent',
      borderBottom: scrolled ? '1px solid var(--line)' : '1px solid transparent',
      transition: 'all .35s cubic-bezier(.2,.7,.2,1)',
      fontSize: 13,
    }}>
      <a href="#top" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{
          width: 30, height: 30, borderRadius: '50%',
          background: 'var(--ink)', color: 'var(--bg)',
          display: 'grid', placeItems: 'center',
          fontFamily: 'var(--serif)', fontSize: 14, fontStyle: 'italic',
        }}>L</span>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.22em' }}>LCA · STUDIO</span>
      </a>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {items.map(([label, href]) => (
          <a key={label} href={href} className="nav-link" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase', position: 'relative' }}>
            {label}
          </a>
        ))}
        <StatusPill accent={accent} />
      </div>
      <style>{`
        .nav-link::after { content: ''; position: absolute; left: 0; right: 0; bottom: -4px; height: 1px; background: var(--ink); transform: scaleX(0); transform-origin: right; transition: transform .4s cubic-bezier(.2,.7,.2,1); }
        .nav-link:hover::after { transform: scaleX(1); transform-origin: left; }
      `}</style>
    </nav>
  );
}

/* ─────────── Hero ─────────── */
function Hero() {
  const heroRef = useRef(null);
  const [y, setY] = useState(0);
  useEffect(() => {
    const on = () => setY(window.scrollY);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  const py = Math.min(y * 0.25, 200);

  return (
    <header id="top" data-screen-label="hero" ref={heroRef} style={{
      position: 'relative',
      minHeight: '100vh',
      padding: '120px 32px 60px',
      display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
      overflow: 'hidden',
    }}>
      {/* top meta row */}
      <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--muted)', textTransform: 'uppercase' }}>
        <span>Portfólio · Edição 2026</span>
        <span>São Paulo · Brasil ☉ 23.5°C</span>
      </div>

      {/* main headline */}
      <div style={{ marginTop: 80, transform: `translateY(${-py * 0.4}px)` }}>
        <h1 style={{
          fontFamily: 'var(--serif)', fontWeight: 400,
          fontSize: 'clamp(72px, 13.5vw, 220px)',
          lineHeight: .92, letterSpacing: '-.02em',
          margin: 0, color: 'var(--ink)',
        }}>
          <span className="reveal-line"><span>Sites que</span></span>
          <span className="reveal-line"><span>contam <em style={{ fontStyle: 'italic', color: 'var(--accent)' }}>histórias</em></span></span>
          <span className="reveal-line"><span>&amp; vendem ideias.</span></span>
        </h1>
      </div>

      {/* bottom row: intro + meta */}
      <div className="reveal" style={{
        marginTop: 60,
        display: 'grid', gridTemplateColumns: '1fr auto', gap: 40, alignItems: 'end',
      }}>
        <p style={{
          maxWidth: 460, margin: 0,
          fontFamily: 'var(--sans)', fontSize: 16, lineHeight: 1.5,
          color: 'var(--ink-soft)',
          textWrap: 'pretty',
        }}>
          <strong style={{ fontWeight: 500 }}>Leandro César de Abreu</strong> — designer e desenvolvedor web. Projetos sob medida para imobiliárias, marcas e estúdios. Também desenho <em style={{ fontFamily: 'var(--serif)', fontSize: 18 }}>templates premium</em> que qualquer pessoa pode publicar.
        </p>
        <div style={{ textAlign: 'right', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--muted)' }}>
          <div>↓ ROLE PARA EXPLORAR</div>
          <div style={{ marginTop: 6 }}>Nº 24</div>
        </div>
      </div>
    </header>
  );
}

/* ─────────── Marquee ─────────── */
function Marquee() {
  const items = ['Web Design', '✷', 'Desenvolvimento', '✷', 'Sites Editoriais', '✷', 'Templates Premium', '✷', 'Imobiliárias', '✷', 'E-commerce', '✷'];
  const seq = [...items, ...items, ...items];
  return (
    <section aria-hidden style={{
      borderTop: '1px solid var(--line)',
      borderBottom: '1px solid var(--line)',
      overflow: 'hidden', padding: '22px 0',
      background: 'var(--bg)',
    }}>
      <div style={{ display: 'flex', gap: 48, whiteSpace: 'nowrap', animation: 'marquee 38s linear infinite', fontFamily: 'var(--serif)', fontSize: 38, color: 'var(--ink)' }}>
        {seq.map((it, i) => (
          <span key={i} style={{ fontStyle: it === '✷' ? 'normal' : 'italic', color: it === '✷' ? 'var(--accent)' : 'var(--ink)', fontSize: it === '✷' ? 22 : 38, alignSelf: 'center' }}>
            {it}
          </span>
        ))}
      </div>
      <style>{`@keyframes marquee { 0%{transform:translateX(0)} 100%{transform:translateX(-33.333%)} }`}</style>
    </section>
  );
}

/* ─────────── Work ─────────── */
const PROJECTS = [
  { num: '01', name: 'Recanto da Serra', kind: 'Imobiliária boutique de campo', year: '2025', tags: ['Next.js', 'CMS', 'Tour 360º'], preview: 'vilamaritima' },
  { num: '02', name: 'Norte Casas',  kind: 'Site de imobiliária', year: '2024', tags: ['Astro', 'Sanity', 'Filtros'],       preview: 'nortecasas' },
  { num: '03', name: 'Atelier de Sites', kind: 'Coleção de templates premium', year: '2025', tags: ['Loja', 'Stripe', '12 temas'], preview: 'atelier' },
  { num: '04', name: 'Folha & Forma', kind: 'Site editorial · estúdio criativo', year: '2024', tags: ['Editorial', 'CMS', 'Custom CMS'], preview: 'folhaforma' },
];

function Work({ cursor, projects = PROJECTS }) {
  const [hovered, setHovered] = useState(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <section id="work" data-screen-label="work" style={{ padding: '120px 32px 80px', position: 'relative' }}>
      <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 56, borderBottom: '1px solid var(--ink)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--muted)' }}>§ I</span>
          <h2 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-.01em' }}>
            Trabalhos <em style={{ color: 'var(--accent)' }}>selecionados</em>
          </h2>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--muted)' }}>{String(projects.length).padStart(2, '0')} PROJETOS</span>
      </div>

      <div onMouseLeave={() => { setHovered(null); cursor.set(false); }}>
        {projects.map((p, i) => (
          <a
            key={p.num}
            href="#contact"
            className="project-row reveal"
            onMouseEnter={() => { setHovered(i); cursor.set(true); }}
            onMouseLeave={() => cursor.set(false)}
            style={{
              display: 'grid',
              gridTemplateColumns: '80px 1fr auto 80px',
              alignItems: 'baseline',
              gap: 32,
              padding: '38px 8px 32px',
              borderBottom: '1px solid var(--line)',
              position: 'relative',
              transition: 'padding-left .5s cubic-bezier(.2,.7,.2,1)',
            }}
          >
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.18em', color: 'var(--muted)' }}>{p.num} —</span>
            <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 5.5vw, 84px)', lineHeight: 1, letterSpacing: '-.015em', transition: 'transform .5s cubic-bezier(.2,.7,.2,1), color .3s', color: hovered === i ? 'var(--accent)' : 'var(--ink)' }}>
              {p.name}
            </span>
            <span style={{ fontFamily: 'var(--sans)', fontSize: 13, color: 'var(--ink-soft)', textAlign: 'right', maxWidth: 260 }}>
              {p.kind}<br/>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.16em', color: 'var(--muted)' }}>
                {p.tags.join(' · ')}
              </span>
            </span>
            <span style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--muted)', textAlign: 'right' }}>{p.year} ↗</span>
          </a>
        ))}
      </div>

      {/* floating preview that follows cursor */}
      {hovered !== null && (() => {
        const Comp = window.Previews[projects[hovered].preview] || window.Previews.vilamaritima;
        return (
          <div style={{
            position: 'fixed',
            left: pos.x, top: pos.y,
            transform: 'translate(-50%, -50%)',
            width: 380, height: 280,
            pointerEvents: 'none',
            zIndex: 40,
            transition: 'opacity .25s',
          }}>
            <Comp />
          </div>
        );
      })()}

      <style>{`
        .project-row:hover { padding-left: 28px; }
        .project-row::before { content: '→'; position: absolute; left: -4px; top: 50%; transform: translateY(-50%) translateX(-12px); opacity: 0; color: var(--accent); font-size: 22px; transition: all .4s cubic-bezier(.2,.7,.2,1); }
        .project-row:hover::before { opacity: 1; transform: translateY(-50%) translateX(0); }
      `}</style>
    </section>
  );
}

/* ─────────── Services ─────────── */
const SERVICES = [
  { n: '01', name: 'Sites institucionais', body: 'Identidade, copy e código em uma peça só. Para quem precisa de presença online com personalidade.', from: 'a partir de R$ 4.800' },
  { n: '02', name: 'Sites para imobiliárias', body: 'Catálogo, filtros, integração com CRM e mapa. Pensado para quem precisa converter visitas em propostas.', from: 'a partir de R$ 8.500' },
  { n: '03', name: 'Templates premium', body: 'Coleção de temas prontos para personalização. Você publica em dias, sem reinventar a roda.', from: 'a partir de R$ 480' },
  { n: '04', name: 'Landing pages', body: 'Páginas únicas, focadas em conversão. Para lançamentos, campanhas e produtos digitais.', from: 'a partir de R$ 2.400' },
  { n: '05', name: 'Manutenção & evolução', body: 'Contratos mensais para cuidar do que já existe — pequenas mudanças, performance, segurança.', from: 'a partir de R$ 680/mês' },
];

function Services({ services = SERVICES }) {
  const [open, setOpen] = useState(0);
  return (
    <section id="services" data-screen-label="services" style={{ padding: '120px 32px', background: 'var(--paper)', position: 'relative' }}>
      <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 56, borderBottom: '1px solid var(--ink)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--muted)' }}>§ II</span>
          <h2 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-.01em' }}>
            O que eu <em style={{ color: 'var(--accent)' }}>faço</em>
          </h2>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--muted)' }}>{services.length} SERVIÇOS</span>
      </div>

      <div>
        {services.map((s, i) => (
          <button
            key={s.n}
            onClick={() => setOpen(open === i ? -1 : i)}
            className="reveal"
            style={{
              width: '100%', textAlign: 'left',
              display: 'block',
              padding: '32px 0',
              borderBottom: '1px solid var(--line)',
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '60px 1fr auto 60px', gap: 24, alignItems: 'baseline' }}>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.18em', color: 'var(--muted)' }}>{s.n}</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.5vw, 48px)', letterSpacing: '-.01em', color: open === i ? 'var(--accent)' : 'var(--ink)', transition: 'color .3s' }}>
                {s.name}
              </span>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.14em', color: 'var(--muted)' }}>{s.from}</span>
              <span style={{ fontFamily: 'var(--serif)', fontSize: 28, color: 'var(--accent)', transform: open === i ? 'rotate(45deg)' : 'rotate(0)', transition: 'transform .4s cubic-bezier(.2,.7,.2,1)', textAlign: 'right' }}>+</span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: '60px 1fr auto 60px',
              gap: 24,
              maxHeight: open === i ? 200 : 0,
              opacity: open === i ? 1 : 0,
              overflow: 'hidden',
              transition: 'max-height .5s cubic-bezier(.2,.7,.2,1), opacity .4s, margin-top .4s',
              marginTop: open === i ? 18 : 0,
            }}>
              <span></span>
              <p style={{ margin: 0, maxWidth: 560, fontSize: 15, lineHeight: 1.5, color: 'var(--ink-soft)', fontStyle: 'italic', fontFamily: 'var(--serif)' }}>
                "{s.body}"
              </p>
            </div>
          </button>
        ))}
      </div>
    </section>
  );
}

/* ─────────── Contact ─────────── */
function Contact({ cursor }) {
  const [form, setForm] = useState({ nome: '', email: '', tipo: '', msg: '' });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    if (!form.email) return;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };
  const inputStyle = {
    width: '100%',
    background: 'transparent',
    border: 0, borderBottom: '1px solid var(--ink)',
    padding: '18px 0 12px',
    fontFamily: 'var(--sans)', fontSize: 17, color: 'var(--ink)',
    outline: 'none',
  };
  const labelStyle = { display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--muted)' };

  return (
    <section id="contact" data-screen-label="contact" style={{ padding: '140px 32px 80px', position: 'relative' }}>
      <div className="reveal" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 56, borderBottom: '1px solid var(--ink)', paddingBottom: 20 }}>
        <div style={{ display: 'flex', gap: 18, alignItems: 'baseline' }}>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--muted)' }}>§ III</span>
          <h2 style={{ margin: 0, fontFamily: 'var(--serif)', fontSize: 'clamp(32px, 4vw, 56px)', fontWeight: 400, letterSpacing: '-.01em' }}>
            Vamos <em style={{ color: 'var(--accent)' }}>conversar</em>
          </h2>
        </div>
        <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', color: 'var(--muted)' }}>RESPONDO EM 24H</span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 80, alignItems: 'start' }}>
        <div className="reveal">
          <p style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.1, letterSpacing: '-.01em', margin: 0, color: 'var(--ink)' }}>
            Conte sua ideia. <em>Eu respondo</em> com um plano e um orçamento — sem jargão, sem rodeio.
          </p>
          <div style={{ marginTop: 56, display: 'flex', flexDirection: 'column', gap: 22 }}>
            <div>
              <div style={labelStyle}>Email direto</div>
              <a href="mailto:ola@lca.studio" onMouseEnter={() => cursor.set(true)} onMouseLeave={() => cursor.set(false)} style={{ fontFamily: 'var(--serif)', fontSize: 28, fontStyle: 'italic', borderBottom: '1px solid var(--accent)', paddingBottom: 4 }}>
                ola@lca.studio
              </a>
            </div>
            <div>
              <div style={labelStyle}>Telefone</div>
              <span style={{ fontFamily: 'var(--mono)', fontSize: 16 }}>+55 11 9 0000 0000</span>
            </div>
            <div>
              <div style={labelStyle}>Atendimento</div>
              <span style={{ fontSize: 15, color: 'var(--ink-soft)' }}>Remoto · Brasil & exterior · PT/EN</span>
            </div>
          </div>
        </div>

        <form onSubmit={submit} className="reveal" style={{ display: 'grid', gap: 32 }}>
          <div>
            <label style={labelStyle}>01 · Seu nome</label>
            <input value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} style={inputStyle} placeholder="Como devo te chamar?" />
          </div>
          <div>
            <label style={labelStyle}>02 · Email</label>
            <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} style={inputStyle} placeholder="voce@email.com" />
          </div>
          <div>
            <label style={labelStyle}>03 · Que tipo de projeto?</label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
              {['Site institucional', 'Imobiliária', 'Template', 'Landing page', 'Outro'].map(t => (
                <button
                  type="button"
                  key={t}
                  onClick={() => setForm({ ...form, tipo: t })}
                  onMouseEnter={() => cursor.set(true)}
                  onMouseLeave={() => cursor.set(false)}
                  style={{
                    padding: '8px 16px', borderRadius: 999,
                    border: '1px solid var(--ink)',
                    background: form.tipo === t ? 'var(--ink)' : 'transparent',
                    color: form.tipo === t ? 'var(--bg)' : 'var(--ink)',
                    fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.1em',
                    cursor: 'pointer', transition: 'all .2s',
                  }}
                >{t}</button>
              ))}
            </div>
          </div>
          <div>
            <label style={labelStyle}>04 · Conte um pouco</label>
            <textarea value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })} rows={4} style={{ ...inputStyle, resize: 'vertical', fontFamily: 'var(--sans)' }} placeholder="O que você quer construir, prazos, referências…" />
          </div>
          <button
            type="submit"
            onMouseEnter={() => cursor.set(true)}
            onMouseLeave={() => cursor.set(false)}
            style={{
              justifySelf: 'start',
              padding: '20px 40px',
              background: 'var(--ink)', color: 'var(--bg)',
              fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase',
              borderRadius: 999,
              display: 'inline-flex', alignItems: 'center', gap: 14,
              transition: 'background .3s',
            }}
            className="cta"
          >
            {sent ? '✓ Recebido — respondo logo' : 'Enviar mensagem'}
            <span style={{ fontSize: 16 }}>→</span>
          </button>
        </form>
      </div>
      <style>{`.cta:hover { background: var(--accent) !important; }`}</style>
    </section>
  );
}

/* ─────────── Footer ─────────── */
function Footer() {
  const socials = [
    ['Instagram', '@lca.studio'],
    ['LinkedIn', '/in/leandrocesar'],
    ['GitHub', '@lca'],
    ['Behance', '/lca'],
    ['Dribbble', '/lca'],
  ];
  return (
    <footer data-screen-label="footer" style={{ background: 'var(--ink)', color: 'var(--bg)', padding: '80px 32px 32px', position: 'relative', overflow: 'hidden' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60 }}>
        <div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.22em', opacity: .6, marginBottom: 12 }}>SE QUISER ME ACHAR</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {socials.map(([n, h]) => (
              <a key={n} href="#" className="foot-link" style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 360, fontFamily: 'var(--serif)', fontSize: 24, paddingBottom: 12, borderBottom: '1px solid #ffffff20', position: 'relative' }}>
                <span>{n}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, opacity: .65 }}>{h}</span>
              </a>
            ))}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '.22em', opacity: .6, marginBottom: 12 }}>NEWSLETTER MENSAL</div>
          <p style={{ fontFamily: 'var(--serif)', fontSize: 28, lineHeight: 1.1, margin: 0, marginBottom: 24, maxWidth: 420, marginLeft: 'auto' }}>
            <em>Uma carta por mês</em> sobre o que aprendi desenhando sites no último mês.
          </p>
          <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
            <input placeholder="seu@email.com" style={{ background: 'transparent', border: 0, borderBottom: '1px solid #fff', padding: '10px 4px', color: '#fff', fontFamily: 'var(--sans)', fontSize: 15, width: 280, outline: 'none' }} />
            <button style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.18em', borderBottom: '1px solid var(--accent)', paddingBottom: 4, color: 'var(--accent)' }}>ASSINAR →</button>
          </form>
        </div>
      </div>

      {/* huge LCA wordmark */}
      <div style={{ marginTop: 100, fontFamily: 'var(--serif)', fontSize: 'clamp(140px, 32vw, 520px)', lineHeight: .8, letterSpacing: '-.04em', textAlign: 'center', userSelect: 'none' }}>
        L<em style={{ color: 'var(--accent)' }}>C</em>A
      </div>

      <div style={{ marginTop: 40, paddingTop: 24, borderTop: '1px solid #ffffff20', display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '.16em', opacity: .65 }}>
        <span>© 2026 LEANDRO CÉSAR DE ABREU</span>
        <span>FEITO À MÃO — SÃO PAULO</span>
        <span>v.24.05</span>
      </div>

      <style>{`
        .foot-link::after { content: '→'; position: absolute; right: -28px; top: 0; opacity: 0; transition: all .35s; color: var(--accent); }
        .foot-link:hover::after { opacity: 1; right: -36px; }
        .foot-link:hover { color: var(--accent); }
      `}</style>
    </footer>
  );
}

/* ─────────── Cursor ─────────── */
function Cursor({ enabled }) {
  const ref = useRef(null);
  const hoverRef = useRef(false);
  useEffect(() => {
    if (!enabled) return;
    const el = ref.current;
    let x = 0, y = 0, cx = 0, cy = 0;
    const onMove = (e) => { x = e.clientX; y = e.clientY; };
    const loop = () => {
      cx += (x - cx) * 0.22;
      cy += (y - cy) * 0.22;
      if (el) el.style.transform = `translate(${cx}px, ${cy}px) translate(-50%, -50%)`;
      raf = requestAnimationFrame(loop);
    };
    let raf = requestAnimationFrame(loop);
    window.addEventListener('mousemove', onMove);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('mousemove', onMove); };
  }, [enabled]);
  if (!enabled) return null;
  return <div ref={ref} className="cursor" id="cursor"></div>;
}

/* ─────────── Scroll progress ─────────── */
function Progress() {
  const ref = useRef(null);
  useEffect(() => {
    const on = () => {
      const h = document.documentElement;
      const p = h.scrollTop / (h.scrollHeight - h.clientHeight);
      if (ref.current) ref.current.style.transform = `scaleX(${p})`;
    };
    on();
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  return <div className="progress"><span ref={ref}></span></div>;
}

/* ─────────── Reveal observer ─────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-line');
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in'); });
    }, { threshold: 0.12 });
    els.forEach(el => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ─────────── App ─────────── */
function App() {
  const t = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];
  const tweaks = t[0]; const setTweak = t[1];

  // conteúdo editável pelo painel (admin/): db.json no servidor, localStorage como fallback
  const [data, setData] = useState({ projetos: PROJECTS, servicos: SERVICES });
  useEffect(() => {
    (async () => {
      let db = null;
      try { const r = await fetch('data/db.json', { cache: 'no-store' }); if (r.ok) db = await r.json(); } catch (e) {}
      try {
        const local = JSON.parse(localStorage.getItem('lca_db'));
        if (local && (!db || (local.salvoEm || '') > (db.salvoEm || ''))) db = local;
      } catch (e) {}
      if (db) setData({
        projetos: (db.projetos && db.projetos.length) ? db.projetos : PROJECTS,
        servicos: (db.servicos && db.servicos.length) ? db.servicos : SERVICES,
      });
    })();
  }, []);

  const [bg, ink, accent] = tweaks.palette || TWEAK_DEFAULTS.palette;
  const dark = tweaks.darkMode;
  const finalBg = dark ? ink : bg;
  const finalInk = dark ? bg : ink;
  const finalPaper = dark ? '#2b2319' : '#ebe2d2';
  const muted = dark ? '#a39684' : '#8a7d68';

  const cursorHover = useRef(null);
  const cursorApi = useMemo(() => ({
    set: (b) => {
      const el = document.getElementById('cursor');
      if (el) el.classList.toggle('hover', b);
    }
  }), []);

  useScrollReveal();

  // re-trigger reveals on tweak/data change
  useEffect(() => {
    const els = document.querySelectorAll('.reveal, .reveal-line');
    els.forEach(el => el.classList.add('in'));
  }, [tweaks.palette, tweaks.serif, data]);

  return (
    <div style={{
      '--bg': finalBg,
      '--paper': finalPaper,
      '--ink': finalInk,
      '--ink-soft': dark ? '#ddd2bf' : '#5c4f3e',
      '--muted': muted,
      '--line': dark ? '#f3ecdf1a' : '#3a2f2417',
      '--accent': accent,
      '--serif': `'${tweaks.serif}', Georgia, serif`,
      background: 'var(--bg)',
      color: 'var(--ink)',
      minHeight: '100vh',
    }}>
      <Progress />
      <Cursor enabled={tweaks.showCursor} />
      <Nav accent={accent} />
      <Hero />
      <Marquee />
      <Work cursor={cursorApi} projects={data.projetos} />
      <Services services={data.servicos} />
      <Contact cursor={cursorApi} />
      <Footer />

      {/* Tweaks */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection label="Aparência">
            <window.TweakColor
              label="Paleta"
              value={tweaks.palette}
              onChange={(v) => setTweak('palette', v)}
              options={PALETTES}
            />
            <window.TweakRadio
              label="Serifa"
              value={tweaks.serif}
              onChange={(v) => setTweak('serif', v)}
              options={SERIFS.map(s => ({ value: s, label: s.split(' ')[0] }))}
            />
            <window.TweakToggle
              label="Modo escuro"
              value={tweaks.darkMode}
              onChange={(v) => setTweak('darkMode', v)}
            />
            <window.TweakToggle
              label="Cursor custom"
              value={tweaks.showCursor}
              onChange={(v) => setTweak('showCursor', v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
