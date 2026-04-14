import { useState, useEffect } from "react";
import { getGitHubData } from "./services/github";
import { motion } from "framer-motion";
import { Mail, User, ExternalLink, MessageSquare } from "lucide-react";
// Step 1: Import the variable the CLI creates/updates
import { GITHUB_USERNAME } from "./config";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6 }
};

const SkeletonCard = () => (
  <div className="animate-pulse border border-slate-100 p-6 md:p-8 rounded-xl aspect-square md:aspect-4/3">
    <div className="h-6 bg-slate-200 rounded w-1/2 mb-4"></div>
    <div className="h-4 bg-slate-100 rounded w-full mb-2"></div>
    <div className="h-4 bg-slate-100 rounded w-2/3"></div>
  </div>
);

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const initPortfolio = async () => {
      try {
        // Step 2: Use the imported GITHUB_USERNAME directly.
        // The CLI replaces "placeholder" with the real username automatically.
        if (GITHUB_USERNAME && GITHUB_USERNAME !== "placeholder") {
          const data = await getGitHubData(GITHUB_USERNAME);
          setUserData(data);
        } else {
          setError("GitHub username not found. Please check src/config.js.");
        }
      } catch (err) {
        setError("Failed to initialize portfolio data.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    initPortfolio();
  }, []);

  if (loading)
    return (
      <div className="max-w-7xl mx-auto px-6 md:px-10 py-20 animate-pulse bg-canvas min-h-screen">
        <div className="h-12 bg-slate-200 w-32 md:w-48 mb-10 rounded"></div>
        <div className="h-24 md:h-32 bg-slate-100 w-full md:w-3/4 mb-20 rounded"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2, 3, 4].map((i) => <SkeletonCard key={i} />)}
        </div>
      </div>
    );

  if (error) return <div className="p-20 text-center text-red-500 font-sans bg-canvas min-h-screen">{error}</div>;

  return (
    <div className="min-h-screen bg-canvas text-ink font-serif selection:bg-teal-100 overflow-x-hidden">
      {/* Navigation */}
      <nav className="flex justify-between items-center px-6 md:px-10 py-8 max-w-7xl mx-auto font-sans">
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          className="text-lg md:text-xl font-bold tracking-tighter"
        >
          {userData.profile.name?.split(" ").map((n) => n[0]).join(".").toUpperCase()}.
        </motion.div>
        <div className="flex gap-4 md:gap-8 text-[10px] md:text-sm text-slate-500 font-medium uppercase tracking-widest">
          <a href="#about" className="hover:text-black transition-colors">About</a>
          <a href="#projects" className="hover:text-black transition-colors">Projects</a>
          <a href="#contact" className="hover:text-black transition-colors">Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="px-6 md:px-10 py-16 md:py-24 max-w-7xl mx-auto">
        <motion.span 
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-[10px] md:text-xs uppercase tracking-[0.3em] font-sans text-slate-400 mb-6 block font-semibold"
        >
          Portfolio
        </motion.span>
        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-8 md:mb-10 leading-[1.1] md:leading-[0.9]"
        >
          {userData.profile.name || userData.profile.login}
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg md:text-2xl lg:text-3xl text-slate-500 max-w-2xl font-sans font-light leading-relaxed"
        >
          {userData.profile.bio || "Software Engineer crafting thoughtful digital experiences with clean code."}
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-10 md:mt-12 flex flex-col sm:flex-row gap-4 font-sans"
        >
          <a href="#projects" className="bg-brand text-white px-8 py-4 rounded-lg font-medium hover:bg-brand-dark transition-colors text-center">
            View Work
          </a>
          <a href="#contact" className="bg-white border border-slate-200 px-8 py-4 rounded-lg font-medium hover:border-slate-400 transition-colors text-center">
            Get in Touch
          </a>
        </motion.div>
      </header>

      {/* About Section */}
      <section id="about" className="px-6 md:px-10 py-20 md:py-32 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 border-t border-slate-200">
        <motion.div {...fadeInUp}>
          <h2 className="text-4xl md:text-5xl font-medium mb-6 md:mb-10 tracking-tight">About</h2>
          <p className="text-lg md:text-xl text-slate-500 font-sans leading-relaxed">
            I'm a developer with a passion for building live, data-driven applications. 
            Currently active on GitHub with {userData.profile.public_repos} public projects.
          </p>
        </motion.div>
        <motion.div {...fadeInUp} transition={{ delay: 0.2 }} className="font-sans">
          <span className="text-[10px] md:text-xs uppercase tracking-widest text-slate-400 font-bold block mb-6 md:mb-8">
            GitHub Stats
          </span>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <span className="text-3xl md:text-4xl font-medium block">{userData.profile.followers}</span>
              <span className="text-xs md:text-sm text-slate-400">Followers</span>
            </div>
            <div>
              <span className="text-3xl md:text-4xl font-medium block">{userData.profile.public_repos}</span>
              <span className="text-xs md:text-sm text-slate-400">Repositories</span>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-6 md:px-10 py-20 md:py-32 max-w-7xl mx-auto border-t border-slate-200">
        <motion.h2 {...fadeInUp} className="text-4xl md:text-5xl font-medium mb-12 md:mb-16 tracking-tight">Projects</motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {userData.repos.map((repo, i) => (
            <motion.a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white border border-slate-100 p-8 md:p-10 rounded-2xl hover:border-teal-500/30 hover:shadow-xl transition-all group flex flex-col justify-between aspect-square md:aspect-4/3"
            >
              <div>
                <div className="flex justify-between items-start mb-6">
                  <h3 className="text-2xl md:text-3xl font-medium tracking-tight group-hover:text-brand transition-colors line-clamp-1">
                    {repo.name}
                  </h3>
                  <span className="text-xl md:text-2xl text-slate-300 group-hover:text-brand transition-transform group-hover:-rotate-45">↗</span>
                </div>
                <p className="text-sm md:text-lg text-slate-500 font-sans leading-relaxed line-clamp-3 md:line-clamp-4">
                  {repo.description || "Open source project built and shared on GitHub."}
                </p>
              </div>
              <div className="mt-8 flex items-center gap-6 font-sans text-[10px] font-semibold text-slate-400 uppercase tracking-widest">
                <span className="flex items-center gap-1">★ {repo.stargazers_count}</span>
                <span>{repo.language || "Web"}</span>
              </div>
            </motion.a>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <footer id="contact" className="px-6 md:px-10 py-24 md:py-40 max-w-7xl mx-auto text-center border-t border-slate-200">
        <motion.div {...fadeInUp}>
          <h2 className="text-5xl md:text-6xl font-serif mb-6 tracking-tighter">Get in Touch</h2>
          <p className="text-lg md:text-xl text-slate-500 font-sans mb-12 max-w-md mx-auto">
            Interested in working together? Feel free to reach out.
          </p>

          <a href={`mailto:${userData.profile.email || "hello@portfolio.dev"}`}
            className="bg-brand text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-medium inline-flex items-center gap-3 hover:bg-brand-dark transition-colors font-sans text-base md:text-lg mb-16 shadow-lg shadow-teal-900/10"
          >
            <Mail size={20} />
            <span className="truncate max-w-45 md:max-w-none">
              {userData.profile.email || "hello@portfolio.dev"}
            </span>
          </a>

          <div className="flex justify-center gap-4 md:gap-6">
            {[
              { Icon: User, url: userData.profile.html_url },
              { Icon: ExternalLink, url: "#" },
              { Icon: MessageSquare, url: "#" },
            ].map((social, i) => (
              <motion.a
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-brand hover:border-brand transition-all"
              >
                <social.Icon size={18} />
              </motion.a>
            ))}
          </div>

          <div className="mt-24 md:mt-32 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-300 uppercase tracking-widest font-sans">
            <div>
              © {new Date().getFullYear()} {userData.profile.name}. All rights reserved.
            </div>
            <a href="https://github.com/christian-fx/Devfolio" target="_blank" rel="noreferrer" className="hover:text-brand transition-colors flex items-center gap-1">
              Built with Devfolio
            </a>
          </div>
        </motion.div>
      </footer>
    </div>
  );
}

export default App;