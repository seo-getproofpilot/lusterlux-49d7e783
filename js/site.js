/* LusterLux concept homepage v2
   Every price, variant id, coverage figure and durability claim below comes from
   lusterluxauto.com/products.json (pulled 2026-11-14). Nothing is invented. */
(() => {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const money = n => '$' + n.toFixed(2);

  /* ---------------- catalog ----------------
     step: where it sits in a wash (1 wash, 2 wheels, 3 dry, 4 protect, 5 dress, 6 interior, 0 kit)
     easy: forgiving enough for a first-timer (spray-and-wipe, or a tool with no learning curve) */
  const STEPS = ['Kit', 'Wash', 'Wheels & tires', 'Dry', 'Protect & glass', 'Dress & trim', 'Interior'];
  const C = {
    luxpro:        { n: 'LuxPro', h: '<em>Lux</em>Pro', price: 19.99, vid: 59846340902993, cut: 1, step: 1, easy: 1, cat: 'wash', what: 'Cleans dust, pollen and fingerprints with no water at all. Leaves a slick, dust-repelling layer.' },
    luxfoam:       { n: 'LuxFoam', h: '<em>Lux</em>Foam', price: 19.99, vid: 59846347259985, cut: 1, step: 1, easy: 1, cat: 'wash', what: 'Thick foam soap for a foam cannon, the FoamX or a plain bucket. Safe on wax and ceramic.' },
    luxcannon:     { n: 'LuxCannon', h: 'LuxCannon', plain: 1, price: 49.99, vid: 59481229787217, img: 'cut/sm/acc-luxcannon.webp', step: 1, cat: 'wash', what: 'Turns LuxFoam into clinging foam. Screws onto a pressure washer.' },
    foamx:         { n: 'FoamX Sprayer', h: 'FoamX Sprayer', plain: 1, price: 31.99, vid: 59621805490257, img: 'cut/sm/acc-foamx.webp', step: 1, easy: 1, cat: 'wash', what: 'Cordless, rechargeable foam sprayer. Thick foam with no pressure washer.' },
    luxmit:        { n: 'LuxMit', h: 'LuxMit', plain: 1, price: 19.19, vid: 59481254821969, img: 'cut/sm/acc-luxmit.webp', step: 1, easy: 1, cat: 'wash', what: 'Microfiber wash mitt that pulls grit into the fibers instead of dragging it across paint.' },
    luxbucket:     { n: 'LuxBucket', h: 'LuxBucket', plain: 1, price: 14.99, vid: 59621744214097, img: 'cut/sm/acc-luxbucket.webp', step: 1, easy: 1, cat: 'wash', what: 'Heavy-duty wash bucket for mixing soap and rinsing your mitt.' },
    luxgun:        { n: 'LuxGun', h: 'LuxGun', plain: 1, price: 49.99, vid: 59481217892433, img: 'cut/sm/acc-luxgun.webp', step: 1, cat: 'wash', what: 'Ergonomic pressure washer gun with quick-connect fittings. Less hand fatigue on long washes.' },
    luxdry:        { n: 'LuxDry towel', h: 'LuxDry Towel', plain: 1, price: 39.99, vid: 59846363742289, img: 'p/luxtowel-0.jpg', step: 3, easy: 1, cat: 'wash', what: '2 × 3 ft, 1300 GSM drying towel. Dries the whole car in fewer passes, without water spots.' },
    wheelassassin: { n: 'LuxWheelAssassin', h: '<em>Lux</em>WheelAssassin', price: 17.99, vid: 59846363152465, cut: 1, step: 2, easy: 1, cat: 'wheels', what: 'Spray it, let it sit, rinse. Breaks down brake dust and road grime on any wheel.' },
    tirevenom:     { n: 'TireVenom', h: '<em>Tire</em>Venom', price: 22.99, vid: 59846342475857, cut: 1, step: 5, easy: 1, cat: 'wheels', what: 'Deep black tire finish that dries to the touch, so it won’t sling. Up to 3 months.' },
    wheelbrush:    { n: 'Lux Wheel Brush', h: 'Lux Wheel Brush', plain: 1, price: 18.39, vid: 59481305153617, img: 'p/acc-wheelbrush.jpg', step: 2, cat: 'wheels', what: 'Long brush that reaches between spokes and into the wheel barrel.' },
    tirebrush:     { n: 'Lux Tire Brush', h: 'Lux Tire Brush', plain: 1, price: 18.99, vid: 59481309806673, img: 'p/acc-tirebrush.jpg', step: 2, cat: 'wheels', what: 'Stiff brush that scrubs old dressing and browning off the sidewall.' },
    xpad:          { n: 'XPad applicators (2)', h: 'XPad Applicators', plain: 1, price: 15.99, vid: 59481312591953, img: 'p/acc-xpad.jpg', step: 5, easy: 1, cat: 'wheels', what: 'Applies TireVenom and RestorX evenly instead of soaking a towel.' },
    ceramicx:      { n: 'CeramicX', h: 'Ceramic<em>X</em>', price: 27.99, vid: 59846341853265, cut: 1, step: 4, cat: 'protect', what: 'Spray-on ceramic layer. Water beads, gloss deepens, up to 8 months per coat.' },
    luxquick:      { n: 'LuxQuick', h: '<em>Lux</em>Quick', price: 17.99, vid: 59846342246481, cut: 1, step: 4, easy: 1, cat: 'protect', what: 'Wipes off fingerprints, smudges and fresh water spots between washes, and adds gloss.' },
    edgeless:      { n: 'Edgeless Lux towels (3)', h: 'Edgeless Lux Towels', plain: 1, price: 15.99, vid: 59846408798289, img: 'p/acc-edgeless.jpg', step: 4, easy: 1, cat: 'protect', what: 'Exterior microfiber with no stitched edge to drag across paint. For LuxPro, LuxQuick and CeramicX.' },
    interiorx:     { n: 'InteriorX', h: 'Interior<em>X</em>', price: 19.99, vid: 59846363545681, cut: 1, step: 6, easy: 1, cat: 'interior', what: 'Dash, doors, console, steering wheel and seats. Clean, with no streaks or greasy shine.' },
    restorx:       { n: 'RestorX', h: 'Restor<em>X</em>', price: 22.99, vid: 59846342377553, cut: 1, step: 5, easy: 1, cat: 'interior', what: 'Brings faded black trim, rubber and vinyl back. Up to 6 months outside, 8 inside.' },
    microlux:      { n: 'MicroLux towels (5)', h: 'MicroLux Towels', plain: 1, price: 15.99, vid: 59846409027665, img: 'p/acc-microlux.jpg', step: 6, easy: 1, cat: 'interior', what: 'Interior towels, kept apart from the exterior ones so nothing greasy touches paint.' },
    luxwindow:     { n: 'LuxWindow towels (2)', h: 'LuxWindow Towels', plain: 1, price: 11.99, vid: 59846405292113, step: 4, easy: 1, cat: 'towels', what: 'Waffle-weave glass towels. Streak-free, lint-free windows and mirrors.' },
    luxbug:        { n: 'LuxBug sponge', h: 'LuxBug Sponge', plain: 1, price: 11.99, vid: 59481314820177, step: 1, easy: 1, cat: 'wash', what: 'Bug and tar sponge. Lifts splatter, tar and sap without scratching paint.' },
    newcarember:   { n: 'NewCarEmber', h: 'NewCarEmber', plain: 1, price: 11.99, vid: 59846345031761, step: 6, easy: 1, cat: 'interior', what: 'New-car scent spray, 8 oz. Kills odors without being overpowering.' },
    vanillaember:  { n: 'VanillaEmber', h: 'VanillaEmber', plain: 1, price: 11.99, vid: 59846344245329, step: 6, easy: 1, cat: 'interior', what: 'Warm vanilla scent spray, 8 oz. Kills odors without being overpowering.' },
    luxbrush:      { n: 'Lux Brush', h: 'Lux Brush', plain: 1, price: 23.99, vid: 59481298763857, img: 'cut/sm/acc-luxbrush.webp', step: 6, cat: 'interior', what: 'Soft curved brush for vents, seams, buttons and stitching.' },
    // systems: what's inside + the real savings vs. buying the same items apart
    essentials:    { n: 'Essentials Kit', h: 'Essentials Kit', plain: 1, kit: 1, price: 39.99, vid: 62697809150033, img: 'p/acc-essentials.webp', step: 0, easy: 1, cat: 'kits', what: 'LuxPro, InteriorX and TireVenom, plus 5 towels and an applicator pad.', save: 'Three bottles alone are $62.97' },
    waterlesssys:  { n: 'Waterless Detail System', h: 'Waterless Detail System', plain: 1, kit: 1, price: 25.99, vid: 59835938078801, img: 'p/acc-waterlesssys.webp', step: 0, easy: 1, cat: 'kits', what: 'LuxPro plus 3 Edgeless towels. Everything for a wash with no hose.', save: 'Saves $9.99' },
    foamsys:       { n: 'Foam Wash System', h: 'Foam Wash System', plain: 1, kit: 1, price: 79.99, vid: 59835928772689, img: 'p/acc-foamsys.jpg', step: 0, cat: 'kits', what: 'LuxCannon plus 2 bottles of LuxFoam. Needs a pressure washer.', save: 'Saves $9.98' },
    ultimatesys:   { n: 'Ultimate Wash System', h: 'Ultimate Wash System', plain: 1, kit: 1, price: 124.99, vid: 59835930509393, img: 'p/acc-ultimatesys.webp', step: 0, cat: 'kits', what: 'LuxGun, LuxCannon, LuxFoam, LuxDry, 5 quick-connect nozzles and a coupler.', save: 'Saves $34.97, nozzles included' },
    paintsys:      { n: 'Paint Care System', h: 'Paint Care System', plain: 1, kit: 1, price: 72.99, vid: 59835922219089, img: 'p/acc-paintsys.webp', step: 0, cat: 'kits', what: 'LuxPro, LuxQuick and CeramicX plus 3 Edgeless towels. Clean, shine, protect.', save: 'Saves $8.97' },
    rimtiresys:    { n: 'Rim & Tire System', h: 'Rim & Tire System', plain: 1, kit: 1, price: 85.99, vid: 59835924316241, img: 'p/acc-rimtiresys.webp', step: 0, cat: 'kits', what: 'LuxWheelAssassin, TireVenom, both brushes and 2 XPads.', save: 'Saves $8.36' },
    completesys:   { n: 'Complete Detail System', h: 'Complete Detail System', plain: 1, kit: 1, price: 59.99, vid: 59835872477265, img: 'p/acc-completesys.jpg', step: 0, easy: 1, cat: 'kits', what: 'LuxPro, RestorX, InteriorX, 8 towels and an XPad. Inside and out.', save: 'Saves $50.95' },
  };
  const REAL = ['luxpro', 'luxfoam', 'luxcannon', 'foamx', 'luxmit', 'luxbucket', 'luxgun', 'luxdry', 'wheelassassin', 'tirevenom', 'wheelbrush', 'tirebrush', 'ceramicx', 'luxquick', 'edgeless', 'interiorx', 'restorx', 'microlux', 'luxbrush', 'luxwindow', 'luxbug', 'newcarember', 'vanillaember'];
  // cards, quiz and cart use each product's own in-use photo; kits and XPad only exist as studio shots
  const img = k => REAL.includes(k) ? `img/real/${k}.webp` : C[k].cut ? `img/cut/sm/${k}.webp` : `img/${C[k].img}`;
  const isPhoto = k => REAL.includes(k) || C[k].kit;
  const title = (k, tag = 'h4') => `<${tag} class="${C[k].plain ? 'plain' : 'lbl'}">${C[k].h}</${tag}>`;

  /* ---------------- cart ---------------- */
  const KEY = 'llx_cart_v1';
  let cart = {};
  try { cart = JSON.parse(localStorage.getItem(KEY)) || {}; } catch (e) { cart = {}; }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} };
  const cartEl = $('[data-cart]'), scrim = $('[data-cart-scrim]'), countEl = $('[data-cart-count]');
  const permalink = keys => 'https://lusterluxauto.com/cart/' + keys.map(k => C[k].vid + ':' + (cart[k] || 1)).join(',');
  function renderCart(bump) {
    const keys = Object.keys(cart).filter(k => cart[k] > 0 && C[k]);
    const n = keys.reduce((s, k) => s + cart[k], 0);
    countEl.textContent = n;
    countEl.classList.toggle('has', n > 0);
    if (bump) { countEl.classList.remove('bump'); void countEl.offsetWidth; countEl.classList.add('bump'); }
    $('[data-cart-lines]').innerHTML = keys.length ? keys.map(k => `<li class="cline"><img class="${isPhoto(k) ? 'is-photo' : ''}" src="${img(k)}" alt=""><div><b>${C[k].n}</b>
        <span class="qty"><button type="button" data-q="${k}" data-d="-1" aria-label="Fewer">−</button>${cart[k]}<button type="button" data-q="${k}" data-d="1" aria-label="More">+</button></span></div>
        <span class="px">${money(C[k].price * cart[k])}</span></li>`).join('') : '<li class="cart-empty">Nothing in here yet.</li>';
    $('[data-cart-sub]').textContent = money(keys.reduce((s, k) => s + C[k].price * cart[k], 0));
    const co = $('[data-checkout]');
    co.href = keys.length ? permalink(keys) : '#';
    co.toggleAttribute('aria-disabled', !keys.length);
  }
  let toastT;
  function toast(msg) { const t = $('[data-toast]'); t.textContent = msg; t.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(() => t.classList.remove('on'), 2200); }
  function add(keys) {
    keys = [].concat(keys).filter(k => C[k]);
    keys.forEach(k => { cart[k] = (cart[k] || 0) + 1; });
    save(); renderCart(true);
    toast(keys.length > 1 ? `${keys.length} items added` : `${C[keys[0]].n} added`);
  }
  function openCart(on) {
    cartEl.classList.toggle('open', on); cartEl.setAttribute('aria-hidden', !on);
    scrim.hidden = !on; document.body.style.overflow = on ? 'hidden' : '';
  }
  document.addEventListener('click', e => {
    const a = e.target.closest('[data-add]'); if (a && a.dataset.add) add(a.dataset.add.split(','));
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

  /* ================= HERO: a waving hex sheet behind the copy + their own product photos ================= */
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
      // the sheet: every vertex rides the same wave field, so neighbouring hexes stay stitched together
      const wave = (x, y, t) => Math.sin(x * .0055 + t * .8) * Math.cos(y * .0075 - t * .55) + .55 * Math.sin((x * .6 + y) * .0045 + t * 1.15);
      const S = 28, HW = Math.sqrt(3) * S, VH = 1.5 * S, A = [0, 1, 2, 3, 4, 5].map(i => Math.PI / 180 * (60 * i - 30));
      function frame(ms) {
        const t = ms * .001;
        ctx.clearRect(0, 0, W, H);
        const cols = Math.ceil(W / HW) + 3, rows = Math.ceil(H / VH) + 4, NB = 8;
        const lines = Array.from({ length: NB }, () => new Path2D()), fills = Array.from({ length: NB }, () => new Path2D());
        const P = (x, y) => {
          const z = wave(x, y, t), k = .78 + .34 * (y / H);           // rows lower on screen sit closer
          return [W * .32 + (x - W * .32) * k + z * 7, y - z * 26, z];
        };
        for (let r = -3; r < rows; r++) for (let c = -2; c < cols; c++) {
          const cx = c * HW + (r & 1 ? HW / 2 : 0), cy = r * VH;
          const zc = wave(cx, cy, t), b = Math.max(0, Math.min(NB - 1, Math.floor((zc + 1.55) / 3.1 * NB)));
          const path = lines[b], fp = fills[b];
          A.forEach((a, i) => {
            const p = P(cx + Math.cos(a) * S * .94, cy + Math.sin(a) * S * .94);
            i ? (path.lineTo(p[0], p[1]), fp.lineTo(p[0], p[1])) : (path.moveTo(p[0], p[1]), fp.moveTo(p[0], p[1]));
          });
          path.closePath(); fp.closePath();
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
    // product photo rotation, each slide named so you know which bottle you're looking at
    const slides = $$('[data-slide]'), dots = $$('[data-slide-go]');
    let si = 0, timer;
    function go(i) {
      si = (i + slides.length) % slides.length;
      slides.forEach((s, j) => s.classList.toggle('is-on', j === si));
      dots.forEach((d, j) => { d.classList.toggle('is-on', j === si); d.setAttribute('aria-current', j === si); });
      clearTimeout(timer); if (!reduce) timer = setTimeout(() => go(si + 1), 5200);
    }
    dots.forEach((d, j) => d.addEventListener('click', () => go(j)));
    if (slides.length) go(0);
  })();

  /* ================= QUIZ: three taps, then straight to their aisle in the shop =================
     The pick logic in plain words:
     - EXPERIENCE sets how many steps. Beginners get spray-and-wipe bottles and the fewest moves; CeramicX
       waits until washing is routine (it goes on clean paint and is buffed off panel by panel).
     - VEHICLE sets the surfaces. UTVs and ATVs are mostly plastic, so RestorX comes along; ATVs have no
       cabin. Boats get cockpit products only, because LusterLux lists its boat cleaners as coming soon.
     - GOAL sets the aisle. "Not sure" gets a starter set for their level. */
  const ICON = {
    b: '<svg viewBox="0 0 48 48"><rect class="f" x="8" y="28" width="8" height="12" rx="1.5"/><rect class="f o" x="20" y="18" width="8" height="22" rx="1.5"/><rect class="f o" x="32" y="8" width="8" height="32" rx="1.5"/></svg>',
    i: '<svg viewBox="0 0 48 48"><rect class="f" x="8" y="28" width="8" height="12" rx="1.5"/><rect class="f" x="20" y="18" width="8" height="22" rx="1.5"/><rect class="f o" x="32" y="8" width="8" height="32" rx="1.5"/></svg>',
    e: '<svg viewBox="0 0 48 48"><rect class="f" x="8" y="28" width="8" height="12" rx="1.5"/><rect class="f" x="20" y="18" width="8" height="22" rx="1.5"/><rect class="f" x="32" y="8" width="8" height="32" rx="1.5"/></svg>',
    car: '<svg viewBox="0 0 48 48"><path d="M4 31v-6l5-2 6-7h15l7 7 6 2v6"/><path d="M4 31h4m10 0h12m10 0h4"/><circle cx="13" cy="31" r="4.5"/><circle cx="35" cy="31" r="4.5"/><path d="M17 16.5l-2 6.5h20l-5-6.5"/></svg>',
    utv: '<svg viewBox="0 0 48 48"><circle cx="12" cy="32" r="6"/><circle cx="37" cy="32" r="6"/><path d="M18 32h13"/><path d="M6 27l4-5h28l5 5"/><path d="M14 22V11h16l6 11"/><path d="M22 11v11"/></svg>',
    atv: '<svg viewBox="0 0 48 48"><circle cx="11" cy="32" r="7"/><circle cx="37" cy="32" r="7"/><path d="M18 32h12"/><path d="M8 24l6-5h20l6 5"/><path d="M18 19v-4h10"/><path d="M33 19l3-7h5"/></svg>',
    boat: '<svg viewBox="0 0 48 48"><path d="M4 27h40l-6 10H11z"/><path d="M15 27v-8h13l7 8"/><path d="M21 19v-6"/><path d="M4 42c4-2.5 7-2.5 10 0s6 2.5 10 0 7-2.5 10 0 6 2.5 10 0"/></svg>',
    quick: '<svg viewBox="0 0 48 48"><path d="M24 6s11 13 11 21a11 11 0 0 1-22 0c0-8 11-21 11-21z"/><path d="M8 8l32 32"/></svg>',
    wash: '<svg viewBox="0 0 48 48"><path d="M10 18h28l-3 24H13z"/><path d="M14 18c0-6 20-6 20 0"/><circle cx="17" cy="11" r="3"/><circle cx="25" cy="8" r="2.2"/><circle cx="31" cy="12" r="2.6"/></svg>',
    shine: '<svg viewBox="0 0 48 48"><path d="M24 5l4 13 13 4-13 4-4 13-4-13-13-4 13-4z"/><path d="M38 33l1.6 4.4L44 39l-4.4 1.6L38 45l-1.6-4.4L32 39l4.4-1.6z"/></svg>',
    wheels: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="5"/><path d="M24 6v13M24 29v13M6 24h13M29 24h13M11.3 11.3l9.2 9.2M27.5 27.5l9.2 9.2M36.7 11.3l-9.2 9.2M20.5 27.5l-9.2 9.2"/></svg>',
    inside: '<svg viewBox="0 0 48 48"><path d="M14 6h12a4 4 0 0 1 4 4l-2 18H14l-2-18a4 4 0 0 1 2-4z"/><path d="M12 28h20l6 8v6H10v-6z"/></svg>',
    glass: '<svg viewBox="0 0 48 48"><path d="M6 34L14 12h20l8 22z"/><path d="M18 30l8-14M26 30l5-8"/></svg>',
    unsure: '<svg viewBox="0 0 48 48"><circle cx="24" cy="24" r="18"/><path d="M18.5 19a5.5 5.5 0 1 1 7.7 5c-1.5.7-2.2 2-2.2 3.5V29"/><circle class="f" cx="24" cy="35" r="1.8"/></svg>',
  };
  const LV = { b: 'Beginner', i: 'Intermediate', e: 'Expert' }, VEH = { car: 'Car / Truck', utv: 'UTV', atv: 'ATV', boat: 'Boat' };
  const GOALS = {
    quick: ['Quick clean, no hose', 'Dust and fingerprints gone with a spray and a wipe.'],
    wash: ['A full wash', 'Foam, mitt, bucket, dry. The real thing.'],
    shine: ['Shine & protection', 'Gloss, water beading and a layer that lasts.'],
    wheels: ['Wheels & tires', 'Brake dust off, deep black tires.'],
    inside: ['The inside', 'Dash, seats, trim and the smell.'],
    glass: ['Glass & chrome', 'Windshield, console glass and chrome.'],
    unsure: ['Not sure. Start me off', 'We pick the basics for your level.'],
  };
  const goalsFor = v => v === 'boat' ? ['inside', 'glass', 'unsure'] : v === 'atv' ? ['quick', 'wash', 'shine', 'wheels', 'unsure'] : ['quick', 'wash', 'shine', 'wheels', 'inside', 'unsure'];
  const QS = [
    { key: 'lv', h: 'How much detailing have you done?', help: 'No wrong answer. It decides how many steps we hand you.', opts: () => [
      ['b', 'Beginner', 'Car washes and gas-station vacuums. Never done it myself.'],
      ['i', 'Intermediate', 'I wash it myself and want it to look better and last longer.'],
      ['e', 'Expert', 'I own a foam cannon, I know what a high spot is, and I’m picky.']] },
    { key: 'veh', h: 'What are you cleaning?', help: 'Different surfaces need different bottles.', opts: () => [
      ['car', 'Car / Truck', 'Paint, glass, wheels, cabin.'], ['utv', 'UTV', 'Plastic panels, a cab, trail dust.'],
      ['atv', 'ATV', 'Plastic fenders, vinyl seat.'], ['boat', 'Boat', 'Vinyl seats, dash, trim, glass.']] },
    { key: 'goal', h: 'What do you want to tackle first?', help: 'Pick one. You can always come back for the rest.', opts: a => goalsFor(a.veh).map(g => [g, ...GOALS[g]]) },
  ];
  function picks(a) {
    const { lv, veh, goal } = a, B = lv === 'b', E = lv === 'e', OFF = veh === 'utv' || veh === 'atv';
    let it = [], notes = [];
    const T = {
      quick:  B ? ['waterlesssys', 'luxquick'] : E ? ['waterlesssys', 'luxquick', 'ceramicx', 'luxwindow', 'luxbug'] : ['waterlesssys', 'luxquick', 'ceramicx'],
      wash:   B ? ['luxfoam', 'luxmit', 'luxbucket', 'luxdry'] : E ? ['ultimatesys', 'luxmit', 'luxbucket', 'luxbug', 'edgeless'] : ['foamx', 'luxfoam', 'luxmit', 'luxbucket', 'luxdry', 'luxbug'],
      shine:  B ? ['luxquick', 'edgeless'] : E ? ['paintsys', 'luxwindow'] : ['ceramicx', 'luxquick', 'edgeless'],
      wheels: B ? ['wheelassassin', 'tirevenom', 'xpad'] : E ? ['rimtiresys'] : ['wheelassassin', 'wheelbrush', 'tirevenom', 'xpad'],
      inside: B ? ['interiorx', 'microlux'] : E ? ['interiorx', 'restorx', 'microlux', 'xpad', 'luxbrush', 'luxwindow', 'newcarember'] : ['interiorx', 'restorx', 'microlux', 'xpad', 'newcarember'],
      glass:  B ? ['luxpro', 'luxwindow'] : ['luxpro', 'edgeless', 'luxwindow'],
      unsure: B ? ['essentials'] : E ? ['completesys', 'ceramicx', 'luxquick', 'wheelassassin', 'wheelbrush', 'tirevenom'] : ['completesys', 'tirevenom', 'luxquick'],
    };
    it = T[goal].slice();
    if (veh === 'boat') {
      if (goal === 'unsure') it = B ? ['interiorx', 'restorx', 'microlux', 'xpad'] : ['interiorx', 'restorx', 'microlux', 'xpad', 'luxpro', 'edgeless'];
      if (goal === 'inside') it = it.filter(k => k !== 'newcarember');
      notes.push('LusterLux lists a boat exterior cleaner and a boat interior cleaner as coming soon. Until then, this covers the cockpit.');
    }
    if (OFF) {
      if (goal === 'unsure') it = B ? ['waterlesssys', 'restorx', 'xpad'] : ['luxfoam', 'luxmit', 'luxbucket', 'wheelassassin', 'restorx', 'xpad'].concat(E ? ['foamx', 'ceramicx'] : []);
      if (goal === 'quick') notes.push('Waterless handles dust and trail film. Caked mud needs a rinse first: a self-serve bay works.');
      if (veh === 'atv') it = it.filter(k => !['interiorx', 'microlux', 'newcarember', 'vanillaember', 'luxwindow'].includes(k));
      if (goal === 'shine' && !it.includes('restorx')) it.push('restorx', 'xpad');
    }
    if (B && goal !== 'shine') notes.push('Left out for now: CeramicX. It goes on a clean, dry vehicle and gets buffed off panel by panel. Add it once washing is routine.');
    if (goal === 'wash' && !E) notes.push('Own a pressure washer? The Foam Wash System (LuxCannon + 2 LuxFoam, $79.99) is the upgrade over the bucket.');
    if (goal === 'quick' && !OFF) notes.push('No hose, no bucket. Spray a panel, wipe, flip the towel, buff.');
    return { items: [...new Set(it)].filter(k => C[k]), notes };
  }

  (function quiz() {
    const body = $('[data-quiz-body]'), bars = $$('[data-quiz-bars] i');
    if (!body) return;
    const ans = {}; let at = 0;
    const setBars = () => bars.forEach((b, i) => { b.classList.toggle('is-done', i < at); b.classList.toggle('is-on', i === at); });
    function ask() {
      const q = QS[at], opts = q.opts(ans); setBars();
      body.innerHTML = `<div class="quiz-q"><p class="quiz-n">Question ${at + 1} of 3</p><h2 id="quiz-h">${q.h}</h2><p class="quiz-help">${q.help}</p>
        <div class="quiz-opts n${opts.length}">${opts.map(([v, b, s], i) => `<button type="button" class="qopt${ans[q.key] === v ? ' is-picked' : ''}" data-v="${v}" style="--d:${i * 60}ms"><span class="qopt-ic">${ICON[v]}</span><b>${b}</b><span class="qopt-s">${s}</span><i class="qopt-go" aria-hidden="true">→</i></button>`).join('')}</div>
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
        body.innerHTML = `<div class="quiz-done"><p class="quiz-n">Your aisle is ready</p><h2 id="quiz-h">${p.items.length} picks for a ${LV[ans.lv].toLowerCase()} · ${VEH[ans.veh]}</h2>
          <div class="quiz-done-cta"><a class="btn" href="#picks"><span>See my picks</span></a><button type="button" class="quiz-back" data-redo>Change answers</button></div></div>`;
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
      if (e.target.closest('[data-redo]')) { at = 0; Object.keys(ans).forEach(k => delete ans[k]); ask(); return; }
    });
    ask();
    window.LLredoQuiz = () => { at = 0; Object.keys(ans).forEach(k => delete ans[k]); ask(); $('#quiz').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); };
    window.LLpick = (lv, veh, goal) => picks({ lv, veh, goal });
  })();

  /* ================= BIG TWO: bottle -> ball-and-stick molecule -> bottle ================= */
  (function big() {
    const card = $('[data-big-card]'), cv = $('[data-big-canvas]'), arts = $$('[data-big]');
    if (!card || !cv) return;
    const imgs = { luxpro: $('[data-big-img="luxpro"]'), ceramicx: $('[data-big-img="ceramicx"]') };
    const ctx = cv.getContext('2d');
    // every bottle colour in the line becomes an atom
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
      const L = 1; ATOMS = [{ x: 0, y: 0, z: 0, r: .34, c: rgb(PAL[0]) }]; BONDS = [];
      let tries = 0;
      while (ATOMS.length < 15 && tries++ < 600) {
        const pi = ATOMS.length < 4 ? 0 : (Math.random() * ATOMS.length) | 0, p = ATOMS[pi];
        const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, s = Math.sqrt(1 - u * u);
        const q = { x: p.x + s * Math.cos(th) * L, y: p.y + u * L, z: p.z + s * Math.sin(th) * L };
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
        // a point on (or just inside) that atom's sphere
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
      const R = Math.min(W, H) * .36, ay = t * .00035 + morph * 2.4, ax = .42, f = 3.2;
      proj = ATOMS.map(a => {
        let x = a.x * Math.cos(ay) - a.z * Math.sin(ay), z = a.x * Math.sin(ay) + a.z * Math.cos(ay), y = a.y;
        const y2 = y * Math.cos(ax) - z * Math.sin(ax), z2 = y * Math.sin(ax) + z * Math.cos(ax);
        const k = f / (f + z2);
        return { x: W / 2 + x * R * k, y: H * .46 + y2 * R * k, r: a.r * R * k, z: z2, c: a.c };
      });
    }
    function draw(t) {
      if (!ready) return;
      ctx.clearRect(0, 0, W, H);
      const crisp = intro >= .999 && (morph <= .001 || morph >= .999);
      const k = morph < .5 ? 'luxpro' : 'ceramicx';
      imgs.luxpro.classList.toggle('is-on', crisp && k === 'luxpro');
      imgs.ceramicx.classList.toggle('is-on', crisp && k === 'ceramicx');
      card.dataset.k = k;
      $('[data-big-ix]').textContent = k === 'luxpro' ? '01 / 02' : '02 / 02';
      if (crisp) return;
      const cl = intro < 1 && morph < .5 ? 1 - intro : morph < .5 ? morph * 2 : 2 - morph * 2; // 0 bottle .. 1 molecule
      project(t);
      // sticks
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
      // particles in flight
      const pa = 1 - smooth(.82, 1, cl) * .9;
      for (let i = 0; i < N; i++) {
        const o = i * 13, jit = (i % 97) / 97, at = proj[P[o + 4]];
        const tx = at.x + P[o + 5] * at.r, ty = at.y + P[o + 6] * at.r;
        let x, y, r, g, b, e;
        if (intro < 1 && morph < .5) { e = ease(clamp((intro - jit * .25) / .75)); x = tx + (P[o] - tx) * e; y = ty + (P[o + 1] - ty) * e; r = P[o + 7]; g = P[o + 8]; b = P[o + 9]; }
        else if (morph < .5) { e = 1 - ease(clamp((morph * 2 - jit * .25) / .75)); x = tx + (P[o] - tx) * e; y = ty + (P[o + 1] - ty) * e; r = P[o + 7]; g = P[o + 8]; b = P[o + 9]; }
        else { e = ease(clamp(((morph - .5) * 2 - jit * .25) / .75)); x = tx + (P[o + 2] - tx) * e; y = ty + (P[o + 3] - ty) * e; r = P[o + 10]; g = P[o + 11]; b = P[o + 12]; }
        const m = 1 - e; // how far into the molecule this particle is
        r += (at.c[0] - r) * m; g += (at.c[1] - g) * m; b += (at.c[2] - b) * m;
        const sz = step * e + 2.2 * m;
        ctx.globalAlpha = pa; ctx.fillStyle = `rgb(${r | 0},${g | 0},${b | 0})`;
        ctx.fillRect(x - sz / 2, y - sz / 2, sz + .4, sz + .4);
      }
      ctx.globalAlpha = 1;
      // atoms as lit spheres, far ones first
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

  /* ================= THE SUPPLY: grouped by what a thing IS, so bottles, tools and towels never mix ================= */
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
  const TYPE_ORDER = Object.keys(TYPE);
  const card = k => { const it = C[k]; return `<article class="pcard" data-easy="${it.easy ? 1 : 0}" data-k="${k}">
        <div class="pcard-img${isPhoto(k) ? ' is-photo' : ''}"><img src="${img(k)}" alt="${it.n}" loading="lazy">
          ${it.kit ? '' : `<span class="pcard-step">Step ${it.step} · ${STEPS[it.step]}</span>`}${it.easy ? '<span class="pcard-easy">Easy</span>' : ''}</div>
        <div class="pcard-body">${title(k)}<p>${it.what}</p>${it.save ? `<span class="pcard-save">${it.save}</span>` : ''}</div>
        <div class="pcard-foot"><span class="pcard-px">${money(it.price)}</span><button class="pcard-add" type="button" data-add="${k}"><span>Add</span></button></div>
      </article>`; };
  const groupsHTML = keys => {
    const by = {}; keys.forEach(k => (by[typeOf(k)] = by[typeOf(k)] || []).push(k));
    return `<div class="pgroups">${TYPE_ORDER.filter(t => by[t]).map(t => `<div class="pgroup" style="--n:${Math.min(4, by[t].length)}"><h5>${TYPE[t]}</h5><div class="pgroup-grid">${by[t].map(card).join('')}</div></div>`).join('')}</div>`;
  };

  // the quiz lands here
  window.LLshowPicks = (a, p) => {
    const el = $('[data-picks]'); if (!el) return;
    const total = p.items.reduce((s, k) => s + C[k].price, 0);
    const head = a.lv === 'b' ? 'Short list. Nothing you can mess up.' : a.lv === 'i' ? 'What makes it look professionally done.' : 'The full routine. No shortcuts.';
    el.innerHTML = `<div class="picks-in">
      <div class="picks-head">
        <div><div class="kit-tags"><span>${LV[a.lv]}</span><span>${VEH[a.veh]}</span><span>${GOALS[a.goal][0]}</span></div>
          <h3>Picked for you</h3><p>${head}</p>${p.notes.map(n => `<p class="picks-note">${n}</p>`).join('')}</div>
        <div class="picks-buy"><span>${p.items.length} item${p.items.length === 1 ? '' : 's'}</span><strong>${money(total)}</strong>
          <button class="btn" type="button" data-add="${p.items.join(',')}"><span>Add all to cart</span></button>
          <a class="picks-go" href="${'https://lusterluxauto.com/cart/' + p.items.map(k => C[k].vid + ':1').join(',')}">Or check out now →</a>
          <button class="picks-redo" type="button" onclick="LLredoQuiz()">Change answers</button></div>
      </div>
      ${groupsHTML(p.items)}
      <p class="picks-rest">Everything else they make is below, sorted the same way.</p></div>`;
    el.hidden = false;
    requestAnimationFrame(() => el.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'start' }));
  };

  (function shop() {
    const AISLES = [
      { cat: 'wash', h: 'Wash', p: 'Get the dirt off without scratching. Bottles first, then the tools that apply them.', types: ['soap', 'foamtool', 'washtool'] },
      { cat: 'towels', h: 'Towels', p: 'One job per towel: drying, paint, interior, glass. Mixing them is how streaks happen.', types: ['towel'] },
      { cat: 'wheels', h: 'Wheels & tires', p: 'Wheels get cleaned first so brake dust never splashes onto clean paint. Tires get dressed last.', types: ['wheelchem', 'wheeltool'] },
      { cat: 'protect', h: 'Shine & protect', p: 'After the wash. Gloss, plus a layer that makes the next wash easier.', types: ['protect'] },
      { cat: 'interior', h: 'Interior & trim', p: 'Cabin surfaces, faded plastic and the smell.', types: ['interiorchem', 'scent', 'intool'] },
      { cat: 'kits', h: 'Systems', p: 'Bundles that cost less than the same items bought apart. The savings shown are real math.', types: ['kit'] },
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

  /* ---------------- film parallax ---------------- */
  (function film() {
    const f = $('[data-film]'); if (!f || reduce) return;
    const cols = $$('.film-col', f);
    const tick = () => {
      const r = f.getBoundingClientRect();
      if (r.bottom < 0 || r.top > innerHeight) return;
      const p = (innerHeight - r.top) / (innerHeight + r.height);
      cols.forEach(c => { c.style.transform = `translateY(${(p - .5) * +c.dataset.speed * r.height}px)`; });
    };
    addEventListener('scroll', tick, { passive: true }); tick();
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
  const rv = $$('.big-head, .shop-head, .real-head, .guys-copy, .phones, .ticket, .foot-word');
  rv.forEach(el => el.classList.add('rv'));
  const io = new IntersectionObserver(en => en.forEach(x => { if (x.isIntersecting) { x.target.classList.add('in'); io.unobserve(x.target); } }), { threshold: .15 });
  rv.forEach(el => io.observe(el));
  window.LLreveal = () => rv.forEach(el => el.classList.add('in'));
  window.LLC = C;
})();
