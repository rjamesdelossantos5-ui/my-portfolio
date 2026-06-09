const STATS = [
  { value: '4+',  label: 'Years Experience' },
  { value: '20+', label: 'Projects Shipped'  },
  { value: '99%', label: 'Uptime Target'     },
  { value: '∞',   label: 'Problems Solved'   },
]

const FEATURED_WORK = [
  {
    title:   'StreamForge',
    accent:  '#00f5ff',
    stack:   'TypeScript · Apache Kafka · Redis',
    desc:    'Production event streaming platform processing 100k+ events/sec with automatic backpressure handling, schema validation, and a real-time consumer-lag dashboard.',
    img:     'https://picsum.photos/seed/streamforge/1200/600',
    href:    '#/projects',
  },
  {
    title:   'NeuralProxy',
    accent:  '#a855f7',
    stack:   'Python · FastAPI · Kubernetes',
    desc:    'Self-healing API gateway that uses ML to predict and reroute traffic during partial failures. Zero-downtime canary deployments with distributed tracing built in.',
    img:     'https://picsum.photos/seed/neuroproxy/1200/600',
    href:    '#/projects',
  },
]

const CAPABILITIES = [
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>`,
    title:   'Distributed Systems',
    accent:  '#00f5ff',
    desc:    'Event-driven architectures, message queues, consensus algorithms, and fault-tolerant service meshes built to survive production.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/></svg>`,
    title:   'Backend APIs',
    accent:  '#a855f7',
    desc:    'RESTful and GraphQL APIs, database schema design, query optimisation, and authentication systems engineered for scale.',
  },
  {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>`,
    title:   'Modern UIs',
    accent:  '#39ff14',
    desc:    'React and TypeScript interfaces with real-time data, 3D/WebGL elements, and accessibility-first component libraries.',
  },
]

export function render() {
  return `
    <div class="page-enter">

      <!-- ── Hero ─────────────────────────────────────────────────── -->
      <section class="relative min-h-[calc(100vh-4rem)] flex flex-col items-center
                      justify-center px-6 py-24 text-center overflow-hidden">

        <div class="flex items-center gap-4 mb-8">
          <div class="h-px w-10 bg-[#00f5ff] opacity-70"></div>
          <span class="font-mono text-[#00f5ff] text-xs uppercase tracking-[0.35em]">
            Full-Stack Software Engineer
          </span>
          <div class="h-px w-10 bg-[#00f5ff] opacity-70"></div>
        </div>

        <h1 class="text-5xl sm:text-7xl lg:text-[5.5rem] font-black tracking-tight
                   leading-[0.9] mb-8 max-w-5xl mx-auto">
          <span class="text-white">Building</span><br>
          <span class="bg-gradient-to-r from-[#00f5ff] to-[#a855f7]
                       bg-clip-text text-transparent">High-Stakes</span><br>
          <span class="text-white">Digital Systems.</span>
        </h1>

        <p class="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-12 leading-relaxed">
          I architect and ship production-grade systems — from distributed APIs to
          real-time data pipelines. Obsessed with performance, correctness, and the
          craft of engineering under pressure.
        </p>

        <div class="flex flex-col sm:flex-row items-center gap-4 mb-24">
          <a href="#/projects"
             class="group inline-flex items-center gap-2 px-8 py-4
                    bg-[#00f5ff] text-black font-bold text-sm uppercase tracking-widest
                    rounded-lg transition-all duration-300
                    hover:shadow-[0_0_35px_rgba(0,245,255,0.55)] hover:scale-105 active:scale-95">
            View Projects
            <span class="transition-transform duration-200 group-hover:translate-x-1">→</span>
          </a>
          <a href="#/contact"
             class="inline-flex items-center gap-2 px-8 py-4
                    border border-white/20 text-white font-medium text-sm uppercase tracking-widest
                    rounded-lg transition-all duration-300 hover:border-white/50 hover:bg-white/5">
            Get In Touch
          </a>
        </div>

        <div class="absolute bottom-8 left-1/2 -translate-x-1/2
                    flex flex-col items-center gap-2 text-gray-600 animate-bounce">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
               stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
            <line x1="8" y1="2" x2="8" y2="12"/>
            <polyline points="4,9 8,13 12,9"/>
          </svg>
        </div>

        <div class="absolute inset-0 overflow-hidden pointer-events-none">
          <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96
                      bg-[#00f5ff]/5 rounded-full blur-[120px]"></div>
          <div class="absolute top-1/3 left-1/4 w-72 h-72
                      bg-[#a855f7]/5 rounded-full blur-[100px]"></div>
        </div>
      </section>

      <!-- ── Stats Strip ────────────────────────────────────────────── -->
      <section class="border-t border-b border-white/5 py-12 px-6">
        <div class="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          ${STATS.map(({ value, label }) => `
            <div>
              <p class="text-3xl sm:text-4xl font-black text-[#00f5ff] mb-1.5">${value}</p>
              <p class="text-xs text-gray-500 uppercase tracking-widest font-mono">${label}</p>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- ── Selected Work ──────────────────────────────────────────── -->
      <section class="py-24 px-6">
        <div class="max-w-5xl mx-auto">
          <div class="flex items-end justify-between mb-12">
            <div>
              <span class="font-mono text-[#00f5ff] text-xs uppercase tracking-[0.35em]">Selected Work</span>
              <h2 class="text-3xl sm:text-4xl font-black text-white mt-3">Recent Projects</h2>
            </div>
            <a href="#/projects"
               class="hidden sm:inline-flex items-center gap-2 text-sm font-mono text-gray-500
                      hover:text-[#00f5ff] transition-colors duration-200">
              All projects →
            </a>
          </div>

          <div class="flex flex-col gap-8">
            ${FEATURED_WORK.map(({ title, accent, stack, desc, img, href }, i) => `
              <a href="${href}"
                 class="group relative bg-[#111118] border border-white/5 rounded-2xl overflow-hidden
                        flex flex-col ${i % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}
                        hover:border-white/15 transition-all duration-300
                        hover:shadow-[0_0_50px_rgba(0,0,0,0.5)]">

                <!-- Image -->
                <div class="relative lg:w-1/2 h-56 sm:h-72 lg:h-auto overflow-hidden shrink-0">
                  <img src="${img}"
                       alt="${title} preview"
                       class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                       loading="lazy" />
                  <div class="absolute inset-0 bg-gradient-to-r
                              ${i % 2 === 0 ? 'from-transparent to-[#111118]' : 'from-[#111118] to-transparent'}
                              opacity-60"></div>
                </div>

                <!-- Text -->
                <div class="flex flex-col justify-center p-8 lg:p-12 lg:w-1/2">
                  <span class="font-mono text-xs uppercase tracking-widest mb-3"
                        style="color:${accent}">${stack}</span>
                  <h3 class="text-2xl sm:text-3xl font-black text-white mb-4">${title}</h3>
                  <p class="text-gray-400 text-sm leading-relaxed mb-6">${desc}</p>
                  <span class="inline-flex items-center gap-2 text-sm font-mono font-medium
                               transition-colors duration-200 self-start"
                        style="color:${accent}">
                    View Project
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"
                         stroke="currentColor" stroke-width="1.5" stroke-linecap="round"
                         class="transition-transform duration-200 group-hover:translate-x-1">
                      <path d="M2 7h10M7 2l5 5-5 5"/>
                    </svg>
                  </span>
                </div>

              </a>
            `).join('')}
          </div>

          <div class="mt-6 sm:hidden text-center">
            <a href="#/projects" class="text-sm font-mono text-gray-500 hover:text-[#00f5ff] transition-colors">
              View all projects →
            </a>
          </div>
        </div>
      </section>

      <!-- ── Core Capabilities ──────────────────────────────────────── -->
      <section class="py-20 px-6 border-t border-white/5">
        <div class="max-w-5xl mx-auto">
          <div class="mb-12 text-center">
            <span class="font-mono text-[#00f5ff] text-xs uppercase tracking-[0.35em]">What I Build</span>
            <h2 class="text-3xl sm:text-4xl font-black text-white mt-3">Core Capabilities</h2>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            ${CAPABILITIES.map(({ icon, title, accent, desc }) => `
              <div class="bg-[#111118] border border-white/5 rounded-2xl p-7
                          hover:border-white/10 transition-colors duration-300 group">
                <div class="w-12 h-12 rounded-xl flex items-center justify-center mb-5
                            transition-all duration-300"
                     style="background:${accent}15; color:${accent}">
                  ${icon}
                </div>
                <h3 class="text-white font-bold text-lg mb-3">${title}</h3>
                <p class="text-gray-500 text-sm leading-relaxed">${desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ── Closing CTA ────────────────────────────────────────────── -->
      <section class="py-24 px-6 text-center border-t border-white/5">
        <p class="font-mono text-xs text-gray-600 uppercase tracking-[0.3em] mb-6">
          Currently open to new opportunities
        </p>
        <h2 class="text-3xl sm:text-4xl font-black text-white mb-6">
          Let's build something<br>
          <span class="bg-gradient-to-r from-[#00f5ff] to-[#a855f7] bg-clip-text text-transparent">
            that matters.
          </span>
        </h2>
        <a href="#/contact"
           class="inline-flex items-center gap-2 px-8 py-4
                  bg-[#00f5ff] text-black font-bold text-sm uppercase tracking-widest
                  rounded-lg transition-all duration-300
                  hover:shadow-[0_0_35px_rgba(0,245,255,0.55)] hover:scale-105 active:scale-95">
          Start a Conversation →
        </a>
      </section>

    </div>
  `
}

export function init() {}
