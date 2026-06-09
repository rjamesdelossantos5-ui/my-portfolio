import './style.css'
import { Navbar, updateActiveNavLink, initNavbar } from './components/Navbar.js'
import { Footer } from './components/Footer.js'
import { init3DBackground, destroy3DBackground } from './components/3DBackground.js'
import * as HomePage    from './pages/Home.js'
import * as AboutPage   from './pages/About.js'
import * as ProjectsPage from './pages/Projects.js'
import * as ContactPage from './pages/Contact.js'

const routes = {
  '#/':         HomePage,
  '#/about':    AboutPage,
  '#/projects': ProjectsPage,
  '#/contact':  ContactPage,
}

// ─── Shell (rendered once) ────────────────────────────────────────────────────
document.querySelector('#app').innerHTML = `
  <canvas id="bg-canvas"></canvas>
  ${Navbar()}
  <div id="page-content" class="pt-20 min-h-screen flex flex-col">
    <main id="main-view" class="flex-1"></main>
    ${Footer()}
  </div>
`
initNavbar()

// ─── Router ───────────────────────────────────────────────────────────────────
function getRoute() {
  const hash = window.location.hash || '#/'
  return hash in routes ? hash : '#/'
}

let bgActive = false

function render() {
  const route = getRoute()
  const page  = routes[route]
  const main  = document.getElementById('main-view')

  main.innerHTML = page.render()
  page.init?.()

  updateActiveNavLink(route)
  window.scrollTo({ top: 0, behavior: 'instant' })

  // 3D canvas lifecycle — only on home
  const canvas = document.getElementById('bg-canvas')
  const onHome = route === '#/'
  canvas.style.display = onHome ? 'block' : 'none'

  if (onHome && !bgActive) {
    init3DBackground(canvas)
    bgActive = true
  } else if (!onHome && bgActive) {
    destroy3DBackground()
    bgActive = false
  }
}

window.addEventListener('hashchange', render)
window.addEventListener('load', render)
