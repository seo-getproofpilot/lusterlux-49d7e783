/* LusterLux concept homepage
   Every price, variant id, coverage figure, durability claim and kit content below comes from
   lusterluxauto.com/products.json (pulled 2026-11-14). Reviews are their real Judge.me reviews. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = n => '$' + n.toFixed(2);
  const D = window.LLD || {};
  const ARROW = '<svg viewBox="0 0 24 24"><path d="M7 17L17 7M9 7h8v8"/></svg>';

  /* ================= CATALOG =================
     step: where it sits in a wash · easy: forgiving enough for a first wash · parts: what a kit contains (loose SKUs) */
  const STEPS = ['Kit', 'Wash', 'Wheels & tires', 'Dry', 'Protect & glass', 'Dress & trim', 'Interior'];
  const C = {
    luxpro:        { n: 'LuxPro', h: '<em>Lux</em>Pro', price: 19.99, vid: 59846340902993, step: 1, easy: 1, what: 'Cleans dust, pollen and fingerprints with no water at all. Leaves a slick, dust-repelling layer.' },
    luxfoam:       { n: 'LuxFoam', h: '<em>Lux</em>Foam', price: 19.99, vid: 59846347259985, step: 1, easy: 1, what: 'Thick foam soap for a foam cannon, the FoamX or a plain bucket. Safe on wax and ceramic.' },
    luxcannon:     { n: 'LuxCannon', price: 49.99, vid: 59481229787217, step: 1, what: 'Turns LuxFoam into clinging foam. Screws onto a pressure washer.' },
    foamx:         { n: 'FoamX Sprayer', price: 31.99, vid: 59621805490257, step: 1, easy: 1, what: 'Cordless, rechargeable foam sprayer. Thick foam with no pressure washer.' },
    luxgun:        { n: 'LuxGun', price: 49.99, vid: 59481217892433, step: 1, what: 'Ergonomic pressure washer gun with quick-connect fittings. Less hand fatigue on long washes.' },
    luxmit:        { n: 'LuxMit', price: 19.19, vid: 59481254821969, step: 1, easy: 1, what: 'Microfiber wash mitt that pulls grit into the fibers instead of dragging it across paint.' },
    luxbucket:     { n: 'LuxBucket', price: 14.99, vid: 59621744214097, step: 1, easy: 1, what: 'Heavy-duty wash bucket for mixing soap and rinsing your mitt.' },
    luxbug:        { n: 'LuxBug sponge', price: 11.99, vid: 59481314820177, step: 1, easy: 1, what: 'Bug and tar sponge. Lifts splatter, tar and sap without scratching paint.' },
    luxdry:        { n: 'LuxDry towel', price: 39.99, vid: 59846363742289, step: 3, easy: 1, what: '2 × 3 ft, 1300 GSM drying towel. Dries the whole car in fewer passes, without water spots.' },
    edgeless:      { n: 'Edgeless Lux towels (3)', price: 15.99, vid: 59846408798289, step: 4, easy: 1, what: 'Exterior microfiber with no stitched edge to drag across paint. For LuxPro, LuxQuick and CeramicX.' },
    microlux:      { n: 'MicroLux towels (5)', price: 15.99, vid: 59846409027665, step: 6, easy: 1, what: 'Interior towels, kept apart from the exterior ones so nothing greasy touches paint.' },
    luxwindow:     { n: 'LuxWindow towels (2)', price: 11.99, vid: 59846405292113, step: 4, easy: 1, what: 'Waffle-weave glass towels. Streak-free, lint-free windows and mirrors.' },
    wheelassassin: { n: 'LuxWheelAssassin', h: '<em>Lux</em>WheelAssassin', price: 17.99, vid: 59846363152465, step: 2, easy: 1, what: 'Spray it, let it sit, rinse. Breaks down brake dust and road grime on any wheel.' },
    tirevenom:     { n: 'TireVenom', h: '<em>Tire</em>Venom', price: 22.99, vid: 59846342475857, step: 5, easy: 1, what: 'Deep black tire finish that dries to the touch, so it won’t sling. Up to 3 months.' },
    wheelbrush:    { n: 'Lux Wheel Brush', price: 18.39, vid: 59481305153617, step: 2, what: 'Long brush that reaches between spokes and into the wheel barrel.' },
    tirebrush:     { n: 'Lux Tire Brush', price: 18.99, vid: 59481309806673, step: 2, what: 'Stiff brush that scrubs old dressing and browning off the sidewall.' },
    xpad:          { n: 'XPad applicators (2)', price: 15.99, vid: 59481312591953, img: 'img/p/acc-xpad.jpg', step: 5, easy: 1, what: 'Applies TireVenom and RestorX evenly instead of soaking a towel.' },
    ceramicx:      { n: 'CeramicX', h: 'Ceramic<em>X</em>', price: 27.99, vid: 59846341853265, step: 4, what: 'Spray-on ceramic layer. Water beads, gloss deepens, up to 8 months per coat.' },
    luxquick:      { n: 'LuxQuick', h: '<em>Lux</em>Quick', price: 17.99, vid: 59846342246481, step: 4, easy: 1, what: 'Wipes off fingerprints, smudges and fresh water spots between washes, and adds gloss.' },
    interiorx:     { n: 'InteriorX', h: 'Interior<em>X</em>', price: 19.99, vid: 59846363545681, step: 6, easy: 1, what: 'Dash, doors, console, steering wheel and seats. Clean, with no streaks or greasy shine.' },
    restorx:       { n: 'RestorX', h: 'Restor<em>X</em>', price: 22.99, vid: 59846342377553, step: 5, easy: 1, what: 'Brings faded black trim, rubber and vinyl back. Up to 6 months outside, 8 inside.' },
    newcarember:   { n: 'NewCarEmber', price: 11.99, vid: 59846345031761, step: 6, easy: 1, what: 'New-car scent spray, 8 oz. Kills odors without being overpowering.' },
    vanillaember:  { n: 'VanillaEmber', price: 11.99, vid: 59846344245329, step: 6, easy: 1, what: 'Warm vanilla scent spray, 8 oz. Kills odors without being overpowering.' },
    luxbrush:      { n: 'Lux Brush', price: 23.99, vid: 59481298763857, step: 6, what: 'Soft curved brush for vents, seams, buttons and stitching.' },
    // systems: contents and savings are straight from their listings and prices
    essentials:    { n: 'Essentials Kit', kit: 1, price: 39.99, vid: 62697809150033, img: 'img/p/acc-essentials.webp', easy: 1, parts: ['luxpro', 'interiorx', 'tirevenom'], inc: ['LuxPro (16 oz)', 'InteriorX (16 oz)', 'TireVenom (16 oz)', '3 interior microfiber towels', '2 Edgeless towels', 'Finger-slot applicator pad'], what: 'LuxPro, InteriorX and TireVenom, plus 5 towels and an applicator pad.', save: 'The 3 bottles alone are $62.97' },
    waterlesssys:  { n: 'Waterless Detail System', kit: 1, price: 25.99, vid: 59835938078801, img: 'img/p/acc-waterlesssys.webp', easy: 1, parts: ['luxpro', 'edgeless'], inc: ['LuxPro (16 oz)', '3 Edgeless Lux towels'], what: 'LuxPro plus 3 Edgeless towels. Everything for a wash with no hose.', save: 'Saves $9.99' },
    tirecaresys:   { n: 'Tire Care System', kit: 1, price: 29.99, vid: 59835923595345, img: 'img/p/acc-tirecaresys.webp', easy: 1, parts: ['tirevenom', 'xpad'], inc: ['TireVenom (16 oz)', '2 XPad applicator pads'], what: 'TireVenom plus 2 XPad applicators.', save: 'Saves $8.99' },
    dualscent:     { n: 'Dual Scent System', kit: 1, price: 19.99, vid: 59835933229137, img: 'img/p/acc-dualscent.webp', easy: 1, parts: ['newcarember', 'vanillaember'], inc: ['NewCarEmber (8 oz)', 'VanillaEmber (8 oz)'], what: 'Both scents: NewCarEmber and VanillaEmber.', save: 'Saves $3.99' },
    interiorsys:   { n: 'Interior Restoration System', kit: 1, price: 45.99, vid: 59835937390673, img: 'img/p/acc-interiorsys.webp', easy: 1, parts: ['interiorx', 'restorx', 'microlux'], inc: ['InteriorX (16 oz)', 'RestorX (16 oz)', '5 MicroLux interior towels'], what: 'InteriorX, RestorX and 5 MicroLux towels. Clean the cabin, then bring the trim back.', save: 'Saves $12.98' },
    completesys:   { n: 'Complete Detail System', kit: 1, price: 59.99, vid: 59835872477265, img: 'img/p/acc-completesys.jpg', easy: 1, parts: ['luxpro', 'restorx', 'interiorx', 'edgeless', 'microlux'], inc: ['LuxPro (16 oz)', 'RestorX (16 oz)', 'InteriorX (16 oz)', '3 Edgeless towels', '5 MicroLux towels', '1 XPad applicator'], what: 'LuxPro, RestorX, InteriorX, 8 towels and an XPad. Inside and out, no hose.', save: 'Saves $34.96, plus an XPad' },
    paintsys:      { n: 'Paint Care System', kit: 1, price: 72.99, vid: 59835922219089, img: 'img/p/acc-paintsys.webp', parts: ['luxpro', 'luxquick', 'ceramicx', 'edgeless'], inc: ['LuxPro (16 oz)', 'LuxQuick (16 oz)', 'CeramicX (16 oz)', '3 Edgeless towels'], what: 'LuxPro, LuxQuick and CeramicX plus 3 Edgeless towels. Clean, shine, protect.', save: 'Saves $8.97' },
    completeinteriorsys: { n: 'Complete Interior System', kit: 1, price: 74.99, vid: 59835935588433, img: 'img/p/acc-completeinteriorsys.webp', parts: ['interiorx', 'luxbrush', 'microlux', 'newcarember', 'vanillaember'], inc: ['InteriorX (16 oz)', 'Lux Brush', 'Lux Brush holder', '5 MicroLux towels', 'NewCarEmber', 'VanillaEmber'], what: 'InteriorX, the Lux Brush and holder, 5 towels and both scents.', save: 'Saves $8.96, brush holder included' },
    foamsys:       { n: 'Foam Wash System', kit: 1, price: 79.99, vid: 59835928772689, img: 'img/p/acc-foamsys.jpg', parts: ['luxcannon', 'luxfoam', 'luxfoam'], inc: ['LuxCannon foam cannon', '2 × LuxFoam (16 oz)'], what: 'LuxCannon plus 2 bottles of LuxFoam. Needs a pressure washer.', save: 'Saves $9.98' },
    toweltantrum:  { n: 'Towel Tantrum Kit', kit: 1, price: 83.99, vid: 59518136352849, img: 'img/p/acc-toweltantrum.webp', easy: 1, parts: ['luxdry', 'edgeless', 'microlux', 'luxwindow'], inc: ['LuxDry drying towel', '3 Edgeless towels', '5 MicroLux towels', '2 LuxWindow towels'], what: 'One of every towel: drying, paint, interior and glass.', save: 'Every towel type in one box' },
    rimtiresys:    { n: 'Rim & Tire System', kit: 1, price: 85.99, vid: 59835924316241, img: 'img/p/acc-rimtiresys.webp', parts: ['wheelassassin', 'tirevenom', 'wheelbrush', 'tirebrush', 'xpad'], inc: ['LuxWheelAssassin (16 oz)', 'TireVenom (16 oz)', 'Lux Wheel Brush', 'Lux Tire Brush', '2 XPad applicators'], what: 'LuxWheelAssassin, TireVenom, both brushes and 2 XPads.', save: 'Saves $8.36' },
    ultimatesys:   { n: 'Ultimate Wash System', kit: 1, price: 124.99, vid: 59835930509393, img: 'img/p/acc-ultimatesys.webp', parts: ['luxgun', 'luxcannon', 'luxfoam', 'luxdry'], inc: ['LuxGun pressure washer gun', 'LuxCannon foam cannon', 'LuxFoam (16 oz)', 'LuxDry drying towel', '5 quick-connect nozzles', 'Quick-connect coupler'], what: 'LuxGun, LuxCannon, LuxFoam, LuxDry, 5 quick-connect nozzles and a coupler.', save: 'Saves $34.97, nozzles included' },
  };
  const BOTTLES = ['luxpro', 'luxfoam', 'wheelassassin', 'tirevenom', 'ceramicx', 'luxquick', 'interiorx', 'restorx'];
  const KITS = Object.keys(C).filter(k => C[k].kit);
  // real in-use photo for every single product; kits and XPad only exist as studio shots
  const img = k => C[k].img || `img/real/${k}.webp`;
  const isPhoto = k => !C[k].img || C[k].kit;
  const nameHTML = k => C[k].h ? `<span class="lbl">${C[k].h}</span>` : `<span class="plain">${C[k].n}</span>`;
  const sum = ks => ks.reduce((s, k) => s + C[k].price, 0);

  /* ================= CART (with their free-shipping line: orders $49+) ================= */
  const KEY = 'llx_cart_v1', FREE = 49;
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { cart = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
  const cartEl = $('[data-cart]'), scrim = $('[data-cart-scrim]'), countEl = $('[data-cart-count]');
  const permalink = obj => 'https://lusterluxauto.com/cart/' + Object.keys(obj).map(k => C[k].vid + ':' + obj[k]).join(',');
  function renderCart(bump) {
    Object.keys(cart).forEach(k => { if (!C[k] || cart[k] <= 0) delete cart[k]; });
    const keys = Object.keys(cart), n = keys.reduce((s, k) => s + cart[k], 0), sub = keys.reduce((s, k) => s + C[k].price * cart[k], 0);
    countEl.textContent = n; countEl.classList.toggle('has', n > 0);
    if (bump) { countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump'); }
    $('[data-cart-lines]').innerHTML = keys.length ? keys.map(k => `<li class="cline"><img class="${isPhoto(k) ? 'is-photo' : ''}" src="${img(k)}" alt=""><div><b>${C[k].n}</b>
        <span class="qty"><button type="button" data-q="${k}" data-d="-1" aria-label="Fewer">−</button>${cart[k]}<button type="button" data-q="${k}" data-d="1" aria-label="More">+</button></span></div>
        <span class="px">${money(C[k].price * cart[k])}</span></li>`).join('') : '<li class="cart-empty">Nothing in here yet.</li>';
    $('[data-cart-sub]').textContent = money(sub);
    const ship = $('[data-ship]');
    if (ship) { ship.innerHTML = !n ? '' : sub >= FREE ? '<b>Free shipping</b> unlocked' : `<b>${money(FREE - sub)}</b> away from free shipping`; ship.style.setProperty('--p', Math.min(1, sub / FREE)); ship.hidden = !n; }
    const co = $('[data-checkout]');
    co.href = keys.length ? permalink(cart) : '#';
    co.toggleAttribute('aria-disabled', !keys.length);
  }
  let toastT;
  function toast(msg) { const t = $('[data-toast]'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200); }
  function add(keys, qty = 1) {
    keys = [].concat(keys).filter(k => C[k]);
    keys.forEach(k => { cart[k] = (cart[k] || 0) + qty; });
    save(); renderCart(true);
    toast(keys.length > 1 ? `${keys.length} items added` : `${C[keys[0]].n}${qty > 1 ? ' × ' + qty : ''} added`);
  }
  function openCart(on) {
    cartEl.classList.toggle('open', on); cartEl.setAttribute('aria-hidden', !on);
    scrim.hidden = !on; document.body.style.overflow = on ? 'hidden' : '';
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-add]'); if (a && a.dataset.add) add(a.dataset.add.split(','), +(a.dataset.qty || 1));
    const q = e.target.closest('[data-q]');
    if (q) { const k = q.dataset.q; cart[k] = Math.max(0, (cart[k] || 0) + +q.dataset.d); save(); renderCart(); }
    if (e.target.closest('[data-cart-open]')) openCart(true);
    if (e.target.closest('[data-cart-close]') || e.target === scrim) openCart(false);
    const co = e.target.closest('[data-checkout]'); if (co && co.getAttribute('href') === '#') e.preventDefault();
    const o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); openProduct(o.dataset.open); }
  });
  renderCart();

  /* ================= PRODUCT PANEL: the full story, like a product page ================= */
  const pm = $('[data-pm]'), pmBody = $('[data-pm-body]');
  let lastFocus = null;
  function openProduct(k) {
    const it = C[k], d = D[k] || {};
    if (!it || !pm) return;
    if (pm.hidden) lastFocus = document.activeElement;
    const pics = [img(k)].concat(BOTTLES.includes(k) ? [`img/cut/${k}.webp`] : []);
    const facts = [d.coverage, d.lasts].filter(Boolean);
    const incLine = (x, i) => { const pk = it.parts && it.parts[i]; return pk && C[pk] && x.toLowerCase().startsWith(C[pk].n.split(' ')[0].toLowerCase().slice(0, 5)) ? `<button type="button" data-open="${pk}">${x}</button>` : x; };
    pmBody.innerHTML = `
      <div class="pm-media">
        <div class="pm-main is-photo"><img src="${pics[0]}" alt="${it.n}" data-pm-main></div>
        ${pics.length > 1 ? `<div class="pm-thumbs">${pics.map((p, i) => `<button type="button" data-pm-pic="${p}" class="${i ? 'is-cut' : 'is-on'}" aria-label="${i ? 'Studio shot' : 'In use'}"><img src="${p}" alt=""></button>`).join('')}</div>` : ''}
      </div>
      <div class="pm-info">
        <p class="pm-step">${it.kit ? 'System' : `Step ${it.step} · ${STEPS[it.step]}`}${it.easy ? '<span class="pm-easy">Easy for beginners</span>' : ''}</p>
        <h3 id="pm-h">${nameHTML(k)}</h3>
        <p class="pm-px">${money(it.price)}${it.save ? `<span>${it.save}</span>` : ''}</p>
        <p class="pm-what">${it.what}</p>
        <div class="pm-buy">
          <div class="pm-qty"><button type="button" data-pmq="-1" aria-label="Fewer">−</button><span data-pm-qty>1</span><button type="button" data-pmq="1" aria-label="More">+</button></div>
          <button class="btn" type="button" data-add="${k}" data-qty="1" data-pm-add><span>Add to cart</span><i class="btn-ic" aria-hidden="true">${ARROW}</i></button>
        </div>
        ${it.inc ? `<div class="pm-block"><h4>In the box</h4><ul class="pm-inc">${it.inc.map((x, i) => `<li>${incLine(x, i)}</li>`).join('')}</ul></div>` : ''}
        ${d.use ? `<div class="pm-block"><h4>How to use it</h4><p>${d.use}</p></div>` : ''}
        ${d.bullets && d.bullets.length ? `<div class="pm-block"><h4>What it does</h4><ul class="pm-list">${d.bullets.map(b => `<li>${b}</li>`).join('')}</ul></div>` : ''}
        ${facts.length ? `<div class="pm-block"><h4>How far it goes</h4>${facts.map(f => `<p>${f}</p>`).join('')}</div>` : ''}
        ${d.url ? `<a class="pm-link" href="${d.url}" target="_blank" rel="noopener">See it on lusterluxauto.com →</a>` : ''}
      </div>`;
    pmBody.scrollTop = 0;
    pm.hidden = false; requestAnimationFrame(() => pm.classList.add('open'));
    document.body.style.overflow = 'hidden';
    $('[data-pm-close]').focus({ preventScroll: true });
  }
  function closeProduct() {
    pm.classList.remove('open'); document.body.style.overflow = '';
    setTimeout(() => { pm.hidden = true; }, reduce ? 0 : 300);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  if (pm) {
    pm.addEventListener('click', e => {
      if (e.target === pm || e.target.closest('[data-pm-close]')) closeProduct();
      const t = e.target.closest('[data-pm-pic]');
      if (t) { $('[data-pm-main]').src = t.dataset.pmPic; $('.pm-main').classList.toggle('is-photo', !t.classList.contains('is-cut')); $$('[data-pm-pic]').forEach(x => x.classList.toggle('is-on', x === t)); }
      const q = e.target.closest('[data-pmq]');
      if (q) { const el = $('[data-pm-qty]'), v = Math.max(1, +el.textContent + +q.dataset.pmq); el.textContent = v; $('[data-pm-add]').dataset.qty = v; }
      if (e.target.closest('[data-pm-add]')) setTimeout(closeProduct, 250);
    });
  }
  addEventListener('keydown', e => { if (e.key !== 'Escape') return; if (pm && !pm.hidden) closeProduct(); else openCart(false); });

  /* ================= NAV + button arrows ================= */
  const nav = $('.nav');
  const onNav = () => nav.classList.toggle('is-solid', scrollY > 40);
  addEventListener('scroll', onNav, { passive: true }); onNav();
  $$('.btn[data-arrow]').forEach(b => b.insertAdjacentHTML('beforeend', `<i class="btn-ic" aria-hidden="true">${ARROW}</i>`));

  /* ================= HERO: a waving hex sheet behind the copy + their products on real cars ================= */
  (function hero() {
    const cv = $('[data-hex]');
    if (cv) {
      const ctx = cv.getContext('2d');
      let W = 0, H = 0, raf = 0, on = false, grad;
      const size = () => {
        const r = cv.getBoundingClientRect(), dpr = Math.min(devicePixelRatio || 1, 2);
        W = r.width; H = r.height; cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        grad = ctx.createLinearGradient(0, H, W * .7, 0);
        grad.addColorStop(0, '#8bc303'); grad.addColorStop(.55, '#39d1fd'); grad.addColorStop(1, '#8bc303');
      };
      const wave = (x, y, t) => Math.sin(x * .0055 + t * .8) * Math.cos(y * .0075 - t * .55) + .55 * Math.sin((x * .6 + y) * .0045 + t * 1.15);
      const S = 28, HW = Math.sqrt(3) * S, VH = 1.5 * S, A = [0, 1, 2, 3, 4, 5].map(i => Math.PI / 180 * (60 * i - 30));
      function frame(ms) {
        const t = ms * .001;
        ctx.clearRect(0, 0, W, H);
        const cols = Math.ceil(W / HW) + 3, rows = Math.ceil(H / VH) + 4, NB = 8;
        const lines = Array.from({ length: NB }, () => new Path2D()), fills = Array.from({ length: NB }, () => new Path2D());
        const P = (x, y) => { const z = wave(x, y, t), k = .78 + .34 * (y / H); return [W * .32 + (x - W * .32) * k + z * 7, y - z * 26]; };
        for (let r = -3; r < rows; r++) for (let c = -2; c < cols; c++) {
          const cx = c * HW + (r & 1 ? HW / 2 : 0), cy = r * VH;
          const b = Math.max(0, Math.min(NB - 1, Math.floor((wave(cx, cy, t) + 1.55) / 3.1 * NB)));
          A.forEach((a, i) => {
            const p = P(cx + Math.cos(a) * S * .94, cy + Math.sin(a) * S * .94);
            i ? (lines[b].lineTo(p[0], p[1]), fills[b].lineTo(p[0], p[1])) : (lines[b].moveTo(p[0], p[1]), fills[b].moveTo(p[0], p[1]));
          });
          lines[b].closePath(); fills[b].closePath();
        }
        ctx.lineWidth = 1.1; ctx.strokeStyle = grad; ctx.fillStyle = grad;
        for (let b = 0; b < NB; b++) {
          const v = b / (NB - 1);
          if (v > .62) { ctx.globalAlpha = (v - .62) * .32; ctx.fill(fills[b]); }
          ctx.globalAlpha = .05 + v * v * .55; ctx.stroke(lines[b]);
        }
        ctx.globalAlpha = 1;
        raf = on && !reduce ? requestAnimationFrame(frame) : 0;
      }
      size(); frame(0);
      addEventListener('resize', () => { size(); if (!raf) frame(performance.now()); });
      new IntersectionObserver(([e]) => { on = e.isIntersecting; if (on && !raf && !reduce) raf = requestAnimationFrame(frame); }).observe(cv);
    }
    const slides = $$('[data-slide]'), segs = $('[data-segs]'), label = $('[data-slide-name]');
    if (!slides.length || !segs) return;
    segs.innerHTML = slides.map((s, i) => `<button type="button" data-go="${i}" aria-label="Show ${s.dataset.name}"><i></i></button>`).join('');
    let si = 0, timer;
    function go(i) {
      si = (i + slides.length) % slides.length;
      slides.forEach((s, j) => s.classList.toggle('is-on', j === si));
      $$('button', segs).forEach((b, j) => { b.classList.toggle('is-on', j === si); b.classList.toggle('is-past', j < si); });
      label.textContent = slides[si].dataset.name;
      const nx = slides[(si + 1) % slides.length].querySelector('img'); if (nx.loading === 'lazy') nx.loading = 'eager';
      clearTimeout(timer); if (!reduce) timer = setTimeout(() => go(si + 1), 4800);
    }
    segs.addEventListener('click', e => { const b = e.target.closest('[data-go]'); if (b) go(+b.dataset.go); });
    go(0);
  })();

  /* ================= BUNDLE MATH =================
     1. Swap loose items for a system whenever the system costs no more than the items it replaces
        (the extras come free). Greedy by biggest saving.
     2. Then look for one step-up: a system that adds products for less than those extras cost alone. */
  function bundle(loose, allowed) {
    let items = loose.slice(); const swaps = [];
    for (;;) {
      let best = null;
      for (const K of KITS) {
        const pool = items.slice(), cov = [];
        C[K].parts.forEach(p => { const i = pool.indexOf(p); if (i >= 0) { cov.push(p); pool.splice(i, 1); } });
        if (cov.length < 2) continue;
        const gain = sum(cov) - C[K].price;
        if (gain >= -0.05 && (!best || gain > best.gain)) best = { K, cov, gain };
      }
      if (!best) break;
      best.cov.forEach(p => items.splice(items.indexOf(p), 1));
      items.unshift(best.K); swaps.push(best);
    }
    let up = null;
    for (const K of KITS) {
      if (items.includes(K)) continue;
      const parts = C[K].parts, inside = items.filter(e => (C[e].parts || [e]).every(p => parts.includes(p)));
      if (!inside.length) continue;
      const extras = parts.slice();
      inside.flatMap(e => C[e].parts || [e]).forEach(p => { const i = extras.indexOf(p); if (i >= 0) extras.splice(i, 1); });
      // never offer something already in the package, or something off-topic for this answer
      const owned = items.filter(e => !inside.includes(e)).flatMap(e => C[e].parts || [e]);
      if (!extras.length || extras.some(x => owned.includes(x)) || (allowed && extras.some(x => !allowed.has(x)))) continue;
      const more = C[K].price - sum(inside), extraVal = sum(extras);
      if (more > 0 && more < extraVal - .5 && more <= 40 && (!up || extraVal - more > up.extraVal - up.more)) up = { K, inside, extras, more, extraVal };
    }
    return { items, swaps, up };
  }

  /* ================= QUIZ: three taps, then their aisle in the shop =================
     - EXPERIENCE sets how many steps. Beginners get spray-and-wipe bottles; CeramicX waits until washing is routine.
     - VEHICLE sets the surfaces. UTV/ATV are mostly plastic, so RestorX comes along; ATVs have no cabin.
       Boats get cockpit products only: LusterLux lists its boat cleaners as coming soon.
     - GOAL sets the aisle. Lists are loose products; bundle() then swaps in any system that's cheaper. */
  const ICON = {
    b: '<svg viewBox="0 0 48 48"><rect class="f" x="8" y="28" width="8" height="12" rx="1.5"/><rect class="f o" x="20" y="18" width="8" height="22" rx="1.5"/><rect class="f o" x="32" y="8" width="8" height="32" rx="1.5"/></svg>',
    i: '<svg viewBox="0 0 48 48"><rect class="f" x="8" y="28" width="8" height="12" rx="1.5"/><rect class="f" x="20" y="18" width="8" height="22" rx="1.5"/><rect class="f o" x="32" y="8" width="8" height="32" rx="1.5"/></svg>',
    e: '<svg viewBox="0 0 48 48"><rect class="f" x="8" y="28" width="8" height="12" rx="1.5"/><rect class="f" x="20" y="18" width="8" height="22" rx="1.5"/><rect class="f" x="32" y="8" width="8" height="32" rx="1.5"/></svg>',
    car: '<svg viewBox="0 0 48 48"><path d="M4 31v-6l5-2 6-7h15l7 7 6 2v6"/><path d="M4 31h4m10 0h12m10 0h4"/><circle cx="13" cy="31" r="4.5"/><circle cx="35" cy="31" r="4.5"/><path d="M17 16.5l-2 6.5h20l-5-6.5"/></svg>',
    utv: '<svg viewBox="0 0 48 48"><circle cx="12" cy="32" r="6"/><circle cx="37" cy="32" r="6"/><path d="M18 32h13"/><path d="M6 27l4-5h28l5 5"/><path d="M14 22V11h16l6 11"/><path d="M22 11v11"/></svg>',
    atv: '<svg viewBox="0 0 48 48"><circle cx="11" cy="32" r="7"/><circle cx="37" cy="32" r="7"/><path d="M18 32h12"/><path d="M8 24l6-5h20l6 5"/><path d="M18 19v-4h10"/><path d="M33 19l3-7h5"/></svg>',
    boat: '<svg viewBox="0 0 48 48"><path d="M4 27h40l-6 10H11z"/><path d="M15 27v-8h13l7 8"/><path d="M21 19v-6"/><path d="M4 42c4-2.5 7-2.5 10 0s6 2.5 10 0 7-2.5 10 0 6 2.5 10 0"/></svg>',
  };
  const LV = { b: 'Beginner', i: 'Intermediate', e: 'Expert' }, VEH = { car: 'Car / Truck', utv: 'UTV', atv: 'ATV', boat: 'Boat' };
  // each goal tile shows the real product shot for that job
  const GOALS = {
    quick: ['Quick clean, no hose', 'A spray and a wipe. Works anywhere.', 'img/real/luxpro.webp'],
    wash: ['A full wash', 'Foam, mitt, bucket, dry.', 'img/real/luxfoam.webp'],
    shine: ['Shine & protection', 'Gloss and a layer that lasts.', 'img/real/ceramicx.webp'],
    wheels: ['Wheels & tires', 'Brake dust off, tires black.', 'img/real/wheelassassin.webp'],
    inside: ['The inside', 'Dash, seats, trim, smell.', 'img/real/interiorx.webp'],
    glass: ['Glass & chrome', 'Windshield, console, chrome.', 'img/real/luxwindow.webp'],
    unsure: ['Not sure. Start me off', 'We pick the basics for your level.', 'img/real/edgeless.webp'],
  };
  const goalsFor = v => v === 'boat' ? ['inside', 'glass', 'unsure'] : v === 'atv' ? ['quick', 'wash', 'shine', 'wheels', 'unsure'] : ['quick', 'wash', 'shine', 'wheels', 'inside', 'unsure'];
  const QS = [
    { key: 'lv', h: 'How much detailing have you done?', opts: () => [
      ['b', 'Beginner', 'Car washes and gas-station vacuums. Never done it myself.'],
      ['i', 'Intermediate', 'I wash it myself. I want it to look better and last longer.'],
      ['e', 'Expert', 'I own a foam cannon and I know what a high spot is.']] },
    { key: 'veh', h: 'What are you cleaning?', opts: () => [
      ['car', 'Car / Truck', 'Paint, glass, wheels, cabin.'], ['utv', 'UTV', 'Plastic panels, a cab, trail dust.'],
      ['atv', 'ATV', 'Plastic fenders, vinyl seat.'], ['boat', 'Boat', 'Vinyl seats, dash, trim, glass.']] },
    { key: 'goal', h: 'What do you want to tackle first?', opts: a => goalsFor(a.veh).map(g => [g, ...GOALS[g]]) },
  ];
  function list(lv, veh, goal, notes) {
    const B = lv === 'b', E = lv === 'e', OFF = veh === 'utv' || veh === 'atv';
    const T = {
      quick:  B ? ['luxpro', 'edgeless', 'luxquick'] : E ? ['luxpro', 'edgeless', 'luxquick', 'ceramicx', 'luxwindow', 'luxbug'] : ['luxpro', 'edgeless', 'luxquick', 'ceramicx'],
      wash:   B ? ['luxfoam', 'luxmit', 'luxbucket', 'luxdry'] : E ? ['luxgun', 'luxcannon', 'luxfoam', 'luxdry', 'luxmit', 'luxbucket', 'luxbug', 'edgeless'] : ['foamx', 'luxfoam', 'luxmit', 'luxbucket', 'luxdry', 'luxbug'],
      shine:  B ? ['luxquick', 'edgeless'] : E ? ['luxpro', 'luxquick', 'ceramicx', 'edgeless', 'luxwindow'] : ['ceramicx', 'luxquick', 'edgeless'],
      wheels: B ? ['wheelassassin', 'tirevenom', 'xpad'] : E ? ['wheelassassin', 'wheelbrush', 'tirebrush', 'tirevenom', 'xpad'] : ['wheelassassin', 'wheelbrush', 'tirevenom', 'xpad'],
      inside: B ? ['interiorx', 'microlux'] : E ? ['interiorx', 'restorx', 'microlux', 'xpad', 'luxbrush', 'luxwindow', 'newcarember', 'vanillaember'] : ['interiorx', 'restorx', 'microlux', 'xpad', 'newcarember'],
      glass:  B ? ['luxpro', 'luxwindow'] : ['luxpro', 'edgeless', 'luxwindow'],
      unsure: B ? ['luxpro', 'interiorx', 'tirevenom'] : E ? ['luxpro', 'restorx', 'interiorx', 'edgeless', 'microlux', 'xpad', 'tirevenom', 'luxquick', 'ceramicx', 'wheelassassin', 'wheelbrush'] : ['luxpro', 'restorx', 'interiorx', 'edgeless', 'microlux', 'xpad', 'tirevenom', 'luxquick'],
    };
    let it = T[goal].slice();
    if (veh === 'boat') {
      if (goal === 'unsure') it = B ? ['interiorx', 'restorx', 'microlux', 'xpad'] : ['interiorx', 'restorx', 'microlux', 'xpad', 'luxpro', 'edgeless'];
      if (goal === 'inside') it = it.filter(k => !['newcarember', 'vanillaember'].includes(k));
      notes.push('LusterLux lists a boat exterior cleaner and a boat interior cleaner as coming soon. Until then, this covers the cockpit.');
    }
    if (OFF) {
      if (goal === 'unsure') it = B ? ['luxpro', 'edgeless', 'restorx', 'xpad'] : ['luxfoam', 'luxmit', 'luxbucket', 'wheelassassin', 'restorx', 'xpad'].concat(E ? ['foamx', 'ceramicx'] : []);
      if (goal === 'quick') notes.push('Waterless handles dust and trail film. Caked mud needs a rinse first: a self-serve bay works.');
      if (goal === 'shine') it.push('restorx', 'xpad');
      if (veh === 'atv') it = it.filter(k => !['interiorx', 'microlux', 'newcarember', 'vanillaember', 'luxwindow'].includes(k));
    }
    if (B && goal !== 'shine' && veh !== 'boat') notes.push('Left out for now: CeramicX. It goes on a clean, dry vehicle and is buffed off panel by panel. Add it once washing is routine.');
    if (goal === 'wash' && !E) notes.push('Own a pressure washer? The Foam Wash System (LuxCannon + 2 LuxFoam, $79.99) replaces the bucket step.');
    return [...new Set(it)];
  }
  function picks(a) {
    const notes = [], loose = list(a.lv, a.veh, a.goal, notes);
    const allowed = new Set(['b', 'i', 'e'].flatMap(l => list(l, a.veh, a.goal, [])));
    return Object.assign(bundle(loose, allowed), { notes });
  }

  (function quiz() {
    const body = $('[data-quiz-body]'), bars = $$('[data-quiz-bars] i');
    if (!body) return;
    const ans = {}; let at = 0;
    const setBars = () => bars.forEach((b, i) => { b.classList.toggle('is-done', i < at); b.classList.toggle('is-on', i === at); });
    function ask() {
      const q = QS[at], opts = q.opts(ans); setBars();
      const photo = q.key === 'goal';
      body.innerHTML = `<div class="quiz-q"><p class="quiz-n">${at + 1} / 3</p><h2 id="quiz-h">${q.h}</h2>
        <div class="quiz-opts n${opts.length}${photo ? ' is-photo' : ''}">${opts.map(([v, b, s, pic], i) => `<button type="button" class="qopt${ans[q.key] === v ? ' is-picked' : ''}" data-v="${v}" style="--d:${i * 60}ms">
          ${photo ? `<span class="qopt-bg"><img src="${pic}" alt="" loading="lazy"></span><span class="qopt-sp"></span>` : `<span class="qopt-ic">${ICON[v]}</span>`}
          <b>${b}</b><span class="qopt-s">${s}</span><i class="qopt-go" aria-hidden="true">${ARROW}</i></button>`).join('')}</div>
        ${at ? '<button type="button" class="quiz-back" data-back>← Back</button>' : ''}</div>`;
    }
    function finish() {
      at = 3; setBars();
      const p = picks(ans);
      body.innerHTML = `<div class="quiz-load"><p class="quiz-n">Stocking your aisle</p>
        <ul>${[LV[ans.lv], VEH[ans.veh], GOALS[ans.goal][0]].map((x, i) => `<li style="--d:${i * 220}ms"><span>✓</span>${x}</li>`).join('')}</ul>
        <div class="quiz-meter"><i></i></div></div>`;
      setTimeout(() => {
        window.LLshowPicks(ans, p);
        body.innerHTML = `<div class="quiz-done"><p class="quiz-n">Your aisle is ready</p><h2 id="quiz-h">${p.items.length} pick${p.items.length === 1 ? '' : 's'} for ${ans.lv === 'b' ? 'a beginner' : ans.lv === 'i' ? 'an intermediate' : 'an expert'} · ${VEH[ans.veh]}</h2>
          <div class="quiz-done-cta"><a class="btn" href="#picks"><span>See my picks</span><i class="btn-ic" aria-hidden="true">${ARROW}</i></a><button type="button" class="quiz-back" data-redo>Change answers</button></div></div>`;
      }, reduce ? 0 : 1100);
    }
    body.addEventListener('click', e => {
      const o = e.target.closest('.qopt');
      if (o) {
        ans[QS[at].key] = o.dataset.v; $$('.qopt', body).forEach(x => x.classList.toggle('is-picked', x === o));
        setTimeout(() => {
          at < 2 ? (at++, ask()) : finish();
          const top = $('[data-quiz]').getBoundingClientRect().top;
          if (top < 0) scrollTo({ top: scrollY + top - 80, behavior: reduce ? 'auto' : 'smooth' });
        }, reduce ? 0 : 240);
        return;
      }
      if (e.target.closest('[data-back]')) { at--; ask(); return; }
      if (e.target.closest('[data-redo]')) { at = 0; Object.keys(ans).forEach(k => delete ans[k]); ask(); }
    });
    ask();
    window.LLredoQuiz = () => { at = 0; Object.keys(ans).forEach(k => delete ans[k]); ask(); $('#quiz').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };
    window.LLpick = (lv, veh, goal) => picks({ lv, veh, goal });
  })();

  /* ================= SHOP: grouped by what a thing IS ================= */
  const TYPE = {
    soap: 'Wash bottles', foamtool: 'Foam tools', washtool: 'Mitts, buckets & sponges', towel: 'Towels',
    wheelchem: 'Wheel & tire bottles', wheeltool: 'Brushes & pads', protect: 'Shine & protect sprays',
    interiorchem: 'Interior & trim bottles', scent: 'Scent', intool: 'Detail brushes', kit: 'Systems',
  };
  const TYPEOF = {
    luxpro: 'soap', luxfoam: 'soap', luxcannon: 'foamtool', foamx: 'foamtool', luxgun: 'foamtool', luxmit: 'washtool', luxbucket: 'washtool', luxbug: 'washtool',
    luxdry: 'towel', edgeless: 'towel', microlux: 'towel', luxwindow: 'towel', wheelassassin: 'wheelchem', tirevenom: 'wheelchem',
    wheelbrush: 'wheeltool', tirebrush: 'wheeltool', xpad: 'wheeltool', ceramicx: 'protect', luxquick: 'protect',
    interiorx: 'interiorchem', restorx: 'interiorchem', newcarember: 'scent', vanillaember: 'scent', luxbrush: 'intool',
  };
  const typeOf = k => C[k].kit ? 'kit' : TYPEOF[k];
  const card = k => { const it = C[k]; return `<article class="pcard" data-easy="${it.easy ? 1 : 0}" data-k="${k}">
        <button type="button" class="pcard-img${isPhoto(k) ? ' is-photo' : ''}" data-open="${k}" aria-label="Details for ${it.n}"><img src="${img(k)}" alt="" loading="lazy">
          ${it.kit ? '' : `<span class="pcard-step">Step ${it.step} · ${STEPS[it.step]}</span>`}${it.easy ? '<span class="pcard-easy">Easy</span>' : ''}<span class="pcard-more">View details</span></button>
        <div class="pcard-body"><button type="button" class="pcard-name" data-open="${k}">${nameHTML(k)}</button><p>${it.what}</p>${it.save ? `<span class="pcard-save">${it.save}</span>` : ''}</div>
        <div class="pcard-foot"><span class="pcard-px">${money(it.price)}</span><button class="pcard-add" type="button" data-add="${k}"><span>Add</span></button></div>
      </article>`; };
  const groupsHTML = (keys, kitsFirst) => {
    const by = {}; keys.forEach(k => (by[typeOf(k)] = by[typeOf(k)] || []).push(k));
    const order = kitsFirst ? ['kit'].concat(Object.keys(TYPE).filter(t => t !== 'kit')) : Object.keys(TYPE);
    return `<div class="pgroups">${order.filter(t => by[t]).map(t => `<div class="pgroup" style="--n:${Math.min(4, by[t].length)}"><h5>${TYPE[t]}</h5><div class="pgroup-grid">${by[t].map(card).join('')}</div></div>`).join('')}</div>`;
  };

  // the quiz lands here
  window.LLshowPicks = (a, p) => {
    const el = $('[data-picks]'); if (!el) return;
    const render = () => {
      const total = sum(p.items);
      const head = a.lv === 'b' ? 'Short list. Nothing you can mess up.' : a.lv === 'i' ? 'What makes it look professionally done.' : 'The full routine. No shortcuts.';
      const swapNotes = p.swaps.map(s => {
        const extra = C[s.K].inc.filter(x => !s.cov.some(c => x.toLowerCase().includes(C[c].n.split(' ')[0].toLowerCase())));
        return `<p class="picks-deal"><b>Bundled to save you money:</b> ${s.cov.map(c => C[c].n).join(' + ')} run ${money(sum(s.cov))} on their own. The ${C[s.K].n} is ${money(C[s.K].price)}${extra.length ? ` and adds ${extra.join(', ').toLowerCase()}` : ''}.</p>`;
      }).join('');
      const up = p.up ? `<div class="picks-up"><div><b>Step up for ${money(p.up.more)} more</b><p>Swap ${p.up.inside.map(x => C[x].n).join(' + ')} for the ${C[p.up.K].n} and you also get ${p.up.extras.map(x => C[x].n).join(' and ')} (${money(p.up.extraVal)} on ${p.up.extras.length > 1 ? 'their' : 'its'} own).</p></div>
          <button type="button" class="btn btn-sm btn-light" data-upgrade><span>Switch to the set</span></button></div>` : '';
      el.innerHTML = `<div class="picks-in">
        <div class="picks-head">
          <div><div class="kit-tags"><span>${LV[a.lv]}</span><span>${VEH[a.veh]}</span><span>${GOALS[a.goal][0]}</span></div>
            <h3>Picked for you</h3><p>${head}</p>${swapNotes}${p.notes.map(n => `<p class="picks-note">${n}</p>`).join('')}</div>
          <div class="picks-buy"><span>${p.items.length} item${p.items.length === 1 ? '' : 's'} as a package</span><strong>${money(total)}</strong>
            <button class="btn" type="button" data-add="${p.items.join(',')}"><span>Add all to cart</span><i class="btn-ic" aria-hidden="true">${ARROW}</i></button>
            <a class="picks-go" href="${permalink(Object.fromEntries(p.items.map(k => [k, 1])))}">Or check out now →</a>
            <button class="picks-redo" type="button" onclick="LLredoQuiz()">Change answers</button></div>
        </div>
        ${up}
        ${groupsHTML(p.items, true)}
        <p class="picks-rest">Tap any product for the full details. Everything else they make is below, sorted the same way.</p></div>`;
      const u = $('[data-upgrade]', el);
      if (u) u.addEventListener('click', () => {
        p.items = p.items.filter(k => !p.up.inside.includes(k)); p.items.unshift(p.up.K);
        p.swaps = []; p.up = null; render(); toast('Switched to the set');
      });
    };
    render(); el.hidden = false;
    requestAnimationFrame(() => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }));
  };

  (function shop() {
    const AISLES = [
      { cat: 'wash', h: 'Wash', p: 'Get the dirt off without scratching. Bottles first, then the tools that apply them.', types: ['soap', 'foamtool', 'washtool'] },
      { cat: 'towels', h: 'Towels', p: 'One job per towel: drying, paint, interior, glass. Mixing them is how streaks happen.', types: ['towel'] },
      { cat: 'wheels', h: 'Wheels & tires', p: 'Wheels get cleaned first so brake dust never splashes onto clean paint. Tires get dressed last.', types: ['wheelchem', 'wheeltool'] },
      { cat: 'protect', h: 'Shine & protect', p: 'After the wash. Gloss, plus a layer that makes the next wash easier.', types: ['protect'] },
      { cat: 'interior', h: 'Interior & trim', p: 'Cabin surfaces, faded plastic and the smell.', types: ['interiorchem', 'scent', 'intool'] },
      { cat: 'kits', h: 'Systems', p: 'Bundles that cost less than the same items bought apart. Every saving shown is the real math.', types: ['kit'] },
    ];
    const wrap = $('[data-shop-aisles]'), chips = $('[data-shop-chips]'), easy = $('[data-shop-easy]');
    if (!wrap) return;
    const keysOf = types => Object.keys(C).filter(k => types.includes(typeOf(k)));
    chips.innerHTML = [['all', 'All'], ...AISLES.map(a => [a.cat, a.h])].map(([c, l], i) => `<button type="button" role="tab" data-cat="${c}" aria-selected="${i === 0}"><span>${l}</span></button>`).join('');
    wrap.innerHTML = AISLES.map(a => `<div class="aisle" data-aisle="${a.cat}"><div class="aisle-bar"><h3>${a.h}</h3><p>${a.p}</p></div>${groupsHTML(keysOf(a.types))}</div>`).join('');
    let cat = 'all';
    function filter() {
      $$('.aisle', wrap).forEach(a => {
        let any = false;
        $$('.pgroup', a).forEach(g => {
          let gAny = false;
          $$('.pcard', g).forEach(c => { const s = !easy.checked || c.dataset.easy === '1'; c.hidden = !s; gAny = gAny || s; });
          g.hidden = !gAny; g.style.setProperty('--n', Math.min(4, $$('.pcard:not([hidden])', g).length || 1)); any = any || gAny;
        });
        a.hidden = !((cat === 'all' || a.dataset.aisle === cat) && any);
      });
    }
    chips.addEventListener('click', e => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      cat = b.dataset.cat; $$('button', chips).forEach(x => x.setAttribute('aria-selected', x === b)); filter();
      const top = $('[data-shop-bar]').getBoundingClientRect().top + scrollY - 80;
      if (scrollY > top) scrollTo({ top, behavior: reduce ? 'auto' : 'smooth' });
    });
    easy.addEventListener('change', filter);
  })();

  /* ================= BIG TWO: bottle -> ball-and-stick molecule -> bottle ================= */
  (function big() {
    const card = $('[data-big-card]'), cv = $('[data-big-canvas]'), arts = $$('[data-big]');
    if (!card || !cv) return;
    const imgs = { luxpro: $('[data-big-img="luxpro"]'), ceramicx: $('[data-big-img="ceramicx"]') };
    const ctx = cv.getContext('2d');
    const PAL = ['#ff3ea5', '#7b3fe4', '#c9e012', '#1fc59a', '#2aa8e8', '#ecd534', '#e6d3ad', '#d9d5cc', '#8bc303', '#39d1fd', '#ff7a45', '#ffffff'];
    const rgb = h => [parseInt(h.slice(1, 3), 16), parseInt(h.slice(3, 5), 16), parseInt(h.slice(5, 7), 16)];
    let W = 0, H = 0, N = 0, P = null, ready = false, raf = 0, visible = false, ATOMS = [], BONDS = [], step = 3;
    let intro = reduce ? 1 : 0, morph = 0;
    function sample(im, st) {
      const r = im.getBoundingClientRect(), cr = card.getBoundingClientRect();
      const x0 = r.left - cr.left, y0 = r.top - cr.top, w = Math.round(r.width), h = Math.round(r.height);
      const oc = document.createElement('canvas'); oc.width = w; oc.height = h;
      const o = oc.getContext('2d'); o.drawImage(im, 0, 0, w, h);
      const d = o.getImageData(0, 0, w, h).data, pts = [];
      for (let y = 0; y < h; y += st) for (let x = 0; x < w; x += st) {
        const i = (y * w + x) * 4; if (d[i + 3] < 140) continue;
        pts.push([x0 + x, y0 + y, d[i], d[i + 1], d[i + 2]]);
      }
      return pts;
    }
    function buildMolecule() {
      ATOMS = [{ x: 0, y: 0, z: 0, r: .34, c: rgb(PAL[0]) }]; BONDS = [];
      let tries = 0;
      while (ATOMS.length < 15 && tries++ < 600) {
        const pi = ATOMS.length < 4 ? 0 : (Math.random() * ATOMS.length) | 0, p = ATOMS[pi];
        const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
        const q = { x: p.x + s * Math.cos(th), y: p.y + u, z: p.z + s * Math.sin(th) };
        if (ATOMS.some(a => (a.x - q.x) ** 2 + (a.y - q.y) ** 2 + (a.z - q.z) ** 2 < .7)) continue;
        q.r = .2 + Math.random() * .14; q.c = rgb(PAL[ATOMS.length % PAL.length]);
        ATOMS.push(q); BONDS.push([ATOMS.length - 1, pi]);
      }
      const cx = ATOMS.reduce((s, a) => s + a.x, 0) / ATOMS.length, cy = ATOMS.reduce((s, a) => s + a.y, 0) / ATOMS.length, cz = ATOMS.reduce((s, a) => s + a.z, 0) / ATOMS.length;
      const ext = Math.max(...ATOMS.map(a => Math.hypot(a.x - cx, a.y - cy, a.z - cz))) || 1;
      ATOMS.forEach(a => { a.x = (a.x - cx) / ext; a.y = (a.y - cy) / ext; a.z = (a.z - cz) / ext; a.r /= ext; });
    }
    function setup() {
      const cr = card.getBoundingClientRect();
      if (!cr.width || !imgs.luxpro.naturalWidth || !imgs.ceramicx.naturalWidth) return;
      const dpr = Math.min(devicePixelRatio || 1, 2); W = cr.width; H = cr.height;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const ir = imgs.luxpro.getBoundingClientRect();
      step = Math.max(2, Math.round(Math.sqrt((ir.width * ir.height * .82) / 5600)));
      const A = sample(imgs.luxpro, step), Bp = sample(imgs.ceramicx, step);
      N = Math.max(A.length, Bp.length);
      if (!ATOMS.length) buildMolecule();
      P = new Float32Array(N * 13);
      for (let i = 0; i < N; i++) {
        const a = A[i < A.length ? i : (Math.random() * A.length) | 0], b = Bp[i < Bp.length ? i : (Math.random() * Bp.length) | 0];
        const o = i * 13, at = (Math.random() * ATOMS.length) | 0;
        const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u), rr = .55 + Math.random() * .45;
        P[o] = a[0]; P[o + 1] = a[1]; P[o + 2] = b[0]; P[o + 3] = b[1];
        P[o + 4] = at; P[o + 5] = s * Math.cos(th) * rr; P[o + 6] = u * rr;
        P[o + 7] = a[2]; P[o + 8] = a[3]; P[o + 9] = a[4]; P[o + 10] = b[2]; P[o + 11] = b[3]; P[o + 12] = b[4];
      }
      ready = true; draw(performance.now());
    }
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const clamp = v => Math.max(0, Math.min(1, v));
    const smooth = (a, b, v) => { const x = clamp((v - a) / (b - a)); return x * x * (3 - 2 * x); };
    function progress() {
      const vh = innerHeight, r = card.getBoundingClientRect(), pin = parseFloat(getComputedStyle(card.parentElement).top) || vh * .11;
      intro = reduce ? 1 : clamp(1 - (r.top - pin) / (vh * .75));
      const b = arts[1].getBoundingClientRect().top - vh * .78;
      morph = reduce ? (b < 0 ? 1 : 0) : clamp(.5 - b / (vh * .7));
    }
    let proj = [];
    function project(t) {
      const R = Math.min(W, H) * .34, ay = t * .00035 + morph * 2.4, ax = .42, f = 3.2;
      proj = ATOMS.map(a => {
        const x = a.x * Math.cos(ay) - a.z * Math.sin(ay), z = a.x * Math.sin(ay) + a.z * Math.cos(ay), y = a.y;
        const y2 = y * Math.cos(ax) - z * Math.sin(ax), z2 = y * Math.sin(ax) + z * Math.cos(ax), k = f / (f + z2);
        return { x: W / 2 + x * R * k, y: H * .45 + y2 * R * k, r: a.r * R * k, z: z2, c: a.c };
      });
    }
    function draw(t) {
      if (!ready) return;
      ctx.clearRect(0, 0, W, H);
      const k = morph < .5 ? 'luxpro' : 'ceramicx';
      card.dataset.k = k;
      const cl = intro < 1 && morph < .5 ? 1 - intro : morph < .5 ? morph * 2 : 2 - morph * 2; // 0 bottle .. 1 molecule
      // the real photo takes over before the particles land, so the bottle never sits there pixelated
      const crispA = 1 - smooth(.04, .3, cl);
      imgs.luxpro.style.opacity = k === 'luxpro' ? crispA : 0;
      imgs.ceramicx.style.opacity = k === 'ceramicx' ? crispA : 0;
      if (cl <= .04) return;
      project(t);
      const stick = smooth(.55, .95, cl);
      if (stick > 0) {
        ctx.lineCap = 'round';
        BONDS.forEach(([i, j]) => {
          const p = proj[i], q = proj[j], g = ctx.createLinearGradient(p.x, p.y, q.x, q.y);
          g.addColorStop(0, `rgba(${p.c},${.75 * stick})`); g.addColorStop(1, `rgba(${q.c},${.75 * stick})`);
          ctx.strokeStyle = g; ctx.lineWidth = Math.max(3, (p.r + q.r) * .22);
          ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke();
        });
      }
      const pa = (1 - smooth(.82, 1, cl) * .9) * smooth(.04, .3, cl);
      for (let i = 0; i < N; i++) {
        const o = i * 13, jit = (i % 97) / 97, at = proj[P[o + 4]];
        const tx = at.x + P[o + 5] * at.r, ty = at.y + P[o + 6] * at.r;
        let x, y, r, g, b, e;
        if (intro < 1 && morph < .5) { e = ease(clamp((intro - jit * .25) / .75)); x = tx + (P[o] - tx) * e; y = ty + (P[o + 1] - ty) * e; r = P[o + 7]; g = P[o + 8]; b = P[o + 9]; }
        else if (morph < .5) { e = 1 - ease(clamp((morph * 2 - jit * .25) / .75)); x = tx + (P[o] - tx) * e; y = ty + (P[o + 1] - ty) * e; r = P[o + 7]; g = P[o + 8]; b = P[o + 9]; }
        else { e = ease(clamp(((morph - .5) * 2 - jit * .25) / .75)); x = tx + (P[o + 2] - tx) * e; y = ty + (P[o + 3] - ty) * e; r = P[o + 10]; g = P[o + 11]; b = P[o + 12]; }
        const m = 1 - e;
        r += (at.c[0] - r) * m; g += (at.c[1] - g) * m; b += (at.c[2] - b) * m;
        const sz = step * e + 2.2 * m;
        ctx.globalAlpha = pa; ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        ctx.fillRect(x - sz / 2, y - sz / 2, sz + .4, sz + .4);
      }
      ctx.globalAlpha = 1;
      const ball = smooth(.7, 1, cl);
      if (ball > 0) {
        proj.map((p, i) => i).sort((i, j) => proj[j].z - proj[i].z).forEach(i => {
          const p = proj[i], g = ctx.createRadialGradient(p.x - p.r * .35, p.y - p.r * .4, p.r * .08, p.x, p.y, p.r);
          g.addColorStop(0, `rgba(255,255,255,${ball})`); g.addColorStop(.25, `rgba(${p.c},${ball})`);
          g.addColorStop(1, `rgba(${p.c.map(v => v * .28 | 0)},${ball})`);
          ctx.fillStyle = g; ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, 6.283); ctx.fill();
        });
      }
    }
    function loop(t) { progress(); draw(t); raf = visible ? requestAnimationFrame(loop) : 0; }
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); }, { rootMargin: '200px 0px' }).observe($('#big'));
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(setup, 200); });
    const go = () => { if (imgs.luxpro.complete && imgs.ceramicx.complete) setup(); };
    imgs.luxpro.addEventListener('load', go); imgs.ceramicx.addEventListener('load', go);
    if (document.fonts) document.fonts.ready.then(go); go();
    window.LLbig = () => ({ N, intro, morph, ready, atoms: ATOMS.length });
  })();

  /* ================= REVIEWS: their real Judge.me reviews, quoted as written ================= */
  (function reviews() {
    const el = $('[data-reviews]'); if (!el) return;
    const PHOTO = [
      { a: 'Spencer S.', v: 1, k: 'ceramicx', t: 'Great shine and water beading', pic: 'img/rev/645ca728-0.webp' },
      { a: 'Spencer S.', v: 1, k: 'wheelassassin', t: 'Got the brake dust off my wheels and they look amazing. Great shine and easy to use.', pic: 'img/rev/2ad3f1b9-0.webp' },
      { a: 'Jonathan', v: 0, t: 'Product is incredible..This is one of those products I was not sure about, but after trying and using unteal it Wow..High End..', pic: 'img/rev/79a0462f-1.webp' },
      { a: 'Lucas G.', v: 0, t: 'The detailing products they offer are top quality, easy to use, and deliver excellent results. From their drying towels to tire venom and protectants they have delivered great results so far.', pic: 'img/rev/246fde36-0.webp' },
    ];
    const TEXT = [
      { a: 'Hank H.', v: 0, k: 'restorx', t: 'Was skeptical to purchase the RestorX for the interior of my truck but am glad I did. The results exceeded my expectations and the shine has maintained longer than the Armor All I had always used prior.' },
      { a: 'Tammy C.', v: 0, t: 'I have been using LusterLux on my black vehicle for months now. It really protects it from water spotting. My car is always shiny and looks like it just rolled off the showroom floor!' },
      { a: 'Verified buyer', v: 1, k: 'luxpro', t: 'It works really well as a waterless wash and as a drying aid. It does a good job at cleaning.' },
      { a: 'Spencer S.', v: 1, k: 'tirevenom', t: 'Great product with good shine. No sling' },
      { a: 'Zay', v: 0, t: 'I used the waterless wash and the wheel cleaner. Gave my car a deep shine and wheels looked new again.' },
      { a: 'Aidan S.', v: 1, k: 'interiorx', t: 'amazing product, works for everything and smells really good!!' },
      { a: 'Kay', v: 1, t: 'Great products, easy to use. Looks like a professional detailed my car!' },
      { a: 'John M.', v: 0, t: 'Amazing products. Luxproand LuxFoam are my favorites. Great cleaning power, awesome scents, and professional results.' },
    ];
    const stars = '<span class="rv-stars" aria-label="5 out of 5 stars">★★★★★</span>';
    const meta = r => `<p class="rv-by"><b>${r.a}</b>${r.v ? '<span class="rv-ver">Verified buyer</span>' : ''}${r.k ? `<button type="button" class="rv-prod" data-open="${r.k}">${C[r.k].n}</button>` : ''}</p>`;
    // one row: photo reviews and text reviews alternate, same size cards
    const all = [];
    for (let i = 0; i < Math.max(PHOTO.length, TEXT.length); i++) { if (PHOTO[i]) all.push(PHOTO[i]); if (TEXT[i]) all.push(TEXT[i]); }
    el.innerHTML = all.map(r => `<figure class="rv-slide${r.pic ? ' has-pic' : ''}">${r.pic ? `<img src="${r.pic}" alt="Customer photo from ${r.a}" loading="lazy">` : ''}
      <figcaption>${stars}<p>“${r.t}”</p>${meta(r)}</figcaption></figure>`).join('');
    const step = () => (el.querySelector('.rv-slide')?.offsetWidth || 340) + 16;
    const go = d => {
      const max = el.scrollWidth - el.clientWidth;
      el.scrollTo({ left: d > 0 && el.scrollLeft >= max - 4 ? 0 : el.scrollLeft + d * step(), behavior: reduce ? 'auto' : 'smooth' });
    };
    $$('[data-rv]').forEach(b => b.addEventListener('click', () => go(+b.dataset.rv)));
    let paused = false, t;
    el.addEventListener('pointerenter', () => paused = true); el.addEventListener('pointerleave', () => paused = false);
    el.addEventListener('focusin', () => paused = true); el.addEventListener('focusout', () => paused = false);
    if (!reduce) t = setInterval(() => { const r = el.getBoundingClientRect(); if (!paused && r.top < innerHeight && r.bottom > 0) go(1); }, 4500);
  })();

  /* ================= WALL: four columns that never stop, alternating up and down ================= */
  (function wall() {
    const el = $('[data-wall]'); if (!el) return;
    const build = () => {
    const N = 65, cols = [[], [], [], []];
    for (let i = 0; i < N; i++) cols[i % 4].push(`img/wall/w${String(i).padStart(2, '0')}.webp`);
    // same slow drift on every column, no scroll effect
    el.innerHTML = cols.map((c, i) => `<div class="wall-col ${i % 2 ? 'down' : 'up'}" style="--dur:${Math.round(c.length * 9)}s"><div class="wall-track">${c.concat(c).map((s, j) => `<figure><img src="${s}" alt="" decoding="async"></figure>`).join('')}</div></div>`).join('');
    };
    new IntersectionObserver((en, ob) => { if (en[0].isIntersecting) { build(); ob.disconnect(); } }, { rootMargin: '1200px 0px' }).observe(el);
  })();

  /* ================= INSTAGRAM PHONE: their reels, cycling ================= */
  (function insta() {
    const reels = $$('[data-reel]'); if (!reels.length) return;
    let i = 0;
    const show = () => reels.forEach((r, j) => r.classList.toggle('is-on', j === i));
    show();
    if (!reduce) setInterval(() => { i = (i + 1) % reels.length; show(); }, 3800);
  })();

  /* ================= GOODGUYS: auto-expire + calendar file ================= */
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

  /* ================= REVEALS ================= */
  const rv = $$('.big-head, .shop-head, .rv-head, .wall-head, .ig-copy, .ticket, .foot-word');
  rv.forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .15 });
  rv.forEach(el => io.observe(el));
  window.LLreveal = () => rv.forEach(el => el.classList.add('in'));
  window.LLC = C; window.LLbundle = bundle; window.LLopen = openProduct;
})();
