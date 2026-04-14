"use client";
import { useState } from "react";
import ProjectCard from "./ProjectCard";
import { motion, AnimatePresence } from "framer-motion";

export default function Projects({ repos, languages }) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filteredRepos =
    activeFilter === "All"
      ? repos
      : repos.filter((r) => r.language === activeFilter);

  return (
    <section id="projects" className="mb-20 md:mb-32">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h2 className="font-sans font-bold text-4xl md:text-5xl text-white tracking-tight">
            Projects
          </h2>
        </div>

        <div className="flex gap-3 overflow-x-auto pb-4 md:pb-0 hide-scrollbar flex-nowrap md:flex-wrap">
          {["All", ...languages.slice(0, 3)].map((lang) => (
            <button
              key={lang}
              onClick={() => setActiveFilter(lang)}
              className={`shrink-0 px-6 py-2 rounded-full font-sans text-xs md:text-sm font-bold transition-all border ${
                activeFilter === lang
                  ? "bg-primary border-primary text-white shadow-lg shadow-primary/20"
                  : "bg-transparent border-border text-slate-400 hover:border-slate-600"
              }`}
            >
              {lang}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredRepos.map((repo) => (
            <ProjectCard key={repo.id} repo={repo} />
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
