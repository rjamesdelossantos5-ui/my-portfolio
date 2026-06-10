import * as THREE from 'three'

let _r, _s, _c, _shapes, _animId
const _m = { x: 0, y: 0, tx: 0, ty: 0 }

export function render() {
  return `
<section class="section" id="s-hero" style="background:#0C0A1A;">

  <canvas id="hero-canvas"
    style="position:absolute;inset:0;z-index:0;pointer-events:none;"></canvas>

  <!-- Ambient gradient blobs -->
  <div class="blob" style="width:700px;height:700px;
    background:radial-gradient(circle,rgba(255,71,87,0.2) 0%,transparent 65%);
    top:-20%;right:-8%;"></div>
  <div class="blob" style="width:550px;height:550px;
    background:radial-gradient(circle,rgba(0,212,255,0.16) 0%,transparent 65%);
    bottom:-15%;left:2%;"></div>
  <div class="blob" style="width:380px;height:380px;
    background:radial-gradient(circle,rgba(255,195,0,0.1) 0%,transparent 65%);
    top:35%;left:25%;"></div>

  <!-- Content -->
  <div style="position:relative;z-index:10;height:100%;display:flex;
    flex-direction:column;align-items:center;justify-content:center;
    text-align:center;padding:0 1.5rem;">

    <!-- Availability badge -->
    <div style="display:inline-flex;align-items:center;gap:0.5rem;
      padding:0.45rem 1.2rem;border-radius:100px;margin-bottom:2.5rem;
      background:rgba(168,255,62,0.07);border:1px solid rgba(168,255,62,0.2);">
      <span style="width:5px;height:5px;border-radius:50%;background:#A8FF3E;
        box-shadow:0 0 10px #A8FF3E;flex-shrink:0;"></span>
      <span class="label-sm" style="color:rgba(168,255,62,0.85);">
        Available for new opportunities
      </span>
    </div>

    <!-- Name -->
    <h1 class="display-xl" style="margin-bottom:1.25rem;">
      <span style="color:#fff;display:block;">RJ</span>
      <span class="grad-coral-cyan" style="display:block;">Santos</span>
    </h1>

    <!-- Role -->
    <p class="label-sm" style="color:rgba(255,255,255,0.28);margin-bottom:1.5rem;">
      Full-Stack Software Engineer
    </p>

    <!-- Bio -->
    <p style="font-family:'Inter',sans-serif;font-size:0.95rem;font-weight:300;
      color:rgba(255,255,255,0.42);max-width:26rem;line-height:1.8;margin-bottom:3rem;">
      Building high-stakes systems — distributed APIs,<br>
      real-time pipelines, pixel-perfect UIs.
    </p>

    <!-- CTAs -->
    <div style="display:flex;flex-wrap:wrap;justify-content:center;gap:0.875rem;">
      <button class="btn-primary nav-link" data-index="2">View Projects →</button>
      <button class="btn-ghost nav-link"   data-index="4">Get In Touch</button>
    </div>
  </div>

  <!-- Scroll hint -->
  <div class="scroll-hint">
    <span class="label-sm" style="color:rgba(255,255,255,0.3);">Scroll to explore</span>
    <svg width="38" height="10" viewBox="0 0 38 10" fill="none"
         stroke="rgba(255,255,255,0.3)" stroke-width="1.5" stroke-linecap="round">
      <line x1="0" y1="5" x2="30" y2="5"/>
      <polyline points="25,1 30,5 25,9"/>
    </svg>
  </div>

</section>`
}

export function init() {
  const canvas = document.getElementById('hero-canvas')
  if (!canvas) return

  const W = window.innerWidth, H = window.innerHeight

  _r = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  _r.setSize(W, H)
  _r.setPixelRatio(Math.min(devicePixelRatio, 2))
  _r.setClearColor(0, 0)

  _s = new THREE.Scene()
  _c = new THREE.PerspectiveCamera(50, W / H, 0.1, 100)
  _c.position.z = 6

  _shapes = []

  const defs = [
    { geo: new THREE.IcosahedronGeometry(1.4, 1), col: 0xFF4757, p: [ 2.8,  0.7,  0  ], spd: [.003,.005,.001] },
    { geo: new THREE.TorusGeometry(0.9,.28,8,28), col: 0x00D4FF, p: [-3.0, -0.5, -1  ], spd: [.004,.002,.003] },
    { geo: new THREE.OctahedronGeometry(1.0),     col: 0xFFC300, p: [ 0.3, -2.2, -0.5], spd: [.002,.007,.002] },
  ]

  defs.forEach(({ geo, col, p, spd }) => {
    const mat = new THREE.MeshBasicMaterial({ color: col, wireframe: true, transparent: true, opacity: 0.28 })
    const mesh = new THREE.Mesh(geo, mat)
    mesh.position.set(...p)
    mesh.userData = { spd, bp: [...p] }
    _s.add(mesh)
    _shapes.push(mesh)
  })

  window.addEventListener('mousemove', _onMouse)
  window.addEventListener('resize',    _onResize)
  _animate()
}

function _animate() {
  _animId = requestAnimationFrame(_animate)
  _m.x += (_m.tx - _m.x) * 0.06
  _m.y += (_m.ty - _m.y) * 0.06
  _shapes.forEach(mesh => {
    const { spd, bp } = mesh.userData
    mesh.rotation.x += spd[0]
    mesh.rotation.y += spd[1]
    mesh.rotation.z += spd[2]
    mesh.position.x = bp[0] + _m.x * 0.35
    mesh.position.y = bp[1] + _m.y * 0.25
  })
  _r.render(_s, _c)
}

function _onMouse(e) {
  _m.tx =  (e.clientX / window.innerWidth  - 0.5) * 2
  _m.ty = -(e.clientY / window.innerHeight - 0.5) * 2
}

function _onResize() {
  if (!_r) return
  const W = window.innerWidth, H = window.innerHeight
  _r.setSize(W, H)
  _c.aspect = W / H
  _c.updateProjectionMatrix()
}

export function destroy() {
  cancelAnimationFrame(_animId)
  window.removeEventListener('mousemove', _onMouse)
  window.removeEventListener('resize', _onResize)
  _shapes?.forEach(m => { m.geometry.dispose(); m.material.dispose() })
  _r?.dispose()
  _r = _s = _c = _shapes = _animId = null
}
