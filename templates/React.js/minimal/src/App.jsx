import { useState, useEffect } from "react";
import { getGitHubData } from "./services/github";
import { motion, AnimatePresence } from "framer-motion";
import { GITHUB_USERNAME } from "./config";

const Icon = ({ name, className = "" }) => (
  <span
    className={`material-symbols-outlined ${className}`}
    style={{ verticalAlign: "middle", fontSize: "inherit" }}
  >
    {name}
  </span>
);

const fadeInUp = {
  initial: { opacity: 0, y: 15 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
};

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (GITHUB_USERNAME && GITHUB_USERNAME !== "placeholder") {
        const data = await getGitHubData(GITHUB_USERNAME);
        setUserData(data);
      }
      setLoading(false);
    };
    init();
  }, []);

  if (loading || !userData)
    return (
      <div className="min-h-screen bg-white flex items-center justify-center animate-pulse text-slate-400 font-medium font-sans">
        Loading...
      </div>
    );

  return (
    <div className="min-h-screen bg-white text-slate-950 font-['Space_Grotesk'] selection:bg-teal-50 antialiased">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b border-slate-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="text-xl font-bold tracking-tighter text-teal-600 flex items-center gap-1">
            <span>&lt;dev</span>
            <span className="text-indigo-500">/&gt;</span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
            {["About", "Stack", "Projects", "Experience", "Contact"].map(
              (item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="hover:text-teal-50 transition-colors"
                >
                  {item}
                </a>
              ),
            )}
          </div>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "close" : "menu"} className="text-2xl" />
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-32 pb-20 px-6 max-w-5xl mx-auto text-center">
        <motion.span
          {...fadeInUp}
          className="text-teal-500 text-[10px] font-bold tracking-[0.4em] uppercase mb-6 block"
        >
          Full-Stack Developer
        </motion.span>
        <motion.h1
          {...fadeInUp}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-bold tracking-tighter mb-8 leading-[1.1]"
        >
          Hi, I'm{" "}
          <span className="bg-linear-to-r from-teal-400 to-indigo-500 bg-clip-text text-transparent">
            {userData.profile.name || userData.profile.login}
          </span>
        </motion.h1>
        <motion.p
          {...fadeInUp}
          transition={{ delay: 0.2 }}
          className="text-base md:text-lg text-slate-500 max-w-xl mx-auto mb-10 leading-relaxed font-normal"
        >
          {userData.profile.bio ||
            "Building efficient, scalable web apps and websites."}
        </motion.p>
        <div className="flex justify-center gap-4">
          <a
            href="#projects"
            className="bg-slate-900 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-teal-600 transition-all shadow-xl shadow-slate-200"
          >
            View Work
          </a>
          <a
            href="#contact"
            className="border border-slate-200 px-6 py-3 rounded-full text-sm font-bold hover:bg-slate-50 transition-all"
          >
            Contact
          </a>
        </div>
      </header>

      {/* About & Stats Section */}
      <section
        id="about"
        className="py-20 px-6 max-w-5xl mx-auto border-t border-slate-50"
      >
        <div className="grid md:grid-cols-5 gap-16 items-start">
          <motion.div {...fadeInUp} className="md:col-span-3">
            <span className="text-teal-500 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 block">
              About
            </span>
            <h2 className="text-3xl font-bold mb-8 tracking-tight">
              A bit about{" "}
              <span className="text-indigo-600 bg-indigo-50 px-3 rounded-lg">
                me
              </span>
            </h2>
            <p className="text-slate-500 text-base leading-relaxed font-normal mb-8">
              Currently based in Enugu, Nigeria. I'm a developer passionate
              about building live, data-driven applications.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                { label: "Repos", val: userData.profile.public_repos },
                { label: "Followers", val: userData.profile.followers },
                { label: "Following", val: userData.profile.following },
                {
                  label: "Stars",
                  val: userData.repos.reduce(
                    (acc, r) => acc + r.stargazers_count,
                    0,
                  ),
                },
              ].map((stat, i) => (
                <div
                  key={i}
                  className="bg-white border border-slate-100 p-4 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.01)]"
                >
                  <span className="block text-xl font-bold text-slate-800 tracking-tight">
                    {stat.val}
                  </span>
                  <span className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <div className="md:col-span-2 flex flex-wrap gap-2.5">
            {[
              "React",
              "TypeScript",
              "Node.js",
              "PostgreSQL",
              "TailwindCSS",
            ].map((skill) => (
              <span
                key={skill}
                className="px-5 py-2 bg-slate-100 text-slate-600 rounded-full text-[13px] font-semibold border border-slate-200"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section
        id="stack"
        className="py-20 bg-slate-50/50 border-y border-slate-100 px-6"
      >
        <div className="max-w-5xl mx-auto">
          <span className="text-teal-500 text-[10px] font-bold uppercase tracking-widest mb-4 block">
            Technologies
          </span>
          <h2 className="text-3xl font-bold mb-16 tracking-tight text-[#1E293B]">
            My <span className="text-indigo-500">tech stack</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "Frontend",
                skills: ["React", "Next.js", "TypeScript", "TailwindCSS"],
                icon: "web",
              },
              {
                title: "Backend",
                skills: ["Node.js", "Express", "Python", "PostgreSQL"],
                icon: "database",
              },
              {
                title: "Tools",
                skills: ["Git", "Docker", "AWS", "Figma"],
                icon: "terminal",
              },
            ].map((cat, i) => (
              <motion.div
                key={i}
                {...fadeInUp}
                className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100"
              >
                <Icon name={cat.icon} className="text-teal-500 text-2xl mb-6" />
                <h3 className="text-slate-800 text-xs font-black uppercase mb-6 tracking-widest">
                  {cat.title}
                </h3>
                <div className="flex flex-wrap gap-2.5">
                  {cat.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-4 py-1.5 bg-slate-50 text-slate-500 rounded-md text-xs font-bold border border-slate-100"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20 px-6 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold mb-12 tracking-tight text-[#1E293B]">
          Selected Work
        </h2>
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {userData.repos.slice(0, 4).map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              {...fadeInUp}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-[0_10px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] hover:-translate-y-1 transition-all group"
            >
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-lg font-bold tracking-tight group-hover:text-teal-500">
                  {repo.name}
                </h3>
                <Icon
                  name="arrow_outward"
                  className="text-slate-300 group-hover:text-teal-500 text-xl"
                />
              </div>
              <p className="text-slate-400 text-sm mb-6 line-clamp-2 leading-relaxed">
                {repo.description || "Project built with modern technologies."}
              </p>
              <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-3 py-1 rounded-md uppercase tracking-widest">
                {repo.language || "Web"}
              </span>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section
        id="experience"
        className="py-20 px-6 max-w-3xl mx-auto border-t border-slate-50"
      >
        <h2 className="text-3xl font-bold mb-12 tracking-tight">Experience</h2>
        <div className="space-y-12">
          {[
            {
              role: "Senior Frontend Engineer",
              co: "TechCorp",
              date: "2023 — Now",
            },
            {
              role: "Full-Stack Developer",
              co: "StartupLab",
              date: "2021 — 2023",
            },
          ].map((job, i) => (
            <motion.div key={i} {...fadeInUp} className="flex gap-6">
              <div className="text-[11px] font-bold text-slate-300 w-24 shrink-0 pt-1.5 uppercase tracking-widest">
                {job.date}
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{job.role}</h3>
                <p className="text-teal-600 text-sm font-medium mb-2">
                  {job.co}
                </p>
                <p className="text-slate-400 text-sm leading-relaxed">
                  Building design systems and high-performance React
                  applications.
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Footer */}
      <footer
        id="contact"
        className="py-32 px-6 bg-slate-50 border-t border-slate-100 text-center"
      >
        <h2 className="text-5xl font-bold mb-12 tracking-tighter italic">
          Let's <span className="text-teal-500">connec</span>
          <span className="text-indigo-500">t</span>
        </h2>
        <div className="flex flex-wrap justify-center gap-4 max-w-3xl mx-auto">
          {/* Email */}
          <a
            href="#"
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 flex-1 min-w-50 hover:shadow-md transition-all group"
          >
            <div className="bg-teal-50 p-2.5 rounded-xl text-teal-600 group-hover:scale-110 transition-transform">
              <Icon name="mail" className="text-2xl" />
            </div>
            <div className="text-left">
              <div className="text-[9px] font-bold text-slate-300 uppercase">
                Email
              </div>
              <div className="font-bold text-slate-700 text-xs">Email Me</div>
            </div>
          </a>
          {/* LinkedIn */}
          <a
            href="#"
            target="_blank"
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 flex-1 min-w-50 hover:shadow-md transition-all group"
          >
            <div className="bg-blue-50 p-2.5 rounded-xl text-[#0A66C2] group-hover:scale-110 transition-transform">
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.476-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.98 0 1.771-.773 1.771-1.729V1.729C24 .774 23.205 0 22.225 0z" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[9px] font-bold text-slate-300 uppercase">
                LinkedIn
              </div>
              <div className="font-bold text-slate-700 text-xs">LinkedIn</div>
            </div>
          </a>
          {/* GitHub */}
          <a
            href={userData.profile.html_url}
            target="_blank"
            className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 flex-1 min-w-50 hover:shadow-md transition-all group"
          >
            <div className="bg-slate-100 p-2.5 rounded-xl text-[#181717] group-hover:scale-110 transition-transform">
              <svg
                role="img"
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
              </svg>
            </div>
            <div className="text-left">
              <div className="text-[9px] font-bold text-slate-300 uppercase">
                GitHub
              </div>
              <div className="font-bold text-slate-700 text-xs">GitHub</div>
            </div>
          </a>
        </div>
        <div className="pt-10 mt-16 text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
          © 2026 {userData.profile.name}. Handcrafted with React & Tailwind CSS.
        </div>
      </footer>
    </div>
  );
}
