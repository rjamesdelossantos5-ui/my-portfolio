import * as THREE from 'three'

// ─── Config ──────────────────────────────────────────────────────────────────
const CONFIG = {
  PARTICLE_COUNT: 120,
  CONNECTION_DIST: 130,        // px — max distance to draw an edge
  MOUSE_RADIUS:    180,        // px — warp influence radius
  MOUSE_STRENGTH:  0.012,      // warp force per frame
  SPEED:           0.18,       // base drift speed
  PARTICLE_SIZE:   2.2,
  COLOR_NODE:      0x00f5ff,
  COLOR_EDGE:      0x00f5ff,
  OPACITY_EDGE:    0.15,
}

// ─── Module state ─────────────────────────────────────────────────────────────
let renderer, scene, camera, animId
let particles = []             // { mesh, vx, vy }
let lineSegments               // single merged geometry for all edges
let linePositions              // Float32Array for edge vertices
let lineColors                 // Float32Array for edge alpha

const mouse = { x: 0, y: 0 }  // normalised to [-1, 1] NDC

// ─── Init ─────────────────────────────────────────────────────────────────────
export function init3DBackground(canvas) {
  const W = window.innerWidth
  const H = window.innerHeight

  // Renderer
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true })
  renderer.setSize(W, H)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setClearColor(0x000000, 0)

  // Scene + orthographic camera (2-D particle web, no perspective distortion)
  scene  = new THREE.Scene()
  camera = new THREE.OrthographicCamera(-W / 2, W / 2, H / 2, -H / 2, 1, 1000)
  camera.position.z = 10

  // Particle mesh template
  const geo = new THREE.CircleGeometry(CONFIG.PARTICLE_SIZE, 8)
  const mat = new THREE.MeshBasicMaterial({ color: CONFIG.COLOR_NODE })

  for (let i = 0; i < CONFIG.PARTICLE_COUNT; i++) {
    const mesh = new THREE.Mesh(geo, mat.clone())
    mesh.position.set(
      (Math.random() - 0.5) * W,
      (Math.random() - 0.5) * H,
      0,
    )
    // Random opacity per particle for depth feel
    mesh.material.transparent = true
    mesh.material.opacity = 0.4 + Math.random() * 0.6

    const speed = CONFIG.SPEED
    particles.push({
      mesh,
      vx: (Math.random() - 0.5) * speed,
      vy: (Math.random() - 0.5) * speed,
    })
    scene.add(mesh)
  }

  // Edge geometry (pre-allocate max possible edges = n*(n-1)/2)
  const maxEdges = CONFIG.PARTICLE_COUNT * CONFIG.PARTICLE_COUNT
  linePositions  = new Float32Array(maxEdges * 6)   // 2 vertices × xyz
  lineColors     = new Float32Array(maxEdges * 8)   // 2 vertices × rgba

  const lineGeo = new THREE.BufferGeometry()
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
  lineGeo.setAttribute('color',    new THREE.BufferAttribute(lineColors, 4))

  const lineMat = new THREE.LineBasicMaterial({
    vertexColors:  true,
    transparent:   true,
    opacity:       1,
    blending:      THREE.AdditiveBlending,
    depthWrite:    false,
  })

  lineSegments = new THREE.LineSegments(lineGeo, lineMat)
  scene.add(lineSegments)

  // Event listeners
  window.addEventListener('mousemove', onMouseMove)
  window.addEventListener('resize',    onResize)

  animate()
}

// ─── Destroy ──────────────────────────────────────────────────────────────────
export function destroy3DBackground() {
  cancelAnimationFrame(animId)
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('resize',    onResize)

  // Dispose GPU resources
  particles.forEach(p => {
    p.mesh.geometry.dispose()
    p.mesh.material.dispose()
    scene.remove(p.mesh)
  })
  lineSegments.geometry.dispose()
  lineSegments.material.dispose()
  renderer.dispose()

  particles     = []
  renderer = scene = camera = lineSegments = animId = null
}

// ─── Animation loop ───────────────────────────────────────────────────────────
function animate() {
  animId = requestAnimationFrame(animate)

  const W = renderer.domElement.width  / renderer.getPixelRatio()
  const H = renderer.domElement.height / renderer.getPixelRatio()

  // Mouse in world space
  const mx = mouse.x * W / 2
  const my = mouse.y * H / 2

  // Move particles
  for (const p of particles) {
    // Mouse warp — pull toward cursor within radius
    const dx = mx - p.mesh.position.x
    const dy = my - p.mesh.position.y
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < CONFIG.MOUSE_RADIUS && dist > 0.1) {
      const force = (1 - dist / CONFIG.MOUSE_RADIUS) * CONFIG.MOUSE_STRENGTH
      p.vx += dx / dist * force
      p.vy += dy / dist * force
    }

    // Damping so they don't accelerate forever
    p.vx *= 0.998
    p.vy *= 0.998

    p.mesh.position.x += p.vx
    p.mesh.position.y += p.vy

    // Wrap at edges
    const halfW = W / 2 + 20
    const halfH = H / 2 + 20
    if (p.mesh.position.x >  halfW) p.mesh.position.x = -halfW
    if (p.mesh.position.x < -halfW) p.mesh.position.x =  halfW
    if (p.mesh.position.y >  halfH) p.mesh.position.y = -halfH
    if (p.mesh.position.y < -halfH) p.mesh.position.y =  halfH
  }

  // Rebuild edges
  let edgeIdx = 0
  const maxDist = CONFIG.CONNECTION_DIST

  for (let i = 0; i < particles.length; i++) {
    const a = particles[i].mesh.position
    for (let j = i + 1; j < particles.length; j++) {
      const b = particles[j].mesh.position
      const dx = a.x - b.x
      const dy = a.y - b.y
      const d  = Math.sqrt(dx * dx + dy * dy)
      if (d > maxDist) continue

      const alpha = (1 - d / maxDist) * CONFIG.OPACITY_EDGE
      const base  = edgeIdx * 6

      // Vertex A
      linePositions[base]     = a.x
      linePositions[base + 1] = a.y
      linePositions[base + 2] = 0
      // Vertex B
      linePositions[base + 3] = b.x
      linePositions[base + 4] = b.y
      linePositions[base + 5] = 0

      // Colours (RGBA, both ends same alpha)
      const cb = edgeIdx * 8
      const r = 0, g = 0.96, bl = 1  // #00f5ff ≈ rgb(0, 0.96, 1)
      lineColors[cb]     = r;  lineColors[cb + 1] = g;  lineColors[cb + 2] = bl;  lineColors[cb + 3] = alpha
      lineColors[cb + 4] = r;  lineColors[cb + 5] = g;  lineColors[cb + 6] = bl;  lineColors[cb + 7] = alpha

      edgeIdx++
    }
  }

  const geo = lineSegments.geometry
  geo.setDrawRange(0, edgeIdx * 2)
  geo.attributes.position.needsUpdate = true
  geo.attributes.color.needsUpdate    = true

  renderer.render(scene, camera)
}

// ─── Handlers ────────────────────────────────────────────────────────────────
function onMouseMove(e) {
  mouse.x =  (e.clientX / window.innerWidth)  * 2 - 1
  mouse.y = -(e.clientY / window.innerHeight) * 2 + 1
}

function onResize() {
  if (!renderer) return
  const W = window.innerWidth
  const H = window.innerHeight

  renderer.setSize(W, H)

  camera.left   = -W / 2
  camera.right  =  W / 2
  camera.top    =  H / 2
  camera.bottom = -H / 2
  camera.updateProjectionMatrix()
}
