/* ==============================
   DEVFOLIO — Modern Template
   script.js
   ============================== */

/* ── CONFIG ──────────────────────────────────────────────
   The only thing the user needs to change.
   ──────────────────────────────────────────────────────── */
const CONFIG = {
  username:    window.GITHUB_USERNAME || 'YOUR_GITHUB_USERNAME',  // ← change this
  email:       '',                      // ← leave blank to use GitHub public email
  resumeUrl:   '',                      // ← optional: link to your CV
  maxProjects: 6,                       // how many repos to show
  showForks:   false,                   // include forked repos?
  roles: [                              // rotating tagline (first one shows as static role)
    'Software Developer',
    'Embedded Systems Engineer',
    'Frontend Developer',
  ],
};

/* ── GITHUB API ──────────────────────────────────────────── */
async function gh(path) {
  const res = await fetch(`https://api.github.com${path}`, {
    headers: { Accept: 'application/vnd.github.v3+json' },
  });
  if (!res.ok) throw new Error(`${res.status} ${path}`);
  return res.json();
}

async function fetchAll() {
  const [user, repos] = await Promise.all([
    gh(`/users/${CONFIG.username}`),
    gh(`/users/${CONFIG.username}/repos?per_page=100&sort=updated`),
  ]);
  return { user, repos };
}

/* ── POPULATE ────────────────────────────────────────────── */
function populate({ user, repos }) {
  /* helpers */
  const el  = id => document.getElementById(id);
  const txt = (id, val) => { if (el(id)) el(id).textContent = val; };
  const fmt = iso => new Date(iso).toLocaleDateString('en-GB', { year: 'numeric', month: 'short' });
  const esc = s => String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');

  /* page title */
  document.title = `${user.name || user.login} — Developer`;

  /* nav */
  txt('navName', user.login);

  /* hero */
  const parts = (user.name || user.login).trim().split(/\s+/);
  txt('heroName', user.name || user.login);
  txt('heroRole', CONFIG.roles[0]);
  txt('heroBio',  user.bio || 'Developer. Builder. Problem solver.');
  if (user.location) txt('heroEyebrow', user.location);

  /* about */
  const avatar = el('aboutAvatar');
  if (avatar) { avatar.src = user.avatar_url; avatar.alt = user.name || user.login; }
  txt('aboutBio',      user.bio || '—');
  txt('metaLocation',  user.location  || '—');
  txt('metaRepos',     user.public_repos);
  txt('metaFollowers', user.followers);
  txt('metaJoined',    fmt(user.created_at));

  /* about socials */
  const socials = buildSocials(user);
  renderPills('aboutSocials', socials, false);

  /* projects */
  const filtered = repos
    .filter(r => CONFIG.showForks || !r.fork)
    .filter(r => !r.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, CONFIG.maxProjects);

  const grid = el('projectsGrid');
  if (grid) {
    grid.innerHTML = '';
    filtered.forEach((repo, i) => {
      const card = buildCard(repo, i, esc);
      grid.appendChild(card);
    });
  }

  const allLink = el('allReposLink');
  if (allLink) allLink.href = `${user.html_url}?tab=repositories`;

  /* contact */
  const email    = user.email || CONFIG.email || '';
  const emailEl  = el('contactEmail');
  if (emailEl) {
    if (email) {
      emailEl.href = `mailto:${email}`;
      emailEl.textContent = email;
    } else {
      emailEl.removeAttribute('href');
      emailEl.textContent = 'Email not public';
      emailEl.classList.add('contact__email--disabled');
    }
  }
  renderPills('contactSocials', socials, true);

  /* footer */
  txt('footerName', user.login);
  txt('footerYear', new Date().getFullYear());

  /* re-observe new cards */
  observeReveal();
}

/* ── BUILD PROJECT CARD ──────────────────────────────────── */
function buildCard(repo, index, esc) {
  const color = langColor(repo.language);
  const card  = document.createElement('article');
  card.className = 'project-card reveal';
  card.style.transitionDelay = `${index * 0.07}s`;

  card.innerHTML = `
    <div class="project-card__top">
      <span class="project-card__name">${esc(repo.name)}</span>
      <a href="${repo.html_url}" class="project-card__link" target="_blank" rel="noopener">code ↗</a>
    </div>
    <p class="project-card__desc">${esc(repo.description || 'No description.')}</p>
    <div class="project-card__footer">
      ${repo.language ? `
        <span class="project-card__lang">
          <span class="lang-dot" style="background:${color}"></span>
          ${esc(repo.language)}
        </span>` : '<span></span>'}
      <span class="project-card__stars">★ ${repo.stargazers_count}</span>
    </div>
  `;
  return card;
}

