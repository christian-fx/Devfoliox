import { useState, useEffect } from "react";
import { getGitHubData } from "./services/github";
import { motion, AnimatePresence } from "framer-motion";
import { GITHUB_USERNAME } from "./config";

/* ─── Mobile hook ─── */
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );
  useEffect(() => {
    const fn = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return isMobile;
}

/* ─── Language → colored dot ─── */
function LangDot({ lang }) {
  const map = {
    JavaScript: "lang-dot-js", TypeScript: "lang-dot-ts",
    Python: "lang-dot-py", HTML: "lang-dot-html",
    CSS: "lang-dot-css", Java: "lang-dot-java",
    Go: "lang-dot-go", Rust: "lang-dot-rust",
    "C++": "lang-dot-cpp", Ruby: "lang-dot-rb",
  };
  const cls = map[lang] || "lang-dot-default";
  return <span className={cls} style={{ width: 8, height: 8, borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />;
}

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
    <circle cx="12" cy="18" r="3" /><circle cx="6" cy="6" r="3" /><circle cx="18" cy="6" r="3" />
    <path d="M18 9v2c0 .6-.4 1-1 1H7c-.6 0-1-.4-1-1V9" /><path d="M12 12v3" />
  </svg>
);
const IconMap = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" />
  </svg>
);
const IconBriefcase = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 20H8a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2z" />
    <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" /><path d="M8 12h8" />
  </svg>
);
const IconExternalLink = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
    <polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" />
  </svg>
);
const IconCode = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" />
  </svg>
);
const IconZap = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);
const IconLayers = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" />
  </svg>
);

/* ─── Helpers ─── */
const getUniqueLanguages = (repos) =>
  [...new Set(repos.map((r) => r.language).filter(Boolean))];
const getTotalStars = (repos) =>
  repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);

/* ─── Language usage % from repos ─── */
function getLanguageStats(repos) {
  const counts = {};
  repos.forEach((r) => { if (r.language) counts[r.language] = (counts[r.language] || 0) + 1; });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts)
    .map(([lang, count]) => ({ lang, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 7);
}

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
  visible: (i = 0) => ({ opacity: 1, transition: { duration: 0.5, delay: i * 0.07 } }),
};

/* ─── Skeleton ─── */
function SkeletonLoader({ isMobile }) {
  return (
    <div style={{ background: "#0c0a09", minHeight: "100vh", padding: isMobile ? "100px 20px 0" : "120px 32px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 24, marginBottom: 40, alignItems: "center" }}>
          <div className="skeleton" style={{ width: 72, height: 72, borderRadius: "50%" }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton" style={{ width: isMobile ? "70%" : 280, height: 40, marginBottom: 12 }} />
            <div className="skeleton" style={{ width: isMobile ? "50%" : 200, height: 16 }} />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "repeat(4, 1fr)", gap: 12, marginBottom: 32 }}>
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 90 }} />)}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 12 }}>
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton" style={{ height: 180 }} />)}
        </div>
      </div>
    </div>
  );
}

/* ─── Error ─── */
function ErrorState({ message }) {
  return (
    <div style={{ background: "#0c0a09", minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", padding: "0 20px" }}>
      <div style={{ textAlign: "center", color: "#9a8f87", fontFamily: "JetBrains Mono, monospace" }}>
        <div style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: 12, color: "#f97316" }}>Error</div>
        <div style={{ fontSize: 14 }}>{message}</div>
      </div>
    </div>
  );
}

