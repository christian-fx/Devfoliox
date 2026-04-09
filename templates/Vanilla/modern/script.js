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

  const LANGUAGE_ALIASES = {
    "JavaScript": "JavaScript",
    "TypeScript": "TypeScript",
    "Python": "Python",
    "C++": "C++",
    "C": "C",
    "Rust": "Rust",
    "Go": "Go",
    "Java": "Java",
    "Kotlin": "Kotlin",
    "Swift": "Swift",
    "HTML": "HTML",
    "CSS": "CSS",
    "SCSS": "SCSS",
    "Vue": "Vue",
    "Svelte": "Svelte",
    "Ruby": "Ruby",
    "PHP": "PHP",
    "Shell": "Shell",
    "Dart": "Dart"
  };

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

  function escapeHtml(value) {
    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#39;");
  }

  function capitalizeLabel(value) {
    return value
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(" ");
  }

  function getContributionChartUrl(login) {
    // ghchart serves an SVG that is safe to embed directly in <img>.
    return `https://ghchart.rshah.org/${encodeURIComponent(login)}`;
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
    const bio = user.bio || "Software engineer building useful things.";
    const location = user.location || "";
    const company = user.company || "";
    const blog = user.blog || "";
    const profileUrl = `https://github.com/${user.login}`;
    const contactEmail = user.email || `${user.login}@users.noreply.github.com`;

    // Hero left
    setHTML(".hero-name", formatName(name));
    set("#hero-title-text", bio);
    set(".hero-bio", bio);

    // Hero stats
    set(".stat-repos .stat-value", user.public_repos ?? "0");
    set(".stat-followers .stat-value", formatNum(user.followers));
    set(".stat-following .stat-value", user.following ?? "0");

    // Hero card
    const avatar = $(".avatar-wrap img");
    if (avatar) {
      avatar.src = user.avatar_url;
      avatar.alt = name;
    }
    set(".hero-card-name", name);
    set(".hero-card-handle", `@${user.login}`);

    setHTML(
      ".hero-card-location",
      `<ion-icon name="location-outline" aria-hidden="true"></ion-icon> ${escapeHtml(location || "No location on GitHub")}`
    );

    // Mailto
    const emailLink = $(".contact-email-link");
    if (emailLink) {
      emailLink.href = `mailto:${contactEmail}`;
      emailLink.querySelector(".email-text").textContent = contactEmail;
    }

    // Panel rows (About section)
    set(".panel-val-username", `@${user.login}`);
    set(".panel-val-company", company || "—");
    set(".panel-val-location", location || "—");
    set(".panel-val-website", blog || "—");
    set(".panel-val-repos", user.public_repos ?? "—");
    set(".panel-val-gists", user.public_gists ?? "—");

    // GitHub-derived skills
    populateSkillTags([]);

    // Actual counters for animated stat cards
    updateCounter(".stat-val-repos", user.public_repos || 0);
    updateCounter(".stat-val-followers", user.followers || 0);
    updateCounter(".stat-val-following", user.following || 0);

    // Footer
    set(".footer-name", name);
    setAttr("#social-github", "href", profileUrl);
    setAttr("#footer-github", "href", profileUrl);
    setAttr("#all-repos-link", "href", `${profileUrl}?tab=repositories`);

    // Stats section
    set(".stat-val-repos", user.public_repos ?? 0);
    set(".stat-val-followers", formatNum(user.followers));
    set(".stat-val-following", user.following ?? 0);

    // Contributions chart from GitHub
    const contributionChart = $("#contribution-chart");
    if (contributionChart) {
      contributionChart.src = getContributionChartUrl(user.login || USERNAME);
      contributionChart.alt = `${name} contributions graph`;
    }
  }

  function updateCounter(selector, target) {
    const el = $(selector);
    if (!el) return;
    el.dataset.target = String(target);
    el.dataset.loaded = "true";
    el.textContent = String(target);
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

  function populateSkillTags(repos) {
    const skills = new Set();

    repos.forEach((repo) => {
      if (repo.language) {
        const label = LANGUAGE_ALIASES[repo.language] || repo.language;
        skills.add(label);
      }

      if (Array.isArray(repo.topics)) {
        repo.topics.forEach((topic) => {
          if (topic) skills.add(capitalizeLabel(topic));
        });
      }
    });

    const fallbackSkills = ["Git", "REST APIs", "Testing", "Deployment"];
    if (!skills.size) {
      fallbackSkills.forEach((skill) => skills.add(skill));
    }

    const skillContainer = $("#skills-tags");
    if (!skillContainer) return;

    skillContainer.innerHTML = [...skills]
      .slice(0, 10)
      .map((skill) => `<span class="skill-tag">${escapeHtml(skill)}</span>`)
      .join("");
  }

  // ── Fetch Repos ──────────────────────────────────────
  async function fetchRepos() {
    const grid = $(".projects-grid");
    if (!grid) return;

    try {
      const res = await fetch(REPOS_API, {
        headers: { Accept: "application/vnd.github.mercy-preview+json" },
      });
      if (!res.ok) throw new Error("Repos API error");
      const repos = await res.json();
      renderRepos(repos, grid);
      buildLangChart(repos);
      updateCounter(".stat-val-stars", countTotalStars(repos));

      const currentRepos = repos.filter((r) => !r.fork && !r.private);
      populateSkillTags(currentRepos);
    } catch (err) {
      console.warn("Could not load repos:", err.message);
      grid.innerHTML = `<p class="error-msg">Couldn't load repositories.</p>`;
    }
  }

  const REPO_ICONS = {
    JavaScript: "code-slash-outline", TypeScript: "layers-outline", Python: "terminal-outline", "C++": "construct-outline",
    Rust: "cube-outline", Go: "git-branch-outline", Java: "flame-outline", HTML: "globe-outline", CSS: "color-palette-outline",
    Default: "folder-open-outline",
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
            <div class="project-icon"><ion-icon name="${icon}" aria-hidden="true"></ion-icon></div>
            <div class="project-links">
              <a href="${r.html_url}" target="_blank" rel="noopener" class="project-link" aria-label="View source">
                <ion-icon name="logo-github" aria-hidden="true"></ion-icon>
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
                <ion-icon name="star-outline" aria-hidden="true"></ion-icon>
                ${r.stargazers_count}
              </span>
              <span class="project-stat" title="Forks">
                <ion-icon name="git-branch-outline" aria-hidden="true"></ion-icon>
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
    const chart = $("#contribution-chart");
    if (!chart) return;
    chart.src = getContributionChartUrl(USERNAME);
    chart.alt = `${USERNAME} contributions graph`;
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

  // ── Counter animation ─────────────────────────────────
  function animateCounters() {
    $$(".stat-card-value[data-target]").forEach((el) => {
      if (el.dataset.loaded === "true") return;
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
