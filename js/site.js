/* LusterLux concept homepage
   Every price, variant id and coverage figure below comes from lusterluxauto.com/products.json (pulled 2026-11-14). */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = n => '$' + n.toFixed(2);
  const PAPER = [242, 241, 236];
  const tint = (hex, a = .26) => {
    const n = parseInt(hex.slice(1), 16), c = [n >> 16, (n >> 8) & 255, n & 255];
    return 'rgb(' + c.map((v, i) => Math.round(v * a + PAPER[i] * (1 - a))).join(',') + ')';
  };

  /* ---------------- catalog ---------------- */
  // lux = the part of the name printed in lime on the bottle label
  const BOTTLES = {
    luxfoam:       { lux: 'Lux', rest: 'Foam', job: 'Wash', color: '#7b3fe4', price: 19.99, vid: 59846347259985, img: 'luxfoam-0', photo: 'luxfoam-3',
                     copy: 'Thick foam that clings, loosens grit and rinses clean. Run it through a foam cannon or straight in the bucket.',
                     fact: '8–16 washes per bottle · safe on wax, sealant and ceramic' },
    wheelassassin: { lux: 'Lux', rest: 'WheelAssassin', job: 'Wheels', color: '#c9e012', price: 17.99, vid: 59846363152465, img: 'luxwheelassassin-0', photo: 'luxwheelassassin-4',
                     copy: 'Spray it, let it work, agitate if it needs it, rinse. Brake dust and road grime let go without a fight.',
                     fact: '12–20 vehicles per bottle' },
    luxpro:        { lux: 'Lux', rest: 'Pro', job: 'Hoseless wash', color: '#ff3ea5', price: 19.99, vid: 59846340902993, img: 'luxpro-0', photo: 'luxpro-2',
                     copy: 'Lifts dust, pollen and fingerprints with a spray and a wipe, then leaves a slick layer that keeps dust from settling back in.',
                     fact: '15–30 vehicles per bottle · no hose, no bucket' },
    luxquick:      { lux: 'Lux', rest: 'Quick', job: 'Quick detail', color: '#1fc59a', price: 17.99, vid: 59846342246481, img: 'luxquick-0', photo: 'luxquick-3',
                     copy: 'Fingerprints, smudges and fresh water spots, gone in one pass. The bottle that lives in the glove box.',
                     fact: '15–25 vehicles per bottle' },
    ceramicx:      { lux: '', rest: 'CeramicX', xEnd: true, job: 'Protect', color: '#2aa8e8', price: 27.99, vid: 59846341853265, img: 'ceramicx-0', photo: 'ceramicx-1',
                     copy: 'Spray on, spread, buff off. Water beads and runs, dust lets go easier, and the gloss gets deeper.',
                     fact: '10–20 vehicles per bottle · up to 8 months per coat' },
    tirevenom:     { lux: 'Tire', rest: 'Venom', job: 'Tires', color: '#d9d5cc', price: 22.99, vid: 59846342475857, img: 'tirevenom-0', photo: 'tirevenom-2',
                     copy: 'A deep, rich black that dries to the touch, so it stays on the rubber instead of slinging down your paint.',
                     fact: '30–50 tires per bottle · up to 3 months' },
    restorx:       { lux: '', rest: 'RestorX', xEnd: true, job: 'Trim', color: '#e6d3ad', price: 22.99, vid: 59846342377553, img: 'restorx-0', photo: 'restorx-1',
                     copy: 'Brings faded black plastic, rubber and vinyl back to a factory look, without the oily feel.',
                     fact: '20–40 vehicles per bottle · up to 6 months outside, 8 inside' },
    interiorx:     { lux: '', rest: 'InteriorX', xEnd: true, job: 'Cabin', color: '#ecd534', price: 19.99, vid: 59846363545681, img: 'interiorx-0', photo: 'interiorx-2',
                     copy: 'Dash, doors, console, steering wheel. Clean with no streaks and no greasy shine.',
                     fact: '15–25 vehicles per bottle' },
  };
  const EXTRAS = {
    edgeless:   { name: 'Edgeless Lux towels (3)', price: 15.99, vid: 59846408798289, img: 'acc-edgeless', why: 'Exterior microfiber with no stitched edge to drag across paint.' },
    microlux:   { name: 'MicroLux towels (5)',     price: 15.99, vid: 59846409027665, img: 'acc-microlux', why: 'Interior towels, kept separate from the exterior ones.' },
    xpad:       { name: 'XPad applicators (2)',    price: 15.99, vid: 59481312591953, img: 'acc-xpad',     why: 'Spreads dressing evenly instead of soaking a towel.' },
    wheelbrush: { name: 'Lux Wheel Brush',         price: 18.39, vid: 59481305153617, img: 'acc-wheelbrush', dark: true, why: 'Reaches between spokes and into the barrel.' },
    tirebrush:  { name: 'Lux Tire Brush',          price: 18.99, vid: 59481309806673, img: 'acc-tirebrush', why: 'Scrubs old dressing and browning off the sidewall.' },
    luxdry:     { name: 'LuxDry drying towel',     price: 39.99, vid: 59846363742289, img: 'luxtowel-0',  why: '2 ft × 3 ft, 1300 GSM. Dries the whole car in one pass.' },
    foamsys:    { name: 'Foam Wash System',        price: 79.99, vid: 59835928772689, img: 'acc-foamsys' },
    completesys:{ name: 'Complete Detail System',  price: 59.99, vid: 59835872477265, img: 'acc-completesys' },
  };
  const ORDER = ['luxfoam', 'wheelassassin', 'luxpro', 'luxquick', 'ceramicx', 'tirevenom', 'restorx', 'interiorx'];
  const item = k => BOTTLES[k] ? { ...BOTTLES[k], name: BOTTLES[k].lux + BOTTLES[k].rest } : EXTRAS[k];
  const nameHTML = b => b.xEnd ? `${b.rest.slice(0, -1)}<em>X</em>` : `<em>${b.lux}</em>${b.rest}`;

  /* ---------------- cart ---------------- */
  const KEY = 'llx_cart_v1';
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { cart = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
  const cartEl = $('[data-cart]'), scrim = $('[data-cart-scrim]'), countEl = $('[data-cart-count]');
  function renderCart(bump) {
    const keys = Object.keys(cart).filter(k => cart[k] > 0 && item(k));
    const n = keys.reduce((s, k) => s + cart[k], 0);
    countEl.textContent = n;
    countEl.classList.toggle('has', n > 0);
    if (bump) { countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump'); }
    const lines = $('[data-cart-lines]');
    lines.innerHTML = keys.length ? keys.map(k => {
      const it = item(k);
      return `<li class="cline"><img src="${BOTTLES[k] ? `img/bottles/${k}.png` : `img/p/${it.img}.jpg`}" alt=""><div><b>${it.name}</b>
        <span class="qty"><button type="button" data-q="${k}" data-d="-1" aria-label="Fewer">−</button>${cart[k]}<button type="button" data-q="${k}" data-d="1" aria-label="More">+</button></span></div>
        <span class="px">${money(it.price * cart[k])}</span></li>`;
    }).join('') : '<li class="cart-empty">Nothing in here yet.</li>';
    $('[data-cart-sub]').textContent = money(keys.reduce((s, k) => s + item(k).price * cart[k], 0));
    const co = $('[data-checkout]');
    co.href = keys.length ? 'https://lusterluxauto.com/cart/' + keys.map(k => item(k).vid + ':' + cart[k]).join(',') : '#';
    co.toggleAttribute('aria-disabled', !keys.length);
  }
  let toastT;
  function toast(msg) { const t = $('[data-toast]'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200); }
  function add(keys) {
    [].concat(keys).forEach(k => { cart[k] = (cart[k] || 0) + 1; });
    save(); renderCart(true);
    const ks = [].concat(keys);
    toast(ks.length > 1 ? `${ks.length} items added` : `${item(ks[0]).name} added`);
  }
  function openCart(on) {
    cartEl.classList.toggle('open', on); cartEl.setAttribute('aria-hidden', !on);
    scrim.hidden = !on; document.body.style.overflow = on ? 'hidden' : '';
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-add]'); if (a) add(a.dataset.add.split(','));
    const q = e.target.closest('[data-q]');
    if (q) { const k = q.dataset.q; cart[k] = Math.max(0, (cart[k] || 0) + +q.dataset.d); if (!cart[k]) delete cart[k]; save(); renderCart(); }
    if (e.target.closest('[data-cart-open]')) openCart(true);
    if (e.target.closest('[data-cart-close]') || e.target === scrim) openCart(false);
    const co = e.target.closest('[data-checkout]'); if (co && co.getAttribute('href') === '#') e.preventDefault();
  });
  addEventListener('keydown', e => { if (e.key === 'Escape') openCart(false); });
  renderCart();

  /* ---------------- nav ---------------- */
  const nav = $('.nav');
  const onNav = () => nav.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', onNav, { passive: true }); onNav();

  /* ---------------- hero: the lineup ---------------- */
  (function shelf() {
    const row = $('[data-shelf-row]'), sh = $('[data-shelf]');
    // team-photo arc: the two most-bought bottles in the middle, a touch taller
    const ARC = [['tirevenom', .86], ['wheelassassin', .92], ['luxfoam', .97], ['luxpro', 1.08], ['ceramicx', 1.04], ['luxquick', .97], ['restorx', .92], ['interiorx', .86]];
    row.innerHTML = ARC.map(([k, sc], i) => {
      const b = BOTTLES[k];
      return `<button class="btl" type="button" data-jump="${ORDER.indexOf(k)}" style="--c:${b.color};--s:${sc};--i:${i}" aria-label="${b.lux}${b.rest}, ${b.job}, ${money(b.price)}. See it in the lineup">
        <img src="img/bottles/${k}.png" alt="${b.lux}${b.rest} bottle" width="380" height="1200">
        <span class="btl-tag"><b>${nameHTML(b)}</b><small>${b.job} · ${money(b.price)}</small></span></button>`;
    }).join('');
    const imgs = $$('img', row);
    let n = 0; const go = () => requestAnimationFrame(() => sh.classList.add('in'));
    imgs.forEach(im => (im.complete ? ++n : im.addEventListener('load', () => { if (++n === imgs.length) go(); })));
    if (n === imgs.length) go();
    setTimeout(go, 2500);
  })();

  /* ---------------- dust test ---------------- */
  (function dust() {
    const stage = $('.dust-stage'), cv = $('[data-dust-canvas]'), src = $('[data-dust-img]');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    const dirt = document.createElement('canvas'), dctx = dirt.getContext('2d');
    const probe = document.createElement('canvas'); probe.width = 40; probe.height = 50;
    const pctx = probe.getContext('2d', { willReadFrequently: true });
    let W, H, dpr, ready = false, touched = false, won = false, last = null, pct = 0;

    // fuzzy microfiber cursor
    document.body.insertAdjacentHTML('beforeend', '<svg width="0" height="0" style="position:absolute" aria-hidden="true"><filter id="fuzz"><feTurbulence type="fractalNoise" baseFrequency="1.6" numOctaves="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="7"/></filter></svg><div class="towel-cursor" aria-hidden="true"></div>');
    const towel = $('.towel-cursor');

    function paintDirt() {
      // the dust is the same car, hazed over: washed out, flattened, tan
      dctx.globalCompositeOperation = 'source-over';
      dctx.clearRect(0, 0, W, H);
      if ('filter' in dctx) dctx.filter = 'grayscale(.6) sepia(.55) brightness(1.5) contrast(.42) blur(' + (2 * dpr) + 'px)';
      dctx.drawImage(src, ...cover(src));
      dctx.filter = 'none';
      dctx.fillStyle = 'rgba(201,176,136,.58)'; dctx.fillRect(0, 0, W, H);
      // uneven film: soft lighter and darker drifts
      for (let i = 0; i < 26; i++) {
        const x = Math.random() * W, y = Math.random() * H, r = (60 + Math.random() * 180) * dpr;
        const g = dctx.createRadialGradient(x, y, 0, x, y, r), c = Math.random() > .5 ? '226,206,170' : '150,124,88';
        g.addColorStop(0, `rgba(${c},.28)`); g.addColorStop(1, `rgba(${c},0)`);
        dctx.fillStyle = g; dctx.fillRect(x - r, y - r, r * 2, r * 2);
      }
      // grit
      for (let i = 0; i < W * H / 380; i++) {
        const x = Math.random() * W, y = Math.random() * H, r = Math.random() * 1.6 * dpr + .4;
        dctx.fillStyle = Math.random() > .55 ? 'rgba(240,224,196,.55)' : 'rgba(96,76,50,.38)';
        dctx.fillRect(x, y, r, r);
      }
    }
    function cover(img) {
      const ir = img.naturalWidth / img.naturalHeight, cr = W / H;
      let w = W, h = H, x = 0, y = 0;
      if (ir > cr) { w = H * ir; x = (W - w) / 2; } else { h = W / ir; y = (H - h) / 2; }
      return [x, y, w, h];
    }
    function draw() { ctx.clearRect(0, 0, W, H); ctx.drawImage(src, ...cover(src)); ctx.drawImage(dirt, 0, 0); }
    function size() {
      dpr = Math.min(devicePixelRatio || 1, 2);
      const r = stage.getBoundingClientRect();
      W = cv.width = Math.round(r.width * dpr); H = cv.height = Math.round(r.height * dpr);
      dirt.width = W; dirt.height = H; paintDirt(); draw(); ready = true; pct = 0; won = false; update();
    }
    function wipe(x0, y0, x1, y1) {
      const rad = Math.max(W, H) * .1;
      dctx.globalCompositeOperation = 'destination-out';
      const dist = Math.hypot(x1 - x0, y1 - y0), steps = Math.max(1, dist / (rad * .18));
      for (let i = 0; i <= steps; i++) {
        const x = x0 + (x1 - x0) * i / steps, y = y0 + (y1 - y0) * i / steps;
        const g = dctx.createRadialGradient(x, y, 0, x, y, rad);
        g.addColorStop(0, 'rgba(0,0,0,.2)'); g.addColorStop(.55, 'rgba(0,0,0,.12)'); g.addColorStop(1, 'rgba(0,0,0,0)');
        dctx.fillStyle = g; dctx.beginPath(); dctx.arc(x, y, rad, 0, 7); dctx.fill();
      }
      draw();
    }
    let probeT = 0;
    function update() {
      pctx.clearRect(0, 0, 40, 50); pctx.drawImage(dirt, 0, 0, 40, 50);
      const d = pctx.getImageData(0, 0, 40, 50).data; let clean = 0;
      for (let i = 3; i < d.length; i += 4) if (d[i] < 120) clean++;
      pct = Math.round(clean / 2000 * 100);
      $('[data-dust-bar]').style.width = Math.min(100, pct / .5) + '%';
      $('[data-dust-pct]').textContent = pct + '% clean';
      if (pct >= 50 && !won) {
        won = true;
        $('[data-dust-result]').classList.add('on');
        $('[data-dust-hint]').textContent = 'Spray. Wipe. Done.';
        fadeRest();
      }
    }
    function fadeRest() { // take the last of the dust off in one smooth pass
      let a = 0; const step = () => { a += .08; dctx.globalCompositeOperation = 'destination-out'; dctx.fillStyle = 'rgba(0,0,0,.12)'; dctx.fillRect(0, 0, W, H); draw(); if (a < 1) requestAnimationFrame(step); else update(); };
      requestAnimationFrame(step);
    }
    const pt = e => { const r = cv.getBoundingClientRect(); return [(e.clientX - r.left) * dpr, (e.clientY - r.top) * dpr]; };
    cv.addEventListener('pointerdown', e => { touched = true; last = pt(e); cv.setPointerCapture(e.pointerId); wipe(...last, ...last); });
    cv.addEventListener('pointermove', e => {
      towel.style.left = e.clientX + 'px'; towel.style.top = e.clientY + 'px';
      const p = pt(e);
      if (last || e.pointerType === 'mouse') { touched = true; wipe(...(last || p), ...p); last = p; }
      const now = performance.now(); if (now - probeT > 120) { probeT = now; update(); }
    });
    const end = () => { last = null; update(); };
    cv.addEventListener('pointerup', end); cv.addEventListener('pointercancel', end);
    stage.addEventListener('pointerenter', e => { if (e.pointerType === 'mouse') towel.classList.add('on'); });
    stage.addEventListener('pointerleave', () => { towel.classList.remove('on'); last = null; });

    // one ghost stroke to show what to do, if nobody has touched it
    function ghost() {
      if (touched || reduce) return;
      const t0 = performance.now(), D = 1500; let prev = null;
      const run = now => {
        if (touched) return;
        const k = Math.min(1, (now - t0) / D), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const x = W * (.18 + .64 * e), y = H * (.42 + Math.sin(e * Math.PI * 2) * .07);
        if (prev) wipe(...prev, x, y); prev = [x, y];
        if (k < 1) requestAnimationFrame(run); else update();
      };
      requestAnimationFrame(run);
    }
    const start = () => { if (!ready) size(); };
    if (src.complete && src.naturalWidth) start(); else src.addEventListener('load', start);
    let rT; addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(() => { const r = stage.getBoundingClientRect(); if (Math.abs(r.width * dpr - W) > 40) size(); }, 200); });
    new IntersectionObserver((en, o) => { if (en[0].isIntersecting) { o.disconnect(); setTimeout(ghost, 900); } }, { threshold: .55 }).observe(stage);
  })();

  /* ---------------- color code ---------------- */
  (function code() {
    const sec = $('.code'), track = $('[data-code]'), rail = $('[data-code-rail]');
    const label = $('[data-code-label]'), bimg = $('[data-code-img]'), photo = $('[data-code-photo]');
    rail.innerHTML = ORDER.map((k, i) => `<li><button type="button" data-i="${i}" style="--dot:${BOTTLES[k].color}"><i></i>${BOTTLES[k].job}</button></li>`).join('');
    
    let idx = -1;
    function show(i) {
      if (i === idx) return; idx = i;
      const k = ORDER[i], b = BOTTLES[k];
      sec.style.setProperty('--c', b.color); sec.style.setProperty('--tint', tint(b.color));
      label.classList.remove('swap'); void label.offsetWidth; label.classList.add('swap');
      label.innerHTML = `<p class="lbl-step"><span>${String(i + 1).padStart(2, '0')} / 08</span></p>
        <h3 class="lbl-name">${nameHTML(b)}</h3><p class="lbl-job">${b.job}</p><p class="lbl-copy">${b.copy}</p>`;
      bimg.classList.add('out');
      setTimeout(() => { bimg.src = `img/bottles/${k}.png`; bimg.alt = `${b.lux}${b.rest} bottle`; bimg.classList.remove('out'); }, 220);
      photo.src = `img/p/${b.photo}.jpg`; photo.alt = `${b.lux}${b.rest} in use`;
      $('[data-code-fact]').textContent = b.fact;
      $('[data-code-price]').textContent = money(b.price);
      $('[data-code-add]').dataset.add = k;
      $$('button', rail).forEach((x, j) => x.classList.toggle('is-on', j === i));
      const on = $('button.is-on', rail); if (on && innerWidth < 860) rail.scrollTo({ left: on.offsetLeft - 16, behavior: 'smooth' });
    }
    function onScroll() {
      const r = track.getBoundingClientRect(), span = r.height - innerHeight;
      const p = Math.min(.9999, Math.max(0, -r.top / span));
      show(Math.floor(p * ORDER.length));
    }
    const jump = i => { const span = track.offsetHeight - innerHeight; scrollTo({ top: track.getBoundingClientRect().top + scrollY + span * (i + .5) / ORDER.length, behavior: reduce ? 'auto' : 'smooth' }); };
    rail.addEventListener('click', e => { const b = e.target.closest('button'); if (b) jump(+b.dataset.i); });
    document.addEventListener('click', e => { const b = e.target.closest('[data-jump]'); if (b) jump(+b.dataset.jump); });
    addEventListener('scroll', onScroll, { passive: true }); addEventListener('resize', onScroll); onScroll();
  })();

  /* ---------------- filmstrip parallax ---------------- */
  (function film() {
    const f = $('[data-film]'); if (!f || reduce) return;
    const cols = $$('.film-col', f);
    let on = false;
    new IntersectionObserver(en => { on = en[0].isIntersecting; }).observe(f);
    const tick = () => {
      if (on) { const r = f.getBoundingClientRect(), c = r.top + r.height / 2 - innerHeight / 2; cols.forEach(col => col.style.transform = `translate3d(0,${c * +col.dataset.speed}px,0)`); }
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  })();

  /* ---------------- routine builder ---------------- */
  (function routine() {
    const R = [
      { label: 'Desert daily driver', items: ['luxpro', 'luxquick', 'interiorx', 'edgeless'],
        blurb: 'Dust between washes and no hose at home. Keep this in the trunk and the car stays clean all week.' },
      { label: 'Full wash weekend', items: ['luxfoam', 'wheelassassin', 'luxdry', 'tirevenom', 'ceramicx'], system: 'foamsys',
        blurb: 'The whole Saturday: wheels first so nothing splashes onto clean paint, then foam, dry, dress and protect.' },
      { label: 'Wheels & tires', items: ['wheelassassin', 'wheelbrush', 'tirebrush', 'tirevenom', 'xpad'],
        blurb: 'Brake dust out, deep black back in. The brushes reach the barrel and the sidewall so the sprays can do their job.' },
      { label: 'The inside', items: ['interiorx', 'restorx', 'microlux', 'xpad'], system: 'completesys',
        blurb: 'Dash, doors, console and trim. Clean first, then dress, with interior towels that never touch the paint.' },
    ];
    const SYS = {
      foamsys: { what: 'LuxCannon foam cannon + 2 bottles of LuxFoam.', separate: 89.97, add: 'foamsys' },
      completesys: { what: 'LuxPro, RestorX, InteriorX, 3 Edgeless + 5 MicroLux towels and an XPad.', separate: 110.94, add: 'completesys', note: ' (XPads are sold in 2-packs)' },
    };
    const tabs = $('[data-routine-tabs]'), list = $('[data-routine-list]');
    let r = 0, off = new Set();
    tabs.innerHTML = R.map((x, i) => `<button role="tab" type="button" data-r="${i}" aria-selected="${i === 0}"><span>${x.label}</span></button>`).join('');
    function render() {
      const rt = R[r];
      list.innerHTML = rt.items.map(k => {
        const it = item(k), b = BOTTLES[k];
        const title = b ? nameHTML(b) : it.name;
        const why = b ? `${b.job}. ${b.copy.split('. ')[0].replace(/\.$/, '')}.` : it.why;
        const bg = it.dark ? '#0a0a0b' : (b ? tint(b.color, .3) : '#f1f0eb');
        return `<li class="rline${off.has(k) ? ' off' : ''}" style="--tint:${bg}">
          <span class="rline-img"><img src="${b ? `img/bottles/${k}.png` : `img/p/${it.img}.jpg`}" alt="" loading="lazy" style="${it.dark || b ? 'mix-blend-mode:normal' : ''}"></span>
          <div><h4>${title}</h4><p>${why}</p></div>
          <span class="rline-px">${money(it.price)}</span>
          <button class="rline-tog" type="button" data-tog="${k}" aria-pressed="${!off.has(k)}" aria-label="${off.has(k) ? 'Include' : 'Remove'} ${it.name}">✓</button></li>`;
      }).join('');
      const on = rt.items.filter(k => !off.has(k));
      $('[data-routine-total]').textContent = money(on.reduce((s, k) => s + item(k).price, 0));
      $('[data-routine-blurb]').textContent = rt.blurb;
      const btn = $('[data-routine-add]');
      btn.firstElementChild.textContent = on.length ? `Add ${on.length} to cart` : 'Pick something';
      btn.disabled = !on.length; btn.dataset.add = on.join(',');
      const sys = rt.system && SYS[rt.system], sysEl = $('[data-routine-system]');
      sysEl.innerHTML = sys ? `<div class="sys"><img src="img/p/${EXTRAS[rt.system].img}.jpg" alt="">
        <div><b>Or grab the ${EXTRAS[rt.system].name} · ${money(EXTRAS[rt.system].price)}</b>
        <p>${sys.what} The same items bought separately run ${money(sys.separate)}${sys.note || ''}.</p>
        <button type="button" data-add="${sys.add}">Add the system</button></div></div>` : '';
    }
    tabs.addEventListener('click', e => {
      const b = e.target.closest('[data-r]'); if (!b) return;
      r = +b.dataset.r; off = new Set();
      $$('button', tabs).forEach(x => x.setAttribute('aria-selected', x === b));
      render();
    });
    list.addEventListener('click', e => {
      const t = e.target.closest('[data-tog]'); if (!t) return;
      const k = t.dataset.tog; off.has(k) ? off.delete(k) : off.add(k); render();
    });
    render();
  })();

  /* ---------------- goodguys: auto-expire + calendar file ---------------- */
  (function show() {
    const s = $('#show'); if (!s) return;
    if (Date.now() > Date.parse(s.dataset.showUntil)) { s.remove(); return; }
    const ics = ['BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//LusterLux//Goodguys//EN', 'BEGIN:VEVENT',
      'UID:lusterlux-goodguys-2026@lusterluxauto.com', 'DTSTAMP:20261114T000000Z',
      'DTSTART;VALUE=DATE:20261120', 'DTEND;VALUE=DATE:20261123',
      'SUMMARY:LusterLux at Goodguys Southwest Nationals',
      'LOCATION:WestWorld of Scottsdale\\, Scottsdale\\, AZ',
      'DESCRIPTION:Stop by the LusterLux booth at the 29th Speedway Motors Southwest Nationals.',
      'END:VEVENT', 'END:VCALENDAR'].join('\r\n');
    $('[data-ics]').href = 'data:text/calendar;charset=utf-8,' + encodeURIComponent(ics);
  })();

  /* ---------------- reveals ---------------- */
  const rv = $$('.dust-copy, .code-head, .real-head, .routine-head, .routine-tabs, .routine-body, .guys-copy, .phones, .ticket, .foot-word');
  rv.forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .15 });
  rv.forEach(el => io.observe(el));
  window.LLreveal = () => rv.forEach(el => el.classList.add('in'));
})();
