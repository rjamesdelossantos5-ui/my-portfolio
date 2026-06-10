import { Pool }       from './Pool.js'
import { Player }     from './Player.js'
import { Enemy }      from './Enemy.js'
import { Projectile } from './Projectile.js'
import { Gem }        from './Gem.js'

// ── Upgrade catalogue ─────────────────────────────────────────────────────────
const UPGRADES = [
  {
    id: 'fire_rate',
    label: 'Overclock',
    desc: 'Shoot 25% faster',
    icon: '⚡',
    apply(p) { p.shootInterval = Math.max(0.1, p.shootInterval * 0.75) },
  },
  {
    id: 'damage',
    label: 'Critical Path',
    desc: '+35% damage per shot',
    icon: '💥',
    apply(p) { p.damage *= 1.35 },
  },
  {
    id: 'multi_shot',
    label: 'Parallel Build',
    desc: 'Fire an extra projectile',
    icon: '🔀',
    apply(p) { p.projectileCount++ },
  },
  {
    id: 'speed',
    label: 'Hot Reload',
    desc: '+25% move speed',
    icon: '🚀',
    apply(p) { p.speed = Math.min(p.speed * 1.25, 420) },
  },
  {
    id: 'heal',
    label: 'Git Rollback',
    desc: 'Restore 40 HP',
    icon: '❤️',
    apply(p) { p.hp = Math.min(p.maxHp, p.hp + 40) },
  },
  {
    id: 'magnet',
    label: 'Git Pull',
    desc: '2× gem collection range',
    icon: '🧲',
    apply(p) { p.gemMagnetRadius = Math.min(p.gemMagnetRadius * 2, 600) },
  },
]

// ── Helpers ───────────────────────────────────────────────────────────────────
function swapRemove(arr, i) {
  arr[i] = arr[arr.length - 1]
  arr.pop()
}