/* ── SOCIALS ────────────────────────────────────────────── */
function buildSocials(user) {
  const list = [{ label: 'GitHub', url: user.html_url }];
  if (user.blog)             list.push({ label: 'Website', url: ensureHttp(user.blog) });
  if (user.twitter_username) list.push({ label: 'Twitter', url: `https://twitter.com/${user.twitter_username}` });
  return list;
}

function renderPills(containerId, links, dark) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;
  wrap.innerHTML = '';
  links.forEach(({ label, url }) => {
    const a = document.createElement('a');
    a.href = url; a.target = '_blank'; a.rel = 'noopener';
    a.className = dark ? 'pill--dark' : 'pill';
    a.textContent = label;
    wrap.appendChild(a);
  });
}

function ensureHttp(url) {
  return /^https?:\/\//.test(url) ? url : `https://${url}`;
}

/* ── LANG COLORS ──────────────────────────────────────────── */
const COLORS = {
  JavaScript:'#f1e05a', TypeScript:'#2b7489', Python:'#3572A5',
  'C++':'#f34b7d', C:'#555555', Java:'#b07219', HTML:'#e34c26',
  CSS:'#563d7c', Rust:'#dea584', Go:'#00ADD8', Shell:'#89e051',
  Ruby:'#701516', PHP:'#4F5D95', Swift:'#F05138', Kotlin:'#A97BFF',
};
function langColor(lang) { return COLORS[lang] || '#aaaaaa'; }

/* ── SCROLL REVEAL ────────────────────────────────────────── */
let io;
function observeReveal() {
  if (!io) {
    io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { threshold: 0.1 });
  }
  document.querySelectorAll('.reveal:not(.in)').forEach(el => io.observe(el));
}

/* ── NAV ─────────────────────────────────────────────────── */
function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('burger');
  const menu   = document.getElementById('mobileMenu');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 30);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('open');
    menu.classList.toggle('open', open);
    document.body.style.overflow = open ? 'hidden' : '';
  });

  menu.querySelectorAll('.mobile-link').forEach(a => {
    a.addEventListener('click', () => {
      burger.classList.remove('open');
      menu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── SMOOTH SCROLL ───────────────────────────────────────── */
function initScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const t = document.querySelector(a.getAttribute('href'));
      if (!t) return;
      e.preventDefault();
      const offset = document.getElementById('nav').offsetHeight;
      window.scrollTo({ top: t.offsetTop - offset, behavior: 'smooth' });
    });
  });
}

/* ── INIT ────────────────────────────────────────────────── */
async function init() {
  initNav();
  initScroll();
  observeReveal();

  /* mark all static .reveal els */
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  document.getElementById('footerYear').textContent = new Date().getFullYear();

  try {
    const data = await fetchAll();
    populate(data);
  } catch (err) {
    console.error('[Devfolio] GitHub fetch failed:', err.message);
    /* fallback: hide skeletons, show a graceful empty state */
    const grid = document.getElementById('projectsGrid');
    if (grid) grid.innerHTML = `<p style="color:var(--text-faint);font-size:.85rem;grid-column:1/-1">
      Could not load @${CONFIG.username} — check your username in script.js
    </p>`;
  }
}

/* ── INTERACTIVE EFFECTS ─────────────────────────────────── */
function initInteractiveEffects() {
  // Mouse follower glow effect
  const cursorGlow = document.createElement('div');
  cursorGlow.className = 'cursor-glow';
  document.body.appendChild(cursorGlow);

  let mouseX = 0;
  let mouseY = 0;
  let glowX = 0;
  let glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
  });

  function updateGlow() {
    glowX += (mouseX - glowX) * 0.1;
    glowY += (mouseY - glowY) * 0.1;

    cursorGlow.style.left = glowX - 10 + 'px';
    cursorGlow.style.top = glowY - 10 + 'px';

    requestAnimationFrame(updateGlow);
  }
  updateGlow();

  // Intersection Observer for reveal animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
      }
    });
  }, observerOptions);

  // Observe all elements with reveal class
  document.querySelectorAll('.reveal').forEach(el => {
    observer.observe(el);
  });

  // Add reveal class to sections
  document.querySelectorAll('section').forEach(section => {
    section.classList.add('reveal');
  });

  // Enhanced scroll effects
  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;
    const nav = document.querySelector('.nav');

    if (currentScrollY > 100) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }

    lastScrollY = currentScrollY;
  });

  // 3D tilt effect for project cards
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / 10;
      const rotateY = (centerX - x) / 10;

      card.style.transform = `translateY(-15px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
}

document.addEventListener('DOMContentLoaded', () => {
  init();
  initInteractiveEffects();
});
