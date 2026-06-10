const COLLABS = [
  {
    name:   'Aria Chen',
    role:   'UI/UX Designer',
    tag:    'Design Systems',
    desc:   'We turn complex data flows into elegant, pixel-perfect interfaces. Aria brings the visual clarity that makes technical systems feel approachable.',
    img:    'https://picsum.photos/seed/aria-collab/400/500',
    accent: '#FF4757',
    handle: '@aria.design',
  },
  {
    name:   'Marcus Webb',
    role:   'DevOps Engineer',
    tag:    'Infrastructure',
    desc:   'Marcus handles infrastructure-as-code for all our shared projects — zero-downtime Kubernetes deploys, IaC pipelines, and SRE best practices.',
    img:    'https://picsum.photos/seed/marcus-collab/400/500',
    accent: '#00D4FF',
    handle: '@marcus.ops',
  },
  {
    name:   'Sofia Reyes',
    role:   'ML Engineer',
    tag:    'AI / ML',
    desc:   'Built the prediction models powering NeuralProxy. Sofia bridges research-grade machine learning and production systems that actually hold up under load.',
    img:    'https://picsum.photos/seed/sofia-collab/400/500',
    accent: '#A8FF3E',
    handle: '@sofia.ml',
  },
  {
    name:   'James Park',
    role:   'Product Manager',
    tag:    'Strategy',
    desc:   'James keeps us aligned on what actually matters to users. He translates engineering trade-offs into business decisions without losing the nuance.',
    img:    'https://picsum.photos/seed/jpark-collab/400/500',
    accent: '#FFC300',
    handle: '@james.pm',
  },
  {
    name:   'Lena Kim',
    role:   'Frontend Engineer',
    tag:    'Interactive UI',
    desc:   'The master of micro-animations and interactive experiences. Lena elevates every project with her obsessive attention to motion and interaction detail.',
    img:    'https://picsum.photos/seed/lena-collab/400/500',
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

    <!-- 5 cards -->
    <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:1rem;
      flex:1;max-height:calc(100vh - 18rem);">
      ${COLLABS.map(({ name, role, tag, desc, img, accent, handle }) => `
        <div class="glass collab-card"
             style="display:flex;flex-direction:column;overflow:hidden;
               cursor:default;transition:transform 0.3s,box-shadow 0.3s;"
             data-accent="${accent}">

          <!-- Portrait -->
          <div style="position:relative;height:48%;overflow:hidden;
            border-radius:1.25rem 1.25rem 0 0;flex-shrink:0;">
            <img src="${img}" alt="${name}"
                 style="width:100%;height:100%;object-fit:cover;object-position:top;
                   transition:transform 0.5s;" class="collab-img" loading="lazy" />
            <div style="position:absolute;inset:0;
              background:linear-gradient(to top,rgba(6,12,24,0.75) 0%,transparent 55%);"></div>
            <!-- Specialty tag -->
            <span style="position:absolute;top:0.625rem;left:0.625rem;
              font-family:'Inter',sans-serif;font-size:0.58rem;font-weight:600;
              letter-spacing:0.1em;text-transform:uppercase;
              padding:0.2rem 0.55rem;border-radius:100px;
              color:${accent};background:${accent}18;border:1px solid ${accent}44;">
              ${tag}
            </span>
          </div>

          <!-- Info -->
          <div style="display:flex;flex-direction:column;padding:0.875rem 1rem;gap:0.5rem;flex:1;">
            <div>
              <h3 style="font-family:'Syne',sans-serif;font-weight:700;
                color:#fff;font-size:0.95rem;line-height:1.2;margin-bottom:0.2rem;">
                ${name}
              </h3>
              <p style="font-family:'Inter',sans-serif;font-size:0.7rem;font-weight:600;
                letter-spacing:0.05em;color:${accent};">${role}</p>
            </div>
            <p style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:300;
              color:rgba(255,255,255,0.35);line-height:1.65;flex:1;" class="clamp-3">
              ${desc}
            </p>
            <p style="font-family:'Inter',sans-serif;font-size:0.62rem;
              font-weight:400;color:rgba(255,255,255,0.18);margin-top:auto;">
              ${handle}
            </p>
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
