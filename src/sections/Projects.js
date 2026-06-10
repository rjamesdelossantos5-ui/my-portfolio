const PROJECTS = [
  {
    title: 'StreamForge',
    tags:  ['TypeScript', 'Kafka', 'Redis', 'Docker'],
    desc:  'Production event streaming platform processing 100k+ events/sec with automatic backpressure handling, schema validation, and a real-time consumer-lag dashboard.',
    img:   'https://picsum.photos/seed/streamforge/600/400',
    accent: '#FF4757',
    stat:  '100k+ evt/s',
    href:  'https://github.com',
  },
  {
    title: 'NeuralProxy',
    tags:  ['Python', 'FastAPI', 'PyTorch', 'K8s'],
    desc:  'Self-healing API gateway using ML to predict and reroute traffic during partial failures. Zero-downtime canary deployments with distributed tracing built in.',
    img:   'https://picsum.photos/seed/neuroproxy/600/400',
    accent: '#00D4FF',
    stat:  '<50ms p99',
    href:  'https://github.com',
  },
  {
    title: 'CipherVault',
    tags:  ['Go', 'gRPC', 'AWS KMS', 'Terraform'],
    desc:  'Zero-trust secrets management with envelope encryption, automatic key rotation, full audit logging, and fine-grained RBAC integrated with Kubernetes service accounts.',
    img:   'https://picsum.photos/seed/ciphervault/600/400',
    accent: '#A8FF3E',
    stat:  'Zero-trust',
    href:  'https://github.com',
  },
  {
    title: 'QueryLens',
    tags:  ['TypeScript', 'D3.js', 'PostgreSQL', 'React'],
    desc:  'Visual PostgreSQL query analyser that parses EXPLAIN ANALYZE output into interactive flamegraphs. Identifies slow nodes, missing indexes, and seq scans in real time.',
    img:   'https://picsum.photos/seed/querylens/600/400',
    accent: '#FFC300',
    stat:  'Open Source',
    href:  'https://github.com',
  },
]

export function render() {
  return `
<section class="section" id="s-projects"
  style="background:linear-gradient(135deg,#0A0118 0%,#140A20 100%);">

  <span class="section-label">02 — Projects</span>

  <div style="height:100%;display:flex;flex-direction:column;justify-content:center;
    padding:0 5rem;padding-top:5rem;">

    <!-- Header -->
    <div style="display:flex;align-items:flex-end;justify-content:space-between;
      margin-bottom:2rem;">
      <h2 class="display-lg" style="color:#fff;">
        Systems Built<br>
        <span class="grad-gold-lime">to Last.</span>
      </h2>
      <p style="font-family:'Inter',sans-serif;font-size:0.82rem;font-weight:300;
        color:rgba(255,255,255,0.28);max-width:22rem;text-align:right;line-height:1.7;">
        Production & open-source. Each project is an exercise in engineering trade-offs.
      </p>
    </div>

    <!-- Cards grid -->
    <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;
      flex:1;max-height:calc(100vh - 18rem);">
      ${PROJECTS.map(({ title, tags, desc, img, accent, stat, href }) => `
        <a href="${href}" target="_blank" rel="noopener noreferrer"
           class="glass project-card"
           style="display:flex;flex-direction:column;overflow:hidden;
             text-decoration:none;transition:transform 0.3s,box-shadow 0.3s;"
           data-accent="${accent}">

          <!-- Image -->
          <div style="position:relative;height:42%;overflow:hidden;border-radius:1rem 1rem 0 0;
            flex-shrink:0;">
            <img src="${img}" alt="${title} preview"
                 style="width:100%;height:100%;object-fit:cover;
                   transition:transform 0.5s;" class="proj-img" loading="lazy" />
            <div style="position:absolute;inset:0;
              background:linear-gradient(to top,rgba(20,10,32,0.7) 0%,transparent 60%);"></div>
            <span style="position:absolute;top:0.75rem;right:0.75rem;
              font-family:'Inter',sans-serif;font-size:0.6rem;font-weight:700;
              letter-spacing:0.12em;text-transform:uppercase;
              padding:0.25rem 0.625rem;border-radius:100px;
              color:${accent};background:${accent}18;border:1px solid ${accent}44;">
              ${stat}
            </span>
          </div>

          <!-- Content -->
          <div style="display:flex;flex-direction:column;gap:0.625rem;padding:1rem;flex:1;">
            <h3 style="font-family:'Syne',sans-serif;font-weight:700;
              color:#fff;font-size:1rem;line-height:1.2;">${title}</h3>
            <p style="font-family:'Inter',sans-serif;font-size:0.75rem;font-weight:300;
              color:rgba(255,255,255,0.38);line-height:1.65;flex:1;" class="clamp-3">
              ${desc}
            </p>
            <div style="display:flex;flex-wrap:wrap;gap:0.35rem;">
              ${tags.map(t => `
                <span style="font-family:'Inter',sans-serif;font-size:0.62rem;font-weight:500;
                  padding:0.2rem 0.55rem;border-radius:100px;
                  color:${accent};background:${accent}12;border:1px solid ${accent}25;">
                  ${t}
                </span>
              `).join('')}
            </div>
          </div>
        </a>
      `).join('')}
    </div>

  </div>

  <!-- Ambient blob -->
  <div class="blob" style="width:500px;height:500px;
    background:radial-gradient(circle,rgba(74,0,128,0.4) 0%,transparent 65%);
    bottom:-20%;right:5%;"></div>

</section>`
}

export function init() {
  document.querySelectorAll('.project-card').forEach(card => {
    const accent = card.dataset.accent
    const img = card.querySelector('.proj-img')
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-6px)'
      card.style.boxShadow = `0 20px 60px ${accent}20, inset 0 0 0 1px ${accent}44`
      if (img) img.style.transform = 'scale(1.07)'
    })
    card.addEventListener('mouseleave', () => {
      card.style.transform = ''
      card.style.boxShadow = ''
      if (img) img.style.transform = ''
    })
  })
}
