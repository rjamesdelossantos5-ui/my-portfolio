export class Player {
  constructor(x, y) {
    this.x = x
    this.y = y

    this.speed          = 190   // px/s
    this.hp             = 100
    this.maxHp          = 100
    this.radius         = 13
    this.damage         = 28
    this.shootInterval  = 0.42  // seconds between auto-shots
    this.shootTimer     = 0
    this.projectileCount = 1

    this.xp       = 0
    this.xpToNext = 50
    this.level    = 1

    this.gemMagnetRadius = 90  // px — gems auto-pull within this range

    // Set by Game so Player can read WASD state
    this.keys = {}

    // Iframes after taking damage (prevents one-frame death)
    this.iframes = 0

    // Saved for smooth lerp toward mouse
    this._tx = x
    this._ty = y
  }

  setMouseTarget(mx, my) {
    this._tx = mx
    this._ty = my
  }

  update(dt, canvasW, canvasH) {
    let dx = 0, dy = 0
    const k = this.keys

    if (k['w'] || k['arrowup'])    dy -= 1
    if (k['s'] || k['arrowdown'])  dy += 1
    if (k['a'] || k['arrowleft'])  dx -= 1
    if (k['d'] || k['arrowright']) dx += 1

    if (dx !== 0 || dy !== 0) {
      const len = Math.hypot(dx, dy) || 1
      this.x += (dx / len) * this.speed * dt
      this.y += (dy / len) * this.speed * dt
    } else {
      // Smooth lerp toward mouse cursor
      this.x += (this._tx - this.x) * 5 * dt
      this.y += (this._ty - this.y) * 5 * dt
    }

    // Clamp inside canvas
    const r = this.radius
    this.x = Math.max(r, Math.min(canvasW - r, this.x))
    this.y = Math.max(r, Math.min(canvasH - r, this.y))

    if (this.iframes > 0) this.iframes -= dt
  }

  takeDamage(dmgPerSec, dt) {
    if (this.iframes > 0) return false
    this.hp -= dmgPerSec * dt
    if (this.hp <= 0) { this.hp = 0; return true }
    return false
  }

  gainXP(amount) {
    this.xp += amount
    if (this.xp >= this.xpToNext) {
      this.xp      -= this.xpToNext
      this.xpToNext = Math.round(this.xpToNext * 1.45)
      this.level++
      return true   // signal level-up
    }
    return false
  }

  draw(ctx) {
    ctx.save()
    ctx.shadowColor = '#00D4FF'
    ctx.shadowBlur  = 22

    // Outer ring
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2)
    ctx.strokeStyle = '#00D4FF'
    ctx.lineWidth   = 2.5
    ctx.stroke()

    // Core fill
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.radius - 3, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(0, 212, 255, 0.35)'
    ctx.fill()

    // Inner bright dot
    ctx.shadowBlur = 0
    ctx.beginPath()
    ctx.arc(this.x, this.y, 4, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()

    ctx.restore()
  }
}
