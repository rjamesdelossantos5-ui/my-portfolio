const NAV_LINKS = [
  { label: 'Home',     href: '#/' },
  { label: 'About',    href: '#/about' },
  { label: 'Projects', href: '#/projects' },
  { label: 'Contact',  href: '#/contact' },
]

export function Navbar() {
  return `
    <nav id="navbar" class="fixed top-0 left-0 right-0 z-50
                            bg-[#0a0a0f]/85 backdrop-blur-md border-b border-white/5">
      <div class="max-w-6xl mx-auto px-6 sm:px-8 h-16 flex items-center justify-between">

        <a href="#/" class="font-mono text-sm font-bold tracking-widest uppercase
                            text-[#00f5ff] hover:opacity-75 transition-opacity duration-200">
          RJ<span class="text-white">Santos</span>
        </a>

        <!-- Desktop links -->
        <ul class="hidden sm:flex items-center gap-8 list-none m-0 p-0">
          ${NAV_LINKS.map(({ label, href }) => `
            <li>
              <a href="${href}" data-route="${href}"
                 class="nav-link relative text-sm font-medium tracking-wide text-gray-400
                        hover:text-[#00f5ff] transition-colors duration-200
                        after:absolute after:bottom-[-3px] after:left-0
                        after:h-px after:w-0 after:bg-[#00f5ff]
                        after:transition-[width] after:duration-300
                        hover:after:w-full">
                ${label}
              </a>
            </li>
          `).join('')}
        </ul>

        <!-- Hamburger (mobile) -->
        <button id="nav-toggle"
                class="sm:hidden text-gray-400 hover:text-white transition-colors p-1"
                aria-label="Toggle navigation" aria-expanded="false">
          <svg id="icon-open"  width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <line x1="3" y1="6"  x2="19" y2="6"/>
            <line x1="3" y1="11" x2="19" y2="11"/>
            <line x1="3" y1="16" x2="19" y2="16"/>
          </svg>
          <svg id="icon-close" width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="hidden">
            <line x1="4" y1="4" x2="18" y2="18"/>
            <line x1="18" y1="4" x2="4" y2="18"/>
          </svg>
        </button>
      </div>

      <!-- Mobile dropdown -->
      <div id="mobile-menu"
           class="sm:hidden hidden border-t border-white/5 bg-[#0a0a0f]/95 backdrop-blur-md">
        <ul class="flex flex-col list-none m-0 p-0 px-6 py-4 gap-1">
          ${NAV_LINKS.map(({ label, href }) => `
            <li>
              <a href="${href}" data-route="${href}"
                 class="nav-link block py-2.5 text-sm font-medium text-gray-400
                        hover:text-[#00f5ff] transition-colors duration-200 border-b border-white/5 last:border-0">
                ${label}
              </a>
            </li>
          `).join('')}
        </ul>
      </div>
    </nav>
  `
}

export function initNavbar() {
  const toggle  = document.getElementById('nav-toggle')
  const menu    = document.getElementById('mobile-menu')
  const iconOpen  = document.getElementById('icon-open')
  const iconClose = document.getElementById('icon-close')

  toggle?.addEventListener('click', () => {
    const open = menu.classList.toggle('hidden')
    iconOpen.classList.toggle('hidden', !open)
    iconClose.classList.toggle('hidden', open)
    toggle.setAttribute('aria-expanded', String(!open))
  })

  // Close mobile menu on any nav link click
  menu?.addEventListener('click', e => {
    if (e.target.closest('a')) {
      menu.classList.add('hidden')
      iconOpen.classList.remove('hidden')
      iconClose.classList.add('hidden')
      toggle?.setAttribute('aria-expanded', 'false')
    }
  })
}

export function updateActiveNavLink(route) {
  document.querySelectorAll('.nav-link').forEach(link => {
    const active = link.dataset.route === route
    link.classList.toggle('text-[#00f5ff]', active)
    link.classList.toggle('text-gray-400',  !active)
    // Keep underline on active
    if (active) link.classList.add('after:w-full')
    else        link.classList.remove('after:w-full')
  })
}
