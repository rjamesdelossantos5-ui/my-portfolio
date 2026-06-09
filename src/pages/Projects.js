const FEATURED = {
  title:   'StreamForge',
  accent:  '#00f5ff',
  status:  'Production',
  img:     'https://picsum.photos/seed/streamforge/1400/700',
  tags:    ['TypeScript', 'Node.js', 'Apache Kafka', 'Redis', 'PostgreSQL', 'Docker'],
  description:
    'A production-grade event streaming platform processing 100k+ events/sec. ' +
    'Features automatic backpressure handling, schema validation, dead-letter queues, ' +
    'and a real-time consumer-lag dashboard. Deployed across 3 AWS regions with ' +
    'sub-50ms end-to-end latency at the 99th percentile.',
  href: 'https://github.com',
  metrics: [
    { value: '100k+', label: 'Events/sec' },
    { value: '<50ms',  label: 'p99 Latency' },
    { value: '3',      label: 'AWS Regions' },
    { value: '99.9%',  label: 'Uptime SLA' },
  ],
}

const PROJECTS = [
  {
    title:  'NeuralProxy',
    accent: '#a855f7',
    status: 'Production',
    img:    'https://picsum.photos/seed/neuroproxy/800/450',
    tags:   ['Python', 'FastAPI', 'PyTorch', 'Nginx', 'Kubernetes', 'AWS'],
    description:
      'A self-healing API gateway that uses ML to predict and reroute traffic ' +
      'during partial failures. Includes zero-downtime canary deployments, ' +
      'distributed tracing, and adaptive rate limiting.',
    href: 'https://github.com',
  },
  {
    title:  'CipherVault',
    accent: '#39ff14',
    status: 'Open Source',
    img:    'https://picsum.photos/seed/ciphervault/800/450',
    tags:   ['Go', 'PostgreSQL', 'Redis', 'Terraform', 'AWS KMS', 'gRPC'],
    description:
      'A zero-trust secrets management system with envelope encryption, automatic ' +
      'key rotation, full audit logging, and fine-grained RBAC — integrating ' +
      'natively with Kubernetes service accounts.',
    href: 'https://github.com',
  },
  {
    title:  'QueryLens',
    accent: '#f97316',
    status: 'Open Source',
    img:    'https://picsum.photos/seed/querylens/800/450',
    tags:   ['TypeScript', 'PostgreSQL', 'React', 'D3.js', 'Node.js'],
    description:
      'A visual PostgreSQL query analyser that parses EXPLAIN ANALYZE output into ' +
      'interactive flamegraphs. Identifies slow nodes, missing indexes, and seq scans ' +
      'in real time.',
    href: 'https://github.com',
  },
]

