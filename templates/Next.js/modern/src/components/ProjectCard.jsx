"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaStar, FaCodeBranch } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

export default function ProjectCard({ repo }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* The visible card in the grid */}
      <motion.div
        layout
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.97 }}
        transition={{ duration: 0.3 }}
        onClick={() => setIsOpen(true)}
        className="cursor-pointer group flex flex-col justify-between p-8 rounded-2xl border border-border/50 bg-card hover:border-primary/40 transition-all min-h-[260px] relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-12 -mt-12 transition-all group-hover:scale-110" />

        <div>
          <div className="mb-6 flex items-center justify-between">
            <div className="text-primary group-hover:scale-110 transition-transform">
              <FaGithub size={28} />
            </div>
          </div>
          <h3 className="font-sans font-bold text-2xl text-white tracking-tight mb-3 group-hover:text-primary transition-colors">
            {repo.name}
          </h3>
          <p className="text-sm text-slate-400 leading-relaxed line-clamp-2 mb-6">
            {repo.description || "Open-source project on GitHub."}
          </p>
        </div>

        <div className="mt-auto pt-6 border-t border-border/50 flex items-center justify-between text-xs font-sans font-bold uppercase tracking-wider text-slate-500">
          <div className="flex items-center gap-4">
            {repo.language && (
              <span className="text-primary">{repo.language}</span>
            )}
            <span className="flex items-center gap-1.5">
              <FaStar size={14} /> {repo.stargazers_count}
            </span>
            {repo.forks_count > 0 && (
              <span className="flex items-center gap-1.5">
                <FaCodeBranch size={14} /> {repo.forks_count}
              </span>
            )}
          </div>
        </div>
      </motion.div>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-background/80 backdrop-blur-md"
            />
            <motion.div
              layoutId={repo.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-2xl bg-card border border-border rounded-3xl p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-6 right-6 p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/50 hover:bg-primary transition-colors z-10"
              >
                <IoClose size={20} />
              </button>

              <div className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/10">
                <span className="font-sans text-[10px] font-bold uppercase tracking-widest text-primary">
                  {repo.language || "Project"}
                </span>
              </div>

              <h2 className="font-sans font-bold text-3xl md:text-5xl text-white mb-6 pr-10 tracking-tight">
                {repo.name}
              </h2>
              <p className="text-slate-300 text-lg md:text-xl leading-relaxed mb-10">
                {repo.description ||
                  "No description provided for this repository."}
              </p>

              <div className="flex flex-wrap items-center gap-8 font-sans text-sm font-bold text-slate-400 mb-12 uppercase tracking-wider">
                <div className="flex items-center gap-2 text-white">
                  <FaStar size={20} className="text-primary" />{" "}
                  {repo.stargazers_count} Stars
                </div>
                {repo.forks_count > 0 && (
                  <div className="flex items-center gap-2 text-white">
                    <FaCodeBranch size={20} className="text-primary" />{" "}
                    {repo.forks_count} Forks
                  </div>
                )}
                <div className="text-slate-500">
                  {new Date(repo.updated_at).toLocaleDateString(undefined, {
                    month: "long",
                    year: "numeric",
                  })}
                </div>
              </div>

              <div className="flex gap-4">
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noreferrer"
                  className="bg-primary text-white px-10 py-5 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center gap-3 text-lg shadow-xl shadow-primary/20"
                >
                  <FiExternalLink size={20} /> View on GitHub
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
