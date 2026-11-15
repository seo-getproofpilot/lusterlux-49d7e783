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
  const STEPS = ['Kit', 'Wash', 'Wheels & tires', 'Dry', 'Protect', 'Dress & trim', 'Interior'];
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
  const REAL = ['luxpro', 'luxfoam', 'luxcannon', 'foamx', 'luxmit', 'luxbucket', 'luxgun', 'luxdry', 'wheelassassin', 'tirevenom', 'wheelbrush', 'tirebrush', 'ceramicx', 'luxquick', 'edgeless', 'interiorx', 'restorx', 'microlux', 'luxbrush'];
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

  /* ================= QUIZ =================
     Three answers -> one kit. The logic, in plain words:
     - WATER decides the wash. No hose = LuxPro waterless. Garden hose = LuxFoam in a bucket
       (FoamX once you want foam without a pressure washer). Pressure washer = the foam cannon.
       Wheel cleaner needs a rinse, so it never goes in a no-hose kit.
     - EXPERIENCE decides how many steps. Beginners get spray-and-wipe products and the fewest
       moves. CeramicX waits until washing is routine (it goes on clean paint and is buffed off
       panel by panel). Experts get the brushes, the second towel set and the trim work.
     - VEHICLE decides the surfaces. UTVs and ATVs are mostly plastic, so RestorX is in every
       kit; ATVs have no cabin, so no interior cleaner. Boats get the cockpit products only:
       LusterLux lists its boat cleaners as coming soon, and we don't stretch car claims onto a hull. */
  const ICON = {
    b: '<svg viewBox="0 0 48 48"><rect class="f" x="8" y="28" width="8" height="12" rx="1.5"/><rect class="f o" x="20" y="18" width="8" height="22" rx="1.5"/><rect class="f o" x="32" y="8" width="8" height="32" rx="1.5"/></svg>',
    i: '<svg viewBox="0 0 48 48"><rect class="f" x="8" y="28" width="8" height="12" rx="1.5"/><rect class="f" x="20" y="18" width="8" height="22" rx="1.5"/><rect class="f o" x="32" y="8" width="8" height="32" rx="1.5"/></svg>',
    e: '<svg viewBox="0 0 48 48"><rect class="f" x="8" y="28" width="8" height="12" rx="1.5"/><rect class="f" x="20" y="18" width="8" height="22" rx="1.5"/><rect class="f" x="32" y="8" width="8" height="32" rx="1.5"/></svg>',
    car: '<svg viewBox="0 0 48 48"><path d="M4 31v-6l5-2 6-7h15l7 7 6 2v6"/><path d="M4 31h4m10 0h12m10 0h4"/><circle cx="13" cy="31" r="4.5"/><circle cx="35" cy="31" r="4.5"/><path d="M17 16.5l-2 6.5h20l-5-6.5"/></svg>',
    utv: '<svg viewBox="0 0 48 48"><circle cx="12" cy="32" r="6"/><circle cx="37" cy="32" r="6"/><path d="M18 32h13"/><path d="M6 27l4-5h28l5 5"/><path d="M14 22V11h16l6 11"/><path d="M22 11v11"/></svg>',
    atv: '<svg viewBox="0 0 48 48"><circle cx="11" cy="32" r="7"/><circle cx="37" cy="32" r="7"/><path d="M18 32h12"/><path d="M8 24l6-5h20l6 5"/><path d="M18 19v-4h10"/><path d="M33 19l3-7h5"/></svg>',
    boat: '<svg viewBox="0 0 48 48"><path d="M4 27h40l-6 10H11z"/><path d="M15 27v-8h13l7 8"/><path d="M21 19v-6"/><path d="M4 42c4-2.5 7-2.5 10 0s6 2.5 10 0 7-2.5 10 0 6 2.5 10 0"/></svg>',
    pw: '<svg viewBox="0 0 48 48"><path d="M6 22h20l4-4h12v7H31l-4 4v12h-7V27H6z"/><path d="M42 21.5h3"/><path d="M13 27v5"/></svg>',
    hose: '<svg viewBox="0 0 48 48"><circle cx="20" cy="26" r="13"/><circle cx="20" cy="26" r="7"/><circle cx="20" cy="26" r="1.5" class="f"/><path d="M33 26h6l4-3v6l-4-3"/></svg>',
    none: '<svg viewBox="0 0 48 48"><path d="M24 6s11 13 11 21a11 11 0 0 1-22 0c0-8 11-21 11-21z"/><path d="M8 8l32 32"/></svg>',
  };
  const QS = [
    { key: 'lv', h: 'How much detailing have you done?', help: 'Be honest. It changes how many steps we hand you, not how good the result is.', opts: [
      { v: 'b', b: 'Beginner', s: 'Car washes and gas-station vacuums. Never done it myself.' },
      { v: 'i', b: 'Intermediate', s: 'I wash it myself and want it to look better and last longer.' },
      { v: 'e', b: 'Expert', s: 'I own a foam cannon, I know what a high spot is, and I’m picky.' }] },
    { key: 'veh', h: 'What are you using these products for?', help: 'Different surfaces need different bottles. A UTV is mostly plastic. A boat lives in the sun.', opts: [
      { v: 'car', b: 'Car / Truck', s: 'Paint, glass, wheels, tires, cabin.' },
      { v: 'utv', b: 'UTV', s: 'Plastic panels, a cab, mud and trail dust.' },
      { v: 'atv', b: 'ATV', s: 'Plastic fenders, vinyl seat, no cabin.' },
      { v: 'boat', b: 'Boat', s: 'Vinyl seats, dash, trim and glass.' }] },
    { key: 'water', h: 'What can you wash with?', help: 'This decides your wash step more than anything else.', opts: [
      { v: 'pw', b: 'Pressure washer', s: 'At home or a self-serve bay I use often.' },
      { v: 'hose', b: 'Garden hose', s: 'A spigot and a driveway, no pressure washer.' },
      { v: 'none', b: 'No hose', s: 'Apartment, HOA rules, water restrictions, or just no time.' }] },
  ];
  const LV = { b: 'Beginner', i: 'Intermediate', e: 'Expert' }, VEH = { car: 'Car / Truck', utv: 'UTV', atv: 'ATV', boat: 'Boat' }, WAT = { pw: 'Pressure washer', hose: 'Garden hose', none: 'No hose' };

  // why each item is in the kit, written for the person who answered
  function why(k, a) {
    const B = a.lv === 'b', E = a.lv === 'e', OFF = a.veh === 'utv' || a.veh === 'atv', BOAT = a.veh === 'boat';
    switch (k) {
      case 'essentials': return 'Your starter set: LuxPro washes with no water, InteriorX does the cabin, TireVenom finishes the tires. Towels and a pad are in the box.';
      case 'waterlesssys': return OFF ? 'Spray, wipe, flip the towel. Handles trail dust and film between real washes.' : B ? 'Spray a panel, wipe, flip to a dry side, buff. That is the whole skill. Comes with 3 towels.' : 'LuxPro plus 3 Edgeless towels for a full no-water wash. $9.99 less than buying them apart.';
      case 'luxpro': return BOAT ? 'For the windshield, chrome and console glass. Spray-and-wipe, so it works at the slip.' : 'Your no-water touch-up between washes.';
      case 'foamsys': return B ? 'Fill the cannon with LuxFoam, click it on your pressure washer, cover the car. Foam loosens grit before you touch the paint. Two bottles of soap included.' : 'Cannon plus 2 bottles of LuxFoam. Pre-soak loosens grit so the mitt does less work.';
      case 'ultimatesys': return 'Gun, cannon, soap, drying towel and 5 quick-connect nozzles in one box. $34.97 less than the parts.';
      case 'luxfoam': return a.water === 'pw' ? 'A second bottle. A foam cannon goes through soap faster than a bucket.' : OFF ? 'Clings to plastic and loosens mud so it rinses off instead of getting scrubbed in.' : B ? 'Two capfuls in a bucket of water. Slick enough that the mitt glides instead of scratching.' : 'Works in the FoamX or the bucket. Safe on wax, sealant and ceramic.';
      case 'foamx': return 'Foam without a pressure washer. Push a button and the whole thing is covered.';
      case 'luxbucket': return B ? 'Soap water goes in here. Rinse the mitt often so grit stays in the bucket.' : 'Mix soap and rinse the mitt so grit stays out of the paint.';
      case 'luxmit': return 'Microfiber pulls dirt into the mitt instead of dragging it across the finish.';
      case 'luxdry': return B ? 'Dry right after rinsing. Arizona water leaves spots if you let it air-dry.' : '1300 GSM. One pass per panel, no water spots.';
      case 'luxgun': return 'Replaces the stock pressure washer gun. Less hand fatigue, quick-connect nozzles.';
      case 'wheelassassin': return OFF ? 'Cuts grease and road grime off the wheels and hubs. Spray, wait, rinse.' : B ? 'Spray, wait a minute, rinse. Brake dust lets go without scrubbing.' : 'Spray, dwell, agitate if needed, rinse. Brake dust and grime let go.';
      case 'wheelbrush': return 'Gets between spokes and into the barrel where the mitt can’t.';
      case 'tirebrush': return 'Scrub the sidewall before dressing so TireVenom goes on even and lasts.';
      case 'rimtiresys': return 'Wheel cleaner, tire dressing, both brushes and 2 XPads. $8.36 less than buying them apart.';
      case 'tirevenom': return OFF ? 'Dark, dry-to-the-touch finish for the tires. Save it for after the trail.' : B ? 'Wipe it on with the pad. Dries to the touch, so it won’t fling onto your paint.' : 'No-sling finish, up to 3 months.';
      case 'xpad': return 'Spreads dressing evenly so you use less and it doesn’t streak.';
      case 'ceramicx': return OFF ? 'A slick coat on the plastics and paint so mud releases on the next wash.' : E ? 'Your protection layer. Up to 8 months, and it tops up an existing coating.' : 'Mist, spread, buff, one panel at a time in the shade. Water beads for up to 8 months.';
      case 'luxquick': return 'Fingerprints and fresh water spots between washes, without starting over.';
      case 'edgeless': return E ? 'A second set of exterior towels, so the CeramicX towel never touches dirt.' : 'Exterior towels for the spray-and-wipe steps.';
      case 'interiorx': return BOAT ? 'Vinyl seats, console and dash. Spray, wipe, no greasy film to slide around on.' : a.veh === 'utv' ? 'Seats, dash and roll cage grab points. No greasy feel.' : 'Dash, doors, console, wheel. Spray on the towel, not the screen.';
      case 'restorx': return BOAT ? 'Sun kills vinyl and rubber first. RestorX brings it back and blocks UV for months.' : OFF ? 'Your plastics fade fastest. RestorX brings them back to black and holds up to 6 months outside.' : 'Faded black trim back to factory, up to 6 months outside.';
      case 'microlux': return 'Interior-only towels so dressing never ends up on the paint.';
      case 'luxbrush': return BOAT ? 'Gets into seat seams and around switches.' : 'Vents, seams and buttons, where the towel can’t reach.';
    }
    return C[k].what;
  }

  function build(a) {
    const L = a.lv, V = a.veh, W = a.water, B = L === 'b', I = L === 'i', E = L === 'e';
    let items = [], left = [], notes = [];
    const push = (...ks) => ks.forEach(k => { if (!items.includes(k)) items.push(k); });
    if (V === 'boat') {
      push('interiorx', 'restorx', 'microlux', 'xpad');
      if (!B) push('luxpro', 'edgeless');
      if (E) push('luxbrush');
      notes.push('LusterLux lists a boat exterior cleaner and a boat interior cleaner as coming soon. Until they land, this kit covers the cockpit: seats, dash, trim and glass.');
      if (W === 'none') notes.push('Everything here is spray-and-wipe, so it works at the slip with no hose.');
      if (B) left.push(['luxpro', 'Add it later for the windshield and chrome. Start with the seats and trim, where the sun does the most damage.']);
    } else {
      /* wash */
      if (W === 'none') {
        if (V === 'car' && B) push('essentials');
        else push('waterlesssys');
        if (V !== 'car') notes.push('Waterless handles dust and trail film. Caked mud needs a rinse first: a self-serve bay works.');
        left.push(['wheelassassin', 'It needs a rinse. LuxPro is safe on wheels and handles light dust without one.']);
      } else if (W === 'hose') {
        if (!B) push('foamx');
        push('luxfoam', 'luxbucket', 'luxmit', 'luxdry');
        if (B) left.push(['foamx', 'Nice to have, not need to have. The bucket gets the same car clean.']);
      } else {
        push(E ? 'ultimatesys' : 'foamsys', 'luxmit');
        if (!B) push('luxbucket');
        if (!E) push('luxdry');
        if (B) left.push(['luxgun', 'Your pressure washer’s own gun is fine to start.']);
      }
      /* wheels + tires */
      if (W !== 'none' && !B) push('wheelassassin', 'wheelbrush');
      if (E && W !== 'none') push('tirebrush');
      const tires = V === 'car' ? true : !B;
      if (tires && !(V === 'car' && B && W === 'none')) push('tirevenom', 'xpad');
      if (!tires) left.push(['tirevenom', 'On a trail, fresh dressing grabs dust. Add it when you’re cleaning up for a ride-out or a show.']);
      /* protect */
      if (!B) push('ceramicx');
      else left.push(['ceramicx', 'It goes on a clean, dry vehicle and gets buffed off panel by panel. Add it once washing is routine.']);
      if (E && V === 'car') push('luxquick', 'edgeless');
      if (I && W === 'none' && V === 'car') push('luxquick');
      if (E && W === 'none') push('edgeless');
      /* trim + interior */
      if (V !== 'car' || E) push('restorx');
      if (V !== 'car') push('xpad');
      if (V === 'car' && !(B && W === 'none')) push('interiorx', 'microlux');
      if (V === 'car' && B && W === 'none') {} // Essentials Kit already has InteriorX and towels
      if (V === 'utv') push('interiorx', !B ? 'microlux' : null);
      if (E && V !== 'atv') push('luxbrush');
      if (V === 'car' && B) left.push(['restorx', 'Faded trim can wait. Get the wash and the tires down first.']);
      if (V === 'atv') notes.push('No cabin, so no interior cleaner. RestorX handles the vinyl seat along with the plastics.');
    }
    items = items.filter(Boolean);
    /* swap loose parts for a system when the system is genuinely cheaper */
    const swap = (sys, parts) => { if (parts.every(p => items.includes(p))) { const at = items.indexOf(parts[0]); items = items.filter(p => !parts.includes(p)); items.splice(at, 0, sys); } };
    swap('rimtiresys', ['wheelassassin', 'wheelbrush', 'tirebrush', 'tirevenom', 'xpad']);
    left = left.filter(([k]) => !items.includes(k));
    return { items, left, notes };
  }

  (function quiz() {
    const body = $('[data-quiz-body]'), steps = $$('[data-quiz-steps] li');
    if (!body) return;
    const ans = {}; let at = 0, off = new Set(), kit = null;
    const setSteps = () => steps.forEach((li, i) => { li.classList.toggle('is-on', i === at); li.classList.toggle('is-done', i < at); });
    function ask() {
      const q = QS[at]; setSteps();
      body.innerHTML = `<div class="quiz-q"><h2 id="quiz-h">${q.h}</h2><p class="quiz-help">${q.help}</p>
        <div class="quiz-opts n${q.opts.length}" style="--n:${q.opts.length}">${q.opts.map(o => `<button type="button" class="qopt${ans[q.key] === o.v ? ' is-picked' : ''}" data-v="${o.v}">${ICON[o.v]}<b>${o.b}</b><span>${o.s}</span></button>`).join('')}</div>
        ${at ? '<button type="button" class="quiz-back" data-back>← Back</button>' : ''}</div>`;
    }
    function result() {
      at = 3; setSteps(); kit = build(ans); off = new Set();
      render();
    }
    function render() {
      const on = kit.items.filter(k => !off.has(k)), total = on.reduce((s, k) => s + C[k].price, 0);
      const groups = {};
      kit.items.forEach(k => { (groups[C[k].step] = groups[C[k].step] || []).push(k); });
      const head = ans.lv === 'b' ? 'Short list. Nothing you can mess up.' : ans.lv === 'i' ? 'The kit that makes it look professionally done.' : 'The full routine. No shortcuts.';
      body.innerHTML = `<div class="kit">
        <div class="kit-head"><div class="kit-tags"><span>${LV[ans.lv]}</span><span>${VEH[ans.veh]}</span><span>${WAT[ans.water]}</span></div>
          <h2 id="quiz-h">${head}</h2><p>In the order you’ll use it. Tap ✓ to drop anything you already own.</p></div>
        <div class="kit-groups">${Object.keys(groups).sort((x, y) => x - y).map((s, gi) => `<div class="kit-group"><h4><i>${gi + 1}</i>${+s ? STEPS[s] : 'Start with the kit'}</h4><ul class="kit-list">${groups[s].map(k => `
            <li class="kline${off.has(k) ? ' off' : ''}"><span class="kline-img${isPhoto(k) ? ' is-photo' : ''}"><img src="${img(k)}" alt="" loading="lazy"></span>
              <div>${title(k, 'h5')}<p>${why(k, ans)}</p></div>
              <span class="kline-px">${money(C[k].price)}</span>
              <button class="kline-tog" type="button" data-tog="${k}" aria-pressed="${!off.has(k)}" aria-label="${off.has(k) ? 'Put back' : 'Remove'} ${C[k].n}">✓</button></li>`).join('')}</ul></div>`).join('')}
          ${kit.left.length ? `<div class="kit-left"><h4>Left out on purpose</h4><ul>${kit.left.map(([k, w]) => `<li><b>${C[k].n}.</b> ${w}</li>`).join('')}</ul></div>` : ''}
        </div>
        <aside class="kit-sum">
          ${kit.notes.map(n => `<p class="kit-note">${n}</p>`).join('')}
          <div class="kit-total"><span>${on.length} item${on.length === 1 ? '' : 's'}</span><strong>${money(total)}</strong></div>
          <button class="btn" type="button" data-add="${on.join(',')}" ${on.length ? '' : 'disabled'}><span>Add kit to cart</span></button>
          ${on.length ? `<a class="kit-go" href="${'https://lusterluxauto.com/cart/' + on.map(k => C[k].vid + ':1').join(',')}">Or check out now →</a>` : ''}
          <button class="kit-redo" type="button" data-redo>Start over</button>
        </aside></div>`;
    }
    body.addEventListener('click', e => {
      const o = e.target.closest('.qopt');
      if (o) {
        ans[QS[at].key] = o.dataset.v; o.classList.add('is-picked');
        setTimeout(() => {
          at < 2 ? (at++, ask()) : result();
          // keep the next question in view on phones, where the card is taller than the screen
          const top = $('[data-quiz]').getBoundingClientRect().top;
          if (top < 0 || top > innerHeight * .5) scrollTo({ top: scrollY + top - 80, behavior: reduce ? 'auto' : 'smooth' });
        }, reduce ? 0 : 220);
        return;
      }
      if (e.target.closest('[data-back]')) { at--; ask(); return; }
      if (e.target.closest('[data-redo]')) { at = 0; Object.keys(ans).forEach(k => delete ans[k]); ask(); $('#quiz').scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' }); return; }
      const t = e.target.closest('[data-tog]');
      if (t) { const k = t.dataset.tog; off.has(k) ? off.delete(k) : off.add(k); render(); }
    });
    ask();
    window.LLquiz = (lv, veh, water) => { Object.assign(ans, { lv, veh, water }); result(); return build(ans); };
  })();

  /* ================= BIG TWO: bottle -> molecules -> bottle ================= */
  (function big() {
    const card = $('[data-big-card]'), cv = $('[data-big-canvas]'), arts = $$('[data-big]');
    if (!card || !cv) return;
    const imgs = { luxpro: $('[data-big-img="luxpro"]'), ceramicx: $('[data-big-img="ceramicx"]') };
    const ACC = { luxpro: '#ff3ea5', ceramicx: '#2aa8e8' };
    const ctx = cv.getContext('2d');
    const BRAND = [[139, 195, 3], [57, 209, 253], [219, 219, 218]];
    let W = 0, H = 0, dpr = 1, N = 0, P = null, ready = false, raf = 0, visible = false, ATOMS = [], BONDS = [];
    let intro = reduce ? 1 : 0, morph = 0;

    // sample the visible pixels of a bottle as it sits in the card
    function sample(im, step) {
      const r = im.getBoundingClientRect(), cr = card.getBoundingClientRect();
      const x0 = r.left - cr.left, y0 = r.top - cr.top, w = Math.round(r.width), h = Math.round(r.height);
      const oc = document.createElement('canvas'); oc.width = w; oc.height = h;
      const o = oc.getContext('2d'); o.drawImage(im, 0, 0, w, h);
      const d = o.getImageData(0, 0, w, h).data, pts = [];
      for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) {
        const i = (y * w + x) * 4; if (d[i + 3] < 140) continue;
        pts.push([x0 + x, y0 + y, d[i], d[i + 1], d[i + 2]]);
      }
      return pts;
    }
    function setup() {
      const cr = card.getBoundingClientRect();
      if (!cr.width || !imgs.luxpro.naturalWidth || !imgs.ceramicx.naturalWidth) return;
      dpr = Math.min(devicePixelRatio || 1, 2); W = cr.width; H = cr.height;
      cv.width = W * dpr; cv.height = H * dpr; ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // keep the particle count near 5k whatever the card size
      const ih = imgs.luxpro.getBoundingClientRect().height, iw = imgs.luxpro.getBoundingClientRect().width;
      const step = Math.max(2, Math.round(Math.sqrt((iw * ih * .82) / 5200)));
      const A = sample(imgs.luxpro, step), Bp = sample(imgs.ceramicx, step);
      N = Math.max(A.length, Bp.length);
      const cx = W / 2, cy = H * .5, R = Math.min(W, H) * .4;
      // the in-between state: a molecule model. atoms (clusters) joined by bonds
      ATOMS = [];
      const NA = 13;
      for (let j = 0; j < NA; j++) {
        const th = j / NA * Math.PI * 2 + Math.random() * .4, rr = j === 0 ? 0 : R * (.35 + Math.random() * .65);
        ATOMS.push({ x: cx + Math.cos(th) * rr, y: cy + Math.sin(th) * rr * .9, s: R * (j === 0 ? .22 : .13 + Math.random() * .08) });
      }
      BONDS = [];
      ATOMS.forEach((p, j) => { if (!j) return; let best = 0, bd = 1e9; ATOMS.forEach((q, m) => { if (m === j) return; const d = (p.x - q.x) ** 2 + (p.y - q.y) ** 2; if (d < bd && (m < j)) { bd = d; best = m; } }); BONDS.push([j, best]); });
      P = new Float32Array(N * 14);
      const gauss = () => (Math.random() + Math.random() + Math.random() - 1.5) / 1.5;
      for (let i = 0; i < N; i++) {
        const a = A[i < A.length ? i : (Math.random() * A.length) | 0], b = Bp[i < Bp.length ? i : (Math.random() * Bp.length) | 0];
        const at = ATOMS[(Math.random() * NA) | 0];
        const o = i * 14;
        P[o] = a[0]; P[o + 1] = a[1]; P[o + 2] = b[0]; P[o + 3] = b[1];
        P[o + 4] = at.x + gauss() * at.s; P[o + 5] = at.y + gauss() * at.s;
        P[o + 6] = a[2]; P[o + 7] = a[3]; P[o + 8] = a[4]; P[o + 9] = b[2]; P[o + 10] = b[3]; P[o + 11] = b[4];
        P[o + 12] = (Math.random() * 3) | 0; P[o + 13] = Math.random();
      }
      P.step = step; ready = true; draw(performance.now());
    }
    const ease = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    const clamp = v => Math.max(0, Math.min(1, v));
    function progress() {
      const vh = innerHeight;
      // intro: the cloud gathers into LuxPro as the card slides up into its pinned spot
      const r = card.getBoundingClientRect(), pin = parseFloat(getComputedStyle(card.parentElement).top) || vh * .11;
      intro = reduce ? 1 : clamp(1 - (r.top - pin) / (vh * .75));
      // morph: centred on the moment the CeramicX copy reaches mid-screen
      const b = arts[1].getBoundingClientRect().top - vh * .78;
      morph = reduce ? (b < 0 ? 1 : 0) : clamp(.5 - b / (vh * .7));
    }
    function draw(t) {
      if (!ready) return;
      ctx.clearRect(0, 0, W, H);
      const crisp = intro >= .999 && (morph <= .001 || morph >= .999);
      imgs.luxpro.classList.toggle('is-on', crisp && morph < .5);
      imgs.ceramicx.classList.toggle('is-on', crisp && morph >= .5);
      const k = morph < .5 ? 'luxpro' : 'ceramicx';
      card.style.setProperty('--acc', ACC[k]);
      $('[data-big-ix]').textContent = morph < .5 ? '01 / 02' : '02 / 02';
      if (crisp) return;
      const sw = t * .00025, s = P.step;
      // bonds fade in while the molecules are apart
      const cloudAmt = intro < 1 && morph < .5 ? 1 - intro : morph < .5 ? morph * 2 : 2 - morph * 2;
      if (cloudAmt > .05) {
        const rot = (x, y, ang) => { const dx = x - W / 2, dy = y - H * .5; return [W / 2 + dx * Math.cos(ang) - dy * Math.sin(ang), H * .5 + dx * Math.sin(ang) + dy * Math.cos(ang)]; };
        ctx.lineWidth = 1.2; ctx.strokeStyle = `rgba(219,219,218,${.28 * cloudAmt})`;
        ctx.beginPath();
        BONDS.forEach(([j, m]) => { const p = rot(ATOMS[j].x, ATOMS[j].y, sw * 1.1), q = rot(ATOMS[m].x, ATOMS[m].y, sw * 1.1); ctx.moveTo(p[0], p[1]); ctx.lineTo(q[0], q[1]); });
        ctx.stroke();
      }
      for (let i = 0; i < N; i++) {
        const o = i * 14, jit = P[o + 13];
        // cloud position drifts so the molecules feel alive
        const ang = sw * 1.1, cxp = P[o + 4] - W / 2 + Math.sin(t * .0012 + jit * 40) * 3, cyp = P[o + 5] - H * .5 + Math.cos(t * .001 + jit * 30) * 3;
        const qx = W / 2 + cxp * Math.cos(ang) - cyp * Math.sin(ang), qy = H * .5 + cxp * Math.sin(ang) + cyp * Math.cos(ang);
        let x, y, r, g, bl, cl;
        if (intro < 1 && morph < .5) {
          const e = ease(clamp((intro - jit * .25) / .75)); cl = 1 - e;
          x = qx + (P[o] - qx) * e; y = qy + (P[o + 1] - qy) * e; r = P[o + 6]; g = P[o + 7]; bl = P[o + 8];
        } else if (morph < .5) {
          const e = ease(clamp((morph * 2 - jit * .25) / .75)); cl = e;
          x = P[o] + (qx - P[o]) * e; y = P[o + 1] + (qy - P[o + 1]) * e; r = P[o + 6]; g = P[o + 7]; bl = P[o + 8];
        } else {
          const e = ease(clamp(((morph - .5) * 2 - jit * .25) / .75)); cl = 1 - e;
          x = qx + (P[o + 2] - qx) * e; y = qy + (P[o + 3] - qy) * e; r = P[o + 9]; g = P[o + 10]; bl = P[o + 11];
        }
        // in the cloud, every molecule takes a brand colour: lime, aqua or chrome
        const br = BRAND[P[o + 12]], m = Math.min(1, cl * 1.4);
        r += (br[0] - r) * m; g += (br[1] - g) * m; bl += (br[2] - bl) * m;
        const sz = s * (1 - cl) + 1.7 * cl;
        ctx.globalAlpha = .55 + .45 * (1 - cl * .4);
        ctx.fillStyle = `rgb(${r | 0},${g | 0},${bl | 0})`;
        if (cl > .35) { ctx.beginPath(); ctx.arc(x, y, sz * .7, 0, 6.283); ctx.fill(); }
        else ctx.fillRect(x - sz / 2, y - sz / 2, sz + .4, sz + .4);
      }
      ctx.globalAlpha = 1;
    }
    function loop(t) { progress(); draw(t); raf = visible ? requestAnimationFrame(loop) : 0; }
    new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible && !raf) raf = requestAnimationFrame(loop); }, { rootMargin: '200px 0px' }).observe($('#big'));
    let rt; addEventListener('resize', () => { clearTimeout(rt); rt = setTimeout(setup, 200); });
    const go = () => { if (imgs.luxpro.complete && imgs.ceramicx.complete) setup(); };
    imgs.luxpro.addEventListener('load', go); imgs.ceramicx.addEventListener('load', go);
    if (document.fonts) document.fonts.ready.then(go); go();
    window.LLbig = () => ({ N, intro, morph, ready });
  })();

  /* ================= THE SUPPLY ================= */
  (function shop() {
    const AISLES = [
      { cat: 'wash', h: 'Wash', p: 'Get the dirt off without scratching. Pick by what you wash with.', items: ['luxpro', 'luxfoam', 'foamx', 'luxcannon', 'luxmit', 'luxbucket', 'luxdry', 'luxgun'] },
      { cat: 'wheels', h: 'Wheels & tires', p: 'Wheels get cleaned first so brake dust never splashes onto clean paint. Tires get dressed last.', items: ['wheelassassin', 'tirevenom', 'wheelbrush', 'tirebrush', 'xpad'] },
      { cat: 'protect', h: 'Protect & shine', p: 'After the wash. Adds gloss and a layer that makes the next wash easier.', items: ['ceramicx', 'luxquick', 'edgeless'] },
      { cat: 'interior', h: 'Interior & trim', p: 'Cabin surfaces and faded plastic. Keep these towels away from your paint.', items: ['interiorx', 'restorx', 'microlux', 'luxbrush'] },
      { cat: 'kits', h: 'Systems', p: 'Bundles that cost less than the same items bought apart. The savings shown are real math.', items: ['essentials', 'waterlesssys', 'completesys', 'paintsys', 'foamsys', 'rimtiresys', 'ultimatesys'] },
    ];
    const wrap = $('[data-shop-aisles]'), chips = $('[data-shop-chips]'), easy = $('[data-shop-easy]');
    if (!wrap) return;
    chips.innerHTML = [['all', 'All'], ...AISLES.map(a => [a.cat, a.h])].map(([c, l], i) => `<button type="button" role="tab" data-cat="${c}" aria-selected="${i === 0}"><span>${l}</span></button>`).join('');
    wrap.innerHTML = AISLES.map(a => `<div class="aisle" data-aisle="${a.cat}"><div class="aisle-bar"><h3>${a.h}</h3><p>${a.p}</p></div>
      <div class="aisle-grid">${a.items.map(k => { const it = C[k]; return `<article class="pcard" data-easy="${it.easy ? 1 : 0}">
        <div class="pcard-img${isPhoto(k) ? ' is-photo' : ''}"><img src="${img(k)}" alt="${it.n}" loading="lazy">
          ${it.kit ? '' : `<span class="pcard-step">Step ${it.step} · ${STEPS[it.step]}</span>`}${it.easy ? '<span class="pcard-easy">Easy</span>' : ''}</div>
        <div class="pcard-body">${title(k)}<p>${it.what}</p>${it.save ? `<span class="pcard-save">${it.save}</span>` : ''}</div>
        <div class="pcard-foot"><span class="pcard-px">${money(it.price)}</span><button class="pcard-add" type="button" data-add="${k}"><span>Add</span></button></div>
      </article>`; }).join('')}</div></div>`).join('');
    let cat = 'all';
    function filter() {
      $$('.aisle', wrap).forEach(a => {
        const showA = cat === 'all' || a.dataset.aisle === cat;
        let any = false;
        $$('.pcard', a).forEach(c => { const s = !easy.checked || c.dataset.easy === '1'; c.hidden = !s; any = any || s; });
        a.hidden = !(showA && any);
      });
    }
    chips.addEventListener('click', e => {
      const b = e.target.closest('[data-cat]'); if (!b) return;
      cat = b.dataset.cat; $$('button', chips).forEach(x => x.setAttribute('aria-selected', x === b)); filter();
      const top = $('#shop').getBoundingClientRect().top + scrollY + ($('.shop-head').offsetHeight || 0) - 40;
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
