import './style.css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { render as renderNav, init as initNav }             from './components/Navbar.js'
import { render as renderHero, init as initHero }           from './sections/Hero.js'
import { render as renderAbout, init as initAbout }         from './sections/About.js'
import { render as renderProjects, init as initProjects }   from './sections/Projects.js'
import { render as renderCollabs, init as initCollabs }     from './sections/Collaborators.js'
import { render as renderContact, init as initContact }     from './sections/Contact.js'

gsap.registerPlugin(ScrollTrigger)

// ─── Build DOM ────────────────────────────────────────────────────────────────
document.querySelector('#app').innerHTML = `
  ${renderNav()}
  <div class="sections-track">
    ${renderHero()}
    ${renderAbout()}
    ${renderProjects()}
    ${renderCollabs()}
    ${renderContact()}
  </div>
`

// ─── Init section JS ──────────────────────────────────────────────────────────
initHero()
initAbout()
initProjects()
initCollabs()
initContact()

// ─── GSAP Horizontal Scroll ───────────────────────────────────────────────────
const track    = document.querySelector('.sections-track')
const sections = gsap.utils.toArray('.section')

gsap.to(track, {
  x: () => -(track.scrollWidth - window.innerWidth),
  ease: 'none',
  scrollTrigger: {
    trigger:            track,
    pin:                true,
    scrub:              1,
    start:              'top top',
    end:                () => `+=${track.scrollWidth - window.innerWidth}`,
    invalidateOnRefresh: true,
  },
})

// ─── Nav scroll-seek init ─────────────────────────────────────────────────────
// Wait one tick so ScrollTrigger has calculated document height
requestAnimationFrame(() => initNav(sections))
