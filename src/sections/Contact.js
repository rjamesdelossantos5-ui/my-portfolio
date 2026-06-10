import { supabase } from '../lib/supabase.js'

export function render() {
  return `
<section class="section" id="s-contact"
  style="background:linear-gradient(135deg,#080C18 0%,#0C0A1A 100%);">

  <span class="section-label">05 — Contact</span>

  <div style="height:100%;display:flex;align-items:center;padding:0 5rem;padding-top:4rem;">
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:5rem;
      width:100%;max-width:1100px;margin:0 auto;">

      <!-- Left: text + social -->
      <div style="display:flex;flex-direction:column;justify-content:center;">
        <h2 class="display-lg" style="color:#fff;margin-bottom:1.5rem;">
          Let's Build<br>
          <span class="grad-coral-cyan">Something Great.</span>
        </h2>

        <p style="font-family:'Inter',sans-serif;font-size:0.95rem;font-weight:300;
          color:rgba(255,255,255,0.42);line-height:1.8;margin-bottom:2rem;">
          Open to full-time roles, freelance contracts, and interesting
          collaborations. Drop a message — I'll get back within 24 hours.
        </p>

        <!-- Availability -->
        <div style="display:flex;align-items:center;gap:0.75rem;margin-bottom:2.5rem;">
          <span style="position:relative;display:flex;width:10px;height:10px;">
            <span class="ping" style="position:absolute;display:inline-flex;
              width:100%;height:100%;border-radius:50%;background:#A8FF3E;opacity:0.6;"></span>
            <span style="position:relative;display:inline-flex;width:10px;height:10px;
              border-radius:50%;background:#A8FF3E;"></span>
          </span>
          <span style="font-family:'Inter',sans-serif;font-size:0.78rem;font-weight:500;
            color:#A8FF3E;">Currently available for new work</span>
        </div>

        <!-- Social links -->
        <div style="display:flex;gap:1.25rem;">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer"
             style="display:inline-flex;align-items:center;gap:0.5rem;
               font-family:'Inter',sans-serif;font-size:0.78rem;font-weight:500;
               color:rgba(255,255,255,0.35);text-decoration:none;
               transition:color 0.2s;" class="social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58
              0-.29-.01-1.05-.01-2.06-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76
              -1.09-.74.08-.73.08-.73 1.21.09 1.85 1.24 1.85 1.24 1.07 1.83 2.81 1.3 3.49 1
              .11-.78.42-1.3.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22
              -.14-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4
              c1.02.005 2.04.14 3 .4 2.28-1.55 3.29-1.23 3.29-1.23.66 1.66.25 2.88.12 3.18
              .77.84 1.24 1.91 1.24 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22
              0 1.6-.01 2.89-.01 3.28 0 .32.22.7.83.58C20.57 21.8 24 17.3 24 12
              24 5.37 18.63 0 12 0z"/>
            </svg>
            GitHub
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
             style="display:inline-flex;align-items:center;gap:0.5rem;
               font-family:'Inter',sans-serif;font-size:0.78rem;font-weight:500;
               color:rgba(255,255,255,0.35);text-decoration:none;
               transition:color 0.2s;" class="social-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13
              2.94v5.67H9.37V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.26 2.37 4.26
              5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12z
              M7.12 20.45H3.56V9h3.56v11.45zM22.23 0H1.77C.79 0 0 .77 0 1.72v20.56
              C0 23.23.79 24 1.77 24h20.46C23.2 24 24 23.23 24 22.28V1.72C24 .77 23.2 0 22.23 0z"/>
            </svg>
            LinkedIn
          </a>
        </div>
      </div>

      <!-- Right: form -->
      <div style="display:flex;flex-direction:column;justify-content:center;">
        <form id="contact-form" novalidate class="glass-strong"
          style="padding:2rem 2.25rem;">

          <div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;margin-bottom:1rem;">
            <div class="field-group">
              <label for="cf-name" class="label-sm"
                style="color:rgba(255,255,255,0.28);display:block;margin-bottom:0.5rem;">
                Name
              </label>
              <input type="text" id="cf-name" name="name"
                     placeholder="Your name" autocomplete="name" class="cf-input"
                     maxlength="100" />
              <p class="field-error" style="display:none;color:#FF4757;
                font-family:'Inter',sans-serif;font-size:0.65rem;margin-top:0.35rem;"></p>
            </div>
            <div class="field-group">
              <label for="cf-email" class="label-sm"
                style="color:rgba(255,255,255,0.28);display:block;margin-bottom:0.5rem;">
                Email
              </label>
              <input type="email" id="cf-email" name="email"
                     placeholder="you@domain.com" autocomplete="email" class="cf-input"
                     maxlength="254" />
              <p class="field-error" style="display:none;color:#FF4757;
                font-family:'Inter',sans-serif;font-size:0.65rem;margin-top:0.35rem;"></p>
            </div>
          </div>

          <div class="field-group" style="margin-bottom:1.25rem;">
            <label for="cf-message" class="label-sm"
              style="color:rgba(255,255,255,0.28);display:block;margin-bottom:0.5rem;">
              Message
            </label>
            <textarea id="cf-message" name="message" rows="5"
                      placeholder="Tell me about your project, role, or idea…"
                      class="cf-input" style="resize:none;" maxlength="2000"></textarea>
            <p class="field-error" style="display:none;color:#FF4757;
              font-family:'Inter',sans-serif;font-size:0.65rem;margin-top:0.35rem;"></p>
          </div>

          <!-- Honeypot: invisible to real users; bots fill it automatically -->
          <input type="text" id="cf-website" name="website" tabindex="-1"
                 autocomplete="off" aria-hidden="true"
                 style="position:absolute;left:-9999px;width:1px;height:1px;
                        opacity:0;pointer-events:none;" />

          <button type="submit" id="cf-submit" class="btn-primary"
                  style="width:100%;justify-content:center;">
            Send Message →
          </button>

        </form>
      </div>

    </div>
  </div>

  <!-- Footer -->
  <div style="position:absolute;bottom:1.5rem;left:0;right:0;text-align:center;">
    <p style="font-family:'Inter',sans-serif;font-size:0.65rem;
      color:rgba(255,255,255,0.12);letter-spacing:0.1em;">
      © ${new Date().getFullYear()} RJ Santos — Crafted with care
    </p>
  </div>

  <!-- Ambient blob -->
  <div class="blob" style="width:500px;height:500px;
    background:radial-gradient(circle,rgba(255,71,87,0.12) 0%,transparent 65%);
    top:-20%;right:-10%;"></div>

</section>`
}

