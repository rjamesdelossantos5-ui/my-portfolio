export function Footer() {
  return `
    <footer class="relative z-10 border-t border-white/5 py-8 px-8
                   flex flex-col sm:flex-row items-center justify-between gap-4
                   bg-[#0a0a0f]/60 backdrop-blur-sm">
      <p class="text-xs text-gray-600 font-mono tracking-widest uppercase">
        &copy; ${new Date().getFullYear()} RJ Santos — Built with Vite + Three.js
      </p>
      <div class="flex items-center gap-6">
        <a href="https://github.com" target="_blank" rel="noopener noreferrer"
           class="text-xs text-gray-500 hover:text-[#00f5ff] transition-colors duration-200 font-mono">
          GitHub
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
           class="text-xs text-gray-500 hover:text-[#a855f7] transition-colors duration-200 font-mono">
          LinkedIn
        </a>
      </div>
    </footer>
  `;
}
