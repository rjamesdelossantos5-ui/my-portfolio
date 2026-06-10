const SKILLS = [
  {
    cat:   'Frontend',
    color: '#00D4FF',
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Three.js', 'Vite', 'WebGL'],
  },
  {
    cat:   'Backend',
    color: '#FF4757',
    items: ['Node.js', 'Python', 'Go', 'FastAPI', 'PostgreSQL', 'Redis', 'gRPC'],
  },
  {
    cat:   'Infrastructure',
    color: '#A8FF3E',
    items: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Prometheus', 'Nginx'],
  },
]

const STATS = [
  { v: '4+',  l: 'Years' },
  { v: '20+', l: 'Projects' },
  { v: '99%', l: 'Uptime' },
]

export function render() {
  return `
<section class="section" id="s-about"
  style="background:linear-gradient(135deg,#0C0A1A 0%,#0D1B2A 100%);">

  <span class="section-label">01 — About</span>

  <div style="height:100%;display:flex;align-items:center;padding:0 5rem;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5rem;
      width:100%;max-width:1200px;margin:0 auto;">

      <!-- Left: bio -->
      <div style="display:flex;flex-direction:column;justify-content:center;">

        <!-- Profile photo -->
        <div style="width:88px;height:88px;border-radius:1rem;overflow:hidden;
          margin-bottom:2rem;box-shadow:0 0 0 1px rgba(255,255,255,0.08),
          0 0 40px rgba(0,212,255,0.1);">
          <img src="/h.jpg"
               alt="RJ Santos profile photo"
               style="width:100%;height:100%;object-fit:cover;" />
        </div>

        <h2 class="display-lg" style="color:#fff;margin-bottom:1rem;">
          The Engineer<br>
          <span class="grad-coral-cyan">Behind the Work.</span>
        </h2>

        <p style="font-family:'Inter',sans-serif;font-weight:300;font-size:0.95rem;
          color:rgba(255,255,255,0.45);line-height:1.8;margin-bottom:1.25rem;">
          4+ years shipping production software across fintech, SaaS,
          and data-intensive platforms. I've owned systems end-to-end —
          database schema to deployment — and I care about every layer.
        </p>

        <p style="font-family:'Inter',sans-serif;font-weight:300;font-size:0.875rem;
          color:rgba(255,255,255,0.28);line-height:1.75;margin-bottom:2.5rem;">
          My approach: write less code, make it do more. I reach for
          the simplest correct solution, not the most impressive one.
        </p>

        <!-- Stats -->
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;
          padding-top:1.75rem;border-top:1px solid rgba(255,255,255,0.06);">
          ${STATS.map(({ v, l }) => `
            <div>
              <p class="grad-coral-cyan"
                 style="font-family:'Syne',sans-serif;font-weight:800;font-size:2rem;
                        line-height:1;margin-bottom:0.35rem;">${v}</p>
              <p class="label-sm" style="color:rgba(255,255,255,0.3);">${l}</p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Right: skill cards -->
      <div style="display:flex;flex-direction:column;justify-content:center;gap:1rem;">
        ${SKILLS.map(({ cat, color, items }) => `
          <div class="glass" style="padding:1.25rem 1.5rem;">
            <div style="display:flex;align-items:center;gap:0.625rem;margin-bottom:1rem;">
              <span style="width:6px;height:6px;border-radius:50%;background:${color};
                box-shadow:0 0 8px ${color};flex-shrink:0;"></span>
              <span class="label-sm" style="color:${color};">${cat}</span>
            </div>
            <div style="display:flex;flex-wrap:wrap;gap:0.5rem;">
              ${items.map(item => `
                <span style="font-family:'Inter',sans-serif;font-size:0.72rem;font-weight:500;
                  padding:0.3rem 0.75rem;border-radius:100px;
                  color:${color};background:${color}12;border:1px solid ${color}28;">
                  ${item}
                </span>
              `).join('')}
            </div>
          </div>
        `).join('')}

        <!-- Experience summary -->
        <div class="glass" style="padding:1.25rem 1.5rem;">
          <div style="display:flex;align-items:center;gap:0.625rem;margin-bottom:1rem;">
            <span style="width:6px;height:6px;border-radius:50%;background:#FFC300;
              box-shadow:0 0 8px #FFC300;flex-shrink:0;"></span>
            <span class="label-sm" style="color:#FFC300;">Experience</span>
          </div>
          ${[
            ['Senior Software Engineer', '2024 — Present'],
            ['Full-Stack Engineer',      '2022 — 2024'],
            ['Junior Developer',         '2020 — 2022'],
          ].map(([role, period]) => `
            <div style="display:flex;justify-content:space-between;align-items:baseline;
              padding:0.5rem 0;border-bottom:1px solid rgba(255,255,255,0.04);">
              <span style="font-family:'Inter',sans-serif;font-size:0.82rem;
                font-weight:500;color:rgba(255,255,255,0.7);">${role}</span>
              <span style="font-family:'Inter',sans-serif;font-size:0.68rem;
                font-weight:400;color:rgba(255,255,255,0.25);white-space:nowrap;
                margin-left:1rem;">${period}</span>
            </div>
          `).join('')}
        </div>
      </div>

    </div>
  </div>

  <!-- Ambient blobs -->
  <div class="blob" style="width:600px;height:600px;
    background:radial-gradient(circle,rgba(0,60,120,0.5) 0%,transparent 65%);
    top:50%;right:-15%;transform:translateY(-50%);"></div>

</section>`
}

export function init() {}
