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
  const SPEC = {
    luxpro: '16 oz · 15–30 cars per bottle', luxfoam: '16 oz · 8–16 washes per bottle', wheelassassin: '16 oz · 12–20 vehicles per bottle',
    tirevenom: '16 oz · 30–50 tires · lasts up to 3 months', ceramicx: '16 oz · 10–20 cars · lasts up to 8 months', luxquick: '16 oz · 15–25 vehicles per bottle',
    interiorx: '16 oz · 15–25 vehicles per bottle', restorx: '16 oz · 20–40 vehicles · up to 6 months outside', newcarember: '8 oz · 300–500 sprays',
    vanillaember: '8 oz · 300–500 sprays', luxdry: '2 × 3 ft · 1300 GSM', edgeless: '3-pack · 16 × 16 in', microlux: '5-pack · 16 × 16 in', luxwindow: '2-pack · 16 × 16 in',
    xpad: '2-pack', luxcannon: 'Needs a pressure washer', foamx: 'Cordless · rechargeable', luxgun: 'Quick-connect fittings',
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
  /* ---- cart upsells ----
     $49 free shipping is LusterLux's real line. The 10% / 15% tiers, their codes and the next-bottle perk are PROPOSED offers:
     the codes must be created in Shopify (Discounts) before launch. Shopify applies ?discount=CODE from a cart permalink. */
  const TIERS = [{ at: 49, label: 'free shipping' }, { at: 85, label: '10% off', pct: 10, code: 'LUX10' }, { at: 125, label: '15% off', pct: 15, code: 'LUX15' }];
  const TOP = TIERS[TIERS.length - 1].at;
  // what each product is most often bought with
  const PAIR = { luxpro: ['edgeless', 'luxquick'], ceramicx: ['edgeless', 'luxquick'], luxquick: ['edgeless', 'ceramicx'], edgeless: ['luxpro', 'luxquick'],
    luxfoam: ['luxmit', 'luxdry'], luxmit: ['luxbucket', 'luxfoam'], luxbucket: ['luxmit', 'luxfoam'], luxdry: ['luxquick', 'edgeless'], luxcannon: ['luxfoam', 'luxdry'], foamx: ['luxfoam', 'luxmit'], luxgun: ['luxcannon', 'luxfoam'],
    wheelassassin: ['wheelbrush', 'tirevenom'], tirevenom: ['xpad', 'wheelassassin'], wheelbrush: ['tirebrush', 'wheelassassin'], tirebrush: ['wheelbrush', 'tirevenom'], xpad: ['tirevenom', 'restorx'],
    interiorx: ['microlux', 'restorx'], restorx: ['xpad', 'interiorx'], microlux: ['interiorx', 'luxbrush'], luxbrush: ['interiorx', 'microlux'], luxwindow: ['luxpro', 'edgeless'],
    newcarember: ['vanillaember', 'interiorx'], vanillaember: ['newcarember', 'interiorx'], luxbug: ['luxfoam', 'luxmit'] };
  const STARTERS = ['waterlesssys', 'completesys', 'essentials'];
  // everything the shopper already has, with kits opened up into their parts
  const owned = () => { const o = {}; Object.keys(cart).forEach(k => { (C[k].parts || [k]).forEach(p => { o[p] = (o[p] || 0) + cart[k]; }); }); return o; };
  // the best kit move: a swap that costs less, or an upgrade where the kit adds more than it costs
  function kitMove() {
    let best = null; const own = owned();
    KITS.forEach(K => {
      if (cart[K]) return;
      const left = { ...cart }, have = [], miss = [];
      C[K].parts.forEach(p => { if (left[p] > 0) { left[p]--; have.push(p); } else miss.push(p); });
      if (!have.length || have.length < Math.ceil(C[K].parts.length / 2) || miss.some(x => own[x])) return;
      const extra = C[K].price - sum(have), gain = sum(miss) - extra;
      if (gain > .5 && (!best || gain > best.gain)) best = { K, have, miss, extra, gain };
    });
    return best;
  }
  function upsellHTML(keys, sub) {
    if (!keys.length) return `<div class="up-block"><p class="up-k">Popular first orders</p><div class="up-pairs">${STARTERS.map(k => pairCard(k, '')).join('')}</div></div>`;
    let h = '';
    const m = kitMove();
    if (m) {
      const kitN = C[m.K].n, missN = [...new Set(m.miss)].map(p => C[p].n).join(' + ');
      h += `<div class="up-kit"><img src="${img(m.K)}" alt=""><div><p class="up-k">${m.extra <= 0 ? 'Same items, lower price' : 'Upgrade and get more'}</p>
        <b>${m.extra <= 0 ? `Swap to the ${kitN} and save ${money(-m.extra)}` : `${kitN}: ${money(m.extra)} more adds ${missN}`}</b>
        ${m.extra > 0 ? `<span>That's ${money(sum(m.miss))} of product for ${money(m.extra)}.</span>` : missN ? `<span>Plus ${missN} at no extra cost.</span>` : ''}</div>
        <button type="button" class="up-btn" data-swap="${m.K}">${m.extra <= 0 ? 'Swap' : 'Upgrade'}</button></div>`;
    }
    const o = owned(), next = TIERS.find(t => sub < t.at), gap = next ? next.at - sub : 0;
    let cand = [...new Set(Object.keys(o).flatMap(k => PAIR[k] || []))].filter(k => !o[k] && C[k]);
    // lead with whatever closes the gap to the next reward for the least money
    cand.sort((a, b) => { const ca = C[a].price >= gap, cb = C[b].price >= gap; return next && ca !== cb ? (ca ? -1 : 1) : next && ca ? C[a].price - C[b].price : 0; });
    cand = cand.slice(0, 2);
    if (cand.length) h += `<div class="up-block"><p class="up-k">Goes with your order</p><div class="up-pairs">${cand.map(k => pairCard(k, next && C[k].price >= gap ? `Unlocks ${next.label}` : '')).join('')}</div></div>`;
    return h;
  }
  const pairCard = (k, flag) => `<div class="up-pair">${flag ? `<span class="up-flag">${flag}</span>` : ''}<button type="button" class="up-pic" data-open="${k}" aria-label="Details for ${C[k].n}"><img src="${img(k)}" alt="" loading="lazy"></button>
      <b>${C[k].n}</b><span class="up-px">${money(C[k].price)}</span><button type="button" class="up-add" data-add="${k}" aria-label="Add ${C[k].n} to cart">+ Add</button></div>`;
  function ladderHTML(sub) {
    const next = TIERS.find(t => sub < t.at), got = TIERS.filter(t => sub >= t.at);
    return `<p class="lad-h"><span class="lad-main">${next ? `<b>${money(next.at - sub)}</b> away from <b>${next.label}</b>` : '<b>Every reward unlocked</b>'}</span>${got.length && next ? `<span class="lad-got">${got.map(t => t.label).join(' + ')} unlocked</span>` : ''}</p>
      <div class="lad-bar" style="--p:${Math.min(1, sub / TOP)}"><i></i>${TIERS.map(t => `<em class="${sub >= t.at ? 'on' : ''}" style="--x:${t.at / TOP}"><s></s><small>${money(t.at).replace('.00', '')}<br>${t.label}</small></em>`).join('')}</div>`;
  }
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
    if (ship) { ship.innerHTML = n ? ladderHTML(sub) : ''; ship.hidden = !n; }
    const ups = $('[data-upsell]'); if (ups) ups.innerHTML = upsellHTML(keys, sub);
    const tier = TIERS.filter(t => sub >= t.at && t.pct).pop(), disc = tier ? Math.round(sub * tier.pct) / 100 : 0;
    const dl = $('[data-cart-disc]'); if (dl) { dl.hidden = !disc; dl.innerHTML = `<span>${tier ? tier.label : ''}</span><strong>−${money(disc)}</strong>`; }
    const sl = $('[data-cart-shipline]'); if (sl) { sl.hidden = !n; sl.innerHTML = `<span>Shipping</span><strong>${sub >= FREE ? 'Free' : 'At checkout'}</strong>`; }
    const tl = $('[data-cart-total]'); if (tl) tl.textContent = money(sub - disc);
    const pk = $('[data-perk]'); if (pk) pk.hidden = !n;
    const co = $('[data-checkout]');
    co.href = keys.length ? permalink(cart) + (tier ? `?discount=${tier.code}` : '') : '#';
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
    const sw = e.target.closest('[data-swap]');
    if (sw) { const m = kitMove(); if (m && m.K === sw.dataset.swap) { m.have.forEach(p => { cart[p]--; }); cart[m.K] = (cart[m.K] || 0) + 1; save(); renderCart(true); toast(`Upgraded to the ${C[m.K].n}`); } }
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
        ${it.kit ? '<p class="pm-step">System</p>' : ''}
        <h3 id="pm-h">${nameHTML(k)}</h3>
        <p class="pm-px">${money(it.price)}${it.save ? `<span class="tag">${it.save}</span>` : ''}</p>
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

  (function spot() {
    const q = $('.quiz'); if (!q) return;
    if (!('IntersectionObserver' in window)) return q.classList.add('is-lit');
    const io = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { q.classList.add('is-lit'); io.disconnect(); } }), { threshold: .25 });
    io.observe(q);
    // dust motes drifting through the spotlight, catching the light as they turn
    const cv = $('.ql-motes', q); if (!cv || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = cv.getContext('2d'); let W = 0, H = 0, on = false, M = [];
    const size = () => { const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2); W = r.width; H = r.height; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0);
      M = Array.from({ length: Math.round(Math.min(140, W / 9)) }, () => ({ x: Math.random(), y: Math.random(), r: .8 + Math.random() * 2, vx: (Math.random() - .5) * .00012, vy: -.00004 - Math.random() * .00012, p: Math.random() * 6.28, c: Math.random() < .18 ? (Math.random() < .5 ? '169,226,28' : '57,209,253') : '255,255,255' })); };
    const tick = t => {
      if (!on) return; ctx.clearRect(0, 0, W, H);
      for (const m of M) {
        m.x += m.vx + Math.sin(t / 2600 + m.p) * .00005; m.y += m.vy; if (m.y < -.02) { m.y = 1.02; m.x = Math.random(); }
        // brighter inside the beam: a cone from the top centre
        const px = m.x * W, py = m.y * H, half = .1 * W + py * .55, inBeam = Math.max(0, 1 - Math.abs(px - W / 2) / half);
        const a = (.22 + .78 * inBeam) * (1 - m.y * .55) * (.55 + .45 * Math.sin(t / 700 + m.p * 3));
        ctx.beginPath(); ctx.arc(px, py, m.r, 0, 6.283); ctx.fillStyle = `rgba(${m.c},${Math.max(0, a).toFixed(3)})`; ctx.fill();
      }
      requestAnimationFrame(tick);
    };
    new IntersectionObserver(es => es.forEach(e => { on = e.isIntersecting; if (on) { size(); requestAnimationFrame(tick); } })).observe(q);
    addEventListener('resize', () => on && size());
  })();

  /* ================= HERO: a waving hex sheet behind the copy + their products on real cars ================= */
  (function hero() {
    $$('[data-hex]').forEach(cv => {
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
    });
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
  // vehicles: drawn silhouettes in the brand gradient (gradient defs live in index.html)
  // vehicle icons: one Flaticon family (UTV, ATV, sports car) plus a matching speedboat, tinted chrome in CSS (img/veh/*.svg)
  const ICON = {"car": "<svg class=\"vic vic-car\" viewBox=\"0.42 23.39 63.19 17.22\" aria-hidden=\"true\"><path d=\"m6.89 36.78v-1.11s0-.01 0-.02c0-2.24 1.37-4.16 3.31-4.98.65-.27 1.36-.43 2.1-.43 1.62 0 3.06.74 4.06 1.88.83.95 1.35 2.18 1.35 3.53v.02 2.17l27.09.49v-2.68c0-2.98 2.43-5.41 5.41-5.41 1.15 0 2.22.37 3.09.99 1.39.98 2.31 2.59 2.31 4.42v.04 2.85c1.12.04 2.97.07 4.58.04-.07-.06-.14-.11-.22-.17-.57-.5-.74-1.32-.42-2.01l.77-1.66c.28-.59.85-.95 1.46-.97-.32-.22-.67-.46-1.08-.7-.47.29-1 .42-1.55.42-1.78 0-3.7-1.2-3.99-1.38-.21-.14-.3-.41-.2-.65s.35-.37.6-.32c.64.13 1.16.12 1.58.05-2.35-1.04-5.08-1.85-7.65-1.77-.09 0-.19-.02-.28-.07-.07-.04-6.62-3.7-14.55-4.98-7.93-1.29-20.61 1.15-20.74 1.18-.4.08-9.15 1.77-12.29 2.04.15.42.42.98.88 1.45.07.07.11.15.15.23l2.25-.24c.25-.02.49.13.57.38l.76 2.62c.07.25-.05.52-.29.63-.07.03-1.26.56-2.58.56-.56 0-1.13-.1-1.66-.37l-.69-.17c.61 1.11 2.16 2.99 5.89 4.09zm17.5-.58c-.07 0-.31.03-.63.03-.71 0-1.81-.11-2.4-.75-.74-.79-2.4-4.01-2.59-4.38-.08-.15-.08-.32 0-.47s.21-.26.37-.29l2.61-.55c.22-.05.44.05.56.24s.1.43-.04.61l-.31.39c.48 1.19 1.62 3.63 2.63 4.17.21.11.32.34.27.57-.04.23-.23.4-.46.43zm-6.87-9.05c2.87-1.49 6.28-2.03 7.61-2.2.73-.06 1.41-.09 2.08-.11 2.1-.07 3.95 0 5.48.2 5.55.71 10.46 2.6 12.89 3.66.19.08.31.26.32.46 0 .2-.1.39-.28.49-1.29.69-3.46.9-5.6.9-3.1 0-6.14-.44-6.36-.47l-15.98-1.94c-.23-.03-.42-.2-.46-.43s.07-.46.28-.56z\"/><path d=\"m50.19 31.31c-2.4 0-4.35 1.95-4.35 4.35s1.95 4.35 4.35 4.35 4.35-1.95 4.35-4.35-1.95-4.35-4.35-4.35zm0 7.21c-1.58 0-2.87-1.29-2.87-2.87s1.29-2.87 2.87-2.87 2.87 1.29 2.87 2.87-1.29 2.87-2.87 2.87z\"/><path d=\"m50.19 33.84c-1 0-1.81.81-1.81 1.81s.81 1.81 1.81 1.81 1.81-.81 1.81-1.81-.81-1.81-1.81-1.81z\"/><path d=\"m16.64 35.65c0-2.4-1.95-4.35-4.35-4.35s-4.35 1.95-4.35 4.35 1.95 4.35 4.35 4.35 4.35-1.95 4.35-4.35zm-7.21 0c0-1.58 1.29-2.87 2.87-2.87s2.87 1.29 2.87 2.87-1.29 2.87-2.87 2.87-2.87-1.29-2.87-2.87z\"/><path d=\"m14.1 35.65c0-1-.81-1.81-1.81-1.81s-1.81.81-1.81 1.81.81 1.81 1.81 1.81 1.81-.81 1.81-1.81z\"/><path d=\"m43.92 29.15c-2.61-1.05-6.76-2.47-11.37-3.06-1.47-.19-3.26-.26-5.3-.19-.66.02-1.32.05-1.99.1-1.01.12-3.28.47-5.52 1.32l14.08 1.71c.09.01 6.62.96 10.11.12z\"/><path d=\"m20.82 31.07-.8.17c.62 1.17 1.65 3.04 2.1 3.52.17.18.47.28.82.34-1.13-1.43-1.98-3.65-2.1-3.97 0-.02-.01-.04-.02-.06z\"/><path d=\"m58.5 31.85c-.19.09-.46.21-.8.3.62.2 1.27.33 1.82.24-.34-.19-.68-.37-1.02-.54z\"/><path d=\"m63 35.12-.97-.28c-.06-.02-.11-.02-.17-.02-.24 0-.48.14-.59.37l-.77 1.65c-.12.26-.06.58.15.76.87.74 1.32.88 1.51.89.16-.01.29-.03.41-.04l-.74-1.36c-.11-.2-.08-.45.08-.62.44-.47.86-1 1.1-1.36z\"/><path d=\"m4.56 30.14-1.66.18c0 .63-.2 1.3-.36 1.75.84.23 1.87.02 2.52-.2z\"/></svg>", "utv": "<svg class=\"vic vic-utv\" viewBox=\"0.40 10.86 63.21 42.29\" aria-hidden=\"true\"><path d=\"m61.81 25.1-15.58-12.12c-.21-.16-.44-.24-.68-.28h-.01c-2.52-.9-5.09-1.24-7.57-1.24-7.64 0-14.41 3.3-16.03 4.16-.01.01-.02.01-.03.01l-.17.1s-.15.08-.18.1c-2.38 1.89-6.39 8.72-7.38 10.44-4.86 1.27-8.08 2.75-9.54 4.41-.09.11-.14.25-.13.39l.27 2.78.39 3.92c-.04.08-.07.16-.07.25v.44s-.3.22-.3.22c-.23.17-.42.31-.69.51l-.41-.15c-.22-.07-.45 0-.59.18l-1.22 1.69c-.14.18-.13.43.01.61l.27.34-.4 1.19-.41.12c-.21.07-.36.27-.36.49v2.07c0 .23.15.42.36.49l.41.13.4 1.19-.27.34c-.14.18-.14.43-.01.62l1.22 1.67c.14.18.37.26.58.18l.42-.14.3.22c.23.17.43.31.7.51v.43c-.02.23.13.43.34.5l1.98.65c.21.07.45 0 .58-.2l.24-.36h1.26l.24.36c.1.14.26.22.42.22.06 0 .11-.01.16-.02l1.98-.65c.21-.07.35-.27.35-.5v-.43c.38-.28.61-.45 1-.73l.41.14c.21.08.44 0 .57-.18l1.23-1.67c.13-.19.13-.44-.01-.62l-.27-.34.39-1.19.42-.13c.21-.07.36-.26.36-.49v-1.15c.27-.13.5-.27.7-.4.03.09.07.17.14.24l1.48 1.31c.09.08.21.13.34.13h22.7c.23 0 .43-.16.49-.39l.2-.79h2.01v1.05c0 .23.15.42.36.49l.42.13.39 1.19-.27.34c-.14.18-.14.43 0 .62l1.23 1.67c.13.18.36.26.57.18l.42-.14.3.22c.23.16.43.31.71.51l-.02.43c0 .23.14.43.35.5l1.98.65s.11.02.16.02c.16 0 .32-.08.42-.22l.24-.36h1.26l.25.36c.12.19.36.27.57.2l1.98-.65c.21-.07.36-.27.35-.5v-.43c.38-.28.61-.45 1-.73l.41.14c.21.08.44 0 .58-.18l1.22-1.67c.14-.19.13-.44-.01-.62l-.26-.34.39-1.19.41-.13c.21-.07.36-.26.36-.49v-2.07c0-.22-.15-.42-.36-.49l-.41-.12-.39-1.19.26-.34c.13-.15.13-.37.03-.54.11-.15.19-.31.23-.49l2.97-12.22c.29-1.17-.14-2.42-1.1-3.17zm-17.99-11.12c.05-.12.13-.21.24-.25.07-.03.13-.04.2-.03.08 0 .17.02.25.08.06.04.11.11.15.19l.93 2.16 1.74 4.08c.19.42.22.9.1 1.35s-.83 3.04-.83 3.04l-.98.11.93-3.39c.08-.26.05-.53-.06-.76l-2.52-5.91-.14-.33c-.03-.06-.04-.12-.04-.18 0-.05.01-.11.03-.16zm15.25 14.23-1.18-.59c-.77-.4-1.85-.97-2.94-1.59s-2.2-1.29-3.02-1.89c-.1-.07-.23-.1-.35-.09l-3.89.43.72-2.65c.18-.67.13-1.4-.14-2.03l-.97-2.26 12.71 9.89s.05.1.04.15l-.69 2.87c-.01-.18-.01-.29-.01-.32v-1.46c0-.2-.11-.37-.28-.46zm-6.37 13.41c1.7 0 3.08 1.38 3.08 3.08s-1.38 3.08-3.08 3.08-3.07-1.39-3.07-3.08 1.38-3.08 3.07-3.08zm-40.74 3.08c0 1.69-1.38 3.08-3.08 3.08s-3.08-1.39-3.08-3.08 1.38-3.08 3.08-3.08 3.08 1.38 3.08 3.08zm31.67-22.96c-.15-.53-.63-.9-1.18-.9h-2.02c-.63 0-1.15.47-1.22 1.09l-.13 1.24-.75 1.17-3.28 1.2-7.42 1.12-4.83-.45.24-.97c.03-.12 0-.24-.07-.35 1.26-2 3.65-5.63 5.04-6.75.2-.16.34-.38.43-.61 3.78-1.25 9.45-2.24 15.54-.24l1.59 3.76-1.03 3.78-1.11.12c.62-1.24.37-2.58.2-3.21zm-19.1-2.57s.06-.03.09-.05.07-.04.12-.06c.04-.02.1-.05.15-.08.06-.03.13-.07.21-.11.07-.03.14-.06.21-.1.09-.04.19-.09.29-.14.08-.03.17-.07.26-.11.12-.06.26-.12.4-.18.06-.02.12-.05.18-.07-1.5 1.67-3.38 4.56-4.55 6.44-.03 0-.06 0-.09.01-.07.01-.14.02-.23.03-.11.02-.23.04-.36.06-.06.01-.13.02-.21.03-.1.02-.19.04-.3.05.81-1.33 2.34-3.76 3.83-5.72zm-1.97 8.04 5.04.47s.08 0 .12-.01l7.58-1.15 3.54-1.28c.1-.04.19-.11.25-.21l.91-1.42c.04-.06.07-.14.08-.21l.14-1.36c.01-.1.1-.19.21-.19h2.02c.09 0 .18.07.2.16.22.79.41 2.24-.73 3.27l-5.73 1.92c-.06.02-.12.05-.17.09l-2.03 1.71-7.66 1.03-2.24-1.16c-.07-.04-.16-.06-.24-.06h-1.68zm16.61.06 3.69-1.23 2.12-.24h.01l.55-.06 5.95-.66c1.29.91 3.14 1.95 4.61 2.75l-11.96 2.12c-.16.03-.29.13-.36.27l-.99 1.94c-.08.16-.07.35.02.5.1.15.26.24.44.24h.81l-2.45 6.17-1.66-1.19c-.12-.09-.28-.11-.43-.08l-6.52 1.79 3.9-1.95c1.4-.71 2.27-2.12 2.27-3.7zm7.58 6.47 11.59-2.95c0 .73-.04 2.02-.26 3.47h-11.55zm-23.28-14.84c-1.82 2.43-3.6 5.4-4.1 6.23-.38.07-.78.15-1.21.24 1.18-1.93 3.32-5.29 4.8-6.82zm-1.28-2.26s.09-.05.1-.06l.04-.02c.08-.03.15-.02.21-.01.02 0 .05-.01.06 0 .09.03.17.08.23.15.15.2.12.49-.09.66l-.17.14h-.01c-1.74 1.58-4.72 6.41-5.76 8.15-.2.04-.4.09-.6.13-.19.04-.37.08-.57.13-.02.01-.05.01-.07.02 1.38-2.35 4.69-7.76 6.63-9.29zm-7.55 10.56c.89-.23 1.76-.43 2.59-.6.93-.2 1.8-.38 2.56-.51.25-.05.49-.09.71-.13.1-.02.19-.03.28-.05.12-.02.24-.04.35-.06.09-.01.18-.03.26-.04.15-.02.29-.04.41-.06.02-.01.04-.01.05-.01h.02l-.84 3.46c-.03.15 0 .31.1.44.1.12.24.19.4.19h2.2l2.27 1.18c.08.04.16.06.24.06.02 0 .04-.01.06-.01l7.97-1.07c.1-.01.19-.05.26-.11l2.07-1.75 1.56-.52v6.33c0 1.19-.66 2.26-1.72 2.79l-8.48 4.24-4.2 1.15-2.45-4.25c-.04-.07-.1-.13-.16-.17-.02-.01-.03-.02-.05-.03-.07-.03-.14-.05-.22-.05 0 0 0-.01-.01-.01-.05 0-.09.01-.14.02l-.51.16c-.51-1.25-1.95-3.94-2.72-5.37l3.52-1.03c.13-.04.25-.13.31-.26s.07-.28.02-.41l-.41-1.03c-.08-.2-.25-.32-.49-.33l-7.05.27c-1.63.22-5.63.91-7.48 2.64-.08.07-.16.15-.24.24l-.13-1.31c1.41-1.45 4.54-2.83 9.09-4zm2.79 15.7c-.12.12-.36.33-.72.55-.01-.02-.03-.04-.04-.06s-.02-.03-.04-.05c-.06-.08-.14-.14-.23-.17l-.42-.12-.39-1.19.27-.34c.14-.18.14-.43.01-.61l-1.22-1.69c-.14-.18-.38-.26-.59-.18l-.4.15c-.39-.29-.62-.45-1.01-.74v-.43c0-.23-.13-.43-.34-.5l-1.98-.64c-.21-.08-.45.01-.58.19l-.24.36h-1.26l-.24-.36c-.13-.18-.37-.26-.59-.19l-.56.18s.02-.04.02-.05c.03-.06.05-.11.08-.17.1-.24.21-.46.32-.67.04-.08.08-.16.12-.23.1-.18.2-.34.3-.48.05-.07.09-.13.13-.19.14-.19.29-.36.43-.49.96-.89 3.84-1.49 5.24-1.7l3.93 7.46zm27.75.27c-.21.07-.36.27-.36.49h-1.75l.65-2.6 2.39-5.79h11.79c-.27 1.3-.65 2.44-1.13 3.4-.09-.07-.19-.14-.3-.22v-.43c.02-.23-.13-.43-.34-.5l-1.98-.64c-.21-.08-.45.01-.57.19l-.25.36h-1.26l-.24-.36c-.13-.18-.37-.26-.58-.19l-1.52.5c-.09.02-.19.06-.35.11-.01 0-.11.03-.11.04-.21.07-.35.27-.35.49l.02.44-.32.23c-.23.16-.42.3-.69.5l-.41-.15c-.21-.07-.45 0-.58.18l-1.23 1.69c-.13.18-.13.43 0 .61l.27.34-.39 1.19-.42.12zm16.74-15.14-2.9 11.95-.55-.76c-.04-.07-.1-.11-.17-.15l2.74-11.26c.11-.45-.06-.91-.41-1.19l-14.16-11.01-.2-.46-.54-1.27 15.46 12.02c.64.5.93 1.34.73 2.13z\"/></svg>", "atv": "<svg class=\"vic vic-atv\" viewBox=\"0.40 11.45 63.20 41.10\" aria-hidden=\"true\"><path d=\"m10.72 32.51c-.27 0-.55.01-.82.03-.09 0-.18.02-.27.03-.18.02-.37.04-.55.07-.1.02-.2.04-.3.06-.17.03-.34.07-.5.11-.1.03-.2.06-.31.09-.16.05-.32.09-.49.15-.01 0-.02 0-.03.01-3.86 1.38-6.45 5.06-6.45 9.16 0 5.36 4.36 9.72 9.72 9.72s9.72-4.36 9.72-9.72c0-.14 0-.29 0-.44-.23-5.21-4.5-9.29-9.71-9.29zm0 16.15c-3.55 0-6.43-2.89-6.43-6.43s2.88-6.43 6.43-6.43 6.43 2.89 6.43 6.43-2.88 6.43-6.43 6.43z\"/><path d=\"m55.24 32.71-.14-.03s0 0 0 0c-.62-.11-1.24-.17-1.82-.17-5.36 0-9.72 4.36-9.72 9.72s4.36 9.72 9.72 9.72 9.72-4.36 9.72-9.72c0-4.6-3.26-8.61-7.76-9.52zm-1.96 15.95c-3.55 0-6.43-2.89-6.43-6.43s2.88-6.43 6.43-6.43 6.43 2.89 6.43 6.43-2.89 6.43-6.43 6.43z\"/><path d=\"m27.45 32.57c.03-.05.05-.11.08-.16.09-.16.18-.32.29-.47.02-.03.04-.06.06-.09.13-.18.28-.35.43-.52.04-.04.08-.08.12-.13.13-.13.26-.26.4-.38.04-.04.08-.08.12-.11.17-.15.34-.29.52-.42.04-.03.08-.06.12-.09.14-.11.29-.21.43-.3.05-.03.1-.07.15-.1.17-.11.34-.21.5-.31.02-.01.03-.02.05-.03.15-.09.29-.16.42-.24.02 0 .04-.02.05-.03-.32-.22-.59-.45-.85-.66-.08-.07-.15-.13-.22-.2-.17-.16-.32-.31-.46-.45-.06-.06-.12-.12-.17-.18-.15-.17-.28-.32-.39-.46-.01-.02-.03-.04-.05-.06-.12-.17-.22-.3-.29-.41 0 0-.01-.01-.01-.02l-7.12-.87 2.08 3.66c.04.07.06.14.07.22l.85 9.11h8.15s-.03-.02-.05-.03c-.06-.02-.12-.05-.17-.09-.41-.18-.97-.27-1.46-.35-.35-.05-.66-.11-.88-.17-1.63-.5-3.72-2.45-3.03-5.04.06-.21.14-.41.23-.61z\"/><path d=\"m30.45 24.48c.2-.16.41-.34.62-.52.22-.18.43-.37.65-.57.02-.02.04-.03.06-.05.21-.19.41-.37.61-.56.03-.03.06-.06.1-.09.2-.19.38-.38.56-.56.02-.03.05-.05.07-.08.18-.19.35-.39.5-.57.06-.08.14-.18.21-.28.01-.02.02-.03.03-.05.02-.04.05-.07.07-.11.02-.03.03-.05.05-.08s.03-.07.05-.1.03-.07.05-.1c.01-.03.02-.06.03-.09.01-.04.03-.07.04-.11 0-.03.01-.06.02-.09 0-.04.01-.07.02-.11 0-.03 0-.05 0-.08s0-.07-.01-.1c0-.03-.02-.05-.03-.07 0-.02-.02-.04-.03-.06-3.27 2.99-11.91 2.22-20 1.06-4.27-.61-9.29-.48-12.54-.27l2.82.69 15.71 2.04c.17.02.32.12.41.28l.47.83 7.99.98s.07-.05.11-.08.08-.06.13-.1c.04-.03.09-.07.14-.11.12-.09.25-.2.4-.31.04-.03.07-.06.11-.09.16-.13.34-.27.52-.42.03-.02.06-.05.08-.07z\"/><path d=\"m40.87 31.6c-.13-.03-.27-.07-.41-.1-.07-.02-.15-.04-.22-.05-.15-.04-.3-.07-.45-.11-.07-.02-.15-.03-.22-.05-.16-.04-.33-.08-.5-.11-.07-.02-.14-.03-.21-.05-.19-.04-.38-.08-.57-.12-.05-.01-.1-.02-.16-.03-.49-.1-.98-.21-1.47-.31-.06-.01-.13-.03-.19-.04-.18-.04-.37-.07-.55-.11-.06-.01-.11-.02-.17-.03-.19-.04-.37-.07-.55-.11-.04 0-.09-.02-.13-.03-1.28-.25-2.29-.43-2.66-.5-1.13.51-3.69 1.97-4.13 3.63-.55 2.07 1.34 3.4 2.29 3.69.18.06.44.09.72.14.23.03.48.07.74.13-.02-.18-.04-.36-.04-.54 0-2.28 1.85-4.14 4.13-4.14s4.13 1.86 4.13 4.14c0 .25-.03.49-.07.73 0 .05-.02.11-.03.16-.05.23-.12.46-.21.68-.01.03-.03.06-.04.09-.05.11-.1.23-.16.34h.91c0-.09 0-.21.01-.31 0-.02 0-.04 0-.06 0-.12.01-.25.02-.39 0-.07 0-.15.01-.23 0-.18.02-.37.03-.58 0-.14.02-.29.02-.45 0-.11.01-.22.02-.33.01-.25.03-.51.05-.78 0-.07 0-.14.01-.21.01-.23.03-.47.05-.7 0-.09.01-.18.02-.27.02-.29.04-.58.06-.87 0-.07.01-.13.02-.19.02-.24.04-.48.06-.71 0-.08.01-.17.02-.25.02-.27.05-.54.08-.8 0-.02 0-.04 0-.06-.03 0-.05-.02-.08-.02-.06-.02-.13-.03-.2-.05z\"/><path d=\"m18.97 26.63 2.41 3.73c.05.07.08.16.09.25l.64 6.75c.02.2.08.39.17.57.03.06.07.1.11.15.07.11.14.22.24.31.05.05.12.09.18.13.09.07.19.14.3.19.07.03.15.05.23.08.07.02.14.03.21.04l-.83-8.84-3.04-5.35-15.26-1.98-2.23 1.42 2.42-.45c.07-.01.14-.01.21 0l11.49 2.29s.04.01.05.02l2.25.45c.15.03.28.12.36.24z\"/><path d=\"m41.74 28.7c.04-.1.07-.2.11-.3.03-.07.06-.15.09-.23.04-.1.08-.21.13-.32.04-.09.07-.18.11-.27.05-.11.09-.22.14-.34.04-.09.08-.19.13-.28.05-.12.11-.24.16-.36.04-.1.09-.19.14-.29.06-.13.12-.25.18-.38.05-.1.1-.2.14-.3.06-.13.13-.26.19-.39.05-.1.1-.21.16-.31.07-.13.14-.27.21-.4.05-.1.11-.2.16-.31.07-.14.15-.28.22-.41.05-.1.11-.2.16-.29.08-.14.16-.29.24-.43.05-.09.1-.18.15-.27.1-.17.2-.34.3-.5.03-.06.07-.12.1-.17.13-.22.27-.44.41-.66.03-.04.06-.09.08-.13.11-.17.21-.33.32-.49.05-.07.1-.14.15-.21.07-.11.14-.21.22-.31-3.46-.98-8.15-1.5-9.14-1.6l-1.77 1.1c.16.52.1 1.29-.74 2.33-1.28 1.57-3.67 3.46-4.63 4.19.37.52 1.2 1.5 2.69 2.37.79.14 5.8 1.05 8.74 1.82 0-.05.01-.09.02-.13 0-.05.01-.09.02-.14.03-.22.07-.42.11-.59.02-.11.06-.23.1-.36.01-.04.03-.09.05-.14.03-.09.06-.19.1-.3.02-.06.05-.13.07-.19z\"/><path d=\"m49.34 19.07c-.15 0-.32.01-.5.06-.08.02-.5.17-1.34 1.26-1.64 2.08-3.67 6-4.56 8.27-.21.53-.35.96-.42 1.27-.07.35-.15.83-.21 1.4-.06.5-.11 1.05-.16 1.64.01-.05.03-.1.04-.15.07-.26.15-.51.22-.75.02-.07.04-.13.06-.2.09-.3.19-.58.28-.84.03-.08.05-.14.08-.22.07-.19.15-.38.22-.55.03-.07.06-.14.09-.2.1-.21.19-.41.29-.56.22-.36.51-.85.84-1.42.28-.47.58-1 .9-1.54.01-.02.02-.03.03-.05 2.72-4.67 3.49-5.02 4.07-4.98.22.01.44.02.67.04h.09c.2.01.41.03.62.05.08 0 .16.02.23.02.17.02.34.03.52.05.09 0 .18.02.27.03.17.02.34.04.52.06.1.01.2.03.3.04.17.02.33.05.5.07l.33.06c.16.03.32.06.48.09.11.02.22.05.33.07.16.03.32.07.48.1.11.03.22.06.33.08.16.04.32.08.47.12.11.03.23.07.34.1.15.04.3.09.45.14.11.04.22.08.34.12.14.05.28.1.42.15.11.04.22.09.33.14.13.06.27.11.39.17.11.05.21.11.32.16.12.06.24.12.36.19.1.06.2.12.3.19l.33.21c.09.07.18.14.27.21.1.08.2.15.29.24.08.08.16.16.24.23.08.08.17.17.25.26.07.08.14.17.2.26.05.07.11.13.15.2.44.17 1.3.51 2.17.93-1.04-1.46-2.13-2.85-2.85-3.49-1.22-1.09-6.7-2.05-8.71-2.33-.22-.03-.4-.19-.46-.41-.01-.04-.29-1.01-1.21-1.04 0 0-.01 0-.02 0z\"/><path d=\"m16.39 27.41s-.05-.07-.07-.1c-.04-.05-.07-.1-.11-.15-.03-.04-.07-.06-.11-.09s-.08-.07-.12-.1l-1.08-.2h-11.57v2.48h11.98c.6 0 1.11-.42 1.22-1 .02-.08.02-.16.02-.23 0-.11-.01-.22-.04-.32 0-.03-.03-.06-.04-.09-.02-.07-.05-.13-.08-.2z\"/><path d=\"m10.72 36.91c-2.93 0-5.32 2.39-5.32 5.32s2.39 5.32 5.32 5.32 5.32-2.39 5.32-5.32-2.39-5.32-5.32-5.32z\"/><path d=\"m53.28 36.91c-2.93 0-5.32 2.39-5.32 5.32s2.39 5.32 5.32 5.32 5.32-2.39 5.32-5.32-2.39-5.32-5.32-5.32z\"/><path d=\"m33.71 39.97h-9.94c-1.44 0-2.63-1.08-2.77-2.52l-.63-6.62-2.2-3.41-.62-.12c.07.23.11.47.11.72 0 .13-.01.29-.04.44-.2 1.1-1.17 1.9-2.31 1.9h-3.93c-.24.21-.73.61-1.32 1.06.22-.01.44-.02.66-.02 5.66 0 10.32 4.31 10.79 9.88 1.31.22 5.6.87 11.34.87 3.53 0 6.09-.12 7.73-.24 0-.07 0-.14 0-.21 0-.08 0-.17-.01-.25 0-.1 0-.19 0-.28 0-.08 0-.15 0-.23 0-.1 0-.19 0-.28 0-.07 0-.14 0-.21 0-.08 0-.15.01-.23 0-.08 0-.15.01-.22 0 0 0-.02 0-.03z\"/><path d=\"m49.21 22.62c-.07.05-.59.42-2.19 3.01.01 0 .03-.01.05-.02.33-.14.67-.28 1-.41.1-.04.2-.08.31-.12.33-.13.66-.26.98-.37.02 0 .05-.02.07-.03.34-.12.65-.23.96-.32.07-.02.15-.04.22-.07.3-.09.58-.17.83-.22.06-.01.12-.01.19 0 .03 0 .22.03.52.08.15.03.32.06.51.1h.05c.19.04.39.08.61.13.03 0 .06.01.09.02.22.05.45.11.69.17.04.01.08.02.12.03.24.06.49.13.74.21.04.01.09.03.13.04.26.08.52.17.78.26.04.02.09.03.13.05.26.1.53.2.79.31.02 0 .05.02.07.03.67-.25 1.32-.33 1.86-.35-1.68-1.41-4.99-2.32-9.4-2.54h-.11z\"/><path d=\"m53.28 31.4h.07c-.03-.06-.05-.11-.08-.17-.35-.87-.13-1.96.66-3.23.45-.74 1-1.34 1.64-1.8-1.79-.64-3.59-.94-4.01-1.01-1.06.23-3.01.96-5.51 2.07-.29.48-.56.95-.81 1.38-.34.58-.64 1.09-.86 1.46-.95 1.5-2.22 7.31-2.63 9.42s-.12 1.26-.05 2.3c.32-.03.58-.06.77-.08.26-5.75 5.01-10.34 10.82-10.34z\"/><path d=\"m44.81 12.32c-.09-.17-.26-.27-.43-.27-.06 0-.12.01-.17.03l-3.65 1.41c-.23.09-.4.26-.49.49-.09.22-.08.46.03.68.19.37.66.57 1.06.41l2.8-1.08s0 0 0 0l1.22-.47.18-.07-.55-1.12z\"/><path d=\"m44.98 14.77c.54.91 1.59 2.75 2.25 4.22.48-.5.9-.81 1.28-.92-.85-1.48-2.04-3.03-2.56-3.67z\"/><path d=\"m34.11 38.71s.05.09.07.16h4.23c.48-.55.74-1.25.74-1.98 0-1.67-1.36-3.03-3.03-3.03s-3.03 1.36-3.03 3.03c0 .31.05.63.15.96 0 0 .02.01.03.02.4.2.68.49.83.85z\"/></svg>", "boat": "<svg class=\"vic vic-boat\" viewBox=\"3.40 23.40 57.20 17.20\" aria-hidden=\"true\"><path d=\"m57.892 29.24c-6.628-2.387-14.225-1.448-14.225-1.448l-36.667 3.208-.3 1.2z\"/><path d=\"m9.16 33.06-5.16.3 2.03 5.62.37 1.02h45.08a28.882 28.882 0 0 0 2.16-1.94 43.319 43.319 0 0 0 6.36-7.94zm35.84 1.94a1 1 0 1 1 1-1 1 1 0 0 1 -1 1zm3 0a1 1 0 1 1 1-1 1 1 0 0 1 -1 1zm3 0a1 1 0 1 1 1-1 1 1 0 0 1 -1 1z\"/><path d=\"m40 24a71.767 71.767 0 0 0 -8.64 1.06l1.2 2.7-.965.085-1.165-2.615a73.615 73.615 0 0 0 -13.012 3.855l25.873-2.264z\"/></svg>"};
  // experience tiles: the setup grows with the level, so the picture shows how much gear each one means
  const EXP = {
    b: [['luxpro'], 'One spray', 1],
    i: [['acc-luxbucket', 'luxfoam', 'acc-luxmit'], 'Bucket wash', 2],
    e: [['ceramicx', 'acc-luxcannon', 'wheelassassin'], 'Cannon + coatings', 3],
  };
  const expPic = v => `<span class="qopt-prod n${EXP[v][0].length}">${EXP[v][0].map((f, i) => `<img src="img/cut/sm/${f}.webp" alt="" loading="lazy" style="--i:${i}">`).join('')}</span>`;
  const LV = { b: 'Beginner', i: 'Intermediate', e: 'Expert' }, VEH = { car: 'Car / Truck', utv: 'UTV', atv: 'ATV', boat: 'Boat' };
  // each goal tile shows the real product shot for that job
  const GOALS = {
    quick: ['Quick clean, no hose', 'A spray and a wipe. Works anywhere.', 'img/real/luxpro.webp'],
    wash: ['A full wash', 'Foam, mitt, bucket, dry.', 'img/real/luxfoam.webp'],
    shine: ['Shine & protection', 'Gloss and a layer that lasts.', 'img/real/ceramicx.webp'],
    wheels: ['Wheels & tires', 'Brake dust off, tires black.', 'img/real/wheelassassin.webp'],
    inside: ['The inside', 'Dash, seats, trim, smell.', 'img/real/interiorx.webp'],
    glass: ['Glass & chrome', 'Windshield, console, chrome.', 'img/real/luxwindow.webp'],
    outside: ['The outside', 'Hull, deck and rails. Wash and shine.', 'img/real/luxmit.webp'],
    unsure: ['Not sure. Start me off', 'We pick the basics for your level.', 'img/real/edgeless.webp'],
  };
  const goalsFor = v => v === 'boat' ? ['outside', 'inside', 'glass', 'unsure'] : v === 'atv' ? ['quick', 'wash', 'shine', 'wheels', 'unsure'] : ['quick', 'wash', 'shine', 'wheels', 'inside', 'unsure'];
  const QS = [
    { key: 'lv', h: 'How much detailing have you done?', opts: () => [
      ['b', 'Beginner', 'Never detailed it myself. I want easy.'],
      ['i', 'Intermediate', 'I wash it myself and want it to look pro.'],
      ['e', 'Expert', 'I own a foam cannon. I know what a high spot is.']] },
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
      outside: B ? ['luxfoam', 'luxmit', 'luxbucket', 'luxdry'] : E ? ['luxfoam', 'luxmit', 'luxbucket', 'luxdry', 'luxpro', 'edgeless', 'luxquick', 'ceramicx'] : ['luxfoam', 'luxmit', 'luxbucket', 'luxdry', 'luxpro', 'edgeless'],
      unsure: B ? ['luxpro', 'interiorx', 'tirevenom'] : E ? ['luxpro', 'restorx', 'interiorx', 'edgeless', 'microlux', 'xpad', 'tirevenom', 'luxquick', 'ceramicx', 'wheelassassin', 'wheelbrush'] : ['luxpro', 'restorx', 'interiorx', 'edgeless', 'microlux', 'xpad', 'tirevenom', 'luxquick'],
    };
    let it = T[goal].slice();
    if (veh === 'boat') {
      // not sure: inside and out, so the first order covers the whole boat
      if (goal === 'unsure') it = B ? ['luxpro', 'edgeless', 'interiorx', 'microlux'] : ['luxpro', 'edgeless', 'interiorx', 'restorx', 'microlux', 'xpad'].concat(E ? ['luxfoam', 'luxmit', 'luxbucket', 'luxdry'] : []);
      if (goal === 'inside') it = it.filter(k => !['newcarember', 'vanillaember'].includes(k));
      notes.push(goal === 'outside' ? 'LusterLux lists a boat exterior cleaner as coming soon. Until then, LuxFoam handles the wash and LuxPro the wipe-downs between trips.'
        : goal === 'unsure' ? 'LusterLux lists boat-specific cleaners as coming soon. Until then, this covers the deck wipe-down and the cockpit.'
        : 'LusterLux lists a boat interior cleaner as coming soon. Until then, this covers the cockpit.');
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
  // the package: the best-value set of their real kits for this answer. It leads; the essentials are the fallback.
  function pkgFor(a) {
    const { lv, veh, goal } = a, B = lv === 'b', E = lv === 'e', ATV = veh === 'atv', UTV = veh === 'utv', BOAT = veh === 'boat';
    const P = {
      quick: ATV ? ['waterlesssys', 'restorx', 'xpad'] : B ? ['completesys'] : E ? ['paintsys', 'luxwindow', 'luxbug'] : ['paintsys'],
      wash: ['ultimatesys', 'luxmit', 'luxbucket'],
      shine: (UTV || ATV) ? ['paintsys', 'restorx', 'xpad'] : E ? ['paintsys', 'luxwindow'] : ['paintsys'],
      wheels: ['rimtiresys'],
      inside: BOAT ? (E ? ['interiorsys', 'luxbrush', 'luxwindow'] : ['interiorsys']) : B ? ['interiorsys'] : E ? ['completeinteriorsys', 'restorx', 'xpad', 'luxwindow'] : ['interiorsys', 'dualscent'],
      glass: ['completesys', 'luxwindow'],
      outside: E ? ['paintsys', 'luxfoam', 'luxmit', 'luxbucket', 'luxdry'] : ['waterlesssys', 'luxfoam', 'luxmit', 'luxbucket', 'luxdry'],
      unsure: BOAT ? ['completesys'] : ATV ? ['waterlesssys', 'restorx', 'tirecaresys'] : UTV ? ['completesys', 'tirecaresys'] : E ? ['completesys', 'rimtiresys', 'ceramicx', 'luxquick'] : ['completesys', 'tirecaresys', 'luxquick'],
    };
    return P[goal] || null;
  }
  // what the package is worth if every piece were bought on its own
  const worth = ks => ks.reduce((s, k) => s + (C[k].parts ? sum(C[k].parts) : C[k].price), 0);
  function picks(a) {
    const notes = [], loose = list(a.lv, a.veh, a.goal, notes);
    const allowed = new Set(['b', 'i', 'e'].flatMap(l => list(l, a.veh, a.goal, [])));
    const out = Object.assign(bundle(loose, allowed), { notes });
    const pk = pkgFor(a);
    if (pk && pk.slice().sort().join() !== out.items.slice().sort().join() && worth(pk) > sum(pk) && worth(pk) >= worth(out.items) - .01) {
      out.pkg = { items: pk, price: sum(pk), worth: worth(pk), note: a.goal === 'wash' ? 'Needs a pressure washer. No pressure washer? The essentials work with a garden hose.' : '' };
    }
    return out;
  }

  // set slideshows: step every visible one forward together
  setInterval(() => {
    $$('[data-show]').forEach(sh => {
      if (!sh.offsetParent || sh.matches(':hover')) return;
      const bs = $$('button', sh), ds = $$('.ftile-dots i', sh), n = bs.findIndex(b => b.classList.contains('is-on')), nx = (n + 1) % bs.length;
      bs.forEach((b, i) => b.classList.toggle('is-on', i === nx)); ds.forEach((d, i) => d.classList.toggle('is-on', i === nx));
    });
  }, 2200);
  window.LLpicks = picks;   // used by the quiz test sweep
  (function quiz() {
    const body = $('[data-quiz-body]'), track = $('[data-quiz-track]');
    if (!body) return;
    const ans = {}; let at = 0;
    const LABEL = { lv: 'Experience', veh: 'Vehicle', goal: 'Goal' };
    const ansName = (k, v) => k === 'lv' ? LV[v] : k === 'veh' ? VEH[v] : GOALS[v][0];
    function side() {
      if (!track) return;
      track.innerHTML = QS.map((q, i) => `<li class="${i < at ? 'is-done' : i === at ? 'is-on' : ''}"><span class="qt-n">${i < at ? '✓' : i + 1}</span>
        <span class="qt-t"><small>${LABEL[q.key]}</small><b>${ans[q.key] ? ansName(q.key, ans[q.key]) : i === at ? 'Choosing…' : '—'}</b></span></li>`).join('');
    }
    function ask() {
      const q = QS[at], opts = q.opts(ans); side();
      const kind = q.key;
      body.innerHTML = `<div class="quiz-q"><p class="quiz-n">Question ${at + 1} of 3</p><h2 id="quiz-h">${q.h}</h2>
        <div class="quiz-opts n${opts.length} k-${kind}">${opts.map(([v, b, s, pic], i) => `<button type="button" class="qopt${ans[q.key] === v ? ' is-picked' : ''}" data-v="${v}" style="--d:${i * 60}ms">
          ${kind === 'goal' ? `<span class="qopt-bg"><img src="${pic}" alt="" loading="lazy"></span><span class="qopt-sp"></span>`
            : kind === 'lv' ? expPic(v)
            : `<span class="qopt-veh">${ICON[v]}</span>`}
          <b>${b}</b><span class="qopt-s">${s}</span>${kind === 'lv' ? `<span class="qopt-lvl" aria-hidden="true">${[1, 2, 3].map(n => `<i class="${n <= EXP[v][2] ? 'on' : ''}"></i>`).join('')}<em>${EXP[v][1]}</em></span>` : ''}<i class="qopt-go" aria-hidden="true">${ARROW}</i></button>`).join('')}</div>
        ${at ? '<button type="button" class="quiz-back" data-back>← Back</button>' : ''}</div>`;
    }
    function finish() {
      at = 3; side();
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
    soap: 'Wash soaps & waterless', foamtool: 'Foam cannons & sprayers', washtool: 'Mitts, buckets & sponges', towel: 'Drying & microfiber towels',
    wheelchem: 'Wheel cleaner & tire dressing', wheeltool: 'Wheel brushes & applicators', protect: 'Ceramic & detail sprays',
    interiorchem: 'Interior cleaner & trim dressing', scent: 'Air fresheners', intool: 'Detail brushes', kit: 'Kits & systems',
  };
  const TYPEOF = {
    luxpro: 'soap', luxfoam: 'soap', luxcannon: 'foamtool', foamx: 'foamtool', luxgun: 'foamtool', luxmit: 'washtool', luxbucket: 'washtool', luxbug: 'washtool',
    luxdry: 'towel', edgeless: 'towel', microlux: 'towel', luxwindow: 'towel', wheelassassin: 'wheelchem', tirevenom: 'wheelchem',
    wheelbrush: 'wheeltool', tirebrush: 'wheeltool', xpad: 'wheeltool', ceramicx: 'protect', luxquick: 'protect',
    interiorx: 'interiorchem', restorx: 'interiorchem', newcarember: 'scent', vanillaember: 'scent', luxbrush: 'intool',
  };
  const typeOf = k => C[k].kit ? 'kit' : TYPEOF[k];
  const card = k => { const it = C[k]; return `<article class="pcard" data-k="${k}">
        <button type="button" class="pcard-img${isPhoto(k) ? ' is-photo' : ''}" data-open="${k}" aria-label="Details for ${it.n}"><img src="${img(k)}" alt="" loading="lazy">
          <span class="pcard-more">View details</span></button>
        <div class="pcard-body"><button type="button" class="pcard-name" data-open="${k}">${nameHTML(k)}</button>${SPEC[k] ? `<span class="pcard-spec">${SPEC[k]}</span>` : ''}<p>${it.what}</p>${it.save ? `<span class="tag">${it.save}</span>` : ''}</div>
        <div class="pcard-foot"><span class="pcard-px">${money(it.price)}</span><button class="pcard-add" type="button" data-add="${k}"><i class="add-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.4"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg></i><span>Add to cart</span></button></div>
      </article>`; };
  // sets they don't sell as one SKU: added together, at the real combined price (no invented discount)
  const SETS = {
    bucket: { n: 'Bucket wash set', items: ['luxfoam', 'luxbucket', 'luxmit', 'luxdry'], p: 'Soap, bucket, mitt and drying towel. Everything for a hand wash.' },
    ceramic: { n: 'Ceramic set', items: ['ceramicx', 'edgeless'], p: 'CeramicX plus the Edgeless towels it’s meant to be spread and buffed with.' },
  };
  const FILL = {
    soap: [['kit', 'waterlesssys'], ['kit', 'foamsys']], foamtool: [['kit', 'ultimatesys']], washtool: [['set', 'bucket']],
    wheelchem: [['kit', 'tirecaresys'], ['kit', 'essentials']], wheeltool: [['kit', 'rimtiresys']],
    protect: [['kit', 'paintsys'], ['set', 'ceramic']], intool: [['kit', 'completeinteriorsys'], ['kit', 'interiorsys'], ['kit', 'dualscent']],
  };
  const fillTile = f => {
    if (f[0] === 'kit') { const it = C[f[1]]; return `<div class="ftile carbon is-kit"><span class="ftile-badge tag">${it.save.startsWith('Saves') ? it.save : 'Bundle'}</span><button type="button" class="ftile-img" data-open="${f[1]}" aria-label="Details for ${it.n}"><img src="${img(f[1])}" alt="" loading="lazy"></button><span class="ftile-k">Get these as a set</span><b><button type="button" class="ftile-name" data-open="${f[1]}">${it.n}</button></b><span>${it.what}</span><div class="ftile-foot"><strong>${money(it.price)}</strong><button type="button" class="pcard-add" data-add="${f[1]}"><i class="add-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.4"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg></i><span>Add to cart</span></button></div></div>`; }
    if (f[0] === 'set') { const s = SETS[f[1]], tot = sum(s.items); return `<div class="ftile carbon is-kit is-set"><span class="ftile-badge tag">Buy together</span><div class="ftile-show" data-show>${s.items.map((k, i) => `<button type="button" class="${i ? '' : 'is-on'}" data-open="${k}" aria-label="${C[k].n}"><img src="${img(k)}" alt="" loading="lazy"><span>${i + 1}/${s.items.length} · ${C[k].n}</span></button>`).join('')}<div class="ftile-dots">${s.items.map((_, i) => `<i class="${i ? '' : 'is-on'}"></i>`).join('')}</div></div><span class="ftile-k">${s.items.length} items, one click</span><b>${s.n}</b><span>${s.p}</span><div class="ftile-foot"><strong>${money(tot)}</strong><button type="button" class="pcard-add" data-add="${s.items.join(',')}"><i class="add-ic" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 4h2.2l2.1 10.2a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.1L20.5 8H6.4"/><circle cx="9.5" cy="19.5" r="1.4"/><circle cx="17" cy="19.5" r="1.4"/></svg></i><span>Add all to cart</span></button></div></div>`; }
    return '';
  };
  const groupsHTML = (keys, kitsFirst, fill) => {
    const by = {}; keys.forEach(k => (by[typeOf(k)] = by[typeOf(k)] || []).push(k));
    const order = kitsFirst ? ['kit'].concat(Object.keys(TYPE).filter(t => t !== 'kit')) : Object.keys(TYPE);
    return `<div class="pgroups">${order.filter(t => by[t]).map(t => {
      const extra = fill && FILL[t] ? FILL[t] : [];
      const n = by[t].length + extra.length;
      const quiz = fill && t === 'kit' && n % 4 ? `<a class="ftile carbon is-quiz" href="#quiz" style="grid-column:span ${4 - n % 4}"><span class="ftile-badge">Not sure?</span><b>Answer 3 questions and we’ll pick the set for you.</b><em>Find my products →</em></a>` : '';
      return `<div class="pgroup" style="--n:${Math.min(4, n)}"><h5>${TYPE[t]}</h5><div class="pgroup-grid">${by[t].map(card).join('')}${extra.map(fillTile).join('')}${quiz}</div></div>`;
    }).join('')}</div>`;
  };

  // the quiz lands here
  window.LLshowPicks = (a, p) => {
    const el = $('[data-picks]'); if (!el) return;
    let sel = p.pkg ? 'pkg' : 'basic';
    const render = () => {
      const items = sel === 'pkg' ? p.pkg.items : p.items;
      const total = sum(items);
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
            <h3>Picked for you</h3><p>${head}</p>${sel === 'basic' ? swapNotes : ''}${p.notes.map(n => `<p class="picks-note">${n}</p>`).join('')}</div>
          <div class="picks-buy"><span>${sel === 'pkg' ? 'Package deal' : `${items.length} item${items.length === 1 ? '' : 's'}`}</span><strong>${money(total)}</strong>
            ${sel === 'pkg' ? `<em class="picks-worth">${money(p.pkg.worth)} of product if bought separately</em>` : ''}
            <button class="btn" type="button" data-add="${items.join(',')}"><span>Add all to cart</span><i class="btn-ic" aria-hidden="true">${ARROW}</i></button>
            <a class="picks-go" href="${permalink(Object.fromEntries(items.map(k => [k, 1])))}">Or check out now →</a>
            <button class="picks-redo" type="button" onclick="LLredoQuiz()">Change answers</button></div>
        </div>
        ${p.pkg ? `<div class="picks-opts" role="radiogroup" aria-label="Choose a package or just the essentials">
          <button type="button" role="radio" aria-checked="${sel === 'pkg'}" data-sel="pkg"><span class="po-badge">Best value</span><b>Package deal</b><strong>${money(p.pkg.price)}</strong>
            <em>${money(p.pkg.worth - p.pkg.price)} less than buying it all separately · ${p.pkg.items.map(k => C[k].n).join(' + ')}</em>${p.pkg.note ? `<small>${p.pkg.note}</small>` : ''}</button>
          <button type="button" role="radio" aria-checked="${sel === 'basic'}" data-sel="basic"><b>Just the essentials</b><strong>${money(sum(p.items))}</strong>
            <em>${p.items.map(k => C[k].n).join(' + ')}</em></button></div>` : ''}
        ${sel === 'basic' ? up : ''}
        ${groupsHTML(items, true)}
        ${sel === 'pkg' ? (() => { const inside = [...new Set(items.filter(k => C[k].kit).flatMap(k => C[k].parts))].filter(k => !items.includes(k));
          return inside.length ? `<div class="pgroups picks-inside"><div class="pgroup" style="--n:${Math.min(4, inside.length)}"><h5>Inside the package</h5><div class="pgroup-grid">${inside.map(card).join('')}</div></div></div>` : ''; })() : ''}
        <p class="picks-rest">Tap any product for the full details. Everything else they make is below, sorted the same way.</p></div>`;
      $$('[data-sel]', el).forEach(b => b.addEventListener('click', () => { sel = b.dataset.sel; render(); }));
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
      { cat: 'wash', h: 'Wash & Foam', p: 'Get the dirt off without scratching. Bottles first, then the tools that apply them.', types: ['soap', 'foamtool', 'washtool'] },
      { cat: 'towels', h: 'Towels & Drying', p: 'One job per towel: drying, paint, interior, glass. Mixing them is how streaks happen.', types: ['towel'] },
      { cat: 'wheels', h: 'Wheels & Tires', p: 'Wheels get cleaned first so brake dust never splashes onto clean paint. Tires get dressed last.', types: ['wheelchem', 'wheeltool'] },
      { cat: 'protect', h: 'Shine & Protection', p: 'After the wash. Gloss, plus a layer that makes the next wash easier.', types: ['protect'] },
      { cat: 'interior', h: 'Interior & Trim', p: 'Cabin surfaces, faded plastic and the smell.', types: ['interiorchem', 'scent', 'intool'] },
      { cat: 'kits', h: 'Kits & Systems', p: 'Bundles that cost less than the same items bought apart. Every saving shown is the real math.', types: ['kit'] },
    ];
    const wrap = $('[data-shop-aisles]'), chips = $('[data-shop-chips]');
    if (!wrap) return;
    const keysOf = types => Object.keys(C).filter(k => types.includes(typeOf(k)));
    const CI = {
      all: '<rect x="4" y="4" width="7" height="7" rx="2"/><rect x="13" y="4" width="7" height="7" rx="2"/><rect x="4" y="13" width="7" height="7" rx="2"/><rect x="13" y="13" width="7" height="7" rx="2"/>',
      wash: '<path d="M12 3c3 4 6 7.5 6 11a6 6 0 0 1-12 0c0-3.5 3-7 6-11z"/><path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5"/>',
      towels: '<path d="M4 7h13a3 3 0 0 1 3 3v8H7a3 3 0 0 1-3-3z"/><path d="M4 7v8"/><path d="M9 12h7"/>',
      wheels: '<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="3"/><path d="M12 3.5V9M12 15v5.5M3.5 12H9M15 12h5.5"/>',
      protect: '<path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z"/><path d="M9 12l2 2 4-4"/>',
      interior: '<path d="M8 3h4a2 2 0 0 1 2 2l-1 8h4a2 2 0 0 1 2 2v4H7.5L6 5a2 2 0 0 1 2-2z"/><path d="M8 21v-2M17 21v-2"/>',
      kits: '<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
    };
    const count = c => c === 'all' ? Object.keys(C).length : keysOf(AISLES.find(a => a.cat === c).types).length;
    chips.innerHTML = [['all', 'All'], ...AISLES.map(a => [a.cat, a.h])].map(([c, l], i) => `<button type="button" role="tab" data-cat="${c}" aria-selected="${i === 0}"><i class="chip-ic" aria-hidden="true"><svg viewBox="0 0 24 24">${CI[c]}</svg></i><span>${l}</span><em>${count(c)}</em></button>`).join('');
    wrap.innerHTML = AISLES.map(a => `<div class="aisle" data-aisle="${a.cat}"><div class="aisle-bar"><h3>${a.h}</h3><p>${a.p}</p></div>${groupsHTML(keysOf(a.types), false, true)}</div>`).join('');
    let cat = 'all';
    function filter() {
      $$('.aisle', wrap).forEach(a => {
        let any = false;
        $$('.pgroup', a).forEach(g => {
          let gAny = false;
          gAny = $$('.pcard', g).length > 0;
          g.hidden = !gAny; g.style.setProperty('--n', Math.min(4, $$('.pcard:not([hidden]), .ftile', g).length || 1)); any = any || gAny;
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
      if (!w || !h || !im.naturalWidth) return [];   // not laid out or not loaded yet: no particles this pass
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
      if (!A.length || !Bp.length) return;   // images not ready yet; the next resize or scroll pass retries
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
      // the bottle takes over before the particles land, so it never sits there pixelated.
      // With WebGL it's the real 3D bottle, which turns a full 360 as you scroll its description and
      // comes back face-on for the next molecule change.
      const crispA = 1 - smooth(.04, .3, cl);
      const art = arts[k === 'luxpro' ? 0 : 1], ar = art.getBoundingClientRect();
      const vhh = innerHeight, [s0, e0] = k === 'luxpro' ? [.1, 1.15] : [.42, .95];
      const sp = clamp((s0 * vhh - ar.top) / (s0 * vhh - e0 * vhh + ar.height));
      const g3 = window.LL3D;
      if (g3) {
        g3.product(k);
        g3.opacity(crispA);
        g3.rotate(reduce ? 0 : ease(sp) * Math.PI * 2);
        imgs.luxpro.style.opacity = 0; imgs.ceramicx.style.opacity = 0;
      } else {
        imgs.luxpro.style.opacity = k === 'luxpro' ? crispA : 0;
        imgs.ceramicx.style.opacity = k === 'ceramicx' ? crispA : 0;
        imgs[k].style.transform = 'translateX(-50%)';
      }
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
    const vids = reels.map(r => $('video', r)), segs = $$('[data-reel-segs] i b'), phone = $('.iphone');
    const snd = $('[data-reel-sound]'), paused = $('[data-reel-paused]');
    let i = 0, muted = true, inView = false, hold = false;
    const cur = () => vids[i];
    function go(n) {
      vids[i].pause();
      i = (n + vids.length) % vids.length;
      reels.forEach((r, k) => r.classList.toggle('is-on', k === i));
      segs.forEach((s, k) => s.style.width = k < i ? '100%' : '0%');
      const v = cur(); v.preload = 'auto'; v.muted = muted; v.currentTime = 0;
      vids[(i + 1) % vids.length].preload = 'metadata';
      hold = false; paused.classList.remove('on');
      if (inView) v.play().catch(() => {});
    }
    vids.forEach((v, k) => {
      v.addEventListener('ended', () => { if (k === i) go(i + 1); });
      v.addEventListener('timeupdate', () => { if (k === i && v.duration) segs[k].style.width = (v.currentTime / v.duration * 100) + '%'; });
    });
    // tap left / right to skip, middle to pause
    $$('[data-reel-go]').forEach(t => t.addEventListener('click', () => {
      const d = +t.dataset.reelGo;
      if (d) return go(i + d);
      const v = cur();
      if (v.paused) { hold = false; v.play().catch(() => {}); paused.classList.remove('on'); } else { hold = true; v.pause(); paused.classList.add('on'); }
    }));
    snd.addEventListener('click', () => {
      muted = !muted; vids.forEach(v => { v.muted = muted; });
      snd.setAttribute('aria-pressed', !muted); snd.classList.toggle('is-on', !muted);
      $('span', snd).textContent = muted ? 'Tap for sound' : 'Sound on';
      if (!muted && cur().paused) { hold = false; cur().play().catch(() => {}); paused.classList.remove('on'); }
    });
    // only play while the phone is on screen; reduced motion waits for a tap
    const setView = on => {
      if (on === inView) return; inView = on;
      if (inView && !hold && !reduce) cur().play().catch(() => {}); else cur().pause();
    };
    new IntersectionObserver(es => es.forEach(e => setView(e.isIntersecting)), { threshold: .35 }).observe(phone);
    // backup for browsers that throttle observers: check the phone's position on scroll
    let tick = 0;
    const check = () => { tick = 0; const b = phone.getBoundingClientRect(), vis = Math.min(b.bottom, innerHeight) - Math.max(b.top, 0); setView(vis > b.height * .35); };
    addEventListener('scroll', () => { if (!tick) tick = setTimeout(check, 120); }, { passive: true });
    go(0); check();
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
