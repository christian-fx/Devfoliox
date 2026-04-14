"use client";
import { useState } from "react";
import { FiChevronDown, FiChevronUp, FiExternalLink } from "react-icons/fi";

export default function ProjectCard({ repo }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden hover:border-[#f85d5d] transition-colors bg-white">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left p-6 md:p-8 flex justify-between items-center focus:outline-none"
      >
        <div>
          <h3 className="text-xl md:text-2xl font-medium tracking-tight mb-2">
            {repo.name}
          </h3>
          <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-sans text-slate-400 font-semibold">
            {repo.language && <span>{repo.language}</span>}
            <span>★ {repo.stargazers_count}</span>
          </div>
        </div>
        <div className="text-slate-300">
          {isExpanded ? <FiChevronUp size={24} /> : <FiChevronDown size={24} />}
        </div>
      </button>

      {isExpanded && (
        <div className="px-6 md:px-8 pb-8 pt-2 animate-in fade-in slide-in-from-top-4 duration-300 border-t border-slate-100">
          <p className="text-base md:text-lg text-slate-500 font-sans leading-relaxed mb-6 mt-6">
            {repo.description ||
              "Open source project built and shared on GitHub."}
          </p>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-sans font-medium text-[#f85d5d] hover:text-[#f85d5d] transition-colors"
          >
            Review Source Code <FiExternalLink size={16} />
          </a>
        </div>
      )}
    </div>
  );
}
