"use client";
import { FiMail, FiUser, FiExternalLink } from "react-icons/fi";

export default function Contact({ profile }) {
  return (
    <section
      id="contact"
      className="py-24 md:py-40 text-center border-b border-slate-200"
    >
      <h2 className="text-5xl md:text-6xl font-medium mb-6 tracking-tighter">
        Get in Touch
      </h2>
      <p className="text-lg md:text-xl text-slate-500 font-sans mb-12 max-w-md mx-auto">
        Interested in working together? Feel free to reach out.
      </p>

      <a
        href={`mailto:${profile.email || "hello@portfolio.dev"}`}
        className="bg-[#f85d5d] text-white px-8 md:px-10 py-4 md:py-5 rounded-xl font-medium inline-flex items-center justify-center gap-3 hover:bg-[#f85d5d] transition-colors font-sans text-base md:text-lg mb-16 shadow-lg shadow-[#f85d5d]/10 w-full md:w-auto"
      >
        <FiMail size={20} className="shrink-0" />
        <span className="truncate">
          {profile.email || "hello@portfolio.dev"}
        </span>
      </a>

      <div className="flex justify-center gap-4 md:gap-6">
        {[
          { Icon: FiUser, url: profile.html_url },
          { Icon: FiExternalLink, url: profile.blog || "#" },
        ].map((social, i) => (
          <a
            key={i}
            href={social.url}
            target="_blank"
            rel="noreferrer"
            className="w-12 h-12 flex items-center justify-center rounded-full border border-slate-200 text-slate-400 hover:text-[#f85d5d] hover:border-[#f85d5d] transition-all bg-white"
          >
            <social.Icon size={18} />
          </a>
        ))}
      </div>
    </section>
  );
}
