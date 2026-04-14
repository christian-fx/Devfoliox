"use client";
import { useState, useEffect } from "react";
import { getGitHubData } from "../services/github";
import { config } from "../config";
import Header from "../components/Header";
import Stats from "../components/Stats";
import Projects from "../components/Projects";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        if (config.githubUsername && config.githubUsername !== "placeholder") {
          setUserData(await getGitHubData(config.githubUsername));
        } else {
          setError("GitHub username not found. Please check config.js.");
        }
      } catch (err) {
        setError("Failed to initialize portfolio data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 md:px-10 py-20 animate-pulse bg-slate-50 min-h-screen">
        <div className="h-12 bg-slate-200 w-32 md:w-48 mb-10 rounded"></div>
        <div className="h-24 md:h-32 bg-slate-200 w-full md:w-3/4 mb-20 rounded"></div>
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 bg-slate-200 rounded-xl w-full" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-20 text-center text-red-500 font-sans bg-slate-50 min-h-screen flex items-center justify-center">
        {error}
      </div>
    );
  }

  if (!userData?.repos || userData.repos.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-center items-center px-6 text-center">
        <p className="text-black font-sans text-xl md:text-2xl font-bold mb-4">
          No Public Repositories Found
        </p>
        <p className="text-slate-500 font-sans text-sm md:text-base">
          This GitHub user doesn't have any public repositories.
        </p>
      </div>
    );
  }

  const { profile, repos } = userData;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-serif selection:bg-[#f85d5d] overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-8 max-w-4xl mx-auto font-sans">
        <div className="text-lg md:text-xl font-bold tracking-tighter">
          {profile.name
            ?.split(" ")
            .map((n) => n[0])
            .join(".")
            .toUpperCase() || "DEV"}
        </div>
        <div className="flex gap-4 md:gap-8 text-[10px] md:text-sm text-slate-500 font-medium uppercase tracking-widest">
          <a href="#about" className="hover:text-black transition-colors">
            About
          </a>
          <a href="#projects" className="hover:text-black transition-colors">
            Projects
          </a>
          <a href="#contact" className="hover:text-black transition-colors">
            Contact
          </a>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 md:px-10">
        <Header profile={profile} />
        <Stats profile={profile} />
        <Projects repos={repos} />
        <Contact profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  );
}
