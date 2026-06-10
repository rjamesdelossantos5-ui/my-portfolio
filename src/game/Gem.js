export class Gem {
  constructor() {
    this.x = 0; this.y = 0
    this.value  = 10
    this.radius = 6
    this.alive  = false
    this.age    = 0
  }

  reset() {
    this.x = 0; this.y = 0; this.value = 10
    this.alive = false; this.age = 0
  }

  spawn(x, y, value) {
    this.x = x; this.y = y
    this.value = value
    this.alive = true
    this.age   = 0
  }

  // Returns true when the gem reaches the player (collected)
  update(dt, px, py, magnetRadius) {
    this.age += dt
    const dx   = px - this.x
    const dy   = py - this.y
    const dist = Math.hypot(dx, dy)

    if (dist < magnetRadius) {
      const pullSpeed = 260 + (1 - dist / magnetRadius) * 300
      const d = dist || 1
      this.x += (dx / d) * pullSpeed * dt
      this.y += (dy / d) * pullSpeed * dt
    }

    return Math.hypot(px - this.x, py - this.y) < 16
  }

  draw(ctx) {
    const pulse = Math.sin(this.age * 5) * 0.25 + 0.75
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this.age * 2.2)

    ctx.shadowColor = '#00D4FF'
    ctx.shadowBlur  = 10 * pulse

    const r = this.radius * (0.85 + pulse * 0.15)
    ctx.beginPath()
    ctx.moveTo(0, -r)
    ctx.lineTo(r * 0.7, 0)
    ctx.lineTo(0, r)
    ctx.lineTo(-r * 0.7, 0)
    ctx.closePath()
    ctx.fillStyle = `rgba(0,212,255,${0.65 + pulse * 0.35})`
    ctx.fill()
    ctx.strokeStyle = '#fff'
    ctx.lineWidth = 0.8
    ctx.stroke()

    ctx.restore()
  }
}
