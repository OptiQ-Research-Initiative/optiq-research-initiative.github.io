// site.js
// - Injects a shared header (bubble nav + theme toggle) onto every page
// - Highlights the active page in the nav
// - Dark/Light theme switch with localStorage persistence
// - Defaults to OS preference if user has not selected a theme

(function () {
  const THEME_KEY = "optiq-theme";

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved === "dark" || saved === "light") return saved;

    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;

    return prefersDark ? "dark" : "light";
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem(THEME_KEY, theme);

    const btn = document.getElementById("themeToggle");
    if (btn) {
      const isDark = theme === "dark";
      btn.setAttribute("aria-pressed", String(isDark));
      btn.setAttribute("title", isDark ? "Switch to light mode" : "Switch to dark mode");

      const icon = btn.querySelector("[data-icon]");
      const label = btn.querySelector("[data-label]");
      if (icon) icon.textContent = isDark ? "🌙" : "☀️";
      if (label) label.textContent = isDark ? "Dark" : "Light";
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute("data-theme") || "dark";
    applyTheme(current === "dark" ? "light" : "dark");
  }

  // Apply theme as early as possible
  applyTheme(getPreferredTheme());

  // Shared header HTML (injected)
  const headerHTML = `
    <header class="site-header">
      <div class="container header-inner">
        <a class="brand" href="/index.html" aria-label="OptiQ Home">
          <div class="brand-mark" aria-hidden="true"></div>
          <div class="brand-title">
            <strong>OptiQ Research Initiative</strong>
            <span>Quantum optimization for noisy, near-term systems</span>
          </div>
        </a>

        <nav class="nav" aria-label="Primary">
          <a href="/index.html" data-nav="index">Home</a>
          <a href="/research.html" data-nav="research">Research</a>
          <a href="/publications.html" data-nav="publications">Publications</a>
          <a href="/team.html" data-nav="team">Team</a>
          <a href="/software.html" data-nav="software">Software</a>
          <a href="/news.html" data-nav="news">News</a>

          <button id="themeToggle" class="theme-toggle" type="button" aria-pressed="false">
            <span data-icon aria-hidden="true">🌙</span>
            <span data-label>Dark</span>
          </button>
        </nav>
      </div>
    </header>
  `;

  // Insert header at top of body
  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // Wire up toggle after header is injected
  const toggleBtn = document.getElementById("themeToggle");
  if (toggleBtn) toggleBtn.addEventListener("click", toggleTheme);

  // Ensure button label matches currently-applied theme
  applyTheme(document.documentElement.getAttribute("data-theme") || getPreferredTheme());

  // Active nav highlighting
  const filename = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const map = {
    "index.html": "index",
    "research.html": "research",
    "publications.html": "publications",
    "team.html": "team",
    "software.html": "software",
    "news.html": "news",
  };

  const key = map[filename];
  if (key) {
    const activeLink = document.querySelector(`.nav a[data-nav="${key}"]`);
    if (activeLink) activeLink.classList.add("active");
  }

  // Optional: if the user changes OS theme and they haven't explicitly chosen one,
  // update theme automatically (does not override explicit localStorage choice).
  const mq = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)");
  if (mq && mq.addEventListener) {
    mq.addEventListener("change", () => {
      const saved = localStorage.getItem(THEME_KEY);
      if (saved !== "dark" && saved !== "light") {
        applyTheme(getPreferredTheme());
      }
    });
  }
})();
