/* =====================================================
   PORTFOLIO SCRIPT — GitHub API Integration
   ===================================================== */

(function () {
  "use strict";

  // ── Config ──────────────────────────────────────────
  const USERNAME = window.GITHUB_USERNAME || "username";
  const API = `https://api.github.com/users/${USERNAME}`;
  const REPOS_API = `https://api.github.com/users/${USERNAME}/repos?sort=updated&per_page=30`;

  // Language colors (extended)
  const LANG_COLORS = {
    JavaScript: "#f7df1e", TypeScript: "#3178c6", Python: "#3572A5",
    "C++": "#f34b7d", C: "#555555", Rust: "#dea584", Go: "#00ADD8",
    Java: "#b07219", Kotlin: "#A97BFF", Swift: "#FA7343",
    HTML: "#e34c26", CSS: "#563d7c", SCSS: "#c6538c",
    Vue: "#41b883", Svelte: "#ff3e00", Ruby: "#701516",
    PHP: "#4F5D95", Shell: "#89e051", Dart: "#00B4AB",
    Default: "#7c6fff",
  };

  function getLangColor(lang) {
    return LANG_COLORS[lang] || LANG_COLORS.Default;
  }

  // ── DOM helpers ──────────────────────────────────────
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  function set(selector, value, attr = null) {
    const el = $(selector);
    if (!el) return;
    if (attr) el.setAttribute(attr, value);
    else el.textContent = value;
  }

  function setHTML(selector, html) {
    const el = $(selector);
    if (el) el.innerHTML = html;
  }

  function setAttr(selector, attr, value) {
    const el = $(selector);
    if (el) el.setAttribute(attr, value);
  }

  // ── Fetch GitHub User ────────────────────────────────
  async function fetchUser() {
    try {
      const res = await fetch(API, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (!res.ok) throw new Error("GitHub API error");
      const user = await res.json();
      populateUser(user);
    } catch (err) {
      console.warn("Could not load GitHub profile:", err.message);
    }
  }

  function populateUser(user) {
    const name = user.name || user.login;
    const bio = user.bio || "";
    const location = user.location || "";
    const company = user.company || "";
    const blog = user.blog || "";

    // Hero left
    setHTML(".hero-name", formatName(name));
    set(".hero-bio", bio || "Software engineer. Building things.");

    // Hero stats
    set(".stat-repos .stat-value", user.public_repos ?? "—");
    set(".stat-followers .stat-value", formatNum(user.followers) ?? "—");
    set(".stat-following .stat-value", user.following ?? "—");

    // Hero card
    const avatar = $(".avatar-wrap img");
    if (avatar) {
      avatar.src = user.avatar_url;
      avatar.alt = name;
    }
    set(".hero-card-name", name);
    set(".hero-card-handle", `@${user.login}`);

    if (location) set(".hero-card-location", `📍 ${location}`);

    // Mailto
    const emailLink = $(".contact-email-link");
    if (emailLink && user.email) {
      emailLink.href = `mailto:${user.email}`;
      emailLink.querySelector(".email-text").textContent = user.email;
    }

    // Panel rows (About section)
    set(".panel-val-username", `@${user.login}`);
    set(".panel-val-company", company || "—");
    set(".panel-val-location", location || "—");
    set(".panel-val-website", blog || "—");
    set(".panel-val-repos", user.public_repos ?? "—");
    set(".panel-val-gists", user.public_gists ?? "—");

    // Footer
    set(".footer-name", name);

    // Stats section
    set(".stat-val-repos", user.public_repos ?? "—");
    set(".stat-val-followers", formatNum(user.followers));
    set(".stat-val-following", user.following ?? "—");
  }

  function formatName(name) {
    const parts = name.split(" ");
    if (parts.length === 1) return name;
    const last = parts.pop();
    return `${parts.join(" ")} <span class="hl">${last}</span>`;
  }

  function formatNum(n) {
    if (!n) return "0";
    if (n >= 1000) return (n / 1000).toFixed(1) + "k";
    return String(n);
  }

  // ── Fetch Repos ──────────────────────────────────────
  async function fetchRepos() {
    const grid = $(".projects-grid");
    if (!grid) return;

    try {
      const res = await fetch(REPOS_API, {
        headers: { Accept: "application/vnd.github.v3+json" },
      });
      if (!res.ok) throw new Error("Repos API error");
      const repos = await res.json();
      renderRepos(repos, grid);
      buildLangChart(repos);
      set(".stat-val-stars", countTotalStars(repos));
    } catch (err) {
      console.warn("Could not load repos:", err.message);
      grid.innerHTML = `<p class="error-msg">Couldn't load repositories.</p>`;
    }
  }

  const REPO_ICONS = {
    JavaScript: "⚡", TypeScript: "🔷", Python: "🐍", "C++": "⚙️",
    Rust: "🦀", Go: "🔵", Java: "☕", HTML: "🌐", CSS: "🎨",
    Default: "📦",
  };

  function renderRepos(repos, grid) {
    // Filter out forks, sort by stars + updated
    const filtered = repos
      .filter((r) => !r.fork && !r.private)
      .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
      .slice(0, 9);

    grid.innerHTML = filtered
      .map((r) => {
        const lang = r.language || "Unknown";
        const color = getLangColor(lang);
        const icon = REPO_ICONS[lang] || REPO_ICONS.Default;
        const desc = r.description
          ? r.description.length > 80
            ? r.description.slice(0, 80) + "…"
            : r.description
          : "No description provided.";

        return `
        <article class="project-card reveal" tabindex="0" aria-label="${r.name}">
          <div class="project-card-top">
            <div class="project-icon">${icon}</div>
            <div class="project-links">
              <a href="${r.html_url}" target="_blank" rel="noopener" class="project-link" aria-label="View source">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"/></svg>
                source
              </a>
              ${r.homepage ? `<a href="${r.homepage}" target="_blank" rel="noopener" class="project-link" aria-label="Live demo">↗ demo</a>` : ""}
            </div>
          </div>

          <h3 class="project-name">${r.name}</h3>
          <p class="project-desc">${desc}</p>

          <div class="project-footer">
            <span class="project-lang">
              <span class="lang-dot" style="background:${color}"></span>
              ${lang}
            </span>
            <div class="project-meta">
              <span class="project-stat" title="Stars">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" opacity=".5"><path d="M8 .25a.75.75 0 01.673.418l1.882 3.815 4.21.612a.75.75 0 01.416 1.279l-3.046 2.97.719 4.192a.75.75 0 01-1.088.791L8 12.347l-3.766 1.98a.75.75 0 01-1.088-.79l.72-4.194L.818 6.374a.75.75 0 01.416-1.28l4.21-.611L7.327.668A.75.75 0 018 .25z"/></svg>
                ${r.stargazers_count}
              </span>
              <span class="project-stat" title="Forks">
                <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" opacity=".5"><path d="M5 3.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm0 2.122a2.25 2.25 0 10-1.5 0v.878A2.25 2.25 0 005.75 8.5h1.5v2.128a2.251 2.251 0 101.5 0V8.5h1.5a2.25 2.25 0 002.25-2.25v-.878a2.25 2.25 0 10-1.5 0v.878a.75.75 0 01-.75.75h-4.5A.75.75 0 015 6.25v-.878zm3.75 7.378a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm3-8.75a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"/></svg>
                ${r.forks_count}
              </span>
            </div>
          </div>
        </article>`;
      })
      .join("");

    // Trigger reveal on newly added cards
    observeReveal();
  }

  function countTotalStars(repos) {
    return repos.reduce((acc, r) => acc + (r.stargazers_count || 0), 0);
  }

  // ── Language Chart ───────────────────────────────────
  function buildLangChart(repos) {
    const langMap = {};
    repos.forEach((r) => {
      if (r.language) {
        langMap[r.language] = (langMap[r.language] || 0) + 1;
      }
    });

    const total = Object.values(langMap).reduce((a, b) => a + b, 0);
    if (!total) return;

    const sorted = Object.entries(langMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    const bar = $(".lang-bar");
    const list = $(".lang-list");

    if (bar) {
      bar.innerHTML = sorted
        .map(([lang, count]) => {
          const pct = ((count / total) * 100).toFixed(1);
          return `<div class="lang-bar-seg" style="width:${pct}%;background:${getLangColor(lang)}" title="${lang}: ${pct}%"></div>`;
        })
        .join("");
    }

    if (list) {
      list.innerHTML = sorted
        .map(([lang, count]) => {
          const pct = ((count / total) * 100).toFixed(1);
          return `
          <div class="lang-item">
            <span class="lang-color" style="background:${getLangColor(lang)}"></span>
            ${lang}
            <span style="color:var(--text-3);font-size:10px">${pct}%</span>
          </div>`;
        })
        .join("");
    }
  }

  // ── Contribution Grid ─────────────────────────────────
  function buildContributionGrid() {
    const grid = $(".contribution-grid");
    if (!grid) return;
    const cells = 52 * 5; // ~1 year of weeks × 5 days
    const html = Array.from({ length: cells }, () => {
      const r = Math.random();
      const level = r > 0.85 ? 4 : r > 0.7 ? 3 : r > 0.5 ? 2 : r > 0.35 ? 1 : 0;
      return `<div class="contribution-cell" data-level="${level}"></div>`;
    }).join("");
    grid.innerHTML = html;
  }

  // ── Scroll Reveal ─────────────────────────────────────
  function observeReveal() {
    const items = $$(".reveal");
    if (!items.length) return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e, i) => {
          if (e.isIntersecting) {
            setTimeout(() => e.target.classList.add("visible"), i * 60);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    items.forEach((el) => io.observe(el));
  }

  // ── Nav ───────────────────────────────────────────────
  function initNav() {
    const toggle = $(".nav-toggle");
    const links = $(".nav-links");

    if (toggle && links) {
      toggle.addEventListener("click", () => {
        links.classList.toggle("open");
        toggle.setAttribute("aria-expanded", links.classList.contains("open"));
      });

      // Close on link click
      $$(".nav-links a").forEach((a) => {
        a.addEventListener("click", () => links.classList.remove("open"));
      });
    }

    // Smooth scroll for anchor links
    $$('a[href^="#"]').forEach((a) => {
      a.addEventListener("click", (e) => {
        const target = $(a.getAttribute("href"));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  // ── Contact Form ──────────────────────────────────────
  function initContactForm() {
    const form = $(".contact-form");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const btn = form.querySelector(".btn-primary");
      btn.textContent = "Sent ✓";
      btn.disabled = true;
      btn.style.background = "var(--green)";
      btn.style.borderColor = "var(--green)";
      btn.style.color = "#000";
      setTimeout(() => {
        btn.textContent = "Send message";
        btn.disabled = false;
        btn.style = "";
        form.reset();
      }, 3000);
    });
  }

  // ── Counter animation ─────────────────────────────────
  function animateCounters() {
    $$(".stat-card-value[data-target]").forEach((el) => {
      const target = parseInt(el.dataset.target, 10);
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current;
        if (current >= target) clearInterval(timer);
      }, 30);
    });
  }

  // ── Init ──────────────────────────────────────────────
  document.addEventListener("DOMContentLoaded", () => {
    initNav();
    initContactForm();
    buildContributionGrid();
    observeReveal();

    // GitHub data
    fetchUser();
    fetchRepos();

    // Animate stat counters when visible
    const statsSection = $("#stats");
    if (statsSection) {
      const io = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            animateCounters();
            io.disconnect();
          }
        },
        { threshold: 0.2 }
      );
      io.observe(statsSection);
    }
  });
})();
