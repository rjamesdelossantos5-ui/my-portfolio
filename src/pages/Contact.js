import { supabase } from '../lib/supabase.js'

const PROCESS_STEPS = [
  {
    step:   '01',
    title:  'You Reach Out',
    accent: '#00f5ff',
    desc:   'Drop a message with context about your project, role, or idea. The more detail, the better.',
  },
  {
    step:   '02',
    title:  'We Talk Scope',
    accent: '#a855f7',
    desc:   'A quick call or async thread to align on goals, timeline, and constraints.',
  },
  {
    step:   '03',
    title:  'I Build It',
    accent: '#39ff14',
    desc:   'I execute with clear communication, regular check-ins, and zero surprises.',
  },
]

const GALLERY = [
  { img: 'https://picsum.photos/seed/work1/600/400', caption: 'Replace with your own work screenshot' },
  { img: 'https://picsum.photos/seed/work2/600/400', caption: 'Replace with your own work screenshot' },
  { img: 'https://picsum.photos/seed/work3/600/400', caption: 'Replace with your own work screenshot' },
]

export function render() {
  return `
    <div class="page-enter">

   
      <section class="max-w-5xl mx-auto px-6 sm:px-8 pt-20 pb-12">
        <span class="font-mono text-[#00f5ff] text-xs uppercase tracking-[0.35em]">
          003 — Contact
        </span>
        <h2 class="text-4xl sm:text-5xl font-black text-white mt-4 mb-6 leading-tight">
          Let's Build<br>Something Together.
        </h2>
        <p class="text-gray-400 text-lg max-w-xl leading-relaxed">
          Open to full-time roles, freelance contracts, and interesting
          collaborations. Drop a message and I'll get back within 24 hours.
        </p>
      </section>

      <!-- ── Form + Sidebar ─────────────────────────────────────────── -->
      <section class="max-w-5xl mx-auto px-6 sm:px-8 pb-20">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-10">

          <!-- Form -->
          <div class="lg:col-span-3">
            <form id="contact-form" novalidate class="space-y-5">

              <div class="field-group">
                <label for="cf-name"
                       class="block font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                  Name
                </label>
                <input type="text" id="cf-name" name="name"
                       placeholder="Your name" autocomplete="name"
                       class="w-full bg-[#111118] border border-white/10 rounded-lg px-4 py-3
                              text-white text-sm placeholder-gray-700 outline-none
                              focus:border-[#00f5ff] focus:shadow-[0_0_0_1px_rgba(0,245,255,0.25)]
                              transition-all duration-200" />
                <p class="field-error hidden text-red-400 text-xs font-mono mt-1.5"></p>
              </div>

              <div class="field-group">
                <label for="cf-email"
                       class="block font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                  Email
                </label>
                <input type="email" id="cf-email" name="email"
                       placeholder="you@domain.com" autocomplete="email"
                       class="w-full bg-[#111118] border border-white/10 rounded-lg px-4 py-3
                              text-white text-sm placeholder-gray-700 outline-none
                              focus:border-[#00f5ff] focus:shadow-[0_0_0_1px_rgba(0,245,255,0.25)]
                              transition-all duration-200" />
                <p class="field-error hidden text-red-400 text-xs font-mono mt-1.5"></p>
              </div>

              <div class="field-group">
                <label for="cf-message"
                       class="block font-mono text-xs text-gray-500 uppercase tracking-widest mb-2">
                  Message
                </label>
                <textarea id="cf-message" name="message" rows="6"
                          placeholder="Tell me about your project, role, or idea…"
                          class="w-full bg-[#111118] border border-white/10 rounded-lg px-4 py-3
                                 text-white text-sm placeholder-gray-700 outline-none resize-none
                                 focus:border-[#00f5ff] focus:shadow-[0_0_0_1px_rgba(0,245,255,0.25)]
                                 transition-all duration-200"></textarea>
                <p class="field-error hidden text-red-400 text-xs font-mono mt-1.5"></p>
              </div>

              <button type="submit" id="cf-submit"
                      class="w-full py-4 bg-[#00f5ff] text-black font-bold text-sm
                             uppercase tracking-widest rounded-lg
                             hover:shadow-[0_0_35px_rgba(0,245,255,0.5)] hover:scale-[1.02]
                             active:scale-[0.98] transition-all duration-200
                             disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100">
                Send Message
              </button>

            </form>
          </div>

          <!-- Sidebar -->
          <div class="lg:col-span-2 flex flex-col gap-6">

            <!-- Social links -->
            <div class="bg-[#111118] border border-white/5 rounded-2xl p-6">
              <h4 class="font-mono text-xs text-gray-500 uppercase tracking-[0.35em] mb-5">Find me on</h4>
              <div class="flex flex-col gap-3">
                <a href="https://github.com" target="_blank" rel="noopener noreferrer"
                   class="group flex items-center gap-3 text-sm text-gray-400
                          hover:text-[#00f5ff] transition-colors duration-200">
                  <span class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                               group-hover:bg-[#00f5ff]/10 transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.29-.01-1.05-.01-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18.77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22 0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12 0-6.63-5.37-12-12-12z"/>
                    </svg>
                  </span>
                  github.com/rjsantos
                </a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                   class="group flex items-center gap-3 text-sm text-gray-400
                          hover:text-[#a855f7] transition-colors duration-200">
                  <span class="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center
                               group-hover:bg-[#a855f7]/10 transition-colors duration-200">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0z"/>
                    </svg>
                  </span>
                  linkedin.com/in/rjsantos
                </a>
              </div>
            </div>

            <!-- Availability -->
            <div class="bg-[#111118] border border-white/5 rounded-2xl p-6">
              <div class="flex items-center gap-2.5 mb-3">
                <span class="relative flex h-2.5 w-2.5">
                  <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#39ff14] opacity-60"></span>
                  <span class="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#39ff14]"></span>
                </span>
                <span class="font-mono text-xs text-[#39ff14] uppercase tracking-widest">Available</span>
              </div>
              <p class="text-gray-400 text-sm leading-relaxed">
                Currently open to full-time roles and select contract work.
                Response time is typically under 24 hours.
              </p>
            </div>

          </div>
        </div>
      </section>

      <!-- ── How It Works ───────────────────────────────────────────── -->
      <section class="border-t border-white/5 py-20 px-6">
        <div class="max-w-5xl mx-auto">
          <div class="mb-12 text-center">
            <span class="font-mono text-[#00f5ff] text-xs uppercase tracking-[0.35em]">The Process</span>
            <h3 class="text-3xl font-black text-white mt-3">Simple. Transparent. Reliable.</h3>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-6">
            ${PROCESS_STEPS.map(({ step, title, accent, desc }) => `
              <div class="relative bg-[#111118] border border-white/5 rounded-2xl p-7
                          hover:border-white/10 transition-colors duration-300">
                <p class="font-mono text-5xl font-black mb-5 leading-none"
                   style="color:${accent}22">${step}</p>
                <h4 class="text-white font-bold text-lg mb-3">${title}</h4>
                <p class="text-gray-500 text-sm leading-relaxed">${desc}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- ── Work Gallery ───────────────────────────────────────────── -->
      <section class="border-t border-white/5 py-20 px-6">
        <div class="max-w-5xl mx-auto">
          <div class="flex items-end justify-between mb-8">
            <div>
              <span class="font-mono text-[#00f5ff] text-xs uppercase tracking-[0.35em]">Gallery</span>
              <h3 class="text-2xl font-black text-white mt-2">Recent Work</h3>
            </div>
            <span class="text-xs font-mono text-gray-600">
              Replace these with your own screenshots
            </span>
          </div>
          <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            ${GALLERY.map(({ img, caption }) => `
              <div class="group relative rounded-xl overflow-hidden aspect-video
                          ring-1 ring-white/5 hover:ring-white/15 transition-all duration-300">
                <img src="${img}"
                     alt="${caption}"
                     class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                     loading="lazy" />
                <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100
                            transition-opacity duration-300 flex items-end p-4">
                  <p class="text-xs font-mono text-gray-300">${caption}</p>
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
  const form    = document.getElementById('contact-form')
  const nameEl  = document.getElementById('cf-name')
  const emailEl = document.getElementById('cf-email')
  const msgEl   = document.getElementById('cf-message')
  const submitEl = document.getElementById('cf-submit')

  if (!form) return

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  function getErrorEl(input) { return input.closest('.field-group').querySelector('.field-error') }

  function setError(input, msg) {
    const err = getErrorEl(input)
    err.textContent = msg
    err.classList.remove('hidden')
    input.classList.add('!border-red-500')
    input.classList.remove('border-white/10')
  }

  function clearError(input) {
    const err = getErrorEl(input)
    err.textContent = ''
    err.classList.add('hidden')
    input.classList.remove('!border-red-500')
    input.classList.add('border-white/10')
  }

  const validateName  = () => { if (!nameEl.value.trim())           { setError(nameEl,  'Name is required.');             return false } clearError(nameEl);  return true }
  const validateEmail = () => { if (!emailEl.value.trim())          { setError(emailEl, 'Email is required.');            return false }
                                if (!EMAIL_RE.test(emailEl.value))  { setError(emailEl, 'Enter a valid email address.');  return false } clearError(emailEl); return true }
  const validateMsg   = () => { if (!msgEl.value.trim())            { setError(msgEl,   'Message is required.');          return false }
                                if (msgEl.value.trim().length < 10) { setError(msgEl,   'At least 10 characters please.'); return false } clearError(msgEl);  return true }

  nameEl.addEventListener('blur',  validateName)
  emailEl.addEventListener('blur', validateEmail)
  msgEl.addEventListener('blur',   validateMsg)

  nameEl.addEventListener('input',  () => { if (!getErrorEl(nameEl).classList.contains('hidden'))  validateName()  })
  emailEl.addEventListener('input', () => { if (!getErrorEl(emailEl).classList.contains('hidden')) validateEmail() })
  msgEl.addEventListener('input',   () => { if (!getErrorEl(msgEl).classList.contains('hidden'))   validateMsg()   })

  form.addEventListener('submit', async e => {
    e.preventDefault()
    if (![validateName(), validateEmail(), validateMsg()].every(Boolean)) return

    submitEl.textContent = 'Sending…'
    submitEl.disabled = true

    const { error } = await supabase.from('messages').insert({
      name:    nameEl.value.trim(),
      email:   emailEl.value.trim(),
      message: msgEl.value.trim(),
    })

    if (error) {
      submitEl.textContent = 'Send Message'
      submitEl.disabled = false
      const errEl = msgEl.closest('.field-group').querySelector('.field-error')
      errEl.textContent = 'Failed to send — please try again.'
      errEl.classList.remove('hidden')
      return
    }

    submitEl.textContent = 'Message Sent ✓'
    submitEl.classList.replace('bg-[#00f5ff]', 'bg-[#39ff14]')
    form.reset()

    setTimeout(() => {
      submitEl.textContent = 'Send Message'
      submitEl.disabled = false
      submitEl.classList.replace('bg-[#39ff14]', 'bg-[#00f5ff]')
    }, 3500)
  })
}