function pickUpgrades(count = 3) {
  const shuffled = [...UPGRADES].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export class Game {
  constructor(canvas, overlayIds) {
    this.canvas = canvas
    this.ctx    = canvas.getContext('2d')

    // DOM references for overlays (injected from section)
    const { startScreen, overScreen, levelupScreen, upgradeContainer, goWave, goKills } = overlayIds
    this.$start   = startScreen
    this.$over    = overScreen
    this.$levelup = levelupScreen
    this.$upgrades = upgradeContainer
    this.$goWave  = goWave
    this.$goKills = goKills

    // Low-power mode on touch devices — skips glow shadows in draw calls
    this._lowPower = ('ontouchstart' in window) || navigator.maxTouchPoints > 0

    // Scroll gate callbacks (wired in by GameSection.js)
    this.onScrollDisable = () => {}
    this.onScrollEnable  = () => {}

    // Object pools
    this._enemyPool = new Pool(
      () => new Enemy(),
      e  => e.reset(),
      80
    )
    this._projPool = new Pool(
      () => new Projectile(),
      p  => p.reset(),
      150
    )
    this._gemPool = new Pool(
      () => new Gem(),
      g  => g.reset(),
      120
    )

    // Entity arrays (active objects only)
    this._enemies     = []
    this._projectiles = []
    this._gems        = []

    // Game state
    this.state = 'idle'   // idle | playing | levelup | gameover

    // Runtime stats
    this.wave  = 1
    this.kills = 0
    this.time  = 0

    // Spawn config
    this._spawnTimer    = 0
    this._spawnInterval = 1.3
    this._waveTimer     = 0

    // Input
    this.keys = {}
    this._focused = false  // true when canvas has cursor

    this._rafId    = null
    this._lastTime = 0

    this._resize()
    this._bindInput()
  }

  // ── Public API ──────────────────────────────────────────────────────────────

  focus()  { this._focused = true  }
  blur()   { this._focused = false }

  start() {
    // Reset runtime
    this.wave  = 1
    this.kills = 0
    this.time  = 0
    this._spawnTimer  = 0
    this._waveTimer   = 0
    this._spawnInterval = 1.3

    this._enemies.length     = 0
    this._projectiles.length = 0
    this._gems.length        = 0

    // Create player at canvas center
    const p = new Player(this.W / 2, this.H / 2)
    p.setMouseTarget(this.W / 2, this.H / 2)
    p.keys = this.keys
    this.player = p

    this._show(null)
    this.state = 'playing'
    this._lastTime = performance.now()
    this._rafId = requestAnimationFrame(ts => this._loop(ts))

    this.onScrollDisable()
  }

  // ── Resize ──────────────────────────────────────────────────────────────────

  _resize() {
    // Cap DPR at 1 on touch devices — halves/thirds the pixels drawn on retina phones
    const rawDpr = window.devicePixelRatio || 1
    const dpr    = this._lowPower ? 1 : Math.min(rawDpr, 2)
    const rect   = this.canvas.getBoundingClientRect()
    this.W = rect.width  || this.canvas.offsetWidth
    this.H = rect.height || this.canvas.offsetHeight
    this.canvas.width  = Math.round(this.W * dpr)
    this.canvas.height = Math.round(this.H * dpr)
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  }

  // ── Main loop ───────────────────────────────────────────────────────────────

  _loop(ts) {
    if (this.state !== 'playing') return
    this._rafId = requestAnimationFrame(ts => this._loop(ts))
    const dt = Math.min((ts - this._lastTime) / 1000, 0.05)
    this._lastTime = ts
    this._update(dt)
    this._draw()
  }

  // ── Update ──────────────────────────────────────────────────────────────────

  _update(dt) {
    this.time += dt
    const p = this.player

    p.update(dt, this.W, this.H)

    // Wave escalation every 22 seconds
    this._waveTimer += dt
    if (this._waveTimer >= 22) {
      this._waveTimer = 0
      this.wave++
      this._spawnInterval = Math.max(0.28, this._spawnInterval - 0.06)
    }

    // Enemy spawning
    this._spawnTimer -= dt
    if (this._spawnTimer <= 0) {
      this._spawnEnemy()
      this._spawnTimer = this._spawnInterval
    }

    // Auto-shoot at nearest enemy
    p.shootTimer -= dt
    if (p.shootTimer <= 0) {
      const target = this._nearest()
      if (target) {
        this._shoot(target)
        p.shootTimer = p.shootInterval
      }
    }

    // Update + collision: enemies
    for (let i = this._enemies.length - 1; i >= 0; i--) {
      const e = this._enemies[i]
      e.update(dt, p.x, p.y)

      if (Math.hypot(e.x - p.x, e.y - p.y) < e.radius + p.radius) {
        if (p.takeDamage(e.damage, dt)) {
          this._gameOver()
          return
        }
      }
    }

    // Update + collision: projectiles vs enemies
    for (let pi = this._projectiles.length - 1; pi >= 0; pi--) {
      const pr = this._projectiles[pi]
      pr.update(dt, this.W, this.H)

      if (!pr.alive) {
        this._projPool.release(pr)
        swapRemove(this._projectiles, pi)
        continue
      }

      let hit = false
      for (let ei = this._enemies.length - 1; ei >= 0; ei--) {
        const e = this._enemies[ei]
        if (Math.hypot(pr.x - e.x, pr.y - e.y) < pr.radius + e.radius) {
          if (e.takeDamage(pr.damage)) {
            // Drop gem
            const g = this._gemPool.get()
            g.spawn(e.x, e.y, 10 + this.wave * 2)
            this._gems.push(g)
            this._enemyPool.release(e)
            swapRemove(this._enemies, ei)
            this.kills++
          }
          // Consume projectile
          this._projPool.release(pr)
          swapRemove(this._projectiles, pi)
          hit = true
          break
        }
      }
      if (hit) continue
    }

    // Update gems
    for (let i = this._gems.length - 1; i >= 0; i--) {
      const g = this._gems[i]
      const collected = g.update(dt, p.x, p.y, p.gemMagnetRadius)
      if (collected) {
        const leveled = p.gainXP(g.value)
        this._gemPool.release(g)
        swapRemove(this._gems, i)
        if (leveled) {
          this._triggerLevelUp()
          return
        }
      }
    }
  }

  // ── Helpers ─────────────────────────────────────────────────────────────────

  _nearest() {
    let nearest = null
    let minD    = Infinity
    for (const e of this._enemies) {
      const d = Math.hypot(e.x - this.player.x, e.y - this.player.y)
      if (d < minD) { minD = d; nearest = e }
    }
    return nearest
  }

  _shoot(target) {
    const { x, y, projectileCount, damage } = this.player
    const baseAngle = Math.atan2(target.y - y, target.x - x)
    const count     = projectileCount

    for (let i = 0; i < count; i++) {
      const spread = count === 1 ? 0 : (i - (count - 1) / 2) * 0.18
      const pr = this._projPool.get()
      pr.fireAngle(x, y, baseAngle + spread, damage)
      this._projectiles.push(pr)
    }
  }

  _spawnEnemy() {
    const e   = this._enemyPool.get()
    const pad = 40
    const side = (Math.random() * 4) | 0
    let sx, sy
    switch (side) {
      case 0: sx = Math.random() * this.W;    sy = -pad;          break
      case 1: sx = this.W + pad;              sy = Math.random() * this.H; break
      case 2: sx = Math.random() * this.W;    sy = this.H + pad;  break
      default: sx = -pad;                     sy = Math.random() * this.H; break
    }
    e.spawn(sx, sy, this.wave)
    this._enemies.push(e)
  }

  // ── Level-up system ──────────────────────────────────────────────────────────

  _triggerLevelUp() {
    this.state = 'levelup'
    cancelAnimationFrame(this._rafId)

    const options = pickUpgrades(3)
    this.$upgrades.innerHTML = options.map(u => `
      <button class="upgrade-card" data-id="${u.id}">
        <span class="upgrade-icon">${u.icon}</span>
        <span class="upgrade-label">${u.label}</span>
        <span class="upgrade-desc">${u.desc}</span>
      </button>
    `).join('')

    this.$upgrades.querySelectorAll('.upgrade-card').forEach((btn, i) => {
      btn.addEventListener('click', () => {
        options[i].apply(this.player)
        this._show(null)
        this.state = 'playing'
        this._lastTime = performance.now()
        this._rafId = requestAnimationFrame(ts => this._loop(ts))
      }, { once: true })
    })

    this._show('levelup')
  }

  // ── Game over ────────────────────────────────────────────────────────────────

  _gameOver() {
    cancelAnimationFrame(this._rafId)
    this.state = 'gameover'

    // Final frame with dim overlay
    this._draw()
    const ctx = this.ctx
    ctx.fillStyle = 'rgba(0,0,0,0.55)'
    ctx.fillRect(0, 0, this.W, this.H)

    this.$goWave.textContent  = `Wave ${this.wave}`
    this.$goKills.textContent = `${this.kills} bug${this.kills !== 1 ? 's' : ''} squashed`

    this._show('gameover')
    this.onScrollEnable()
  }

  // ── Overlay helper ───────────────────────────────────────────────────────────

  _show(which) {
    this.$start.style.display   = which === 'start'   ? 'flex' : 'none'
    this.$over.style.display    = which === 'gameover' ? 'flex' : 'none'
    this.$levelup.style.display = which === 'levelup'  ? 'flex' : 'none'
  }

  // ── Draw ─────────────────────────────────────────────────────────────────────

  _draw() {
    const ctx = this.ctx
    ctx.clearRect(0, 0, this.W, this.H)

    this._drawGrid(ctx)
    const lp = this._lowPower
    for (const g  of this._gems)        g.draw(ctx, lp)
    for (const e  of this._enemies)     e.draw(ctx, lp)
    for (const pr of this._projectiles) pr.draw(ctx, lp)
    this.player.draw(ctx, lp)
    this._drawHUD(ctx)
  }

  _drawGrid(ctx) {
    const sz = 44
    ctx.strokeStyle = 'rgba(255,255,255,0.028)'
    ctx.lineWidth   = 1
    ctx.beginPath()
    for (let x = 0; x <= this.W; x += sz) { ctx.moveTo(x, 0); ctx.lineTo(x, this.H) }
    for (let y = 0; y <= this.H; y += sz) { ctx.moveTo(0, y); ctx.lineTo(this.W, y) }
    ctx.stroke()
  }

  _drawHUD(ctx) {
    const p = this.player
    const NAV_H = 64

    // ── HP bar ──
    const BAR_W = 180, BAR_H = 7, BAR_X = 18, BAR_Y = NAV_H + 14
    ctx.fillStyle = 'rgba(0,0,0,0.45)'
    ctx.beginPath(); ctx.roundRect(BAR_X, BAR_Y, BAR_W, BAR_H, 3.5); ctx.fill()

    const hpPct   = Math.max(0, p.hp / p.maxHp)
    ctx.fillStyle = hpPct > 0.5 ? '#A8FF3E' : hpPct > 0.25 ? '#FFC300' : '#FF4757'
    if (hpPct > 0) {
      ctx.beginPath()
      ctx.roundRect(BAR_X, BAR_Y, BAR_W * hpPct, BAR_H, 3.5)
      ctx.fill()
    }
    ctx.font      = '10px Inter, sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.45)'
    ctx.textAlign = 'left'
    ctx.fillText(`HP  ${Math.ceil(p.hp)} / ${p.maxHp}`, BAR_X, BAR_Y + BAR_H + 13)

    // ── XP bar ──
    const XP_W = this.W - 36, XP_H = 4, XP_X = 18, XP_Y = this.H - 18
    ctx.fillStyle = 'rgba(0,0,0,0.4)'
    ctx.beginPath(); ctx.roundRect(XP_X, XP_Y, XP_W, XP_H, 2); ctx.fill()

    const xpPct = p.xp / p.xpToNext
    ctx.fillStyle = '#00D4FF'
    if (xpPct > 0) {
      ctx.beginPath(); ctx.roundRect(XP_X, XP_Y, XP_W * xpPct, XP_H, 2); ctx.fill()
    }

    // ── Stats chip (top-right) ──
    ctx.font      = '11px Inter, sans-serif'
    ctx.fillStyle = 'rgba(255,255,255,0.55)'
    ctx.textAlign = 'right'
    ctx.fillText(
      `LV ${p.level}  ·  WAVE ${this.wave}  ·  KILLS ${this.kills}`,
      this.W - 18, NAV_H + 26
    )
    ctx.textAlign = 'left'
  }

  // ── Input ────────────────────────────────────────────────────────────────────

  _bindInput() {
    this.canvas.addEventListener('mousemove', e => {
      const r = this.canvas.getBoundingClientRect()
      const x = e.clientX - r.left
      const y = e.clientY - r.top
      if (this.player) this.player.setMouseTarget(x, y)
    }, { passive: true })

    document.addEventListener('keydown', e => {
      this.keys[e.key.toLowerCase()] = true
      // Block page-scroll keys for the duration of a run.
      // Keyboard controls should work even if the cursor drifts off the section.
      if (this.state === 'playing') {
        const blocked = ['arrowup','arrowdown','arrowleft','arrowright',' ']
        if (blocked.includes(e.key.toLowerCase())) e.preventDefault()
      }
    })

    document.addEventListener('keyup', e => {
      this.keys[e.key.toLowerCase()] = false
    })

    // Prevent canvas wheel from scrolling page during play
    this.canvas.addEventListener('wheel', e => {
      if (this._focused && this.state === 'playing') e.preventDefault()
    }, { passive: false })

    // ── Touch controls ────────────────────────────────────────────────────────
    // Maps the first touch point to the same mouse-target the player lerps toward.
    // passive:false + preventDefault stops the touch from scrolling the GSAP layout.
    const readTouch = e => {
      const t = e.touches[0]
      if (!t) return
      const r = this.canvas.getBoundingClientRect()
      if (this.player) this.player.setMouseTarget(t.clientX - r.left, t.clientY - r.top)
    }

    this.canvas.addEventListener('touchstart', e => {
      if (e.cancelable) e.preventDefault()
      this._focused = true
      readTouch(e)
    }, { passive: false })

    this.canvas.addEventListener('touchmove', e => {
      if (e.cancelable) e.preventDefault()
      readTouch(e)
    }, { passive: false })
  }
}
