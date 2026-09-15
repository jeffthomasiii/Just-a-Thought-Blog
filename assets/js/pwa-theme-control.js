(function () {
  document.addEventListener('DOMContentLoaded', function () {
    const toggle = document.getElementById('pwa-theme-toggle');
    const icon = document.getElementById('pwa-theme-icon');
    const label = document.getElementById('pwa-theme-label');
    if (!toggle) return;

    function sync() {
      const isDark = document.body.classList.contains('dark-mode');
      toggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
      toggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
      if (icon) icon.textContent = isDark ? '☼' : '☾';
      if (label) label.textContent = isDark ? 'Light' : 'Dark';
    }

    sync();
    toggle.addEventListener('click', function () {
      const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
      try { localStorage.setItem('theme', newTheme); } catch (error) {}
      document.body.classList.toggle('dark-mode', newTheme === 'dark');
      document.documentElement.classList.remove('dark-mode-pending');

      const desktopToggle = document.getElementById('theme-toggle');
      const desktopIcon = document.getElementById('theme-icon');
      if (desktopIcon) desktopIcon.textContent = newTheme === 'dark' ? '☼' : '☾';
      if (desktopToggle) {
        desktopToggle.setAttribute('aria-label', newTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
        desktopToggle.setAttribute('aria-pressed', newTheme === 'dark' ? 'true' : 'false');
      }
      sync();
    });
  });
})();