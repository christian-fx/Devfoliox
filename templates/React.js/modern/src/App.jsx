import { useState, useEffect } from "react";
import { getGitHubData } from "./services/github";
import { motion, AnimatePresence } from "framer-motion";
import { GITHUB_USERNAME } from "./config";

/* ─── SVG Icons ─── */
const IconGithub = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
  </svg>
);
const IconArrow = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17L17 7M7 7h10v10" />
  </svg>
);
const IconMail = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const IconStar = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);
const IconFork = ({ size = 12 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="18" r="3" />
    <circle cx="6" cy="6" r="3" />
    <circle cx="18" cy="6" r="3" />
    <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" />
    <path d="M12 12v3" />
  </svg>
);
const IconMap = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);
const IconBriefcase = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 20H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
    <path d="M8 12h8" />
  </svg>
);
const IconExternalLink = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" />
    <line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);

/* ─── Helpers ─── */
const getUniqueLanguages = (repos) =>
  [...new Set(repos.map((r) => r.language).filter(Boolean))];

const getTotalStars = (repos) =>
  repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

/* ─── Animation helpers ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] },
  }),
};
const fadeIn = {
  hidden: { opacity: 0 },
  visible: (i = 0) => ({
    opacity: 1,
    transition: { duration: 0.5, delay: i * 0.07 },
  }),
};

/* ─── Skeleton ─── */
function SkeletonLoader() {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", padding: "120px 24px 0" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div className="skeleton" style={{ width: 80, height: 80, borderRadius: "50%", marginBottom: 32 }} />
        <div className="skeleton" style={{ width: 340, height: 48, marginBottom: 16 }} />
        <div className="skeleton" style={{ width: 260, height: 20, marginBottom: 40 }} />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 100 }} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          {[1,2,3,4].map(i => <div key={i} className="skeleton" style={{ height: 200 }} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── Error State ─── */
function ErrorState({ message }) {
  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ textAlign: "center", color: "#a0a0a0", fontFamily: "JetBrains Mono, monospace" }}>
        <div style={{ fontSize: 12, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12, color: "#e8ff59" }}>Error</div>
        <div style={{ fontSize: 14 }}>{message}</div>
      </div>
    </div>
  );
}

