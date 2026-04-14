"use client";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FiCode, FiUsers } from "react-icons/fi";

import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiHtml5,
  SiCss,
  SiReact,
  SiNodedotjs,
} from "react-icons/si";

// Helper function to map language names to icons
const getLanguageIcon = (lang) => {
  const languageMap = {
    javascript: SiJavascript,
    typescript: SiTypescript,
    python: SiPython,
    html: SiHtml5,
    css: SiCss,
    react: SiReact,
    node: SiNodedotjs,
  };
  // Fallback to a generic code icon if the language isn't in the map
  return languageMap[lang.toLowerCase()] || FiCode;
};

export default function Stats({ profile, repos, totalStars, langStats }) {
  const stats = [
    { label: "Repositories", value: profile.public_repos, Icon: FiCode },
    { label: "Stars", value: totalStars, Icon: FaStar },
    { label: "Followers", value: profile.followers, Icon: FiUsers },
    { label: "Following", value: profile.following, Icon: FiUsers },
  ];

  return (
    <section className="mb-20 md:mb-32">
      {/* Top Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-20 md:mb-32">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-colors group"
          >
            <div className="text-primary mb-6 group-hover:scale-110 transition-transform">
              <s.Icon size={32} />
            </div>
            <div className="font-sans font-bold text-4xl md:text-5xl text-white mb-2">
              {s.value}
            </div>
            <div className="font-sans text-sm text-slate-500 font-medium">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Language & Tools - Card Grid Design */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-sans font-bold text-3xl md:text-4xl text-white tracking-tight">
            Languages & Tools
          </h2>
          <span className="font-mono text-[10px] uppercase text-slate-500 tracking-widest hidden md:block">
            RITHID ID: 127YLS 89118
          </span>
        </div>

        {/* Updated Grid Layout for Languages */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {langStats.map((item, i) => {
            const LangIcon = getLanguageIcon(item.lang);

            return (
              <motion.div
                key={item.lang}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center justify-center p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all group"
              >
                {/* Centered Icon with subtle background */}
                <div className="h-14 w-14 rounded-full bg-slate-800/40 flex items-center justify-center mb-4 text-primary group-hover:scale-110 transition-transform duration-300">
                  <LangIcon size={28} />
                </div>

                {/* Language Name */}
                <span className="font-sans font-bold text-base text-white uppercase tracking-wider mb-1">
                  {item.lang}
                </span>

                {/* Percentage/Score */}
                <span className="font-mono text-sm text-slate-500 mb-6">
                  {item.pct}%
                </span>

                {/* Mini Visual Bar (Satisfies Acceptance Criteria) */}
                <div className="h-1.5 w-full bg-slate-800/50 rounded-full overflow-hidden w-full max-w-[80%] mt-auto">
                  <motion.div
                    className="h-full bg-primary rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${item.pct}%` }}
                    viewport={{ once: true }}
                    transition={{
                      delay: 0.2 + i * 0.1,
                      duration: 0.8,
                      ease: "easeOut",
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
