"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getGitHubData } from "../services/github";
import { config } from "../config";
import Stats from "../components/Stats";
import Header from "../components/Header";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

// Helpers
const getUniqueLanguages = (repos) => [
  ...new Set(repos.map((r) => r.language).filter(Boolean)),
];
const getTotalStars = (repos) =>
  repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
function getLanguageStats(repos) {
  const counts = {};
  repos.forEach((r) => {
    if (r.language) counts[r.language] = (counts[r.language] || 0) + 1;
  });
  const total = Object.values(counts).reduce((a, b) => a + b, 0);
  return Object.entries(counts)
    .map(([lang, count]) => ({ lang, pct: Math.round((count / total) * 100) }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 7);
}

// Animation constants
const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
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

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    (async () => {
      try {
        if (config.githubUsername && config.githubUsername !== "placeholder") {
          setUserData(await getGitHubData(config.githubUsername));
        } else {
          setError(
            "GitHub username not configured — check config.js in the root template directory.",
          );
        }
      } catch (e) {
        setError("Could not load GitHub data.");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center">
        <div className="w-8 h-8 md:w-12 md:h-12 rounded-full border-4 border-orange-500/20 border-t-orange-500 animate-spin flex items-center justify-center"></div>
        <p className="text-orange-500/60 font-mono text-xs uppercase tracking-widest mt-6 animate-pulse">
          Initializing Data...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-6 text-center">
        <p className="text-orange-500 font-mono text-xs md:text-sm uppercase tracking-widest border border-orange-500/20 bg-orange-500/10 p-4 shrink-0 rounded-lg max-w-lg mb-8">
          {error}
        </p>
        <p className="text-slate-400 font-sans text-sm md:text-base">
          Check connection or GitHub API rate limits.
        </p>
      </div>
    );
  }

  if (!userData?.repos || userData.repos.length === 0) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col justify-center items-center px-6 text-center">
        <p className="text-white font-sans text-xl md:text-2xl font-bold mb-4">
          No Public Repositories Found
        </p>
        <p className="text-slate-400 font-sans text-sm md:text-base">
          This GitHub user doesn't have any public repositories.
        </p>
      </div>
    );
  }

  const { profile, repos } = userData;
  const languages = getUniqueLanguages(repos);
  const totalStars = getTotalStars(repos);

  return (
    <div className="min-h-screen bg-background text-slate-300 font-sans selection:bg-primary/30 selection:text-white relative">
      {/* Vertical Decorative Line */}
      <div className="absolute right-6 md:right-12 lg:right-24 top-0 bottom-0 w-[1px] bg-border/40 hidden md:block">
        <div className="absolute top-[30%] right-[-4px] w-2 h-2 rounded-full bg-primary" />
        <div className="absolute top-[45%] right-[-4px] w-2 h-2 rounded-full border border-primary bg-background" />
        <div className="absolute top-[52%] right-[-4px] w-2 h-2 rounded-full border border-primary bg-background" />
        <div className="absolute top-[58%] right-[-4px] w-2 h-2 rounded-full bg-primary" />
        <div className="absolute bottom-[20%] right-[-4px] w-2 h-2 rounded-full border border-primary bg-background" />
      </div>

      <main className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
        <Header
          profile={profile}
          isMobile={isMobile}
          fadeUp={fadeUp}
          fadeIn={fadeIn}
        />

        <Stats
          profile={profile}
          repos={repos}
          languages={languages}
          totalStars={totalStars}
          langStats={getLanguageStats(repos)}
          isMobile={isMobile}
        />

        {/* Quote Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="py-12 md:py-20"
        >
          <h2 className="font-sans font-bold text-3xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight max-w-2xl">
            Writing code that ships, not just compiles.
          </h2>
        </motion.section>

        <Projects repos={repos} languages={languages} />
        <Contact profile={profile} isMobile={isMobile} />
      </main>
      <Footer profile={profile} isMobile={isMobile} />
    </div>
  );
}