/* ─── Main App ─── */
export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (GITHUB_USERNAME && GITHUB_USERNAME !== "placeholder") {
          setUserData(await getGitHubData(GITHUB_USERNAME));
        } else {
          setError("GitHub username not configured. Check src/config.js.");
        }
      } catch (e) {
        setError("Could not load GitHub data.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <SkeletonLoader />;
  if (error) return <ErrorState message={error} />;

  const { profile, repos } = userData;
  const languages = getUniqueLanguages(repos);
  const totalStars = getTotalStars(repos);
  const filteredRepos =
    activeFilter === "All" ? repos : repos.filter((r) => r.language === activeFilter);

  /* Marquee text for the scrolling banner */
  const techItems = languages.length ? languages : ["JavaScript", "React", "TypeScript", "CSS", "HTML", "Node.js"];
  const marqueeItems = [...techItems, ...techItems, ...techItems, ...techItems];

  return (
    <div style={{ background: "#0d0d0d", minHeight: "100vh", fontFamily: "Space Grotesk, sans-serif" }}>

      {/* ─── NAV ─── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          borderBottom: scrolled ? "1px solid #2a2a2a" : "1px solid transparent",
          background: scrolled ? "rgba(13,13,13,0.9)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <a href="#" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: 18, color: "#f5f5f5", textDecoration: "none", letterSpacing: "-0.02em" }}>
            {profile.login}<span style={{ color: "#e8ff59" }}>.</span>
          </a>

          {/* Links */}
          <nav style={{ display: "flex", alignItems: "center", gap: 32 }}>
            <div style={{ display: "flex", gap: 28 }}>
              {["About", "Projects", "Contact"].map(link => (
                <a key={link} href={`#${link.toLowerCase()}`} className="nav-link">{link}</a>
              ))}
            </div>
            <a href={profile.html_url} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "1px solid #2a2a2a", background: "#141414", color: "#f5f5f5", textDecoration: "none", fontSize: 13, fontWeight: 500, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#3a3a3a"; e.currentTarget.style.background = "#1a1a1a"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2a2a2a"; e.currentTarget.style.background = "#141414"; }}
            >
              <IconGithub size={15} /> GitHub
            </a>
          </nav>
        </div>
      </motion.header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px" }}>

        {/* ─── HERO ─── */}
        <section style={{ paddingTop: 160, paddingBottom: 100 }}>
          <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible">
            {/* Availability badge */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, border: "1px solid #2a2a2a", background: "#141414", marginBottom: 40 }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#4ade80", display: "block" }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.1em", color: "#a0a0a0" }}>Available for work</span>
            </div>
          </motion.div>

          {/* Name + Avatar row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 40, flexWrap: "wrap", marginBottom: 32 }}>
            <div style={{ flex: 1, minWidth: 280 }}>
              <motion.h1
                custom={1} variants={fadeUp} initial="hidden" animate="visible"
                style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(48px, 7vw, 88px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#f5f5f5", marginBottom: 0 }}
              >
                {profile.name || profile.login}
              </motion.h1>
            </div>

            {/* Avatar */}
            <motion.div custom={2} variants={fadeIn} initial="hidden" animate="visible"
              style={{ flexShrink: 0 }}
            >
              <img src={profile.avatar_url} alt={profile.login}
                style={{ width: 100, height: 100, borderRadius: "50%", border: "2px solid #2a2a2a", objectFit: "cover" }}
              />
            </motion.div>
          </div>

          {/* Bio + meta */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <p style={{ fontSize: "clamp(16px, 2.2vw, 20px)", color: "#a0a0a0", maxWidth: 560, lineHeight: 1.65, marginBottom: 20, fontWeight: 400 }}>
              {profile.bio || "Building things for the web. Open to collaborations."}
            </p>
            {/* location / company */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 20, color: "#555", fontSize: 13, fontFamily: "JetBrains Mono, monospace", marginBottom: 40 }}>
              {profile.location && (
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <IconMap /> {profile.location}
                </span>
              )}
              {profile.company && (
                <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                  <IconBriefcase /> {profile.company}
                </span>
              )}
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                <IconGithub size={13} /> {profile.followers} followers
              </span>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <a href="#projects" className="btn-accent">
                View Projects <IconArrow size={15} />
              </a>
              <a href={`mailto:${profile.email || "hello@portfolio.dev"}`} className="btn-ghost">
                <IconMail size={15} /> Get in Touch
              </a>
            </div>
          </motion.div>
        </section>

        {/* ─── SCROLLING MARQUEE ─── */}
        <div style={{ borderTop: "1px solid #2a2a2a", borderBottom: "1px solid #2a2a2a", padding: "18px 0", overflow: "hidden", marginBottom: 80 }} className="marquee-wrap">
          <div className="marquee-track" style={{ display: "flex", gap: 48, whiteSpace: "nowrap", width: "max-content" }}>
            {marqueeItems.map((lang, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 10, color: "#555", fontFamily: "JetBrains Mono, monospace", fontSize: 13, textTransform: "uppercase", letterSpacing: "0.12em" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2a2a2a", display: "inline-block" }} />
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* ─── ABOUT / STATS ─── */}
        <section id="about" style={{ marginBottom: 100 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "start", flexWrap: "wrap" }}>
            {/* Left: About blurb */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5 }}
            >
              <div className="section-label" style={{ marginBottom: 16 }}>About</div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 42px)", letterSpacing: "-0.03em", lineHeight: 1.15, color: "#f5f5f5", marginBottom: 20 }}>
                A developer who cares about the details.
              </h2>
              <p style={{ fontSize: 15, color: "#a0a0a0", lineHeight: 1.75 }}>
                Based on my GitHub — {profile.public_repos} public repositories, working in {languages.slice(0, 3).join(", ")}{languages.length > 3 ? " and more" : ""}. I write code that&apos;s meant to be read.
              </p>
            </motion.div>

            {/* Right: 4 stat cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}
            >
              {[
                { label: "Repositories", value: profile.public_repos },
                { label: "Followers", value: profile.followers },
                { label: "Following", value: profile.following },
                { label: "Stars Earned", value: totalStars },
              ].map((s) => (
                <div key={s.label} className="stat-card">
                  <div className="stat-value">{s.value}</div>
                  <div className="stat-label">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─── PROJECTS ─── */}
        <section id="projects" style={{ marginBottom: 100 }}>
          {/* Header row */}
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 36, flexWrap: "wrap", gap: 16 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 12 }}>Selected Work</div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 42px)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#f5f5f5" }}>
                Projects
              </h2>
            </div>
            {/* Filter buttons */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {["All", ...languages].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setActiveFilter(lang)}
                  className={`filter-btn${activeFilter === lang ? " active" : ""}`}
                >
                  {lang}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 16 }}>
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  layout
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.06, duration: 0.4 }}
                  className="card"
                  style={{ padding: "28px 28px 24px", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 220 }}
                >
                  <div>
                    {/* Title row */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14, gap: 8 }}>
                      <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 18, letterSpacing: "-0.02em", color: "#f5f5f5", lineHeight: 1.3 }}>
                        {repo.name}
                      </h3>
                      <span style={{ color: "#555", flexShrink: 0, marginTop: 2, transition: "color 0.2s" }}>
                        <IconExternalLink size={15} />
                      </span>
                    </div>
                    {/* Description */}
                    <p style={{ fontSize: 13.5, color: "#6b6b6b", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {repo.description || "An open-source project on GitHub."}
                    </p>
                  </div>

                  {/* Footer */}
                  <div style={{ marginTop: 20, paddingTop: 16, borderTop: "1px solid #222", display: "flex", alignItems: "center", gap: 16, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#555" }}>
                    {repo.language && (
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#e8ff59", display: "inline-block" }} />
                        {repo.language}
                      </span>
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <IconStar /> {repo.stargazers_count}
                    </span>
                    {repo.forks_count > 0 && (
                      <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                        <IconFork /> {repo.forks_count}
                      </span>
                    )}
                    <span style={{ marginLeft: "auto", fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#3a3a3a", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {repo.updated_at ? new Date(repo.updated_at).getFullYear() : ""}
                    </span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ─── CONTACT ─── */}
        <section id="contact" style={{ paddingBottom: 120 }}>
          <motion.div
            className="cta-strip"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}
          >
            {/* Accent label */}
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(232,255,89,0.25)", background: "rgba(232,255,89,0.08)", marginBottom: 28 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.12em", color: "#e8ff59" }}>Open to opportunities</span>
            </div>

            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: "clamp(36px, 5.5vw, 68px)", letterSpacing: "-0.04em", lineHeight: 1.05, color: "#f5f5f5", marginBottom: 20, maxWidth: 600 }}>
              Let&apos;s build something great together.
            </h2>

            <p style={{ fontSize: 15, color: "#6b6b6b", maxWidth: 420, lineHeight: 1.7, marginBottom: 36 }}>
              Have a project in mind or just want to say hello? Drop me an email and I&apos;ll get back to you.
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 12, justifyContent: "center" }}>
              <a href={`mailto:${profile.email || "hello@portfolio.dev"}`} className="btn-accent">
                <IconMail size={15} />
                {profile.email || "hello@portfolio.dev"}
              </a>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="btn-ghost">
                <IconGithub size={15} /> View GitHub
              </a>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ─── FOOTER ─── */}
      <footer style={{ borderTop: "1px solid #1a1a1a", padding: "28px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#3a3a3a", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} {profile.name || profile.login}
          </span>
          <a href={profile.html_url} target="_blank" rel="noreferrer"
            style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#3a3a3a", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }}
            onMouseEnter={e => e.currentTarget.style.color = "#a0a0a0"}
            onMouseLeave={e => e.currentTarget.style.color = "#3a3a3a"}
          >
            @{profile.login}
          </a>
        </div>
      </footer>
    </div>
  );
}
