/**
 * Magnetic UI Elements
 *
 * Architecture:
 * - ONE global mousemove listener, throttled via requestAnimationFrame.
 * - Each registered element stores its own config (radius, strength, textStrength).
 * - Viewport culling: elements outside the visible area are skipped each tick
 *   (critical for horizontal scroll where off-screen sections exist in the DOM).
 * - Text depth: for buttons/links we wrap children in a `.mag-text` span that
 *   moves at a higher multiplier than the element itself, creating a 3D parallax.
 *   Form submit buttons are intentionally excluded from text wrapping so their
 *   programmatic `textContent` updates (Sending… / Sent ✓) work without side-effects.
 * - Snap-back uses elastic.out for a premium spring feel.
 * - All animations disabled when prefers-reduced-motion is active.
 */
import gsap from 'gsap'

const REDUCED = window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Selector groups with individual tuning.
 * str     = how far the element itself moves (fraction of cursor distance)
 * txtStr  = how far the inner .mag-text moves (relative to element, 0 = no wrapping)
 * radius  = activation distance in px from element center
 */
const CONFIGS = [
  { sel: '.nav-logo',                radius: 60,  str: 0.28, txtStr: 0.46 },
  { sel: '.nav-link-btn',            radius: 65,  str: 0.26, txtStr: 0.44 },
  { sel: '.nav-hire',                radius: 65,  str: 0.30, txtStr: 0.50 },
  { sel: '.btn-primary, .btn-ghost', radius: 80,  str: 0.34, txtStr: 0.56 },
  { sel: '.project-card',            radius: 100, str: 0.08, txtStr: 0    },
  { sel: '.collab-card',             radius: 100, str: 0.07, txtStr: 0    },
]

export function initMagnetic() {
  if (REDUCED) return
  // No mouse on touch devices — skip the entire RAF loop
  if (('ontouchstart' in window) || navigator.maxTouchPoints > 0) return

  const targets = []

  CONFIGS.forEach(({ sel, radius, str, txtStr }) => {
    document.querySelectorAll(sel).forEach(el => {
      let txtEl = null

      // Wrap inner content in .mag-text for depth effect.
      // Skip [type=submit] so form state updates (textContent) keep working.
      const isSubmit = el.getAttribute('type') === 'submit'

      if (txtStr > 0 && !isSubmit) {
        // Idempotent: skip if already wrapped
        txtEl = el.querySelector('.mag-text')
        if (!txtEl) {
          txtEl = document.createElement('span')
          txtEl.className = 'mag-text'
          // Absorb all existing children
          while (el.firstChild) txtEl.appendChild(el.firstChild)
          el.appendChild(txtEl)
        }
      }

      // Ensure GSAP can apply transforms without fighting CSS transitions
      el.style.willChange = 'transform'
      if (txtEl) txtEl.style.willChange = 'transform'

      targets.push({ el, txtEl, radius, str, txtStr, active: false })
    })
  })

  if (!targets.length) return

  // ── Single shared mouse position ──────────────────────────────────────────
  let mx = 0, my = 0, rafPending = false

  function onMove(e) {
    mx = e.clientX
    my = e.clientY
    if (!rafPending) {
      rafPending = true
      requestAnimationFrame(tick)
    }
  }

  // ── Per-frame processing ──────────────────────────────────────────────────
  function tick() {
    rafPending = false

    targets.forEach(t => {
      const r = t.el.getBoundingClientRect()

      // Viewport cull — elements in other (off-screen) sections are always skipped
      const pad = t.radius
      if (
        r.bottom < -pad || r.top  > window.innerHeight + pad ||
        r.right  < -pad || r.left > window.innerWidth  + pad
      ) return

      const cx   = r.left + r.width  / 2
      const cy   = r.top  + r.height / 2
      const dx   = mx - cx
      const dy   = my - cy
      const dist = Math.hypot(dx, dy)

      if (dist < t.radius) {
        // ── Pull toward cursor ──────────────────────────────────────────────
        t.active = true

        gsap.to(t.el, {
          x: dx * t.str,
          y: dy * t.str,
          duration: 0.5,
          ease: 'power2.out',
          overwrite: 'auto',
        })

        if (t.txtEl) {
          // Text moves at a higher rate than the element → depth illusion
          gsap.to(t.txtEl, {
            x: dx * t.txtStr,
            y: dy * t.txtStr,
            duration: 0.45,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      } else if (t.active) {
        // ── Snap back with elastic spring ───────────────────────────────────
        t.active = false

        gsap.to(t.el, {
          x: 0, y: 0,
          duration: 0.9,
          ease: 'elastic.out(1, 0.4)',
          overwrite: 'auto',
        })

        if (t.txtEl) {
          gsap.to(t.txtEl, {
            x: 0, y: 0,
            duration: 0.85,
            ease: 'elastic.out(1, 0.4)',
            overwrite: 'auto',
          })
        }
      }
    })
  }

  // Passive listener — never blocks scroll
  window.addEventListener('mousemove', onMove, { passive: true })
}
