const TIER_COLORS = ['#FF4757', '#FF6B00', '#CC44FF']

export class Enemy {
  constructor() {
    this.x = 0; this.y = 0
    this.speed = 60; this.hp = 30; this.maxHp = 30
    this.damage = 14   // HP/sec contact damage
    this.radius = 9
    this.alive  = false
    this.color  = TIER_COLORS[0]
    this.angle  = 0
    this.hitFlash = 0  // seconds of white flash after being hit
  }

  reset() {
    this.x = 0; this.y = 0; this.speed = 60; this.hp = 30; this.maxHp = 30
    this.damage = 14; this.radius = 9; this.alive = false
    this.color = TIER_COLORS[0]; this.angle = 0; this.hitFlash = 0
  }

  spawn(x, y, wave) {
    this.x = x; this.y = y
    this.alive = true
    this.angle = Math.random() * Math.PI * 2

    const tier  = wave >= 10 ? 2 : wave >= 5 ? 1 : 0
    this.color  = TIER_COLORS[tier]
    this.radius = 9 + tier * 3
    this.hp     = 25 + wave * 12 + tier * 20
    this.maxHp  = this.hp
    this.damage = 12 + wave * 1.5
    this.speed  = 55 + wave * 7 + Math.random() * 18
  }

  update(dt, tx, ty) {
    const dx = tx - this.x
    const dy = ty - this.y
    const d  = Math.hypot(dx, dy) || 1
    this.x += (dx / d) * this.speed * dt
    this.y += (dy / d) * this.speed * dt
    this.angle += (1.8 + this.speed * 0.01) * dt
    if (this.hitFlash > 0) this.hitFlash -= dt
  }

  takeDamage(amount) {
    this.hp -= amount
    this.hitFlash = 0.08
    return this.hp <= 0
  }

  draw(ctx, lowPower = false) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.angle)

    const flashing = this.hitFlash > 0
    if (!lowPower) {
      ctx.shadowColor = flashing ? '#ffffff' : this.color
      ctx.shadowBlur  = flashing ? 20 : 10
    }

    ctx.beginPath()
    const r = this.radius
    ctx.moveTo(0, -r)
    ctx.lineTo(r * 0.866, r * 0.5)
    ctx.lineTo(-r * 0.866, r * 0.5)
    ctx.closePath()
    ctx.fillStyle   = flashing ? '#ffffff' : this.color
    ctx.strokeStyle = 'rgba(255,255,255,0.55)'
    ctx.lineWidth   = 1.2
    ctx.fill()
    ctx.stroke()

    ctx.restore()
  }
}