export function init() {
  const form     = document.getElementById('contact-form')
  const nameEl   = document.getElementById('cf-name')
  const emailEl  = document.getElementById('cf-email')
  const msgEl    = document.getElementById('cf-message')
  const submitEl = document.getElementById('cf-submit')

  if (!form) return

  document.querySelectorAll('.social-link').forEach(a => {
    a.addEventListener('mouseenter', () => { a.style.color = '#fff' })
    a.addEventListener('mouseleave', () => { a.style.color = 'rgba(255,255,255,0.35)' })
  })

  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

  const honeyEl  = document.getElementById('cf-website')
  let   lastSubmit = 0
  const COOLDOWN   = 30_000

  function errEl(input) {
    return input.closest('.field-group').querySelector('.field-error')
  }

  function setError(input, msg) {
    const el = errEl(input)
    el.textContent = msg
    el.style.display = 'block'
    input.style.borderColor = 'rgba(255,71,87,0.5)'
  }

  function clearError(input) {
    const el = errEl(input)
    el.textContent = ''
    el.style.display = 'none'
    input.style.borderColor = ''
  }

  const vName = () => {
    const v = nameEl.value.trim()
    if (!v)          { setError(nameEl, 'Name is required.');  return false }
    if (v.length > 100) { setError(nameEl, 'Name is too long (max 100 chars).'); return false }
    clearError(nameEl); return true
  }
  const vEmail = () => {
    const v = emailEl.value.trim()
    if (!v)              { setError(emailEl, 'Email is required.');    return false }
    if (!EMAIL_RE.test(v)) { setError(emailEl, 'Enter a valid email.'); return false }
    if (v.length > 254)  { setError(emailEl, 'Email is too long.');   return false }
    clearError(emailEl); return true
  }
  const vMsg = () => {
    const v = msgEl.value.trim()
    if (!v)           { setError(msgEl, 'Message is required.');                    return false }
    if (v.length < 10){ setError(msgEl, 'At least 10 characters.');                 return false }
    if (v.length > 2000){ setError(msgEl, `Too long — ${v.length}/2000 chars.`);   return false }
    clearError(msgEl); return true
  }

  nameEl.addEventListener('blur',  vName)
  emailEl.addEventListener('blur', vEmail)
  msgEl.addEventListener('blur',   vMsg)
  nameEl.addEventListener('input',  () => { if (errEl(nameEl).style.display  !== 'none') vName()  })
  emailEl.addEventListener('input', () => { if (errEl(emailEl).style.display !== 'none') vEmail() })
  msgEl.addEventListener('input',   () => { if (errEl(msgEl).style.display   !== 'none') vMsg()   })

  form.addEventListener('submit', async e => {
    e.preventDefault()
    if (![vName(), vEmail(), vMsg()].every(Boolean)) return

    // Honeypot: bots fill hidden fields, humans don't
    if (honeyEl && honeyEl.value) {
      submitEl.textContent = 'Message Sent ✓'
      submitEl.style.background = 'linear-gradient(135deg,#A8FF3E,#39FF14)'
      submitEl.style.color = '#000'
      form.reset()
      setTimeout(() => {
        submitEl.textContent = 'Send Message →'
        submitEl.disabled    = false
        submitEl.style.background = ''
        submitEl.style.color      = ''
      }, 3500)
      return
    }

    // Rate limit: one real submission per 30 seconds
    if (Date.now() - lastSubmit < COOLDOWN) {
      setError(msgEl, 'Please wait 30 seconds before sending again.')
      return
    }

    submitEl.textContent = 'Sending…'
    submitEl.disabled    = true

    if (!supabase) {
      setError(msgEl, 'Contact form is not configured yet.')
      submitEl.textContent = 'Send Message →'
      submitEl.disabled = false
      return
    }

    const { error } = await supabase.from('messages').insert({
      name:    nameEl.value.trim(),
      email:   emailEl.value.trim(),
      message: msgEl.value.trim(),
    })

    if (error) {
      submitEl.textContent = 'Send Message →'
      submitEl.disabled    = false
      setError(msgEl, 'Failed to send — please try again.')
      return
    }

    lastSubmit = Date.now()
    submitEl.textContent = 'Message Sent ✓'
    submitEl.style.background = 'linear-gradient(135deg,#A8FF3E,#39FF14)'
    submitEl.style.color = '#000'
    form.reset()

    setTimeout(() => {
      submitEl.textContent = 'Send Message →'
      submitEl.disabled = false
      submitEl.style.background = ''
      submitEl.style.color = ''
    }, 3500)
  })
}
