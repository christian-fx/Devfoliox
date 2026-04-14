"use client";
import { motion } from "framer-motion";

import { FaGithub, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiMapPin } from "react-icons/fi";

export default function Header({ profile, isMobile, fadeUp, fadeIn }) {
  const navLinks = ["Home", "Projects", "Contact"];

  return (
    <>
      {/* Top Navigation */}
      <nav className="flex items-center justify-between py-8 md:py-12">
        <div className="flex items-center gap-2">
          <span className="font-sans font-bold text-xl md:text-2xl text-white tracking-tighter">
            {profile.name || "The Octocat"}
          </span>
        </div>

        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="text-slate-400 hover:text-white font-sans text-sm font-medium transition-colors"
            >
              {link}
            </a>
          ))}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-12 md:pt-20 pb-20 md:pb-32">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 text-center lg:text-left">
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="font-sans font-bold text-6xl md:text-8xl lg:text-9xl text-white tracking-tight leading-[0.9] mb-6"
            >
              {profile.name || "The Octocat"}
            </motion.h1>

            <motion.p
              custom={2}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="text-xl md:text-2xl text-slate-400 font-sans mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {profile.bio ||
                "Building things for the web — open to collaborate."}
            </motion.p>

            {/* Social Links */}
            <motion.div
              custom={3}
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap justify-center lg:justify-start gap-6 text-slate-500 text-sm font-sans mb-12"
            >
              {profile.location && (
                <div className="flex items-center gap-2">
                  <FiMapPin size={16} className="text-primary" />{" "}
                  {profile.location}
                </div>
              )}
              <a
                href={profile.html_url}
                target="_blank"
                className="flex items-center gap-2 hover:text-white transition-colors"
              >
                <FaGithub size={16} className="text-primary" /> GitHub
              </a>
              <div className="flex items-center gap-2">
                <FaInstagram size={16} className="text-primary" /> Atare to
                usame
              </div>
              <div className="flex items-center gap-2">
                <FaTwitter size={16} className="text-primary" /> Twitter
              </div>
            </motion.div>

            {/* Buttons */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            >
              <a
                href="#projects"
                className="bg-primary text-white px-8 py-4 rounded-lg font-bold hover:opacity-90 transition-opacity text-center text-lg"
              >
                View Projects
              </a>
              <a
                href="#contact"
                className="border border-primary text-white px-8 py-4 rounded-lg font-bold hover:bg-primary/10 transition-colors text-center text-lg"
              >
                Get in Touch
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="shrink-0 relative"
          >
            <div className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-8 border-slate-800/50 bg-slate-800">
              <img
                src={profile.avatar_url}
                alt={profile.name}
                className="w-full h-full object-cover grayscale opacity-80"
              />
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
