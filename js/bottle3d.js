/* The real 16 oz LusterLux bottle, rendered live. Ported from the v2 prototype:
   silhouette measured from their studio photos, labels unwrapped from those same photos (tools/bottle3d.py).
   Transparent background (the page shows through), no floor, no reflection. The page script drives it via window.LL3D. */
import * as THREE from 'three';

const card = document.querySelector('[data-big-card]');
if (card) {
  const canvas = document.createElement('canvas');
  canvas.className = 'big-gl';
  canvas.setAttribute('aria-hidden', 'true');
  card.insertBefore(canvas, card.querySelector('.big-canvas'));

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch (e) { renderer = null; }

  if (renderer) {
    renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(18, 1, .1, 200);

    // studio: strip softboxes baked into an environment map
    {
      const env = new THREE.Scene();
      env.background = new THREE.Color(0x000000);
      const strip = (w, h, x, y, z, k) => {
        const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), new THREE.MeshBasicMaterial({ color: new THREE.Color(k, k, k), side: THREE.DoubleSide }));
        m.position.set(x, y, z); m.lookAt(0, y, 0); env.add(m);
      };
      strip(1.4, 14, -7, 2, 3, 6); strip(1.0, 14, 7.5, 2, 1.5, 3.2); strip(.6, 12, 4, 2, -7, 4); strip(.6, 12, -4, 2, -7, 2.4);
      const top = new THREE.Mesh(new THREE.PlaneGeometry(8, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(1.2, 1.2, 1.2) }));
      top.position.set(0, 9, 0); top.rotation.x = Math.PI / 2; env.add(top);
      scene.environment = new THREE.PMREMGenerator(renderer).fromScene(env, .015).texture;
    }
    const key = new THREE.DirectionalLight(0xffffff, 1.4); key.position.set(-5, 8, 7); scene.add(key);
    const rim = new THREE.DirectionalLight(0xdfe9ff, 1.6); rim.position.set(6, 5, -6); scene.add(rim);

    // measured profile (units: body radius = 1)
    const P = [[0, 0], [.84, 0], [.94, .025], [.985, .1], [.998, .28], [1, 1.2], [.988, 4.0], [.976, 5.42], [.962, 5.53], [.9, 5.62],
      [.78, 5.69], [.64, 5.745], [.55, 5.78], [.535, 5.8], [.565, 5.815], [.565, 5.855], [.515, 5.87], [.505, 5.95]];
    const rAt = y => { for (let i = 1; i < P.length; i++) if (y <= P[i][1]) { const [r0, y0] = P[i - 1], [r1, y1] = P[i]; return r0 + (r1 - r0) * (y - y0) / (y1 - y0 || 1); } return P[P.length - 1][0]; };
    const FILL = 5.6, CAPY = 5.9, HEIGHT = 6.49;
    const PROD = {
      luxpro: { liq: '#ec4fc6', lab: [.43, 5.17] },
      ceramicx: { liq: '#3fb4ec', lab: [.5, 5.24] },
    };

    const bottle = new THREE.Group(); scene.add(bottle);
    const glassMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, metalness: 0, roughness: .045, transmission: 1, thickness: .25, ior: 1.42,
      specularIntensity: 1, envMapIntensity: 1.6, clearcoat: 1, clearcoatRoughness: .03, transparent: true });
    bottle.add(new THREE.Mesh(new THREE.LatheGeometry(P.map(([r, y]) => new THREE.Vector2(r, y)), 160), glassMat));

    const liqPts = [new THREE.Vector2(0, .05)];
    for (const [r, y] of P) if (y > .02 && y < FILL) liqPts.push(new THREE.Vector2(Math.max(.001, r * .955), Math.max(.05, y)));
    liqPts.push(new THREE.Vector2(rAt(FILL) * .955, FILL), new THREE.Vector2(0, FILL));
    const liqMat = new THREE.MeshPhysicalMaterial({ color: new THREE.Color(PROD.luxpro.liq), roughness: .22, metalness: 0, clearcoat: .6, envMapIntensity: .9,
      emissive: new THREE.Color(PROD.luxpro.liq), emissiveIntensity: .1 });
    bottle.add(new THREE.Mesh(new THREE.LatheGeometry(liqPts, 128), liqMat));

    // the label: a full sleeve; the texture's centre is the front, the rest is the black label stock
    const labelMat = new THREE.MeshPhysicalMaterial({ color: 0xffffff, roughness: .34, metalness: 0, clearcoat: 1, clearcoatRoughness: .1, envMapIntensity: 1.1 });
    const labels = {};
    function labelMesh(k) {
      const [a, b] = PROD[k].lab, pts = [];
      for (let i = 0; i <= 48; i++) { const y = a + (b - a) * i / 48; pts.push(new THREE.Vector2(rAt(y) + .006, y)); }
      // phiStart -PI puts u = .5 (the label's centre) facing the camera
      const g = new THREE.LatheGeometry(pts, 192, -Math.PI, Math.PI * 2);
      return g;
    }
    const label = new THREE.Mesh(labelMesh('luxpro'), labelMat);
    bottle.add(label);
    const loader = new THREE.TextureLoader();
    const loadLabel = k => labels[k] || (labels[k] = loader.loadAsync(`img/3d/label-${k}.webp`).then(t => {
      t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = renderer.capabilities.getMaxAnisotropy(); return t; }));

    // knurled cap
    const knurl = document.createElement('canvas'); knurl.width = 512; knurl.height = 8;
    { const x = knurl.getContext('2d'); for (let i = 0; i < 512; i += 4) { x.fillStyle = '#fff'; x.fillRect(i, 0, 2, 8); x.fillStyle = '#000'; x.fillRect(i + 2, 0, 2, 8); } }
    const capMat = new THREE.MeshPhysicalMaterial({ color: 0x0c0c0d, roughness: .42, metalness: 0, clearcoat: .4, clearcoatRoughness: .3,
      bumpMap: new THREE.CanvasTexture(knurl), bumpScale: 2.2, envMapIntensity: 1.2 });
    const cap = new THREE.Mesh(new THREE.LatheGeometry([[0, 0], [.515, 0], [.522, .02], [.522, .5], [.512, .56], [.47, .585], [0, .59]].map(([r, y]) => new THREE.Vector2(r, y)), 128), capMat);
    cap.position.y = CAPY; bottle.add(cap);

    // frame the bottle exactly where the 2D cutout sits (90% of the card height, 4% off the bottom),
    // so the molecules land on the same silhouette
    let W = 1, H = 1;
    function layout() {
      const r = card.getBoundingClientRect(); W = Math.max(1, r.width); H = Math.max(1, r.height);
      renderer.setSize(W, H, false);
      camera.aspect = W / H;
      const frac = innerWidth <= 860 ? .86 : .9, bottomPad = .04;
      const vh = HEIGHT / frac, d = vh / (2 * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2)));
      const cy = -bottomPad * vh + vh / 2;
      camera.position.set(0, cy, d); camera.lookAt(0, cy, 0); camera.updateProjectionMatrix();
      dirty = true;
    }
    let dirty = true, current = 'luxpro', rot = 0, alpha = 1;
    addEventListener('resize', layout);

    async function setProduct(k) {
      if (k === current || !PROD[k]) return;
      current = k;
      const t = await loadLabel(k);
      if (current !== k) return;
      label.geometry.dispose(); label.geometry = labelMesh(k);
      labelMat.map = t; labelMat.needsUpdate = true;
      liqMat.color.set(PROD[k].liq); liqMat.emissive.set(PROD[k].liq);
      dirty = true;
    }

    function frame() {
      if (dirty && alpha > .001) { bottle.rotation.y = rot; renderer.render(scene, camera); dirty = false; }
      requestAnimationFrame(frame);
    }

    Promise.all([loadLabel('luxpro'), loadLabel('ceramicx')]).then(([t]) => {
      labelMat.map = t; labelMat.needsUpdate = true;
      layout(); requestAnimationFrame(frame);
      card.classList.add('has-3d');
      window.LL3D = {
        product: setProduct,
        rotate: a => { if (Math.abs(a - rot) > 1e-4) { rot = a; dirty = true; } },
        opacity: a => { alpha = a; canvas.style.opacity = a; if (a > .001) dirty = true; },
      };
    });
  }
}
