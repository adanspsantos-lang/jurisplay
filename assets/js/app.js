/* JURISPLAY · aplicação (JavaScript puro, rotas por hash) */
(function () {
  'use strict';
  const D = window.JP_DATA;
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = (s) => String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- ícones ---------- */
  const P = {
    home: '<path d="m3 10 9-7 9 7v10a2 2 0 0 1-2 2h-4v-7H9v7H5a2 2 0 0 1-2-2z"/>',
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
    bookmark: '<path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M20 21a8 8 0 0 0-16 0"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>',
    search: '<circle cx="11" cy="11" r="7.5"/><path d="m20.5 20.5-4.2-4.2"/>',
    bell: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/>',
    play: '<path d="M7 4.5v15l12.5-7.5z" fill="currentColor" stroke="none"/>',
    pause: '<rect x="6" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none"/><rect x="14" y="4.5" width="4" height="15" rx="1" fill="currentColor" stroke="none"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M20 6 9 17l-5-5"/>',
    thumb: '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/>',
    chevL: '<path d="m15 18-6-6 6-6"/>',
    chevR: '<path d="m9 18 6-6-6-6"/>',
    arrowR: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    arrowL: '<path d="M19 12H5M11 18l-6-6 6-6"/>',
    x: '<path d="M18 6 6 18M6 6l12 12"/>',
    vol: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="M15.5 8.5a5 5 0 0 1 0 7"/><path d="M19 5a10 10 0 0 1 0 14"/>',
    mute: '<path d="M11 5 6 9H2v6h4l5 4z"/><path d="m22 9-6 6M16 9l6 6"/>',
    full: '<path d="M8 3H5a2 2 0 0 0-2 2v3M21 8V5a2 2 0 0 0-2-2h-3M16 21h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"/>',
    next: '<path d="m5 4 10 8-10 8z" fill="currentColor"/><path d="M19 5v14"/>',
    back10: '<path d="M3 12a9 9 0 1 0 3-6.7L3 8"/><path d="M3 3v5h5"/><text x="12" y="15.5" font-size="7" text-anchor="middle" fill="currentColor" stroke="none" font-family="Roboto,sans-serif" font-weight="700">10</text>',
    fwd10: '<path d="M21 12a9 9 0 1 1-3-6.7L21 8"/><path d="M21 3v5h-5"/><text x="12" y="15.5" font-size="7" text-anchor="middle" fill="currentColor" stroke="none" font-family="Roboto,sans-serif" font-weight="700">10</text>',
    cc: '<rect x="2" y="5" width="20" height="14" rx="2.5"/><path d="M10 10.5a2 2 0 1 0 0 3M17 10.5a2 2 0 1 0 0 3"/>',
    list: '<path d="M3 6h18M3 12h18M3 18h12"/>',
    share: '<path d="M4 12v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7"/><path d="m16 6-4-4-4 4"/><path d="M12 2v13"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    logout: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5"/><path d="M21 12H9"/>',
    info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
    film: '<rect x="2" y="3" width="20" height="18" rx="2"/><path d="M7 3v18M17 3v18M2 12h20M2 7.5h5M2 16.5h5M17 7.5h5M17 16.5h5"/>',
    gavel: '<path d="m14 13-7.5 7.5a2.12 2.12 0 0 1-3-3L11 10"/><path d="m16 16 6-6"/><path d="m8 8 6-6"/><path d="m9 7 8 8"/><path d="m21 11-8-8"/>',
    star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
    flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
    book: '<path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/>',
    clock: '<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>',
    trash: '<path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/>',
    trophy: '<path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6M18 9h1.5a2.5 2.5 0 0 0 0-5H18M4 22h16M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22M18 2H6v7a6 6 0 0 0 12 0V2Z"/>',
    sparkle: '<path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8M5.6 18.4l2.8-2.8M15.6 8.4l2.8-2.8"/>'
  };
  const ic = (n, cls) => `<svg class="i ${cls || ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n] || ''}</svg>`;

  /* ---------- armazenamento local ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem('jp.' + k); return v == null ? d : JSON.parse(v); } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem('jp.' + k, JSON.stringify(v)); } catch (e) { /* armazenamento indisponível */ } }
  };
  const S = {
    list: store.get('list', []),
    likes: store.get('likes', []),
    notify: store.get('notify', []),
    progress: store.get('progress', {}),
    quiz: store.get('quiz', {}),
    read: store.get('read', []),
    extra: store.get('extra', []),
    user: store.get('user', null),
    settings: Object.assign({ autoplayNext: true, heroAuto: true, subtitles: true, scriptBig: false, previews: true }, store.get('settings', {}))
  };
  const save = (k) => store.set(k, S[k]);

  /* ---------- dados ---------- */
  const EP = {}; D.episodes.forEach((e) => { EP[e.id] = e; });
  const seasonOf = (n) => D.seasons.find((s) => s.n === Number(n));
  const epsOf = (n) => D.episodes.filter((e) => e.s === Number(n)).sort((a, b) => a.n - b.n);
  const code = (e) => `T${e.s}<b>•</b>E${e.n}`;
  const codeTxt = (e) => `T${e.s}:E${e.n}`;
  const hasScript = (e) => !!(e.scenes && e.scenes.length);
  const nextEp = (e) => { const l = epsOf(e.s); const i = l.findIndex((x) => x.id === e.id); return l[i + 1] || epsOf(e.s + 1)[0] || null; };
  const inList = (id) => S.list.includes(id);
  const pct = (id) => { const p = S.progress[id]; return p && p.d ? Math.min(100, Math.round((p.t / p.d) * 100)) : 0; };
  const fmt = (s) => { s = Math.max(0, Math.floor(s || 0)); const m = Math.floor(s / 60), r = s % 60; return `${m}:${String(r).padStart(2, '0')}`; };

  /* ---------- toast ---------- */
  let toastT;
  function toast(msg, icon) {
    const t = $('#toast'); t.innerHTML = ic(icon || 'check') + '<span>' + esc(msg) + '</span>';
    t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2600);
  }

  /* ---------- ações compartilhadas ---------- */
  function toggleList(id) {
    const e = EP[id]; if (!e) return;
    if (inList(id)) { S.list = S.list.filter((x) => x !== id); toast('Removido da Minha Lista', 'bookmark'); }
    else { S.list.unshift(id); toast(`"${e.title}" adicionado à Minha Lista`, 'bookmark'); }
    save('list'); syncButtons(id); updateNavCounts();
    if (currentRoute().r === 'lista') renderView();
  }
  function toggleLike(id) {
    if (S.likes.includes(id)) S.likes = S.likes.filter((x) => x !== id);
    else { S.likes.push(id); toast('Obrigado pela avaliação', 'thumb'); }
    save('likes'); syncButtons(id);
  }
  function toggleNotify(id) {
    const e = EP[id];
    if (S.notify.includes(id)) { S.notify = S.notify.filter((x) => x !== id); toast('Aviso de estreia desativado', 'bell'); }
    else {
      S.notify.push(id);
      S.extra.unshift({ id: 'x' + Date.now(), t: 'Aviso de estreia ativado', d: `Você será avisado quando "${e.title}" (${codeTxt(e)}) estrear.`, href: '#/ep/' + id, when: 'Agora' });
      save('extra'); toast('Pronto! Avisaremos quando o vídeo estrear', 'bell'); renderBell();
    }
    save('notify'); syncButtons(id);
  }
  function syncButtons(id) {
    $$(`[data-list="${id}"]`).forEach((b) => { const on = inList(id); b.classList.toggle('on', on); b.innerHTML = ic(on ? 'check' : 'plus') + (b.dataset.label ? `<span>${on ? 'Na Minha Lista' : 'Minha Lista'}</span>` : ''); b.setAttribute('aria-label', on ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista'); });
    $$(`[data-like="${id}"]`).forEach((b) => b.classList.toggle('on', S.likes.includes(id)));
    $$(`[data-notify="${id}"]`).forEach((b) => { const on = S.notify.includes(id); b.classList.toggle('on', on); b.innerHTML = ic('bell') + `<span>${on ? 'Aviso ativado' : 'Avise-me na estreia'}</span>`; });
  }
  function touch(id) {
    const p = S.progress[id] || { t: 0, d: (EP[id].dur || 18) * 60 };
    p.ts = Date.now(); S.progress[id] = p; save('progress');
  }

  /* ---------- componentes ---------- */
  function seasonCard(s) {
    const n = epsOf(s.n).length;
    return `<a class="s-card" href="#/temporada/${s.n}" aria-label="Temporada ${s.n}: ${esc(s.name)}">
      <img src="${s.img}" alt="" loading="lazy">
      ${s.status === 'breve' ? '<span class="pill orange">Em breve</span>' : `<span class="pill">${n} episódios</span>`}
      <div class="s-body"><div class="k">Temporada ${s.n}</div><h3>${esc(s.name)}</h3><div class="r">${esc(s.range)}</div></div>
      <span class="go">${ic('chevR')}</span></a>`;
  }
  function epCard(e, opts) {
    opts = opts || {};
    const p = pct(e.id);
    return `<article class="e-card" data-open="${e.id}" tabindex="0" aria-label="${codeTxt(e)}, Art. ${e.id}, ${esc(e.crime)}: ${esc(e.title)}">
      <div class="e-thumb"><img src="${e.img}" alt="" loading="lazy"><span class="art">ART. ${e.id}</span>
        <button class="quick ${inList(e.id) ? 'on' : ''}" data-list="${e.id}" aria-label="${inList(e.id) ? 'Remover da Minha Lista' : 'Adicionar à Minha Lista'}">${ic(inList(e.id) ? 'check' : 'plus')}</button></div>
      <div class="e-body">
        <div class="e-row"><span class="e-code">${code(e)}</span><span style="display:flex;gap:6px;align-items:center"><span class="dur">${e.dur} min</span><button class="e-play" data-play="${e.id}" aria-label="Assistir ${esc(e.title)}">${ic('play')}</button></span></div>
        <div class="e-title">${esc(e.crime)}</div>
        <div class="e-sub"><em>“${esc(e.title)}”</em> · ${esc(e.tag)}</div>
        ${opts.badges ? `<div class="e-badges">${hasScript(e) ? '<span class="tag o">Roteiro completo</span>' : '<span class="tag">Roteiro em produção</span>'}${e.updated ? '<span class="tag o">Lei 15.397/2026</span>' : ''}</div>` : ''}
        ${p > 0 ? `<div class="prog" aria-label="${p}% assistido"><i style="width:${p}%"></i></div>` : ''}
      </div></article>`;
  }
  function rail(title, items, o) {
    o = o || {};
    return `<section class="rail"${o.id ? ` id="${o.id}"` : ''}><div class="rail-head"><h2>${title}</h2>${o.more ? `<a class="more" href="${o.more}">${o.moreLabel || 'Ver todas'} ${ic('arrowR')}</a>` : ''}</div>
      <div class="rail-wrap"><button class="rail-btn prev off" aria-label="Voltar">${ic('chevL')}</button><div class="track ${o.cls || 'eps'}">${items}</div><button class="rail-btn next" aria-label="Avançar">${ic('chevR')}</button></div></section>`;
  }
  function castCard(c) { return `<div class="cast-card"><div class="mono">${c.i}</div><div><h4>${esc(c.n)}</h4><div class="r">${esc(c.r)}</div><p>${esc(c.d)}</p></div></div>`; }
  function footer() {
    return `<footer class="foot"><span class="brand-name">JURIS<span>PLAY</span></span>
      <nav><button data-page="sobre">Sobre</button><button data-page="termos">Termos de uso</button><button data-page="privacidade">Privacidade</button><button data-page="contato">Contato</button></nav>
      <p>© 2026 JURISPLAY · O Direito em Série. Casos e personagens fictícios, com finalidade educativa. O conteúdo não substitui a orientação de um advogado. Penas conferidas em ${esc(D.reviewed)}.</p></footer>`;
  }
  function bindRails(root) {
    $$('.rail-wrap', root).forEach((w) => {
      const tr = $('.track', w), pv = $('.prev', w), nx = $('.next', w);
      const upd = () => { pv.classList.toggle('off', tr.scrollLeft < 8); nx.classList.toggle('off', tr.scrollLeft + tr.clientWidth >= tr.scrollWidth - 8); };
      pv.onclick = () => tr.scrollBy({ left: -tr.clientWidth * 0.85, behavior: 'smooth' });
      nx.onclick = () => tr.scrollBy({ left: tr.clientWidth * 0.85, behavior: 'smooth' });
      tr.addEventListener('scroll', upd, { passive: true }); requestAnimationFrame(upd);
    });
  }

  /* ---------- navegação ---------- */
  const NAV = [
    { r: 'inicio', label: 'Início', icon: 'home' },
    { r: 'catalogo', label: 'Catálogo', icon: 'grid' },
    { r: 'lista', label: 'Minhas Listas', icon: 'bookmark', count: true },
    { r: 'perfil', label: 'Perfil', icon: 'user' },
    { r: 'config', label: 'Configurações', icon: 'settings' }
  ];
  function renderNav() {
    $('#nav').innerHTML = NAV.map((n) => `<a href="#/${n.r}" data-r="${n.r}">${ic(n.icon)}<span>${n.label}</span>${n.count ? '<span class="count" data-count></span>' : ''}</a>`).join('');
    $('#bottomnav').innerHTML = [
      ['inicio', 'Início', 'home'], ['catalogo', 'Catálogo', 'grid'], ['busca', 'Buscar', 'search'], ['lista', 'Minha Lista', 'bookmark'], ['perfil', 'Perfil', 'user']
    ].map(([r, l, i]) => `<a href="#/${r}" data-r="${r}">${ic(i)}<span>${l}</span></a>`).join('');
    updateNavCounts();
  }
  function updateNavCounts() { $$('[data-count]').forEach((c) => { c.textContent = S.list.length || ''; }); }
  function setActive(r) {
    const map = { temporada: 'catalogo', busca: 'catalogo', planos: '' };
    const k = map[r] !== undefined ? map[r] : r;
    $$('#nav a, #bottomnav a').forEach((a) => a.classList.toggle('active', a.dataset.r === k || (a.dataset.r === 'busca' && r === 'busca')));
  }

  /* ---------- rotas ---------- */
  const stack = [];
  function currentRoute() {
    const h = location.hash.replace(/^#\/?/, '');
    const parts = h.split('/').map((p) => { try { return decodeURIComponent(p); } catch (e) { return p; } });
    return { r: parts[0] || 'inicio', p: parts.slice(1) };
  }
  let baseHash = null, replacing = false;
  function go(h) { replacing = true; location.replace(h); }
  function onRoute() {
    const h = location.hash || '#/inicio';
    if (replacing) { replacing = false; if (stack.length) stack[stack.length - 1] = h; else stack.push(h); }
    else if (stack.length > 1 && stack[stack.length - 2] === h) stack.pop(); else stack.push(h);
    const { r, p } = currentRoute();
    closePops(); document.body.classList.remove('nav-open');
    if (r === 'assistir') { openPlayer(p[0]); return; }
    closePlayer();
    if (r === 'ep') {
      if (!baseHash) { baseHash = '#/inicio'; renderView(baseHash); }
      openModal(p[0], p[1]); return;
    }
    closeModal(true);
    if (baseHash !== h) { baseHash = h; renderView(h); }
  }
  function goBack(fallback) {
    if (stack.length > 1) history.back();
    else go(fallback || '#/inicio');
  }

  let heroTimer = null;
  function renderView(hash) {
    const h = hash || baseHash || '#/inicio';
    const parts = h.replace(/^#\/?/, '').split('/').map((x) => { try { return decodeURIComponent(x); } catch (e) { return x; } });
    const r = parts[0] || 'inicio', p = parts.slice(1);
    clearInterval(heroTimer);
    const V = $('#view');
    const views = { inicio: viewHome, catalogo: viewCatalog, temporada: viewSeason, lista: viewList, perfil: viewProfile, config: viewSettings, busca: viewSearch, planos: viewPlans };
    const fn = views[r] || viewHome;
    V.innerHTML = fn(p) + footer();
    setActive(r);
    bindRails(V);
    if (r === 'inicio') bindHero();
    if (r === 'catalogo') bindCatalog();
    if (r === 'config') bindSettings();
    if (r === 'perfil') bindProfile();
    if (r === 'busca') { const q = p.join('/'); if ($('#q').value !== q) $('#q').value = q; $('#qclear').hidden = !q; if (!q && window.innerWidth <= 760) { $('#topbar').classList.add('searching'); $('#q').focus(); } }
    if (!(r === 'busca' && document.activeElement === $('#q'))) window.scrollTo(0, 0);
  }

  /* ---------- Início ---------- */
  function viewHome() {
    const slides = D.hero.map((s, i) => `<div class="slide${i === 0 ? ' on' : ''}" data-i="${i}" aria-hidden="${i !== 0}">
      <div class="slide-media"><img src="${s.img}" alt="" ${i ? 'loading="lazy"' : 'fetchpriority="high"'}></div>
      <div class="slide-side">${s.side}</div>
      <div class="slide-body"><div class="kicker">${esc(s.kicker)}</div>
        <h1 class="slide-title${(s.t1 + s.t2).length > 16 ? ' long' : ''}">${esc(s.t1)} <em>${esc(s.t2)}</em></h1>
        <div class="slide-sub${s.sub.length > 12 ? ' small' : ''}">${esc(s.sub)}</div>
        <p class="slide-desc">${esc(s.desc)}</p>
        <div class="slide-actions"><a class="btn btn-primary" href="#/assistir/${s.play}">${ic('play')}Assistir agora</a><a class="btn btn-ghost" href="${s.info}">Mais informações</a></div>
      </div></div>`).join('');
    const hero = `<section class="hero" id="hero" aria-roledescription="carrossel" aria-label="Destaques">${slides}
      <button class="hero-arrow prev" data-h="-1" aria-label="Destaque anterior">${ic('chevL')}</button><button class="hero-arrow next" data-h="1" aria-label="Próximo destaque">${ic('chevR')}</button>
      <div class="dots" role="tablist">${D.hero.map((_, i) => `<button role="tab" aria-label="Destaque ${i + 1}" class="${i === 0 ? 'on' : ''}" data-dot="${i}"></button>`).join('')}</div></section>`;

    const recent = Object.entries(S.progress).sort((a, b) => (b[1].ts || 0) - (a[1].ts || 0)).map(([id]) => EP[id]).filter(Boolean).slice(0, 12);
    const top = D.trending.map((id, i) => `<div class="top-card" data-open="${id}"><span class="top-num" aria-hidden="true">${i + 1}</span>${epCard(EP[id])}</div>`).join('');
    const upd = D.episodes.filter((e) => e.updated);
    let html = hero;
    html += rail('Temporadas', D.seasons.map(seasonCard).join(''), { more: '#/catalogo', cls: 'seasons' });
    html += rail('Episódios em destaque', D.featured.map((id) => epCard(EP[id])).join(''), { more: '#/catalogo' });
    if (recent.length) html += rail('Continue assistindo', recent.map((e) => epCard(e)).join(''), { more: '#/perfil', moreLabel: 'Meu histórico' });
    html += rail('Em alta na JURISPLAY', top, { cls: 'wide' });
    D.seasons.filter((s) => s.status !== 'breve').forEach((s) => {
      html += rail(`Temporada ${s.n} <small>${esc(s.name)} · ${esc(s.range)}</small>`, epsOf(s.n).map((e) => epCard(e)).join(''), { more: '#/temporada/' + s.n, moreLabel: 'Ver temporada' });
    });
    html += rail('Atualizados pela Lei 15.397/2026', upd.map((e) => epCard(e)).join(''), { more: '#/catalogo/atualizados' });
    if (S.list.length) html += rail('Minha Lista', S.list.map((id) => EP[id]).filter(Boolean).map((e) => epCard(e)).join(''), { more: '#/lista' });
    html += rail('Elenco fixo da série', D.cast.map(castCard).join(''), { cls: 'wide' });
    return html;
  }
  function bindHero() {
    const hero = $('#hero'); if (!hero) return;
    const slides = $$('.slide', hero), dots = $$('[data-dot]', hero);
    let cur = 0;
    const show = (i) => {
      cur = (i + slides.length) % slides.length;
      slides.forEach((s, k) => { s.classList.toggle('on', k === cur); s.setAttribute('aria-hidden', k !== cur); });
      dots.forEach((d, k) => d.classList.toggle('on', k === cur));
    };
    const start = () => { clearInterval(heroTimer); if (S.settings.heroAuto && !reduceMotion) heroTimer = setInterval(() => show(cur + 1), 7000); };
    dots.forEach((d) => d.onclick = () => { show(+d.dataset.dot); start(); });
    $$('[data-h]', hero).forEach((b) => b.onclick = () => { show(cur + +b.dataset.h); start(); });
    hero.onmouseenter = () => clearInterval(heroTimer);
    hero.onmouseleave = start;
    let x0 = null;
    hero.addEventListener('touchstart', (e) => { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener('touchend', (e) => { if (x0 == null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) { show(cur + (dx < 0 ? 1 : -1)); start(); } x0 = null; });
    start();
  }

  /* ---------- Catálogo ---------- */
  const cat = { s: 'all', sort: 'ordem', script: false };
  function viewCatalog(p) {
    cat.s = p[0] === 'atualizados' ? 'upd' : (/^\d$/.test(p[0] || '') ? p[0] : 'all');
    return `<div class="page"><div class="page-head"><div><div class="kicker">Catálogo</div><h1>Todos os episódios</h1><p>${D.episodes.length} episódios em ${D.seasons.filter((s) => s.status !== 'breve').length} temporadas, organizados pelos títulos do Código Penal.</p></div></div>
      <div class="chips" id="catChips">
        <button class="chip" data-s="all">Todas</button>
        ${D.seasons.filter((s) => s.status !== 'breve').map((s) => `<button class="chip" data-s="${s.n}">T${s.n} · ${esc(s.name.replace('Dos Crimes contra ', '').replace(/^a |^o /, ''))}</button>`).join('')}
        <button class="chip" data-s="upd">Lei 15.397/2026</button>
        <span class="spacer"></span>
        <label class="chip" style="display:inline-flex;align-items:center;gap:8px;cursor:pointer"><input type="checkbox" id="catScript" style="accent-color:var(--orange)"> Só roteiros completos</label>
        <label class="sr" for="catSort">Ordenar</label>
        <select class="select" id="catSort"><option value="ordem">Ordem das temporadas</option><option value="art">Número do artigo</option><option value="az">Crime de A a Z</option></select>
      </div>
      <div class="count-line" id="catCount"></div>
      <div class="grid" id="catGrid"></div>
      <h2 style="margin:40px 0 16px;font-weight:500;font-size:22px">Temporadas</h2>
      <div class="grid seasons">${D.seasons.map(seasonCard).join('')}</div></div>`;
  }
  function artNum(id) { const m = String(id).match(/\d+/); return m ? +m[0] : 0; }
  function bindCatalog() {
    const draw = () => {
      let l = D.episodes.slice();
      if (cat.s === 'upd') l = l.filter((e) => e.updated);
      else if (cat.s !== 'all') l = l.filter((e) => e.s === +cat.s);
      if (cat.script) l = l.filter(hasScript);
      if (cat.sort === 'art') l.sort((a, b) => artNum(a.id) - artNum(b.id));
      else if (cat.sort === 'az') l.sort((a, b) => a.crime.localeCompare(b.crime, 'pt'));
      else l.sort((a, b) => a.s - b.s || a.n - b.n);
      $$('#catChips [data-s]').forEach((c) => c.classList.toggle('on', c.dataset.s === String(cat.s)));
      $('#catCount').textContent = `${l.length} ${l.length === 1 ? 'episódio' : 'episódios'}`;
      $('#catGrid').innerHTML = l.length ? l.map((e) => epCard(e, { badges: true })).join('') : `<div class="empty" style="grid-column:1/-1">${ic('film')}<h3>Nenhum episódio com esses filtros</h3><p>Tente outra temporada ou desmarque "Só roteiros completos".</p></div>`;
    };
    $$('#catChips [data-s]').forEach((c) => c.onclick = () => { cat.s = c.dataset.s; draw(); });
    $('#catSort').value = cat.sort; $('#catSort').onchange = (e) => { cat.sort = e.target.value; draw(); };
    $('#catScript').checked = cat.script; $('#catScript').onchange = (e) => { cat.script = e.target.checked; draw(); };
    draw();
  }

  /* ---------- Temporada ---------- */
  function viewSeason(p) {
    const s = seasonOf(p[0]);
    if (!s) return viewNotFound();
    const l = epsOf(s.n);
    const first = l[0];
    const scripted = l.filter(hasScript).length;
    const others = D.seasons.filter((x) => x.n !== s.n);
    let list;
    if (s.status === 'breve') {
      list = `<div class="notice" style="margin-bottom:22px">${ic('clock')}<div><b>Temporada em produção</b><p>Os episódios abaixo estão sendo roteirizados. Volte em breve.</p></div></div>
        <div class="ep-list">${s.planned.map(([a, c], i) => `<div class="ep-row" style="cursor:default"><span class="num">${i + 1}</span><div class="th" style="background:var(--card-2);display:grid;place-items:center;font-family:var(--display);font-size:22px;color:var(--dim)">ART. ${a}</div><div><h4>${esc(c)} <small>Art. ${a}</small></h4><p>Roteiro em desenvolvimento.</p></div><span class="side">Em breve</span></div>`).join('')}</div>`;
    } else {
      list = `<div class="ep-list">${l.map((e) => `<div class="ep-row" data-open="${e.id}" tabindex="0" role="link" aria-label="${codeTxt(e)} ${esc(e.title)}">
        <span class="num">${e.n}</span>
        <div class="th"><img src="${e.img}" alt="" loading="lazy"><span class="pl"><span>${ic('play')}</span></span></div>
        <div><h4>${esc(e.crime)}: ${esc(e.title)} <small>Art. ${e.id}</small></h4><p>${esc(e.logline)}</p>${pct(e.id) ? `<div class="prog" style="max-width:240px"><i style="width:${pct(e.id)}%"></i></div>` : ''}</div>
        <span class="side">${e.dur} min</span></div>`).join('')}</div>`;
    }
    return `<section class="s-hero"><div class="bg" style="background-image:url(${s.img})"></div><img class="art-img" src="${s.img}" alt="">
      <div class="s-hero-body"><div class="kicker">Temporada ${s.n}</div><h1>${esc(s.name)}</h1>
        <div class="meta"><span>${esc(s.range)}</span><span class="sep"></span><span>${s.status === 'breve' ? 'Em produção' : `${l.length} episódios`}</span>${scripted ? `<span class="sep"></span><span>${scripted} com roteiro completo</span>` : ''}</div>
        <p>${esc(s.desc)}</p>
        ${first ? `<div class="slide-actions"><a class="btn btn-primary" href="#/assistir/${first.id}">${ic('play')}Assistir ${codeTxt(first)}</a><a class="btn btn-ghost" href="#/ep/${first.id}">Detalhes do episódio</a></div>` : ''}
      </div></section>
      <div class="page"><h2 style="margin:0 0 10px;font-weight:500;font-size:22px">Episódios</h2>${list}</div>
      ${rail('Outras temporadas', others.map(seasonCard).join(''), { cls: 'seasons' })}`;
  }

  /* ---------- Minha lista ---------- */
  function viewList() {
    const l = S.list.map((id) => EP[id]).filter(Boolean);
    return `<div class="page"><div class="page-head"><div><div class="kicker">Minhas Listas</div><h1>Minha Lista</h1><p>Episódios que você salvou para assistir ou revisar depois.</p></div>${l.length ? `<a class="btn btn-dark btn-sm" href="#/catalogo">${ic('plus')}Adicionar mais</a>` : ''}</div>
      ${l.length ? `<div class="grid">${l.map((e) => epCard(e, { badges: true })).join('')}</div>` : `<div class="empty">${ic('bookmark')}<h3>Sua lista está vazia</h3><p>Toque no + de qualquer episódio para salvá-lo aqui.</p><a class="btn btn-primary" href="#/catalogo">Explorar o catálogo</a></div>`}
      ${S.notify.length ? `<h2 style="margin:40px 0 16px;font-weight:500;font-size:22px">Avisos de estreia</h2><div class="grid">${S.notify.map((id) => EP[id]).filter(Boolean).map((e) => epCard(e)).join('')}</div>` : ''}</div>`;
  }

  /* ---------- Busca ---------- */
  function search(q) {
    const t = norm(q).trim(); if (!t) return [];
    const words = t.replace(/art\.?\s*/g, '').split(/\s+/).filter(Boolean);
    return D.episodes.map((e) => {
      const hay = norm([e.id, 'art ' + e.id, e.crime, e.title, e.tag, e.logline, seasonOf(e.s).name, (e.guests || []).map((g) => g.n).join(' '), e.verdict.tipo].join(' '));
      let score = 0;
      words.forEach((w) => { if (!hay.includes(w)) score -= 100; if (norm(e.crime).includes(w)) score += 6; if (norm(e.title).includes(w)) score += 5; if (e.id === w) score += 10; });
      return { e, score };
    }).filter((x) => x.score > 0).sort((a, b) => b.score - a.score).map((x) => x.e);
  }
  function viewSearch(p) {
    const q = p.join('/');
    const res = search(q);
    const sugg = ['Furto', 'Art. 171', 'Corrupção', 'Homicídio', 'Documento', 'Celular'];
    return `<div class="page"><div class="page-head"><div><div class="kicker">Busca</div><h1>${q ? `Resultados para “${esc(q)}”` : 'O que você procura?'}</h1>${q ? `<p>${res.length} ${res.length === 1 ? 'episódio encontrado' : 'episódios encontrados'}</p>` : '<p>Busque por crime, número do artigo, título do episódio ou personagem.</p>'}</div></div>
      ${res.length ? `<div class="grid">${res.map((e) => epCard(e, { badges: true })).join('')}</div>` :
      `${q ? `<div class="empty">${ic('search')}<h3>Nada encontrado para “${esc(q)}”</h3><p>Confira a grafia ou tente um destes temas:</p></div>` : ''}
       <div class="chips" style="margin-top:20px">${sugg.map((s) => `<a class="chip" style="display:inline-flex;align-items:center" href="#/busca/${encodeURIComponent(s)}">${esc(s)}</a>`).join('')}</div>`}</div>`;
  }

  /* ---------- Perfil ---------- */
  function stats() {
    const answered = Object.keys(S.quiz).length;
    const right = Object.values(S.quiz).filter(Boolean).length;
    return { started: Object.keys(S.progress).length, answered, right, list: S.list.length };
  }
  function viewProfile() {
    const u = S.user, st = stats();
    const ach = [
      ['gavel', 'Primeira sentença', 'Responda a sua primeira pergunta', st.answered >= 1],
      ['trophy', 'Juiz de primeira instância', 'Acerte 5 perguntas', st.right >= 5],
      ['star', 'Desembargador', 'Acerte 15 perguntas', st.right >= 15],
      ['film', 'Maratonista', 'Abra 5 episódios diferentes', st.started >= 5],
      ['bookmark', 'Colecionador', 'Salve 3 episódios na sua lista', st.list >= 3],
      ['flame', 'Temporada fechada', 'Responda todas as perguntas de uma temporada', D.seasons.some((s) => { const l = epsOf(s.n); return l.length && l.every((e) => e.id in S.quiz); })]
    ];
    const recent = Object.entries(S.progress).sort((a, b) => (b[1].ts || 0) - (a[1].ts || 0)).map(([id]) => EP[id]).filter(Boolean);
    return `<div class="page"><div class="page-head"><div><div class="kicker">Perfil</div><h1>Minha conta</h1></div></div>
      <div class="prof-head"><div class="prof-av ${u ? '' : 'guest'}">${u ? esc(u.name.charAt(0).toUpperCase()) : ic('user')}</div>
        <div><h2>${u ? esc(u.name) : 'Visitante'}</h2><p>${u ? esc(u.email) : 'Entre para guardar seu progresso em uma conta.'}</p></div>
        <div class="acts">${u ? `<button class="btn btn-dark btn-sm" data-act="logout">${ic('logout')}Sair</button>` : `<button class="btn btn-primary btn-sm" data-act="login">Entrar</button>`}<a class="btn btn-ghost btn-sm" href="#/planos">Ver planos</a></div></div>
      <div class="stats">
        <div class="stat"><b>${st.started}</b><span>Episódios abertos</span></div>
        <div class="stat"><b>${st.answered}</b><span>Perguntas respondidas</span></div>
        <div class="stat"><b>${st.answered ? Math.round((st.right / st.answered) * 100) : 0}%</b><span>Taxa de acerto</span></div>
        <div class="stat"><b>${st.list}</b><span>Na Minha Lista</span></div>
      </div>
      <div class="two">
        <div class="panel"><h3>Progresso no "Você é o juiz"</h3>
          ${D.seasons.filter((s) => s.status !== 'breve').map((s) => { const l = epsOf(s.n); const a = l.filter((e) => e.id in S.quiz).length; const r = l.filter((e) => S.quiz[e.id]).length; return `<div class="sp-row"><b style="font-weight:500">T${s.n} · ${esc(s.name)}</b><span>${a}/${l.length} · ${r} acertos</span><div class="bar"><i style="width:${l.length ? (a / l.length) * 100 : 0}%"></i></div></div>`; }).join('')}
          ${st.answered ? `<button class="btn btn-dark btn-sm" data-act="reset-quiz" style="margin-top:6px">${ic('trash')}Zerar respostas</button>` : `<a class="btn btn-primary btn-sm" href="#/ep/121/quiz">Responder a primeira pergunta</a>`}
        </div>
        <div class="panel"><h3>Conquistas</h3><div class="badges">${ach.map(([i, t, d, on]) => `<div class="ach ${on ? 'on' : ''}"><span class="ic">${ic(i)}</span><div><b>${t}</b><small>${on ? 'Conquistado' : d}</small></div></div>`).join('')}</div></div>
      </div></div>
      ${recent.length ? rail('Histórico', recent.map((e) => epCard(e)).join('')) : ''}`;
  }
  function bindProfile() {
    const b = $('[data-act="reset-quiz"]');
    if (b) b.onclick = () => {
      if (b.dataset.armed) { S.quiz = {}; save('quiz'); toast('Respostas zeradas'); renderView(); return; }
      b.dataset.armed = '1'; b.innerHTML = ic('trash') + 'Toque de novo para confirmar';
      setTimeout(() => { if (b.isConnected) { delete b.dataset.armed; b.innerHTML = ic('trash') + 'Zerar respostas'; } }, 4000);
    };
  }

  /* ---------- Configurações ---------- */
  function viewSettings() {
    const sw = (k, t, d) => `<div class="set"><div><b>${t}</b><p>${d}</p></div><label class="switch"><input type="checkbox" id="set-${k}" data-set="${k}" ${S.settings[k] ? 'checked' : ''} aria-label="${t}"><span></span></label></div>`;
    return `<div class="page"><div class="page-head"><div><div class="kicker">Configurações</div><h1>Preferências</h1><p>As preferências ficam salvas neste navegador.</p></div></div>
      <div class="set-list">
        <h3 style="margin:6px 0 2px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:500">Reprodução</h3>
        ${sw('autoplayNext', 'Reproduzir o próximo episódio automaticamente', 'Ao fim de um episódio, o próximo começa após uma contagem de 8 segundos.')}
        ${sw('subtitles', 'Legendas ativadas por padrão', 'Liga as legendas em português sempre que o episódio tiver.')}
        ${sw('heroAuto', 'Trocar os destaques da página inicial', 'O carrossel do topo avança sozinho a cada 7 segundos.')}
        <h3 style="margin:18px 0 2px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:500">Leitura</h3>
        ${sw('scriptBig', 'Texto maior nos roteiros', 'Aumenta a fonte da aba Roteiro para leitura confortável.')}
        <h3 style="margin:18px 0 2px;font-size:13px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted);font-weight:500">Dados</h3>
        <div class="set"><div><b>Limpar histórico e progresso</b><p>Apaga episódios assistidos, respostas do quiz e avisos deste navegador. A Minha Lista é mantida.</p></div><button class="btn btn-dark btn-sm" id="clearData">${ic('trash')}Limpar</button></div>
        <div class="set"><div><b>Idioma</b><p>Português (Brasil)</p></div><span class="tag">Padrão</span></div>
      </div></div>`;
  }
  function bindSettings() {
    $$('[data-set]').forEach((i) => i.onchange = () => { S.settings[i.dataset.set] = i.checked; save('settings'); toast('Preferência salva', 'settings'); });
    const b = $('#clearData');
    b.onclick = () => {
      if (b.dataset.armed) { S.progress = {}; S.quiz = {}; S.notify = []; S.extra = []; ['progress', 'quiz', 'notify', 'extra'].forEach(save); renderBell(); toast('Histórico apagado', 'trash'); delete b.dataset.armed; b.innerHTML = ic('trash') + 'Limpar'; return; }
      b.dataset.armed = '1'; b.innerHTML = 'Confirmar limpeza';
      setTimeout(() => { if (b.isConnected && b.dataset.armed) { delete b.dataset.armed; b.innerHTML = ic('trash') + 'Limpar'; } }, 4000);
    };
  }

  /* ---------- Planos ---------- */
  function viewPlans() {
    return `<div class="page"><div class="page-head"><div><div class="kicker">Assine</div><h1>Escolha seu plano</h1><p>Todos os planos dão acesso às temporadas completas, aos roteiros e ao "Você é o juiz". Cancele quando quiser.</p></div><span class="pill orange" style="position:static">Lançamento em breve</span></div>
      <div class="plans">${D.plans.map((p) => `<div class="plan ${p.best ? 'best' : ''}">${p.best ? '<span class="ribbon">Mais escolhido</span>' : ''}<h3>${esc(p.name)}</h3>
        <div class="price"><small>R$</small>${p.price}</div><div class="per">${esc(p.note)}</div>
        <ul>${p.feats.map((f) => `<li>${ic('check')}<span>${esc(f)}</span></li>`).join('')}</ul>
        <button class="btn ${p.best ? 'btn-primary' : 'btn-dark'}" data-plan="${p.id}">Assinar ${esc(p.name)}</button></div>`).join('')}</div>
      <h2 style="margin:10px 0 16px;font-weight:500;font-size:22px">Perguntas frequentes</h2>
      <div class="faq">
        <details><summary>O que é a JURISPLAY?</summary><p>Uma plataforma de séries que explica o Código Penal Brasileiro por meio de casos dramatizados. Cada episódio cobre um artigo e termina com o veredito: o texto da lei, a pena e por que aquele foi o crime certo.</p></details>
        <details><summary>Os casos são reais?</summary><p>Não. Os casos e personagens são fictícios, criados para ensinar. As regras jurídicas e as penas seguem a legislação em vigor.</p></details>
        <details><summary>Serve para concurso e OAB?</summary><p>Sim. Cada episódio tem uma pergunta no estilo das provas e destaca as mudanças recentes da lei, como a Lei 15.397/2026.</p></details>
        <details><summary>Posso assistir no celular?</summary><p>Sim. A plataforma funciona no navegador do celular, do computador e da TV.</p></details>
        <details><summary>Substitui um advogado?</summary><p>Não. O conteúdo é educativo. Para um caso concreto, procure um advogado ou a Defensoria Pública.</p></details>
      </div></div>`;
  }
  function viewNotFound() { return `<div class="page"><div class="empty">${ic('info')}<h3>Página não encontrada</h3><p>O endereço pode ter mudado.</p><a class="btn btn-primary" href="#/inicio">Voltar ao início</a></div></div>`; }

  /* ---------- Modal do episódio ---------- */
  let modalEp = null;
  function openModal(id, tab) {
    const e = EP[id];
    if (!e) { closeModal(); go(baseHash || '#/inicio'); return; }
    modalEp = e;
    const s = seasonOf(e.s);
    const M = $('#modal'), C = $('#modalCard');
    C.innerHTML = `<button class="m-close" data-close aria-label="Fechar">${ic('x')}</button>
      <div class="m-hero"><img src="${e.img}" alt="">
        <div class="m-hero-body"><div class="kicker">${codeTxt(e)} · Art. ${e.id} · ${esc(e.crime)}</div><h2 id="mTitle">${esc(e.title)}</h2>
          <div class="m-actions"><a class="btn btn-primary" href="#/assistir/${e.id}">${ic('play')}Assistir</a>
            <button class="circle-btn ${inList(e.id) ? 'on' : ''}" data-list="${e.id}" aria-label="Minha Lista">${ic(inList(e.id) ? 'check' : 'plus')}</button>
            <button class="circle-btn ${S.likes.includes(e.id) ? 'on' : ''}" data-like="${e.id}" aria-label="Gostei">${ic('thumb')}</button>
            <button class="circle-btn" data-share="${e.id}" aria-label="Copiar link">${ic('share')}</button></div></div></div>
      <div class="m-content">
        <div class="tabs" role="tablist">
          <button class="tab" role="tab" data-tab="geral">Visão geral</button>
          <button class="tab" role="tab" data-tab="roteiro">Roteiro${hasScript(e) ? '' : '<span class="tg">em produção</span>'}</button>
          <button class="tab" role="tab" data-tab="veredito">O Veredito</button>
          <button class="tab" role="tab" data-tab="quiz">Você é o juiz${e.id in S.quiz ? (S.quiz[e.id] ? ' ✓' : '') : ''}</button>
          <button class="tab" role="tab" data-tab="episodios">Episódios</button>
        </div>
        <div id="mPanel" role="tabpanel"></div></div>`;
    const panels = {
      geral: () => `<div class="ov"><div><p class="logline">${esc(e.logline)}</p>
          ${e.video ? '' : `<div class="notice">${ic('film')}<div><b>Vídeo em produção</b><p>Enquanto o episódio não estreia, leia o roteiro e o veredito.</p><div style="margin-top:12px"><button class="btn btn-dark btn-sm ${S.notify.includes(e.id) ? 'on' : ''}" data-notify="${e.id}">${ic('bell')}<span>${S.notify.includes(e.id) ? 'Aviso ativado' : 'Avise-me na estreia'}</span></button></div></div></div>`}
          <div class="sub-h">Personagens do episódio</div><div class="guests">${e.guests.map((g) => `<div class="guest"><b>${esc(g.n)}</b><div class="r">${esc(g.r)}</div><p>${esc(g.d)}</p></div>`).join('')}</div></div>
        <div><dl>
          <div><dt>Temporada: </dt><dd>${s.n} · ${esc(s.name)}</dd></div>
          <div><dt>Artigo: </dt><dd>Art. ${e.id} do Código Penal</dd></div>
          <div><dt>Duração: </dt><dd>${e.dur} min</dd></div>
          <div><dt>Classificação: </dt><dd><span class="rating r-${e.rate}">${e.rate}</span></dd></div>
          <div><dt>Tema: </dt><dd>${esc(e.tag)}</dd></div>
          ${e.updated ? '<div><dt>Atualização: </dt><dd>Lei 15.397/2026</dd></div>' : ''}
        </dl><div class="sub-h">Elenco fixo</div><dl>${D.cast.map((c) => `<div><dd>${esc(c.n)}</dd> <dt>· ${esc(c.r)}</dt></div>`).join('')}</dl></div></div>`,
      roteiro: () => hasScript(e) ? scriptHTML(e) : `<div class="notice">${ic('book')}<div><b>Roteiro em produção</b><p>O roteiro completo deste episódio está sendo escrito. Já dá para estudar a sinopse, o veredito e responder ao "Você é o juiz".</p></div></div>
          <div class="sub-h">Sinopse</div><p class="logline" style="font-size:16px">${esc(e.logline)}</p>`,
      veredito: () => verdictHTML(e),
      quiz: () => quizHTML(e),
      episodios: () => `<div class="season-select"><label class="sr" for="mSeason">Temporada</label><select class="select" id="mSeason">${D.seasons.filter((x) => x.status !== 'breve').map((x) => `<option value="${x.n}" ${x.n === e.s ? 'selected' : ''}>Temporada ${x.n} · ${esc(x.name)}</option>`).join('')}</select><a class="more" href="#/temporada/${e.s}">Página da temporada ${ic('arrowR')}</a></div><div id="mEps">${miniList(e.s, e.id)}</div>`
    };
    const show = (t) => {
      if (!panels[t]) t = 'geral';
      $$('.tab', C).forEach((b) => { b.classList.toggle('on', b.dataset.tab === t); b.setAttribute('aria-selected', b.dataset.tab === t); });
      $('#mPanel').innerHTML = panels[t]();
      if (t === 'quiz') bindQuiz(e);
      if (t === 'episodios') $('#mSeason').onchange = (ev) => { $('#mEps').innerHTML = miniList(+ev.target.value, e.id); };
    };
    $$('.tab', C).forEach((b) => b.onclick = () => show(b.dataset.tab));
    show(tab || 'geral');
    const wasHidden = M.hidden;
    M.hidden = false; document.body.classList.add('lock');
    M.scrollTop = 0;
    if (wasHidden) setTimeout(() => $('.m-close', C).focus({ preventScroll: true }), 50);
  }
  function miniList(sn, cur) {
    return `<div class="ep-list">${epsOf(sn).map((x) => `<div class="ep-row" data-swap="${x.id}" tabindex="0" role="link" style="${x.id === cur ? 'background:rgba(255,107,26,.08)' : ''}"><span class="num">${x.n}</span><div class="th"><img src="${x.img}" alt="" loading="lazy"><span class="pl"><span>${ic('play')}</span></span></div><div><h4>${esc(x.crime)}: ${esc(x.title)} <small>Art. ${x.id}</small></h4><p>${esc(x.logline)}</p></div><span class="side">${x.dur} min</span></div>`).join('')}</div>`;
  }
  function closeModal(silent) {
    const M = $('#modal'); if (M.hidden) return;
    M.hidden = true; $('#modalCard').innerHTML = ''; modalEp = null;
    if ($('#player').hidden) document.body.classList.remove('lock');
    if (!silent) goBack(baseHash || '#/inicio');
  }
  function scriptHTML(e) {
    const sc = e.scenes.map((x) => {
      if (x.v) return `<div class="scene"><div class="voice"><small>A Voz do Código · tela preta</small>${esc(x.v)}</div></div>`;
      const lines = x.l.map(([w, t]) => w === '*' ? `<p class="action">${esc(t)}</p>` : `<p class="line"><span class="who">${esc(w)}</span><span class="says">${esc(t)}</span></p>`).join('');
      return `<div class="scene"><div class="slug">${esc(x.s)}</div>${x.a ? `<p class="action">${esc(x.a)}</p>` : ''}${lines}</div>`;
    }).join('');
    return `<div class="script ${S.settings.scriptBig ? 'big' : ''}">${sc}</div>${e.twist ? `<div class="twist"><h4>A virada jurídica</h4><p>${esc(e.twist)}</p></div>` : ''}`;
  }
  function verdictHTML(e) {
    const v = e.verdict;
    return `<div class="verdict"><div class="vstack">
        <div class="vcard"><h4>Art. ${e.id} · O que a lei diz</h4><p class="tipo">${esc(v.tipo)}</p></div>
        <div class="vcard"><h4>Penas</h4><table class="penas"><tbody>${v.penas.map(([a, b]) => `<tr><td>${esc(a)}</td><td>${esc(b)}</td></tr>`).join('')}</tbody></table></div></div>
      <div class="vstack">
        <div class="vcard"><h4>Para ser este crime</h4><ul>${v.keys.map((k) => `<li>${esc(k)}</li>`).join('')}</ul></div>
        <div class="vcard"><h4>Não confundir com</h4><p>${esc(v.not)}</p></div>
        <div class="vcard hl"><h4>Atenção</h4><p>${esc(v.changed)}</p></div></div></div>`;
  }
  function quizHTML(e) {
    const prev = S.quiz[e.id];
    return `<div class="quiz"><div class="kicker">Você é o juiz · Art. ${e.id}</div><p class="q">${esc(e.quiz.q)}</p>
      <div class="opts">${e.quiz.o.map((o, i) => `<button class="opt" data-i="${i}"><span class="l">${'ABC'[i]}</span><span>${esc(o)}</span></button>`).join('')}</div>
      <div class="fb" id="qfb" hidden></div>${prev !== undefined ? `<p class="fine" style="text-align:left">Você já respondeu esta pergunta (${prev ? 'acertou' : 'errou'}). Pode responder de novo.</p>` : ''}</div>`;
  }
  function bindQuiz(e) {
    $$('#mPanel .opt').forEach((b) => b.onclick = () => {
      const i = +b.dataset.i, ok = i === e.quiz.c;
      $$('#mPanel .opt').forEach((x, j) => { x.disabled = true; if (j === e.quiz.c) x.classList.add('right'); else if (j === i) x.classList.add('wrong'); });
      S.quiz[e.id] = ok; save('quiz');
      const nx = nextEp(e);
      const fb = $('#qfb'); fb.hidden = false;
      fb.innerHTML = `<b style="color:var(${ok ? '--ok' : '--bad'})">${ok ? 'Sentença correta.' : 'Decisão reformada.'}</b>${esc(e.quiz.e)}
        <div class="acts"><button class="btn btn-dark btn-sm" data-tabgo="veredito">Ver o veredito</button>${nx ? `<button class="btn btn-primary btn-sm" data-swap="${nx.id}" data-swaptab="quiz">Próxima pergunta: Art. ${nx.id} ${ic('arrowR')}</button>` : ''}</div>`;
      const st = stats(); if (st.right === 5 && ok) setTimeout(() => toast('Conquista: Juiz de primeira instância', 'trophy'), 600);
    });
  }

  /* ---------- Player ---------- */
  let hls = null, idleT = null, nextT = null, saveT = 0, playerEp = null;
  const SPEEDS = [1, 1.25, 1.5, 2, 0.75];
  function loadHls() {
    return new Promise((res, rej) => {
      if (window.Hls) return res(window.Hls);
      const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/npm/hls.js@1.5.13/dist/hls.min.js';
      s.onload = () => res(window.Hls); s.onerror = rej; document.head.appendChild(s);
    });
  }
  function openPlayer(id) {
    const e = EP[id];
    if (!e) { go('#/inicio'); return; }
    closeModal(true); closePlayer();
    playerEp = e; touch(id);
    if (!baseHash) { baseHash = '#/inicio'; renderView(baseHash); }
    const nx = nextEp(e);
    const PL = $('#player');
    PL.innerHTML = `<div class="pl-stage">${e.video ? `<video id="vid" playsinline preload="metadata" poster="${e.img}">${e.subs ? `<track kind="subtitles" srclang="pt-BR" label="Português" src="${e.subs}">` : ''}</video>` : `<div class="pl-poster" style="background-image:url(${e.img})"></div>
        <div class="pl-soon"><div class="pl-soon-card"><span class="pill orange">Em produção</span><div class="art-line">${codeTxt(e)} · Art. ${e.id} · ${esc(e.crime)}</div><h2>${esc(e.title)}</h2>
          <p>O vídeo deste episódio está sendo produzido. Assim que for publicado, ele aparece aqui com todos os controles.</p>
          <div class="acts"><button class="btn btn-primary" data-act="read">${ic('book')}Ler o roteiro</button><button class="btn btn-ghost ${S.notify.includes(e.id) ? 'on' : ''}" data-notify="${e.id}">${ic('bell')}<span>${S.notify.includes(e.id) ? 'Aviso ativado' : 'Avise-me na estreia'}</span></button></div></div></div>`}
        <div class="pl-flash" id="plFlash"></div></div>
      <div class="pl-top"><button class="cbtn" data-act="back" aria-label="Voltar">${ic('arrowL')}</button><div class="pl-title"><span>${codeTxt(e)} · ART. ${e.id}</span><b>${esc(e.crime)}: ${esc(e.title)}</b></div>
        <svg class="brand-mark" viewBox="0 0 48 48" aria-hidden="true"><path d="M8 5 L41 24 L8 43 Z" fill="none" stroke="#ff6b1a" stroke-width="5.5" stroke-linejoin="round"/><path d="M17 17.5 L29 24 L17 30.5 Z" fill="#ff6b1a"/></svg></div>
      <div class="pl-bottom">
        <div class="seek" id="seek" role="slider" aria-label="Progresso" aria-valuemin="0" aria-valuemax="100" aria-valuenow="0" tabindex="0"><div class="rail-s"><div class="buf" id="buf" style="width:0"></div><div class="fill" id="fill" style="width:0"></div><div class="knob" id="knob" style="left:0"></div></div><span class="time-r" id="timeR">${e.dur}:00</span></div>
        <div class="ctrls">
          <button class="cbtn" data-act="pp" id="ppBtn" aria-label="Reproduzir">${ic('play')}</button>
          <button class="cbtn" data-act="b10" aria-label="Voltar 10 segundos">${ic('back10')}</button>
          <button class="cbtn" data-act="f10" aria-label="Avançar 10 segundos">${ic('fwd10')}</button>
          <div class="vol"><button class="cbtn" data-act="mute" id="muteBtn" aria-label="Silenciar">${ic('vol')}</button><input type="range" id="volR" min="0" max="1" step="0.05" value="1" aria-label="Volume"></div>
          <div class="ctrl-title"><b>${esc(e.crime)}</b> · ${codeTxt(e)} “${esc(e.title)}”</div>
          ${nx ? `<button class="cbtn" data-act="next" aria-label="Próximo episódio">${ic('next')}</button>` : ''}
          <button class="cbtn" data-act="eps" aria-label="Episódios">${ic('list')}</button>
          <button class="cbtn ${S.settings.subtitles ? 'on' : ''}" data-act="cc" id="ccBtn" aria-label="Legendas">${ic('cc')}</button>
          <button class="cbtn" data-act="spd" aria-label="Velocidade"><span class="spd" id="spd">1x</span></button>
          <button class="cbtn" data-act="fs" aria-label="Tela cheia">${ic('full')}</button>
        </div></div>
      <div class="pl-panel" id="plPanel" hidden><h4>Temporada ${e.s} · ${esc(seasonOf(e.s).name)}</h4>${epsOf(e.s).map((x) => `<div class="pl-ep ${x.id === e.id ? 'cur' : ''}" data-goplay="${x.id}"><img src="${x.img}" alt=""><div><b>${x.n}. ${esc(x.title)}</b><small>Art. ${x.id} · ${esc(x.crime)} · ${x.dur} min</small></div></div>`).join('')}</div>
      <div class="pl-next" id="plNext" hidden></div>`;
    PL.hidden = false; document.body.classList.add('lock');
    const v = $('#vid');
    if (v) setupVideo(v, e, nx);
    wake();
    PL.onmousemove = wake; PL.ontouchstart = wake;
  }
  function setupVideo(v, e, nx) {
    const src = e.video;
    const isHls = /\.m3u8(\?|$)/i.test(src);
    if (isHls && !v.canPlayType('application/vnd.apple.mpegurl')) {
      loadHls().then((H) => { if (!H || !H.isSupported()) { toast('Este navegador não reproduz o formato do vídeo', 'info'); return; } hls = new H(); hls.loadSource(src); hls.attachMedia(v); }).catch(() => toast('Não foi possível carregar o player de vídeo', 'info'));
    } else v.src = src;
    const p = S.progress[e.id];
    v.addEventListener('loadedmetadata', () => {
      if (p && p.t > 10 && p.t < v.duration - 30) { v.currentTime = p.t; toast('Continuando de ' + fmt(p.t), 'clock'); }
      if (v.textTracks[0]) v.textTracks[0].mode = S.settings.subtitles ? 'showing' : 'hidden';
      v.play().catch(() => {});
    });
    v.addEventListener('play', () => { $('#ppBtn').innerHTML = ic('pause'); $('#ppBtn').setAttribute('aria-label', 'Pausar'); });
    v.addEventListener('pause', () => { $('#ppBtn').innerHTML = ic('play'); $('#ppBtn').setAttribute('aria-label', 'Reproduzir'); wake(); });
    v.addEventListener('timeupdate', () => {
      const d = v.duration || 1, f = (v.currentTime / d) * 100;
      $('#fill').style.width = f + '%'; $('#knob').style.left = f + '%'; $('#seek').setAttribute('aria-valuenow', Math.round(f));
      $('#timeR').textContent = '-' + fmt(d - v.currentTime);
      if (v.buffered.length) $('#buf').style.width = (v.buffered.end(v.buffered.length - 1) / d) * 100 + '%';
      if (Date.now() - saveT > 4000) { saveT = Date.now(); S.progress[e.id] = { t: v.currentTime, d, ts: Date.now() }; save('progress'); }
    });
    v.addEventListener('ended', () => {
      S.progress[e.id] = { t: v.duration, d: v.duration, ts: Date.now() }; save('progress');
      if (nx && S.settings.autoplayNext) showNext(nx);
    });
    v.addEventListener('click', () => ctl('pp'));
    v.addEventListener('dblclick', () => ctl('fs'));
  }
  function showNext(nx) {
    const box = $('#plNext'); let n = 8;
    const draw = () => { box.innerHTML = `<img src="${nx.img}" alt=""><div><small>Próximo episódio em ${n}s</small><b>${codeTxt(nx)} · ${esc(nx.title)}</b><div style="display:flex;gap:8px"><a class="btn btn-primary btn-sm" href="#/assistir/${nx.id}">${ic('play')}Assistir agora</a><button class="btn btn-dark btn-sm" data-act="cancelnext">Cancelar</button></div></div>`; };
    draw(); box.hidden = false;
    nextT = setInterval(() => { n--; if (n <= 0) { clearInterval(nextT); go('#/assistir/' + nx.id); } else draw(); }, 1000);
  }
  function flash(icon) { const f = $('#plFlash'); if (!f) return; f.innerHTML = ic(icon); f.classList.remove('go'); void f.offsetWidth; f.classList.add('go'); }
  function ctl(act) {
    const v = $('#vid'), e = playerEp; if (!e) return;
    const needVideo = ['pp', 'b10', 'f10', 'mute', 'spd'];
    if (!v && needVideo.includes(act)) { toast('Vídeo em produção. Em breve neste player.', 'film'); return; }
    switch (act) {
      case 'pp': if (v.paused) { v.play().catch(() => {}); flash('play'); } else { v.pause(); flash('pause'); } break;
      case 'b10': v.currentTime = Math.max(0, v.currentTime - 10); flash('back10'); break;
      case 'f10': v.currentTime = Math.min(v.duration || 0, v.currentTime + 10); flash('fwd10'); break;
      case 'mute': v.muted = !v.muted; $('#muteBtn').innerHTML = ic(v.muted ? 'mute' : 'vol'); $('#volR').value = v.muted ? 0 : v.volume; break;
      case 'spd': { const cur = SPEEDS.indexOf(v.playbackRate); const nv = SPEEDS[(cur + 1) % SPEEDS.length]; v.playbackRate = nv; $('#spd').textContent = String(nv).replace('.', ',') + 'x'; toast('Velocidade ' + String(nv).replace('.', ',') + 'x', 'clock'); break; }
      case 'cc': S.settings.subtitles = !S.settings.subtitles; save('settings'); $('#ccBtn').classList.toggle('on', S.settings.subtitles); if (v && v.textTracks[0]) v.textTracks[0].mode = S.settings.subtitles ? 'showing' : 'hidden'; toast(S.settings.subtitles ? 'Legendas ativadas' : 'Legendas desativadas', 'cc'); break;
      case 'fs': { const el = $('#player'); try { if (document.fullscreenElement) document.exitFullscreen(); else if (el.requestFullscreen) el.requestFullscreen().catch(() => {}); else if (v && v.webkitEnterFullscreen) v.webkitEnterFullscreen(); } catch (err) { /* tela cheia indisponível */ } break; }
      case 'eps': $('#plPanel').hidden = !$('#plPanel').hidden; break;
      case 'next': { const nx = nextEp(e); if (nx) go('#/assistir/' + nx.id); break; }
      case 'back': goBack(baseHash || '#/inicio'); break;
      case 'read': history.replaceState(null, '', '#/ep/' + e.id + '/roteiro'); closePlayer(); openModal(e.id, 'roteiro'); break;
      case 'cancelnext': clearInterval(nextT); $('#plNext').hidden = true; break;
    }
  }
  function wake() {
    const PL = $('#player'); if (PL.hidden) return;
    PL.classList.remove('idle'); clearTimeout(idleT);
    idleT = setTimeout(() => { const v = $('#vid'); if (v && !v.paused && $('#plPanel').hidden) PL.classList.add('idle'); }, 3000);
  }
  function closePlayer() {
    const PL = $('#player'); if (PL.hidden) return;
    const v = $('#vid'); if (v) { try { v.pause(); } catch (e) { /* ok */ } v.removeAttribute('src'); v.load(); }
    if (hls) { hls.destroy(); hls = null; }
    clearInterval(nextT); clearTimeout(idleT);
    if (document.fullscreenElement) document.exitFullscreen().catch(() => {});
    PL.hidden = true; PL.innerHTML = ''; playerEp = null;
    if ($('#modal').hidden) document.body.classList.remove('lock');
    if (baseHash && baseHash.startsWith('#/inicio') || !baseHash) { /* atualiza "Continue assistindo" */ renderView(baseHash || '#/inicio'); }
  }
  function seekTo(ev) {
    const v = $('#vid'); if (!v || !v.duration) { toast('Vídeo em produção. Em breve neste player.', 'film'); return; }
    const r = $('#seek .rail-s').getBoundingClientRect();
    const x = (ev.touches ? ev.touches[0].clientX : ev.clientX) - r.left;
    v.currentTime = Math.max(0, Math.min(1, x / r.width)) * v.duration;
  }

  /* ---------- Notificações e conta ---------- */
  function allNotes() { return S.extra.concat(D.notifications); }
  function renderBell() {
    const notes = allNotes(); const unread = notes.filter((n) => !S.read.includes(n.id)).length;
    const b = $('#bellCount'); b.hidden = !unread; b.textContent = unread;
    $('#bellPop').innerHTML = `<div class="pop-head"><b>Notificações</b>${unread ? '<button data-act="readall">Marcar todas como lidas</button>' : ''}</div>
      ${notes.map((n) => `<a class="note ${S.read.includes(n.id) ? '' : 'unread'}" href="${n.href}" data-note="${n.id}"><span class="dot"></span><div><b>${esc(n.t)}</b><p>${esc(n.d)}</p><small>${esc(n.when)}</small></div></a>`).join('')}`;
  }
  function renderUser() {
    const u = S.user, av = $('#avatarBtn');
    av.classList.toggle('has-user', !!u);
    av.innerHTML = u ? esc(u.name.charAt(0).toUpperCase()) : ic('user');
    $('#loginBtn').hidden = !!u;
    $('#userPop').innerHTML = u ? `<div class="pop-user"><b>${esc(u.name)}</b><small>${esc(u.email)}</small></div>
        <a class="menu-item" href="#/perfil">${ic('user')}Perfil</a><a class="menu-item" href="#/lista">${ic('bookmark')}Minha Lista</a><a class="menu-item" href="#/config">${ic('settings')}Configurações</a><a class="menu-item" href="#/planos">${ic('star')}Planos</a>
        <button class="menu-item" data-act="logout">${ic('logout')}Sair</button>` : '';
  }
  function closePops() { ['#bellPop', '#userPop'].forEach((s) => { $(s).hidden = true; }); $('#bellBtn').setAttribute('aria-expanded', 'false'); $('#avatarBtn').setAttribute('aria-expanded', 'false'); }
  function togglePop(sel, btn) { const p = $(sel); const open = p.hidden; closePops(); p.hidden = !open; $(btn).setAttribute('aria-expanded', String(open)); }

  /* ---------- diálogos ---------- */
  function dialog(html) { $('#dlgCard').innerHTML = `<button class="m-close" data-dclose aria-label="Fechar">${ic('x')}</button><div class="dlg-body">${html}</div>`; $('#dlg').hidden = false; document.body.classList.add('lock'); const f = $('#dlg input'); if (f) setTimeout(() => f.focus(), 60); }
  function closeDialog() { $('#dlg').hidden = true; $('#dlgCard').innerHTML = ''; if ($('#modal').hidden && $('#player').hidden) document.body.classList.remove('lock'); }
  function loginDialog() {
    dialog(`<h2>Entrar</h2><p>Acesse sua conta para continuar de onde parou.</p>
      <form id="loginForm" novalidate>
        <div class="field"><label for="lEmail">E-mail</label><input id="lEmail" type="email" autocomplete="email" placeholder="voce@email.com" required><span class="err" id="lErrE"></span></div>
        <div class="field"><label for="lPass">Senha</label><input id="lPass" type="password" autocomplete="current-password" placeholder="Mínimo de 6 caracteres" required><span class="err" id="lErrP"></span></div>
        <button class="btn btn-primary" style="width:100%;margin-top:6px" type="submit">Entrar</button>
      </form><p class="fine">Ainda não tem conta? <a href="#/planos" data-dclose style="color:var(--orange-2)">Conheça os planos</a></p>
      <p class="fine">Versão de pré-lançamento: o acesso fica salvo apenas neste navegador.</p>`);
    $('#loginForm').onsubmit = (ev) => {
      ev.preventDefault();
      const em = $('#lEmail').value.trim(), pw = $('#lPass').value;
      const okE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em), okP = pw.length >= 6;
      $('#lErrE').textContent = okE ? '' : 'Digite um e-mail válido, como voce@email.com.';
      $('#lErrP').textContent = okP ? '' : 'A senha precisa ter pelo menos 6 caracteres.';
      if (!okE || !okP) return;
      const raw = em.split('@')[0].replace(/[._-]+/g, ' ');
      S.user = { name: raw.replace(/\b\w/g, (c) => c.toUpperCase()), email: em }; save('user');
      closeDialog(); renderUser(); toast('Bem-vindo, ' + S.user.name.split(' ')[0], 'user');
      if (currentRoute().r === 'perfil') renderView();
    };
  }
  function planDialog(id) {
    const p = D.plans.find((x) => x.id === id);
    dialog(`<h2>${esc(p.name)}</h2><p>R$ ${p.price} ${esc(p.note)}</p>
      <div class="notice">${ic('sparkle')}<div><b>Assinaturas abrem no lançamento</b><p>Deixe seu e-mail e avisamos assim que o plano ${esc(p.name)} estiver disponível.</p></div></div>
      <form id="waitForm" novalidate style="margin-top:18px"><div class="field"><label for="wEmail">E-mail</label><input id="wEmail" type="email" value="${S.user ? esc(S.user.email) : ''}" placeholder="voce@email.com"><span class="err" id="wErr"></span></div>
      <button class="btn btn-primary" style="width:100%" type="submit">Quero ser avisado</button></form>`);
    $('#waitForm').onsubmit = (ev) => {
      ev.preventDefault(); const em = $('#wEmail').value.trim();
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)) { $('#wErr').textContent = 'Digite um e-mail válido, como voce@email.com.'; return; }
      store.set('waitlist', { plan: id, email: em, ts: Date.now() });
      closeDialog(); toast('Combinado! Avisaremos em ' + em, 'check');
    };
  }
  const PAGES = {
    sobre: ['Sobre a JURISPLAY', 'A JURISPLAY transforma o Código Penal Brasileiro em séries. Cada episódio conta um caso fictício, mostra a investigação e o julgamento, e termina com o veredito: o artigo, a pena e por que aquele foi o crime certo. Do estudo à prática.'],
    termos: ['Termos de uso', 'O conteúdo é educativo e não substitui a orientação de um advogado. Casos e personagens são fictícios; qualquer semelhança com fatos reais é coincidência. Os termos completos serão publicados no lançamento.'],
    privacidade: ['Privacidade', 'Nesta versão de pré-lançamento, preferências, lista e progresso ficam guardados apenas no seu navegador. Nenhum dado é enviado a servidores.'],
    contato: ['Contato', 'Canais de contato serão divulgados no lançamento da plataforma.']
  };

  /* ---------- eventos globais ---------- */
  function bindGlobal() {
    $('#hamb').innerHTML = ic('menu');
    $('#searchIcon').outerHTML = ic('search');
    $('#qclear').innerHTML = ic('x');
    $('#searchToggle').innerHTML = ic('search');
    $('#bellBtn').insertAdjacentHTML('afterbegin', ic('bell'));

    $('#hamb').onclick = () => { const o = document.body.classList.toggle('nav-open'); $('#hamb').setAttribute('aria-expanded', String(o)); };
    $('#scrim').onclick = () => document.body.classList.remove('nav-open');
    $('#bellBtn').onclick = (ev) => { ev.stopPropagation(); togglePop('#bellPop', '#bellBtn'); };
    $('#avatarBtn').onclick = (ev) => { ev.stopPropagation(); if (!S.user) { loginDialog(); return; } togglePop('#userPop', '#avatarBtn'); };
    $('#loginBtn').onclick = loginDialog;
    $('#searchToggle').onclick = () => { $('#topbar').classList.add('searching'); $('#q').focus(); };

    const q = $('#q'); let qt;
    q.addEventListener('input', () => {
      $('#qclear').hidden = !q.value;
      clearTimeout(qt); qt = setTimeout(() => {
        const v = q.value.trim(); const r = currentRoute().r;
        if (!v) { if (r === 'busca') { history.replaceState(null, '', '#/busca'); baseHash = '#/busca'; renderView(baseHash); } return; }
        const h = '#/busca/' + encodeURIComponent(v);
        if (r === 'busca') { history.replaceState(null, '', h); stack[stack.length - 1] = h; baseHash = h; renderView(h); }
        else location.hash = h;
      }, 220);
    });
    q.addEventListener('blur', () => { if (!q.value) $('#topbar').classList.remove('searching'); });
    $('#searchForm').onsubmit = (ev) => { ev.preventDefault(); const v = q.value.trim(); if (v) location.hash = '#/busca/' + encodeURIComponent(v); q.blur(); };
    $('#qclear').onclick = () => { q.value = ''; $('#qclear').hidden = true; q.focus(); if (currentRoute().r === 'busca') { history.replaceState(null, '', '#/busca'); baseHash = '#/busca'; renderView(baseHash); } };

    document.addEventListener('click', (ev) => {
      const t = ev.target;
      if (!t.closest('.pop') && !t.closest('#bellBtn') && !t.closest('#avatarBtn')) closePops();
      const el = (s) => t.closest(s);
      let x;
      if ((x = el('[data-list]'))) { ev.preventDefault(); ev.stopPropagation(); toggleList(x.dataset.list); return; }
      if ((x = el('[data-like]'))) { ev.preventDefault(); toggleLike(x.dataset.like); return; }
      if ((x = el('[data-notify]'))) { ev.preventDefault(); toggleNotify(x.dataset.notify); return; }
      if ((x = el('[data-share]'))) {
        const url = location.origin + location.pathname + '#/ep/' + x.dataset.share;
        const done = () => toast('Link do episódio copiado', 'share');
        if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(url).then(done).catch(() => toast(url, 'share')); else toast(url, 'share');
        return;
      }
      if ((x = el('[data-play]'))) { ev.preventDefault(); ev.stopPropagation(); location.hash = '#/assistir/' + x.dataset.play; return; }
      if ((x = el('[data-goplay]'))) { go('#/assistir/' + x.dataset.goplay); return; }
      if ((x = el('[data-swap]'))) {
        const id = x.dataset.swap, tab = x.dataset.swaptab;
        history.replaceState(null, '', '#/ep/' + id + (tab ? '/' + tab : '')); stack[stack.length - 1] = location.hash; openModal(id, tab); $('#modal').scrollTop = 0; return;
      }
      if ((x = el('[data-tabgo]'))) { const b = $(`.tab[data-tab="${x.dataset.tabgo}"]`); if (b) b.click(); return; }
      if ((x = el('[data-open]'))) { location.hash = '#/ep/' + x.dataset.open; return; }
      if ((x = el('[data-close]'))) { closeModal(); return; }
      if ((x = el('[data-dclose]'))) { closeDialog(); return; }
      if ((x = el('[data-plan]'))) { planDialog(x.dataset.plan); return; }
      if ((x = el('[data-page]'))) { const pg = PAGES[x.dataset.page]; dialog(`<h2>${esc(pg[0])}</h2><p style="color:var(--fg)">${esc(pg[1])}</p>`); return; }
      if ((x = el('[data-note]'))) { if (!S.read.includes(x.dataset.note)) { S.read.push(x.dataset.note); save('read'); } renderBell(); closePops(); return; }
      if ((x = el('[data-act]'))) {
        const a = x.dataset.act;
        if (a === 'readall') { allNotes().forEach((n) => { if (!S.read.includes(n.id)) S.read.push(n.id); }); save('read'); renderBell(); $('#bellPop').hidden = false; return; }
        if (a === 'logout') { S.user = null; save('user'); renderUser(); closePops(); toast('Você saiu da conta', 'logout'); if (currentRoute().r === 'perfil') renderView(); return; }
        if (a === 'login') { loginDialog(); return; }
        if (!$('#player').hidden) { ctl(a); }
      }
    });
    document.addEventListener('keydown', (ev) => {
      const tag = (ev.target.tagName || '').toLowerCase();
      const typing = tag === 'input' || tag === 'textarea' || tag === 'select';
      if (ev.key === 'Escape') {
        if (!$('#dlg').hidden) { closeDialog(); return; }
        if (!$('#player').hidden) { if (!document.fullscreenElement) ctl('back'); return; }
        if (!$('#modal').hidden) { closeModal(); return; }
        closePops(); document.body.classList.remove('nav-open'); $('#topbar').classList.remove('searching');
        return;
      }
      if (typing) return;
      if (!$('#player').hidden) {
        const map = { ' ': 'pp', k: 'pp', ArrowLeft: 'b10', ArrowRight: 'f10', f: 'fs', m: 'mute', c: 'cc', n: 'next' };
        if (map[ev.key]) { ev.preventDefault(); ctl(map[ev.key]); wake(); }
        return;
      }
      if (ev.key === '/') { ev.preventDefault(); $('#topbar').classList.add('searching'); $('#q').focus(); return; }
      if (ev.key === 'Enter') { const c = ev.target.closest && ev.target.closest('[data-open],[data-swap]'); if (c) c.click(); }
    });
    document.addEventListener('pointerdown', (ev) => { const s = ev.target.closest('#seek'); if (s) seekTo(ev); });
    document.addEventListener('input', (ev) => { if (ev.target.id === 'volR') { const v = $('#vid'); if (!v) return; v.volume = +ev.target.value; v.muted = v.volume === 0; $('#muteBtn').innerHTML = ic(v.muted ? 'mute' : 'vol'); } });
    window.addEventListener('hashchange', onRoute);
  }

  /* ---------- início ---------- */
  renderNav(); bindGlobal(); renderBell(); renderUser();
  if (!location.hash) history.replaceState(null, '', '#/inicio');
  onRoute();
})();
