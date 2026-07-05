/* app.js — renders the guide from data/content.json */
(function () {
  'use strict';

  // ---- Inline SVG icon set (stroke inherits currentColor) ----
  const P = 'stroke="currentColor" fill="none" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
  const ICONS = {
    home: `<svg viewBox="0 0 24 24"><path ${P} d="M3 11l9-7 9 7"/><path ${P} d="M5 10v9h14v-9"/></svg>`,
    bolt: `<svg viewBox="0 0 24 24"><path ${P} d="M13 2L4 14h7l-1 8 9-12h-7z"/></svg>`,
    generator: `<svg viewBox="0 0 24 24"><rect ${P} x="3" y="7" width="18" height="11" rx="2"/><path ${P} d="M7 7V5h10v2M8 18v2M16 18v2M11 12l2-2m0 0h-2v3h2z"/></svg>`,
    plug: `<svg viewBox="0 0 24 24"><path ${P} d="M9 2v6M15 2v6M6 8h12v3a6 6 0 01-12 0z"/><path ${P} d="M12 17v5"/></svg>`,
    battery: `<svg viewBox="0 0 24 24"><rect ${P} x="2" y="7" width="18" height="10" rx="2"/><path ${P} d="M22 10v4"/><path ${P} d="M7 12h2m-1-1v2m4-1h4"/></svg>`,
    water: `<svg viewBox="0 0 24 24"><path ${P} d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/></svg>`,
    drop: `<svg viewBox="0 0 24 24"><path ${P} d="M12 3s6 7 6 11a6 6 0 01-12 0c0-4 6-11 6-11z"/><path ${P} d="M9 14a3 3 0 003 3"/></svg>`,
    flame: `<svg viewBox="0 0 24 24"><path ${P} d="M12 3c1 3-2 4-2 7a4 4 0 008 0c0-1-1-3-2-4 0 2-1 3-2 3 1-3-1-5-2-6z"/></svg>`,
    fridge: `<svg viewBox="0 0 24 24"><rect ${P} x="6" y="2" width="12" height="20" rx="2"/><path ${P} d="M6 10h12M9 5v2M9 13v3"/></svg>`,
    snowflake: `<svg viewBox="0 0 24 24"><path ${P} d="M12 2v20M4 6l16 12M20 6L4 18"/><path ${P} d="M12 5l2 2-2 2-2-2zM4 7l3 .5M20 7l-3 .5"/></svg>`,
    microwave: `<svg viewBox="0 0 24 24"><rect ${P} x="2" y="4" width="20" height="15" rx="2"/><rect ${P} x="5" y="7" width="10" height="9"/><path ${P} d="M18 8v2M18 13v2"/></svg>`,
    speaker: `<svg viewBox="0 0 24 24"><rect ${P} x="5" y="9" width="14" height="6" rx="2"/><circle ${P} cx="9" cy="12" r="1.3"/><circle ${P} cx="15" cy="12" r="1.3"/></svg>`,
    tv: `<svg viewBox="0 0 24 24"><rect ${P} x="3" y="5" width="18" height="12" rx="2"/><path ${P} d="M8 21h8M12 17v4"/></svg>`,
    level: `<svg viewBox="0 0 24 24"><rect ${P} x="2" y="9" width="20" height="6" rx="2"/><circle ${P} cx="12" cy="12" r="1.5"/></svg>`,
    steering: `<svg viewBox="0 0 24 24"><circle ${P} cx="12" cy="12" r="9"/><circle ${P} cx="12" cy="12" r="2.5"/><path ${P} d="M12 14.5V21M9.5 11L4 8M14.5 11L20 8"/></svg>`,
    propane: `<svg viewBox="0 0 24 24"><path ${P} d="M7 8a5 5 0 0110 0v9a3 3 0 01-3 3h-4a3 3 0 01-3-3z"/><path ${P} d="M10 4h4v2h-4z"/></svg>`,
    checklist: `<svg viewBox="0 0 24 24"><path ${P} d="M9 6h11M9 12h11M9 18h11"/><path ${P} d="M4 5l1.5 1.5L8 4M4 11l1.5 1.5L8 10M4 17l1.5 1.5L8 16"/></svg>`,
    phone: `<svg viewBox="0 0 24 24"><path ${P} d="M4 5c0 9 6 15 15 15l1.5-3.5-4-1.5-1.5 2c-2.5-1-4.5-3-5.5-5.5l2-1.5-1.5-4z"/></svg>`,
    book: `<svg viewBox="0 0 24 24"><path ${P} d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path ${P} d="M19 3v16"/></svg>`,
    toilet: `<svg viewBox="0 0 24 24"><path ${P} d="M6 4h5v6a5 5 0 01-10 0"/><path ${P} d="M1 10h10"/><path ${P} d="M7 15l-1 5h3l-1-5"/></svg>`,
    location: `<svg viewBox="0 0 24 24"><path ${P} d="M12 21s7-6.5 7-12a7 7 0 00-14 0c0 5.5 7 12 7 12z"/><circle ${P} cx="12" cy="9" r="2.5"/></svg>`,
    awning: `<svg viewBox="0 0 24 24"><path ${P} d="M3 4h18v5H3z"/><path ${P} d="M3 9l2 4h14l2-4"/><path ${P} d="M5 13v7M19 13v7M9 13l-1 4M15 13l1 4"/></svg>`,
    cooktop: `<svg viewBox="0 0 24 24"><rect ${P} x="3" y="4" width="18" height="16" rx="2"/><circle ${P} cx="8.5" cy="9" r="2"/><circle ${P} cx="15.5" cy="9" r="2"/><circle ${P} cx="8.5" cy="15" r="2"/><circle ${P} cx="15.5" cy="15" r="2"/></svg>`,
    heat: `<svg viewBox="0 0 24 24"><path ${P} d="M8 4c-1 2 1 3 0 5M12 4c-1 2 1 3 0 5M16 4c-1 2 1 3 0 5"/><path ${P} d="M6 13h12a0 0 0 010 0v3a3 3 0 01-3 3H9a3 3 0 01-3-3z"/></svg>`,
  };
  const icon = (name) => ICONS[name] || ICONS.home;

  // ---- State ----
  let DATA = null;
  let WALK = null;    // { url } for the main walkthrough video (for jump links)
  const el = (id) => document.getElementById(id);
  const view = el('view');

  // ---- Load content ----
  fetch('./data/content.json', { cache: 'no-cache' })
    .then((r) => r.json())
    .then((d) => { DATA = d; init(); })
    .catch((err) => { view.innerHTML = '<p class="loading">Could not load guide content.</p>'; console.error(err); });

  function init() {
    el('appTitle').textContent = DATA.title || 'RV Guide';
    if (DATA.model) el('appModel').textContent = DATA.model;
    document.title = (DATA.title || 'RV Guide');
    if (DATA.walkthrough) WALK = { url: DATA.walkthrough };
    el('backBtn').addEventListener('click', () => { location.hash = ''; });
    window.addEventListener('hashchange', route);
    // modal close handlers
    el('modalClose').addEventListener('click', closeModal);
    el('imgModal').addEventListener('click', (e) => { if (e.target.id === 'imgModal') closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });
    route();
    registerSW();
    setupInstall();
  }

  // ---- Router ----
  function route() {
    const id = decodeURIComponent((location.hash || '').replace(/^#/, ''));
    if (id === 'quick-reference') {
      renderQuickRef();
      el('backBtn').classList.remove('hidden');
    } else if (id && DATA.sections.some((s) => s.id === id)) {
      renderDetail(DATA.sections.find((s) => s.id === id));
      el('backBtn').classList.remove('hidden');
    } else {
      renderHome();
      el('backBtn').classList.add('hidden');
    }
    window.scrollTo(0, 0);
  }

  // ---- Home ----
  function renderHome() {
    const cats = [];
    const byCat = {};
    DATA.sections.forEach((s) => {
      if (s.id === 'welcome') return; // shown as intro
      const c = s.category || 'Other';
      if (!byCat[c]) { byCat[c] = []; cats.push(c); }
      byCat[c].push(s);
    });

    const welcome = DATA.sections.find((s) => s.id === 'welcome');

    let html = '<div class="fade-in">';
    html += `<div class="search-wrap"><input id="search" type="search" placeholder="Search (e.g. water, generator, TV)…" /></div>`;
    if (DATA.tagline) html += `<div class="intro-note">${esc(DATA.tagline)}</div>`;
    // Featured intro / walkthrough video
    if (DATA.walkthrough) {
      const yt = ytId(DATA.walkthrough);
      if (yt) {
        html += `<div class="intro-video">
          <div class="intro-video-label">▶ Start here — full video tour</div>
          <div class="video-wrap"><iframe src="https://www.youtube.com/embed/${yt.id}" title="Van walkthrough" allowfullscreen loading="lazy"></iframe></div>
        </div>`;
      }
    }
    if (welcome) {
      html += `<button class="card" onclick="location.hash='#${welcome.id}'">
        <span class="ic">${icon(welcome.icon)}</span>
        <span class="c-body"><span class="c-title">${esc(welcome.title)}</span>
        <span class="c-quick">${esc(welcome.quick)}</span></span>
        <span class="chev">›</span></button>`;
    }
    // Quick Reference cheat-sheet card
    html += `<button class="card" onclick="location.hash='#quick-reference'">
      <span class="ic">${icon('checklist')}</span>
      <span class="c-body"><span class="c-title">Quick Reference</span>
      <span class="c-quick">One-screen cheat sheet: the key thing to know about every system, at a glance.</span></span>
      <span class="chev">›</span></button>`;
    html += '<div style="height:16px"></div>';

    cats.forEach((c) => {
      html += `<div class="cat-group" data-cat="${esc(c)}"><div class="cat-title">${esc(c)}</div><div class="cards">`;
      byCat[c].forEach((s) => {
        html += `<button class="card" data-search="${esc((s.title + ' ' + s.quick + ' ' + c).toLowerCase())}" onclick="location.hash='#${s.id}'">
          <span class="ic">${icon(s.icon)}</span>
          <span class="c-body"><span class="c-title">${esc(s.title)}</span>
          <span class="c-quick">${esc(s.quick)}</span></span>
          <span class="chev">›</span></button>`;
      });
      html += '</div></div>';
    });
    html += '</div>';
    view.innerHTML = html;

    const search = el('search');
    if (search) search.addEventListener('input', onSearch);
  }

  function onSearch(e) {
    const q = e.target.value.trim().toLowerCase();
    document.querySelectorAll('.card[data-search]').forEach((c) => {
      c.style.display = !q || c.dataset.search.includes(q) ? '' : 'none';
    });
    document.querySelectorAll('.cat-group').forEach((g) => {
      const any = [...g.querySelectorAll('.card')].some((c) => c.style.display !== 'none');
      g.style.display = any ? '' : 'none';
    });
  }

  // ---- Detail ----
  function renderDetail(s) {
    let html = '<div class="fade-in">';
    html += `<div class="detail-hero"><span class="ic">${icon(s.icon)}</span>
      <div><div class="cat">${esc(s.category)}</div><h2>${esc(s.title)}</h2></div></div>`;

    if (s.quick) html += `<div class="quick-callout">${esc(s.quick)}</div>`;

    html += renderBody(s);

    // subsections
    (s.subsections || []).forEach((sub) => {
      html += `<div class="subhead">${esc(sub.title)}</div>`;
      html += renderBody(sub);
    });

    html += '</div>';
    view.innerHTML = html;
    wirePhotos();
  }

  // ---- Quick Reference (cheat sheet from every section's quick line) ----
  function renderQuickRef() {
    const skip = { welcome: 1, 'control-location': 1, resources: 1, faq: 1 };
    const cats = [];
    const byCat = {};
    DATA.sections.forEach((s) => {
      if (skip[s.id] || !s.quick) return;
      const c = s.category || 'Other';
      if (!byCat[c]) { byCat[c] = []; cats.push(c); }
      byCat[c].push(s);
    });
    let html = '<div class="fade-in">';
    html += `<div class="detail-hero"><span class="ic">${icon('checklist')}</span>
      <div><div class="cat">Cheat sheet</div><h2>Quick Reference</h2></div></div>`;
    html += `<div class="quick-callout">The one key thing to know about each system. Tap any item to open the full card.</div>`;
    cats.forEach((c) => {
      html += `<div class="qr-group"><div class="cat-title">${esc(c)}</div>`;
      byCat[c].forEach((s) => {
        html += `<a class="qr-item" href="#${s.id}">
          <span class="qr-ic">${icon(s.icon)}</span>
          <span class="qr-body"><span class="qr-title">${esc(s.title)}</span>
          <span class="qr-quick">${esc(s.quick)}</span></span></a>`;
      });
      html += `</div>`;
    });
    html += '</div>';
    view.innerHTML = html;
  }

  // Wire thumbnails: load image (placeholder on error) + open full-size modal on tap
  function wirePhotos() {
    document.querySelectorAll('.thumb').forEach((btn) => {
      const img = btn.querySelector('img');
      const fn = btn.getAttribute('data-src');
      if (img) {
        img.addEventListener('error', () => {
          btn.classList.add('missing');
          const box = document.createElement('div');
          box.className = 'thumb-ph';
          box.innerHTML = '<span class="cam">📷</span>';
          btn.insertBefore(box, img);
          img.remove();
        });
        img.src = fn;
      }
      btn.addEventListener('click', () => openModal(fn, btn.getAttribute('data-cap'), btn.classList.contains('missing')));
    });
  }

  // ---- Full-size photo modal (lightbox) ----
  function openModal(src, caption, missing) {
    const modal = el('imgModal');
    const media = el('modalMedia');
    const cap = el('modalCap');
    cap.textContent = caption || '';
    cap.style.display = caption ? '' : 'none';
    media.innerHTML = '';
    if (missing) {
      const box = document.createElement('div');
      box.className = 'modal-ph';
      box.innerHTML = '<span class="cam">📷</span><span>Photo not added yet</span><span class="fn"></span>';
      box.querySelector('.fn').textContent = src;
      media.appendChild(box);
    } else {
      const img = document.createElement('img');
      img.src = src; img.alt = caption || '';
      img.addEventListener('error', () => {
        media.innerHTML = '';
        const box = document.createElement('div');
        box.className = 'modal-ph';
        box.innerHTML = '<span class="cam">📷</span><span>Photo not added yet</span><span class="fn"></span>';
        box.querySelector('.fn').textContent = src;
        media.appendChild(box);
      });
      media.appendChild(img);
    }
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    el('imgModal').classList.add('hidden');
    document.body.style.overflow = '';
  }

  // parse a "MM:SS | label" or "HH:MM:SS | label" watch string
  function parseWatch(str) {
    const parts = String(str).split('|');
    const time = parts[0].trim();
    const label = (parts[1] || '').trim();
    const seg = time.split(':').map((n) => parseInt(n, 10));
    if (seg.some(isNaN)) return { time: '', label, seconds: 0 };
    let seconds = 0;
    seg.forEach((n) => { seconds = seconds * 60 + n; });
    return { time, label, seconds };
  }

  // shared renderer for a section or subsection body
  function renderBody(s) {
    let html = '';

    if (s.steps && s.steps.length) {
      html += `<div class="block"><h3>Steps</h3><ol class="steps">`;
      s.steps.forEach((t) => { html += `<li>${esc(t)}</li>`; });
      html += `</ol></div>`;
    }

    if (s.warnings && s.warnings.length) {
      html += `<div class="block"><h3>Important</h3><ul class="warns">`;
      s.warnings.forEach((t) => { html += `<li>${esc(t)}</li>`; });
      html += `</ul></div>`;
    }

    if (s.tips && s.tips.length) {
      html += `<div class="block"><h3>Tips</h3><ul class="tips">`;
      s.tips.forEach((t) => { html += `<li>${linkify(t)}</li>`; });
      html += `</ul></div>`;
    }

    // FAQ: question/answer pairs (both modes)
    if (s.faq && s.faq.length) {
      html += `<div class="block"><ul class="faq">`;
      s.faq.forEach((f) => {
        html += `<li><p class="faq-q">${esc(f.q)}</p><p class="faq-a">${linkify(f.a)}</p></li>`;
      });
      html += `</ul></div>`;
    }

    // Photos: small thumbnails in BOTH modes; tap to open full size in a modal
    if (s.photos && s.photos.length) {
      html += `<div class="block"><h3>Photos</h3><div class="thumbs">`;
      s.photos.forEach((p) => { html += photoHTML(p); });
      html += `</div></div>`;
    }

    // Watch: jump straight into the walkthrough video at a timestamp
    if (s.watch && WALK) {
      const w = parseWatch(s.watch);
      if (w) {
        html += `<div class="block"><a class="watch-link" href="${WALK.url}${w.seconds ? (WALK.url.includes('?') ? '&' : '?') + 't=' + w.seconds : ''}" target="_blank" rel="noopener">▶ Jump to this in the walkthrough video${w.time ? ' (' + esc(w.time) + ')' : ''}${w.label ? ' — ' + esc(w.label) : ''}</a></div>`;
      }
    }

    // Video: embedded player + link
    if (s.video) {
      const yt = ytId(s.video);
      html += `<div class="block"><h3>Video</h3>`;
      if (yt) {
        html += `<div class="video-wrap"><iframe src="https://www.youtube.com/embed/${yt.id}${yt.start ? '?start=' + yt.start : ''}" title="Video" allowfullscreen loading="lazy"></iframe></div>`;
      }
      html += `<a class="video-link" href="${esc(s.video)}" target="_blank" rel="noopener">Open video in YouTube ↗</a></div>`;
    }
    return html;
  }

  function photoHTML(p) {
    const cap = esc(p.caption || '');
    const src = esc(p.src);
    // data-src loaded via wirePhotos(); missing files fall back to a labeled placeholder.
    // Whole thumb is a button that opens the full-size modal.
    return `<button class="thumb" data-src="${src}" data-cap="${cap}" aria-label="Enlarge photo${cap ? ': ' + cap : ''}">
      <img data-src="${src}" alt="${cap}" loading="lazy" />
      ${cap ? `<span class="thumb-cap">${cap}</span>` : ''}
    </button>`;
  }

  // ---- helpers ----
  function esc(s) {
    return String(s == null ? '' : s)
      .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function linkify(s) {
    return esc(s).replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
  }
  function ytId(url) {
    const m = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
    if (!m) return null;
    const t = url.match(/[?&]t=(\d+)/);
    return { id: m[1], start: t ? t[1] : (url.match(/t=(\d+)s/) ? RegExp.$1 : '') };
  }

  // ---- PWA: service worker + install ----
  function registerSW() {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('./sw.js').then(() => {
        el('offlineDot').classList.add('ready');
        el('footerText').textContent = 'Saved for offline use';
      }).catch(() => {});
    }
  }
  let deferredPrompt = null;
  function setupInstall() {
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault(); deferredPrompt = e;
      el('installBtn').classList.remove('hidden');
    });
    el('installBtn').addEventListener('click', async () => {
      if (!deferredPrompt) return;
      deferredPrompt.prompt();
      await deferredPrompt.userChoice;
      deferredPrompt = null;
      el('installBtn').classList.add('hidden');
    });
    window.addEventListener('appinstalled', () => el('installBtn').classList.add('hidden'));
  }
})();
