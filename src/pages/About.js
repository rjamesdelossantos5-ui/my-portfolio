const EXPERIENCE = [
  {
    role:    'Senior Software Engineer',
    company: '[Company Name]',
    period:  '2024 — Present',
    type:    'Full-time',
    logo:    'https://picsum.photos/seed/corp1/80/80',
    accent:  '#00f5ff',
    bullets: [
      'Led architecture of a high-traffic data ingestion pipeline handling 500k+ events/day',
      'Reduced p99 API latency by 40% through query optimisation and Redis caching strategies',
      'Mentored 3 junior engineers and drove adoption of TypeScript across the backend codebase',
    ],
  },
  {
    role:    'Full-Stack Engineer',
    company: '[Company Name]',
    period:  '2022 — 2024',
    type:    'Full-time',
    logo:    'https://picsum.photos/seed/corp2/80/80',
    accent:  '#a855f7',
    bullets: [
      'Built a multi-tenant SaaS platform from scratch — API design, database schema, React frontend',
      'Designed a PostgreSQL schema supporting 200k+ rows with sub-10ms query times',
      'Shipped a real-time notifications system using WebSockets and Redis pub/sub',
    ],
  },
  {
    role:    'Junior Developer',
    company: '[Company Name]',
    period:  '2020 — 2022',
    type:    'Full-time',
    logo:    'https://picsum.photos/seed/corp3/80/80',
    accent:  '#39ff14',
    bullets: [
      'Contributed to a fintech payment processing API serving 10k+ daily transactions',
      'Built internal tooling that reduced manual reporting time by 3 hours per week',
      'Introduced automated integration tests — coverage went from 12% to 78%',
    ],
  },
]

const SKILLS = [
  {
    category: 'Frontend',
    accent:   { text: 'text-[#00f5ff]', bg: 'bg-[#00f5ff]/10', border: 'border-[#00f5ff]/25', dot: 'bg-[#00f5ff]' },
    items: ['TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Three.js', 'WebGL', 'Vite', 'Zustand'],
  },
  {
    category: 'Backend',
    accent:   { text: 'text-[#a855f7]', bg: 'bg-[#a855f7]/10', border: 'border-[#a855f7]/25', dot: 'bg-[#a855f7]' },
    items: ['Node.js', 'Python', 'Go', 'FastAPI', 'PostgreSQL', 'Redis', 'GraphQL', 'gRPC'],
  },
  {
    category: 'Infrastructure',
    accent:   { text: 'text-[#39ff14]', bg: 'bg-[#39ff14]/10', border: 'border-[#39ff14]/25', dot: 'bg-[#39ff14]' },
    items: ['Docker', 'Kubernetes', 'AWS', 'Terraform', 'CI/CD', 'Nginx', 'Prometheus', 'Grafana'],
  },
]

const INFO_ITEMS = [
  { accent: '#00f5ff', title: 'B.S. Computer Science',       sub: 'Data Structures · Algorithms · Systems Programming' },
  { accent: '#a855f7', title: 'Distributed Systems',         sub: 'Consensus · Replication · Fault Tolerance' },
  { accent: '#39ff14', title: 'Database Internals',          sub: 'Query Planning · Indexing · MVCC' },
  { accent: '#00f5ff', title: 'Performance Engineering',     sub: 'Profiling · Optimization · Observability' },
]

