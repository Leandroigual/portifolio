/* eslint-disable */
// Stylized in-browser mockups used as project previews — warm farmhouse vibe.

const previewStyles = {
  wrap: {
    width: '100%', height: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    background: '#fff',
    boxShadow: '0 30px 80px -20px rgba(58,47,36,.4), 0 4px 12px rgba(58,47,36,.14)',
    display: 'flex', flexDirection: 'column',
    fontFamily: 'var(--sans)',
  },
  chrome: {
    height: 22, background: '#ece4d4', borderBottom: '1px solid #00000010',
    display: 'flex', alignItems: 'center', gap: 5, padding: '0 9px', flexShrink: 0,
  },
  dot: { width: 7, height: 7, borderRadius: '50%' },
  url: {
    marginLeft: 10, fontFamily: 'var(--mono)', fontSize: 9, color: '#6b5f4d',
    background: '#fff', padding: '2px 10px', borderRadius: 999, flex: 1, textAlign: 'center',
    maxWidth: 220,
  },
  body: { flex: 1, position: 'relative', overflow: 'hidden' },
};

function ChromeShell({ url, children, bg = '#fff' }) {
  return (
    <div style={previewStyles.wrap}>
      <div style={previewStyles.chrome}>
        <span style={{ ...previewStyles.dot, background: '#d99a6c' }}></span>
        <span style={{ ...previewStyles.dot, background: '#c7b27a' }}></span>
        <span style={{ ...previewStyles.dot, background: '#8a9a6b' }}></span>
        <span style={previewStyles.url}>{url}</span>
      </div>
      <div style={{ ...previewStyles.body, background: bg }}>{children}</div>
    </div>
  );
}

/* ─────────── 01 · Recanto da Serra — fazenda boutique ─────────── */
function PreviewVilaMaritima() {
  return (
    <ChromeShell url="recantodaserra.com.br" bg="#e9e2d2">
      {/* golden-hour countryside */}
      <div style={{
        position: 'absolute', inset: 0,
        background:
          'linear-gradient(180deg, #f3e4c4 0%, #e7d8b4 38%, #cdd4ac 60%, #9caa7e 100%)',
      }}>
        {/* sun glow */}
        <div style={{ position: 'absolute', left: '72%', top: '22%', width: 54, height: 54, borderRadius: '50%', background: 'radial-gradient(circle, #fbeccb 0%, #f3d89c66 55%, transparent 72%)' }}></div>
        {/* tree line */}
        <div style={{ position: 'absolute', left: 0, right: 0, top: '52%', height: 30, background: 'radial-gradient(60% 100% at 20% 100%, #6e7e57 0%, transparent 70%), radial-gradient(50% 100% at 55% 100%, #5d6e49 0%, transparent 70%), radial-gradient(60% 100% at 88% 100%, #6e7e57 0%, transparent 70%)' }}></div>
        {/* white farmhouse */}
        <svg viewBox="0 0 200 120" style={{ position: 'absolute', left: '50%', top: '46%', width: 120, transform: 'translateX(-50%)' }}>
          <polygon points="40,60 100,28 160,60" fill="#7a6a52"/>
          <rect x="52" y="58" width="96" height="46" fill="#f3ecdf"/>
          <rect x="62" y="68" width="16" height="16" fill="#8a9a6b"/>
          <rect x="122" y="68" width="16" height="16" fill="#8a9a6b"/>
          <rect x="92" y="74" width="16" height="30" fill="#9c7a4f"/>
        </svg>
      </div>
      {/* nav */}
      <div style={{ position: 'absolute', top: 14, left: 18, right: 18, display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#43352260', fontSize: 9 }}>
        <span style={{ fontFamily: 'var(--serif)', fontSize: 15, fontStyle: 'italic', color: '#433522' }}>Recanto da Serra</span>
        <span style={{ display: 'flex', gap: 12, color: '#5c4f3e' }}>
          <span>Imóveis</span><span>Sobre</span><span>Visita</span>
        </span>
      </div>
      {/* headline */}
      <div style={{ position: 'absolute', left: 22, bottom: 58, color: '#433522' }}>
        <div style={{ fontFamily: 'var(--mono)', fontSize: 8, opacity: .7, letterSpacing: '.18em', marginBottom: 8 }}>CAMPOS DO JORDÃO · SERRA</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 34, lineHeight: .95, letterSpacing: '-.01em', fontStyle: 'italic' }}>Devagar,<br/>perto da terra.</div>
      </div>
      {/* listings strip */}
      <div style={{ position: 'absolute', bottom: 14, left: 22, right: 22, display: 'flex', gap: 8 }}>
        {['#c9b48a', '#9aa97c', '#b98e63'].map((c, i) => (
          <div key={i} style={{ flex: 1, height: 32, borderRadius: 5, background: c, position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: 3, left: 5, fontFamily: 'var(--mono)', fontSize: 6, color: '#fff', opacity: .9 }}>R$ {[2.4, 1.8, 3.2][i]}M</div>
          </div>
        ))}
      </div>
    </ChromeShell>
  );
}