/* ─── Main ─── */
export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeFilter, setActiveFilter] = useState("All");
  const [scrolled, setScrolled] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (GITHUB_USERNAME && GITHUB_USERNAME !== "placeholder") {
          setUserData(await getGitHubData(GITHUB_USERNAME));
        } else {
          setError("GitHub username not configured — check src/config.js");
        }
      } catch (e) {
        setError("Could not load GitHub data.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <SkeletonLoader isMobile={isMobile} />;
  if (error) return <ErrorState message={error} />;

  const { profile, repos } = userData;
  const languages = getUniqueLanguages(repos);
  const totalStars = getTotalStars(repos);
  const langStats = getLanguageStats(repos);
  const filteredRepos = activeFilter === "All" ? repos : repos.filter((r) => r.language === activeFilter);

  const techItems = languages.length ? languages : ["JavaScript", "React", "TypeScript", "CSS", "HTML", "Node.js"];
  const marqueeItems = [...techItems, ...techItems, ...techItems, ...techItems];

  const px = isMobile ? "0 20px" : "0 32px";
  const sectionMb = isMobile ? 64 : 96;

  /* Top pinned / most-starred repos */
  const topRepos = [...repos].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 1);
  const currentProject = topRepos[0];

  return (
    <div style={{ background: "#0c0a09", minHeight: "100vh", fontFamily: "Space Grotesk, sans-serif" }}>

      {/* ─────────────── NAV ─────────────── */}
      <motion.header
        initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          borderBottom: scrolled ? "1px solid #2e2926" : "1px solid transparent",
          background: scrolled ? "rgba(12,10,9,0.92)" : "transparent",
          backdropFilter: scrolled ? "blur(14px)" : "none",
          transition: "all 0.3s ease",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: isMobile ? "0 20px" : "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="#" style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: isMobile ? 15 : 17, color: "#faf5f0", textDecoration: "none", letterSpacing: "-0.03em" }}>
            {profile.login}<span style={{ color: "#f97316" }}>.</span>
          </a>
          <nav style={{ display: "flex", alignItems: "center", gap: isMobile ? 12 : 28 }}>
            {!isMobile && ["About", "Skills", "Projects", "Contact"].map(l => (
              <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
            ))}
            <a href={profile.html_url} target="_blank" rel="noreferrer"
              style={{ display: "flex", alignItems: "center", gap: 6, padding: isMobile ? "7px 12px" : "7px 16px", borderRadius: 8, border: "1px solid #2e2926", background: "#161210", color: "#faf5f0", textDecoration: "none", fontSize: 12, fontWeight: 500, transition: "all 0.2s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "#f97316"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "#2e2926"; }}
            >
              <IconGithub size={13} />{!isMobile && " GitHub"}
            </a>
          </nav>
        </div>
      </motion.header>

      <main style={{ maxWidth: 1100, margin: "0 auto", padding: px }}>

        {/* ─────────────── HERO ─────────────── */}
        <section style={{ paddingTop: isMobile ? 104 : 168, paddingBottom: isMobile ? 56 : 96 }}>

          {/* Status badge */}
          <motion.div custom={0} variants={fadeIn} initial="hidden" animate="visible" style={{ marginBottom: 32 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "6px 14px", borderRadius: 999, border: "1px solid rgba(249,115,22,0.25)", background: "rgba(249,115,22,0.07)" }}>
              <span className="pulse-dot" style={{ width: 7, height: 7, borderRadius: "50%", background: "#f97316", display: "block" }} />
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#f97316" }}>
                Open to work
              </span>
            </div>
          </motion.div>

          {/* Name + avatar */}
          <div style={{ display: "flex", flexDirection: isMobile ? "column-reverse" : "row", alignItems: "flex-start", justifyContent: "space-between", gap: isMobile ? 16 : 32, marginBottom: isMobile ? 24 : 28 }}>
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(40px, 11vw, 58px)" : "clamp(58px, 7.5vw, 92px)", lineHeight: 0.93, letterSpacing: "-0.04em", color: "#faf5f0", flex: 1 }}
            >
              {profile.name || profile.login}
            </motion.h1>
            <motion.div custom={2} variants={fadeIn} initial="hidden" animate="visible" style={{ flexShrink: 0 }}>
              <img src={profile.avatar_url} alt={profile.login}
                style={{ width: isMobile ? 68 : 96, height: isMobile ? 68 : 96, borderRadius: "50%", border: "2px solid #2e2926", objectFit: "cover" }}
              />
            </motion.div>
          </div>

          {/* Bio */}
          <motion.div custom={2} variants={fadeUp} initial="hidden" animate="visible">
            <p style={{ fontSize: isMobile ? 15 : 18, color: "#9a8f87", maxWidth: 540, lineHeight: 1.7, marginBottom: 16 }}>
              {profile.bio || "Building things for the web — open to collaborations."}
            </p>

            {/* Meta row */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: isMobile ? 12 : 20, color: "#524740", fontSize: 12, fontFamily: "JetBrains Mono, monospace", marginBottom: isMobile ? 28 : 36 }}>
              {profile.location && <span style={{ display: "flex", alignItems: "center", gap: 5 }}><IconMap size={12} /> {profile.location}</span>}
              {profile.company && <span style={{ display: "flex", alignItems: "center", gap: 5 }}><IconBriefcase size={12} /> {profile.company}</span>}
              <span style={{ display: "flex", alignItems: "center", gap: 5 }}><IconGithub size={12} /> {profile.followers} followers</span>
              {profile.public_repos && <span style={{ display: "flex", alignItems: "center", gap: 5 }}><IconCode size={12} /> {profile.public_repos} repos</span>}
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10, width: isMobile ? "100%" : "auto" }}>
              <a href="#projects" className="btn-accent" style={isMobile ? { justifyContent: "center" } : {}}>
                View Projects <IconArrow size={14} />
              </a>
              <a href={`mailto:${profile.email || "hello@portfolio.dev"}`} className="btn-ghost" style={isMobile ? { justifyContent: "center" } : {}}>
                <IconMail size={14} /> Get in Touch
              </a>
            </div>
          </motion.div>
        </section>

        {/* ─────────────── MARQUEE ─────────────── */}
        <div style={{ borderTop: "1px solid #2e2926", borderBottom: "1px solid #2e2926", padding: "15px 0", overflow: "hidden", marginBottom: sectionMb }} className="marquee-wrap">
          <div className="marquee-track" style={{ display: "flex", gap: isMobile ? 32 : 52, whiteSpace: "nowrap", width: "max-content" }}>
            {marqueeItems.map((lang, i) => (
              <span key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "JetBrains Mono, monospace", fontSize: isMobile ? 10 : 12, textTransform: "uppercase", letterSpacing: "0.12em", color: "#524740" }}>
                <LangDot lang={lang} />
                {lang}
              </span>
            ))}
          </div>
        </div>

        {/* ─────────────── ABOUT + STATS ─────────────── */}
        <section id="about" style={{ marginBottom: sectionMb }}>
          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "5fr 4fr", gap: isMobile ? 40 : 56, alignItems: "start" }}>

            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
              <div className="section-label" style={{ marginBottom: 14 }}>About</div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: isMobile ? "clamp(24px, 7vw, 32px)" : "clamp(26px, 3vw, 38px)", letterSpacing: "-0.03em", lineHeight: 1.18, color: "#faf5f0", marginBottom: 16 }}>
                Writing code that ships, not just compiles.
              </h2>
              <p style={{ fontSize: 15, color: "#9a8f87", lineHeight: 1.78 }}>
                I&apos;m {profile.name || profile.login} — a developer with {profile.public_repos} public projects on GitHub. I work primarily in{" "}
                {languages.slice(0, 3).join(", ")}{languages.length > 3 ? " and more" : ""}. Every piece of code I push is intentional.
              </p>

              {/* Currently building card */}
              {currentProject && (
                <div style={{ marginTop: 24, padding: isMobile ? "16px" : "20px 24px", borderRadius: 12, border: "1px solid rgba(249,115,22,0.2)", background: "rgba(249,115,22,0.05)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: 8, background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconZap size={16} style={{ color: "#f97316" }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#f97316", marginBottom: 4 }}>
                      Most Starred
                    </div>
                    <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: 15, color: "#faf5f0", marginBottom: 4 }}>
                      {currentProject.name}
                    </div>
                    <div style={{ fontSize: 13, color: "#524740", lineHeight: 1.5 }}>
                      {currentProject.description || "Check it out on GitHub →"}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Stats */}
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.12 }}
              style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
            >
              {[
                { label: "Repos", value: profile.public_repos, icon: <IconCode size={16} /> },
                { label: "Followers", value: profile.followers, icon: <IconGithub size={16} /> },
                { label: "Following", value: profile.following, icon: <IconLayers size={16} /> },
                { label: "Stars", value: totalStars, icon: <IconZap size={16} /> },
              ].map((s) => (
                <div key={s.label} className="stat-card" style={{ padding: isMobile ? "18px 14px" : "22px 20px" }}>
                  <div style={{ color: "#f97316", marginBottom: 10 }}>{s.icon}</div>
                  <div style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: isMobile ? "1.7rem" : "2.2rem", color: "#faf5f0", lineHeight: 1, marginBottom: 6 }}>
                    {s.value}
                  </div>
                  <div style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.1em", color: "#524740" }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </section>

        {/* ─────────────── SKILLS ─────────────── */}
        <section id="skills" style={{ marginBottom: sectionMb }}>
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className="section-label" style={{ marginBottom: 14 }}>Skills</div>
            <div style={{ display: "flex", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: isMobile ? "clamp(24px, 7vw, 32px)" : "clamp(26px, 3vw, 38px)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#faf5f0" }}>
                Languages & Tools
              </h2>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#524740" }}>based on github repos</span>
            </div>

            {/* Language usage bars */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {langStats.map((item, i) => (
                <motion.div
                  key={item.lang}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.45 }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 7 }}>
                    <LangDot lang={item.lang} />
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 12, color: "#9a8f87", flex: 1 }}>{item.lang}</span>
                    <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#524740" }}>{item.pct}%</span>
                  </div>
                  {/* Bar */}
                  <div style={{ height: 3, background: "#1e1916", borderRadius: 99, overflow: "hidden" }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.pct}%` }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.06 + 0.2, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                      style={{ height: "100%", background: "linear-gradient(90deg, #f97316, #fb923c)", borderRadius: 99 }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Chip grid for all languages */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 32 }}>
              {languages.map((lang) => (
                <div key={lang} className="skill-chip">
                  <LangDot lang={lang} />
                  {lang}
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* ─────────────── PROJECTS ─────────────── */}
        <section id="projects" style={{ marginBottom: sectionMb }}>
          <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", alignItems: isMobile ? "flex-start" : "flex-end", justifyContent: "space-between", marginBottom: 28, gap: 16 }}>
            <div>
              <div className="section-label" style={{ marginBottom: 10 }}>Work</div>
              <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: isMobile ? "clamp(24px, 7vw, 32px)" : "clamp(26px, 3vw, 38px)", letterSpacing: "-0.03em", lineHeight: 1.1, color: "#faf5f0" }}>
                Projects
              </h2>
            </div>
            {/* Scrollable filter row on mobile */}
            <div style={{ display: "flex", gap: 8, flexWrap: isMobile ? "nowrap" : "wrap", overflowX: isMobile ? "auto" : "visible", paddingBottom: isMobile ? 4 : 0 }}>
              {["All", ...languages].map((lang) => (
                <button key={lang} onClick={() => setActiveFilter(lang)} className={`filter-btn${activeFilter === lang ? " active" : ""}`} style={{ flexShrink: 0 }}>
                  {lang}
                </button>
              ))}
            </div>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(320px, 1fr))", gap: isMobile ? 12 : 14 }}>
            <AnimatePresence mode="popLayout">
              {filteredRepos.map((repo, i) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  layout
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ delay: i * 0.05, duration: 0.38 }}
                  className="card"
                  style={{ padding: isMobile ? "18px 18px 16px" : "26px 26px 22px", textDecoration: "none", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: isMobile ? 160 : 210 }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10, gap: 8 }}>
                      <h3 style={{ fontFamily: "Syne, sans-serif", fontWeight: 700, fontSize: isMobile ? 15 : 17, letterSpacing: "-0.025em", color: "#faf5f0", lineHeight: 1.3 }}>
                        {repo.name}
                      </h3>
                      <span style={{ color: "#524740", flexShrink: 0, marginTop: 1 }}><IconExternalLink size={13} /></span>
                    </div>
                    <p style={{ fontSize: 13, color: "#524740", lineHeight: 1.65, display: "-webkit-box", WebkitLineClamp: isMobile ? 2 : 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {repo.description || "Open-source project on GitHub."}
                    </p>
                  </div>
                  <div style={{ marginTop: 16, paddingTop: 14, borderTop: "1px solid #1e1916", display: "flex", alignItems: "center", gap: 12, fontFamily: "JetBrains Mono, monospace", fontSize: 11, color: "#524740" }}>
                    {repo.language && (
                      <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
                        <LangDot lang={repo.language} /> {repo.language}
                      </span>
                    )}
                    <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                      <IconStar /> {repo.stargazers_count}
                    </span>
                    {repo.forks_count > 0 && (
                      <span style={{ display: "flex", alignItems: "center", gap: 3 }}>
                        <IconFork /> {repo.forks_count}
                      </span>
                    )}
                    <span style={{ marginLeft: "auto", fontSize: 10, color: "#2e2926", textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      {repo.updated_at ? new Date(repo.updated_at).getFullYear() : ""}
                    </span>
                  </div>
                </motion.a>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ─────────────── CONTACT ─────────────── */}
        <section id="contact" style={{ paddingBottom: isMobile ? 80 : 120 }}>
          <motion.div
            className="cta-strip"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55 }}
            style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", padding: isMobile ? "44px 24px" : "72px 56px" }}
          >
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "5px 14px", borderRadius: 999, border: "1px solid rgba(249,115,22,0.25)", background: "rgba(249,115,22,0.07)", marginBottom: 24 }}>
              <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, textTransform: "uppercase", letterSpacing: "0.12em", color: "#f97316" }}>Let&apos;s talk</span>
            </div>

            <h2 style={{ fontFamily: "Syne, sans-serif", fontWeight: 800, fontSize: isMobile ? "clamp(28px, 8vw, 44px)" : "clamp(38px, 5.5vw, 70px)", letterSpacing: "-0.04em", lineHeight: 1.05, color: "#faf5f0", marginBottom: 16, maxWidth: 560 }}>
              Got a project?<br />Let&apos;s build it.
            </h2>

            <p style={{ fontSize: 14, color: "#524740", maxWidth: 360, lineHeight: 1.75, marginBottom: 36 }}>
              I&apos;m currently available for freelance work and full-time roles. Drop me a message and let&apos;s figure it out.
            </p>

            <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10, justifyContent: "center", width: isMobile ? "100%" : "auto" }}>
              <a href={`mailto:${profile.email || "hello@portfolio.dev"}`} className="btn-accent" style={isMobile ? { justifyContent: "center" } : {}}>
                <IconMail size={14} />
                <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: isMobile ? 220 : "none" }}>
                  {profile.email || "Send an email"}
                </span>
              </a>
              <a href={profile.html_url} target="_blank" rel="noreferrer" className="btn-ghost" style={isMobile ? { justifyContent: "center" } : {}}>
                <IconGithub size={14} /> GitHub Profile
              </a>
            </div>
          </motion.div>
        </section>

      </main>

      {/* ─────────────── FOOTER ─────────────── */}
      <footer style={{ borderTop: "1px solid #161210", padding: isMobile ? "20px" : "24px 32px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#2e2926", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            © {new Date().getFullYear()} {profile.name || profile.login}
          </span>
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <a href="https://github.com/christian-fx/Devfoliox" target="_blank" rel="noreferrer"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#2e2926", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#f97316"}
              onMouseLeave={e => e.currentTarget.style.color = "#2e2926"}
            >
              Built with Devfoliox
            </a>
            <a href={profile.html_url} target="_blank" rel="noreferrer"
              style={{ fontFamily: "JetBrains Mono, monospace", fontSize: 10, color: "#2e2926", textDecoration: "none", textTransform: "uppercase", letterSpacing: "0.1em", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#9a8f87"}
              onMouseLeave={e => e.currentTarget.style.color = "#2e2926"}
            >
              @{profile.login}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
