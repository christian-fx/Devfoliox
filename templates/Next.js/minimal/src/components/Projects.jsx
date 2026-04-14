"use client";
import ProjectCard from "./ProjectCard";

export default function Projects({ repos }) {
  return (
    <section id="projects" className="py-20 md:py-32 border-b border-slate-200">
      <h2 className="text-4xl md:text-5xl font-medium mb-12 md:mb-16 tracking-tight">
        Projects
      </h2>
      <div className="flex flex-col gap-4">
        {repos.map((repo) => (
          <ProjectCard key={repo.id} repo={repo} />
        ))}
      </div>
    </section>
  );
}