/* ─────────── 02 · Norte Casas — cottage listing ─────────── */
function PreviewNorteCasas() {
  return (
    <ChromeShell url="nortecasas.com.br" bg="#f1e8da">
      <div style={{ position: 'absolute', inset: 0, display: 'flex' }}>
        <div style={{ flex: 1, padding: '22px 18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '.2em', color: '#9c6b4a' }}>NORTE · 002</div>
            <div style={{ fontFamily: 'var(--serif)', fontSize: 28, lineHeight: 1.0, marginTop: 32, color: '#433425', fontStyle: 'italic' }}>
              Casas que<br/>contam<br/>histórias.
            </div>
          </div>
          <div style={{ display: 'flex', gap: 16, fontSize: 8, fontFamily: 'var(--mono)', color: '#9c6b4a', letterSpacing: '.1em' }}>
            <span>↓ EXPLORAR</span>
            <span style={{ marginLeft: 'auto', color: '#8a7d68' }}>2024</span>
          </div>
        </div>
        <div style={{ flex: 1.1, position: 'relative', background: 'linear-gradient(165deg, #cdb389 0%, #9c7a4f 50%, #6b5436 100%)' }}>
          <svg viewBox="0 0 120 100" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
            {/* cottage with porch */}
            <polygon points="20,52 60,30 100,52" fill="#3a2916" opacity=".55"/>
            <rect x="26" y="50" width="68" height="40" fill="#2b1d10" opacity=".5"/>
            <rect x="36" y="60" width="12" height="12" fill="#e9d7ad" opacity=".8"/>
            <rect x="72" y="60" width="12" height="12" fill="#e9d7ad" opacity=".8"/>
            <rect x="55" y="66" width="11" height="24" fill="#e9d7ad" opacity=".85"/>
          </svg>
          <div style={{ position: 'absolute', top: 12, right: 14, fontSize: 8, color: '#fff', fontFamily: 'var(--mono)', letterSpacing: '.18em', opacity: .9 }}>BAIRRO JARDIM</div>
        </div>
      </div>
    </ChromeShell>
  );
}

/* ─────────── 03 · Atelier de Sites — Templates premium ─────────── */
function PreviewAtelier() {
  return (
    <ChromeShell url="atelierdesites.com" bg="#2b2319">
      <div style={{ position: 'absolute', inset: 0, padding: '20px 18px', color: '#efe6d6' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontFamily: 'var(--serif)', fontSize: 16, fontStyle: 'italic' }}>atelier</span>
          <span style={{ fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '.2em', opacity: .7 }}>12 TEMPLATES</span>
        </div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 30, lineHeight: .95, marginTop: 24, letterSpacing: '-.01em', fontStyle: 'italic' }}>
          Templates de site<br/><span style={{ color: '#c79a5c' }}>com alma.</span>
        </div>
        <div style={{ position: 'absolute', left: 18, right: 18, bottom: 16, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {[
            { c1: '#e7d6b6', c2: '#a9763f', name: 'CIRA' },
            { c1: '#9aa97c', c2: '#566044', name: 'CAMPO' },
            { c1: '#c79a5c', c2: '#7a5a30', name: 'BRASA' },
          ].map((p, i) => (
            <div key={i} style={{ aspectRatio: '4/3', borderRadius: 4, background: `linear-gradient(135deg, ${p.c1} 0%, ${p.c2} 100%)`, position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 4, left: 5, fontFamily: 'var(--mono)', fontSize: 5, color: '#fff', opacity: .85, letterSpacing: '.15em' }}>{p.name}</div>
              <div style={{ position: 'absolute', bottom: 3, right: 5, fontFamily: 'var(--mono)', fontSize: 5, color: '#fff', opacity: .85 }}>R$ 480</div>
            </div>
          ))}
        </div>
      </div>
    </ChromeShell>
  );
}

/* ─────────── 04 · Folha & Forma — estúdio ─────────── */
function PreviewFolhaForma() {
  return (
    <ChromeShell url="folhaeforma.studio" bg="#eef0e6">
      <div style={{ position: 'absolute', inset: 0, padding: '18px 20px', color: '#2f3a2a' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontFamily: 'var(--mono)', fontSize: 8, letterSpacing: '.18em', color: '#566044' }}>
          <span>F &amp; F</span>
          <span>EST. 2021 · SP</span>
        </div>
        <div style={{ position: 'absolute', top: 36, right: 18, fontFamily: 'var(--serif)', fontSize: 82, lineHeight: 1, color: '#7c8a63', opacity: .9, fontStyle: 'italic' }}>04</div>
        <div style={{ fontFamily: 'var(--serif)', fontSize: 24, lineHeight: 1.05, marginTop: 26, maxWidth: '70%', fontStyle: 'italic' }}>
          Um estúdio de design pequeno,<br/>de pé sobre as palavras.
        </div>
        <div style={{ position: 'absolute', bottom: 14, left: 20, right: 20, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          {[0,1,2].map(c => (
            <div key={c}>
              {Array.from({length: 6}).map((_,i) => (
                <div key={i} style={{ height: 2, background: '#2f3a2a26', marginBottom: 3, width: `${75 + (i*7) % 25}%` }}></div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </ChromeShell>
  );
}

window.Previews = {
  vilamaritima: PreviewVilaMaritima,
  nortecasas: PreviewNorteCasas,
  atelier: PreviewAtelier,
  folhaforma: PreviewFolhaForma,
};
