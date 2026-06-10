const LINKS = [
  { label: 'Home',          index: 0 },
  { label: 'About',         index: 1 },
  { label: 'Projects',      index: 2 },
  { label: 'Collaborators', index: 3 },
  { label: 'Contact',       index: 4 },
]

export function render() {
  return `
<header id="site-nav">
  <div id="progress-bar"></div>
  <div class="nav-inner">
    <button class="nav-logo nav-link" data-index="0">
      RJ<span style="color:#FF4757;">.</span>
    </button>
    <ul class="nav-links">
      ${LINKS.map(({ label, index }) => `
        <li>
          <button class="nav-link-btn nav-link" data-index="${index}">
            ${label}
          </button>
        </li>
      `).join('')}
    </ul>
    <button class="nav-hire nav-link" data-index="4">Hire Me</button>
  </div>
</header>`
}

export function init(sections) {
  const progressBar = document.getElementById('progress-bar')
  const navLinks    = document.querySelectorAll('.nav-link[data-index]')

  function scrollToSection(index) {
    const track = document.querySelector('.sections-track')
    if (!track) return
    const maxX = track.scrollWidth - window.innerWidth
    const maxY = document.documentElement.scrollHeight - window.innerHeight
    if (maxX <= 0) return
    const targetY = (index * window.innerWidth / maxX) * maxY
    window.scrollTo({ top: targetY, behavior: 'smooth' })
  }

  navLinks.forEach(btn => {
    btn.addEventListener('click', () => {
      scrollToSection(parseInt(btn.dataset.index, 10))
    })
  })

  function onScroll() {
    const maxY = document.documentElement.scrollHeight - window.innerHeight
    const progress = maxY > 0 ? window.scrollY / maxY : 0

    if (progressBar) {
      progressBar.style.transform = `scaleX(${progress})`
    }

    // Determine active section
    const track = document.querySelector('.sections-track')
    if (!track) return
    const maxX = track.scrollWidth - window.innerWidth
    const currentX = maxX > 0 ? progress * maxX : 0

    let activeIdx = 0
    sections.forEach((section, i) => {
      if (section.offsetLeft <= currentX + window.innerWidth * 0.5) {
        activeIdx = i
      }
    })

    document.querySelectorAll('.nav-link-btn').forEach(btn => {
      btn.classList.toggle('active', parseInt(btn.dataset.index, 10) === activeIdx)
    })
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}
