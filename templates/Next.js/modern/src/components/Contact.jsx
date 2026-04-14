"use client";
import { motion } from "framer-motion";

import { FaGithub } from "react-icons/fa";
import { FiMail, FiCode } from "react-icons/fi";

export default function Contact({ profile }) {
  return (
    <section
      id="contact"
      className="pb-32 md:pb-48 pt-12 relative overflow-hidden"
    >
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55 }}
        className="flex flex-col items-center text-center py-20 md:py-32 rounded-3xl border border-border/50 bg-card/30 relative"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80%] h-[1px] bg-gradient-to-r from-transparent via-primary/50 to-transparent" />

        <h2 className="font-sans font-bold text-4xl md:text-7xl text-white tracking-tight leading-tight mb-8 max-w-2xl">
          Got a project?
        </h2>

        <p className="text-slate-400 text-lg md:text-xl max-w-lg leading-relaxed mb-12">
          I'm currently available for freelance work and F-S-time roles. Drop me
          a message and let's figure it out.
        </p>

        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto justify-center">
          <a
            href="#projects"
            className="bg-primary text-white px-10 py-5 rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-3 shadow-xl shadow-primary/20 text-lg"
          >
            <FiCode size={20} /> View Projects
          </a>
          <a
            href={`mailto:${profile.email || "hello@portfolio.dev"}`}
            className="border border-border text-white px-10 py-5 rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center justify-center gap-3 text-lg"
          >
            <FiMail size={20} /> Get in Touch
          </a>
        </div>
      </motion.div>
    </section>
  );
}