export function render() {
  return `
    <div class="page-enter">

      <!-- ── Profile Hero ───────────────────────────────────────────── -->
      <section class="border-b border-white/5 py-20 px-6">
        <div class="max-w-5xl mx-auto flex flex-col sm:flex-row items-center sm:items-start gap-10 sm:gap-14">

          <!-- Photo placeholder — replace src with your own -->
          <div class="shrink-0 relative">
            <div class="w-40 h-40 sm:w-52 sm:h-52 rounded-2xl overflow-hidden
                        ring-1 ring-white/10 shadow-[0_0_40px_rgba(0,245,255,0.08)]">
              <img src="/h.jpg"
                   alt="Profile photo — replace with your own"
                   class="w-full h-full object-cover" />
            </div>
            <!-- Accent border glow -->
            <div class="absolute -inset-0.5 rounded-2xl bg-gradient-to-br from-[#00f5ff]/20
                        to-[#a855f7]/20 -z-10 blur-sm"></div>
          </div>

          <!-- Text -->
          <div class="text-center sm:text-left">
            <span class="font-mono text-[#00f5ff] text-xs uppercase tracking-[0.35em] mb-3 block">
              001 — About
            </span>
            <h2 class="text-4xl sm:text-5xl font-black text-white mb-2 leading-tight">
              RJ Santos
            </h2>
            <p class="font-mono text-sm text-[#a855f7] mb-6">Full-Stack Software Engineer</p>
            <p class="text-gray-400 leading-relaxed max-w-xl mb-8">
              I'm a full-stack engineer who thrives on complexity. Whether it's
              optimising database query plans, designing fault-tolerant distributed
              systems, or building pixel-perfect UIs — I care deeply about correctness
              and craft at every layer.
            </p>
            <div class="flex flex-col sm:flex-row items-center sm:items-start gap-3">
              <a href="#/projects"
                 class="inline-flex items-center gap-2 px-6 py-3
                        bg-[#00f5ff] text-black font-bold text-sm uppercase tracking-widest
                        rounded-lg transition-all duration-300
                        hover:shadow-[0_0_25px_rgba(0,245,255,0.45)] hover:scale-105">
                See My Work →
              </a>
              <a href="#/contact"
                 class="inline-flex items-center gap-2 px-6 py-3
                        border border-white/20 text-white font-medium text-sm uppercase tracking-widest
                        rounded-lg transition-all duration-300 hover:border-white/40 hover:bg-white/5">
                Get In Touch
              </a>
            </div>
          </div>

        </div>
      </section>

      <!-- ── Experience ─────────────────────────────────────────────── -->
      <section class="py-20 px-6 border-b border-white/5">
        <div class="max-w-5xl mx-auto">
          <h3 class="font-mono text-xs text-gray-500 uppercase tracking-[0.35em] mb-12">
            Work Experience
          </h3>

          <div class="relative">
            <!-- Timeline line -->
            <div class="absolute left-[23px] top-0 bottom-0 w-px bg-white/5 hidden sm:block"></div>

            <div class="flex flex-col gap-10">
              ${EXPERIENCE.map(({ role, company, period, type, logo, accent, bullets }) => `
                <div class="flex gap-6 sm:gap-8 items-start group">

                  <!-- Company logo -->
                  <div class="shrink-0 relative z-10">
                    <div class="w-12 h-12 rounded-xl overflow-hidden ring-1 ring-white/10
                                bg-[#111118] flex items-center justify-center">
                      <img src="${logo}"
                           alt="${company} logo — replace with your own"
                           class="w-full h-full object-cover" />
                    </div>
                  </div>

                  <!-- Content -->
                  <div class="flex-1 pb-2">
                    <div class="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 mb-1">
                      <h4 class="text-white font-bold text-lg">${role}</h4>
                      <span class="px-2 py-0.5 text-[10px] font-mono uppercase tracking-widest
                                   rounded-full border self-start sm:self-auto"
                            style="color:${accent}; border-color:${accent}44; background:${accent}12">
                        ${type}
                      </span>
                    </div>
                    <div class="flex items-center gap-3 mb-4">
                      <p class="text-gray-500 text-sm font-medium">${company}</p>
                      <span class="text-gray-700">·</span>
                      <p class="font-mono text-xs text-gray-600">${period}</p>
                    </div>
                    <ul class="space-y-2">
                      ${bullets.map(b => `
                        <li class="flex items-start gap-2.5 text-sm text-gray-400 leading-relaxed">
                          <span class="mt-1.5 w-1 h-1 rounded-full shrink-0"
                                style="background:${accent}"></span>
                          ${b}
                        </li>
                      `).join('')}
                    </ul>
                  </div>

                </div>
              `).join('')}
            </div>
          </div>
        </div>
      </section>

      <!-- ── Skills Grid ─────────────────────────────────────────────── -->
      <section class="py-20 px-6 border-b border-white/5">
        <div class="max-w-5xl mx-auto">
          <h3 class="font-mono text-xs text-gray-500 uppercase tracking-[0.35em] mb-8">
            Technical Stack
          </h3>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            ${SKILLS.map(({ category, accent, items }) => `
              <div class="bg-[#111118] border border-white/5 rounded-2xl p-6
                          hover:border-white/10 transition-colors duration-300">
                <div class="flex items-center gap-2.5 mb-5">
                  <div class="w-2 h-2 rounded-full ${accent.dot}"></div>
                  <h4 class="font-mono text-sm font-bold ${accent.text} uppercase tracking-wider">
                    ${category}
                  </h4>
                </div>
                <div class="flex flex-wrap gap-2">
                  ${items.map(item => `
                    <span class="px-2.5 py-1 text-xs font-mono rounded-md
                                 ${accent.bg} ${accent.text} border ${accent.border}
                                 hover:brightness-125 transition-all duration-150 cursor-default">
                      ${item}
                    </span>
                  `).join('')}
                </div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ── Additional Info ─────────────────────────────────────────── -->
      <section class="py-20 px-6">
        <div class="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">

          <div class="bg-[#111118] border border-white/5 rounded-2xl p-6">
            <h4 class="font-mono text-xs text-gray-500 uppercase tracking-[0.35em] mb-4">
              Background
            </h4>
            <p class="text-gray-300 text-sm leading-relaxed mb-4">
              4+ years shipping production software across fintech, SaaS, and
              data-intensive platforms. I've owned systems end-to-end — from
              database schema design to deployment pipelines — and I care about
              every layer in between.
            </p>
            <p class="text-gray-500 text-sm leading-relaxed">
              My approach: write less code, make it do more. I reach for the
              simplest correct solution, not the most impressive one.
            </p>
          </div>

          <div class="bg-[#111118] border border-white/5 rounded-2xl p-6">
            <h4 class="font-mono text-xs text-gray-500 uppercase tracking-[0.35em] mb-5">
              Education &amp; Interests
            </h4>
            <ul class="space-y-4">
              ${INFO_ITEMS.map(({ accent, title, sub }) => `
                <li class="flex items-start gap-3">
                  <span class="font-mono text-xs mt-0.5 select-none" style="color:${accent}">▸</span>
                  <div>
                    <p class="text-white text-sm font-medium">${title}</p>
                    <p class="text-gray-500 text-xs font-mono mt-0.5">${sub}</p>
                  </div>
                </li>
              `).join('')}
            </ul>
          </div>

        </div>
      </section>

    </div>
  `
}

export function init() {}
