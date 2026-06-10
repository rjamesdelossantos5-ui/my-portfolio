const COLLABS = [
  {
    name:   'Richie Lumits',
    role:   'Core user',
    tag:    'Medjo malibog',
    desc:   'We turn complex data flows into elegant, pixel-perfect interfaces. Aria brings the visual clarity that makes technical systems feel approachable.',
    img:    '/rich.jpg',
    accent: '#FF4757',
    handle: '@aria.design',
  },
  {
    name:   'Gab Beso',
    role:   'Mid Only Lang',
    tag:    'Asa sa akai ko',
    desc:   'Marcus handles infrastructure-as-code for all our shared projects — zero-downtime Kubernetes deploys, IaC pipelines, and SRE best practices.',
    img:    '/gab.jpg',
    accent: '#00D4FF',
    handle: '@marcus.ops',
  },
  {
    name:   'Jeron Eybanes',
    role:   'Exp to e',
    tag:    'eh',
    desc:   'Built the prediction models powering NeuralProxy. Sofia bridges research-grade machine learning and production systems that actually hold up under load.',
    img:    '/ron.jpg',
    accent: '#A8FF3E',
    handle: '@sofia.ml',
  },
  {
    name:   'Sean Kingston',
    role:   'Minsittar main',
    tag:    'kai sotto',
    desc:   'James keeps us aligned on what actually matters to users. He translates engineering trade-offs into business decisions without losing the nuance.',
    img:    '/sean.jpg',
    accent: '#FFC300',
    handle: '@james.pm',
  },
  {
    name:   'Jaezer',
    role:   'Kapensanan na',
    tag:    'nachos',
    desc:   'The master of micro-animations and interactive experiences. Lena elevates every project with her obsessive attention to motion and interaction detail.',
    img:    '/jaz.jpg',
    accent: '#9B59B6',
    handle: '@lena.dev',
  },
  {
    name:   'Epi hotspot',
    role:   'top 1 global unli rice',
    tag:    'dragon balls lover',
    desc:   'The master of micro-animations and interactive experiences. Lena elevates every project with her obsessive attention to motion and interaction detail.',
    img:    '/epi1.jpg',
    accent: '#9B59B6',
    handle: '@lena.dev',
  },
]

export function render() {
  return `
<section class="section" id="s-collabs"
  style="background:linear-gradient(135deg,#060C18 0%,#0A1628 100%);">

  <span class="section-label">03 — Collaborators</span>

  <div style="height:100%;display:flex;flex-direction:column;justify-content:center;
    padding:0 5rem;padding-top:5rem;">

    <!-- Header -->
    <div style="display:flex;align-items:flex-end;justify-content:space-between;
      margin-bottom:2rem;">
      <h2 class="display-lg" style="color:#fff;">
        The People<br>
        <span class="grad-cyan-plum">I Build With.</span>
      </h2>
      <p style="font-family:'Inter',sans-serif;font-size:0.82rem;font-weight:300;
        color:rgba(255,255,255,0.28);max-width:20rem;text-align:right;line-height:1.7;">
        A tight-knit network of specialists who elevate every project they touch.
      </p>
    </div>

    <!-- Cards — columns scale automatically with array length -->
    <div style="display:grid;grid-template-columns:repeat(${COLLABS.length},1fr);gap:1rem;
      flex:1;max-height:calc(100vh - 18rem);">
      ${COLLABS.map(({ name, role, tag, img, accent, handle }) => `
        <div class="collab-card"
             style="position:relative;overflow:hidden;border-radius:1.25rem;
               cursor:default;transition:transform 0.3s,box-shadow 0.3s;"
             data-accent="${accent}">

          <!-- Full-bleed portrait image -->
          <img src="${img}" alt="${name}"
               style="position:absolute;inset:0;width:100%;height:100%;
                 object-fit:cover;object-position:top center;
                 transition:transform 0.55s ease;" class="collab-img" loading="lazy" />

          <!-- Gradient: strong at bottom for text, subtle vignette at top -->
          <div style="position:absolute;inset:0;pointer-events:none;
            background:linear-gradient(
              to top,
              rgba(6,12,24,0.96) 0%,
              rgba(6,12,24,0.55) 30%,
              rgba(6,12,24,0.1)  55%,
              transparent        75%
            );"></div>

          <!-- Accent glow bar at very bottom edge -->
          <div style="position:absolute;bottom:0;left:0;right:0;height:2px;
            background:${accent};opacity:0.6;pointer-events:none;
            box-shadow:0 0 12px ${accent};"></div>

          <!-- Specialty tag — top-left -->
          <span style="position:absolute;top:0.75rem;left:0.75rem;
            font-family:'Inter',sans-serif;font-size:0.58rem;font-weight:600;
            letter-spacing:0.1em;text-transform:uppercase;
            padding:0.22rem 0.6rem;border-radius:100px;
            color:${accent};background:rgba(6,12,24,0.55);
            border:1px solid ${accent}55;backdrop-filter:blur(6px);">
            ${tag}
          </span>

          <!-- Name / role / handle — pinned to bottom -->
          <div style="position:absolute;bottom:0;left:0;right:0;padding:1rem 1rem 0.9rem;">
            <h3 style="font-family:'Syne',sans-serif;font-weight:700;color:#fff;
              font-size:0.95rem;line-height:1.2;margin-bottom:0.2rem;">${name}</h3>
            <p style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;
              letter-spacing:0.05em;color:${accent};margin-bottom:0.25rem;">${role}</p>
            <p style="font-family:'Inter',sans-serif;font-size:0.62rem;
              color:rgba(255,255,255,0.25);">${handle}</p>
          </div>
        </div>
      `).join('')}
    </div>

  </div>

  <!-- Ambient blob -->
  <div class="blob" style="width:650px;height:650px;
    background:radial-gradient(circle,rgba(0,30,80,0.6) 0%,transparent 65%);
    top:-25%;left:-10%;"></div>

</section>`
}

export function init() {
  document.querySelectorAll('.collab-card').forEach(card => {
    const accent = card.dataset.accent
    const img = card.querySelector('.collab-img')
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)'
      card.style.boxShadow = `0 20px 50px ${accent}18, inset 0 0 0 1px ${accent}44`
      if (img) img.style.transform = 'scale(1.06)'
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = ''
      card.style.boxShadow = ''
      if (img) img.style.transform = ''
    })
  })
}
