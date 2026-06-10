export class Projectile {
  constructor() {
    this.x = 0; this.y = 0
    this.vx = 0; this.vy = 0
    this.speed  = 400
    this.damage = 28
    this.radius = 5
    this.alive  = false
    this.life   = 2.8
    this._angle = 0
  }

  reset() {
    this.x = 0; this.y = 0; this.vx = 0; this.vy = 0
    this.alive = false; this.life = 2.8; this._angle = 0
  }

  fire(x, y, targetX, targetY, damage) {
    this.x = x; this.y = y
    const d = Math.hypot(targetX - x, targetY - y) || 1
    this._angle = Math.atan2(targetY - y, targetX - x)
    this.vx = ((targetX - x) / d) * this.speed
    this.vy = ((targetY - y) / d) * this.speed
    this.damage = damage
    this.alive  = true
    this.life   = 2.8
  }

  fireAngle(x, y, angle, damage) {
    this.x = x; this.y = y
    this._angle = angle
    this.vx = Math.cos(angle) * this.speed
    this.vy = Math.sin(angle) * this.speed
    this.damage = damage
    this.alive  = true
    this.life   = 2.8
  }

  update(dt, canvasW, canvasH) {
    this.x += this.vx * dt
    this.y += this.vy * dt
    this.life -= dt
    if (
      this.life <= 0 ||
      this.x < -20 || this.x > canvasW + 20 ||
      this.y < -20 || this.y > canvasH + 20
    ) {
      this.alive = false
    }
  }

  draw(ctx, lowPower = false) {
    ctx.save()
    ctx.translate(this.x, this.y)
    ctx.rotate(this._angle)

    if (!lowPower) { ctx.shadowColor = '#A8FF3E'; ctx.shadowBlur = 12 }

    // Elongated pill — looks like a speeding commit hash
    ctx.beginPath()
    ctx.roundRect(-8, -2.5, 16, 5, 2.5)
    ctx.fillStyle = '#A8FF3E'
    ctx.fill()

    // Bright leading tip
    ctx.shadowBlur = 0
    ctx.beginPath()
    ctx.arc(8, 0, 3, 0, Math.PI * 2)
    ctx.fillStyle = '#fff'
    ctx.fill()

    ctx.restore()
  }
}
