// site.js
(function () {
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
      </nav>
    </div>
  </header>
  `;

  // Insert header at top of body
  document.body.insertAdjacentHTML("afterbegin", headerHTML);

  // Active tab
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  const map = {
    "index.html": "index",
    "research.html": "research",
    "publications.html": "publications",
    "team.html": "team",
    "software.html": "software",
    "news.html": "news"
  };

  const key = map[path];
  if (key) {
    const el = document.querySelector(`[data-nav="${key}"]`);
    if (el) el.classList.add("active");
  }
})();
