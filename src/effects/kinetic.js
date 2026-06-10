/**
 * Kinetic Typography
 * Ties Syne's variable font-weight axis to vertical scroll velocity.
 * Fast scroll → weight pushes toward 830. Stops → lerps back to 700.
 *
 * Uses a single GSAP ticker so there is zero extra event listener overhead.
 * Completely disabled when prefers-reduced-motion is set.
 */
import gsap from 'gsap'

let _tick     = null   // ticker reference for cleanup
let _prevY    = 0      // scroll position on last tick
let _vel      = 0      // smoothed velocity (px/frame)
let _weight   = 700    // current animated font-weight value

const BASE_WEIGHT = 700
const MAX_WEIGHT  = 840  // how bold it gets at peak velocity
const VEL_SCALE   = 11   // multiplier: 1 px/frame → +11 weight units

export function initKinetic() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  // Target every heading that uses the Syne display classes
  const els = [...document.querySelectorAll('.display-xl, .display-lg')]
  if (!els.length) return

  _prevY  = window.scrollY
  _weight = BASE_WEIGHT

  _tick = () => {
    const y      = window.scrollY
    const rawVel = Math.abs(y - _prevY)
    _prevY = y

    // Asymmetric lerp: attack fast (0.45), decay slowly (0.06) for a satisfying lag
    const lerpRate = rawVel > _vel ? 0.45 : 0.06
    _vel += lerpRate * (rawVel - _vel)

    // Map velocity → target weight, clamped to [BASE, MAX]
    const targetWeight = BASE_WEIGHT + Math.min(_vel * VEL_SCALE, MAX_WEIGHT - BASE_WEIGHT)

    // Faster approach when going up, slightly slower return to base
    const wLerp = targetWeight > _weight ? 0.18 : 0.09
    _weight += wLerp * (targetWeight - _weight)

    const w = _weight.toFixed(1)
    els.forEach(el => {
      el.style.fontVariationSettings = `'wght' ${w}`
    })
  }

  gsap.ticker.add(_tick)
}

export function destroyKinetic() {
  if (_tick) {
    gsap.ticker.remove(_tick)
    _tick = null
  }
  _vel = 0
  _weight = BASE_WEIGHT
}
