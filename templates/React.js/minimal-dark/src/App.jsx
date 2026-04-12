import { useState, useEffect } from "react";
import { getGitHubData } from "./services/github";
import { motion, AnimatePresence } from "framer-motion";
import { GITHUB_USERNAME } from "./config";

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const Icon = ({ name, className = "" }) => (
  <span className={`material-symbols-outlined ${className}`} style={{ verticalAlign: 'middle' }}>
    {name}
  </span>
);

export default function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // New state for menu

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

  if (loading || !userData) return <div className="bg-canvas min-h-screen flex items-center justify-center text-ink">Loading Portfolio...</div>;

  return (
    <div className="bg-canvas text-ink font-sans selection:bg-brand/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-canvas/80 backdrop-blur-md border-b border-border">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <span className="text-xl font-bold tracking-tighter">portfolio<span className="text-brand">.</span></span>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 text-sm font-medium text-muted">
            {['About', 'Projects', 'Experience', 'Contact'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-brand transition-colors">{item}</a>
            ))}
          </div>

          {/* Hamburger Button (Mobile) */}
          <button 
            className="md:hidden text-ink flex items-center"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Icon name={isMenuOpen ? "close" : "menu"} className="text-3xl" />
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="absolute top-full left-0 w-full bg-canvas border-b border-border py-8 flex flex-col items-center gap-6 md:hidden"
            >
              {['About', 'Projects', 'Experience', 'Contact'].map(item => (
                <a 
                  key={item} 
                  href={`#${item.toLowerCase()}`} 
                  onClick={() => setIsMenuOpen(false)}
                  className="text-lg font-medium text-muted hover:text-brand transition-colors"
                >
                  {item}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center px-6 pt-20">
        <motion.span {...fadeInUp} className="text-brand text-xs font-bold tracking-[0.3em] uppercase mb-4">
          Software Developer
        </motion.span>
        <motion.h1 {...fadeInUp} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl font-bold tracking-tight mb-6">
          Hi, I'm <span className="text-brand font-serif italic">{userData.profile.name || userData.profile.login}</span>
        </motion.h1>
        <motion.p {...fadeInUp} transition={{ delay: 0.3 }} className="text-muted text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          {userData.profile.bio || "I craft clean, performant digital experiences with a focus on thoughtful design."}
        </motion.p>
        <div className="flex gap-4">
          <a href="#projects" className="bg-brand text-black px-8 py-3 rounded-lg font-bold hover:brightness-110 transition-all">View Work</a>
          <a href="#contact" className="border border-border px-8 py-3 rounded-lg font-bold hover:bg-white/5 transition-all">Get in Touch</a>
        </div>
        <motion.div animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="mt-20 text-muted">
          <Icon name="keyboard_double_arrow_down" className="text-3xl" />
        </motion.div>
      </section>

      {/* About & Skills */}
      <section id="about" className="py-32 max-w-4xl mx-auto px-6">
        <span className="text-brand text-xs font-bold uppercase tracking-widest mb-4 block">About</span>
        <h2 className="text-4xl font-bold mb-8">A bit about me</h2>
        <p className="text-muted text-lg leading-relaxed mb-12">
          I'm a full-stack developer passionate about building web applications that are fast, accessible, and delightful to use.
        </p>
        <div className="flex flex-wrap gap-3">
          {['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Tailwind CSS', 'Next.js', 'Git'].map(skill => (
            <span key={skill} className="px-4 py-2 bg-card border border-border rounded-full text-sm font-medium hover:border-brand/50 transition-colors">
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-32 max-w-4xl mx-auto px-6 border-t border-border">
        <span className="text-brand text-xs font-bold uppercase tracking-widest mb-4 block">Experience</span>
        <h2 className="text-4xl font-bold mb-16">Where I've worked</h2>
        <div className="space-y-12">
          {[
            { role: "Senior Frontend Developer", co: "TechCorp", date: "2022 — Present" },
            { role: "Full-Stack Developer", co: "StartupXYZ", date: "2020 — 2022" }
          ].map((job, i) => (
            <div key={i} className="relative pl-8 border-l-2 border-border group">
              <div className="absolute -left-2.25 top-0 w-4 h-4 bg-canvas border-2 border-brand rounded-full group-hover:scale-125 transition-transform" />
              <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-2">
                <h3 className="text-xl font-bold">{job.role} <span className="text-muted font-normal text-lg">@ {job.co}</span></h3>
                <span className="text-muted text-sm">{job.date}</span>
              </div>
              <p className="text-muted leading-relaxed">Leading the frontend architecture and building scalable user experiences.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-32 max-w-6xl mx-auto px-6 border-t border-border">
        <h2 className="text-4xl font-bold mb-16">Selected work</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {userData.repos.slice(0, 4).map(repo => (
            <a key={repo.id} href={repo.html_url} target="_blank" className="bg-card border border-border p-8 rounded-2xl hover:border-brand/30 transition-all group">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold group-hover:text-brand transition-colors">{repo.name}</h3>
                <Icon name="open_in_new" className="text-muted group-hover:text-brand" />
              </div>
              <p className="text-muted mb-6 line-clamp-2">{repo.description || "Modern web application built with best practices."}</p>
              <div className="flex gap-3">
                <span className="text-xs font-bold text-muted bg-white/5 px-3 py-1 rounded capitalize">{repo.language || 'Code'}</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="py-32 text-center border-t border-border">
        <span className="text-brand text-xs font-bold uppercase mb-4 block">Contact</span>
        <h2 className="text-5xl font-bold mb-10">Let's connect</h2>
        <div className="flex flex-wrap justify-center gap-8 text-muted mb-20">
          <a href="#" className="flex items-center gap-2 hover:text-ink transition-colors"><Icon name="mail" /> Email</a>
          <a href="#" className="flex items-center gap-2 hover:text-ink transition-colors"><Icon name="code" /> GitHub</a>
          <a href="#" className="flex items-center gap-2 hover:text-ink transition-colors"><Icon name="person" /> LinkedIn</a>
        </div>
        <div className="flex justify-between items-center max-w-6xl mx-auto px-6 pt-10 border-t border-border text-sm text-muted">
          <p>© 2026 {userData.profile.name}. All rights reserved.</p>
          <p>Built with React & Tailwind CSS</p>
        </div>
      </footer>
    </div>
  );
}