export function render() {
  return `
    <div class="page-enter">

      <!-- ── Header ─────────────────────────────────────────────────── -->
      <section class="max-w-5xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        <span class="font-mono text-[#00f5ff] text-xs uppercase tracking-[0.35em]">
          002 — Projects
        </span>
        <h2 class="text-4xl sm:text-5xl font-black text-white mt-4 mb-6 leading-tight">
          Systems Built<br>to Last.
        </h2>
        <p class="text-gray-400 text-lg max-w-2xl leading-relaxed">
          A selection of production and open-source projects. Each one is an
          exercise in engineering trade-offs: performance vs. simplicity,
          consistency vs. availability, correctness vs. speed.
        </p>
      </section>

      <!-- ── Featured Project ───────────────────────────────────────── -->
      <section class="px-6 sm:px-8 pb-16">
        <div class="max-w-5xl mx-auto">
          <p class="font-mono text-xs text-gray-600 uppercase tracking-widest mb-5">Featured</p>

          <div class="project-card group bg-[#111118] border border-white/8 rounded-2xl
                      overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1"
               data-accent="${FEATURED.accent}">

            <!-- Large image banner -->
            <div class="relative h-64 sm:h-80 lg:h-96 overflow-hidden">
              <img src="${FEATURED.img}"
                   alt="${FEATURED.title} screenshot — replace with your own"
                   class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                   loading="lazy" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#111118] via-[#111118]/30 to-transparent"></div>

              <!-- Floating status badge -->
              <span class="absolute top-5 left-5 px-3 py-1 text-xs font-mono font-bold
                           uppercase tracking-widest rounded-full border"
                    style="color:${FEATURED.accent}; border-color:${FEATURED.accent}55; background:${FEATURED.accent}18">
                ${FEATURED.status}
              </span>
            </div>

            <div class="p-7 sm:p-10">
              <h3 class="text-3xl font-black text-white mb-4">${FEATURED.title}</h3>
              <p class="text-gray-400 text-sm leading-relaxed mb-8 max-w-2xl">${FEATURED.description}</p>

              <!-- Metrics -->
              <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8 p-5 rounded-xl bg-white/3 border border-white/5">
                ${FEATURED.metrics.map(({ value, label }) => `
                  <div class="text-center">
                    <p class="text-xl font-black mb-0.5" style="color:${FEATURED.accent}">${value}</p>
                    <p class="text-xs font-mono text-gray-600 uppercase tracking-widest">${label}</p>
                  </div>
                `).join('')}
              </div>

              <!-- Tags + link -->
              <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
                <div class="flex flex-wrap gap-2">
                  ${FEATURED.tags.map(tag => `
                    <span class="px-2.5 py-1 text-xs font-mono rounded-md
                                 bg-white/5 text-gray-400 border border-white/8">
                      ${tag}
                    </span>
                  `).join('')}
                </div>
                <a href="${FEATURED.href}" target="_blank" rel="noopener noreferrer"
                   class="inline-flex items-center gap-2 text-sm font-mono font-bold
                          shrink-0 transition-colors duration-200"
                   style="color:${FEATURED.accent}">
                  View Code
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                       stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                    <path d="M2 7h10M7 2l5 5-5 5"/>
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      <!-- ── Project Grid ───────────────────────────────────────────── -->
      <section class="px-6 sm:px-8 pb-24">
        <div class="max-w-5xl mx-auto">
          <p class="font-mono text-xs text-gray-600 uppercase tracking-widest mb-5">More Projects</p>

          <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            ${PROJECTS.map(({ title, accent, status, img, tags, description, href }) => `
              <div class="project-card group relative bg-[#111118] border border-white/8
                          rounded-2xl overflow-hidden flex flex-col cursor-pointer
                          transition-all duration-300 ease-out hover:-translate-y-1.5"
                   data-accent="${accent}">

                <!-- Image banner -->
                <div class="relative h-44 overflow-hidden shrink-0">
                  <img src="${img}"
                       alt="${title} screenshot — replace with your own"
                       class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                       loading="lazy" />
                  <div class="absolute inset-0 bg-gradient-to-t from-[#111118]/90 via-[#111118]/20 to-transparent"></div>
                  <span class="absolute top-3 right-3 px-2.5 py-0.5 text-[10px] font-mono font-bold
                               uppercase tracking-widest rounded-full border"
                        style="color:${accent}; border-color:${accent}55; background:${accent}18">
                    ${status}
                  </span>
                </div>

                <div class="p-6 flex flex-col gap-4 flex-1">
                  <h3 class="text-xl font-black text-white">${title}</h3>
                  <p class="text-gray-400 text-sm leading-relaxed flex-1">${description}</p>

                  <div class="flex flex-wrap gap-2">
                    ${tags.map(tag => `
                      <span class="px-2.5 py-1 text-[11px] font-mono rounded-md
                                   bg-white/5 text-gray-400 border border-white/8
                                   group-hover:border-white/15 transition-colors duration-200">
                        ${tag}
                      </span>
                    `).join('')}
                  </div>

                  <div class="pt-3 border-t border-white/5">
                    <a href="${href}" target="_blank" rel="noopener noreferrer"
                       class="inline-flex items-center gap-2 text-sm font-mono font-medium
                              transition-colors duration-200"
                       style="color:${accent}">
                      View Code
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                           stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                        <path d="M2 7h10M7 2l5 5-5 5"/>
                      </svg>
                    </a>
                  </div>
                </div>

              </div>
            `).join('')}
          </div>
        </div>
      </section>

    </div>
  `
}

export function init() {
  document.querySelectorAll('.project-card').forEach(card => {
    const accent = card.dataset.accent
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = accent + '55'
      card.style.boxShadow   = `0 0 35px ${accent}18`
    })
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = ''
      card.style.boxShadow   = ''
    })
  })
}
