import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Game } from '../game/Game.js'

export function render() {
  return `
<section class="section" id="s-game"
  style="background:#050A14;position:relative;overflow:hidden;">

  <span class="section-label">04 — Play</span>

  <!-- Game canvas fills the whole section -->
  <canvas id="game-canvas" style="display:block;width:100%;height:100%;cursor:crosshair;"></canvas>

  <!-- ── Start screen ───────────────────────────────── -->
  <div id="gs-start" class="game-overlay">
    <div class="game-modal">
      <p class="label-sm" style="color:#A8FF3E;margin-bottom:.6rem;">MINI GAME</p>
      <h2 class="display-lg" style="margin-bottom:.9rem;">
        Feature Creep<br>
        <span class="grad-coral-cyan">Survival</span>
      </h2>
      <p style="font-family:'Inter',sans-serif;font-size:0.88rem;font-weight:300;
        color:rgba(255,255,255,0.42);line-height:1.75;max-width:360px;text-align:center;
        margin-bottom:1.8rem;">
        Endless bug reports converge on your cursor.<br>
        Auto-fire commits. Collect XP gems to level up.<br>
        <span style="color:rgba(255,255,255,0.22);font-size:.78rem;">
          Move: mouse&nbsp;/&nbsp;WASD &nbsp;·&nbsp; Scroll locks while you play
        </span>
      </p>
      <button id="gs-btn-start" class="btn-primary">Start Coding →</button>
    </div>
  </div>

  <!-- ── Level-up screen ───────────────────────────── -->
  <div id="gs-levelup" class="game-overlay" style="display:none;">
    <div class="game-modal">
      <p class="label-sm" style="color:#FFC300;margin-bottom:.5rem;">LEVEL UP</p>
      <h3 style="font-family:'Syne',sans-serif;font-weight:700;font-size:1.5rem;
        color:#fff;margin-bottom:1.5rem;">Choose an upgrade</h3>
      <div id="gs-upgrade-cards" class="upgrade-cards"></div>
    </div>
  </div>

  <!-- ── Game over screen ──────────────────────────── -->
  <div id="gs-over" class="game-overlay" style="display:none;">
    <div class="game-modal">
      <p class="label-sm" style="color:#FF4757;margin-bottom:.6rem;">SYSTEM CRASH</p>
      <h2 class="display-lg" style="margin-bottom:1rem;">
        <span class="grad-coral-cyan">Game Over</span>
      </h2>
      <p id="gs-go-wave"  style="font-family:'Syne',sans-serif;font-size:1.1rem;
        font-weight:700;color:#fff;margin-bottom:.35rem;">Wave 1</p>
      <p id="gs-go-kills" style="font-family:'Inter',sans-serif;font-size:.85rem;
        color:rgba(255,255,255,0.4);margin-bottom:2rem;">0 bugs squashed</p>
      <button id="gs-btn-restart" class="btn-primary">Try Again →</button>
    </div>
  </div>

  <!-- Ambient blobs -->
  <div class="blob" style="width:600px;height:600px;pointer-events:none;z-index:0;
    background:radial-gradient(circle,rgba(168,255,62,0.05) 0%,transparent 60%);
    bottom:-20%;left:-10%;"></div>
  <div class="blob" style="width:400px;height:400px;pointer-events:none;z-index:0;
    background:radial-gradient(circle,rgba(255,71,87,0.06) 0%,transparent 60%);
    top:-10%;right:5%;"></div>

</section>`
}

export function init() {
  const canvas    = document.getElementById('game-canvas')
  const startBtn  = document.getElementById('gs-btn-start')
  const restartBtn = document.getElementById('gs-btn-restart')

  if (!canvas) return

  const game = new Game(canvas, {
    startScreen:      document.getElementById('gs-start'),
    overScreen:       document.getElementById('gs-over'),
    levelupScreen:    document.getElementById('gs-levelup'),
    upgradeContainer: document.getElementById('gs-upgrade-cards'),
    goWave:           document.getElementById('gs-go-wave'),
    goKills:          document.getElementById('gs-go-kills'),
  })

  // ── Scroll gating ──────────────────────────────────────────────────────────
  function disableScroll() {
    ScrollTrigger.getAll().forEach(st => st.disable())
    game.focus()
  }
  function enableScroll() {
    ScrollTrigger.getAll().forEach(st => st.enable())
    game.blur()
  }

  game.onScrollDisable = disableScroll
  game.onScrollEnable  = enableScroll

  canvas.addEventListener('mouseenter', disableScroll)
  canvas.addEventListener('mouseleave', enableScroll)

  // ── Resize ────────────────────────────────────────────────────────────────
  const resizeObserver = new ResizeObserver(() => game._resize())
  resizeObserver.observe(canvas)

  // ── Button wiring ─────────────────────────────────────────────────────────
  startBtn.addEventListener('click',   () => game.start())
  restartBtn.addEventListener('click', () => game.start())

  // Show start screen initially
  game._show('start')
}
